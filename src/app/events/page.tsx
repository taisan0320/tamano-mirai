export const revalidate = 60;

import type { Metadata } from "next";
import { fetchArticlesByCategory } from "@/lib/articles";
import ArchiveLayout, { EmptyState } from "@/components/ArchiveLayout";
import ArticleRow from "@/components/ArticleRow";

// 検索実態にあわせた文言。Search Consoleでこのページに着地したクエリは
// 「渋川」系271回・「花火」系270回・「玉野 イベント（今日/明日/予定）」系60回で、
// 旧文言の「イベント情報」ではこれらのどれとも重ならず、CTRは0.95%だった。
export const metadata: Metadata = {
  alternates: { canonical: "/events" },
  title: "玉野市のイベント情報｜花火大会・夏祭り・渋川海岸",
  description:
    "玉野まつりの花火大会、渋川海岸・渋川海水浴場の催し、ちっこう夜市など、" +
    "玉野市で開かれるイベントの日程と会場をまとめています。" +
    "これからの予定と終了したイベントを一覧で確認できます。",
};

export default async function EventsPage() {
  const events = await fetchArticlesByCategory("event", 100);

  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.date) >= now);
  const past = events.filter((e) => new Date(e.date) < now);

  return (
    <ArchiveLayout
      label="EVENTS"
      title="玉野市のイベント情報"
      description="玉野まつりの花火大会、渋川海岸の催し、ちっこう夜市など、玉野市で開かれるイベントの情報です。"
    >
      {events.length === 0 && <EmptyState>公開中のイベントはありません。</EmptyState>}

      {upcoming.length > 0 && (
        <section>
          <h2 className="border-b border-ink pb-2 text-[16px] font-bold text-ink">
            これからの予定
          </h2>
          <div className="divide-y divide-border-line">
            {upcoming.map((article) => (
              <ArticleRow key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section className={upcoming.length > 0 ? "mt-10" : ""}>
          <h2 className="border-b border-ink pb-2 text-[16px] font-bold text-ink">
            終了したイベント
          </h2>
          <div className="divide-y divide-border-line">
            {past.map((article) => (
              <ArticleRow key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}
    </ArchiveLayout>
  );
}
