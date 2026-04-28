"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/about", label: "私たちについて" },
  { href: "/services", label: "事業紹介" },
  { href: "/programs", label: "プログラム" },
  { href: "/media", label: "ニュース・メディア" },
  { href: "/contact", label: "お問い合わせ" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-[11px] font-medium text-accent tracking-widest uppercase">
            NPO法人
          </span>
          <span className="text-sm font-bold text-primary leading-tight">
            玉野SDGsみらいづくりセンター
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-slate-600 hover:text-primary font-medium transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-2 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-primary-light transition-colors"
          >
            相談・申込み
          </Link>
        </nav>

        <button
          className="md:hidden p-2 text-slate-600 hover:text-primary"
          onClick={() => setOpen(!open)}
          aria-label="メニュー"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-border">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="py-3 text-sm font-medium text-slate-700 hover:text-primary border-b border-border last:border-0 transition-colors"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-3 bg-primary text-white text-sm font-semibold px-4 py-3 rounded-lg text-center"
              onClick={() => setOpen(false)}
            >
              相談・申込み
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
