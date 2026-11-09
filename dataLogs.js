/**
 * 開發島專屬之結構化時間軸日誌與重大規劃事實來源
 */

export const devLogs = [
  {
    id: 1,
    date: "2026-11-09",
    type: "MAJOR",
    title: "Life Island 3D 零框架純靜態系統正式立項與架構確立",
    summary: "捨棄重型前端框架與後端伺服器，採用純 WebGL + Procedural Hex 演算法打造秒開微縮島嶼。",
    details: [
      "確立卡坦島低多邊形 3D 微縮地圖互動體驗",
      "導入軸向六角座標系 (Axial Coordinates) 程序化島嶼生成",
      "落實零伺服器負載原則，所有 3D 計算純前端瀏覽器處理",
      "建立開發島專屬之結構化時間軸日誌與重大規劃檢視器"
    ],
    status: "COMPLETED"
  },
  {
    id: 2,
    date: "2026-11-09",
    type: "ARCHITECTURE",
    title: "低多邊形水波 Shader 動態流光與視角跟隨演算法",
    summary: "優化頂點波浪動態計算與相機平滑 Lerp 運鏡動力學，確保行動裝置維持 60 FPS。",
    details: [
      "實作 Procedural Hexagonal Prism 幾何體自定義頂面導角",
      "優化 Raycaster 射線檢測，實現懸停發光與島嶼點擊平滑推進",
      "響應式 CSS 玻璃擬態 (Glassmorphism) 抽屜面板整合"
    ],
    status: "COMPLETED"
  },
  {
    id: 3,
    date: "2026-11-09",
    type: "MAJOR",
    title: "全平台現代化 RWD 響應式佈局與直屏 3D 相機自適應",
    summary: "打造 iOS/Android 手機與平板完美體驗，實裝直屏相機自適應視距與 iOS 安全區契約。",
    details: [
      "建立 responsive.css 集中規範 768px 平板與 480px 緊湊手機雙斷點",
      "研發動態長寬比相機視距演算法 (Portrait FOV Adaptor)，直屏手機零裁切盡覽 8 島全景",
      "抽屜滿版適配 env(safe-area-inset-top) 主動避開動態島與瀏海",
      "小旅人金句氣泡實裝螢幕安全邊界鉗位 (Screen Clamping) 防禦",
      "觸控拖曳旋轉與點擊選島精準分離 (moveDist > 10px 容差防誤觸)"
    ],
    status: "COMPLETED"
  },
  {
    id: 4,
    date: "2026-11-09",
    type: "ARCHITECTURE",
    title: "Cloudflare Pages 邊緣雲與 GitHub 雙軌零構建秒開交付",
    summary: "導入 Cloudflare Pages 與 wrangler 靜態邊緣網路，實現全球 CDN 毫秒級冷啟動。",
    details: [
      "配置 wrangler.toml 與 _headers 最佳化靜態快取與 WebGL 安全標頭",
      "實現 Cloudflare Pages + GitHub Pages 雙軌無縫自動化發布",
      "保持純原生 ES Modules 與 Importmap 零構建打包純粹性"
    ],
    status: "COMPLETED"
  },
  {
    id: 5,
    date: "2026-11-09",
    type: "MAJOR",
    title: "正七邊形極座標完美等距群島幾何重構 (方案 A)",
    summary: "徹底消除六角整數網格導致的島嶼內凹與間距不均，實現中央開發島 + 外環 7 大支柱完美對稱。",
    details: [
      "實作 getEquidistantCoordinates 幾何演算法，外環 7 座島精確均佈於半徑 R=12.5 軌道",
      "外環所有島嶼到中央 dev-island 距離 100% 絕對相等 (12.500)",
      "任意相鄰外環兩島弦長間距 100% 絕對相等 (10.847)，無縫消除視覺擠壓與偏斜",
      "跨島協作光流線 (Synergy Lines) 與小旅人巡航自動對齊新等距空間拓撲",
      "新增 [EQUIDISTANT_RADIAL_LAYOUT] 自動化斷言測試，嚴格守護幾何不變量"
    ],
    status: "COMPLETED"
  },
  {
    id: 6,
    date: "2026-11-09",
    type: "MAJOR",
    title: "探險小旅人自主隨機漫遊出沒模式 (方案 1)",
    summary: "為微縮小旅人注入自主生命力，閒置時時不時在群島間躍動出沒並隨機分享心法。",
    details: [
      "建構閒置自主漫遊自律計時器 (14 ~ 22 秒隨機冷卻區間)",
      "小旅人自主隨機挑選相異島嶼躍動巡航，落地觸發揮手致意",
      "抵達目標島嶼後以 40% 機率自動冒出 Glassmorphism 心法氣泡 (4.5 秒自動淡出)",
      "實裝使用者手動操作搶佔優先權防禦 (Preemption Guard)，杜絕操作衝突",
      "新增 [WANDERER_AUTONOMOUS_ROAMING_CONTRACT] 自動化測試驗證"
    ],
    status: "COMPLETED"
  },
  {
    id: 7,
    date: "2026-11-09",
    type: "MAJOR",
    title: "跨維度協作光流線 (Synergy Lines) 與動態天氣著色器計畫",
    summary: "重大規劃：引入島嶼間能量協作動態流光，並加入日夜與降雨粒子模擬。",
    details: [
      "貝茲曲線粒子流動引擎，視覺化呈現不同島嶼間的價值流轉",
      "自適應 WebGL 著色器動態光照切換與日夜星辰背景粒子",
      "PWA 離線快取支援與離線探索模式"
    ],
    status: "PLANNED"
  },
  {
    id: 8,
    date: "2026-11-10",
    type: "MAJOR",
    title: "五行大自然神工與熱帶海島風體系全面實裝 (方案 A)",
    summary: "融合金木水火土五行地質哲學與熱帶海島美學，將 8 大島嶼全面升級為低多邊形純天然地貌。",
    details: [
      "五行地貌映射：金(晨曦晶岬/階梯海台)、木(遠古神榕/雙生門)、水(原初環礁/深海藍洞)、火(黑曜火山)、土(喀斯特石柱)",
      "熱帶海島植被模組化：新增低多邊形彎曲椰林棕櫚樹與天然海蝕巨岩 (natureProps.js)",
      "大自然鬼斧神工 3D 地標：徹底替換人造科技模型，改由純天然火山湖、天坑藍洞、神木樹冠與石英晶簇呈現",
      "水體渲染調校：導入熱帶碧藍淺灘動態海浪色調 (water.js)",
      "保持 8 島軸向座標與全平台單元測試 100% 相容"
    ],
    status: "COMPLETED"
  }
];

