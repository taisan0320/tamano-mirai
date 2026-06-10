export const revalidate = 60;

import Link from "next/link";
import {
  fetchArticlesByCategory,
  CATEGORY_LABEL,
  type Article,
} from "@/lib/articles";
import { fetchAllInterviews, type Interview } from "@/lib/interviews";
import HappeningSection from "@/components/HappeningSection";
import BoardSection from "@/components/BoardSection";
import StudentTrialSection from "@/components/StudentTrialSection";
import MiraiCafeSection from "@/components/MiraiCafeSection";
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
    fetchAllInterviews(3),
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

  const visited = interviewArticles;
  const [visitedFeature, ...visitedRest] = visited;
  const visitedSliderItems = visitedFeature ? [visitedFeature, ...visitedRest] : visitedRest;
  const heroGalleryItems = buildHeroGalleryItems([
    ...eventArticles,
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
                  href="/interviews"
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
                      className="group block py-4 hover:bg-paper-alt transition-colors -mx-3 px-3 rounded-sm"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[11px] text-ink-muted tracking-widest">{item.date}</span>
                        <span className="inline-flex rounded-full bg-paper-alt px-2 py-0.5 text-[10px] font-bold tracking-[.16em] text-ink-muted">
                          {item.categoryLabel}
                        </span>
                      </div>
                      <h2 className="text-[15px] font-bold leading-snug text-ink group-hover:text-coral transition-colors">
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
                玉野で<span className="accent-coral">動く人</span>たち<span className="accent-coral">。</span>
              </h2>
            </div>
            <Link
              href="/interviews"
              className="hidden md:inline-flex items-center gap-2 text-sm font-bold text-ink-soft hover:text-ink transition-colors whitespace-nowrap pb-2"
            >
              すべての対話を見る <span aria-hidden="true">→</span>
            </Link>
          </div>

          <p className="max-w-2xl text-[15px] leading-[2] text-ink-soft mb-12">
            玉野のまちで、自分の手で何かを動かしている人たち。<br />
            編集部が訪ね、聞き、撮ってきた記録を、ひとつずつ。
          </p>

          {visited.length === 0 && (
            <div className="py-16 flex flex-col items-center justify-center text-center border border-dashed border-border-line rounded-sm">
              <p className="section-label text-ink-muted mb-3">Coming Soon</p>
              <p className="text-[15px] text-ink-soft leading-relaxed">近日中に随時公開いたします。</p>
            </div>
          )}

          {/* Mobile: 横スクロール・オーバーレイカード */}
          <div className="lg:hidden -mx-6 overflow-x-auto no-scrollbar snap-x snap-mandatory px-6 pb-6">
            <div className="flex gap-3">
              {visitedSliderItems.map((iv) => (
                <Link
                  key={iv.slug}
                  href={`/interviews/${iv.slug}`}
                  className="group relative block w-[72vw] max-w-[280px] shrink-0 snap-start overflow-hidden rounded-sm"
                  style={{ minHeight: "340px" }}
                >
                  {iv.photo ? (
                    <img src={iv.photo} alt={iv.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #3d1f05 0%, #6b3209 40%, #c86d1a 100%)" }} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white/50 text-[10px] tracking-widest mb-2">{iv.role}</p>
                    <p className="font-serif text-white leading-snug mb-2" style={{ fontSize: "clamp(1rem, 4vw, 1.15rem)" }}>
                      ❝ {iv.catchphrase} ❞
                    </p>
                    <p className="text-white font-bold text-sm">{iv.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop: アシンメトリー・オーバーレイグリッド */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-4 h-[580px]">

            {/* フィーチャーカード（左・大） */}
            {visitedFeature && (
              <Link
                href={`/interviews/${visitedFeature.slug}`}
                className="lg:col-span-7 group relative overflow-hidden rounded-sm h-full"
              >
                {visitedFeature.photo ? (
                  <img src={visitedFeature.photo} alt={visitedFeature.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" />
                ) : (
                  <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #3d1f05 0%, #6b3209 40%, #c86d1a 100%)" }} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                  <p className="section-label text-white/40 mb-4">INTERVIEW</p>
                  <p
                    className="font-serif text-white leading-tight mb-5"
                    style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
                  >
                    ❝ {visitedFeature.catchphrase} ❞
                  </p>
                  <div className="w-8 h-px mb-4" style={{ background: "#c86d1a" }} />
                  <p className="text-white/50 text-xs tracking-widest mb-1">{visitedFeature.role}</p>
                  <p className="text-white font-bold text-lg font-serif">{visitedFeature.name}</p>
                </div>
              </Link>
            )}

            {/* サブカード（右・縦2分割） */}
            <div className="lg:col-span-5 flex flex-col gap-4 h-full">
              {visitedRest.map((iv) => (
                <Link
                  key={iv.slug}
                  href={`/interviews/${iv.slug}`}
                  className="group relative overflow-hidden rounded-sm flex-1"
                >
                  {iv.photo ? (
                    <img src={iv.photo} alt={iv.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" />
                  ) : (
                    <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #3d1f05 0%, #6b3209 40%, #c86d1a 100%)" }} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white/50 text-[10px] tracking-widest mb-2">{iv.role}</p>
                    <p className="font-serif text-white leading-snug mb-2" style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}>
                      ❝ {iv.catchphrase} ❞
                    </p>
                    <p className="text-white font-bold text-sm">{iv.name}</p>
                  </div>
                </Link>
              ))}

              {/* 記事が2件未満のときは「すべて見る」タイル */}
              {visitedRest.length < 2 && (
                <Link
                  href="/interviews"
                  className="group relative overflow-hidden rounded-sm flex-1 bg-ink flex items-center justify-between px-7 py-6 hover:bg-ink-night transition-colors"
                >
                  <div>
                    <p className="section-label text-paper/40 mb-2">Archive</p>
                    <p className="font-serif-h text-xl font-bold text-paper leading-tight">
                      もっと、たくさんの<br />対話を読む。
                    </p>
                  </div>
                  <span className="text-3xl font-light text-paper/60 group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── MIRAI CAFE ── */}
      <MiraiCafeSection />

      {/* ── HAPPENING ── */}
      <HappeningSection articles={eventArticles} notices={noticeRaw} />

      {/* ── STUDENT TRIAL ── */}
      <StudentTrialSection />

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
