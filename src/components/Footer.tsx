import Link from "next/link";

/* フッター：4カラムのリンク集＋連絡先。装飾は置かず、罫線だけで区切る。 */

const footerNav = [
  {
    heading: "MEDIA / メディア",
    links: [
      { label: "イベント情報", href: "/events" },
      { label: "動く人たち", href: "/interviews" },
      { label: "コーディネーター日記", href: "/blog" },
      { label: "お知らせ", href: "/news" },
      { label: "すべての記事", href: "/media" },
    ],
  },
  {
    heading: "CENTER / センターについて",
    links: [
      { label: "法人概要・理念", href: "/about" },
      { label: "事業内容", href: "/services" },
      { label: "役員名簿", href: "/about#team" },
      { label: "沿革", href: "/about#history" },
    ],
  },
  {
    heading: "JOIN / 参加・連携",
    links: [
      { label: "入会・寄付", href: "/join" },
      { label: "学生トライアル", href: "/#student" },
      { label: "講演のご依頼", href: "/about#speakers" },
      { label: "資料・報告書", href: "/documents" },
      { label: "お問い合わせ", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-line bg-paper">
      <div className="mx-auto max-w-[1232px] px-4 pb-10 pt-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {footerNav.map((col) => (
            <div key={col.heading}>
              <h3 className="mb-2.5 text-[10px] tracking-[.12em] text-ink-muted">
                {col.heading}
              </h3>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label} className="mb-2 text-[13px]">
                    <Link href={link.href} className="text-ink hover:text-ocean">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-2.5 text-[10px] tracking-[.12em] text-ink-muted">
              CONTACT / 連絡先
            </h3>
            <ul className="text-[13px] text-ink">
              <li className="mb-2">
                <a href="tel:09013563655" className="hover:text-ocean">
                  TEL 090-1356-3655
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="mailto:info@npo-tamano-mirai.com"
                  className="break-all hover:text-ocean"
                >
                  info@npo-tamano-mirai.com
                </a>
              </li>
              <li className="mb-2">岡山県玉野市迫間2252-3</li>
              <li className="mb-2">平日 9:00〜18:00</li>
              <li className="mb-2">
                <a
                  href="https://www.instagram.com/tamano.miraizukuri/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ocean"
                >
                  Instagram →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border-line pt-4 text-[11px] text-ink-soft">
          <span>
            © {new Date().getFullYear()} 特定非営利活動法人 玉野SDGsみらいづくりセンター
          </span>
          <span className="flex gap-4">
            <Link href="/privacy" className="hover:text-ocean">
              プライバシーポリシー
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
