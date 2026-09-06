export const revalidate = 60;

import type { Metadata } from "next";
import { fetchArticlesByCategory } from "@/lib/articles";
import ArchiveLayout, { EmptyState } from "@/components/ArchiveLayout";
import ArticleRow from "@/components/ArticleRow";

/* 玉野の話。
   リニューアル計画では /interviews への統合（301リダイレクト）を予定しているが、
   統合の判断が済むまでは一覧として残し、見た目だけ他ページに揃えている。 */

export const metadata: Metadata = {
  title: "玉野の話",
  description:
    "玉野市で活動する人や団体のインタビュー記事。まちを動かす人たちの声を届けます。",
};

export default async function StoriesPage() {
  const [interviews, stories] = await Promise.all([
    fetchArticlesByCategory("interview", 100),
    fetchArticlesByCategory("story", 100),
  ]);
  const all = [...interviews, ...stories].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <ArchiveLayout
      label="STORIES"
      title="玉野の話"
      description="玉野市で活動する人や団体の記事です。"
    >
      {all.length === 0 ? (
        <EmptyState>公開中の記事はありません。</EmptyState>
      ) : (
        <div className="divide-y divide-border-line border-t border-border-line">
          {all.map((article) => (
            <ArticleRow key={article.slug} article={article} />
          ))}
        </div>
      )}
    </ArchiveLayout>
  );
}
