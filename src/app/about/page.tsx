import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "センターについて",
  description: "玉野SDGsみらいづくりセンターの理念・事業内容・役員名簿・沿革・入会情報をご紹介します。",
};

const members = [
  { role: "理事長", name: "東 りえ" },
  { role: "副理事長", name: "内尾 玲" },
  { role: "副理事長", name: "西田井 祐也" },
  { role: "理事", name: "小川 孝雄" },
  { role: "理事", name: "山本 和子" },
  { role: "理事", name: "土井 清香" },
  { role: "理事", name: "安原 賢一" },
  { role: "理事", name: "妹尾 恵美" },
  { role: "理事", name: "松岡 康弘" },
  { role: "理事", name: "石東 丈典" },
  { role: "監事", name: "加藤 珪一" },
  { role: "監事", name: "池上 茂" },
];

const timeline = [
  { year: "2011", title: "協働のまちづくり基本条例の制定", desc: "玉野市が協働のまちづくり基本条例を制定。推進委員会が設置され、中間支援組織の必要性が議論されはじめる。" },
  { year: "2015", title: "3ヶ年行動計画の策定", desc: "「市民と市をつなぐ中間支援組織」と「人材育成」を重視した3ヶ年行動計画を策定。" },
  { year: "2020", title: "非営利団体として設立", desc: "地域の課題解決と住み続けたいまちづくりを目指し、有志が集まり設立。市内4高校914名へのアンケート調査も実施。" },
  { year: "2021", title: "高校生提言事業スタート", desc: "「2030 私ならこんな町にしたい・玉野」をテーマに高校生提言事業を実施。SDGs勉強会3回シリーズも開催。" },
  { year: "2022", title: "伴走支援・調査事業を拡充", desc: "高校生提言【計画編】実施。地区社会福祉協議会7箇所の調査・フォローアップ事業を受託。" },
  { year: "2023", title: "地域交流祭の開催", desc: "高校生提言【実践編】として地域交流祭を開催（参加者91名）。市民センター支援員調査を実施。" },
  { year: "2024", title: "NPO法人として認証", desc: "2024年3月21日、特定非営利活動法人として認証取得。活動基盤をさらに強化。" },
];

const businesses = [
  {
    number: "01",
    title: "地域づくり連携事業",
    desc: "玉野市から委託を受け、地域活動連携センター事業を実施。集落点検・相談伴走・人材育成・情報発信の4つの柱で地域をサポートします。",
    items: ["地域活動連携事業（集落点検チェックシート作成・地域間交流会）", "相談・伴走支援（地縁・目的型団体支援、補助金活用団体フォローアップ）", "人材育成事業（高校生×まちづくり協働）", "情報発信事業"],
  },
  {
    number: "02",
    title: "団体基盤整備事業",
    desc: "講師派遣・法人情報発信・他団体向け有償情報事業を通じて、NPO・地域団体の組織基盤強化を支援します。",
    items: ["講師派遣事業", "法人の情報発信事業", "他団体向け有償情報提供"],
  },
  {
    number: "03",
    title: "調査・政策提言事業",
    desc: "県内外の中間支援組織と連携し、市民サービス向上に必要な事項を調査・研究して行政に提言します。",
    items: ["中間支援組織間の情報交換・連携", "地域課題の調査・研究", "行政への政策提言"],
  },
  {
    number: "04",
    title: "公共施設の有効活用推進事業",
    desc: "市民センターや未活用の公共施設について、住民ニーズ調査を実施し、より有効な活用方法を検討・提案します。",
    items: ["市民センターの在り方調査", "未活用公共施設の活用方法の検討", "住民ニーズヒアリング"],
  },
];

const membershipTypes = [
  { type: "個人正会員", fee: "3,000円／年", note: "議決権あり" },
  { type: "団体正会員", fee: "5,000円／年", note: "議決権あり" },
  { type: "個人賛助会員", fee: "2,000円／年（1口）", note: "" },
  { type: "団体賛助会員", fee: "3,000円／年（1口）", note: "" },
  { type: "団体連携会員", fee: "無料", note: "" },
  { type: "ユース会員", fee: "無料", note: "学生・若者向け" },
];

