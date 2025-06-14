// api/route.js

// Vercelのバックエンド機能で動作する関数の定義
export default async function handler(request, response) {
  // CORSヘッダーの設定（どのWebサイトからでもアクセスを許可する）
  // ローカル開発時や、将来的に別のドメインから呼び出す場合に必要になります
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // プリフライトリクエストへの対応
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }
  
  // POST以外のリクエストはエラーにする
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  // ★★★ ここで、サーバー環境に隠したAPIキーを安全に読み込む ★★★
  const orsApiKey = process.env.ORS_API_KEY;

  if (!orsApiKey) {
    return response.status(500).json({ message: 'APIキーがサーバーに設定されていません。' });
  }

  try {
    // ブラウザから送られてきたルート検索の情報を取得
    const requestBody = request.body;

    // OpenRouteServiceのサーバーに、ここから問い合わせる
    const orsResponse = await fetch('https://api.openrouteservice.org/v2/directions/cycling-regular/geojson', {
      method: 'POST',
      headers: {
        'Authorization': orsApiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody) // ブラウザからの情報をそのまま転送
    });

    // OpenRouteServiceからの応答をチェック
    if (!orsResponse.ok) {
      const errorData = await orsResponse.json();
      // エラー情報をブラウザに返す
      return response.status(orsResponse.status).json(errorData);
    }

    // 成功した場合、OpenRouteServiceからのルート情報を取得
    const routeData = await orsResponse.json();
    
    // ★★★ 取得したルート情報を、そのままブラウザに返す ★★★
    return response.status(200).json(routeData);

  } catch (error) {
    // 何か予期せぬエラーが起きた場合
    console.error(error);
    return response.status(500).json({ message: 'サーバーでエラーが発生しました。' });
  }
}