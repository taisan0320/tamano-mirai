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
  { href: "/media", label: "すべて" },
  { href: "/events", label: "イベント情報" },
  { href: "/stories", label: "まちの人・団体" },
  { href: "/blog", label: "日記" },
  { href: "/news", label: "お知らせ" },
];

export default async function Home() {
  const today = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });

  const [latestArticles, eventArticles, blogArticles, exploreArticles, volunteerArticles] = await Promise.all([
    fetchLatestArticles(8),
    fetchArticlesByCategory("event", 5),
    fetchArticlesByCategory("blog", 3),
    fetchArticlesByCategory("explore", 3),
    fetchArticlesByCategory("volunteer", 3),
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
              className="relative overflow-hidden rounded-lg group card-interactive min-h-[280px] lg:min-h-0"
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
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded mb-4 w-fit ${CATEGORY_BADGE[featured.category]}`}>
                  {CATEGORY_LABEL[featured.category]}
                </span>
                <h2 className="text-2xl lg:text-3xl font-bold text-white leading-snug mb-3 line-clamp-2">
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
                  className="relative overflow-hidden rounded-lg group card-interactive flex-1 min-h-[120px]"
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
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded mb-2 w-fit ${CATEGORY_BADGE[article.category]}`}>
                      {CATEGORY_LABEL[article.category]}
                    </span>
                    <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
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
      <div className="bg-white border-b border-border-line sticky top-14 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto scrollbar-hide">
            {categoryTabs.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="shrink-0 section-label px-4 py-4 text-ink-muted hover:text-ink border-b-2 border-transparent hover:border-ink transition-colors whitespace-nowrap"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── LATEST ARTICLES ── */}
      <section className="bg-paper py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between border-b border-ink pb-3 mb-8">
            <h2 className="font-black text-ink tracking-tight">最新記事</h2>
            <Link href="/media" className="section-label text-ink-muted hover:text-ink transition-colors">
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
        <section className="bg-white py-14">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between border-b-2 border-amber pb-3 mb-6">
              <div>
                <p className="section-label text-amber mb-1">開催予定</p>
                <h2 className="font-bold text-ink leading-none">イベント情報</h2>
              </div>
              <Link href="/events" className="section-label text-ink-muted hover:text-ink transition-colors pb-0.5">
                一覧を見る →
              </Link>
            </div>
            <div className="divide-y divide-border-line">
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

      {/* ── EXPLORE & VOLUNTEER ── */}
      <section className="bg-paper-alt py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">

            {/* 探究学習 */}
            <div>
              <div className="flex items-end justify-between border-b-2 border-forest pb-3 mb-5">
                <div>
                  <p className="section-label text-forest mb-1">学校・地域連携</p>
                  <h2 className="font-bold text-ink leading-none">探究学習サポート</h2>
                </div>
                <Link href="/programs" className="section-label text-ink-muted hover:text-forest transition-colors pb-0.5">
                  詳しく見る →
                </Link>
              </div>
              {exploreArticles.length === 0 ? (
                <p className="text-sm text-ink-muted py-6">現在、探究学習に関する情報はありません</p>
              ) : (
                <div className="divide-y divide-border-line">
                  {exploreArticles.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/media/${a.slug}`}
                      className="group flex items-start gap-4 py-4 hover:bg-white transition-colors -mx-4 px-4 rounded"
                    >
                      <span className="section-label text-ink-muted w-16 pt-0.5 shrink-0">
                        {new Date(a.date).toLocaleDateString("ja-JP", { month: "2-digit", day: "2-digit" }).replace("/", ".")}
                      </span>
                      <h3 className="text-sm font-medium text-ink group-hover:text-forest transition-colors leading-snug line-clamp-2">
                        {a.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* ボランティア */}
            <div>
              <div className="flex items-end justify-between border-b-2 border-coral pb-3 mb-5">
                <div>
                  <p className="section-label text-coral mb-1">参加・サポート</p>
                  <h2 className="font-bold text-ink leading-none">ボランティア募集</h2>
                </div>
                <Link href="/join" className="section-label text-ink-muted hover:text-coral transition-colors pb-0.5">
                  詳しく見る →
                </Link>
              </div>
              {volunteerArticles.length === 0 ? (
                <p className="text-sm text-ink-muted py-6">現在、ボランティアの募集はありません</p>
              ) : (
                <div className="divide-y divide-border-line">
                  {volunteerArticles.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/media/${a.slug}`}
                      className="group flex items-start gap-4 py-4 hover:bg-white transition-colors -mx-4 px-4 rounded"
                    >
                      <span className="section-label text-ink-muted w-16 pt-0.5 shrink-0">
                        {new Date(a.date).toLocaleDateString("ja-JP", { month: "2-digit", day: "2-digit" }).replace("/", ".")}
                      </span>
                      <h3 className="text-sm font-medium text-ink group-hover:text-coral transition-colors leading-snug line-clamp-2">
                        {a.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ── COORDINATOR DIARY ── */}
      {blogArticles.length > 0 && (
        <section className="bg-white py-14">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between border-b-2 border-forest pb-3 mb-6">
              <div>
                <p className="section-label text-forest mb-1">スタッフより</p>
                <h2 className="font-bold text-ink leading-none">コーディネーター日記</h2>
              </div>
              <Link href="/blog" className="section-label text-ink-muted hover:text-ink transition-colors pb-0.5">
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

      {/* ── AUDIENCE CTA STRIP ── */}
      <section className="bg-ink">
        <div className="max-w-7xl mx-auto px-6">
          <div className="border-b border-white/10 py-4">
            <p className="section-label text-white/30">このサイトの使い方 — どなたをお探しですか</p>
          </div>
          <div className="divide-y divide-white/10">
            {([
              {
                num: "01",
                color: "text-forest",
                title: "学校の先生・地域コーディネーターの方へ",
                desc: "「総合的な探究の時間」の授業づくりや地域連携をサポートします",
                href: "/programs",
              },
              {
                num: "02",
                color: "text-amber",
                title: "ボランティアとして参加したい方へ",
                desc: "玉野のまちづくりに、あなたの力を貸してください",
                href: "/join",
              },
              {
                num: "03",
                color: "text-ocean",
                title: "玉野への移住・定住を考えている方へ",
                desc: "ここで暮らす人たちのリアルな声をお届けします",
                href: "/stories",
              },
            ] as const).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-6 lg:gap-12 py-7 -mx-6 px-6 hover:bg-white/5 transition-colors"
              >
                <span className={`font-black ${item.color} opacity-25 group-hover:opacity-100 transition-opacity w-12 lg:w-16 text-right shrink-0 text-3xl lg:text-4xl`}>
                  {item.num}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base lg:text-xl font-bold text-white leading-snug mb-1">{item.title}</h3>
                  <p className="text-sm text-white/40 hidden sm:block">{item.desc}</p>
                </div>
                <span className={`shrink-0 font-bold text-xl ${item.color} opacity-25 group-hover:opacity-100 transition-opacity`}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
                className="text-sm font-bold text-white bg-forest px-5 py-2.5 rounded hover:bg-forest-light transition-colors"
              >
                センターについて →
              </Link>
              <Link
                href="/contact"
                className="text-sm font-bold text-forest border border-forest/40 px-5 py-2.5 rounded hover:bg-forest/5 transition-colors"
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
