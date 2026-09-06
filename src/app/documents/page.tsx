import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, FileText } from "lucide-react";
import { fetchDocuments, type DocumentCategory } from "@/lib/documents";
import { StaticPageLayout, PageSection } from "@/components/ArchiveLayout";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "資料・報告書",
  description:
    "玉野SDGsみらいづくりセンターが発行した調査報告書・機関誌・定款・決算書などの資料一覧です。",
};

const SECTIONS: {
  id: string;
  category: DocumentCategory;
  label: string;
  englishLabel: string;
}[] = [
  {
    id: "reports",
    category: "報告書",
    label: "調査・報告書",
    englishLabel: "Reports",
  },
  {
    id: "newsletter",
    category: "機関誌",
    label: "みらいレター（機関誌）",
    englishLabel: "Newsletter",
  },
  {
    id: "legal",
    category: "法定資料",
    label: "法定資料",
    englishLabel: "Legal",
  },
];

export default async function DocumentsPage() {
  const docs = await fetchDocuments();

  return (
    <StaticPageLayout
      label="DOCUMENTS"
      title="資料・報告書"
      description="調査報告書・機関誌・定款・決算書など、センターの活動記録を公開しています。"
    >
      {SECTIONS.map((section) => {
        const items = docs.filter((d) => d.category === section.category);
        if (items.length === 0) return null;
        return (
          <PageSection
            key={section.id}
            id={section.id}
            label={section.englishLabel}
            title={section.label}
          >
            <div className="divide-y divide-border-line border-t border-border-line">
              {items.map((doc) => {
                const isAvailable = doc.url !== "#";
                return (
                  <a
                    key={doc.id}
                    href={isAvailable ? doc.url : undefined}
                    target={isAvailable ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-disabled={!isAvailable}
                    className={`group -mx-3 flex items-start gap-3 rounded px-3 py-3.5 ${
                      isAvailable
                        ? "card-interactive"
                        : "cursor-not-allowed opacity-50"
                    }`}
                  >
                    <FileText size={16} className="mt-0.5 shrink-0 text-ink-muted" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <h3 className="text-[14px] font-bold leading-[1.4] text-ink group-hover:text-ocean">
                          {doc.title}
                        </h3>
                        <span className="text-[11px] text-ink-muted">{doc.date}</span>
                      </div>
                      <p className="mt-1 text-[12px] leading-[1.7] text-ink-soft">
                        {doc.description}
                      </p>
                    </div>
                    {isAvailable && (
                      <ExternalLink
                        size={14}
                        className="mt-0.5 shrink-0 text-ink-muted"
                      />
                    )}
                  </a>
                );
              })}
            </div>
          </PageSection>
        );
      })}

      <div className="mt-8 rounded border border-border-line p-4">
        <p className="text-[10px] leading-tight tracking-[.12em] text-ink-muted">
          NOTE
        </p>
        <p className="mt-1.5 text-[14px] font-bold leading-tight text-ink">
          資料の閲覧について
        </p>
        <p className="mt-2 text-[12px] leading-[1.7] text-ink-soft">
          各資料はGoogleドライブまたはGoogleドキュメントで公開しています。閲覧にはGoogleアカウントが必要な場合があります。資料に関するご質問は
          <Link href="/contact" className="font-bold text-ocean hover:underline">
            お問い合わせフォーム
          </Link>
          よりご連絡ください。
        </p>
      </div>
    </StaticPageLayout>
  );
}
