"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import type { BoardCard } from "@/lib/board";

// ── Tag theme: background color + icon color ──────────────────────────────
const TAG_THEME: Record<string, { bg: string; color: string }> = {
  "学校 × 地域": { bg: "#edf5f0", color: "#2e7d52" },
  "農業 × 食":   { bg: "#fef3e2", color: "#c86d1a" },
  "ものづくり":  { bg: "#fef3e2", color: "#c86d1a" },
  "メディア":    { bg: "#e0f2fa", color: "#0b7eaa" },
  "行政 × 連携": { bg: "#e0f2fa", color: "#0b7eaa" },
  "漁業 × 食":   { bg: "#e0f2fa", color: "#0b7eaa" },
  "学び":        { bg: "#edf5f0", color: "#2e7d52" },
};

// ── Small themed SVG icons ────────────────────────────────────────────────
function TagIcon({ tag, color }: { tag: string; color: string }) {
  const s = { stroke: color, fill: "none", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (tag === "学校 × 地域") return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
      <path d="M18 6 L32 14 L18 22 L4 14 Z" {...s} />
      <path d="M4 14 L4 26" {...s} />
      <path d="M10 17 L10 28 Q18 32 26 28 L26 17" {...s} />
      <circle cx="32" cy="14" r="1.5" fill={color} stroke="none" />
    </svg>
  );
  if (tag === "農業 × 食") return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
      <path d="M18 30 L18 14" {...s} />
      <path d="M18 14 C18 14 10 10 10 4 C14 4 18 8 18 14" {...s} fill={color} fillOpacity="0.15" />
      <path d="M18 14 C18 14 26 10 26 4 C22 4 18 8 18 14" {...s} fill={color} fillOpacity="0.15" />
      <path d="M12 22 C14 18 22 18 24 22" {...s} />
    </svg>
  );
  if (tag === "ものづくり") return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
      <ellipse cx="18" cy="24" rx="10" ry="5" {...s} fill={color} fillOpacity="0.12" />
      <path d="M8 24 C8 20 10 14 18 12 C26 14 28 20 28 24" {...s} />
      <path d="M13 12 C13 8 23 8 23 12" {...s} />
    </svg>
  );
  if (tag === "漁業 × 食") return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
      <path d="M8 18 C12 12 20 12 26 18 C20 24 12 24 8 18 Z" {...s} fill={color} fillOpacity="0.15" />
      <circle cx="22" cy="17" r="1.5" fill={color} stroke="none" />
      <path d="M26 18 L31 14 M26 18 L31 22" {...s} />
      <path d="M6 26 Q12 24 18 26 Q24 28 30 26" {...s} strokeOpacity="0.5" />
    </svg>
  );
  if (tag === "メディア") return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
      <rect x="6" y="12" width="24" height="16" rx="2" {...s} fill={color} fillOpacity="0.1" />
      <circle cx="18" cy="20" r="4" {...s} />
      <circle cx="18" cy="20" r="1.5" fill={color} stroke="none" />
      <rect x="13" y="9" width="10" height="4" rx="1" {...s} />
    </svg>
  );
  if (tag === "行政 × 連携") return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
      <rect x="8" y="16" width="20" height="14" rx="1" {...s} fill={color} fillOpacity="0.1" />
      <path d="M6 16 L18 7 L30 16" {...s} />
      <rect x="14" y="22" width="8" height="8" rx="1" {...s} />
      <line x1="18" y1="16" x2="18" y2="16" {...s} strokeLinecap="round" />
    </svg>
  );
  // 学び (default)
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
      <path d="M8 10 L8 28 Q8 30 10 30 L26 30 Q28 30 28 28 L28 10 Q28 8 26 8 L10 8 Q8 8 8 10 Z" {...s} fill={color} fillOpacity="0.1" />
      <line x1="13" y1="15" x2="23" y2="15" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="13" y1="19" x2="23" y2="19" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="13" y1="23" x2="19" y2="23" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────
function relativeDate(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days === 0) return "今日";
  if (days === 1) return "昨日";
  if (days < 7) return `${days}日前`;
  if (days < 14) return "1週間前";
  if (days < 30) return `${Math.floor(days / 7)}週間前`;
  return `${Math.floor(days / 30)}ヶ月前`;
}

