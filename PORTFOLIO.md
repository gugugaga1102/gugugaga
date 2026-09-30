# 待辦清單 Web App

這是一個在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App。使用者可以新增、完成、刪除與整理待辦事項，並透過瀏覽器保存目前的清單狀態。

## 線上展示

[GitHub Pages](https://<你的帳號>.github.io/<你的repo名稱>/)

> 請將網址中的 `<你的帳號>` 與 `<你的repo名稱>` 替換成實際的 GitHub 帳號與 repository 名稱。

## 功能

- 新增待辦事項，並限制內容長度為 100 個字元。
- 將待辦事項標記為已完成或取消完成。
- 以刪除按鈕移除單筆待辦事項。
- 顯示目前未完成的待辦事項數量。
- 顯示空清單提示文字。
- 一次清除所有已完成的待辦事項。
- 清除已完成事項前使用瀏覽器內建確認對話框，避免誤刪。
- 沒有已完成事項時，隱藏「清除已完成」按鈕。
- 使用 `aria-label` 輔助描述勾選框、刪除按鈕與清除按鈕。
- 使用響應式版面，支援較小的螢幕寬度。

## 技術

- 使用純 HTML、CSS 與原生 JavaScript。
- 不使用任何框架、套件或外部 CDN。
- 透過 CSS 變數集中管理色彩與介面樣式。
- 使用 `localStorage` 保存待辦事項，重新整理頁面後仍可保留資料。
- 使用 `textContent` 與 `createElement` 建立待辦內容，避免將使用者輸入當成 HTML 執行。

## 開發方式

- 使用 GitHub Copilot Agent Mode，從需求出發建立待辦清單的頁面結構、樣式與互動邏輯。
- 透過 MCP 連接 Microsoft Learn 與 GitHub，查詢官方文件並讀取 repository issue。
- 在 `.github/prompts/fix-issue.prompt.md` 定義可重複執行的 agentic workflow，讓 Agent 依序讀取 issue、提出修正計畫、建立分支、修改程式、驗證、提交推送並建立 Pull Request。
- 透過 Git 分支、提交與 Pull Request 管理功能修正，讓每次變更都有清楚的歷史紀錄。

## 我學到什麼

- 如何使用自然語言需求，讓 GitHub Copilot Agent Mode 協助完成一個完整的前端功能。
- 如何以 `localStorage` 保存瀏覽器端資料，並在資料變更後同步更新畫面。
- 如何使用 MCP 查詢官方文件與 GitHub issue，讓開發決策有可靠的資料來源。
- 如何把 issue 修復流程整理成可重複執行的 prompt 與 agentic workflow。
- 如何透過分支、提交與 Pull Request，將功能開發與問題修復拆成可追蹤的工作單位。
