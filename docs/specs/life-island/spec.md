# [SPEC: LIFE_ISLAND_3D] Life Island 3D 互動島嶼系統規格書

## 1. 規範基準與範疇 (Normative References & Scope)

### 1.1 詞彙約束
本文件之關鍵詞「MUST」、「MUST NOT」、「REQUIRED」、「SHALL」、「SHALL NOT」、「SHOULD」、「SHOULD NOT」、「RECOMMENDED」、「MAY」及「OPTIONAL」遵循 RFC 2119 規範詮釋。

### 1.2 系統範疇
本規格書定義 Life Island 3D 互動視覺化系統之單一事實來源 (SSOT)，包含軸向六角座標系統、3D 實體網格生成契約、8 大核心島嶼資料結構、開發島時間軸日誌模型，以及靜態伺服端拓撲約束。

---

## 2. 空間幾何與六角座標契約 (Spatial Geometry & Axial Coordinates)

### 2.1 軸向座標系定義
系統採用軸向座標系統 (Axial Coordinate System, `q, r`)。每個島嶼單元 MUST 具備唯一且不衝突之 `(q, r)` 整數座標。

#### 座標映射公式
軸向座標轉換至三維笛卡爾世界座標 `(x, y, z)` 必須遵循下列幾何算式：
- `x = HEX_RADIUS * sqrt(3) * (q + r / 2)`
- `y = baseHeight * 0.5`
- `z = HEX_RADIUS * 1.5 * r`

其中：
- `HEX_RADIUS` 常量固定為 `3.6` 單位。
- `baseHeight` 為基礎柱體高度：`baseHeight = 1.6 * island.height`。

### 2.2 六角柱幾何結構約束 (Hexagonal Prism Extrusion)
六角柱多邊形頂點 SHALL 依循以下極座標生成，初始相位角 MUST 偏移 `pi / 6` (30 度)：
- `angle_i = (pi / 3) * i + (pi / 6)`，其中 `i in [0, 5]`
- `x_i = radius * cos(angle_i)`
- `y_i = radius * sin(angle_i)`

幾何拉伸參數約束：
- `ExtrudeSettings.steps = 1`
- `ExtrudeSettings.depth = baseHeight`
- `ExtrudeSettings.bevelEnabled = true`
- `ExtrudeSettings.bevelThickness = 0.25`
- `ExtrudeSettings.bevelSize = 0.25`
- `ExtrudeSettings.bevelOffset = -0.1` (`-bevel * 0.4`)
- `ExtrudeSettings.bevelSegments = 1`

幾何體沿 X 軸旋轉 `pi / 2` 弧度，使六角截面朝向天頂正上方 (Y 軸向上)。

### 2.3 正七邊形極座標等距契約 (Radial Equidistant Archipelago)
為解決離散整數座標在外環分佈不均勻之缺陷，系統採用正七邊形極座標等距算法定位世界座標：
- **中央核心島 (`dev-island`)**：$(X_0, Z_0) = (0, 0)$。
- **外環 7 大支柱島嶼**：
  - 軌道半徑：`EQUIDISTANT_RADIUS = 12.50` 單位。
  - 方位角：$\theta_i = -\frac{\pi}{2} + i \times \frac{2\pi}{7}$，其中 $i \in [0, 6]$（以正北方向為起點順時針均分）。
  - 世界座標：$X_i = 12.5 \times \cos(\theta_i)$，$Z_i = 12.5 \times \sin(\theta_i)$。
- **等距不變量約束**：
  - 外環所有島嶼到中心距離 MUST 嚴格等於 $12.500 \pm 0.005$。
  - 外環任意相鄰兩島間距 MUST 嚴格等於 $10.847 \pm 0.008$。

---

## 3. 8 大核心島嶼架構規範 (Eight Core Islands Specification)

系統必須存在且僅存在 8 座核心島嶼。所有島嶼之 `id` 與 `axialCoords` MUST 具備唯一性。

### 3.1 島嶼矩陣清單

| 島嶼識別碼 (id) | 名稱 (name) | 軸向座標 (q, r) | 高度係數 (height) | 主題色調 (color) | 強調光暈 (accentColor) | 五行與地標類型 (landmark) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `dev-island` | 開發與演進之島 | `(0, 0)` | `1.20` | `0x0284c7` | `#38bdf8` | 水行 · 天然珊瑚環礁與神泉 (Tidal Atoll & Springs) |
| `north-star` | 北極星之島 | `(0, -2)` | `1.50` | `0xf59e0b` | `#fde047` | 金行 · 晨曦白金石英晶簇 (Crystalline Cape) |
| `craft-impact` | 事業與影響力之島 | `(2, -2)` | `1.30` | `0x2563eb` | `#60a5fa` | 土行 · 喀斯特擎天柱與石橋 (Karst Pinnacle & Arch) |
| `wisdom-knowledge` | 心智與學習之島 | `(-2, 2)` | `1.40` | `0x8b5cf6` | `#c084fc` | 水木共生 · 深海天坑藍洞石窟 (Abyssal Blue Hole) |
| `vitality-health` | 生命力與健康之島 | `(0, 2)` | `1.20` | `0x059669` | `#34d399` | 木行 · 遠古巨榕氣根神木 (Ancient Sacred Banyan) |
| `wealth-architecture` | 財富與資源之島 | `(2, 0)` | `1.25` | `0xd97706` | `#fbbf24` | 金土相生 · 砂金階梯海蝕台地 (Stepped Ore Terraces) |
| `deep-connections` | 深度連結之島 | `(-2, 0)` | `1.15` | `0xf43f5e` | `#fda4af` | 木水交融 · 雙生海蝕石門珊瑚 (Twin Sea Arches) |
| `adventure-joy` | 探索與冒險之島 | `(1, 1)` | `1.25` | `0xea580c` | `#fb923c` | 火行 · 熔岩黑曜石海蝕火山 (Obsidian Lava Caldera) |

