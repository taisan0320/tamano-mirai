import Link from "next/link";
import {
  ArrowRight,
  Users,
  Building2,
  Lightbulb,
  Heart,
  BookOpen,
  Coffee,
  Presentation,
  GraduationCap,
  ChevronRight,
} from "lucide-react";
import { getLatestArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

const stats = [
  { value: "10年+", label: "地域支援の実績" },
  { value: "200+", label: "支援・連携団体数" },
  { value: "4つ", label: "の中核事業" },
  { value: "3市区", label: "での活動実績" },
];

const services = [
  {
    icon: Users,
    title: "地域づくり連携事業",
    desc: "市民・団体・行政をつなぐ中間支援。相談・伴走支援から人材育成まで、地域活動を包括的にサポートします。",
  },
  {
    icon: Building2,
    title: "団体基盤整備事業",
    desc: "NPOや市民団体の組織基盤強化を支援。講師派遣や情報発信など、持続可能な活動運営を後押しします。",
  },
  {
    icon: Lightbulb,
    title: "調査・政策提言事業",
    desc: "市民ニーズの調査・分析をもとに行政への提言を実施。データに基づいた地域課題解決を推進します。",
  },
  {
    icon: Heart,
    title: "公共施設有効活用事業",
    desc: "遊休・未活用の公共施設の活用方法を検討・提案。地域資源の最大化を目指します。",
  },
];

const programs = [
  {
    icon: GraduationCap,
    name: "ゼロイチラボ",
    tagline: "高校生のまちへの想いをカタチに",
    desc: "全7回の実践型探究プログラム。地域課題を発見し、アイデアを実現するプロセスを体験します。",
  },
  {
    icon: BookOpen,
    name: "いどばた講座",
    tagline: "市民が学び、つながる学習の場",
    desc: "地域活動に必要なスキルやノウハウを学べる市民向け講座。初心者歓迎です。",
  },
  {
    icon: Coffee,
    name: "みらいcafé",
    tagline: "毎月開催の市民交流会",
    desc: "気軽に集い、語り合える定期交流会。地域に関わる人たちの出会いの場として機能しています。",
  },
  {
    icon: Presentation,
    name: "セミナー・講演会",
    tagline: "専門家を招いた実践的な学び",
    desc: "SNS活用・まちづくり・組織運営など、地域活動に役立つテーマで開催しています。",
  },
];

export default function Home() {
  const latestArticles = getLatestArticles(3);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(21,128,61,0.25),_transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(38,84,160,0.3),_transparent_60%)]" />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-block text-accent-light text-sm font-semibold tracking-widest uppercase mb-6 border border-accent-light/30 rounded-full px-3 py-1">
              岡山県玉野市 × NPO × SDGs
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              「つながり」
              <br />
              <span className="text-accent-light">ながら、</span>
              <br />
              住み続けたい町へ。
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-10 max-w-xl">
              玉野SDGsみらいづくりセンターは、市民・企業・行政をつなぐ中間支援NPOです。
              地域課題の解決と、誰もが主役になれるまちづくりを支援します。
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary font-bold px-7 py-3.5 rounded-full hover:bg-slate-100 transition-colors"
              >
                私たちについて <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-white/10 transition-colors"
              >
                相談・お問い合わせ
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40">
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-white/20 animate-pulse" />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl font-bold text-primary mb-1">{s.value}</p>
                <p className="text-sm text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-surface py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-subheading text-accent mb-3">Mission</p>
            <h2 className="section-heading text-primary mb-6">
              地域の魅力を伝え「つなぐ」お手伝いを
            </h2>
            <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
              玉野市で暮らし、感じてきたことを語り合い、個々の思いを実現していくためのまちづくり。
              私たちは「誰一人取り残さない」包摂的な地域づくりを目指し、
              市民・企業・行政のあいだに立って、人と人、人と資源をつなぎます。
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 mt-8 text-sm font-semibold text-primary hover:underline"
            >
              詳しく見る <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="section-subheading text-accent mb-3">Services</p>
            <h2 className="section-heading text-primary">4つの中核事業</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="bg-surface rounded-2xl p-6 border border-border hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <s.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              事業の詳細を見る <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="bg-primary py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-12 text-center">
            <p className="section-subheading text-accent-light mb-3">Programs</p>
            <h2 className="section-heading text-white">主なプログラム</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {programs.map((p) => (
              <div
                key={p.name}
                className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                  <p.icon size={20} className="text-white" />
                </div>
                <h3 className="font-bold text-white mb-1">{p.name}</h3>
                <p className="text-xs text-accent-light font-medium mb-3">{p.tagline}</p>
                <p className="text-sm text-slate-300 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 bg-white text-primary font-semibold text-sm px-6 py-3 rounded-full hover:bg-slate-100 transition-colors"
            >
              プログラム一覧 <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="section-subheading text-accent mb-2">News & Media</p>
              <h2 className="section-heading text-primary">最新情報</h2>
            </div>
            <Link
              href="/media"
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              すべて見る <ChevronRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link
              href="/media"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              すべて見る <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            一緒に、玉野の未来をつくりませんか？
          </h2>
          <p className="text-green-100 text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            活動への参加・協力・ご相談など、お気軽にお問い合わせください。
            どんな小さな一歩も大切にします。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-accent font-bold px-8 py-4 rounded-full hover:bg-slate-100 transition-colors"
            >
              お問い合わせ・ご相談 <ArrowRight size={16} />
            </Link>
            <Link
              href="/media"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-colors"
            >
              活動を見る
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
