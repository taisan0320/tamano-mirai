"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const contentLinks = [
  { href: "/media?category=event", label: "イベント情報" },
  { href: "/media?category=interview", label: "まちの人・団体" },
  { href: "/media?category=blog", label: "日記" },
];

const orgLinks = [
  { href: "/about", label: "センターについて" },
  { href: "/documents", label: "資料" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-paper/95 backdrop-blur-sm border-b border-border-line">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
        <Link href="/" className="flex flex-col leading-tight shrink-0">
          <span className="section-label text-ink-muted">NPO法人</span>
          <span className="text-sm font-bold text-ink leading-tight">
            玉野SDGsみらいづくりセンター
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <div className="flex items-center gap-1 mr-3">
            {contentLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-ink-muted hover:text-ink hover:bg-paper-alt px-3 py-1.5 rounded-full transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="w-px h-4 bg-border-line mr-3" />
          {orgLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-ink-muted hover:text-ink hover:bg-paper-alt px-3 py-1.5 rounded-full transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-2 bg-forest text-white text-sm px-4 py-1.5 rounded-full hover:bg-forest-light transition-colors"
          >
            お問い合わせ
          </Link>
        </nav>

        <button
          className="md:hidden p-2 text-ink-muted hover:text-ink transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="メニュー"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-border-line">
          <nav className="flex flex-col px-6 py-4 gap-0">
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
