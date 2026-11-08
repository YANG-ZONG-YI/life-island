# [LIVING_SPECS] 長青活體規格庫 (Living Specifications SSOT)

本目錄存放 Life Island 各業務與技術模組經完整驗收後的最新基準規格。

---

## 1. 規格索引導航 (Specification Index)

| 模組代號 | 規格文件路徑 | 核心範疇 | 狀態 |
| :--- | :--- | :--- | :---: |
| `life-island` | [`life-island/spec.md`](life-island/spec.md) | 軸向六角座標系幾何公式、8 大核心島嶼實體矩陣、開發島日期日誌資料契約、Three.js 低多邊形程序化拉伸參數 | **[APPROVED]** |

---

## 2. 規格維護原則
1. **單一事實來源 (SSOT)**：所有代碼實作與測試案例必須嚴格以本目錄規格為唯一驗收基準。
2. **無暫態對話**：嚴禁寫入對話流水帳、討論推論過程或非確定性假設。
3. **RFC 2119 約束**：強制使用大寫規範關鍵字（MUST, SHOULD, SHALL 等）。
4. **重大規劃規範對齊**：根目錄 [`../../README.md`](../../README.md) 中之「重大開發規格」與本庫規格保持 100% 同步。
