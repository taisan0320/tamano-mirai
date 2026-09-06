export const revalidate = 60;

import type { Metadata } from "next";
import Link from "next/link";
import { fetchAllLessons, diariesForLesson, countSchools } from "@/lib/lessons";
import { fetchArticlesByCategory } from "@/lib/articles";
import ArchiveLayout, { EmptyState } from "@/components/ArchiveLayout";
import { RoleTags } from "@/components/LessonsSection";

export const metadata: Metadata = {
  title: "学校と、つくる。",
  description:
    "地域学校連携コーディネーターとして、学校の先生と一緒につくってきた授業の記録です。誰と組み、何を設計し、どこまで伴走したのかを残しています。",
};

export default async function LessonsPage() {
  const [lessons, diaryArticles] = await Promise.all([
    fetchAllLessons(100),
    fetchArticlesByCategory("blog", 100),
  ]);

  return (
    <ArchiveLayout
      label="WITH SCHOOLS"
      title="学校と、つくる。"
      description="学校の先生と一緒につくってきた授業の記録です。誰と組み、何を設計し、どこまで伴走したのか。授業が立ち上がるまでの過程を残しています。"
    >
      {lessons.length === 0 ? (
        <EmptyState>公開中の授業の記録はありません。</EmptyState>
      ) : (
        <>
          <p className="mb-4 text-[13px] text-ink-soft">
            {countSchools(lessons)}校・{lessons.length}本の記録
          </p>
          <div className="divide-y divide-border-line border-t border-border-line">
            {lessons.map((lesson) => {
              const diaries = diariesForLesson(lesson, diaryArticles);
              return (
                <Link
                  key={lesson.slug}
                  href={`/lessons/${lesson.slug}`}
                  className="card-interactive group -mx-3 flex items-start gap-3 rounded px-3 py-3.5"
                >
                  <div className="relative aspect-[1.91/1] w-[120px] shrink-0 overflow-hidden rounded bg-paper-deep sm:w-[200px]">
                    {lesson.mainPhoto ? (
                      <img
                        src={lesson.mainPhoto.url}
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
                      {lesson.school} ・ {lesson.target}
                    </p>
                    <h2 className="my-1.5 text-[14px] font-bold leading-[1.35] text-ink group-hover:text-ocean sm:text-[15px]">
                      {lesson.title}
                    </h2>
                    <p className="text-[12px] leading-[1.7] text-ink-soft">
                      {lesson.summary}
                    </p>
                    <RoleTags roles={lesson.roles} />
                    {diaries.length > 0 && (
                      <p className="mt-2.5 text-[12px] leading-tight text-ink-soft">
                        関連するコーディネーター日記
                        <span className="ml-2 font-bold text-ocean">
                          {diaries.length}本 →
                        </span>
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </ArchiveLayout>
  );
}