### 3.2 島嶼實體資料契約 (Island Entity Schema)

每個島嶼物件 MUST 符合以下 TypeScript 契約定義：

```typescript
interface IslandEntity {
  id: string;                      // 唯一字串識別碼 (格式：kebab-case)
  name: string;                    // 中文名稱
  subtitle: string;                // 英文副標題
  biome: string;                   // 生態環境描述
  color: number;                   // 16 進位數值 (例如 0x0ea5e9)
  accentColor: string;             // HEX 顏色字串 (例如 "#38bdf8")
  description: string;             // 核心宗旨敘述
  axialCoords: {
    q: number;                     // 軸向座標 Q
    r: number;                     // 軸向座標 R
  };
  height: number;                  // 垂直比例高度係數 (範圍 1.0 ~ 2.0)
  items: Array<{                   // 實踐原則與重點項目 (至少 1 項)
    id: string;                    // 項目唯一識別碼
    title: string;                 // 項目標題
    desc: string;                  // 項目說明
    status: "ACTIVE" | "CORE" | "IN_PROGRESS" | "CONTINUOUS" | "ONGOING" | "PLANNED";
  }>;
}
```

---

## 4. 開發島時間軸日誌規範 (Development Island Timeline Logs Specification)

### 4.1 資料模型契約 (DevLog Entity Schema)
開發島具備專屬之結構化時間軸日誌清單 `devLogs`，記錄系統之架構決策與重大規劃。每個日誌項目 MUST 包含有效之 `YYYY-MM-DD` 格式日期。

```typescript
interface DevLogEntity {
  id: number;                      // 唯一且遞增之正整數識別碼 (1, 2, 3...)
  date: string;                    // 格式：YYYY-MM-DD
  type: "MAJOR" | "ARCHITECTURE" | "FEATURE";
  title: string;                   // 日誌標題
  summary: string;                 // 摘要說明
  details: string[];               // 細節條列清單 (長度 >= 1)
  status: "COMPLETED" | "IN_PROGRESS" | "PLANNED";
}
```

### 4.2 初始日誌基準清單

| 日誌識別碼 (id) | 日期 (date) | 類型 (type) | 狀態 (status) | 標題 (title) |
| :---: | :--- | :--- | :--- | :--- |
| `1` | `2026-11-09` | `[MAJOR]` | `[COMPLETED]` | Life Island 3D 零框架純靜態系統正式立項與架構確立 |
| `2` | `2026-11-09` | `[ARCHITECTURE]` | `[COMPLETED]` | 低多邊形水波 Shader 動態流光與視角跟隨演算法 |
| `3` | `2026-11-09` | `[MAJOR]` | `[COMPLETED]` | 全平台現代化 RWD 響應式佈局與直屏 3D 相機自適應 |
| `4` | `2026-11-09` | `[ARCHITECTURE]` | `[COMPLETED]` | Cloudflare Pages 邊緣雲與 GitHub 雙軌零構建秒開交付 |
| `5` | `2026-11-09` | `[MAJOR]` | `[COMPLETED]` | 正七邊形極座標完美等距群島幾何重構 (方案 A) |
| `6` | `2026-11-09` | `[MAJOR]` | `[COMPLETED]` | 探險小旅人自主隨機漫遊出沒模式 (方案 1) |
| `7` | `2026-11-09` | `[MAJOR]` | `[PLANNED]` | 跨維度協作光流線 (Synergy Lines) 與動態天氣著色器計畫 |

---

## 5. 運行環境與可觀測性探針契約 (Runtime & Observability Probes)

### 5.1 服務架構
- 靜態託管容器：Nginx Alpine 映像檔 (`life_island_web`)
- 測試運行容器：Node.js 20 Alpine (`life_island_tester`)
- 對外服務端口：主機端 `8080` 映射至容器端 `80`

### 5.2 健康探針驗證準則
- **[PROBE: HTTP_STATUS]**：發送 `GET /` 請求 MUST 回傳 `HTTP 200 OK`，且回應標頭 `Content-Type` 必須為 `text/html`。
- **[PROBE: STATIC_ASSETS]**：應用核心檔案 (`/app.js`、`/data.js`、`/dataLogs.js`、`/style.css`、`/engine/*.js`) 存取 MUST 回傳 `HTTP 200 OK`。
- **[PROBE: CLIENT_RENDERING]**：零伺服器運算契約。三維網格計算、動態 Shader 渲染與射線拾取 100% 於客戶端瀏覽器執行。

