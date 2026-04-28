import type { Metadata } from "next";
import Link from "next/link";
import { fetchLatestArticles, fetchArticlesByCategory, CATEGORY_LABEL, type Category } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

export const metadata: Metadata = {
  title: "ニュース・メディア",
  description: "玉野SDGsみらいづくりセンターによるイベント情報・インタビュー記事・お知らせです。",
};

const categories: { key: Category | "all"; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "event", label: "イベント情報" },
  { key: "interview", label: "インタビュー" },
  { key: "story", label: "玉野の話" },
  { key: "news", label: "お知らせ" },
];

const categoryPillStyle: Record<string, string> = {
  all: "bg-ink text-white",
  event: "bg-amber-pale text-amber border border-amber/20",
  interview: "bg-ocean-pale text-ocean border border-ocean/20",
  story: "bg-coral-pale text-coral border border-coral/20",
  news: "bg-forest-pale text-forest border border-forest/20",
};

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

  const sorted =
    activeCategory === "all"
      ? await fetchLatestArticles(100)
      : await fetchArticlesByCategory(activeCategory, 100);

  return (
    <div className="bg-paper">
      {/* Page Header */}
      <div className="bg-ink py-20">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="section-label text-white/40 mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-white/70 transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-white/60">NEWS & MEDIA</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">ニュース・メディア</h1>
          <p className="text-white/80 text-base leading-relaxed">
            イベント情報・地域インタビュー・活動レポートをお届けします。
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-border-line sticky top-14 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto py-3">
            {categories.map((c) => (
              <Link
                key={c.key}
                href={c.key === "all" ? "/media" : `/media?category=${c.key}`}
                className={`shrink-0 section-label px-4 py-2 rounded-full transition-colors ${
                  activeCategory === c.key
                    ? categoryPillStyle[c.key] || "bg-ink text-white"
                    : "bg-paper-alt text-ink-muted hover:text-ink"
                }`}
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Articles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {sorted.length === 0 ? (
            <div className="text-center py-20 text-ink-muted">
              <p className="text-lg">記事がありません</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sorted.map((article) => (
                <ArticleCard key={article.slug} article={article} variant="default" />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
