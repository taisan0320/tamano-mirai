"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Mark } from "@/components/Mark";

const today = new Date().toLocaleDateString("ja-JP", {
  year: "numeric", month: "long", day: "numeric", weekday: "short",
});

const contentLinks = [
  { href: "/events", label: "イベント情報" },
  { href: "/stories", label: "まちの人・団体" },
  { href: "/blog", label: "日記" },
  { href: "/news", label: "お知らせ" },
];

const orgLinks = [
  { href: "/about", label: "センターについて" },
  { href: "/documents", label: "資料" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-sm border-b border-border-line">
      {/* meta strip */}
      <div className="bg-ink-night text-paper">
        <div className="max-w-[1400px] mx-auto px-6 h-7 flex items-center justify-between text-[11px] tracking-[.2em]">
          <span className="opacity-60">{today}</span>
          <span className="opacity-60 hidden sm:block">玉野のいまが、ここにある。</span>
          <span className="opacity-60 hidden md:block">VOL.04 · 2026</span>
        </div>
      </div>

      {/* main bar */}
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Mark size={34} />
          <div className="flex flex-col leading-tight">
            <span className="section-label text-ink-muted">NPO法人</span>
            <span className="font-serif-h text-[15px] font-bold text-ink leading-tight">
              玉野SDGsみらいづくりセンター
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 text-[13px]">
          {contentLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 text-ink-soft hover:text-ink hover:bg-paper-alt rounded-full transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <span className="w-px h-4 bg-border-line mx-2" />
          {orgLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 text-ink-soft hover:text-ink hover:bg-paper-alt rounded-full transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-2 bg-forest text-white text-[13px] font-bold px-4 py-2 rounded-full hover:bg-forest-light transition-colors"
          >
            お問い合わせ
            <span aria-hidden="true">→</span>
          </Link>
          <button
            className="lg:hidden p-2 text-ink-muted hover:text-ink transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="メニュー"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-paper border-t border-border-line">
          <nav className="flex flex-col px-6 py-4 gap-0 max-w-[1400px] mx-auto">
            <p className="section-label text-ink-muted pt-2 pb-1">メディア</p>
            {contentLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="py-3 text-sm text-ink-soft hover:text-ink border-b border-border-line transition-colors"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <p className="section-label text-ink-muted pt-4 pb-1">センター情報</p>
            {orgLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="py-3 text-sm text-ink-soft hover:text-ink border-b border-border-line transition-colors"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-4 w-full bg-forest text-white text-sm px-4 py-3 rounded-full text-center hover:bg-forest-light transition-colors"
              onClick={() => setOpen(false)}
            >
              お問い合わせ
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
