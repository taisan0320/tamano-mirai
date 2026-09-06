import type { Metadata } from "next";
import { StaticPageLayout } from "@/components/ArchiveLayout";
import { TIMELINE } from "@/lib/organization";

export const metadata: Metadata = {
  title: "沿革",
  description:
    "2011年の協働のまちづくり基本条例の制定から、2024年のNPO法人認証まで。玉野SDGsみらいづくりセンターのあゆみです。",
};

export default function HistoryPage() {
  return (
    <StaticPageLayout
      label="HISTORY"
      title="沿革"
      description="協働のまちづくり基本条例の制定から、NPO法人としての認証まで。"
      breadcrumb={[{ label: "センターについて", href: "/about" }]}
    >
      <div className="divide-y divide-border-line border-t border-border-line">
        {TIMELINE.map((item) => (
          <div key={item.year} className="flex gap-4 py-4">
            <span className="w-[52px] shrink-0 text-[16px] font-bold leading-tight text-ink">
              {item.year}
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-[14px] font-bold leading-tight text-ink">
                {item.title}
              </h2>
              <p className="mt-1.5 text-[13px] leading-[1.8] text-ink-soft">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </StaticPageLayout>
  );
}
