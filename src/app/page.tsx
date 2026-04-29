import Link from "next/link";
import {
  fetchLatestArticles,
  fetchArticlesByCategory,
  CATEGORY_LABEL,
  CATEGORY_BADGE,
  CATEGORY_GRADIENT,
} from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

const categoryTabs = [
  { href: "/media", label: "すべて", style: "bg-ink text-white hover:bg-ink-soft" },
  { href: "/events", label: "イベント情報", style: "bg-amber-pale text-amber border border-amber/20 hover:bg-amber/10" },
  { href: "/stories", label: "まちの人・団体", style: "bg-ocean-pale text-ocean border border-ocean/20 hover:bg-ocean/10" },
  { href: "/blog", label: "日記", style: "bg-forest-pale text-forest border border-forest/20 hover:bg-forest/10" },
  { href: "/news", label: "お知らせ", style: "bg-forest-pale text-forest border border-forest/20 hover:bg-forest/10" },
];

export default async function Home() {
  const today = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });

  const [latestArticles, eventArticles, blogArticles] = await Promise.all([
    fetchLatestArticles(8),
    fetchArticlesByCategory("event", 5),
    fetchArticlesByCategory("blog", 3),
  ]);

  const featured = latestArticles[0];
  const subFeatures = latestArticles.slice(1, 4);
  const listArticles = latestArticles.slice(4, 8);

  return (
    <div className="flex flex-col">

      {/* ── EDITORIAL MASTHEAD ── */}
      <div className="bg-paper-alt border-b border-border-line">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between gap-4">
          <span className="section-label text-ink-muted">{today}</span>
          <span className="section-label text-ink-muted hidden sm:block">玉野のいまが、ここにある</span>
        </div>
      </div>

      {/* ── MAGAZINE HERO GRID ── */}
      <section className="bg-paper py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-3 lg:h-[480px]">

            {/* Featured — large */}
            <Link
              href={`/media/${featured.slug}`}
              className="relative overflow-hidden rounded-xl group card-interactive min-h-[280px] lg:min-h-0"
            >
              <div className={`absolute inset-0 ${CATEGORY_GRADIENT[featured.category]}`} />
              {featured.thumbnail && (
                <img
                  src={featured.thumbnail}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="relative h-full p-8 flex flex-col justify-end">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-4 w-fit ${CATEGORY_BADGE[featured.category]}`}>
                  {CATEGORY_LABEL[featured.category]}
                </span>
                <h2 className="text-2xl lg:text-3xl font-bold text-white leading-snug mb-3 line-clamp-2 group-hover:opacity-80 transition-opacity">
                  {featured.title}
                </h2>
                <p className="text-white/65 text-sm leading-relaxed line-clamp-2">
                  {featured.excerpt}
                </p>
                <p className="text-white/40 text-xs mt-3">{featured.date}</p>
              </div>
            </Link>

            {/* Sub-features — 3 stacked */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
              {subFeatures.map((article) => (
                <Link
                  key={article.slug}
                  href={`/media/${article.slug}`}
                  className="relative overflow-hidden rounded-xl group card-interactive flex-1 min-h-[120px]"
                >
                  <div className={`absolute inset-0 ${CATEGORY_GRADIENT[article.category]}`} />
                  {article.thumbnail && (
                    <img
                      src={article.thumbnail}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="relative h-full p-5 flex flex-col justify-end">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 w-fit ${CATEGORY_BADGE[article.category]}`}>
                      {CATEGORY_LABEL[article.category]}
                    </span>
                    <h3 className="text-sm font-bold text-white leading-snug line-clamp-2 group-hover:opacity-80 transition-opacity">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── CATEGORY TABS ── */}
      <div className="bg-white border-y border-border-line sticky top-14 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {categoryTabs.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className={`shrink-0 section-label px-4 py-2 rounded-full transition-colors ${c.style}`}
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── LATEST ARTICLES ── */}
      <section className="bg-paper py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <span className="section-label text-ink/30">最新記事</span>
            <div className="flex-1 h-px bg-ink/12" />
            <Link href="/media" className="section-label text-ink-muted hover:text-ink transition-colors whitespace-nowrap">
              すべて見る →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {listArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} variant="default" />
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTS LIST ── */}
      {eventArticles.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-2 h-2 rounded-full bg-amber inline-block" />
              <h2 className="text-xl font-bold text-ink">イベント情報</h2>
              <div className="flex-1 h-px bg-ink/12" />
              <Link href="/events" className="section-label text-ink-muted hover:text-ink transition-colors whitespace-nowrap">
                一覧を見る →
              </Link>
            </div>
            <div className="divide-y divide-border-line border-t border-border-line">
              {eventArticles.map((article) => {
                const d = new Date(article.date);
                return (
                  <Link
                    key={article.slug}
                    href={`/media/${article.slug}`}
                    className="group flex items-center gap-5 py-5 hover:bg-paper transition-colors -mx-2 px-2 rounded"
                  >
                    <div className="shrink-0 w-12 text-center">
                      <p className="text-2xl font-bold text-ink leading-none">{d.getDate()}</p>
                      <p className="section-label text-ink-muted mt-0.5">
                        {d.toLocaleDateString("ja-JP", { month: "short" })}
                      </p>
                    </div>
                    <div className="w-px self-stretch bg-border-line shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-ink group-hover:text-amber transition-colors leading-snug line-clamp-1 mb-0.5">
                        {article.title}
                      </h3>
                      <p className="text-sm text-ink-muted line-clamp-1 leading-relaxed">{article.excerpt}</p>
                    </div>
                    <span className="shrink-0 text-ink/30 group-hover:text-amber transition-colors font-bold text-sm">→</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── COORDINATOR DIARY ── */}
      {blogArticles.length > 0 && (
        <section className="bg-paper-alt py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-2 h-2 rounded-full bg-forest inline-block" />
              <h2 className="text-xl font-bold text-ink">コーディネーター日記</h2>
              <div className="flex-1 h-px bg-ink/12" />
              <Link href="/blog" className="section-label text-ink-muted hover:text-ink transition-colors whitespace-nowrap">
                一覧を見る →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {blogArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} variant="default" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ABOUT STRIP ── */}
      <section className="bg-paper py-14 border-t border-border-line">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <p className="section-label text-ink-muted mb-3">玉野SDGsみらいづくりセンターとは</p>
              <p className="text-ink-muted leading-relaxed text-sm max-w-2xl">
                市民・企業・行政をつなぐ中間支援NPOとして、地域課題の解決と住み続けたいまちづくりを支援しています。
                玉野市で活動する団体や市民のハブとして、人・情報・活動をつなぎます。
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="text-sm font-bold text-white bg-forest px-5 py-2.5 rounded-full hover:bg-forest-light transition-colors"
              >
                センターについて →
              </Link>
              <Link
                href="/contact"
                className="text-sm font-bold text-forest border border-forest/40 px-5 py-2.5 rounded-full hover:bg-forest/5 transition-colors"
              >
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
