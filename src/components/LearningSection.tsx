import { fetchArticlesByCategory } from "@/lib/articles";
import ArticleTile from "@/components/ArticleTile";
import { SectionHead } from "@/components/ui";

/* トップページの「学びを、考える。」。
   コーディネーター日記ほど前には出さず、本文カラムの下のほうに置く。
   記事が1本もないときはセクションごと出さない。 */

export default async function LearningSection() {
  const articles = await fetchArticlesByCategory("learning", 3);
  if (articles.length === 0) return null;

  return (
    <section id="learning" className="mt-12 border-t border-border-line">
      <SectionHead
        label="Learning"
        title="学びを、考える。"
        moreHref="/learning"
        moreText="すべて読む"
      />
      <p className="mb-1 text-[13px] leading-[1.7] text-ink-soft">
        教育全般のことや、AIのこと。学校に限らない「学び」について考えたことを書いています。
      </p>
      <div className="grid grid-cols-2 gap-x-3 gap-y-6 border-t border-border-line pt-4 sm:grid-cols-3 sm:gap-x-4">
        {articles.map((article) => (
          <ArticleTile key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
