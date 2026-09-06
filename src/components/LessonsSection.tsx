import Link from "next/link";
import {
  fetchAllLessons,
  countSchools,
  diariesForLesson,
  totalGuests,
  type Lesson,
} from "@/lib/lessons";
import { fetchArticlesByCategory, getArticleUrl } from "@/lib/articles";
import { formatDate } from "@/lib/format";
import { SectionHead, OutlineLink } from "@/components/ui";
import type { Article } from "@/lib/articles";

/* 学校と、つくる。
   先頭1本は写真を大きく、以降はサムネイル＋本文の行で並べる。
   各授業には、タグが一致するコーディネーター日記がぶら下がる。 */

export function RoleTags({ roles }: { roles: string[] }) {
  if (roles.length === 0) return null;
  return (
    <div className="mt-2.5 flex flex-wrap gap-1.5">
      {roles.map((role) => (
        <span
          key={role}
          className="rounded-sm border border-border-line px-2 py-1 text-[11px] leading-none text-ink-soft"
        >
          {role}
        </span>
      ))}
    </div>
  );
}

/** この授業について書かれた日記 */
export function LinkedDiaries({
  lesson,
  diaries,
  limit = 3,
}: {
  lesson: Lesson;
  diaries: Article[];
  limit?: number;
}) {
  if (diaries.length === 0) return null;
  return (
    <div className="mt-3.5 rounded bg-cream p-3.5">
      <p className="text-[12px] leading-tight text-ink">
        <span className="text-[16px] font-bold">{diaries.length}</span>本
        <span className="ml-1.5 text-ink-soft">
          この授業について書かれたコーディネーター日記
        </span>
      </p>
      <div className="mt-2">
        {diaries.slice(0, limit).map((diary) => (
          <Link
            key={diary.slug}
            href={getArticleUrl(diary)}
            className="group flex gap-2.5 border-t border-border-line py-2"
          >
            <span className="shrink-0 text-[12px] leading-tight text-ink-soft">
              {formatDate(diary.date)}
            </span>
            <span className="min-w-0 text-[13px] font-bold leading-tight text-ink group-hover:text-ocean">
              {diary.title}
            </span>
          </Link>
        ))}
      </div>
      <Link
        href={`/lessons/${lesson.slug}#diaries`}
        className="mt-1.5 inline-block text-[13px] font-bold text-ocean hover:underline"
      >
        「{lesson.programTag}」の日記をすべて読む →
      </Link>
    </div>
  );
}

export default async function LessonsSection() {
  const [lessons, diaryArticles] = await Promise.all([
    fetchAllLessons(20),
    fetchArticlesByCategory("blog", 100),
  ]);

  if (lessons.length === 0) return null;

  const lead = lessons.find((l) => l.featured) ?? lessons[0];
  const rest = lessons.filter((l) => l.slug !== lead.slug).slice(0, 4);
  const leadDiaries = diariesForLesson(lead, diaryArticles);

  // 人数は数えられる授業だけが持つ。1つもなければ枠自体を出さない。
  const guests = totalGuests(lessons);
  const stats = [
    { value: String(countSchools(lessons)), unit: "校", label: "連携している学校" },
    { value: String(lessons.length), unit: "本", label: "今年度の授業・講座" },
    ...(guests > 0
      ? [{ value: String(guests), unit: "名", label: "参加した地域の大人" }]
      : []),
  ];

  return (
    <section id="lessons" className="mt-12 border-t border-border-line">
      <SectionHead
        label="With Schools"
        title="学校と、つくる。"
        moreHref="/lessons"
        moreText="授業の記録をすべて見る"
      />
      <p className="mb-3 text-[13px] leading-[1.7] text-ink-soft">
        地域学校連携コーディネーターとして、学校の先生と一緒につくってきた授業の記録です。
        誰と組み、何を設計し、どこまで伴走したのか。授業が立ち上がるまでの過程を残しています。
      </p>

      <div className="flex rounded border border-border-line">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex-1 border-r border-border-line px-3 py-3.5 last:border-r-0"
          >
            <p className="text-[24px] font-bold leading-none text-ink">
              {stat.value}
              <span className="text-[12px]">{stat.unit}</span>
            </p>
            <p className="mt-1.5 text-[11px] leading-tight text-ink-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* ── 先頭の1本 ── */}
      <div className="border-t border-border-line pb-4 pt-4">
        {lead.mainPhoto && (
          <Link href={`/lessons/${lead.slug}`} className="block">
            <img
              src={lead.mainPhoto.url}
              alt=""
              className="aspect-[1.91/1] w-full rounded object-cover"
              loading="lazy"
            />
          </Link>
        )}
        {lead.subPhotos.length > 0 && (
          <div className="mt-1 grid grid-cols-3 gap-1">
            {lead.subPhotos.slice(0, 3).map((photo) => (
              <img
                key={photo.url}
                src={photo.url}
                alt=""
                className="aspect-[1.5/1] w-full rounded object-cover"
                loading="lazy"
              />
            ))}
          </div>
        )}
        <p className="mt-2.5 text-[11px] font-bold leading-tight tracking-[.06em] text-ink-soft">
          {lead.school} ・ {lead.target}
        </p>
        <h3 className="mb-2 mt-2 text-[18px] font-bold leading-[1.25] text-ink">
          <Link href={`/lessons/${lead.slug}`} className="hover:text-ocean">
            {lead.title}
          </Link>
        </h3>
        <p className="text-[14px] leading-[1.7] text-ink-soft">{lead.summary}</p>
        <RoleTags roles={lead.roles} />
        <LinkedDiaries lesson={lead} diaries={leadDiaries} />
        {lead.mainPhoto?.caption && (
          <p className="mt-3 border-l-2 border-border-line pl-2.5 text-[11px] leading-[1.7] text-ink-muted">
            写真｜{lead.mainPhoto.caption}
          </p>
        )}
      </div>

      {/* ── 2本目以降 ── */}
      <div className="divide-y divide-border-line border-t border-border-line">
        {rest.map((lesson) => {
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
                <h3 className="my-1.5 text-[14px] font-bold leading-[1.35] text-ink group-hover:text-ocean">
                  {lesson.title}
                </h3>
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

      <OutlineLink href="/lessons">授業の記録をすべて見る</OutlineLink>
    </section>
  );
}
