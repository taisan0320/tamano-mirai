# 動く人たち（インタビュー機能）実装ロードマップ

## 現状
- デザインプレビューが完成済み: `src/app/interviews/preview/page.tsx`
- 西さんインタビューの全文データをハードコードで実装・確認済み
- 写真2枚を`public/`に配置済み:
  - `public/interview-nishi.jpg`（ヒーロー用・センター前での写真）
  - `public/interview-nishi-2.jpg`（本文途中・室内での取材写真）

## デザイン仕様（確定）

### ヒーローセクション（左右分割）
- 左半分: 人物写真（縦長・object-cover）
- 右半分: amber グラデーション背景 `linear-gradient(160deg, #6b3209, #9a500f, #c86d1a)`
  - ラベル「INTERVIEW — 動く人たち」
  - キャッチコピー（大きく・serif・`clamp(1.6rem, 4vw, 2.6rem)`）
  - アンバーの区切り線（`w-10 h-px`）
  - 肩書き（`text-xs tracking-widest uppercase text-white/50`）
  - 名前（`text-3xl font-bold font-serif text-white`）

### 本文エリア
- セクション番号: 巨大（`9rem`）アンバー薄字を背景グラフィックとして配置
- 各セクション: 小さいラベル番号 + アンバー横線 + serif見出し
- 最初の段落だけ `1.025rem`（リード文感）、以降 `0.975rem`
- 行間: `leading-[2]` `tracking-wide`

### Pull Quote
- `-mx-6` でコンテナ幅いっぱい / `bg-paper-alt`
- 左端にアンバーのグラデーション縦バー
- 背景に巨大な`❝`（`14rem`・opacity 0.08）
- テキスト: `clamp(1.15rem, 2.5vw, 1.5rem)` serif
- 末尾に `— {name}` のアトリビュート

### 途中写真
- `-mx-6` でフル幅
- 下からダークグラデーションオーバーレイ
- 白いキャプションテキストが写真内に浮かぶ

---

## STEP 1: microCMSにインタビュー専用APIを作成

### microCMS管理画面での作業
1. `https://app.microcms.io` → tamano-mirai サービスを開く
2. 「APIを追加」→「リスト形式」を選択
3. API名: `動く人たち` / API ID: `interviews`
4. 以下のフィールドを追加:

| フィールドID | 表示名 | 種類 | 必須 |
|---|---|---|---:|
| `name` | 名前 | テキスト | ✅ |
| `role` | 肩書き | テキスト | ✅ |
| `catchphrase` | キャッチコピー | テキスト | ✅ |
| `subtitle` | サブタイトル | テキスト | ✅ |
| `photo` | メイン写真 | 画像 | ✅ |
| `body` | 本文 | リッチテキスト | ✅ |
| `date` | 公開日 | 日時 | ✅ |
| `tags` | タグ | テキスト（複数値） | |

> **注意**: `body`はリッチテキスト（HTML）で入稿。セクション見出しはH2、Pull Quoteは`<blockquote>`タグで入力してもらう運用にする。

5. 西さんの記事を試しに1件投稿してAPIレスポンスを確認する

---

## STEP 2: `src/lib/interviews.ts` を新規作成

```typescript
// microCMSのinterviewsエンドポイント用クライアント
import { createClient, type MicroCMSListContent } from "microcms-js-sdk";

export interface Interview {
  slug: string;
  name: string;
  role: string;
  catchphrase: string;
  subtitle: string;
  photo?: string;
  body: string;
  date: string;
  tags?: string[];
}

type CMSInterview = MicroCMSListContent & {
  name: string;
  role: string;
  catchphrase: string;
  subtitle: string;
  photo?: { url: string };
  body: string;
  date?: string;
  tags?: string[];
};

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

function cmsToInterview(item: CMSInterview): Interview {
  return {
    slug: item.id,
    name: item.name,
    role: item.role,
    catchphrase: item.catchphrase,
    subtitle: item.subtitle,
    photo: item.photo?.url,
    body: item.body,
    date: item.date ?? item.publishedAt ?? new Date().toISOString(),
    tags: item.tags,
  };
}

export async function fetchAllInterviews(limit = 20): Promise<Interview[]> {
  const res = await client.getList<CMSInterview>({
    endpoint: "interviews",
    queries: { limit, orders: "-date" },
  });
  return res.contents.map(cmsToInterview);
}

export async function fetchInterviewBySlug(slug: string): Promise<Interview | null> {
  try {
    const item = await client.getListDetail<CMSInterview>({
      endpoint: "interviews",
      contentId: slug,
    });
    return cmsToInterview(item);
  } catch {
    return null;
  }
}

export async function fetchAllInterviewSlugs(): Promise<string[]> {
  const res = await client.getList<CMSInterview>({
    endpoint: "interviews",
    queries: { limit: 100, fields: "id" },
  });
  return res.contents.map((a) => a.id);
}
```

---

## STEP 3: ページファイルの実装

### 3-1. 一覧ページ `src/app/interviews/page.tsx`
- `fetchAllInterviews()` でデータ取得
- グリッドレイアウト: 写真サムネ + 名前 + 肩書き + キャッチコピー
- `export const revalidate = 60`

### 3-2. 詳細ページ `src/app/interviews/[slug]/page.tsx`
- `src/app/interviews/preview/page.tsx` のデザインをベースに実装
- ハードコードの `SAMPLE` データを `fetchInterviewBySlug(slug)` に置き換え
- `generateStaticParams` で `fetchAllInterviewSlugs()` を使用
- bodyはHTML（`dangerouslySetInnerHTML`）で表示
- Pull QuoteはCMS側で`<blockquote>`タグで入力 → CSSで自動スタイリング
- 途中写真はbody内に`<img>`で挿入（microCMSのリッチテキストで対応）

### 3-3. プレビューページの削除
- `src/app/interviews/preview/page.tsx` は実装完了後に削除

---

## STEP 4: ナビゲーション・サイトマップへの追加

- `src/components/Header.tsx` に「動く人たち」リンクを追加
- `src/app/sitemap.ts` にinterviewsルートを追加
- トップページの`CATEGORY_ROUTE`に `interview: "/interviews"` を確認（`src/lib/articles.ts`に既に定義済み）

---

## STEP 5: 動作確認・デプロイ

1. ローカルで `npm run dev` → 一覧・詳細ページの表示確認
2. `git push` → Vercel自動デプロイ
3. Vercelの環境変数に `MICROCMS_SERVICE_DOMAIN` / `MICROCMS_API_KEY` が設定済みか確認

---

## 参考ファイル
- デザインプレビュー: `src/app/interviews/preview/page.tsx`
- 既存のCMS連携実装: `src/lib/articles.ts`（パターンはこれに合わせる）
- 既存の詳細ページ: `src/app/media/[slug]/page.tsx`（参考）
- グローバルCSS: `src/globals.css`（`prose-article`クラスなど）
- microCMSサービスドメイン: `tamano-mirai`
