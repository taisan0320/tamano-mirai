"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const contentLinks = [
  { href: "/events", label: "イベント情報" },
  { href: "/stories", label: "まちの人・団体" },
  { href: "/blog", label: "日記" },
  { href: "/news", label: "お知らせ" },
];

const orgLinks = [
  { href: "/about", label: "みらいづくりセンターについて" },
  { href: "/documents", label: "各種資料・報告書" },
];

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="7" r="1.1" fill="currentColor" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-sm border-b border-border-line">
      {/* main bar */}
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center shrink-0" aria-label="玉野SDGsみらいづくりセンター トップへ">
          <Image
            src="/tamano-sdgs-logo.png"
            alt="特定非営利活動法人 玉野SDGsみらいづくりセンター"
            width={1000}
            height={240}
            priority
            className="h-10 w-auto sm:h-12"
          />
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
          <a
            href="https://www.instagram.com/tamano.miraizukuri/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-line bg-paper text-ink-soft hover:border-coral hover:text-coral hover:bg-coral-pale transition-colors"
          >
            <InstagramIcon />
          </a>
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
            <a
              href="https://www.instagram.com/tamano.miraizukuri/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border-line bg-paper px-4 py-3 text-sm font-bold text-ink-soft hover:border-coral hover:text-coral hover:bg-coral-pale transition-colors"
              onClick={() => setOpen(false)}
            >
              <InstagramIcon />
              Instagram
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
