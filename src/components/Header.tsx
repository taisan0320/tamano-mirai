"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";

/* ヘッダー：高さ64px・追従。影はサイト内でここだけに使う。 */

const navLinks = [
  { href: "/media", label: "最新" },
  { href: "/interviews", label: "動く人たち" },
  { href: "/events", label: "イベント" },
  { href: "/#student", label: "学生トライアル" },
  { href: "/blog", label: "日記" },
  { href: "/about", label: "センターについて" },
];

const menuLinks = [
  ...navLinks,
  { href: "/news", label: "お知らせ" },
  { href: "/documents", label: "資料・報告書" },
  { href: "/join", label: "入会・寄付" },
  { href: "/contact", label: "お問い合わせ" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper shadow-[0_0_4px_rgba(0,0,0,.24),0_0_16px_rgba(0,0,0,.12)]">
      <div className="mx-auto flex h-16 max-w-[1232px] items-center gap-2 px-4 sm:gap-4">
        <Link
          href="/"
          className="flex shrink-0 items-center rounded p-2 hover:bg-[rgba(34,34,34,.05)]"
          aria-label="玉野SDGsみらいづくりセンター トップへ"
        >
          <Image
            src="/tamano-sdgs-logo.png"
            alt="特定非営利活動法人 玉野SDGsみらいづくりセンター"
            width={1000}
            height={240}
            priority
            className="h-7 w-auto sm:h-8"
          />
        </Link>

        <nav className="ml-2 hidden gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded px-2.5 py-2 text-[13px] font-bold leading-tight text-ink hover:bg-[rgba(34,34,34,.05)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Link
            href="/media#search"
            aria-label="記事を検索する"
            className="grid h-11 w-11 place-items-center rounded text-ink hover:bg-[rgba(34,34,34,.05)]"
          >
            <Search size={20} />
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded text-ink hover:bg-[rgba(34,34,34,.05)] lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link
            href="/contact"
            className="whitespace-nowrap rounded bg-ocean px-4 py-[11px] text-[14px] font-bold leading-none text-white hover:bg-ocean-dark"
          >
            相談する
          </Link>
        </div>
      </div>

      {open && (
        <div className="border-t border-border-line bg-paper lg:hidden">
          <nav className="mx-auto flex max-w-[1232px] flex-col px-4 py-2">
            {menuLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b border-border-line py-3.5 text-[14px] font-bold text-ink last:border-b-0 hover:text-ocean"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
