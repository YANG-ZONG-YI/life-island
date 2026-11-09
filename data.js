/**
 * Life Island 核心資料事實來源 (SSOT)
 * 包含 8 大核心島嶼定義、跨島協作關係與搜尋導出
 */

export { devLogs } from './dataLogs.js';
export { synergyConnections } from './dataSynergy.js';
export { searchIslands, filterIslands } from './engine/searchEngine.js';

export const islands = [
  {
    id: "dev-island",
    name: "開發與演進之島",
    subtitle: "Dev & Evolution Island",
    biome: "Cyber Technology / Digital Oasis",
    color: 0x0ea5e9,
    accentColor: "#38bdf8",
    description: "系統架構核心、版本演進、程式碼攻堅與開源藍圖樞紐。",
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
    subtitle: "North Star & Vision",
    biome: "Solar Zenith / Golden Spire",
    color: 0xf59e0b,
    accentColor: "#fbbf24",
    description: "人生核心願景、非妥協原則與指引一切決策的終極羅盤。",
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
    subtitle: "Craft & Impact",
    biome: "High-Tech Citadel",
    color: 0x3b82f6,
    accentColor: "#60a5fa",
    description: "技術工藝極致、旗艦軟體工程專案與跨界影響力矩陣。",
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
    subtitle: "Wisdom & Knowledge",
    biome: "Arcane Observatory",
    color: 0x8b5cf6,
    accentColor: "#a78bfa",
    description: "心智模型演化、深度閱讀矩陣與跨學科知識網路。",
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
    subtitle: "Vitality & Body",
    biome: "Emerald Forest & Springs",
    color: 0x10b981,
    accentColor: "#34d399",
    description: "體能高峰鍛鍊、精準睡眠科學與生體機能長壽工程。",
    axialCoords: { q: 0, r: 2 },
    height: 1.1,
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
    subtitle: "Wealth Architecture",
    biome: "Warm Copper Vault",
    color: 0xd97706,
    accentColor: "#f59e0b",
    description: "全球資產配置、防禦性現金護城河與非對稱被動收益。",
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
    subtitle: "Deep Connections",
    biome: "Coral Sanctuary",
    color: 0xf43f5e,
    accentColor: "#fb7185",
    description: "家庭摯愛、心靈共振盟友社群與利他貢獻之泉。",
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
    subtitle: "Adventures & Joy",
    biome: "Sunset Archipelago",
    color: 0xf97316,
    accentColor: "#fb923c",
    description: "世界旅行足跡、極限戶外探索與保持赤子之心的心流實驗。",
    axialCoords: { q: 1, r: 1 },
    height: 1.2,
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
