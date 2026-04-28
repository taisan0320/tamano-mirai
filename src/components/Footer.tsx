import Link from "next/link";

const footerLinks = [
  {
    heading: "組織情報",
    links: [
      { href: "/about", label: "私たちについて" },
      { href: "/about#vision", label: "理念・ビジョン" },
      { href: "/about#team", label: "役員・スタッフ" },
    ],
  },
  {
    heading: "活動・事業",
    links: [
      { href: "/services", label: "事業紹介" },
      { href: "/programs", label: "プログラム" },
      { href: "/media", label: "ニュース・メディア" },
    ],
  },
  {
    heading: "参加・連携",
    links: [
      { href: "/contact", label: "お問い合わせ" },
      { href: "/contact#volunteer", label: "ボランティア登録" },
      { href: "/contact#partner", label: "協力・連携のご相談" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-paper-alt border-t border-border-line">
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 pb-10 border-b border-border-line">
          <div className="max-w-sm">
            <p className="section-label text-ink-muted mb-2">NPO法人</p>
            <h2 className="text-base font-bold text-ink leading-snug mb-3">
              玉野SDGsみらいづくりセンター
            </h2>
            <p className="text-sm text-ink-muted leading-relaxed">
              市民・企業・行政をつなぐ中間支援NPO。<br />
              住み続けたい玉野の未来をともにつくります。
            </p>
          </div>
          {/* Social Icons */}
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/tamano.miraizukuri/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center bg-ocean/10 hover:bg-ocean/20 text-ocean transition-colors rounded-full"
              aria-label="Instagram"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center bg-ocean/10 hover:bg-ocean/20 text-ocean transition-colors rounded-full"
              aria-label="Facebook"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Link grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-10 border-b border-border-line">
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h3 className="section-label text-ink-muted mb-4">{col.heading}</h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-ink-soft hover:text-ocean transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact info row */}
        <div className="py-8 border-b border-border-line">
          <div className="flex flex-col sm:flex-row gap-6 text-sm text-ink-muted">
            <div>
              <span className="section-label text-ink-muted mr-2">TEL</span>
              <a href="tel:09013563655" className="text-ink-soft hover:text-ocean transition-colors font-medium">090-1356-3655</a>
            </div>
            <div>
              <span className="section-label text-ink-muted mr-2">EMAIL</span>
              <a href="mailto:info@npo-tamano-mirai.com" className="text-ink-soft hover:text-ocean transition-colors font-medium">info@npo-tamano-mirai.com</a>
            </div>
            <div>
              <span className="section-label text-ink-muted mr-2">ADDRESS</span>
              <span className="text-ink-soft">岡山県玉野市迫間2252番地３</span>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-ink-muted">
          <p>© {new Date().getFullYear()} 特定非営利活動法人 玉野SDGsみらいづくりセンター. All rights reserved.</p>
          <Link href="/privacy" className="hover:text-ocean transition-colors">
            プライバシーポリシー
          </Link>
        </div>
      </div>
    </footer>
  );
}
