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
  const [eventArticles, interviewArticles, noticeRaw, exploreArticles, volunteerArticles, boardCards] = await Promise.all([
    fetchArticlesByCategory("event", 10),
    fetchArticlesByCategory("interview", 3),
    Promise.all([
      fetchArticlesByCategory("news", 6),
      fetchArticlesByCategory("blog", 6),
    ]).then(([news, blog]) =>
      [...news, ...blog].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 8)
    ),
    fetchArticlesByCategory("explore", 3),
    fetchArticlesByCategory("volunteer", 3),
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
      <HappeningSection articles={eventArticles} />

      {/* ── BOARD ── */}
      <BoardSection cards={boardCards} />

      {/* ── お知らせ・日記 ── */}
      {noticeRaw.length > 0 && (
        <section className="bg-paper">
          <div className="max-w-[1400px] mx-auto px-6 py-16 lg:py-20">
            <div className="flex items-end justify-between mb-10 gap-6">
              <div>
                <p className="section-label text-ink-muted mb-3">NPO法人からのお知らせ</p>
                <h2 className="font-serif-h text-3xl lg:text-4xl font-bold text-ink leading-tight">
                  お知らせ<span className="accent-coral">・</span>日記
                </h2>
              </div>
              <Link
                href="/news"
                className="hidden md:inline-flex items-center gap-2 text-sm font-bold text-ink-soft hover:text-ink transition-colors whitespace-nowrap pb-1"
              >
                すべて見る <span aria-hidden="true">→</span>
              </Link>
            </div>

            <ul className="divide-y divide-border-line border-y border-border-line">
              {noticeRaw.map((a) => {
                const d = new Date(a.date);
                const dateStr = d.toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\//g, ".");
                const isNews = a.category === "news";
                return (
                  <li key={a.slug}>
                    <Link
                      href={`/media/${a.slug}`}
                      className="group flex items-start gap-5 lg:gap-8 py-5 hover:bg-paper-alt transition-colors -mx-3 lg:-mx-6 px-3 lg:px-6 rounded-sm"
                    >
                      <span className="shrink-0 text-[13px] text-ink-muted tracking-widest pt-0.5 w-28">{dateStr}</span>
                      <span className={`shrink-0 text-[10px] font-bold tracking-[.22em] pt-1 w-20 ${isNews ? "text-ocean" : "text-forest"}`}>
                        {isNews ? "お知らせ" : "日記"}
                      </span>
                      <h3 className="text-[15px] font-medium text-ink group-hover:text-coral transition-colors leading-snug line-clamp-2">
                        {a.title}
                      </h3>
                      <span className="hidden lg:block shrink-0 text-ink/25 group-hover:text-coral group-hover:translate-x-0.5 transition-all ml-auto pt-0.5" aria-hidden="true">→</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex justify-end">
              <Link href="/news" className="text-sm text-ink-soft hover:text-ink border-b border-border-line hover:border-ink transition-colors pb-0.5 md:hidden">
                すべて見る →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── EXPLORE & VOLUNTEER ── */}
      <section className="bg-paper-alt py-14">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">

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

      {/* ── AUDIENCE CTA STRIP ── */}
      <section className="bg-ink">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="border-b border-white/10 py-4">
            <p className="section-label text-white/30">このサイトの使い方 — どなたをお探しですか</p>
          </div>
          <div className="divide-y divide-white/10">
            {(
              [
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
              ] as const
            ).map((item) => (
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

    </div>
  );
}
