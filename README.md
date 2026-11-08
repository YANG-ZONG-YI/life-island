# [LIFE_ISLAND_3D] Life Island 3D 互動微縮群島系統

> 致敬卡坦島風格（Catan Low-Poly 3D）與政策島互動微縮地圖設計理念之個人生涯願景、技術演進與重大規劃視覺化平台。

---

## 1. 重大開發規格 (Major Development Specifications)

本系統以單一事實來源 (SSOT) 與極限效能為最高準則，具備下列 6 項核心重大規格：

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
8. **`adventures-joy` 探索與心流體驗之島**：極限挑戰足跡、人生願望清單 (Bucket List)、海岸燈塔地標。

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

---

## 2. 系統目錄拓撲 (Project Topology)

```text
.
├── index.html                 # 語意化單頁入口 (透過 Importmap 載入 Three.js)
├── style.css                  # 現代樣式入口索引
├── css/
│   ├── base.css               # 全域 CSS 變數、重置、全螢幕 Canvas、HUD 控制列
│   ├── drawer.css             # 2D 玻璃擬態資訊抽屜 (Glassmorphism)
│   └── timeline.css           # 開發島專屬垂直時間軸、金色發光節點與重大規劃徽章
├── data.js                    # 8 大核心島嶼資料事實來源 (SSOT)
├── dataLogs.js                # 開發島日期時間軸日誌資料 (含 MAJOR 重大規劃)
├── engine/
│   ├── hexGrid.js             # 軸向座標 (q, r) 幾何運算與六角柱程序化生成
│   ├── water.js               # 低多邊形動態正弦水波計算引擎
│   ├── decorations.js         # 微縮地標裝飾調度器
│   ├── landmarksTech.js       # 科技、晶片天線、星芒塔、摩天方塊地標生成器
│   ├── landmarksNature.js     # 森林、金字塔、共鳴拱門、燈塔地標生成器
│   ├── camera.js              # 相機 OrbitControls 與平滑 Lerp 運鏡飛行引擎
│   └── ui.js                  # 2D UI 互動控制器 (抽屜渲染、時間軸、日夜切換)
├── app.js                     # 3D 場景主入口、光影、Raycasting 懸浮/點擊射線檢測
├── tests/
│   └── test_island_data.mjs   # 容器內 TAP 規格量化測試套件
├── docs/
│   └── specs/
│       ├── README.md          # 長青活體規格索引
│       └── life-island/
│           └── spec.md        # Life Island 3D 權威技術規格書 (RFC 2119)
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
docker compose exec tester node --test tests/test_island_data.mjs
```
**量化斷言測試涵蓋**：
1. `[PASS]` `[ISLAND_CORE_COUNT]` 精確包含 8 座核心島嶼。
2. `[PASS]` `[DEV_ISLAND_SPEC]` 必含 `dev-island` 且欄位符合型別約束。
3. `[PASS]` `[AXIAL_COORDINATE_COLLISION]` 8 座島嶼軸向座標 0 衝突重疊。
4. `[PASS]` `[ISLAND_POLICIES_AND_ITEMS]` 每座島嶼均具備非空政策或里程碑。
5. `[PASS]` `[DEV_LOGS_FORMAT]` 開發日誌每筆日期嚴格符合 `YYYY-MM-DD` 正規表示式。
6. `[PASS]` `[MAJOR_MILESTONES]` 包含至少 1 筆 `MAJOR` 重大規劃且附帶詳細子任務清單。

---

## 4. 長青活體規格庫 (Living Specifications SSOT)

詳細之幾何公式、頂點拉伸、材質參數與 TypeScript 介面定義請參閱：
- [docs/specs/life-island/spec.md](docs/specs/life-island/spec.md)

