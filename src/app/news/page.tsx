export const revalidate = 60;

import type { Metadata } from "next";
import Link from "next/link";
import { fetchArticlesByCategory, getArticleUrl } from "@/lib/articles";
import ArchiveLayout, { EmptyState } from "@/components/ArchiveLayout";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "お知らせ",
  description: "玉野SDGsみらいづくりセンターからのお知らせ・活動報告です。",
};

export default async function NewsPage() {
  const items = await fetchArticlesByCategory("news", 100);

  const byYear = items.reduce<Record<string, typeof items>>((acc, item) => {
    const year = new Date(item.date).getFullYear().toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(item);
    return acc;
  }, {});

  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  return (
    <ArchiveLayout
      label="NEWS"
      title="お知らせ"
      description="センターからのお知らせ・活動報告です。"
    >
      {items.length === 0 && <EmptyState>公開中のお知らせはありません。</EmptyState>}

      {years.map((year, index) => (
        <section key={year} className={index > 0 ? "mt-10" : ""}>
          <h2 className="border-b border-ink pb-2 text-[16px] font-bold text-ink">
            {year}年
          </h2>
          <div className="divide-y divide-border-line">
            {byYear[year].map((article) => (
              <Link
                key={article.slug}
                href={getArticleUrl(article)}
                className="card-interactive group -mx-3 flex flex-col gap-1 rounded px-3 py-3.5 sm:flex-row sm:items-baseline sm:gap-4"
              >
                <span className="shrink-0 text-[12px] leading-tight text-ink-soft sm:w-[84px]">
                  {formatDate(article.date)}
                </span>
                <span className="min-w-0">
                  <span className="block text-[14px] font-bold leading-[1.5] text-ink group-hover:text-ocean sm:text-[15px]">
                    {article.title}
                  </span>
                  <span className="mt-1 block text-[12px] leading-[1.7] text-ink-soft">
                    {article.excerpt}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </ArchiveLayout>
  );
}
