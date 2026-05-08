import Link from "next/link";
import {
  fetchArticlesByCategory,
  getArticlesByCategory,
  CATEGORY_LABEL,
  type Article,
} from "@/lib/articles";
import { MoonHillIllustration } from "@/components/Illustrations";
import HappeningSection from "@/components/HappeningSection";
import BoardSection from "@/components/BoardSection";
import { fetchBoardCards } from "@/lib/board";

const manualHeroGalleryItems: { src: string; alt: string }[] = [
  { src: "/images/hero-gallery/miyama-park.jpg", alt: "深山公園の緑と広場" },
  { src: "/images/hero-gallery/pond-and-greenery.jpg", alt: "緑に囲まれた池の風景" },
  { src: "/images/hero-gallery/uno-station.jpg", alt: "宇野駅の駅舎" },
  { src: "/images/hero-gallery/uno-ferry.jpg", alt: "宇野港に停泊するフェリー" },
  { src: "/images/hero-gallery/ojigadake-rocks.jpg", alt: "王子が岳から見える瀬戸内海と岩場" },
  { src: "/images/hero-gallery/bamboo-red-door.jpg", alt: "竹林の中に立つ赤い扉" },
];

function buildHeroGalleryItems(sources: Article[]) {
  if (manualHeroGalleryItems.length >= 3) {
    return manualHeroGalleryItems.slice(0, 8);
  }

  const items = sources
    .filter((article) => article.thumbnail)
    .map((article) => ({
      src: article.thumbnail as string,
      alt: article.title,
    }));

  const uniqueItems = items.filter(
    (item, index, array) => array.findIndex((candidate) => candidate.src === item.src) === index
  );

  return [...manualHeroGalleryItems, ...uniqueItems].slice(0, 8);
}

function HeroGalleryStrip({ items }: { items: { src: string; alt: string }[] }) {
  if (items.length < 3) return null;

  const loopItems = [...items, ...items];

  return (
    <div className="mt-12 lg:mt-14">
      <div className="hero-gallery-mask -mx-6 overflow-hidden px-6">
        <div className="hero-gallery-track flex w-max gap-4">
          {loopItems.map((item, index) => (
            <div
              key={`${item.src}-${index}`}
              className="relative h-[112px] w-[180px] shrink-0 overflow-hidden rounded-sm border border-border-line bg-paper-alt shadow-[0_1px_0_#e8e2d9] sm:h-[132px] sm:w-[220px] lg:h-[148px] lg:w-[260px]"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="absolute inset-0 h-full w-full object-cover"
                loading={index < items.length ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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

  const recentUpdates = [...eventArticles.slice(0, 2), ...noticeRaw.slice(0, 2)]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 4)
    .map((a) => ({
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
  const visitedSliderItems = visitedFeature ? [visitedFeature, ...visitedRest] : visitedRest;
  const heroGalleryItems = buildHeroGalleryItems([
    ...eventArticles,
    ...interviewArticles,
    ...noticeRaw,
  ]);

  return (
    <div className="flex flex-col">

      {/* ── HERO ── */}
      <section className="bg-paper">
        <div className="max-w-[1400px] mx-auto px-6 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end">
            <div className="lg:col-span-7">
              <h1 className="font-serif-h font-black leading-[1.12] text-[10vw] sm:text-[6.5vw] lg:text-[3.6rem] xl:text-[4.5rem] text-ink">
                玉野の声を、<br />
                <span className="whitespace-nowrap"><span className="accent-coral">つながる力</span>に。</span>
              </h1>
              <p className="mt-7 text-[15px] leading-[2.1] text-ink-soft max-w-[40rem]">
                市民・団体・企業・行政をつなぎ、相談・伴走・情報発信で、地域の活動を支えます。
              </p>
              <div className="mt-9 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
                <Link
                  href="/contact"
                  className="group rounded-sm border border-border-line bg-paper-alt px-5 py-4 hover:border-forest/50 hover:bg-forest-pale transition-colors"
                >
                  <span className="section-label text-forest">相談する</span>
                  <span className="mt-2 block font-serif-h text-lg font-bold text-ink group-hover:text-forest transition-colors">話してみる</span>
                </Link>
                <Link
                  href="/events"
                  className="group rounded-sm border border-border-line bg-paper-alt px-5 py-4 hover:border-amber/50 hover:bg-amber-pale transition-colors"
                >
                  <span className="section-label text-amber">参加する</span>
                  <span className="mt-2 block font-serif-h text-lg font-bold text-ink group-hover:text-amber transition-colors">イベントを見る</span>
                </Link>
                <Link
                  href="/stories"
                  className="group rounded-sm border border-border-line bg-paper-alt px-5 py-4 hover:border-ocean/50 hover:bg-ocean-pale transition-colors"
                >
                  <span className="section-label text-ocean">知る</span>
                  <span className="mt-2 block font-serif-h text-lg font-bold text-ink group-hover:text-ocean transition-colors">活動を読む</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border-y border-border-line">
                <div className="flex items-center justify-between py-4">
                  <p className="section-label text-ink-muted">最近の動き</p>
                  <Link href="/media" className="text-sm font-bold text-ink-soft hover:text-ink border-b border-border-line hover:border-ink transition-colors pb-0.5">
                    一覧 →
                  </Link>
                </div>
                <div className="divide-y divide-border-line">
                  {recentUpdates.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/media/${item.slug}`}
                      className="group grid grid-cols-[96px_1fr] gap-4 py-4 hover:bg-paper-alt transition-colors -mx-3 px-3 rounded-sm"
                    >
                      <div>
                        <span className="block text-[11px] text-ink-muted tracking-widest">{item.date}</span>
                        <span className="mt-2 inline-flex rounded-full bg-paper-alt px-2 py-1 text-[10px] font-bold tracking-[.16em] text-ink-muted">
                          {item.categoryLabel}
                        </span>
                      </div>
                      <h2 className="text-[15px] font-bold leading-snug text-ink group-hover:text-coral transition-colors line-clamp-2">
                        {item.title}
                      </h2>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <HeroGalleryStrip items={heroGalleryItems} />
        </div>
      </section>

      {/* ── VISITED — 訪ねた人・団体 ── */}
      <section id="visited" className="bg-paper-alt blend-from-paper paper-grain">
        <div className="max-w-[1400px] mx-auto px-6 pt-20 pb-12 lg:pt-28 lg:pb-14">
          <div className="flex items-end justify-between mb-12 gap-6">
            <div>
              <p className="section-label text-ink-muted mb-4">Voices from Tamano</p>
              <h2 className="font-serif-h text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-ink">
                玉野で動く人たち<span className="accent-coral">。</span>
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

          <div className="lg:hidden -mx-6 overflow-x-auto no-scrollbar snap-x snap-mandatory px-6 pb-6">
            <div className="flex gap-4">
              {visitedSliderItems.map((a, i) => (
                <Link
                  key={a.slug}
                  href={`/media/${a.slug}`}
                  className="group block w-[78vw] max-w-[320px] shrink-0 snap-start"
                >
                  <div className="relative overflow-hidden rounded-sm aspect-[4/5]">
                    {a.thumbnail ? (
                      <img src={a.thumbnail} alt={a.title} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <MoonHillIllustration paletteIndex={i} className="absolute inset-0 w-full h-full" />
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
            </div>
          </div>

          <div className="hidden lg:grid lg:grid-cols-12 gap-6 lg:gap-10">
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
      <section className="bg-paper-alt blend-from-paper">
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