// ── Card ─────────────────────────────────────────────────────────────────
function Card({ c }: { c: BoardCard }) {
  const theme = TAG_THEME[c.tag] ?? { bg: "#f5f0e8", color: "#767676" };

  return (
    <article className="snap-start shrink-0 w-[300px] sm:w-[320px] bg-paper rounded-md border border-border-line shadow-[0_1px_0_#e8e2d9,0_8px_24px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_1px_0_#c8c0b4,0_18px_40px_-12px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 transition-all flex flex-col overflow-hidden">

      {/* visual header */}
      <div className="relative h-[88px] flex items-center justify-center shrink-0" style={{ backgroundColor: theme.bg }}>
        {c.thumbnail ? (
          <img src={c.thumbnail} alt={c.title} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <TagIcon tag={c.tag} color={theme.color} />
        )}
      </div>

      {/* content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[.18em] font-bold" style={{ color: theme.color }}>
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: theme.color }} />
            {c.tag}
          </span>
          <span className="text-[10px] text-ink-muted tracking-widest">{relativeDate(c.publishedAt)}</span>
        </div>

        <h3 className="font-serif-h text-[17px] font-bold text-ink leading-snug">{c.title}</h3>

        <p className="text-[13px] leading-[1.85] text-ink-soft line-clamp-3 flex-1">{c.body}</p>

        <div className="pt-3 border-t border-dashed border-border-line flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="w-7 h-7 rounded-full border border-border-line text-[11px] font-bold text-paper flex items-center justify-center shrink-0"
              style={{ backgroundColor: theme.color }}
            >
              {c.author.slice(0, 1)}
            </span>
            <div className="min-w-0">
              <p className="text-[12px] font-bold text-ink leading-tight truncate">{c.author}</p>
              <p className="text-[10px] text-ink-muted leading-tight truncate">{c.role}</p>
            </div>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-1 text-[11px] font-bold text-ink border border-ink/20 px-2.5 py-1.5 rounded-full hover:bg-ink hover:text-paper transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            相談する
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

// ── BoardSection ──────────────────────────────────────────────────────────
export default function BoardSection({ cards }: { cards: BoardCard[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const recompute = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const pct = max <= 0 ? 1 : el.scrollLeft / max;
    setProgress(pct);
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    recompute();
    el.addEventListener("scroll", recompute, { passive: true });
    window.addEventListener("resize", recompute);
    return () => {
      el.removeEventListener("scroll", recompute);
      window.removeEventListener("resize", recompute);
    };
  }, [recompute]);

  const scrollByCard = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("article");
    const step = card ? card.getBoundingClientRect().width + 16 : 320;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <section className="bg-paper">
      <div className="max-w-[1400px] mx-auto px-6 py-20 lg:py-28">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          <div className="lg:col-span-7">
            <p className="section-label text-ink-muted mb-4">Open Board · 玉野の、やってみたい</p>
            <h2 className="font-serif-h text-5xl lg:text-7xl font-black leading-[1.02] text-ink">
              玉野の、<br /><span className="accent-coral">やってみたい</span><span>。</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-end">
            <p className="text-[14px] leading-[2] text-ink-soft max-w-md">
              市民・企業・行政、どんな立場の人でも、「やってみたい」を投稿できる場所。
              小さなアイデアが、誰かの動きとつながっていきます。
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-ink text-paper px-5 py-2.5 rounded-full text-sm font-bold hover:bg-ink-night transition-colors"
              >
                ＋ やってみたいを投稿
              </Link>
              <a href="#" className="text-sm text-ink-soft hover:text-ink underline underline-offset-4 decoration-border-line hover:decoration-ink transition-colors">
                ボードをすべて見る
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3 text-[11px] tracking-[.24em] text-ink-muted">
            <span className="font-bold text-ink">{cards.length}</span>
            <span>POSTS</span>
            <span className="w-1 h-1 rounded-full bg-ink-muted/50" />
            <span>UPDATED WEEKLY</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="nav-btn" disabled={!canPrev} onClick={() => scrollByCard(-1)} aria-label="前へ">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button className="nav-btn" disabled={!canNext} onClick={() => scrollByCard(1)} aria-label="次へ">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={trackRef}
            className="no-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 -mx-6 px-6 scroll-smooth"
          >
            {cards.map((c) => <Card key={c.id} c={c} />)}
            <Link
              href="/contact"
              className="snap-start shrink-0 w-[300px] sm:w-[320px] rounded-md border-2 border-dashed border-border-line hover:border-coral hover:bg-coral/[0.04] transition-colors flex flex-col items-center justify-center text-center p-8 group"
            >
              <span className="w-12 h-12 rounded-full bg-paper-alt group-hover:bg-coral group-hover:text-paper text-ink-soft flex items-center justify-center mb-4 text-xl font-bold transition-colors">＋</span>
              <p className="font-serif-h text-base font-bold text-ink mb-2">あなたの「やってみたい」を投稿</p>
              <p className="text-[12px] text-ink-muted leading-relaxed">どんな小さなアイデアでもOK。一緒に動いてくれる人を見つけましょう。</p>
            </Link>
          </div>

          <div className="h-[3px] bg-border-line rounded-full overflow-hidden">
            <div
              className="h-full bg-ink rounded-full transition-all duration-200"
              style={{ width: `${Math.max(8, Math.min(100, progress * 100 + 12))}%` }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
