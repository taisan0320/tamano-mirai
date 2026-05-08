import Link from "next/link";
import {
  fetchArticlesByCategory,
  getArticlesByCategory,
  CATEGORY_LABEL,
} from "@/lib/articles";
import { HeroIllustration, MoonHillIllustration } from "@/components/Illustrations";
import HappeningSection from "@/components/HappeningSection";
import BoardSection from "@/components/BoardSection";
import HeroSubSlider from "@/components/HeroSubSlider";
import { fetchBoardCards } from "@/lib/board";

export default async function Home() {
  const [eventArticles, interviewArticles, noticeRaw, boardCards] = await Promise.all([
    fetchArticlesByCategory("event", 10),
    fetchArticlesByCategory("interview", 3),
    Promise.all([
      fetchArticlesByCategory("news", 6),
      fetchArticlesByCategory("blog", 6),
    ]).then(([news, blog]) =>
      [...news, ...blog].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 8)
    ),
    fetchBoardCards(12),
  ]);

  const featured = eventArticles[0];
  const heroSliderItems = eventArticles.slice(1).map((a) => ({
    slug: a.slug,
    categoryLabel: CATEGORY_LABEL[a.category],
    date: new Date(a.date).toLocaleDateString("ja-JP", {
      year: "numeric", month: "2-digit", day: "2-digit",
    }).replace(/\//g, "."),
    title: a.title,
  }));

  const visited = interviewArticles.length > 0
    ? interviewArticles
    : getArticlesByCategory("interview").slice(0, 3);
  const [visitedFeature, ...visitedRest] = visited;

  return (
    <div className="flex flex-col">

      {/* ── HERO ── */}
      {featured && <section className="bg-paper">
        <div className="max-w-[1400px] mx-auto px-6 pt-10 lg:pt-14 pb-0">
          <div className="flex items-center justify-between mb-6 lg:mb-10">
            <div className="flex items-center gap-3">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-coral" />
              <span className="section-label text-ink-soft">この季節の特集</span>
            </div>
            <span className="section-label text-ink-muted hidden sm:inline">No.04 / Spring 2026</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
            {/* left — featured text */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <p className="section-label text-coral mb-6">{CATEGORY_LABEL[featured.category]}</p>
                <h1 className="font-serif-h font-black leading-[0.98] tracking-[-0.01em] text-[14vw] sm:text-[10vw] lg:text-[7.5rem] xl:text-[8.5rem] text-ink line-clamp-3">
                  {featured.title}
                </h1>
                <p className="mt-8 text-[15px] leading-[2] text-ink-soft max-w-[34rem] line-clamp-3">
                  {featured.excerpt}
                </p>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href={`/media/${featured.slug}`}
                  className="inline-flex items-center gap-3 bg-ink text-paper px-6 py-3 rounded-full text-sm font-bold hover:bg-ink-night transition-colors"
                >
                  この記事を読む
                  <span aria-hidden="true">→</span>
                </Link>
                <span className="text-xs text-ink-muted tracking-widest">{featured.date}</span>
              </div>
            </div>

            {/* right — cover image or fallback illustration */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] lg:aspect-auto lg:h-full min-h-[360px] rounded-sm overflow-hidden shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)]">
                {featured.thumbnail ? (
                  <img
                    src={featured.thumbnail}
                    alt={featured.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <HeroIllustration className="absolute inset-0 w-full h-full" />
                )}
              </div>
            </div>
          </div>

          {/* sub-features auto-slider */}
          <HeroSubSlider items={heroSliderItems} />
        </div>
      </section>}

      {/* ── VISITED — 訪ねた人・団体 ── */}
      <section id="visited" className="bg-paper-alt paper-grain">
        <div className="max-w-[1400px] mx-auto px-6 py-20 lg:py-28">
          <div className="flex items-end justify-between mb-12 gap-6">
            <div>
              <p className="section-label text-ink-muted mb-4">Voices from Tamano</p>
              <h2 className="font-serif-h text-5xl lg:text-7xl font-black leading-none text-ink">
                訪ねた人<span className="accent-coral">・</span>団体<span className="accent-coral">。</span>
              </h2>
            </div>
            <Link
              href="/stories"
              className="hidden md:inline-flex items-center gap-2 text-sm font-bold text-ink-soft hover:text-ink transition-colors whitespace-nowrap pb-2"
            >
              すべての対話を見る <span aria-hidden="true">→</span>
            </Link>
          </div>

          <p className="max-w-2xl text-[15px] leading-[2] text-ink-soft mb-12">
            玉野のまちで、自分の手で何かを動かしている人たち。<br />
            編集部が訪ね、聞き、撮ってきた記録を、ひとつずつ。
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
            {/* feature card */}
            {visitedFeature && (
              <div className="lg:col-span-6">
                <Link href={`/media/${visitedFeature.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-sm aspect-[4/5]">
                    {visitedFeature.thumbnail ? (
                      <img src={visitedFeature.thumbnail} alt={visitedFeature.title} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <MoonHillIllustration paletteIndex={0} className="absolute inset-0 w-full h-full" />
                    )}
                    <div className="absolute top-4 left-4 bg-paper/95 text-ink text-[10px] tracking-[.28em] font-bold px-2.5 py-1 rounded-sm">
                      {CATEGORY_LABEL[visitedFeature.category]}
                    </div>
                  </div>
                  <div className="mt-5 pb-5 border-b border-border-line">
                    <h3 className="font-serif-h font-bold text-ink leading-snug group-hover:text-coral transition-colors text-2xl lg:text-[28px]">
                      {visitedFeature.title}
                    </h3>
                    <p className="mt-2 text-ink-soft leading-relaxed text-sm line-clamp-2">{visitedFeature.excerpt}</p>
                    <p className="mt-3 text-[10px] text-ink-muted tracking-[.24em]">
                      {new Date(visitedFeature.date).toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\//g, ".")}
                    </p>
                  </div>
                </Link>
              </div>
            )}

            {/* secondary cards */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {visitedRest.map((a, i) => (
                <Link key={a.slug} href={`/media/${a.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-sm aspect-[5/6]">
                    {a.thumbnail ? (
                      <img src={a.thumbnail} alt={a.title} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <MoonHillIllustration paletteIndex={i + 1} className="absolute inset-0 w-full h-full" />
                    )}
                    <div className="absolute top-4 left-4 bg-paper/95 text-ink text-[10px] tracking-[.28em] font-bold px-2.5 py-1 rounded-sm">
                      {CATEGORY_LABEL[a.category]}
                    </div>
                  </div>
                  <div className="mt-5 pb-5 border-b border-border-line">
                    <h3 className="font-serif-h font-bold text-ink leading-snug group-hover:text-coral transition-colors text-lg line-clamp-2">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-ink-soft leading-relaxed text-[13px] line-clamp-2">{a.excerpt}</p>
                    <p className="mt-3 text-[10px] text-ink-muted tracking-[.24em]">
                      {new Date(a.date).toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\//g, ".")}
                    </p>
                  </div>
                </Link>
              ))}

              {/* see-all tile */}
              <Link
                href="/stories"
                className="hidden sm:flex sm:col-span-2 items-center justify-between bg-ink text-paper rounded-sm p-6 hover:bg-ink-night transition-colors group"
              >
                <div>
                  <p className="section-label text-paper/50 mb-2">Archive</p>
                  <p className="font-serif-h text-xl font-bold leading-tight">
                    もっと、たくさんの<br />対話を読む。
                  </p>
                </div>
                <span className="text-3xl font-light group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── HAPPENING ── */}
      <HappeningSection articles={eventArticles} notices={noticeRaw} />

      {/* ── BOARD ── */}
      <BoardSection cards={boardCards} />


      {/* ── CTA TRIO ── */}
      <section className="bg-paper-alt border-t border-border-line">
        <div className="max-w-[1400px] mx-auto px-6 py-16 lg:py-20">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-label text-ink-muted mb-3">センターに関わる</p>
              <h2 className="font-serif-h text-3xl lg:text-4xl font-bold text-ink leading-tight">
                次の一歩を、ここから<span className="accent-coral">。</span>
              </h2>
            </div>
            <p className="max-w-md text-[14px] leading-[2] text-ink-soft">
              支援、相談、資料の確認。目的に合わせて、必要な入口へ進めます。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">

          <Link href="/join" className="group flex min-h-[230px] flex-col gap-6 rounded-sm border border-border-line bg-paper px-6 py-7 lg:px-8 lg:py-9 shadow-[0_1px_0_#e8e2d9] hover:border-amber/50 hover:shadow-[0_1px_0_#d6b98b,0_16px_36px_-28px_rgba(0,0,0,0.22)] transition-all">
            <span className="section-label text-amber">01 · Support</span>
            <div>
              <h3 className="font-serif-h text-2xl lg:text-[28px] font-bold text-ink leading-snug mb-3">
                寄付・入会
              </h3>
              <p className="text-[13px] text-ink-soft leading-[1.9]">
                寄付・賛助会員として、玉野のまちづくりを継続的にサポートしていただけませんか。
              </p>
            </div>
            <span className="mt-auto inline-flex items-center gap-2 text-amber text-[13px] font-bold group-hover:gap-3 transition-all">
              くわしく見る →
            </span>
          </Link>

          <Link href="/contact" className="group flex min-h-[230px] flex-col gap-6 rounded-sm border border-border-line bg-paper px-6 py-7 lg:px-8 lg:py-9 shadow-[0_1px_0_#e8e2d9] hover:border-ocean/50 hover:shadow-[0_1px_0_#9ccadb,0_16px_36px_-28px_rgba(0,0,0,0.22)] transition-all">
            <span className="section-label text-ocean">02 · Contact</span>
            <div>
              <h3 className="font-serif-h text-2xl lg:text-[28px] font-bold text-ink leading-snug mb-3">
                お問い合わせ
              </h3>
              <p className="text-[13px] text-ink-soft leading-[1.9]">
                連携・協力・取材のご相談、イベントへのお申し込みなど、お気軽にご連絡ください。
              </p>
            </div>
            <span className="mt-auto inline-flex items-center gap-2 text-ocean text-[13px] font-bold group-hover:gap-3 transition-all">
              フォームを開く →
            </span>
          </Link>

          <Link href="/documents" className="group flex min-h-[230px] flex-col gap-6 rounded-sm border border-border-line bg-paper px-6 py-7 lg:px-8 lg:py-9 shadow-[0_1px_0_#e8e2d9] hover:border-forest/50 hover:shadow-[0_1px_0_#a7c9b6,0_16px_36px_-28px_rgba(0,0,0,0.22)] transition-all">
            <span className="section-label text-forest">03 · Documents</span>
            <div>
              <h3 className="font-serif-h text-2xl lg:text-[28px] font-bold text-ink leading-snug mb-3">
                資料・報告書
              </h3>
              <p className="text-[13px] text-ink-soft leading-[1.9]">
                調査報告書・機関誌・定款・決算書など、センターの活動記録を公開しています。
              </p>
            </div>
            <span className="mt-auto inline-flex items-center gap-2 text-forest text-[13px] font-bold group-hover:gap-3 transition-all">
              一覧を見る →
            </span>
          </Link>

          </div>
        </div>
      </section>

    </div>
  );
}
