import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StaticPageLayout, PageSection, FactList } from "@/components/ArchiveLayout";
import { ORGANIZATION_FACTS } from "@/lib/organization";
import { MEMBERSHIP_TYPES } from "@/lib/membership";

/* センターについて（ハブ）。
   事業内容・役員名簿・沿革はそれぞれ独立ページに分けた。
   ここには理事長メッセージ・法人概要・入会案内を残している。 */

export const metadata: Metadata = {
  title: "センターについて",
  description:
    "玉野SDGsみらいづくりセンターの理念・法人概要・入会案内です。事業内容・役員名簿・沿革は各ページでご覧いただけます。",
};

const CONTENTS = [
  {
    href: "/services",
    label: "事業内容",
    text: "地域づくり連携・団体基盤整備・調査政策提言・公共施設の有効活用の4つの事業。",
  },
  {
    href: "/members",
    label: "役員名簿・講演のご依頼",
    text: "理事長・副理事長ほか14名の役員と、講演・ファシリテーターのご依頼について。",
  },
  {
    href: "/history",
    label: "沿革",
    text: "2011年の協働のまちづくり基本条例から、2024年のNPO法人認証まで。",
  },
  {
    href: "/documents",
    label: "資料・報告書",
    text: "調査報告書・機関誌・定款・決算書などを公開しています。",
  },
];

export default function AboutPage() {
  return (
    <StaticPageLayout
      label="ABOUT"
      title="センターについて"
      description="市民・団体・企業・行政をつなぎ、相談・伴走・情報発信で、地域の活動を支える中間支援NPOです。"
    >
      <PageSection label="Message" title="理事長からのご挨拶">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start">
          <div className="prose-article !mt-0">
            <p>
              私たちが住む自然豊かな玉野には、穏やかな瀬戸内の海と山、そしてこれまでこの町を支えてこられた人や、
              これからを支えていく人たちが尊重し暮らしています。
            </p>
            <p>
              任意団体「みらい」は、2020年から、この町で暮らし、感じてきたことを語り合い、
              個々の思いを実現していくためのまちづくりを支えるために設立をしました。
            </p>
            <p>
              2024年からは、特定非営利活動法人として、さらに行政、企業とも連携を取りながら
              「温故知新」色々な世代の方々と未来に向けた話し合いを行い、
              夢を応援してくれる町、各々の強みを生かし目指していきたいと考えております。
            </p>
            <p>これからもどうぞよろしくお願いします。</p>
            <p className="text-right font-bold">理事長　東りえ</p>
          </div>
          <figure className="max-w-[220px]">
            <div className="relative aspect-[4/5] overflow-hidden rounded border border-border-line bg-paper-deep">
              <Image
                src="/speaker-azuma.jpg"
                alt="玉野SDGsみらいづくりセンター 理事長 東りえ"
                fill
                sizes="220px"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="mt-2.5">
              <p className="text-[13px] font-bold leading-tight text-ink">東 りえ</p>
              <p className="mt-1 text-[12px] leading-[1.6] text-ink-soft">
                理事長／総務省 地域力創造アドバイザー
              </p>
            </figcaption>
          </figure>
        </div>
      </PageSection>

      <PageSection label="Contents" title="センターの情報">
        <div className="divide-y divide-border-line border-t border-border-line">
          {CONTENTS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="card-interactive group -mx-3 block rounded px-3 py-3.5"
            >
              <span className="block text-[14px] font-bold leading-tight text-ink group-hover:text-ocean">
                {item.label} →
              </span>
              <span className="mt-1.5 block text-[12px] leading-[1.7] text-ink-soft">
                {item.text}
              </span>
            </Link>
          ))}
        </div>
      </PageSection>

      <PageSection label="Overview" title="法人概要" id="overview">
        <FactList items={ORGANIZATION_FACTS} />
      </PageSection>

      <PageSection label="Membership" title="入会・寄付" id="membership">
        <p className="mb-3 text-[13px] leading-[1.8] text-ink-soft">
          会員になることで、センターの活動を支援し、議決権（正会員）や各種情報を得られます。
          ユース会員（学生・若者）と団体連携会員は無料です。
        </p>
        <div className="rounded border border-border-line">
          {MEMBERSHIP_TYPES.slice(0, 2).map((m) => (
            <div
              key={m.type}
              className="flex items-baseline gap-3 border-b border-border-line px-3.5 py-3 last:border-b-0"
            >
              <span className="w-[110px] shrink-0 text-[13px] font-bold text-ink">
                {m.type}
              </span>
              <span className="text-[15px] font-bold text-ink">{m.fee}</span>
              {m.note && <span className="text-[11px] text-ink-muted">{m.note}</span>}
            </div>
          ))}
        </div>
        <Link
          href="/join"
          className="mt-4 block rounded bg-membership py-3 text-center text-[14px] font-bold leading-none text-white hover:opacity-90"
        >
          入会・寄付のご案内を見る
        </Link>
      </PageSection>
    </StaticPageLayout>
  );
}
