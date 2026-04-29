import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, FileText, BookOpen, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "調査・報告書・資料",
  description: "玉野SDGsみらいづくりセンターが発行した調査報告書・機関誌・定款・決算書などの資料一覧です。",
};

const sections = [
  {
    id: "reports",
    label: "調査・報告書",
    icon: "📋",
    docs: [
      {
        title: "地域コミュニティ点検調査報告書",
        date: "2026年4月",
        description: "玉野市内の地域コミュニティの現状を点検・調査した報告書です。",
        url: "#",
      },
      {
        title: "コミュニティ協議会聞き取り調査報告書",
        date: "2025年10月",
        description: "市内各コミュニティ協議会へのヒアリング調査をまとめた報告書です。",
        url: "#",
      },
      {
        title: "地区社会福祉協議会関連調査報告書",
        date: "2025年10月",
        description: "地区社会福祉協議会の活動実態と課題を整理した調査報告書です。",
        url: "#",
      },
      {
        title: "2023年度 活動報告書",
        date: "2024年",
        description: "2023年度の活動全体をまとめた年次報告書です。",
        url: "#",
      },
    ],
  },
  {
    id: "newsletter",
    label: "みらいレター（機関誌）",
    icon: "📰",
    docs: [
      {
        title: "みらいレター 第2号",
        date: "2025年10月",
        description: "センターの機関誌「みらいレター」最新号です。",
        url: "#",
      },
      {
        title: "みらいレター 第1号",
        date: "2025年",
        description: "センターの機関誌「みらいレター」創刊号です。",
        url: "#",
      },
    ],
  },
  {
    id: "legal",
    label: "法定資料",
    icon: "📁",
    docs: [
      {
        title: "活動計算書・事業報告書",
        date: "2026年4月",
        description: "最新の活動計算書・事業報告書・財産目録・貸借対照表です。",
        url: "#",
      },
      {
        title: "定款",
        date: "2025年1月20日",
        description: "特定非営利活動法人 玉野SDGsみらいづくりセンターの定款です。",
        url: "#",
      },
    ],
  },
];

export default function DocumentsPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="bg-ink py-20">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="section-label text-white/40 mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-white/70 transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-white/60">DOCUMENTS</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">調査・報告書・資料</h1>
          <p className="text-white/80 text-base max-w-xl leading-relaxed">
            センターが作成した調査報告書・機関誌・定款・決算書などの資料を公開しています。
            各資料はGoogle DriveまたはGoogleドキュメントにてご覧いただけます。
          </p>
        </div>
      </div>

      {/* Documents */}
      <section className="bg-paper py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-14">
            {sections.map((section) => (
              <div key={section.id} id={section.id}>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border-line">
                  <span className="text-xl">{section.icon}</span>
                  <h2 className="text-lg font-bold text-ink">{section.label}</h2>
                </div>
                <div className="space-y-3">
                  {section.docs.map((doc) => (
                    <a
                      key={doc.title}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-4 bg-white border border-border-line hover:border-forest/40 rounded-xl p-5 transition-colors card-interactive"
                    >
                      <div className="shrink-0 mt-0.5 text-ink-muted group-hover:text-forest transition-colors">
                        <FileText size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-ink group-hover:text-forest transition-colors">
                            {doc.title}
                          </h3>
                          <span className="section-label text-ink-muted">{doc.date}</span>
                        </div>
                        <p className="text-sm text-ink-muted mt-1 leading-relaxed">{doc.description}</p>
                      </div>
                      <div className="shrink-0 text-ink-muted group-hover:text-forest transition-colors mt-0.5">
                        <ExternalLink size={15} />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="mt-12 bg-forest-pale border border-forest/20 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <BookOpen size={18} className="text-forest mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-forest text-sm mb-1">資料の閲覧について</p>
                <p className="text-sm text-ink-muted leading-relaxed">
                  各資料はGoogleドライブまたはGoogleドキュメントで公開しています。
                  閲覧にはGoogleアカウントが必要な場合があります。
                  資料に関するご質問は<Link href="/contact" className="text-forest underline hover:no-underline">お問い合わせフォーム</Link>よりご連絡ください。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