### 5.3 全平台 RWD 與直屏動態視野契約 (Responsive Web Design & Portrait Dynamics)
- **[RWD: BREAKPOINTS]**：系統必須區分平板 (`max-width: 768px`) 與手機 (`max-width: 480px`) 斷點，集中宣告於 `css/responsive.css`。
- **[RWD: SAFE_AREA]**：全屏抽屜與 HUD 導航列必須遵守 iOS 安全區契約 (`env(safe-area-inset-top)` / `env(safe-area-inset-bottom)`)。
- **[RWD: PORTRAIT_CAMERA]**：當螢幕寬高比 `aspect < 1.0` 時，相機預設距離必須動態放大 ($1.0 \sim 1.85\times$)，保證 8 座群島全景於直屏手機完整可見無裁切。
- **[RWD: SCREEN_CLAMPING]**：3D 氣泡投影至螢幕像素時，必須施加邊界安全鉗位（左右預留 $140\text{px}$、頂部預留 $90\text{px}$），杜絕邊界截斷。

---

## 6. 跨島協作光流線與 3D 聚光搜尋規範 (Synergy & Search Specification)

### 6.1 協作網絡契約 (Synergy Connection Schema)
```typescript
interface SynergyConnection {
  from: string;      // 來源島嶼 ID (MUST 為合法 8 大島嶼之一)
  to: string;        // 目標島嶼 ID (MUST 不等於 from)
  label: string;     // 關聯語意說明
  strength: number;  // 關聯強度 [0.1, 1.0]
}
```
- 系統 MUST 包含至少 6 條以上有效跨島連線。
- 幾何呈現：以 `CubicBezierCurve3` 在三維空間中拉出拱形空中光弧，頂點由兩島中心向空中抬升 $(y + 3.0 \sim 4.5)$。
- 流光動畫：透過 `LineDashedMaterial.dashOffset` 於渲染迴圈中動態更新，呈現能量流動感。

### 6.2 3D 聚光燈聚焦機制 (Spotlight Focus Dynamics)
- 聚光幾何：半透明圓柱體錐光 (Volumetric Cylinder Mesh) 搭配地面光環。
- 焦點聚焦時，非目標島嶼之透明度/亮度降低至 42% (Focus Dimming)，目標島嶼光柱垂直升起；清除焦點時精確恢復 100% 原狀。

### 6.3 模糊檢索核心 (Search Engine Precision)
- 搜尋範圍涵蓋島嶼名稱、副標題、政策/里程碑標題與內文詳細步驟、以及開發日誌。
- 檢索演算法回傳格式：`Array<{ islandId: string, islandName: string, matchedItems: Array<{ title: string, type: string }> }>`。
- 響應時間 MUST < 50ms。

---

## 7. 微縮探險小旅人與心法金句規範 (The Wanderer Mascot & Wisdom Quotes Specification)

### 7.1 幾何與材質契約 (Mascot Geometry & Shader)
- 構造：純代碼程序化低多邊形組合體，包含軀幹 (`CylinderGeometry`)、頭部 (`SphereGeometry`)、卡其探險帽雙層組合、皮質背包與雙腿。
- 右手臂掛載獨立旋轉樞軸 (`rightArmPivot`)，支援 `Z` 軸旋轉揮手打招呼動畫。
- 標記屬性：小旅人所屬 Mesh 均標記 `userData.isWanderer = true` 與 `userData.isClickable = true`。

### 7.2 動態位移與巡航動力學 (Trajectory & State Dynamics)
- **閒置呼吸**：閒置狀態下軀幹於 Y 軸執行正弦週期微浮動 ($\pm 0.02$ 單位)。
- **島嶼巡航**：當目標島嶼切換時，旅人面向目標點，依循拋物線軌跡 (`lerpVectors` + 拱起弧度 $4.2 \times \sin(\pi \times progress)$) 躍動巡航，耗時固定為 $1.1$ 秒。
- **自主漫遊出沒機制 (Autonomous Roaming)**：
  - 閒置無操作滿 $14 \sim 22$ 秒（隨機冷卻）時，小旅人自主挑選另一座相異島嶼躍動跳躍巡航。
  - 抵達目標島嶼後揮手致意，並以 $40\%$ 機率主動展示心法金句氣泡（停留 $4.5$ 秒後淡出）。
  - 使用者手動選島操作享有絕對搶佔優先權 (Preemption Guard)，立即重置閒置計時器。
- **抵達反饋**：降落目標島頂面後，自動觸發 2 週期的揮手致意動畫。

### 7.3 心法金句氣泡契約 (Wisdom Quotes Bubble)
- 氣泡 DOM：以 `#wanderer-bubble` 為宿主容器，具備毛玻璃擬態 (`backdrop-filter: blur(14px)`) 與指向小指針。
- 空間投影：三維世界座標即時映射至二維螢幕像素 ($x, y$)，跟隨相機旋轉與縮放。
- 金句資料源：由 `dataQuotes.js` 隨機抽取，顯示時間為 5.5 秒後自動淡出。