export default function AboutPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="bg-forest py-20">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="section-label text-white/40 mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-white/70 transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-white/60">ABOUT</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">センターについて</h1>
          <p className="text-white/80 text-base max-w-xl leading-relaxed">
            玉野SDGsみらいづくりセンターの理念・事業・役員・沿革・入会情報をご紹介します。
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            {[
              { href: "#business", label: "事業内容" },
              { href: "#team", label: "役員名簿" },
              { href: "#history", label: "沿革" },
              { href: "#overview", label: "法人概要" },
              { href: "#membership", label: "入会・寄付" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="section-label text-white/70 hover:text-white border border-white/20 hover:border-white/40 px-4 py-2 rounded-full transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mission */}
      <section className="bg-paper py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="section-label text-ink-muted mb-4">MISSION</p>
            <h2 className="text-2xl font-bold text-ink mb-6">地域の魅力を伝え、「つなぐ」お手伝いをする</h2>
            <p className="text-ink-muted leading-relaxed mb-4">
              玉野市は、瀬戸内海に面した豊かな自然と、造船業で栄えた歴史を持つまちです。
              しかし今、人口減少・少子高齢化という大きな波に直面しています。
            </p>
            <p className="text-ink-muted leading-relaxed mb-4">
              「この町で暮らし、感じてきたことを語り合い、個々の思いを実現していく」——
              そんな場をつくるために、2020年に設立しました。
            </p>
            <p className="text-ink-muted leading-relaxed">
              市民・企業・行政の間に立つ中間支援組織として、地域で活動するあらゆる人・団体のハブとなり、
              住み続けたい・住んでみたい玉野の未来をともにつくっていきます。
            </p>
          </div>
        </div>
      </section>

      {/* Business */}
      <section id="business" className="bg-paper-alt py-16 scroll-mt-14">
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-label text-ink-muted mb-3">BUSINESS</p>
          <h2 className="text-2xl font-bold text-ink mb-10">事業内容</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {businesses.map((b) => (
              <div key={b.number} className="bg-white border border-border-line rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="section-label text-forest/40 text-lg font-black">{b.number}</span>
                  <h3 className="text-base font-bold text-ink">{b.title}</h3>
                </div>
                <p className="text-sm text-ink-muted leading-relaxed mb-4">{b.desc}</p>
                <ul className="space-y-1.5">
                  {b.items.map((item) => (
                    <li key={item} className="text-sm text-ink-muted flex items-start gap-2">
                      <span className="text-forest mt-1 shrink-0">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="bg-paper py-16 scroll-mt-14">
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-label text-ink-muted mb-3">TEAM</p>
          <h2 className="text-2xl font-bold text-ink mb-10">役員名簿</h2>
          <div className="max-w-2xl">
            <table className="w-full text-sm border-t border-border-line">
              <tbody className="divide-y divide-border-line">
                {members.map((m) => (
                  <tr key={m.name + m.role}>
                    <td className="py-4 pr-8 section-label text-ink-muted w-1/3 whitespace-nowrap">{m.role}</td>
                    <td className="py-4 font-medium text-ink">{m.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* History */}
      <section id="history" className="bg-paper-alt py-16 scroll-mt-14">
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-label text-ink-muted mb-3">HISTORY</p>
          <h2 className="text-2xl font-bold text-ink mb-10">沿革</h2>
          <div className="max-w-3xl">
            <div className="space-y-0 divide-y divide-border-line border-t border-border-line">
              {timeline.map((t) => (
                <div key={t.year} className="grid grid-cols-12 gap-6 py-6">
                  <div className="col-span-2">
                    <span className="text-sm font-bold text-forest">{t.year}</span>
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

      {/* Overview */}
      <section id="overview" className="bg-paper py-16 scroll-mt-14">
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-label text-ink-muted mb-3">OVERVIEW</p>
          <h2 className="text-2xl font-bold text-ink mb-10">法人概要</h2>
          <div className="max-w-2xl">
            <table className="w-full text-sm border-t border-border-line">
              <tbody className="divide-y divide-border-line">
                {[
                  ["法人名", "特定非営利活動法人 玉野SDGsみらいづくりセンター"],
                  ["設立", "2024年3月21日（前身団体は2020年5月設立）"],
                  ["所在地", "〒706-0142 岡山県玉野市迫間2252番地３"],
                  ["TEL", "090-1356-3655"],
                  ["Email", "info@npo-tamano-mirai.com"],
                  ["営業時間", "平日 9:00〜18:00（土日祝日は定休）"],
                  ["主要取引銀行", "中国銀行・トマト銀行"],
                  ["役員数", "12名"],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <td className="py-5 pr-8 section-label text-ink-muted w-1/3 whitespace-nowrap align-top">{label}</td>
                    <td className="py-5 text-ink-soft">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Membership */}
      <section id="membership" className="bg-forest py-16 scroll-mt-14">
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-label text-white/50 mb-3">MEMBERSHIP</p>
          <h2 className="text-2xl font-bold text-white mb-3">入会・寄付</h2>
          <p className="text-white/75 text-sm leading-relaxed mb-10 max-w-lg">
            会員になることで、センターの活動を支援し、議決権（正会員）や各種情報を得られます。
            どなたでもお気軽にご参加ください。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {membershipTypes.map((m) => (
              <div key={m.type} className="bg-white/10 border border-white/20 rounded-xl p-6">
                <p className="font-bold text-white mb-2">{m.type}</p>
                <p className="text-2xl font-black text-white mb-1">{m.fee}</p>
                {m.note && <p className="text-xs text-white/60">{m.note}</p>}
              </div>
            ))}
          </div>
          <div className="bg-white/10 border border-white/20 rounded-xl p-6 max-w-xl">
            <p className="section-label text-white/60 mb-3">振込先</p>
            <ul className="text-sm text-white/80 space-y-1 leading-relaxed">
              <li>銀行：中国銀行 宇野支店（店番156）</li>
              <li>口座番号：2554341（普通）</li>
              <li>名義：特定非営利活動法人 玉野SDGsみらいづくりセンター 理事長 東りえ</li>
            </ul>
            <p className="text-xs text-white/50 mt-3">
              申込書をメール・FAX・郵送・持参にてご提出のうえ、年会費をお振り込みください。
            </p>
          </div>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center bg-white text-forest font-bold text-sm px-6 py-3 rounded-full hover:bg-paper transition-colors"
            >
              入会申込・お問い合わせ →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
