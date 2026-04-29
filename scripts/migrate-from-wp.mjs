/**
 * WordPress → microCMS 記事移行スクリプト
 *
 * 事前準備:
 *   1. microCMS の articles API で category フィールドに "blog" を追加する
 *   2. microCMS ダッシュボード → API設定 → Write APIキーを取得する
 *   3. .env.local に以下を追加する:
 *        MICROCMS_WRITE_API_KEY=xxxxxxxxxxxxxxxxxx
 *
 * 実行方法:
 *   node scripts/migrate-from-wp.mjs
 *
 * 注意:
 *   - 画像（サムネイル）は移行されません。後から手動でmicroCMSに設定してください。
 *   - 同じ記事を複数回実行すると重複して作成されます。
 *     dry-run モードで内容確認してから実行することを推奨します:
 *       DRY_RUN=true node scripts/migrate-from-wp.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── 環境変数の読み込み ────────────────────────────────────────────────────────
const envPath = path.join(__dirname, "../.env.local");
const env = {};
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, "utf-8")
    .split("\n")
    .forEach((line) => {
      const eqIdx = line.indexOf("=");
      if (eqIdx > 0 && !line.startsWith("#")) {
        const key = line.slice(0, eqIdx).trim();
        const val = line.slice(eqIdx + 1).trim();
        env[key] = val;
      }
    });
}

const SERVICE_DOMAIN = env.MICROCMS_SERVICE_DOMAIN;
const WRITE_API_KEY = env.MICROCMS_WRITE_API_KEY;
const DRY_RUN = process.env.DRY_RUN === "true";

if (!DRY_RUN && (!SERVICE_DOMAIN || !WRITE_API_KEY)) {
  console.error(
    "\n❌ エラー: .env.local に以下を設定してください:\n" +
      "   MICROCMS_SERVICE_DOMAIN=your-service-domain\n" +
      "   MICROCMS_WRITE_API_KEY=your-write-api-key\n"
  );
  process.exit(1);
}

if (DRY_RUN) {
  console.log("🔍 DRY RUN モード: microCMSへの書き込みは行いません\n");
}

// ── WordPress カテゴリ ID → microCMS category のマッピング ────────────────────
const CATEGORY_MAP = {
  17: "event",   // イベント情報
  30: "blog",    // コーディネーター日記
  1: "news",     // お知らせ
  7: "news",     // 活動報告
  8: "news",     // 学び
  16: "news",    // セミナー
};

// ── ユーティリティ ────────────────────────────────────────────────────────────
function stripHtml(html = "") {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#\d+;/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function makeExcerpt(html = "", maxLen = 120) {
  const text = stripHtml(html);
  return text.length > maxLen ? text.slice(0, maxLen) + "…" : text;
}

// ── WordPress REST API ────────────────────────────────────────────────────────
async function fetchWpPosts() {
  const url =
    "https://npo-tamano-mirai.com/wp-json/wp/v2/posts" +
    "?per_page=100&_fields=id,title,content,excerpt,date,categories";
  const res = await fetch(url);
  if (!res.ok) throw new Error(`WordPress API error: ${res.status}`);
  return res.json();
}

// ── microCMS Write API ────────────────────────────────────────────────────────
async function createArticle(payload) {
  if (DRY_RUN) return { id: "(dry-run)" };

  const res = await fetch(
    `https://${SERVICE_DOMAIN}.microcms.io/api/v1/articles`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-MICROCMS-API-KEY": WRITE_API_KEY,
      },
      body: JSON.stringify(payload),
    }
  );
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`microCMS error ${res.status}: ${body}`);
  }
  return res.json();
}

// ── メイン処理 ────────────────────────────────────────────────────────────────
async function main() {
  console.log("📥 WordPress から記事を取得中...");
  const posts = await fetchWpPosts();
  console.log(`   ${posts.length} 件取得\n`);

  let ok = 0;
  let skipped = 0;
  let failed = 0;

  for (const post of posts) {
    const rawTitle = stripHtml(post.title?.rendered || "");
    if (!rawTitle) {
      console.log(`  ⏭  スキップ (タイトルなし, WP ID: ${post.id})`);
      skipped++;
      continue;
    }

    const wpCategoryId = post.categories?.[0];
    const category = CATEGORY_MAP[wpCategoryId] ?? "news";

    const excerpt =
      makeExcerpt(post.excerpt?.rendered) ||
      makeExcerpt(post.content?.rendered) ||
      "（本文をご覧ください）";

    const payload = {
      title: rawTitle,
      excerpt,
      category: [category],   // microCMS では配列型
      date: post.date,
      body: post.content?.rendered ?? "",
    };

    try {
      const result = await createArticle(payload);
      const icon = DRY_RUN ? "👀" : "✅";
      console.log(
        `  ${icon} [${category.padEnd(9)}] "${rawTitle.slice(0, 40)}" → ID: ${result.id}`
      );
      ok++;
    } catch (err) {
      console.error(`  ❌ エラー: "${rawTitle.slice(0, 40)}" → ${err.message}`);
      failed++;
    }

    // microCMS APIのレート制限に配慮して 500ms 待機
    if (!DRY_RUN) await new Promise((r) => setTimeout(r, 500));
  }

  console.log(
    `\n${"─".repeat(50)}\n` +
      `✅ 成功: ${ok} 件   ⏭  スキップ: ${skipped} 件   ❌ 失敗: ${failed} 件`
  );

  if (DRY_RUN) {
    console.log(
      "\n📝 DRY RUN 完了。内容を確認し、問題がなければ本実行してください:\n" +
        "   node scripts/migrate-from-wp.mjs\n"
    );
  }
}

main().catch((err) => {
  console.error("\n予期しないエラー:", err);
  process.exit(1);
});
