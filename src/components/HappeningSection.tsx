"use client";

import Link from "next/link";
import type { Article } from "@/lib/articles";

function parseDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    displayDate: `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`,
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).replace(/\//g, ".");
}

export default function HappeningSection({
  articles,
  notices,
}: {
  articles: Article[];
  notices: Article[];
}) {
  const eventItems = [...articles]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 6)
    .map((a) => ({
      ...a,
      ...parseDate(a.date),
    }));
  const noticeItems = notices.slice(0, 4);
  const [featuredNotice, ...noticeList] = noticeItems;

  return (
    <section id="happening" className="bg-paper-alt paper-grain text-ink">
      <div className="max-w-[1400px] mx-auto px-6 pt-10 pb-12 lg:pt-12 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          <div className="lg:col-span-7">
            <p className="section-label text-ink-muted mb-4">Events / News</p>
            <h2 className="font-serif-h text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
              これからの<span className="accent-coral">予定</span>と<br /><span className="accent-coral">お知らせ</span><span className="accent-coral">。</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <p className="max-w-md text-[14px] leading-[2] text-ink-soft">
              参加できる予定と、センターからの更新をひとつの場所に。必要な情報だけを、日付順に追えるようにしました。
            </p>
          </div>
        </div>

        <div className="border-y border-border-line py-8 lg:py-10">
          <div className="flex items-end justify-between gap-5 mb-7">
            <div>
              <p className="section-label text-coral mb-2">Event Calendar</p>
              <h3 className="font-serif-h text-2xl lg:text-3xl font-bold text-ink leading-tight">イベントカレンダー</h3>
            </div>
            <Link
              href="/events"
              className="shrink-0 text-sm font-bold text-ink-soft hover:text-ink border-b border-border-line hover:border-ink transition-colors pb-1"
            >
              すべて見る →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5">
            {eventItems.map((a) => (
              <Link
                key={a.slug}
                href={`/media/${a.slug}`}
                className="group rounded-sm border border-border-line bg-paper p-3 shadow-[0_1px_0_#e8e2d9] hover:border-amber/45 hover:bg-amber-pale/30 transition-colors"
              >
                <div className="mb-3 border-b border-border-line pb-2">
                  <span className="text-[12px] font-bold tracking-[.08em] text-amber">{a.displayDate}</span>
                </div>

                <div className="grid grid-cols-[96px_1fr] gap-4">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-amber-pale border border-border-line">
                    {a.thumbnail ? (
                      <img src={a.thumbnail} alt="" className="absolute inset-0 h-full w-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-amber bg-amber-pale">
                        <svg width="34" height="34" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                          <rect x="8" y="10" width="20" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
                          <path d="M12 7v6M24 7v6M8 16h20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          <path d="M13 21h3M20 21h3M13 25h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h4 className="font-serif-h text-[15px] font-bold leading-snug text-ink group-hover:text-amber transition-colors line-clamp-2 break-words">
                    {a.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {featuredNotice && (
          <aside className="pt-10 lg:pt-12">
            <div className="flex items-end justify-between gap-5 mb-7">
              <div>
                <p className="section-label text-ink-muted mb-2">News / Journal</p>
                <h3 className="font-serif-h text-2xl lg:text-3xl font-bold text-ink leading-tight">
                  お知らせ<span className="accent-coral">・</span>日記
                </h3>
              </div>
              <Link
                href="/news"
                className="shrink-0 text-sm font-bold text-ink-soft hover:text-ink border-b border-border-line hover:border-ink transition-colors pb-1"
              >
                すべて見る →
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-stretch">
              <Link
                href={`/media/${featuredNotice.slug}`}
                className="group lg:col-span-5 rounded-sm border border-border-line bg-paper p-5 lg:p-6 shadow-[0_1px_0_#e8e2d9] hover:border-forest/45 hover:bg-forest-pale/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[11px] text-ink-muted tracking-widest leading-tight">{formatDate(featuredNotice.date)}</span>
                  <span className={`inline-flex rounded-full bg-paper-alt px-2 py-1 text-[10px] font-bold tracking-[.18em] ${featuredNotice.category === "news" ? "text-ocean" : "text-forest"}`}>
                    {featuredNotice.category === "news" ? "お知らせ" : "日記"}
                  </span>
                </div>
                <h4 className="font-serif-h text-2xl font-bold leading-snug text-ink group-hover:text-coral transition-colors line-clamp-2 break-words">
                  {featuredNotice.title}
                </h4>
                <p className="mt-4 text-[13px] leading-[1.9] text-ink-soft line-clamp-3">
                  {featuredNotice.excerpt}
                </p>
              </Link>

              <div className="lg:col-span-7 rounded-sm border-y border-border-line">
                {noticeList.map((a) => {
                  const isNews = a.category === "news";
                  return (
                    <Link
                      key={a.slug}
                      href={`/media/${a.slug}`}
                      className="group block border-b border-border-line px-3 py-4 last:border-b-0 hover:bg-paper transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[11px] text-ink-muted tracking-widest leading-tight">{formatDate(a.date)}</span>
                        <span className={`inline-flex rounded-full bg-paper px-2 py-0.5 text-[10px] font-bold tracking-[.18em] ${isNews ? "text-ocean" : "text-forest"}`}>
                          {isNews ? "お知らせ" : "日記"}
                        </span>
                      </div>
                      <h4 className="font-serif-h text-[15px] font-bold text-ink group-hover:text-coral transition-colors leading-snug">
                        {a.title}
                      </h4>
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>
        )}

        <div className="mt-10 flex items-center justify-between">
          <span className="text-[11px] tracking-[.24em] text-ink-muted">
            {eventItems.length} EVENTS · {noticeItems.length} UPDATES
          </span>
          <Link
            href="/media"
            className="inline-flex items-center gap-2 text-sm font-bold text-ink-soft hover:text-ink border-b border-border-line hover:border-ink transition-colors pb-1"
          >
            すべての動きを見る
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
