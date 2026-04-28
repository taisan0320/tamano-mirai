import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "事業紹介",
  description: "玉野SDGsみらいづくりセンターが展開する4つの中核事業をご紹介します。",
};

const services = [
  {
    id: "community",
    number: "01",
    title: "地域づくり連携事業",
    subtitle: "Community Development",
    lead: "市民・団体・行政をつなぐ中間支援の核となる事業です。",
    details: [
      {
        label: "相談・伴走支援",
        desc: "地域活動を行う個人・団体からの相談を受け付け、課題整理から解決策の実施まで継続的に支援します。",
      },
      {
        label: "人材育成",
        desc: "地域リーダーやファシリテーターの育成プログラムを提供。次世代の担い手を育てます。",
      },
      {
        label: "情報発信",
        desc: "地域の取り組みや活動事例を収集・発信し、市民への認知と参加を促進します。",
      },
      {
        label: "ネットワーク形成",
        desc: "異なる分野・セクターをつなぐイベントや交流の場を企画・運営します。",
      },
    ],
  },
  {
    id: "capacity",
    number: "02",
    title: "団体基盤整備事業",
    subtitle: "Organizational Support",
    lead: "NPOや市民団体が持続的に活動できるよう、組織の基盤づくりを支援します。",
    details: [
      {
        label: "講師派遣",
        desc: "ファシリテーション・会計・広報・助成金申請など、団体運営に必要なスキル習得を支援します。",
      },
      {
        label: "情報発信支援",
        desc: "SNS活用・広報物制作などを通じて、団体の認知度向上をサポートします。",
      },
      {
        label: "助成金・補助金情報提供",
        desc: "活動資金獲得のための助成金情報の提供と、申請書作成の支援を行います。",
      },
    ],
  },
  {
    id: "research",
    number: "03",
    title: "調査・政策提言事業",
    subtitle: "Research & Advocacy",
    lead: "市民の声をデータ化し、行政への提言につなげます。",
    details: [
      {
        label: "市民ニーズ調査",
        desc: "アンケートやヒアリングを通じて、地域の課題やニーズを可視化します。",
      },
      {
        label: "行政への提言",
        desc: "調査結果をもとに、玉野市の政策・施策に対する提言レポートを作成・提出します。",
      },
      {
        label: "研究・事例収集",
        desc: "先進地域の事例研究や、玉野市内の実践事例のアーカイブ化を行います。",
      },
    ],
  },
  {
    id: "facilities",
    number: "04",
    title: "公共施設有効活用事業",
    subtitle: "Public Facility Utilization",
    lead: "使われていない公共施設に新たな命を吹き込み、地域資源として活用します。",
    details: [
      {
        label: "遊休施設の調査・分析",
        desc: "市内の未活用・低活用施設を調査し、活用可能性を評価します。",
      },
      {
        label: "活用提案・マッチング",
        desc: "施設の特性に合った活用方法を提案し、市民・団体・事業者とのマッチングを行います。",
      },
      {
        label: "運営モデルの検討",
        desc: "持続可能な施設運営のための収支モデルや管理体制の構築を支援します。",
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="bg-ink py-20">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="section-label text-white/40 mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-white/70 transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-white/60">SERVICES</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">事業紹介</h1>
          <p className="text-white/80 text-base max-w-xl leading-relaxed">
            私たちは4つの中核事業を通じて、地域の「つながり」を生み出します。
          </p>
        </div>
      </div>

      {/* Services */}
      <div>
        {services.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            className={`py-20 ${i % 2 === 0 ? "bg-paper" : "bg-paper-alt"}`}
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-4">
                  <p className="section-label text-ink-muted mb-2">{s.number} / {s.subtitle}</p>
                  <h2 className="text-2xl font-bold text-ink mb-4 leading-tight">{s.title}</h2>
                  <div className="w-8 h-1 bg-ocean rounded-full mb-6" />
                  <p className="text-ink-muted leading-relaxed">{s.lead}</p>
                </div>
                <div className="lg:col-span-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {s.details.map((d) => (
                      <div key={d.label} className="bg-white border border-border-line p-6 rounded-xl">
                        <h3 className="font-bold text-ink mb-3 text-sm">{d.label}</h3>
                        <p className="text-sm text-ink-muted leading-relaxed">{d.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="bg-ink py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            事業についてのご相談はお気軽に
          </h2>
          <p className="text-white/80 mb-8">
            連携・協力のご相談、活動支援のご依頼など、まずはお話をお聞かせください。
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-white text-ink font-bold text-sm px-8 py-4 rounded-full hover:bg-paper transition-colors"
          >
            お問い合わせ →
          </Link>
        </div>
      </section>
    </div>
  );
}
