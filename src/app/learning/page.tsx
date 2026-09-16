export const revalidate = 60;

import type { Metadata } from "next";
import Link from "next/link";
import { fetchArticlesByCategory, LEARNING_TAGS } from "@/lib/articles";
import ArchiveLayout, { EmptyState } from "@/components/ArchiveLayout";
import ArticleRow from "@/components/ArticleRow";

/* 学びを、考える。
   教育全般の記事とAIの記事を1つのカテゴリ（learning）にまとめ、
   中の区別はタグ（「AI」「教育」）で行う。
   本数が少ないうちは棚を分けず、付箋で見分ける方針。 */

export const metadata: Metadata = {
  alternates: { canonical: "/learning" },
  title: "学びを、考える。",
  description:
    "教育全般のことや、AIのこと。学校に限らない「学び」について考えたことを書いています。",
};

export default async function LearningPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const activeTag = LEARNING_TAGS.find((t) => t === tag) ?? null;

  const all = await fetchArticlesByCategory("learning", 100);
  const hasTag = (t: string) => (a: (typeof all)[number]) => (a.tags ?? []).includes(t);
  const articles = activeTag ? all.filter(hasTag(activeTag)) : all;

  const filters = [
    { key: null, label: "すべて", count: all.length },
    ...LEARNING_TAGS.map((t) => ({ key: t, label: t, count: all.filter(hasTag(t)).length })),
  ];

  return (
    <ArchiveLayout
      label="LEARNING"
      title="学びを、考える。"
      description="教育全般のことや、AIのこと。学校に限らない「学び」について考えたことを書いています。"
    >
      <div className="mb-4 flex flex-wrap gap-2">
        {filters.map((f) => {
          const isActive = f.key === activeTag;
          return (
            <Link
              key={f.label}
              href={f.key ? `/learning?tag=${encodeURIComponent(f.key)}` : "/learning"}
              className={`rounded-full border px-3 py-1 text-[12px] ${
                isActive
                  ? "border-ink bg-ink text-white"
                  : "border-border-line text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {f.label}
              <span className="ml-1 opacity-70">{f.count}</span>
            </Link>
          );
        })}
      </div>

      {articles.length === 0 ? (
        <EmptyState>
          {activeTag === "AI" ? "AIの記事は準備中です。" : "公開中の記事はありません。"}
        </EmptyState>
      ) : (
        <div className="divide-y divide-border-line border-t border-border-line">
          {articles.map((article) => (
            <ArticleRow
              key={article.slug}
              article={article}
              labels={(article.tags ?? []).filter((t) => LEARNING_TAGS.includes(t))}
            />
          ))}
        </div>
      )}
    </ArchiveLayout>
  );
}
