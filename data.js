/**
 * Life Island 核心資料事實來源 (SSOT)
 * 包含 8 大核心島嶼定義 (五行海島風大自然神工)、跨島協作關係與搜尋導出
 */

export { devLogs } from './dataLogs.js';
export { synergyConnections } from './dataSynergy.js';
export { searchIslands, filterIslands } from './engine/searchEngine.js';

export const islands = [
  {
    id: "dev-island",
    name: "開發與演進之島",
    subtitle: "原初潮汐環礁 · 水行之源",
    biome: "水行 · 蔚藍潮間帶環礁與原初神泉",
    color: 0x0284c7,
    accentColor: "#38bdf8",
    description: "五行屬水。天然珊瑚環抱的潮間帶聖泉，象徵系統底層源源不絕的演進動力與程式碼開源汪洋。",
    axialCoords: { q: 0, r: 0 },
    height: 1.2,
    items: [
      {
        id: "dev-p1",
        title: "零框架純靜態架構守則",
        desc: "堅持無後端、無資料庫、純原生 WebGL/Three.js 渲染，確保毫秒級極速冷啟動。",
        status: "ACTIVE"
      },
      {
        id: "dev-p2",
        title: "防禦性程式碼與領域不變量",
        desc: "嚴守第一性原理，所有模組解耦自治，以 Docker 容器為全生命週期邊界。",
        status: "ACTIVE"
      }
    ]
  },
  {
    id: "north-star",
    name: "北極星之島",
    subtitle: "晨曦晶錐海岬 · 金行之魄",
    biome: "金行 · 銳利石英晶岩與白金沙灘",
    color: 0xf59e0b,
    accentColor: "#fde047",
    description: "五行屬金。經歷萬年海浪沖刷露出的天然白金晶柱天峰，金光四射，為整片海域指引不滅的願景航向。",
    axialCoords: { q: 0, r: -2 },
    height: 1.5,
    items: [
      {
        id: "ns-1",
        title: "第一性原理思考 (First Principles)",
        desc: "打破經驗主義盲從，將一切事物解構至最基本真理再向上推導。",
        status: "CORE"
      },
      {
        id: "ns-2",
        title: "複利效應與長期主義",
        desc: "專注於具備時間積累性的高槓桿資產，拒絕即時滿足的雜音。",
        status: "CORE"
      }
    ]
  },
  {
    id: "craft-impact",
    name: "事業與影響力之島",
    subtitle: "喀斯特擎天海柱 · 土行之盤",
    biome: "土行 · 鬼斧神工海上石林與天生石橋",
    color: 0x2563eb,
    accentColor: "#60a5fa",
    description: "五行屬土。屹立於怒濤中的喀斯特垂直巨石群與天生海蝕拱橋，厚重沉穩，彰顯堅不可摧的工程工藝實力。",
    axialCoords: { q: 2, r: -2 },
    height: 1.3,
    items: [
      {
        id: "craft-1",
        title: "分散式系統架構深耕",
        desc: "打造高可用、彈性伸縮且具備自我修復能力的現代後端拓撲。",
        status: "IN_PROGRESS"
      },
      {
        id: "craft-2",
        title: "3D 空間計算與視覺互動",
        desc: "探索 WebGL、Shader 與 WebXR 沉浸式人機互動的新邊疆。",
        status: "IN_PROGRESS"
      }
    ]
  },
  {
    id: "wisdom-knowledge",
    name: "心智與學習之島",
    subtitle: "深海藍洞秘境 · 水木共生",
    biome: "水木共生 · 潮汐海蝕石窟與靈泉幽林",
    color: 0x8b5cf6,
    accentColor: "#c084fc",
    description: "五行兼蓄水木。深邃通往地心的天然海中天坑與洞穴湧泉，宛如大自然的沉思之眼，凝聚無盡心智智慧。",
    axialCoords: { q: -2, r: 2 },
    height: 1.4,
    items: [
      {
        id: "wis-1",
        title: "常青知識體系 (Evergreen Zettelkasten)",
        desc: "透過雙向連結與原子化卡片累積個人心智外腦。",
        status: "CONTINUOUS"
      },
      {
        id: "wis-2",
        title: "古典哲學與斯多葛踐行",
        desc: "控制能控制的，坦然接受無法控制的，保持內心絕對平靜。",
        status: "CONTINUOUS"
      }
    ]
  },
  {
    id: "vitality-health",
    name: "生命力與健康之島",
    subtitle: "遠古神榕雨林 · 木行之冠",
    biome: "木行 · 潮汐氣根巨木與熱帶蕨類繁森",
    color: 0x059669,
    accentColor: "#34d399",
    description: "五行屬木。數百年氣根垂入海浪中的天然神榕海島，藤蔓交織、生機盎然，滋養身心極致的生命能量。",
    axialCoords: { q: 0, r: 2 },
    height: 1.2,
    items: [
      {
        id: "vit-1",
        title: "心肺有氧 Zone 2 與肌力重訓",
        desc: "每週維持 150 分鐘基礎心肺區間，強化粒線體密度與關節穩定度。",
        status: "ACTIVE"
      },
      {
        id: "vit-2",
        title: "生物晝夜節律優化",
        desc: "晨間日照、低溫睡眠環境與無咖啡因深層修復循環。",
        status: "ACTIVE"
      }
    ]
  },
  {
    id: "wealth-architecture",
    name: "財富與資源之島",
    subtitle: "砂金層岩海台 · 金土相生",
    biome: "金土相生 · 階梯海蝕台地與天然金礦結晶",
    color: 0xd97706,
    accentColor: "#fbbf24",
    description: "五行屬金土。海浪長年切削形成的天然層階海台，石縫中蘊藏天然金砂與礦脈，構築堅如磐石的防禦護城河。",
    axialCoords: { q: 2, r: 0 },
    height: 1.25,
    items: [
      {
        id: "wlth-1",
        title: "全天候資產配置策略 (All-Weather)",
        desc: "建立穩健的三層資產配置金字塔，涵蓋股票指數、避險資產與無風險流動儲備。",
        status: "ACTIVE"
      },
      {
        id: "wlth-2",
        title: "數位資產與自動化現金流",
        desc: "建立代碼與媒體邊際成本為零的數位資產製造機。",
        status: "ACTIVE"
      }
    ]
  },
  {
    id: "deep-connections",
    name: "深度連結之島",
    subtitle: "雙生共生海蝕門 · 木水交融",
    biome: "木水交融 · 雙生海蝕石門與紅樹林潟湖",
    color: 0xf43f5e,
    accentColor: "#fda4af",
    description: "五行融合水木。兩座天然海蝕石柱在頂部合抱成門，紅樹林與珊瑚群在此共生，象徵靈魂深處的緊密羈絆與利他共鳴。",
    axialCoords: { q: -2, r: 0 },
    height: 1.15,
    items: [
      {
        id: "conn-1",
        title: "深度專注的陪伴時光",
        desc: "遠離螢幕與工作通知，給予身邊珍愛之人 100% 的臨在傾聽。",
        status: "CORE"
      },
      {
        id: "conn-2",
        title: "開放原始碼與知識利他",
        desc: "持續將個人實踐所得無償反哺開發者社群，賦能更多造物者。",
        status: "CORE"
      }
    ]
  },
  {
    id: "adventure-joy",
    name: "探索與冒險之島",
    subtitle: "熔岩玄武海蝕火山 · 火行之極",
    biome: "火行 · 赤焰熔岩天坑與黑曜石海蝕柱",
    color: 0xea580c,
    accentColor: "#fb923c",
    description: "五行屬火。地底熔岩湧出形成的黑曜石火山錐與熾熱硫磺湖，蒸汽蒸騰、海浪拍擊，激發永不熄滅的探索熱情。",
    axialCoords: { q: 1, r: 1 },
    height: 1.25,
    items: [
      {
        id: "adv-1",
        title: "百岳高山縱走與荒野露營",
        desc: "踏足無訊號的自然山林，重置感官敏銳度與生存直覺。",
        status: "ONGOING"
      },
      {
        id: "adv-2",
        title: "環球異國文化心靈冒險",
        desc: "每年深入一座陌生的國度，跳脫認知框架體驗不同維度的人生。",
        status: "PLANNED"
      }
    ]
  }
];
