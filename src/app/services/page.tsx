import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Users, Building2, Lightbulb, Heart, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "事業紹介",
  description: "玉野SDGsみらいづくりセンターが展開する4つの中核事業をご紹介します。",
};

const services = [
  {
    id: "community",
    icon: Users,
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
    color: "from-primary to-primary-light",
  },
  {
    id: "capacity",
    icon: Building2,
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
    color: "from-accent to-accent-light",
  },
  {
    id: "research",
    icon: Lightbulb,
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
    color: "from-amber to-amber-light",
  },
  {
    id: "facilities",
    icon: Heart,
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
    color: "from-purple-600 to-purple-800",
  },
];

export default function ServicesPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="bg-primary py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">ホーム</Link>
            <ChevronRight size={12} />
            <span className="text-white">事業紹介</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">事業紹介</h1>
          <p className="text-slate-300 text-lg max-w-xl leading-relaxed">
            私たちは4つの中核事業を通じて、地域の「つながり」を生み出します。
          </p>
        </div>
      </div>

      {/* Services */}
      <div className="bg-white">
        {services.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            className={`py-20 ${i % 2 === 1 ? "bg-surface" : "bg-white"}`}
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className={`inline-flex items-center gap-3 bg-gradient-to-r ${s.color} text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6`}>
                    <span className="opacity-70">{s.number}</span>
                    <span>{s.subtitle}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">{s.title}</h2>
                  <p className="text-slate-600 text-base leading-relaxed mb-8">{s.lead}</p>
                  <div className="space-y-4">
                    {s.details.map((d) => (
                      <div key={d.label} className="flex gap-4">
                        <div className="shrink-0 mt-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 mb-1">{d.label}</p>
                          <p className="text-sm text-slate-500 leading-relaxed">{d.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className={`rounded-2xl bg-gradient-to-br ${s.color} p-10 flex items-center justify-center aspect-video`}>
                    <div className="text-center text-white">
                      <s.icon size={56} className="mx-auto mb-4 opacity-80" />
                      <p className="text-xl font-bold">{s.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            事業についてのご相談はお気軽に
          </h2>
          <p className="text-slate-300 mb-8">
            連携・協力のご相談、活動支援のご依頼など、まずはお話をお聞かせください。
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-full hover:bg-slate-100 transition-colors"
          >
            お問い合わせ <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
