import type { Article } from "@/lib/articles";

/* 記事の表示まわりで共通して使う小さな関数。
   トップページと記事詳細で同じ見え方にするため、ここに集約する。 */

/** 2026.05.27 の形式にする */
export function formatDate(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

/** 日付主導のリスト用に「月」と「日」を分けて返す */
export function formatMonthDay(value: string): { month: string; day: string } {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return { month: "", day: "" };
  return {
    month: String(d.getMonth() + 1),
    day: String(d.getDate()).padStart(2, "0"),
  };
}

/** 本文の文字数から読了時間を出す（日本語はおよそ500字/分） */
export function readingMinutes(body: string): number {
  const text = (body || "").replace(/<[^>]*>/g, "").replace(/\s+/g, "");
  return Math.max(1, Math.round(text.length / 500));
}

/** 執筆者名。未設定なら編集部として扱う */
export function authorName(article: Pick<Article, "author">): string {
  return article.author?.trim() || "編集部";
}
