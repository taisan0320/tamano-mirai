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
    <div className="bg-paper">

      {/* ─────────────────────────────────────────────────────────────
          2カラム: 左=人物写真（sticky固定）/ 右=記事コンテンツ（スクロール）
      ───────────────────────────────────────────────────────────── */}
      <div className="lg:flex lg:items-start">

        {/* ── 左カラム: 人物写真 ── */}
        <div className="relative overflow-hidden lg:shrink-0 lg:w-[42%] lg:sticky lg:top-16 h-[56vw] max-h-[600px] lg:h-[calc(100vh-64px)] lg:max-h-none">

          {interview.photo ? (
            <img
              src={interview.photo}
              alt={interview.name}
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(160deg, #1a0f05 0%, #3d1f05 45%, #6b3209 80%, #9a500f 100%)" }}
            />
          )}

          {/* グラデーションオーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-transparent" />

          {/* 名前・肩書きオーバーレイ */}
          <div className="absolute bottom-0 left-0 right-0 px-8 lg:px-10 pb-10 pt-24">
            <p className="section-label text-white/40 mb-3">INTERVIEW · 動く人たち</p>
            <p className="text-white/55 text-[10px] tracking-[.28em] uppercase mb-2">
              {interview.role}
            </p>
            <h1
              className="font-serif text-white font-bold leading-tight"
              style={{ fontSize: "clamp(1.7rem, 2.6vw, 2.8rem)" }}
            >
              {interview.name}
            </h1>
          </div>
        </div>

        {/* ── 右カラム: コンテンツ ── */}
        <div className="flex-1 min-w-0">

          {/* キャッチフレーズバンド */}
          <div
            className="px-8 lg:px-12 xl:px-16 py-9 lg:py-12"
            style={{ background: "linear-gradient(110deg, #2a1405 0%, #5c2a08 55%, #8c4510 100%)" }}
          >
            <p className="section-label text-white/35 mb-3">CATCHPHRASE</p>
            <p
              className="font-serif text-white/92 leading-[1.75]"
              style={{ fontSize: "clamp(1rem, 1.6vw, 1.4rem)" }}
            >
              ❝ {interview.catchphrase} ❞
            </p>
          </div>

          {/* 記事本文エリア */}
          <div className="px-8 lg:px-12 xl:px-16 py-12 lg:py-16">

            {/* パンくず */}
            <nav className="flex items-center gap-2 section-label text-ink-muted mb-10">
              <Link href="/" className="hover:text-ink transition-colors">HOME</Link>
              <span>/</span>
              <Link href="/interviews" className="hover:text-ink transition-colors">動く人たち</Link>
            </nav>

            {/* サブタイトル */}
            <h2
              className="font-serif font-bold text-ink leading-snug mb-4"
              style={{ fontSize: "clamp(1.1rem, 1.7vw, 1.4rem)" }}
            >
              {interview.subtitle}
            </h2>

            {/* メタ情報 */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-ink-muted pb-10 mb-10 border-b border-border-line">
              <span>{formattedDate}</span>
              <span className="text-border-line">|</span>
              <span>取材・編集：NPO法人 玉野SDGsみらいづくりセンター</span>
            </div>

            {/* 本文 */}
            <div
              className="prose-article prose-interview"
              dangerouslySetInnerHTML={{ __html: interview.body }}
            />

            {/* タグ */}
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

            {/* 取材クレジット */}
            <div className="mt-8 p-5 bg-paper-alt rounded-xl text-sm text-ink-muted leading-relaxed border border-border-line">
              <p className="font-semibold text-ink mb-1">取材・編集</p>
              <p>NPO法人 玉野SDGsみらいづくりセンター</p>
              <p className="mt-1 text-xs">
                この記事は、地域で活動する方々の声を届けるインタビュー企画の一環として作成しました。
              </p>
            </div>

            {/* 一覧へ戻る */}
            <Link
              href="/interviews"
              className="inline-flex items-center gap-2 mt-8 section-label text-ink-muted hover:text-ink transition-colors"
            >
              ← 動く人たち 一覧へ
            </Link>
          </div>

          {/* 関連インタビュー */}
          {related.length > 0 && (
            <div className="border-t border-border-line bg-paper-alt py-14 px-8 lg:px-12 xl:px-16">
              <h2 className="section-label text-ink-muted mb-8">OTHER INTERVIEWS</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((person) => (
                  <Link
                    key={person.slug}
                    href={`/interviews/${person.slug}`}
                    className="group flex gap-4 p-5 bg-white rounded-xl border border-border-line hover:border-forest transition-colors card-interactive"
                  >
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
          )}

        </div>
      </div>
    </div>
  );
}
