# empowerment

光明洲實修中心協會：2026/12/27 千手千眼觀音灌頂活動頁與報名表。

線上位址：https://gcdrcommunity.github.io/empowerment/

| 檔案 | 內容 |
|---|---|
| `index.html` | 活動介紹與報名表（表單送到 `https://tw.chimirinpoche.org/api/register`） |
| `thanks.html` | 送出後的感謝頁，依 `?r=free|ok|transfer|fail` 顯示 |
| `app.js` | 算總計、依選擇顯示付款與收據欄位 |
| `style.css` | 沿用 `gcdrcommunity/chenrezig` 的樣式，加上表單樣式 |

## 報名資料與付款

- 後端在官網 repo `oseling-tw-site`：`functions/api/register.js`、`lib/register.js`（欄位與金額檢查以那邊為準）。
- 每筆報名寫進財務試算表的「活動報名」分頁；有牌位或護持金額的另寫一列「線上護持」，刷卡與 ATM 走藍新，對帳、收據、確認信照官網護持的流程。
- 牌位 1,000、功德主 24,000 這兩個金額在 `app.js` 與後端 `lib/register.js` 的 `EVENTS` 各有一份，要改兩邊一起改。

## 注意

- 這個網址會放進海報與 Notion 活動頁，不可更名。
- 表單欄位名稱（`name="..."`）是後端的一部分，改名後端就收不到。
