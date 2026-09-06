export const revalidate = 60;

import type { Metadata } from "next";
import Link from "next/link";
import { fetchArticlesByCategory, getArticleUrl } from "@/lib/articles";
import { StaticPageLayout, PageSection, FactList } from "@/components/ArchiveLayout";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "参加できるプログラム",
  description:
    "市民のみなさんが参加できる、玉野SDGsみらいづくりセンターの常設プログラムです。",
};

const programs = [
  {
    id: "zerochi",
    name: "ゼロイチラボ",
    tagline: "高校生のまちへの想いをカタチに",
    target: "玉野市内に在住・通学する高校生",
    period: "5月〜11月（全7回）",
    fee: "無料",
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
    name: "いどばた講座",
    tagline: "市民が学び、つながる学習の場",
    target: "地域活動に関心のある市民（経験不問）",
    period: "年間複数回開催",
    fee: "一部有料（詳細は各回の告知をご確認ください）",
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
    name: "みらいcafé",
    tagline: "毎月開催の市民交流会",
    target: "玉野市・近隣市町に在住・在勤の方どなたでも",
    period: "毎月1回（土曜日午後）",
    fee: "無料",
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
    name: "セミナー・講演会",
    tagline: "専門家を招いた実践的な学び",
    target: "NPO・自治会・企業担当者など",
    period: "不定期（年間4〜6回程度）",
    fee: "テーマにより異なります",
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

export default async function ProgramsPage() {
  const exploreArticles = await fetchArticlesByCategory("explore", 6);

  return (
    <StaticPageLayout
      label="PROGRAMS"
      title="参加できるプログラム"
      description="市民のみなさんが参加できる常設のプログラムです。学校の授業の記録は「学校と、つくる。」にまとめています。"
    >
      {programs.map((program) => (
        <PageSection
          key={program.id}
          id={program.id}
          label={program.tagline}
          title={program.name}
        >
          <p className="whitespace-pre-line text-[13px] leading-[1.9] text-ink-soft">
            {program.desc}
          </p>

          <div className="my-4">
            <FactList
              items={[
                { term: "対象", value: program.target },
                { term: "開催時期", value: program.period },
                { term: "参加費", value: program.fee },
              ]}
            />
          </div>

          <p className="mb-2 text-[10px] leading-tight tracking-[.12em] text-ink-muted">
            FLOW / プログラムの流れ
          </p>
          <div className="divide-y divide-border-line border-t border-border-line">
            {program.flow.map((step) => (
              <div key={step.step} className="flex gap-3 py-3">
                <span className="w-7 shrink-0 text-[13px] font-bold leading-tight text-ocean">
                  {step.step}
                </span>
                <div className="min-w-0">
                  <p className="text-[14px] font-bold leading-tight text-ink">
                    {step.title}
                  </p>
                  <p className="mt-1 text-[12px] leading-[1.7] text-ink-soft">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/contact"
            className="mt-4 block rounded border border-border-line py-3 text-center text-[14px] font-bold text-ink hover:bg-[rgba(34,34,34,.05)]"
          >
            参加・申込みを相談する
          </Link>
        </PageSection>
      ))}

      {exploreArticles.length > 0 && (
        <PageSection label="Reports" title="探究学習・連携レポート">
          <div className="divide-y divide-border-line border-t border-border-line">
            {exploreArticles.map((article) => (
              <Link
                key={article.slug}
                href={getArticleUrl(article)}
                className="card-interactive group -mx-3 block rounded px-3 py-3"
              >
                <span className="block text-[12px] leading-tight text-ink-soft">
                  {formatDate(article.date)}
                </span>
                <span className="mt-1.5 block text-[14px] font-bold leading-[1.5] text-ink group-hover:text-ocean">
                  {article.title}
                </span>
              </Link>
            ))}
          </div>
        </PageSection>
      )}
    </StaticPageLayout>
  );
}
