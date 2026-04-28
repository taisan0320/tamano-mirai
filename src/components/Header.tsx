"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/about", label: "私たちについて" },
  { href: "/services", label: "事業紹介" },
  { href: "/programs", label: "プログラム" },
  { href: "/media", label: "ニュース・メディア" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-paper/95 backdrop-blur-sm border-b border-border-line">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="section-label text-ink-muted">NPO法人</span>
          <span className="text-sm font-bold text-ink leading-tight">
            玉野SDGsみらいづくりセンター
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-ink-muted hover:text-ink transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-ocean text-white text-sm px-4 py-1.5 rounded-full hover:bg-ocean-dark transition-colors"
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
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="py-3.5 text-sm text-ink-soft hover:text-ink border-b border-border-line last:border-0 transition-colors"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-4 w-full bg-ocean text-white text-sm px-4 py-3 rounded-full text-center hover:bg-ocean-dark transition-colors"
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
