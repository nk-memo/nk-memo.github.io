// api/route.js

// VercelのNode.js環境で最も標準的な関数のエクスポート方法
module.exports = async (request, response) => {
  // CORSヘッダーの設定（どのWebサイトからでもアクセスを許可するおまじない）
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // ブラウザが本番の通信前に送る「確認リクエスト（OPTIONSメソッド）」に対応
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  // POSTメソッド以外の通信は受け付けない
  if (request.method !== 'POST') {
    return response.status(405).json({ message: '許可されていないメソッドです。' });
  }

  try {
    // ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
    // ★ 【解決策】Vercelの正しいルールで、ブラウザからの情報を受け取ります ★
    // ★ これが、前回の500エラーの直接の原因だった部分の修正です           ★
    // ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
    const requestBody = request.body;
    
    // サーバーの環境変数から、安全にAPIキーを読み込みます
    const orsApiKey = process.env.ORS_API_KEY;

    // もしVercelにAPIキーが設定されていなかったら、エラーを返します
    if (!orsApiKey) {
      return response.status(500).json({ message: 'APIキーがサーバーに設定されていません。' });
    }

    // ここからが中継サーバーの本体。OpenRouteServiceに問い合わせます
    const orsResponse = await fetch('https://api.openrouteservice.org/v2/directions/cycling-regular/geojson', {
      method: 'POST',
      headers: {
        'Authorization': orsApiKey,
        'Content-Type': 'application/json'
      },
      // ブラウザから受け取った情報を、そのまま転送します
      body: JSON.stringify(requestBody)
    });

    // OpenRouteServiceからの応答をJSON形式で受け取ります
    const data = await orsResponse.json();

    // もしOpenRouteServiceがエラーを返してきたら、その情報をブラウザに伝えます
    if (!orsResponse.ok) {
      return response.status(orsResponse.status).json(data);
    }

    // 全て成功した場合、受け取ったルート情報をブラウザに返します
    return response.status(200).json(data);

  } catch (error) {
    // 何か予期せぬエラーがサーバー内部で発生した場合
    console.error("サーバーサイドエラー:", error);
    return response.status(500).json({ message: 'サーバー内部で予期せぬエラーが発生しました。' });
  }
};