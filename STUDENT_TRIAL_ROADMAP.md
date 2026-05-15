# 学生トライアル支援セクション 実装ロードマップ

## 現状
- `StudentTrialSection` コンポーネント実装済み: `src/components/StudentTrialSection.tsx`
- データライブラリ実装済み: `src/lib/studentTeams.ts`
- トップページに組み込み済み（HappeningSection と BoardSection の間）
- microCMS 未設定のため、現在はダミーデータ3件を表示中

---

## NEXT: STEP 1 — microCMSに `student-teams` APIを作成

### microCMS管理画面での作業
1. `https://app.microcms.io` → tamano-mirai サービスを開く
2. 「APIを追加」→「リスト形式」を選択
3. API名: `学生チーム` / API ID: `student-teams`
4. 以下のフィールドを追加:

| フィールドID | 表示名 | 種類 | 必須 |
|---|---|---|---:|
| `teamName` | チーム名 | テキストフィールド | ✅ |
| `theme` | 活動テーマ | テキストフィールド | ✅ |
| `description` | 活動内容 | テキストエリア | ✅ |
| `photo` | 写真 | 画像 | |
| `date` | 活動開始日 | 日時 | ✅ |

5. 「保存する」

---

## STEP 2 — 実際の団体データを投稿

- 各チームをコンテンツとして1件ずつ追加
- コンテンツIDはチーム名をローマ字にしたものを使用（例: `tamano-gohan-tsushin`）
- `date` は活動開始月の1日を入力（例: `2026-04-01`）
- 写真は後から追加してもOK（未設定時は青いプレースホルダーが表示される）

投稿するとダミーデータから自動で切り替わる。

---

## STEP 3 — 写真の追加

各チームのミーティング・活動の様子の写真を用意して、microCMSの管理画面から各コンテンツの `photo` フィールドに追加する。

写真の推奨比率: **16:9**（横長）

---

## STEP 4 — 今後の拡張（任意）

- チーム個別の詳細ページ（`/students/[slug]`）が必要になった場合は追加
- 活動報告レポートフィールドの追加（`report`: リッチエディタ）
- 「活動終了」フラグの追加（終了したチームの扱いを決める）

---

## 参考ファイル
- コンポーネント: `src/components/StudentTrialSection.tsx`
- データライブラリ: `src/lib/studentTeams.ts`
- 制度詳細ページ（玉野市公式）: https://www.city.tamano.lg.jp/soshiki/8/52233.html
- 問い合わせ先: 玉野市 協働・交通政策課 TEL: 0863-32-5567
