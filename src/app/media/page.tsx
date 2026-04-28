import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { articles, CATEGORY_LABEL, type Category } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

export const metadata: Metadata = {
  title: "ニュース・メディア",
  description: "玉野SDGsみらいづくりセンターによるイベント情報・インタビュー記事・お知らせです。",
};

const categories: { key: Category | "all"; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "event", label: "イベント情報" },
  { key: "interview", label: "インタビュー" },
  { key: "news", label: "お知らせ" },
];

export default function MediaPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  return <MediaPageInner searchParams={searchParams} />;
}

async function MediaPageInner({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: categoryParam } = await searchParams;
  const activeCategory = (categoryParam || "all") as Category | "all";

  const filtered =
    activeCategory === "all"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div>
      {/* Page Header */}
      <div className="bg-primary py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">ホーム</Link>
            <ChevronRight size={12} />
            <span className="text-white">ニュース・メディア</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">ニュース・メディア</h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            イベント情報・地域インタビュー・活動レポートをお届けします。
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-border sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-none">
            {categories.map((c) => (
              <Link
                key={c.key}
                href={c.key === "all" ? "/media" : `/media?category=${c.key}`}
                className={`shrink-0 text-sm font-medium px-4 py-1.5 rounded-full transition-colors ${
                  activeCategory === c.key
                    ? "bg-primary text-white"
                    : "bg-surface text-slate-600 hover:bg-slate-200"
                }`}
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Articles */}
      <section className="bg-surface py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {sorted.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <p className="text-lg">記事がありません</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sorted.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
