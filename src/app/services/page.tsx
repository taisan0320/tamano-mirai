import type { Metadata } from "next";
import Link from "next/link";
import { StaticPageLayout } from "@/components/ArchiveLayout";
import { BUSINESSES } from "@/lib/organization";

export const metadata: Metadata = {
  title: "事業内容",
  description:
    "地域づくり連携事業・団体基盤整備事業・調査政策提言事業・公共施設の有効活用推進事業の4つの柱で、玉野の地域活動を支えています。",
};

export default function ServicesPage() {
  return (
    <StaticPageLayout
      label="SERVICES"
      title="事業内容"
      description="4つの柱で、玉野の地域活動を支えています。"
      breadcrumb={[{ label: "センターについて", href: "/about" }]}
    >
      <div className="divide-y divide-border-line border-t border-border-line">
        {BUSINESSES.map((business) => (
          <section key={business.number} className="py-5">
            <p className="text-[11px] font-bold leading-tight tracking-[.12em] text-ink-muted">
              {business.number}
            </p>
            <h2 className="my-1.5 text-[16px] font-bold leading-tight text-ink sm:text-[18px]">
              {business.title}
            </h2>
            <p className="text-[13px] leading-[1.8] text-ink-soft">{business.desc}</p>
            <ul className="mt-3 rounded border border-border-line">
              {business.items.map((item) => (
                <li
                  key={item}
                  className="border-b border-border-line px-3.5 py-2.5 text-[13px] leading-[1.6] text-ink last:border-b-0"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <Link
        href="/contact"
        className="mt-6 block rounded bg-ocean py-3 text-center text-[14px] font-bold leading-none text-white hover:bg-ocean-dark"
      >
        連携・委託についてご相談する
      </Link>
    </StaticPageLayout>
  );
}
