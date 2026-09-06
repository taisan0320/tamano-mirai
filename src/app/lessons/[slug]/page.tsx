export const revalidate = 60;
export const dynamicParams = true;

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  fetchLessonBySlug,
  fetchAllLessons,
  fetchAllLessonSlugs,
  diariesForLesson,
} from "@/lib/lessons";
import { fetchArticlesByCategory, getArticleUrl } from "@/lib/articles";
import { formatDate, readingMinutes, authorName } from "@/lib/format";
import { RoleTags } from "@/components/LessonsSection";
import { FactList } from "@/components/ArchiveLayout";
import { SidebarCard, MembershipCard } from "@/components/Sidebar";
import { Avatar } from "@/components/ui";

export async function generateStaticParams() {
  const slugs = await fetchAllLessonSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lesson = await fetchLessonBySlug(slug);
  if (!lesson) return { title: "授業の記録が見つかりません" };
  return {
    title: lesson.title,
    description: lesson.summary,
    openGraph: {
      title: lesson.title,
      description: lesson.summary,
      ...(lesson.mainPhoto ? { images: [lesson.mainPhoto.url] } : {}),
    },
  };
}

export default async function LessonDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [lesson, allLessons, diaryArticles] = await Promise.all([
    fetchLessonBySlug(slug),
    fetchAllLessons(100),
    fetchArticlesByCategory("blog", 100),
  ]);

  if (!lesson) notFound();

  const diaries = diariesForLesson(lesson, diaryArticles);
  const others = allLessons.filter((l) => l.slug !== lesson.slug).slice(0, 3);

  const facts = [
    { term: "学校", value: lesson.school },
    { term: "対象", value: lesson.target },
    ...(lesson.period ? [{ term: "実施", value: lesson.period }] : []),
    ...(lesson.organizer ? [{ term: "企画・運営", value: lesson.organizer }] : []),
    { term: "センターの役割", value: lesson.roles.join("／") },
    ...(lesson.coordinator ? [{ term: "担当", value: lesson.coordinator }] : []),
  ];

  return (
    <div className="mx-auto grid w-full max-w-[1232px] grid-cols-1 items-start gap-x-12 px-4 pb-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <main className="min-w-0">
        <nav className="flex flex-wrap items-center gap-1.5 pt-4 text-[11px] text-ink-soft">
          <Link href="/" className="hover:text-ocean">
            HOME
          </Link>
          <span className="text-ink-muted">/</span>
          <Link href="/lessons" className="hover:text-ocean">
            学校と、つくる。
          </Link>
          <span className="text-ink-muted">/</span>
          <span className="truncate">{lesson.programTag}</span>
        </nav>

        <article className="pb-6 pt-2">
          <p className="text-[11px] font-bold leading-tight tracking-[.06em] text-ink-soft">
            {lesson.school} ・ {lesson.target}
          </p>
          <h1 className="mb-3 mt-2 text-[24px] font-bold leading-[1.25] text-ink sm:text-[28px]">
            {lesson.title}
          </h1>

          {lesson.mainPhoto && (
            <div className="mt-3 overflow-hidden rounded bg-paper-deep">
              <img
                src={lesson.mainPhoto.url}
                alt=""
                className="aspect-[1.91/1] w-full object-cover"
              />
            </div>
          )}

          <div className="my-5">
            <FactList items={facts} />
          </div>

          <div className="prose-article">
            <h2>何を狙った授業か</h2>
            <p>{lesson.aim}</p>

            <h2>どう組み立てたか</h2>
            <p>{lesson.design}</p>

            <h2>コーディネーターがしたこと</h2>
          </div>
          <RoleTags roles={lesson.roles} />
          <div className="prose-article">
            <p>{lesson.work}</p>
          </div>

          {/* ── 写真 ── */}
          {lesson.subPhotos.length > 0 && (
            <div className="my-4">
              <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
                {lesson.subPhotos.map((photo) => (
                  <img
                    key={photo.url}
                    src={photo.url}
                    alt={photo.caption}
                    className="aspect-[1.4/1] w-full rounded object-cover"
                    loading="lazy"
                  />
                ))}
              </div>
              <p className="mt-3 border-l-2 border-border-line pl-2.5 text-[11px] leading-[1.7] text-ink-muted">
                写真｜
                {lesson.subPhotos.map((p) => p.caption).filter(Boolean).join("、")}
              </p>
            </div>
          )}

          {/* ── この授業について書かれた日記 ── */}
          <section id="diaries" className="my-6 scroll-mt-20 rounded bg-cream p-4">
            <p className="text-[12px] leading-tight text-ink">
              <span className="text-[16px] font-bold">{diaries.length}</span>本
              <span className="ml-1.5 text-ink-soft">
                この授業について書かれたコーディネーター日記
              </span>
            </p>

            {diaries.length === 0 ? (
              <p className="mt-3 text-[12px] leading-[1.7] text-ink-soft">
                この授業に紐づく日記はまだありません。日記のタグに「
                {lesson.programTag}」を入れると、ここに自動で並びます。
              </p>
            ) : (
              <div className="mt-2">
                {diaries.map((diary) => (
                  <Link
                    key={diary.slug}
                    href={getArticleUrl(diary)}
                    className="group flex flex-col gap-1 border-t border-border-line py-2.5 sm:flex-row sm:gap-2.5"
                  >
                    <span className="shrink-0 text-[12px] leading-tight text-ink-soft">
                      {formatDate(diary.date)}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[13px] font-bold leading-[1.4] text-ink group-hover:text-ocean">
                        {diary.title}
                      </span>
                      <span className="mt-1 block text-[11px] leading-tight text-ink-soft">
                        {authorName(diary)}・読了 {readingMinutes(diary.body)}分
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {lesson.coordinator && (
            <div className="my-6 flex gap-3.5 rounded border border-border-line p-4">
              <Avatar name={lesson.coordinator} size={56} />
              <div className="min-w-0">
                <p className="text-[14px] font-bold leading-tight text-ink">
                  {lesson.coordinator}
                </p>
                <p className="mt-2 text-[12px] leading-[1.7] text-ink-soft">
                  学校と地域のあいだで、探究の授業づくりに伴走しています。
                </p>
                <Link
                  href="/blog"
                  className="mt-2 inline-block text-[12px] font-bold text-ocean hover:underline"
                >
                  コーディネーター日記を読む →
                </Link>
              </div>
            </div>
          )}
        </article>

        {/* ── ほかの授業 ── */}
        {others.length > 0 && (
          <section className="border-t border-border-line">
            <div className="mb-1 flex h-14 items-center justify-between gap-3">
              <h2 className="leading-none">
                <span className="section-label block text-ink-muted">
                  Other Lessons
                </span>
                <span className="mt-1.5 block text-[16px] font-bold text-ink sm:text-[18px]">
                  ほかの授業
                </span>
              </h2>
              <Link
                href="/lessons"
                className="shrink-0 text-[13px] font-bold text-ocean hover:underline"
              >
                一覧を見る →
              </Link>
            </div>
            <div className="divide-y divide-border-line border-t border-border-line">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/lessons/${other.slug}`}
                  className="card-interactive group -mx-3 flex items-start gap-3 rounded px-3 py-3.5"
                >
                  <div className="relative aspect-[1.91/1] w-[120px] shrink-0 overflow-hidden rounded bg-paper-deep sm:w-[200px]">
                    {other.mainPhoto ? (
                      <img
                        src={other.mainPhoto.url}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-paper-deep" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold leading-tight tracking-[.06em] text-ink-soft">
                      {other.school}
                    </p>
                    <h3 className="mt-1.5 text-[14px] font-bold leading-[1.35] text-ink group-hover:text-ocean">
                      {other.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <aside className="min-w-0 pb-8 pt-4">
        <div className="lg:sticky lg:top-[88px]">
          <SidebarCard label="Program" title="この授業について">
            <p className="mt-2 text-[12px] leading-[1.7] text-ink-soft">
              {lesson.summary}
            </p>
            <div className="mt-3 rounded border border-border-line px-3 py-2.5">
              <p className="text-[20px] font-bold leading-none text-ink">
                {diaries.length}
                <span className="text-[12px]">本</span>
              </p>
              <p className="mt-1.5 text-[11px] leading-tight text-ink-muted">
                この授業についての日記
              </p>
            </div>
          </SidebarCard>

          <SidebarCard label="For Teachers" title="同じような授業を相談したい">
            <p className="mt-2 text-[12px] leading-[1.7] text-ink-soft">
              学校の先生・教育委員会のみなさまへ。単元設計の伴走、地域ゲストの調整、
              当日のファシリテーションまでご相談いただけます。
            </p>
            <Link
              href="/contact"
              className="mt-3 block rounded bg-ocean py-2.5 text-center text-[14px] font-bold leading-none text-white hover:bg-ocean-dark"
            >
              授業づくりを相談する
            </Link>
          </SidebarCard>

          <MembershipCard />
        </div>
      </aside>
    </div>
  );
}
