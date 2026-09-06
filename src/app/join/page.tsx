export const revalidate = 60;

import type { Metadata } from "next";
import Link from "next/link";
import { fetchArticlesByCategory, getArticleUrl } from "@/lib/articles";
import { StaticPageLayout, PageSection, FactList } from "@/components/ArchiveLayout";
import { MEMBERSHIP_TYPES, BANK_ACCOUNT } from "@/lib/membership";
import { formatDate } from "@/lib/format";

/* 入会・寄付。
   以前はページ名が「ボランティア募集」で、フッターの表記（入会・寄付）と
   食い違っていたため、入会・寄付を主にして募集はその中の1ブロックにした。 */

export const metadata: Metadata = {
  title: "入会・寄付",
  description:
    "玉野SDGsみらいづくりセンターの会員制度と寄付のご案内です。会員としてまちづくりを継続的に支えられます。",
};

export default async function JoinPage() {
  const volunteerPosts = await fetchArticlesByCategory("volunteer", 50);

  return (
    <StaticPageLayout
      label="MEMBERSHIP"
      title="入会・寄付"
      description="会員になることで、センターの活動を支援し、議決権（正会員）や各種情報を得られます。どなたでもお気軽にご参加ください。"
    >
      <PageSection label="Fee" title="会員の種類と年会費">
        <div className="rounded border border-border-line">
          {MEMBERSHIP_TYPES.map((m) => (
            <div
              key={m.type}
              className="flex items-baseline gap-3 border-b border-border-line px-3.5 py-3 last:border-b-0"
            >
              <span className="w-[110px] shrink-0 text-[13px] font-bold text-ink">
                {m.type}
              </span>
              <span className="text-[15px] font-bold text-ink">{m.fee}</span>
              {m.note && (
                <span className="text-[11px] text-ink-muted">{m.note}</span>
              )}
            </div>
          ))}
        </div>
        <p className="mt-3 text-[12px] leading-[1.7] text-ink-soft">
          ユース会員（学生・若者）と団体連携会員は無料です。
        </p>
      </PageSection>

      <PageSection label="How to Apply" title="お申し込みとお振り込み">
        <p className="mb-3 text-[13px] leading-[1.8] text-ink-soft">
          申込書をメール・FAX・郵送・持参のいずれかでご提出のうえ、年会費を下記口座へお振り込みください。
        </p>
        <FactList items={BANK_ACCOUNT.map((b) => ({ term: b.term, value: b.value }))} />
        <Link
          href="/contact"
          className="mt-4 block rounded bg-membership py-3 text-center text-[14px] font-bold leading-none text-white hover:opacity-90"
        >
          入会申込・お問い合わせ
        </Link>
      </PageSection>

      <PageSection label="Volunteer" title="ボランティア募集">
        <p className="mb-3 text-[13px] leading-[1.8] text-ink-soft">
          特別なスキルや経験は必要ありません。玉野のまちに関わりたいという気持ちが一番大切です。
        </p>
        {volunteerPosts.length === 0 ? (
          <p className="rounded border border-border-line py-8 text-center text-[13px] text-ink-soft">
            現在、募集中のボランティアはありません。
            <br />
            新しい募集情報はお知らせとInstagramでご案内します。
          </p>
        ) : (
          <div className="divide-y divide-border-line border-t border-border-line">
            {volunteerPosts.map((post) => (
              <Link
                key={post.slug}
                href={getArticleUrl(post)}
                className="card-interactive group -mx-3 block rounded px-3 py-3.5"
              >
                <span className="block text-[12px] leading-tight text-ink-soft">
                  {formatDate(post.date)}
                </span>
                <span className="mt-1.5 block text-[14px] font-bold leading-[1.5] text-ink group-hover:text-ocean sm:text-[15px]">
                  {post.title}
                </span>
                <span className="mt-1.5 block text-[12px] leading-[1.7] text-ink-soft">
                  {post.excerpt}
                </span>
              </Link>
            ))}
          </div>
        )}
        <Link
          href="/contact"
          className="mt-4 block rounded border border-border-line py-3 text-center text-[14px] font-bold text-ink hover:bg-[rgba(34,34,34,.05)]"
        >
          参加について相談する
        </Link>
      </PageSection>
    </StaticPageLayout>
  );
}
