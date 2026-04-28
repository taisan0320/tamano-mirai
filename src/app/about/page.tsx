import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "私たちについて",
  description:
    "玉野SDGsみらいづくりセンターの理念・ビジョン・設立経緯・役員についてご紹介します。",
};

const values = [
  {
    title: "ミッション",
    body: "地域の魅力を伝え「つなぐ」お手伝いをする。市民・企業・行政の間に立ち、地域課題の解決を支援します。",
  },
  {
    title: "ビジョン",
    body: "「つながり」ながら、住み続けたい・住んでみたい町を実現する。誰一人取り残さない包摂的な地域社会を目指します。",
  },
  {
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
      <div className="bg-ink py-20">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="section-label text-white/40 mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-white/70 transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-white/60">ABOUT</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">私たちについて</h1>
          <p className="text-white/80 text-base max-w-xl leading-relaxed">
            玉野SDGsみらいづくりセンターの理念、設立の経緯、スタッフ・役員をご紹介します。
          </p>
        </div>
      </div>

      {/* Mission / Vision / Value */}
      <section id="vision" className="bg-paper py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <p className="section-label text-ink-muted mb-3">PHILOSOPHY</p>
            <h2 className="text-2xl font-bold text-ink">理念・ビジョン・バリュー</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white border border-border-line p-8 rounded-xl">
                <h3 className="text-lg font-bold text-ocean mb-4 pb-4 border-b border-border-line">{v.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Message from Founder */}
      <section className="bg-paper-alt py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-3">
              <p className="section-label text-ink-muted mb-3">MESSAGE</p>
              <h2 className="text-xl font-bold text-ink">代表からの<br />メッセージ</h2>
            </div>
            <div className="md:col-span-9">
              <div className="border-l-4 border-ocean pl-8">
                <blockquote className="text-ink-soft leading-loose text-base">
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
                <div className="mt-8 pt-6 border-t border-border-line">
                  <p className="font-bold text-ink">理事長　（代表者名）</p>
                  <p className="text-sm text-ink-muted">特定非営利活動法人 玉野SDGsみらいづくりセンター</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="bg-paper py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <p className="section-label text-ink-muted mb-3">HISTORY</p>
            <h2 className="text-2xl font-bold text-ink">活動のあゆみ</h2>
          </div>
          <div className="max-w-3xl">
            <div className="space-y-0 divide-y divide-border-line border-t border-border-line">
              {timeline.map((t) => (
                <div key={t.year} className="grid grid-cols-12 gap-6 py-6">
                  <div className="col-span-2">
                    <span className="text-sm font-bold text-ocean">{t.year}</span>
                  </div>
                  <div className="col-span-10">
                    <h3 className="font-bold text-ink mb-1">{t.title}</h3>
                    <p className="text-sm text-ink-muted leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="bg-paper-alt py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <p className="section-label text-ink-muted mb-3">TEAM</p>
            <h2 className="text-2xl font-bold text-ink">役員・スタッフ</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {members.map((m) => (
              <div key={m.role + m.name} className="bg-white border border-border-line p-6 rounded-xl">
                <div className="w-12 h-12 bg-ocean-pale border border-ocean/20 rounded-full mb-4 flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <p className="section-label text-ocean mb-1">{m.role}</p>
                <p className="text-sm font-bold text-ink mb-1">{m.name}</p>
                <p className="text-xs text-ink-muted leading-snug">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organization Info */}
      <section className="bg-paper py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="section-label text-ink-muted mb-3">OVERVIEW</p>
            <h2 className="text-2xl font-bold text-ink mb-10">団体概要</h2>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-border-line">
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
                    <td className="py-5 pr-8 text-ink-muted font-medium whitespace-nowrap w-1/3 section-label">{label}</td>
                    <td className="py-5 text-ink-soft">{value}</td>
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
