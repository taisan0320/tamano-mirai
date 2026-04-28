import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, GraduationCap, BookOpen, Coffee, Presentation, ArrowRight, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "プログラム",
  description: "玉野SDGsみらいづくりセンターが実施するプログラム・講座のご案内です。",
};

const programs = [
  {
    id: "zerochi",
    icon: GraduationCap,
    name: "ゼロイチラボ",
    tagline: "高校生のまちへの想いをカタチに",
    target: "玉野市内に在住・通学する高校生",
    period: "5月〜11月（全7回）",
    fee: "無料",
    color: "bg-accent",
    desc: `玉野市の高校生を対象にした実践型探究プログラムです。
地域課題の発見・分析から、解決アイデアの立案・実践・発表まで、
一連のプロセスを体験します。

地域で活躍する社会人メンターのサポートのもと、
「自分にもできる」という自信と、地域への当事者意識を育てます。`,
    flow: [
      { step: "01", title: "地域を知る", desc: "フィールドワークで玉野市の魅力と課題を発見" },
      { step: "02", title: "課題を掘り下げる", desc: "データ・ヒアリングで課題を深く分析" },
      { step: "03", title: "アイデアを考える", desc: "デザイン思考を使ってアイデアを発想" },
      { step: "04", title: "実践してみる", desc: "小さくてもリアルな実践にチャレンジ" },
      { step: "05", title: "振り返る・発表", desc: "学びを言語化し、市民・行政に発表" },
    ],
  },
  {
    id: "idobata",
    icon: BookOpen,
    name: "いどばた講座",
    tagline: "市民が学び、つながる学習の場",
    target: "地域活動に関心のある市民（経験不問）",
    period: "年間複数回開催",
    fee: "一部有料（詳細は各回の告知をご確認ください）",
    color: "bg-amber",
    desc: `地域活動に必要なスキルや知識を学べる市民向け講座です。
テーマに合わせて専門家や実践者を招き、
インプットとワークショップを組み合わせた内容で行います。

「何か地域のために動きたいが、どこから始めればいいかわからない」
という方の第一歩に最適な場です。`,
    flow: [
      { step: "01", title: "テーマ設定", desc: "市民ニーズをもとに毎回テーマを設定" },
      { step: "02", title: "講義・インプット", desc: "専門家・実践者によるレクチャー" },
      { step: "03", title: "ワークショップ", desc: "グループで実践的な演習に取り組む" },
      { step: "04", title: "交流・ネットワーキング", desc: "参加者同士のつながりをつくる" },
    ],
  },
  {
    id: "mirai-cafe",
    icon: Coffee,
    name: "みらいcafé",
    tagline: "毎月開催の市民交流会",
    target: "玉野市・近隣市町に在住・在勤の方どなたでも",
    period: "毎月1回（土曜日午後）",
    fee: "無料",
    color: "bg-primary",
    desc: `予約不要・途中参加退出OKの定期交流会です。
毎回ゆるやかなテーマを設定し、参加者それぞれの話を
「聴き合う」場づくりを大切にしています。

地域活動への参加を考えている方から、
すでに活動している団体の方まで幅広く集まります。`,
    flow: [
      { step: "01", title: "自己紹介", desc: "今日ここに来た理由や近況をシェア" },
      { step: "02", title: "テーマトーク", desc: "その日のテーマで対話（30分程度）" },
      { step: "03", title: "フリートーク", desc: "興味が合う人と自由に交流" },
    ],
  },
  {
    id: "seminar",
    icon: Presentation,
    name: "セミナー・講演会",
    tagline: "専門家を招いた実践的な学び",
    target: "NPO・自治会・企業担当者など",
    period: "不定期（年間4〜6回程度）",
    fee: "テーマにより異なります",
    color: "bg-purple-700",
    desc: `地域活動・NPO運営・まちづくりに役立つテーマで、
外部の専門家を招いた講演会・セミナーを開催します。

過去のテーマ例：SNSを使った広報術、助成金申請のコツ、
ファシリテーション入門、SDGsとまちづくりの接続など。`,
    flow: [
      { step: "01", title: "講演・プレゼン", desc: "専門家による知識・経験の共有（60〜90分）" },
      { step: "02", title: "質疑応答", desc: "参加者からの質問タイム" },
      { step: "03", title: "交流タイム", desc: "参加者同士・講師との意見交換" },
    ],
  },
];

export default function ProgramsPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="bg-primary py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">ホーム</Link>
            <ChevronRight size={12} />
            <span className="text-white">プログラム</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">プログラム</h1>
          <p className="text-slate-300 text-lg max-w-xl leading-relaxed">
            市民・高校生・団体向けに多様なプログラムを提供しています。
          </p>
        </div>
      </div>

      {/* Program List */}
      {programs.map((p, i) => (
        <section
          key={p.id}
          id={p.id}
          className={`py-20 ${i % 2 === 0 ? "bg-white" : "bg-surface"}`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Info */}
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className={`inline-flex items-center gap-2 ${p.color} text-white text-sm font-bold px-4 py-1.5 rounded-full mb-5`}>
                  <p.icon size={15} />
                  {p.name}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">{p.name}</h2>
                <p className="text-accent font-semibold text-sm mb-5">{p.tagline}</p>
                <p className="text-slate-600 leading-loose whitespace-pre-line mb-8">{p.desc}</p>

                <div className="bg-surface rounded-xl p-5 space-y-3 border border-border">
                  {[
                    { label: "対象", value: p.target, icon: "👥" },
                    { label: "開催時期", value: p.period, icon: "📅" },
                    { label: "参加費", value: p.fee, icon: "💰" },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-3 text-sm">
                      <span>{item.icon}</span>
                      <span className="text-slate-500 w-20 shrink-0">{item.label}</span>
                      <span className="text-slate-700 font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-primary text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-primary-light transition-colors"
                  >
                    参加・申込みを相談する <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Flow */}
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-5">
                  プログラムの流れ
                </h3>
                <div className="space-y-3">
                  {p.flow.map((f) => (
                    <div key={f.step} className="flex gap-4 items-start bg-white rounded-xl p-4 border border-border">
                      <div className={`shrink-0 w-8 h-8 rounded-lg ${p.color} flex items-center justify-center`}>
                        <span className="text-white text-xs font-bold">{f.step}</span>
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm mb-0.5">{f.title}</p>
                        <p className="text-sm text-slate-500">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <Calendar size={32} className="text-accent-light mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            次回の開催情報はSNS・ニュースでお知らせします
          </h2>
          <p className="text-slate-300 mb-8">
            最新情報はInstagram・Facebookで随時発信しています。フォローしてお待ちください。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/media"
              className="inline-flex items-center gap-2 bg-white text-primary font-semibold text-sm px-6 py-3 rounded-full hover:bg-slate-100 transition-colors"
            >
              最新イベント情報を見る <ArrowRight size={14} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              個別相談・お問い合わせ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
