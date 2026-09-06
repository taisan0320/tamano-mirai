import type { Article } from "@/lib/articles";
import { authorName } from "@/lib/format";

/* 執筆者の肩書き。
   将来microCMSに「執筆者」コンテンツ型を作ったらそちらへ移す想定で、
   いまは記事の author 名から肩書きを引けるようにしておく。 */

const WRITER_ROLES: Record<string, string> = {
  "西田井 祐也": "副理事長／地域学校連携コーディネーター・社会教育士",
  "東 りえ": "理事長／総務省 地域力創造アドバイザー",
  "内尾 玲": "副理事長",
  編集部: "玉野SDGsみらいづくりセンター",
  "玉野SDGsみらいづくりセンター": "玉野SDGsみらいづくりセンター",
};

export function writerRole(name: string): string {
  return WRITER_ROLES[name] ?? "玉野SDGsみらいづくりセンター";
}

export interface WriterSummary {
  name: string;
  role: string;
  count: number;
}

/** 記事一覧から「書いている人」を本数つきで集計する */
export function summarizeWriters(
  articles: Article[],
  limit = 3
): WriterSummary[] {
  const counts = new Map<string, number>();
  for (const article of articles) {
    const name = authorName(article);
    counts.set(name, (counts.get(name) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count]) => ({ name, role: writerRole(name), count }));
}
