"use client";

import Link from "next/link";
import type { Article } from "@/lib/articles";

function parseDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    day: d.getDate(),
    mon: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    year: d.getFullYear().toString(),
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).replace(/\//g, ".");
}

function todayKey() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function HappeningSection({
  articles,
  notices,
}: {
  articles: Article[];
  notices: Article[];
}) {
  const eventItems = articles
    .filter((a) => a.date.slice(0, 10) >= todayKey())
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 6)
    .map((a) => ({
      ...a,
      ...parseDate(a.date),
    }));

  return (
    <section id="happening" className="bg-paper-alt paper-grain text-ink border-b border-border-line">
      <div className="max-w-[1400px] mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          <div className="lg:col-span-7">
            <p className="section-label text-ink-muted mb-4">イベントカレンダー / お知らせ</p>
            <h2 className="font-serif-h text-5xl lg:text-7xl font-black leading-none">
              いま、玉野で<br />起きている<span className="accent-coral">。</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <p className="max-w-md text-[14px] leading-[2] text-ink-soft">
              参加できる予定と、センターからの更新をひとつの場所に。必要な情報だけを、日付順に追えるようにしました。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-7 bg-paper rounded-sm border border-border-line p-5 sm:p-6 lg:p-7 shadow-[0_1px_0_#e8e2d9,0_18px_42px_-28px_rgba(0,0,0,0.18)]">
            <div className="flex items-center justify-between gap-5 mb-6">
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

            {eventItems.length > 0 ? (
              <ul className="divide-y divide-border-line border-y border-border-line">
                {eventItems.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/media/${a.slug}`}
                      className="group grid grid-cols-[74px_1fr] sm:grid-cols-[82px_88px_1fr] gap-4 py-4 hover:bg-paper-alt transition-colors -mx-3 px-3 rounded-sm"
                    >
                      <div className="flex items-baseline gap-2 pt-0.5">
                        <span className="font-serif-h text-3xl lg:text-4xl font-black leading-none text-ink">{a.day}</span>
                        <div className="flex flex-col leading-tight">
                          <span className="text-[10px] tracking-[.24em] text-ink-muted">{a.mon}</span>
                          <span className="text-[10px] tracking-[.24em] text-ink-muted/70">{a.year}</span>
                        </div>
                      </div>

                      <div className="hidden sm:block relative h-[64px] w-[88px] overflow-hidden rounded-sm bg-amber-pale border border-border-line">
                        {a.thumbnail ? (
                          <img src={a.thumbnail} alt="" className="absolute inset-0 h-full w-full object-cover" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-amber">
                            <svg width="34" height="34" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                              <rect x="8" y="10" width="20" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
                              <path d="M12 7v6M24 7v6M8 16h20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                              <path d="M13 21h3M20 21h3M13 25h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <h4 className="text-[15px] font-bold leading-snug text-ink group-hover:text-coral transition-colors line-clamp-2">
                          {a.title}
                        </h4>
                        <p className="text-[12px] leading-relaxed text-ink-soft mt-1.5 line-clamp-2">
                          {a.excerpt}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="border-y border-border-line py-10 text-center">
                <p className="font-serif-h text-lg font-bold text-ink">近日開催のイベントはありません</p>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
                  新しい予定が決まり次第、ここに掲載します。
                </p>
              </div>
            )}
          </div>

          {notices.length > 0 && (
            <aside className="lg:col-span-5 bg-paper text-ink rounded-sm border border-border-line p-5 sm:p-6 lg:p-7 shadow-[0_1px_0_#e8e2d9,0_18px_42px_-28px_rgba(0,0,0,0.18)]">
              <div className="flex items-center justify-between gap-5 mb-6">
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

              <ul className="divide-y divide-border-line border-y border-border-line">
                {notices.map((a) => {
                  const isNews = a.category === "news";
                  return (
                    <li key={a.slug}>
                      <Link
                        href={`/media/${a.slug}`}
                        className="group grid grid-cols-[88px_1fr] gap-4 py-4 hover:bg-paper-alt transition-colors -mx-3 px-3 rounded-sm"
                      >
                        <div className="pt-0.5">
                          <span className="block text-[11px] text-ink-muted tracking-widest leading-tight">{formatDate(a.date)}</span>
                          <span className={`mt-2 inline-flex rounded-full bg-paper px-2 py-1 text-[10px] font-bold tracking-[.18em] ${isNews ? "text-ocean" : "text-forest"}`}>
                            {isNews ? "お知らせ" : "日記"}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[15px] font-bold text-ink group-hover:text-coral transition-colors leading-snug line-clamp-2">
                            {a.title}
                          </h4>
                          <p className="mt-1.5 text-[12px] leading-relaxed text-ink-soft line-clamp-2">
                            {a.excerpt}
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </aside>
          )}
        </div>

        <div className="mt-10 flex items-center justify-between">
          <span className="text-[11px] tracking-[.24em] text-ink-muted">
            {eventItems.length} EVENTS · {notices.length} UPDATES
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
