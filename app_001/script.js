document.addEventListener('DOMContentLoaded', function() {
    // サンプルデータ (2025年1月～5月発売を想定)
    const smartphoneData = [
        {
            os: "Android 15",
            manufacturer: "PixelNext",
            modelName: "Vision Pro 7",
            price: 135000,
            features: ["AIフォト強化", "リアルタイム翻訳", "144Hz可変リフレッシュレート"],
            batteryCapacity: 5200,
            resolution: "QHD+ (3120x1440)",
            colorSpace: "DCI-P3 100%",
            cameraSpecs: { main: "108MP f/1.7 OIS", wide: "48MP f/2.2", telephoto: "12MP 5x光学 f/3.0 OIS", front: "32MP" },
            rawPhoto: true,
            releaseMonth: 1 
        },
        {
            os: "Android 15",
            manufacturer: "XperiaPrime",
            modelName: "Mark VI",
            price: 158000,
            features: ["CinemaPro進化版", "外部モニター機能", "可変焦点望遠レンズ"],
            batteryCapacity: 5000,
            resolution: "4K HDR (3840x1644)",
            colorSpace: "BT.2020対応",
            cameraSpecs: { main: "50MP 1インチセンサー f/1.9 OIS", wide: "12MP f/2.2", telephoto: "12MP 可変(85-125mm) f/2.3-2.8 OIS", front: "12MP" },
            rawPhoto: true,
            releaseMonth: 2
        },
        {
            os: "Android 15",
            manufacturer: "AquaPhone",
            modelName: "Sense 9",
            price: 68000,
            features: ["長時間バッテリー", "MIL規格準拠タフネス", "IGZO OLED"],
            batteryCapacity: 5500,
            resolution: "FHD+ (2400x1080)",
            colorSpace: "sRGBカバー",
            cameraSpecs: { main: "64MP f/1.8 OIS", wide: "8MP f/2.2", front: "16MP" },
            rawPhoto: false,
            releaseMonth: 3
        },
        {
            os: "Android 16 Concept", // 架空の最新OS
            manufacturer: "GalaxyAlpha",
            modelName: "Ultra Future",
            price: 185000,
            features: ["次世代NPU搭載", "アンダーディスプレイカメラ", "衛星通信対応"],
            batteryCapacity: 6000,
            resolution: "WQHD+ (3200x1440) 165Hz",
            colorSpace: "DCI-P3 120%",
            cameraSpecs: { main: "200MP f/1.6 大型センサー OIS", wide: "50MP f/2.0", telephoto1: "12MP 3x光学 f/2.4 OIS", telephoto2: "10MP 10x光学 f/4.9 OIS", front: "40MP UDC" },
            rawPhoto: true,
            releaseMonth: 4
        },
        {
            os: "Android 15",
            manufacturer: "RisingStar",
            modelName: "Nova Lite 5G",
            price: 45000,
            features: ["高コスパ5G", "90Hzスムーズディスプレイ", "大容量ストレージ"],
            batteryCapacity: 4800,
            resolution: "FHD+ (2340x1080)",
            colorSpace: "NTSC 85%",
            cameraSpecs: { main: "50MP f/1.8", wide: "5MP f/2.4", macro: "2MP", front: "8MP" },
            rawPhoto: false,
            releaseMonth: 1
        },
        {
            os: "Android 15",
            manufacturer: "PixelNext",
            modelName: "Vision Standard 7",
            price: 98000,
            features: ["PixelAIカメラ", "長時間バッテリー", "シンプルUI"],
            batteryCapacity: 4900,
            resolution: "FHD+ (2400x1080)",
            colorSpace: "DCI-P3 95%",
            cameraSpecs: { main: "50MP f/1.8 OIS", wide: "12MP f/2.2", front: "16MP" },
            rawPhoto: true,
            releaseMonth: 3
        },
        {
            os: "Android 15",
            manufacturer: "XperiaPrime",
            modelName: "Ace V",
            price: 72000,
            features: ["コンパクトデザイン", "高音質オーディオ", "防水防塵"],
            batteryCapacity: 4500,
            resolution: "FHD+ (2520x1080)",
            colorSpace: "sRGB",
            cameraSpecs: { main: "48MP f/1.8 OIS", wide: "8MP f/2.2", front: "8MP" },
            rawPhoto: false,
            releaseMonth: 5
        },
        {
            os: "Android 16 Concept",
            manufacturer: "TechGiant",
            modelName: "Innovator X",
            price: 220000,
            features: ["液体レンズ採用カメラ", "200W超急速充電", "フォルダブルディスプレイ進化形"],
            batteryCapacity: 5300,
            resolution: "メイン: QXGA+ (2208 x 1768), カバー: FHD+",
            colorSpace: "BT.2020 85%",
            cameraSpecs: { main: "64MP (液体レンズ) f/1.5-2.4 OIS", wide: "48MP f/2.0", telephoto: "12MP 3.5x光学 f/2.8 OIS", front: "32MP" },
            rawPhoto: true,
            releaseMonth: 5
        },
         {
            os: "Android 15",
            manufacturer: "AquaPhone",
            modelName: "Zero X",
            price: 89000,
            features: ["超軽量デザイン", "10億色表示Pro IGZO OLED", "Snapdragon 8 Gen 3 Mobile Platform"],
            batteryCapacity: 5000,
            resolution: "FHD+ (2432x1080) 240Hz駆動",
            colorSpace: "DCI-P3 100%",
            cameraSpecs: { main: "108MP f/1.9 OIS", wide: "13MP f/2.4", front: "20MP" },
            rawPhoto: true,
            releaseMonth: 4
        },
        {
            os: "Android 15",
            manufacturer: "RisingStar",
            modelName: "Nova Pro 5G",
            price: 75000,
            features: ["120Hz AMOLED", "108MPカメラ", "67W急速充電"],
            batteryCapacity: 5000,
            resolution: "FHD+ (2400x1080)",
            colorSpace: "DCI-P3 100%",
            cameraSpecs: { main: "108MP f/1.9", wide: "8MP f/2.2", macro: "2MP f/2.4", front: "16MP" },
            rawPhoto: true,
            releaseMonth: 2
        }
    ];

    // DOM要素
    const osFilter = document.getElementById('os-filter');
    const manufacturerFilter = document.getElementById('manufacturer-filter');
    const priceMinFilter = document.getElementById('price-min-filter');
    const priceMaxFilter = document.getElementById('price-max-filter');
    const rawFilter = document.getElementById('raw-filter');
    const resetFiltersButton = document.getElementById('reset-filters');

    const sortBySelect = document.getElementById('sort-by');
    const sortOrderSelect = document.getElementById('sort-order');

    const tableBody = document.querySelector('#smartphones-table tbody');
    const noResultsP = document.getElementById('no-results');

    // フィルタオプションの初期化
    function populateFilterOptions() {
        const osSet = new Set();
        const manufacturerSet = new Set();
        smartphoneData.forEach(phone => {
            osSet.add(phone.os);
            manufacturerSet.add(phone.manufacturer);
        });

        osSet.forEach(os => {
            const option = document.createElement('option');
            option.value = os;
            option.textContent = os;
            osFilter.appendChild(option);
        });

        manufacturerSet.forEach(manufacturer => {
            const option = document.createElement('option');
            option.value = manufacturer;
            option.textContent = manufacturer;
            manufacturerFilter.appendChild(option);
        });
    }

    // カメラ性能を整形する関数
    function formatCameraSpecs(specs) {
        if (!specs || Object.keys(specs).length === 0) return "情報なし";
        const parts = [];
        if (specs.main) parts.push(`メイン: ${specs.main}`);
        if (specs.wide) parts.push(`広角: ${specs.wide}`);
        if (specs.telephoto) parts.push(`望遠: ${specs.telephoto}`);
        if (specs.telephoto1) parts.push(`望遠1: ${specs.telephoto1}`);
        if (specs.telephoto2) parts.push(`望遠2: ${specs.telephoto2}`);
        if (specs.macro) parts.push(`マクロ: ${specs.macro}`);
        if (specs.depth) parts.push(`深度: ${specs.depth}`);
        if (specs.front) parts.push(`前面: ${specs.front}`);
        return parts.join('<br>');
    }
    
    // テーブル表示を更新する関数
    function displaySmartphones(phones) {
        tableBody.innerHTML = ''; // テーブル内容をクリア
        if (phones.length === 0) {
            noResultsP.style.display = 'block';
            return;
        }
        noResultsP.style.display = 'none';

        phones.forEach(phone => {
            const row = tableBody.insertRow();
            row.insertCell().textContent = phone.os;
            row.insertCell().textContent = phone.manufacturer;
            row.insertCell().textContent = phone.modelName;
            row.insertCell().textContent = phone.price.toLocaleString() + '円';
            
            const featuresCell = row.insertCell();
            const featuresList = document.createElement('ul');
            phone.features.forEach(feature => {
                const listItem = document.createElement('li');
                listItem.textContent = feature;
                featuresList.appendChild(listItem);
            });
            featuresCell.appendChild(featuresList);

            row.insertCell().textContent = phone.batteryCapacity + 'mAh';
            row.insertCell().textContent = phone.resolution;
            row.insertCell().textContent = phone.colorSpace;
            row.insertCell().innerHTML = formatCameraSpecs(phone.cameraSpecs); // innerHTMLで<br>を解釈
            row.insertCell().textContent = phone.rawPhoto ? '有り' : '無し';
            row.insertCell().textContent = phone.releaseMonth + '月';
        });
    }

    // フィルタリングとソートを実行する関数
    function filterAndSortSmartphones() {
        let filteredPhones = [...smartphoneData];

        // フィルタリング
        const os = osFilter.value;
        if (os) {
            filteredPhones = filteredPhones.filter(p => p.os === os);
        }

        const manufacturer = manufacturerFilter.value;
        if (manufacturer) {
            filteredPhones = filteredPhones.filter(p => p.manufacturer === manufacturer);
        }

        const minPrice = parseInt(priceMinFilter.value);
        if (!isNaN(minPrice)) {
            filteredPhones = filteredPhones.filter(p => p.price >= minPrice);
        }

        const maxPrice = parseInt(priceMaxFilter.value);
        if (!isNaN(maxPrice)) {
            filteredPhones = filteredPhones.filter(p => p.price <= maxPrice);
        }

        const raw = rawFilter.value;
        if (raw === "true") {
            filteredPhones = filteredPhones.filter(p => p.rawPhoto === true);
        } else if (raw === "false") {
            filteredPhones = filteredPhones.filter(p => p.rawPhoto === false);
        }

        // ソート
        const sortBy = sortBySelect.value;
        const sortOrder = sortOrderSelect.value;

        filteredPhones.sort((a, b) => {
            let valA = a[sortBy];
            let valB = b[sortBy];

            if (typeof valA === 'string') {
                valA = valA.toLowerCase();
                valB = valB.toLowerCase();
            }
            
            if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
            if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        displaySmartphones(filteredPhones);
    }
    
    // フィルタをリセットする関数
    function resetFilters() {
        osFilter.value = "";
        manufacturerFilter.value = "";
        priceMinFilter.value = "";
        priceMaxFilter.value = "";
        rawFilter.value = "";
        // ソートも初期値に戻す（任意）
        // sortBySelect.value = "releaseMonth";
        // sortOrderSelect.value = "asc";
        filterAndSortSmartphones();
    }

    // イベントリスナーの設定
    [osFilter, manufacturerFilter, rawFilter, sortBySelect, sortOrderSelect].forEach(el => {
        el.addEventListener('change', filterAndSortSmartphones);
    });
    [priceMinFilter, priceMaxFilter].forEach(el => {
        el.addEventListener('input', filterAndSortSmartphones); // inputイベントでリアルタイムに反応
    });
    resetFiltersButton.addEventListener('click', resetFilters);

    // 初期表示
    populateFilterOptions();
    filterAndSortSmartphones(); // 初期ソート（発売月昇順）も適用
});