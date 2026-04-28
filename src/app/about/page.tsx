import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Target, Eye, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "私たちについて",
  description:
    "玉野SDGsみらいづくりセンターの理念・ビジョン・設立経緯・役員についてご紹介します。",
};

const values = [
  {
    icon: Target,
    title: "ミッション",
    body: "地域の魅力を伝え「つなぐ」お手伝いをする。市民・企業・行政の間に立ち、地域課題の解決を支援します。",
  },
  {
    icon: Eye,
    title: "ビジョン",
    body: "「つながり」ながら、住み続けたい・住んでみたい町を実現する。誰一人取り残さない包摂的な地域社会を目指します。",
  },
  {
    icon: Heart,
    title: "バリュー",
    body: "対話・共創・継続。地域で暮らす人々の思いを丁寧に聴き、一人ひとりの力を引き出すことを大切にします。",
  },
];

const timeline = [
  {
    year: "2014",
    title: "任意団体として活動開始",
    desc: "玉野市内の有志が集まり、地域課題解決の場づくりをスタート。",
  },
  {
    year: "2016",
    title: "NPO法人設立",
    desc: "特定非営利活動法人として認証を取得。活動を本格化。",
  },
  {
    year: "2018",
    title: "玉野地域づくり連携センター運営受託",
    desc: "玉野市より中間支援施設の運営を受託し、拠点機能を強化。",
  },
  {
    year: "2020",
    title: "ゼロイチラボ開始",
    desc: "高校生向け実践型探究プログラムを開発・実施。",
  },
  {
    year: "2023",
    title: "SDGs推進事業を拡充",
    desc: "企業・行政との連携プロジェクトを強化し、活動領域を拡大。",
  },
];

const members = [
  { role: "理事長", name: "（代表者名）", desc: "玉野市生まれ。地域活動歴20年。" },
  { role: "副理事長", name: "（副代表名）", desc: "NPO経営・組織支援を専門とする。" },
  { role: "理事", name: "（理事名）", desc: "地域教育・学習支援を担当。" },
  { role: "理事", name: "（理事名）", desc: "企業連携・事業開発を担当。" },
  { role: "監事", name: "（監事名）", desc: "財務・会計監査を担当。" },
];

export default function AboutPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="bg-primary py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">ホーム</Link>
            <ChevronRight size={12} />
            <span className="text-white">私たちについて</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">私たちについて</h1>
          <p className="text-slate-300 text-lg max-w-xl leading-relaxed">
            玉野SDGsみらいづくりセンターの理念、設立の経緯、スタッフ・役員をご紹介します。
          </p>
        </div>
      </div>

      {/* Mission / Vision / Value */}
      <section id="vision" className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="section-subheading text-accent mb-3">Philosophy</p>
            <h2 className="section-heading text-primary">理念・ビジョン・バリュー</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-surface rounded-2xl p-8 border border-border text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <v.icon size={26} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">{v.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Message from Founder */}
      <section className="bg-surface py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <p className="section-subheading text-accent mb-3">Message</p>
            <h2 className="section-heading text-primary mb-8">代表からのメッセージ</h2>
            <div className="bg-white rounded-2xl p-8 sm:p-12 border border-border">
              <blockquote className="text-slate-700 leading-loose text-base sm:text-lg">
                <p className="mb-5">
                  玉野市は、海と山に囲まれた豊かな自然と、造船業で栄えてきた歴史ある地域です。
                  しかし今、人口減少・少子高齢化・産業の変化という大きな波に直面しています。
                </p>
                <p className="mb-5">
                  「この町で生きていくことが誇り」——そう思える地域を守り、次の世代につなぎたい。
                  その思いからNPOを立ち上げました。
                </p>
                <p>
                  私たちは大きな力を持つ組織ではありませんが、人と人をつなぎ、
                  小さな変化を積み重ねることで、確かに地域は変わっていくと信じています。
                  ぜひ、一緒に玉野の未来をつくっていきましょう。
                </p>
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <p className="font-bold text-slate-800">理事長 （代表者名）</p>
                  <p className="text-sm text-slate-500">特定非営利活動法人 玉野SDGsみらいづくりセンター</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="section-subheading text-accent mb-3">History</p>
            <h2 className="section-heading text-primary">活動のあゆみ</h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute left-16 top-0 bottom-0 w-px bg-border" />
              <div className="space-y-8">
                {timeline.map((t) => (
                  <div key={t.year} className="flex gap-6 relative">
                    <div className="shrink-0 w-14 text-right">
                      <span className="text-sm font-bold text-primary">{t.year}</span>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-accent border-2 border-white" />
                    </div>
                    <div className="pb-1">
                      <h3 className="font-bold text-slate-800 mb-1">{t.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="bg-surface py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="section-subheading text-accent mb-3">Team</p>
            <h2 className="section-heading text-primary">役員・スタッフ</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 max-w-4xl mx-auto">
            {members.map((m) => (
              <div key={m.role + m.name} className="bg-white rounded-2xl p-5 border border-border text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">👤</span>
                </div>
                <p className="text-[11px] font-semibold text-accent mb-1">{m.role}</p>
                <p className="text-sm font-bold text-slate-800 mb-1">{m.name}</p>
                <p className="text-[11px] text-slate-500 leading-snug">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organization Info */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <p className="section-subheading text-accent mb-3">Overview</p>
            <h2 className="section-heading text-primary mb-8">団体概要</h2>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-border">
                {[
                  ["法人名", "特定非営利活動法人 玉野SDGsみらいづくりセンター"],
                  ["設立", "2016年"],
                  ["所在地", "〒706-0142 岡山県玉野市迫間2252番地３"],
                  ["TEL", "090-1356-3655"],
                  ["Email", "info@npo-tamano-mirai.com"],
                  ["事業区域", "玉野市およびその周辺地域"],
                  ["主な認証・連携", "岡山県NPO活動促進室登録・玉野市協働パートナー"],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <td className="py-4 pr-6 text-slate-500 font-medium whitespace-nowrap w-1/3">{label}</td>
                    <td className="py-4 text-slate-700">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
