export const revalidate = 60;

import type { Metadata } from "next";
import { fetchArticlesByCategory } from "@/lib/articles";
import ArchiveLayout, { EmptyState } from "@/components/ArchiveLayout";
import ArticleRow from "@/components/ArticleRow";

export const metadata: Metadata = {
  title: "コーディネーター日記",
  description:
    "学校地域連携コーディネーターによる活動日記。地域と学校をつなぐ現場の記録です。",
};

export default async function BlogPage() {
  const posts = await fetchArticlesByCategory("blog", 100);

  return (
    <ArchiveLayout
      label="COORDINATOR'S JOURNAL"
      title="コーディネーター日記"
      description="地域と学校のあいだで考えていたことの記録です。授業づくりの途中で書いています。"
    >
      {posts.length === 0 ? (
        <EmptyState>公開中の日記はありません。</EmptyState>
      ) : (
        <div className="divide-y divide-border-line border-t border-border-line">
          {posts.map((article) => (
            <ArticleRow key={article.slug} article={article} />
          ))}
        </div>
      )}
    </ArchiveLayout>
  );
}
