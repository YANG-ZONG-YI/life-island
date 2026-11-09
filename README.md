# [LIFE_ISLAND_3D] Life Island 3D 互動微縮群島系統

> 致敬卡坦島風格（Catan Low-Poly 3D）與政策島互動微縮地圖設計理念之個人生涯願景、技術演進與重大規劃視覺化平台。

---

## 🌐 線上展示與雙軌部署 (Live Demonstrations)

- **GitHub Pages 主線展示**：[https://yang-zong-yi.github.io/life-island/](https://yang-zong-yi.github.io/life-island/)
- **Cloudflare Pages 邊緣交付**：支援透過 `wrangler.toml` 實現全球 300+ 邊緣節點零構建極速冷啟動託管。

---

## 1. 重大開發規格 (Major Development Specifications)

本系統以單一事實來源 (SSOT) 與極限效能為最高準則，具備下列 9 項核心重大規格：

### [SPEC-01: ZERO_RUNTIME_LOAD] 零框架、零資料庫、零後端純靜態架構
- **規範約束**：前端嚴禁引入大型全端框架（React/Vue/Next/Nuxt 等）、構建打包流程（Webpack/Vite）與外部資料庫。
- **技術實現**：以標準原生 HTML5、CSS3（現代變數與玻璃擬態 Glassmorphism）、原生 ES Modules JavaScript 及 Three.js (r160) 交付。
- **零伺服器負載**：所有 3D 空間網格計算、低多邊形著色器與相機平移動力學 100% 於客戶端瀏覽器 WebGL 即時運算，靜態主機（如 GitHub Pages、Cloudflare Pages、Nginx）僅需傳送純靜態資產，伺服端運算負載為 0。

### [SPEC-02: AXIAL_HEX_TOPOLOGY] 軸向六角座標系與程序化地形生成
- **幾何拓撲契約**：系統採用數學嚴格互斥之六角軸向座標系 `(q, r)`，8 座核心島嶼彼此 0 碰撞。
- **座標轉換算式**：
  - `X = HEX_RADIUS * sqrt(3) * (q + r / 2)`
  - `Y = baseHeight * 0.5`
  - `Z = HEX_RADIUS * 1.5 * r`（`HEX_RADIUS = 3.6`，初始旋轉相位角為 30 度）
- **程序化零體積載入**：島嶼多邊形柱體與頂面雙層倒角（Bevel Extrusion）均由演算法動態即時生成，不需載入數十 MB 的外部 `.glb` 模型，首頁毫秒級秒開。

### [SPEC-03: EIGHT_CORE_ISLANDS] 8 大核心群島矩陣
系統由中央技術樞紐與外環 7 座人生核心支柱島嶼構成完整微縮群島：
1. **`dev-island` 開發與演進之島**：系統技術演進樞紐、數位晶片與通訊天線地標、專屬時間軸日誌。
2. **`north-star` 北極星與核心願景之島**：個人使命宣言、非妥協原則、金芒晶石巨石地標。
3. **`craft-impact` 事業與專業影響力之島**：核心專業技能拓撲、重大代表作品集、科技摩天方塊地標。
4. **`wisdom-knowledge` 心智與學習之島**：深度閱讀清單、心智哲學模型、環形星象天文臺地標。
5. **`vitality-health` 生命力與健康之島**：運動體能指標、作息與精力管理、翡翠生命巨木地標。
6. **`wealth-architecture` 財富與資源之島**：資產配置矩陣、被動現金流架構、金色階梯金字塔地標。
7. **`deep-connections` 深度連結與利他之島**：家庭重要時刻、摯友同行者、能量共鳴雙拱門地標。
8. **`adventure-joy` 探索與心流體驗之島**：極限挑戰足跡、人生願望清單 (Bucket List)、海岸燈塔地標。

### [SPEC-04: DATED_DEV_TIMELINE] 具備日期之重大規劃時間軸日誌規格
- **時間戳記契約**：開發島日誌每筆條目之日期欄位 MUST 嚴格遵循 `YYYY-MM-DD` 格式。
- **重大規劃標記 (`MAJOR`)**：
  - 核心重大規劃標註 `type: "MAJOR"`，於 UI 介面賦予金色呼吸燈光暈徽章 `[重大規劃]`。
  - 每筆重大規劃 MUST 包含明確的 `details` 或 `subtasks` 子項目清單，落實驗收閉環。
- **三態狀態機**：日誌狀態區分為 `COMPLETED` (已完成)、`IN_PROGRESS` (進行中) 與 `PLANNED` (未來規劃)。

### [SPEC-05: PROCEDURAL_LOWPOLY_WATER] 低多邊形動態水面與日夜光影
- **動態水波演算法**：以純數學正弦波即時計算 `PlaneGeometry` 頂點位移，展現低多邊形平面著色（FlatShading）波光粼粼質感。
- **日夜環境無縫切換**：
  - **日照模式**：暖金色斜射日光 (`0xfffaed`)、柔和天空環境光 (`0xe0f2fe`)，具備動態投影。
  - **夜景模式**：深海藍冷光 (`0x0f172a`)、科技霓虹微光 (`0x38bdf8`) 與深邃星空底色。

### [SPEC-06: SMOOTH_CAMERA_DYNAMICS] 相機平滑運鏡動力學
- 採用基於 Lerp 插值曲線演算法之相機飛行控制器。
- 點擊任一六角島塊（或由導航選單選取），鏡頭以三次平滑曲線平移與縮放飛抵目標島塊上方；重置時無縫飛回群島全景視角，杜絕畫面瞬移割裂感。

### [SPEC-07: MODERN_RWD_AND_PORTRAIT_DYNAMICS] 全平台現代化 RWD 與直屏動態相機
- **集中響應式管理 (`responsive.css`)**：定義 768px（平板）與 480px（緊湊手機）響應斷點。
- **手機直向螢幕自適應視距 (Portrait FOV Adaptor)**：當視窗 `aspect < 1.0` 時，相機自動拉遠視距 ($1.0 \sim 1.85\times$)，直屏手機 8 座群島全景 0 裁切。
- **iOS 安全區適配**：抽屜滿版適配 `env(safe-area-inset-top)`，主動避開 iPhone 動態島與瀏海。
- **觸控防誤觸機制**：`touchstart` 與 `touchend` 引入 10px 位移容差，精準分離滑動旋轉視角與點擊選島。

### [SPEC-08: EDGE_DUAL_DEPLOYMENT_CF_PAGES] Cloudflare Pages 與 GitHub 雙軌零構建秒開交付
- **雙軌自動化發布**：支援 GitHub Pages 與 Cloudflare Pages（基於 `wrangler.toml` 與 `_headers` 安全快取標頭）無縫並行託管。
- **零構建打包**：純原生 ES Modules 與原生 Browser Importmap，全球 CDN 邊緣節點毫秒級快取。

### [SPEC-09: THE_WANDERER_MASCOT] 探險小旅人與心法金句微縮互動
- **低多邊形程序化角色**：純代碼構建之探險小人偶，隨島嶼切換以拋物線軌跡（Arc Height = 4.2）躍動巡航。
- **互動心法金句氣泡**：點擊小旅人彈出世界座標 3D 投影之 Glassmorphism 氣泡，實裝螢幕安全邊界鉗位 (Screen Clamping) 防禦。
- **自主漫遊出沒機制 (方案 1)**：在使用者無操作滿 14~22 秒時，小旅人自主挑選下一座島嶼躍動巡航出沒，落地揮手並以 40% 機率自動分享心法（4.5 秒自動淡出），手動操作享有絕對搶佔優先權。

### [SPEC-10: EQUIDISTANT_RADIAL_ARCHIPELAGO] 正七邊形極座標等距群島 (方案 A)
- **圓心等距律**：外環 7 座島均佈於半徑 $R = 12.50$ 之圓形軌道，到中央 `dev-island` 距離 100% 絕對相等 ($12.500$)。
- **相鄰等距律**：外環 7 座島以正北為起點等角均分，任意相鄰兩島間距 100% 絕對相等 ($10.847$)，徹底消除離散六角整數座標之幾何偏斜與內凹。
- **動態拓撲自適應**：跨島協作光流線 (Synergy Lines) 與小旅人巡航路徑自動對齊等距世界座標。

---

## 2. 系統目錄拓撲 (Project Topology)

```text
.
├── index.html                 # 語意化單頁入口 (透過 Importmap 載入 Three.js)
├── style.css                  # 現代樣式入口索引 (Aggregator)
├── css/
│   ├── base.css               # 全域 CSS 變數、重置、全螢幕 Canvas、HUD 控制列
│   ├── drawer.css             # 2D 玻璃擬態資訊抽屜 (Glassmorphism)
│   ├── timeline.css           # 開發島專屬垂直時間軸、金色發光節點與重大規劃徽章
│   ├── search.css             # 3D 聚光搜尋 HUD 與即時下拉列表樣式
│   ├── wanderer.css           # 探險小旅人懸浮心法金句氣泡樣式
│   └── responsive.css         # 全平台 RWD 響應式佈局 (768px 平板 / 480px 手機 / iOS 安全區)
├── data.js                    # 8 大核心島嶼資料事實來源 (SSOT)
├── dataLogs.js                # 開發島日期時間軸日誌資料 (含 MAJOR 重大規劃)
├── dataSynergy.js             # 跨島協作能量光流網絡契約資料
├── dataQuotes.js              # 人生信條與架構心法金句庫 (SSOT)
├── engine/
│   ├── hexGrid.js             # 軸向座標 (q, r) 幾何運算與六角柱程序化生成
│   ├── water.js               # 低多邊形動態正弦水波計算引擎
│   ├── decorations.js         # 微縮地標裝飾調度器
│   ├── landmarksTech.js       # 科技、晶片天線、星芒塔、摩天方塊地標生成器
│   ├── landmarksNature.js     # 森林、金字塔、共鳴拱門、燈塔地標生成器
│   ├── camera.js              # 相機 OrbitControls、Lerp 運鏡與直屏自適應相機引擎
│   ├── synergyLines.js        # 三次貝茲空中光流線與流動發光粒子引擎
│   ├── spotlight.js           # 3D 垂直聚光圓錐與焦點微幅調暗 (Focus Dimming) 控制器
│   ├── searchEngine.js        # 全文關鍵字模糊檢索與高光索引引擎
│   ├── ui.js                  # 2D UI 互動控制器 (抽屜渲染、時間軸、日夜切換)
│   ├── uiSearch.js            # 搜尋 HUD 輸入與下拉建議面板互動控制器
│   └── wanderer.js            # 低多邊形探險小旅人、躍動巡航與心法氣泡引擎
├── app.js                     # 3D 場景主入口、光影、Raycasting 射線檢測與觸控防禦
├── tests/
│   ├── test_island_data.mjs   # 核心群島 8 大島嶼幾何與資料契約測試
│   ├── test_synergy_and_search.mjs # 跨島協作拓撲與模糊搜尋檢索測試
│   ├── test_wanderer.mjs      # 探險小旅人與心法金句資料/DOM契約測試
│   └── test_responsive.mjs    # 全平台 RWD 斷點、iOS 安全區與相機自適應契約測試
├── docs/
│   └── specs/
│       ├── README.md          # 長青活體規格索引
│       └── life-island/
│           └── spec.md        # Life Island 3D 權威技術規格書 (RFC 2119)
├── wrangler.toml              # Cloudflare Pages 邊緣部署零配置
├── _headers                   # 靜態快取與安全回應標頭配置
└── docker-compose.yml         # Nginx 靜態 Web 容器與 Node 測試隔離容器
```

---

## 3. 容器隔離運行與本機體驗 (Running & Verification)

依據系統架構硬閘門 (`[GATE: DOCKER_ONLY]`)，所有編譯、運行與測試均於容器內部完成：

### 3.1 啟動容器服務
```powershell
docker compose up -d
```
- **Web 靜態服務**：[http://localhost:8080](http://localhost:8080)
- **伺服器特性**：以 `nginx:alpine` 透過唯讀 (`:ro`) 方式掛載本機靜態目錄，完全無寫入篡改風險。

### 3.2 執行容器內量化規格測試
```powershell
docker compose exec tester node --test tests/*.mjs
```
**18 項量化斷言測試涵蓋**：
1. `[PASS]` `[ISLAND_CORE_COUNT]` 精確包含 8 座核心島嶼。
2. `[PASS]` `[DEV_ISLAND_SPEC]` 必含 `dev-island` 且欄位符合型別約束。
3. `[PASS]` `[AXIAL_COORDINATE_COLLISION]` 8 座島嶼軸向座標 0 衝突重疊。
4. `[PASS]` `[ISLAND_POLICIES_AND_ITEMS]` 每座島嶼均具備非空政策或里程碑。
5. `[PASS]` `[DEV_LOGS_FORMAT]` 開發日誌每筆日期嚴格符合 `YYYY-MM-DD` 正規表示式。
6. `[PASS]` `[MAJOR_MILESTONES]` 包含至少 1 筆 `MAJOR` 重大規劃且附帶詳細子任務清單。
7. `[PASS]` `[EQUIDISTANT_RADIAL_LAYOUT]` 外環 7 座島圓心距離 (12.500) 與相鄰間距 (10.847) 100% 絕對等距。
8. `[PASS]` `[RWD_STYLES_CONTRACT]` `responsive.css` 集中宣告 768px/480px 斷點與 iOS 安全區。
9. `[PASS]` `[RWD_SEPARATION_OF_CONCERNS]` `timeline.css` 完全無非本職 media query 污染。
10. `[PASS]` `[CAMERA_PORTRAIT_ADAPTOR]` 相機模組具備長寬比直屏自適應視距算法。
11. `[PASS]` `[WANDERER_SCREEN_CLAMPING]` 旅人氣泡具備螢幕邊界安全鉗位防禦。
12. `[PASS]` `[SYNERGY_CONNECTIONS_EXIST]` 跨島協作線至少 6 條有效連線。
13. `[PASS]` `[SYNERGY_ENDPOINTS_VALID]` 協作端點均為合法島嶼且無自環。
14. `[PASS]` `[SEARCH_FILTER_PRECISION]` 全文檢索精準過濾匹配島嶼與條目。
15. `[PASS]` `[QUOTES_DATA_INTEGRITY]` 金句庫包含至少 10 條人生信條與架構心法。
16. `[PASS]` `[WANDERER_ENGINE_SOURCE_INTEGRITY]` 旅人引擎具備完整巡航、揮手與氣泡介面。
17. `[PASS]` `[WANDERER_AUTONOMOUS_ROAMING_CONTRACT]` 旅人自律計時器與自主漫遊出沒契約。
18. `[PASS]` `[WANDERER_DOM_AND_STYLES_CONTRACT]` 宿主 DOM 與毛玻璃樣式契約完整。

---

## 4. 長青活體規格庫 (Living Specifications SSOT)

詳細之幾何公式、頂點拉伸、材質參數與 TypeScript 介面定義請參閱：
- [docs/specs/life-island/spec.md](docs/specs/life-island/spec.md)


