"use client";

import Link from "next/link";
import type { Article } from "@/lib/articles";

const CATEGORY_KIND: Record<string, string> = {
  event: "イベント",
  volunteer: "募集",
  blog: "日記",
  news: "お知らせ",
  interview: "インタビュー",
  story: "記事",
  explore: "探究学習",
};

const KIND_COLOR: Record<string, string> = {
  "イベント": "text-amber-light",
  "募集": "text-coral",
  "日記": "text-forest-light",
  "お知らせ": "text-ocean-light",
  "インタビュー": "text-ocean-light",
  "記事": "text-ocean-light",
  "探究学習": "text-forest-light",
};

function parseDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    day: d.getDate(),
    mon: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    year: d.getFullYear().toString(),
  };
}

export default function HappeningSection({ articles }: { articles: Article[] }) {
  const today = new Date().toLocaleDateString("ja-JP", {
    year: "numeric", month: "long", day: "numeric",
  });

  const items = articles.map((a) => ({
    ...a,
    kind: CATEGORY_KIND[a.category] ?? "その他",
    ...parseDate(a.date),
  }));

  return (
    <section id="happening" className="bg-ink-night text-paper border-b border-ink-night">
      <div className="border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 h-9 flex items-center justify-between">
          <span className="text-[10px] tracking-[.32em] text-paper/50">NOW IN TAMANO · 直近の動き</span>
          <span className="text-[10px] tracking-[.32em] text-paper/50 hidden sm:block">UPDATED {today}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-20 lg:py-28">
        <div className="mb-12">
          <p className="section-label text-paper/40 mb-4">ライブボード</p>
          <h2 className="font-serif-h text-5xl lg:text-7xl font-black leading-none">
            いま、玉野で<br />起きている<span className="accent-coral">。</span>
          </h2>
        </div>

        <ul className="divide-y divide-white/10 border-y border-white/10">
          {items.map((a) => (
            <li key={a.slug}>
              <Link
                href={`/media/${a.slug}`}
                className="group grid grid-cols-12 items-center gap-4 lg:gap-6 py-6 lg:py-7 hover:bg-white/[0.04] transition-colors -mx-3 lg:-mx-6 px-3 lg:px-6 rounded-sm"
              >
                <div className="col-span-3 lg:col-span-2 flex items-baseline gap-2 lg:gap-3">
                  <span className="font-serif-h text-4xl lg:text-6xl font-black leading-none text-paper">{a.day}</span>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[10px] tracking-[.24em] text-paper/60">{a.mon}</span>
                    <span className="text-[10px] tracking-[.24em] text-paper/40">{a.year}</span>
                  </div>
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <span className={`text-[10px] tracking-[.28em] font-bold ${KIND_COLOR[a.kind] ?? "text-paper/70"}`}>
                    {a.kind}
                  </span>
                </div>

                <div className="col-span-7 lg:col-span-8 min-w-0">
                  <h3 className="font-serif-h text-base lg:text-xl font-bold leading-snug text-paper group-hover:text-coral transition-colors line-clamp-2">
                    {a.title}
                  </h3>
                  <p className="text-[12px] text-paper/50 mt-1.5 hidden lg:block line-clamp-1">
                    {a.excerpt}
                  </p>
                </div>

                <div className="hidden lg:flex col-span-1 justify-end">
                  <span className="text-paper/30 group-hover:text-coral group-hover:translate-x-1 transition-all text-lg" aria-hidden="true">→</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex items-center justify-between">
          <span className="text-[11px] tracking-[.24em] text-paper/40">
            {items.length} ITEMS · ALL UPDATES
          </span>
          <Link
            href="/media"
            className="inline-flex items-center gap-2 text-sm font-bold text-paper/80 hover:text-paper border-b border-paper/20 hover:border-paper transition-colors pb-1"
          >
            すべての動きを見る
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
