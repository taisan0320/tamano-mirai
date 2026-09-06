export const revalidate = 60;

import type { Metadata } from "next";
import { fetchArticlesByCategory } from "@/lib/articles";
import ArchiveLayout, { EmptyState } from "@/components/ArchiveLayout";
import ArticleRow from "@/components/ArticleRow";

export const metadata: Metadata = {
  title: "イベント情報",
  description:
    "玉野市で開催されるイベント・お祭り・体験プログラムの最新情報をお届けします。",
};

export default async function EventsPage() {
  const events = await fetchArticlesByCategory("event", 100);

  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.date) >= now);
  const past = events.filter((e) => new Date(e.date) < now);

  return (
    <ArchiveLayout
      label="EVENTS"
      title="イベント情報"
      description="玉野市で開催されるイベント・お祭り・体験プログラムの情報です。"
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
