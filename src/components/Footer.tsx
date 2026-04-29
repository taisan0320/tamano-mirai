import Link from "next/link";
import { Mark } from "@/components/Mark";

const tickerWords = [
  "市民・企業・行政をつなぐ", "中間支援NPO", "玉野市迫間2252-3",
  "Founded 2018", "玉野でやってみたいを、形に",
  "Setouchi inland sea", "市民・企業・行政をつなぐ", "中間支援NPO",
];

const footerNav = [
  {
    heading: "MEDIA / メディア",
    links: [
      { label: "イベント情報", href: "/events" },
      { label: "まちの人・団体", href: "/stories" },
      { label: "日記", href: "/blog" },
      { label: "お知らせ", href: "/news" },
    ],
  },
  {
    heading: "CENTER / センターについて",
    links: [
      { label: "法人概要・理念", href: "/about" },
      { label: "役員名簿", href: "/about#team" },
      { label: "沿革", href: "/about#history" },
      { label: "事業内容", href: "/about#business" },
    ],
  },
  {
    heading: "JOIN / 参加・連携",
    links: [
      { label: "入会・寄付", href: "/about#membership" },
      { label: "資料・報告書", href: "/documents" },
      { label: "お問い合わせ", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-paper-alt paper-grain text-ink border-t border-border-line">
      {/* ticker */}
      <div className="bg-ink-night text-paper overflow-hidden border-b border-ink-night">
        <div className="ticker-track flex whitespace-nowrap py-3 text-[11px] tracking-[.32em] uppercase">
          {[...tickerWords, ...tickerWords].map((w, i) => (
            <span key={i} className="px-6 text-paper/60 flex items-center gap-6">
              {w}
              <span className="inline-block w-1 h-1 rounded-full bg-paper/30" />
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pt-20 pb-10">
        {/* big wordmark + lead */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end pb-12 border-b border-border-line">
          <div className="lg:col-span-8">
            <p className="section-label text-ink-muted mb-5">NPO法人 · 中間支援</p>
            <h2 className="font-serif-h font-black leading-[0.95] tracking-[-0.01em] text-[12vw] sm:text-[8vw] lg:text-[6.5rem] text-ink">
              玉野で、<br />
              <span className="accent-coral">やってみたい</span>を、形に<span>。</span>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-[14px] leading-[2] text-ink-soft mb-6">
              市民・企業・行政をつなぐ中間支援NPO。<br />
              玉野で活動する人・団体のハブとして、人・情報・活動をつなぎます。
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-forest text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-forest-light transition-colors"
              >
                お問い合わせ →
              </Link>
              <Link
                href="/about#membership"
                className="inline-flex items-center gap-2 border border-ink/20 px-5 py-2.5 rounded-full text-sm font-bold text-ink hover:bg-paper transition-colors"
              >
                入会・寄付
              </Link>
            </div>
          </div>
        </div>

        {/* nav columns + contact */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-y-10 gap-x-8 py-12 border-b border-border-line">
          {footerNav.map((col) => (
            <div key={col.heading} className="md:col-span-3">
              <h3 className="section-label text-ink-muted mb-4">{col.heading}</h3>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="font-serif-h text-[15px] text-ink hover:text-coral transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* contact column */}
          <div className="md:col-span-3">
            <h3 className="section-label text-ink-muted mb-4">CONTACT / 連絡先</h3>
            <ul className="space-y-3 text-[13px] text-ink-soft">
              <li>
                <span className="block section-label text-ink-muted mb-0.5 text-[10px]">TEL</span>
                <a href="tel:09013563655" className="font-serif-h text-[15px] text-ink hover:text-coral transition-colors">090-1356-3655</a>
              </li>
              <li>
                <span className="block section-label text-ink-muted mb-0.5 text-[10px]">EMAIL</span>
                <a href="mailto:info@npo-tamano-mirai.com" className="font-serif-h text-[15px] text-ink hover:text-coral break-all transition-colors">info@npo-tamano-mirai.com</a>
              </li>
              <li>
                <span className="block section-label text-ink-muted mb-0.5 text-[10px]">ADDRESS</span>
                <span className="font-serif-h text-[15px] text-ink leading-snug">岡山県玉野市迫間2252-3</span>
              </li>
            </ul>

            <div className="flex gap-2 mt-6">
              <a
                href="https://www.instagram.com/tamano.miraizukuri/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-paper border border-border-line flex items-center justify-center text-ink-soft hover:bg-ink hover:text-paper transition-colors"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-paper border border-border-line flex items-center justify-center text-ink-soft hover:bg-ink hover:text-paper transition-colors"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-ink-muted">
          <div className="flex items-center gap-3">
            <Mark size={24} />
            <p>© {new Date().getFullYear()} 特定非営利活動法人 玉野SDGsみらいづくりセンター</p>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-ink transition-colors">プライバシーポリシー</Link>
            <Link href="/privacy" className="hover:text-ink transition-colors">利用規約</Link>
            <span className="tracking-[.24em]">DESIGNED IN TAMANO</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
