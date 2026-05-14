import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchInterviewBySlug, fetchAllInterviews, fetchAllInterviewSlugs } from "@/lib/interviews";

export const revalidate = 60;
export const dynamicParams = true;

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
    title: `${interview.name}「${interview.catchphrase}」| 動く人たち | 玉野SDGsみらいづくりセンター`,
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
  const [interview, allInterviews] = await Promise.all([
    fetchInterviewBySlug(slug),
    fetchAllInterviews(),
  ]);

  if (!interview) notFound();

  const related = allInterviews
    .filter((i) => i.slug !== interview.slug)
    .slice(0, 2);

  const formattedDate = new Date(interview.date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-paper min-h-screen">

      {/* ── Hero: 左写真 + 右プロフィール ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">

        {/* 左: 人物写真 */}
        <div className="relative bg-paper-deep overflow-hidden min-h-[340px] lg:min-h-[560px]">
          {interview.photo ? (
            <img
              src={interview.photo}
              alt={interview.name}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center text-white text-8xl font-bold font-serif"
              style={{ background: "linear-gradient(135deg, #3d1f05, #6b3209)" }}
            >
              {interview.name.slice(0, 1)}
            </div>
          )}
        </div>

        {/* 右: プロフィール情報 */}
        <div
          className="flex flex-col justify-end px-10 py-14 lg:px-16 min-h-[480px] lg:min-h-[560px]"
          style={{ background: "linear-gradient(160deg, #6b3209 0%, #9a500f 50%, #c86d1a 100%)" }}
        >
          {/* ラベル */}
          <div className="flex items-center gap-2 mb-10">
            <span className="section-label text-white/40">INTERVIEW</span>
            <span className="text-white/20 text-xs">—</span>
            <span className="section-label text-white/50">動く人たち</span>
          </div>

          {/* キャッチコピー */}
          <p
            className="font-serif leading-tight mb-6"
            style={{ fontSize: "clamp(1.6rem, 4vw, 2.6rem)", color: "rgba(255,255,255,0.95)" }}
          >
            ❝ {interview.catchphrase} ❞
          </p>

          {/* 区切り */}
          <div className="w-10 h-px mb-6" style={{ background: "#c86d1a" }} />

          {/* 肩書き + 名前 */}
          <p className="text-white/50 text-xs font-medium tracking-widest uppercase mb-2">
            {interview.role}
          </p>
          <h1 className="text-3xl font-bold text-white font-serif leading-tight">
            {interview.name}
          </h1>
        </div>
      </div>

      {/* ── サブタイトル + メタ ── */}
      <div className="border-b border-border-line bg-white">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <p className="section-label text-ink-muted mb-3">INTERVIEW</p>
          <h2
            className="font-bold text-ink leading-snug mb-5 font-serif"
            style={{ fontSize: "clamp(1.2rem, 3vw, 1.75rem)" }}
          >
            {interview.subtitle}
          </h2>
          <div className="flex flex-wrap items-center gap-3 text-xs text-ink-muted">
            <span>{formattedDate}</span>
            <span className="text-border-line">|</span>
            <span>取材・編集：NPO法人 玉野SDGsみらいづくりセンター</span>
          </div>
        </div>
      </div>

      {/* ── 本文 ── */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div
          className="prose-article prose-interview"
          dangerouslySetInnerHTML={{ __html: interview.body }}
        />

        {/* ── タグ ── */}
        {interview.tags && interview.tags.length > 0 && (
          <div className="mt-14 pt-8 border-t border-border-line flex flex-wrap gap-2">
            {interview.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs border border-border-line text-ink-muted px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* ── 取材クレジット ── */}
        <div className="mt-8 p-5 bg-paper-alt rounded-xl text-sm text-ink-muted leading-relaxed border border-border-line">
          <p className="font-semibold text-ink mb-1">取材・編集</p>
          <p>NPO法人 玉野SDGsみらいづくりセンター</p>
          <p className="mt-1 text-xs">
            この記事は、地域で活動する方々の声を届けるインタビュー企画の一環として作成しました。
          </p>
        </div>

        {/* ── 一覧へ戻る ── */}
        <Link
          href="/interviews"
          className="inline-flex items-center gap-2 mt-8 section-label text-ink-muted hover:text-ink transition-colors"
        >
          ← 動く人たち 一覧へ
        </Link>
      </div>

      {/* ── 関連インタビュー ── */}
      {related.length > 0 && (
        <div className="border-t border-border-line bg-paper-alt py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="section-label text-ink-muted mb-8">OTHER INTERVIEWS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((person) => (
                <Link
                  key={person.slug}
                  href={`/interviews/${person.slug}`}
                  className="group flex gap-4 p-5 bg-white rounded-xl border border-border-line hover:border-forest transition-colors card-interactive"
                >
                  {/* アバター */}
                  {person.photo ? (
                    <div className="w-14 h-14 rounded-full shrink-0 overflow-hidden">
                      <img
                        src={person.photo}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className="w-14 h-14 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-lg font-serif"
                      style={{ background: "linear-gradient(135deg, #6b3209, #c86d1a)" }}
                    >
                      {person.name.slice(0, 1)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs text-ink-muted mb-1">{person.role}</p>
                    <p className="font-bold text-ink group-hover:text-forest transition-colors leading-snug">
                      {person.name}
                    </p>
                    <p className="text-sm text-ink-muted mt-1 line-clamp-1">
                      ❝ {person.catchphrase} ❞
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
