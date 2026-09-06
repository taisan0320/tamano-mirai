export const revalidate = 60;

import type { Metadata } from "next";
import Link from "next/link";
import { fetchAllInterviews } from "@/lib/interviews";
import ArchiveLayout, { EmptyState } from "@/components/ArchiveLayout";
import { Avatar } from "@/components/ui";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "動く人たち",
  description:
    "玉野で地域を動かしている人たちのインタビュー。まちに根ざした活動を続ける方々の言葉と想いを届けます。",
};

export default async function InterviewsPage() {
  const interviews = await fetchAllInterviews();

  return (
    <ArchiveLayout
      label="VOICES FROM TAMANO"
      title="動く人たち"
      description="玉野のまちで、自分の手で何かを動かしている人たち。編集部が訪ね、聞き、撮ってきた記録です。"
    >
      {interviews.length === 0 ? (
        <EmptyState>インタビュー記事はまだありません。</EmptyState>
      ) : (
        <div className="divide-y divide-border-line border-t border-border-line">
          {interviews.map((interview) => (
            <Link
              key={interview.slug}
              href={`/interviews/${interview.slug}`}
              className="card-interactive group -mx-3 flex gap-3 rounded px-3 py-3.5"
            >
              <div className="relative aspect-[1.91/1] w-[120px] shrink-0 overflow-hidden rounded bg-paper-deep sm:w-[200px]">
                {interview.photo ? (
                  <img
                    src={interview.photo}
                    alt={interview.name}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 bg-paper-deep" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] leading-tight text-ink-soft">
                  {formatDate(interview.date)}
                </p>
                <h2 className="mt-1.5 text-[14px] font-bold leading-[1.35] text-ink group-hover:text-ocean sm:text-[15px]">
                  ❝ {interview.catchphrase} ❞
                </h2>
                <p className="mt-1.5 hidden text-[12px] leading-[1.7] text-ink-soft sm:line-clamp-2">
                  {interview.subtitle}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Avatar name={interview.name} size={28} />
                  <span className="min-w-0">
                    <span className="block text-[13px] font-bold leading-tight text-ink">
                      {interview.name}
                    </span>
                    <span className="block text-[11px] leading-tight text-ink-soft">
                      {interview.role}
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </ArchiveLayout>
  );
}
