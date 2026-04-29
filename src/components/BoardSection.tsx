"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface BoardCard {
  id: string;
  author: string;
  role: string;
  posted: string;
  reactions: number;
  tag: string;
  title: string;
  body: string;
}

const boardCards: BoardCard[] = [
  {
    id: "b-001", author: "西田井", role: "学校連携コーディネーター",
    posted: "2日前", reactions: 14, tag: "学校 × 地域",
    title: "高校生が町の人にインタビューする日をつくれないか",
    body: "玉野高校の探究の時間で、生徒が町の人にインタビューしに行く。受け入れてくれる商店・事業者を募りたい。",
  },
  {
    id: "b-002", author: "田中", role: "玉野市南部・若手農家",
    posted: "3日前", reactions: 22, tag: "農業 × 食",
    title: "棚田の田植え体験、子どもたちと一緒にやってみたい",
    body: "GW明けに棚田の田植え。地域の子どもたちに開いてみたい。サポートしてくれる人を3名くらい募集。",
  },
  {
    id: "b-003", author: "山本", role: "陶芸家",
    posted: "5日前", reactions: 9, tag: "ものづくり",
    title: "玉野の土で器を焼く、月いちのワークショップ",
    body: "工房を月1で開放したい。初心者OK。土と向き合う時間を、一緒に過ごしてくれる人を探しています。",
  },
  {
    id: "b-004", author: "編集部", role: "玉野SDGsみらい",
    posted: "1週間前", reactions: 31, tag: "メディア",
    title: "玉野の朝を撮る写真家を探しています",
    body: "「玉野の話」連載で、朝の風景を撮ってくれる写真家を探しています。地元の方優先。",
  },
  {
    id: "b-005", author: "市役所・観光", role: "玉野市役所",
    posted: "1週間前", reactions: 6, tag: "行政 × 連携",
    title: "観光パンフレットの再編集、市民の声を集めたい",
    body: "今ある観光パンフを、市民目線で書き直したい。月1ミーティングに参加できる方を募集します。",
  },
  {
    id: "b-006", author: "林", role: "宇野漁港・漁師",
    posted: "2週間前", reactions: 18, tag: "漁業 × 食",
    title: "朝市を、月1回でも復活させたい",
    body: "コロナで途絶えてしまった朝市。少人数からでも、もう一度動かしてみませんか。",
  },
  {
    id: "b-007", author: "渋川マリン", role: "水族館スタッフ",
    posted: "2週間前", reactions: 12, tag: "学び",
    title: "夜の水族館を企画したい。アイデア募集",
    body: "閉館後の水族館で、大人だけの夜のイベント。やってみたい人、知恵を貸してください。",
  },
];

function ReactionPill({ count }: { count: number }) {
  const [n, setN] = useState(count);
  const [animating, setAnimating] = useState(false);
  const [active, setActive] = useState(false);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !active;
    setActive(next);
    setN(next ? n + 1 : n - 1);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 360);
  };

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 text-[12px] px-2 py-1 rounded-full border transition-colors ${
        active
          ? "bg-coral/10 border-coral/40 text-coral"
          : "border-border-line text-ink-muted hover:bg-paper-alt"
      }`}
    >
      <span className={`${animating ? "pop" : ""} inline-block`} aria-hidden="true">
        {active ? "♥" : "♡"}
      </span>
      <span className="tabular-nums">{n}</span>
    </button>
  );
}

function Card({ c }: { c: BoardCard }) {
  return (
    <article className="snap-start shrink-0 w-[300px] sm:w-[320px] bg-paper rounded-md border border-border-line shadow-[0_1px_0_#e8e2d9,0_8px_24px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_1px_0_#c8c0b4,0_18px_40px_-12px_rgba(0,0,0,0.18)] hover:-translate-y-0.5 transition-all p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[.18em] font-bold text-coral">
          <span className="w-1.5 h-1.5 rounded-full bg-coral" />
          {c.tag}
        </span>
        <span className="text-[10px] text-ink-muted tracking-widest">{c.posted}</span>
      </div>

      <h3 className="font-serif-h text-[17px] font-bold text-ink leading-snug">{c.title}</h3>

      <p className="text-[13px] leading-[1.85] text-ink-soft line-clamp-4">{c.body}</p>

      <div className="mt-auto pt-3 border-t border-dashed border-border-line flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-7 h-7 rounded-full bg-paper-alt border border-border-line text-[11px] font-bold text-ink flex items-center justify-center shrink-0">
            {c.author.slice(0, 1)}
          </span>
          <div className="min-w-0">
            <p className="text-[12px] font-bold text-ink leading-tight truncate">{c.author}</p>
            <p className="text-[10px] text-ink-muted leading-tight truncate">{c.role}</p>
          </div>
        </div>
        <ReactionPill count={c.reactions} />
      </div>
    </article>
  );
}

export default function BoardSection() {
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
    <section className="bg-paper border-b border-border-line">
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
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-ink text-paper px-5 py-2.5 rounded-full text-sm font-bold hover:bg-ink-night transition-colors"
              >
                ＋ やってみたいを投稿
              </a>
              <a
                href="#"
                className="text-sm text-ink-soft hover:text-ink underline underline-offset-4 decoration-border-line hover:decoration-ink transition-colors"
              >
                ボードをすべて見る
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3 text-[11px] tracking-[.24em] text-ink-muted">
            <span className="font-bold text-ink">{boardCards.length}</span>
            <span>POSTS</span>
            <span className="w-1 h-1 rounded-full bg-ink-muted/50" />
            <span>UPDATED WEEKLY</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="nav-btn"
              disabled={!canPrev}
              onClick={() => scrollByCard(-1)}
              aria-label="前へ"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              className="nav-btn"
              disabled={!canNext}
              onClick={() => scrollByCard(1)}
              aria-label="次へ"
            >
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
            {boardCards.map((c) => <Card key={c.id} c={c} />)}
            <a
              href="/contact"
              className="snap-start shrink-0 w-[300px] sm:w-[320px] rounded-md border-2 border-dashed border-border-line hover:border-coral hover:bg-coral/[0.04] transition-colors flex flex-col items-center justify-center text-center p-8 group"
            >
              <span className="w-12 h-12 rounded-full bg-paper-alt group-hover:bg-coral group-hover:text-paper text-ink-soft flex items-center justify-center mb-4 text-xl font-bold transition-colors">＋</span>
              <p className="font-serif-h text-base font-bold text-ink mb-2">あなたの「やってみたい」を投稿</p>
              <p className="text-[12px] text-ink-muted leading-relaxed">どんな小さなアイデアでもOK。一緒に動いてくれる人を見つけましょう。</p>
            </a>
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
