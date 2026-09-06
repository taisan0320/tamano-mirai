import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  fetchInterviewBySlug,
  fetchAllInterviews,
  fetchAllInterviewSlugs,
} from "@/lib/interviews";
import { fetchLatestArticles } from "@/lib/articles";
import { Avatar } from "@/components/ui";
import { formatDate, readingMinutes } from "@/lib/format";
import CopyLinkButton from "@/components/CopyLinkButton";
import { PickupCard, MembershipCard, FollowCard } from "@/components/Sidebar";

export const revalidate = 60;
export const dynamicParams = true;

const BASE_URL = "https://npo-tamano-mirai.com";

export async function generateStaticParams() {
  const slugs = await fetchAllInterviewSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const interview = await fetchInterviewBySlug(slug);
  if (!interview) return { title: "インタビューが見つかりません" };
  return {
    title: `${interview.name}「${interview.catchphrase}」| 動く人たち`,
    description: interview.subtitle,
    openGraph: {
      title: `${interview.name}「${interview.catchphrase}」`,
      description: interview.subtitle,
      ...(interview.photo ? { images: [interview.photo] } : {}),
    },
  };
}

export default async function InterviewDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [interview, allInterviews, latest] = await Promise.all([
    fetchInterviewBySlug(slug),
    fetchAllInterviews(),
    fetchLatestArticles(5),
  ]);

  if (!interview) notFound();

  const related = allInterviews
    .filter((i) => i.slug !== interview.slug)
    .slice(0, 3);

  const shareUrl = `${BASE_URL}/interviews/${interview.slug}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `${interview.name}「${interview.catchphrase}」`
  )}&url=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="mx-auto grid w-full max-w-[1232px] grid-cols-1 items-start gap-x-12 px-4 pb-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <main className="min-w-0">
        <nav className="flex flex-wrap items-center gap-1.5 pt-4 text-[11px] text-ink-soft">
          <Link href="/" className="hover:text-ocean">
            HOME
          </Link>
          <span className="text-ink-muted">/</span>
          <Link href="/interviews" className="hover:text-ocean">
            動く人たち
          </Link>
          <span className="text-ink-muted">/</span>
          <span className="truncate">{interview.name}</span>
        </nav>

        <article className="pb-6 pt-2">
          <div className="flex flex-wrap items-center gap-2 text-[12px] leading-tight text-ink-soft">
            <span className="rounded-sm border border-border-line px-1.5 py-[3px] text-[11px] font-bold leading-tight tracking-[.06em] text-ink">
              動く人たち
            </span>
            <span>{formatDate(interview.date)}</span>
          </div>

          <h1 className="my-3 text-[22px] font-bold leading-[1.5] text-ink sm:text-[28px]">
            <span className="text-ink-muted">❝ </span>
            {interview.catchphrase}
            <span className="text-ink-muted"> ❞</span>
          </h1>
          <p className="text-[14px] leading-[1.7] text-ink-soft">
            {interview.subtitle}
          </p>

          {/* ── 話し手 ── */}
          <div className="mt-3.5 flex items-center gap-2.5 border-t border-border-line pt-3.5">
            <Avatar name={interview.name} />
            <span className="min-w-0">
              <span className="block text-[13px] font-bold leading-tight text-ink">
                {interview.name}
              </span>
              <span className="mt-[3px] block text-[12px] leading-tight text-ink-soft">
                {interview.role}
              </span>
            </span>
            <span className="ml-auto shrink-0 text-right text-[12px] leading-tight text-ink-soft">
              取材・編集 編集部
              <span className="ml-1">・読了 {readingMinutes(interview.body)}分</span>
            </span>
          </div>

          {interview.photo && (
            <div className="my-4 overflow-hidden rounded bg-paper-deep">
              <img
                src={interview.photo}
                alt={interview.name}
                className="aspect-[1.91/1] w-full object-cover"
              />
            </div>
          )}

          <div
            className="prose-article prose-interview"
            dangerouslySetInnerHTML={{ __html: interview.body }}
          />

          {interview.tags && interview.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-1.5">
              {interview.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm border border-border-line px-2 py-1 text-[11px] leading-none text-ink-soft"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="my-6 flex items-center gap-2 border-y border-border-line py-3.5">
            <span className="text-[11px] tracking-[.12em] text-ink-muted">SHARE</span>
            <a
              href={twitterShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-border-line px-3 py-2 text-[12px] font-bold text-ink hover:bg-[rgba(34,34,34,.05)]"
            >
              X でシェア
            </a>
            <CopyLinkButton url={shareUrl} />
          </div>

          {/* ── 取材クレジット ── */}
          <div className="my-6 rounded border border-border-line p-4">
            <p className="text-[10px] leading-tight tracking-[.12em] text-ink-muted">
              CREDIT
            </p>
            <p className="mt-1.5 text-[14px] font-bold leading-tight text-ink">
              取材・編集　玉野SDGsみらいづくりセンター
            </p>
            <p className="mt-2 text-[12px] leading-[1.7] text-ink-soft">
              地域で活動する方々の声を届けるインタビュー企画です。取材のご相談もお受けしています。
            </p>
            <Link
              href="/contact"
              className="mt-2 inline-block text-[12px] font-bold text-ocean hover:underline"
            >
              取材について相談する →
            </Link>
          </div>
        </article>

        {/* ── ほかのインタビュー ── */}
        {related.length > 0 && (
          <section className="border-t border-border-line">
            <div className="mb-1 flex h-14 items-center justify-between gap-3">
              <h2 className="leading-none">
                <span className="section-label block text-ink-muted">Other Interviews</span>
                <span className="mt-1.5 block text-[16px] font-bold text-ink sm:text-[18px]">
                  ほかの人の話
                </span>
              </h2>
              <Link
                href="/interviews"
                className="shrink-0 text-[13px] font-bold text-ocean hover:underline"
              >
                一覧を見る →
              </Link>
            </div>
            <div className="divide-y divide-border-line border-t border-border-line">
              {related.map((person) => (
                <Link
                  key={person.slug}
                  href={`/interviews/${person.slug}`}
                  className="card-interactive group -mx-3 flex gap-3 rounded px-3 py-3.5"
                >
                  <div className="relative aspect-[1.91/1] w-[120px] shrink-0 overflow-hidden rounded bg-paper-deep sm:w-[200px]">
                    {person.photo ? (
                      <img
                        src={person.photo}
                        alt={person.name}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-paper-deep" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[14px] font-bold leading-[1.35] text-ink group-hover:text-ocean sm:text-[15px]">
                      ❝ {person.catchphrase} ❞
                    </h3>
                    <p className="mt-2 text-[12px] leading-tight text-ink-soft">
                      {person.role}
                    </p>
                    <p className="text-[13px] font-bold leading-tight text-ink">
                      {person.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <aside className="min-w-0 pb-8 pt-4">
        <div className="lg:sticky lg:top-[88px]">
          <PickupCard articles={latest} />
          <MembershipCard />
          <FollowCard />
        </div>
      </aside>
    </div>
  );
}
