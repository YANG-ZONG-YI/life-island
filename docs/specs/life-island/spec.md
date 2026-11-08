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

---

## 3. 8 大核心島嶼架構規範 (Eight Core Islands Specification)

系統必須存在且僅存在 8 座核心島嶼。所有島嶼之 `id` 與 `axialCoords` MUST 具備唯一性。

### 3.1 島嶼矩陣清單

| 島嶼識別碼 (id) | 名稱 (name) | 軸向座標 (q, r) | 高度係數 (height) | 主題色調 (color) | 強調光暈 (accentColor) | 地標類型 (landmark) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `dev-island` | 開發與演進之島 | `(0, 0)` | `1.20` | `0x0ea5e9` | `#38bdf8` | 科技通訊核心高塔 (Cyber Obelisk) |
| `north-star` | 北極星之島 | `(0, -2)` | `1.50` | `0xf59e0b` | `#fbbf24` | 幾何水晶巨石陣 (Crystalline Monoliths) |
| `craft-impact` | 事業與影響力之島 | `(2, -2)` | `1.30` | `0x3b82f6` | `#60a5fa` | 未來摩天大樓群 (Tech Tower Cluster) |
| `wisdom-knowledge` | 心智與學習之島 | `(-2, 2)` | `1.40` | `0x8b5cf6` | `#a78bfa` | 環形星象天文臺 (Arcane Observatory) |
| `vitality-health` | 生命力與健康之島 | `(0, 2)` | `1.10` | `0x10b981` | `#34d399` | 生命之樹自然林 (Sacred World Tree) |
| `wealth-architecture` | 財富與資源之島 | `(2, 0)` | `1.25` | `0xd97706` | `#f59e0b` | 金色階梯金字塔 (Step Pyramid Vault) |
| `deep-connections` | 深度連結之島 | `(-2, 0)` | `1.15` | `0xf43f5e` | `#fb7185` | 雙螺旋共振立柱 (Intertwined Spire) |
| `adventure-joy` | 探索與冒險之島 | `(1, 1)` | `1.20` | `0xf97316` | `#fb923c` | 險峰營地與燈塔 (Mountain Peak) |

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
  id: string;                      // 日誌識別碼 (格式：log-YYYY-MM-DD)
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
| :--- | :--- | :--- | :--- | :--- |
| `log-2026-11-09` | `2026-11-09` | `[MAJOR]` | `[COMPLETED]` | Life Island 3D 零框架純靜態系統正式立項與架構確立 |
| `log-2026-11-15` | `2026-11-15` | `[ARCHITECTURE]` | `[COMPLETED]` | 低多邊形水波 Shader 動態流光與視角跟隨演算法 |
| `log-2026-12-01` | `2026-12-01` | `[MAJOR]` | `[PLANNED]` | 跨維度協作光流線 (Synergy Lines) 與動態天氣著色器計畫 |

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
