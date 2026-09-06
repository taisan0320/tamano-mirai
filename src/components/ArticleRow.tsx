import Link from "next/link";
import { getArticleUrl, type Article } from "@/lib/articles";
import { formatDate, readingMinutes, authorName } from "@/lib/format";
import { CategoryTag } from "@/components/ui";

/* フィードの1行。左に写真、右に見出し。
   トップページの「最近の動き」と、記事詳細の「関連する記事」で共用する。 */

export default function ArticleRow({
  article,
  showExcerpt = true,
}: {
  article: Article;
  showExcerpt?: boolean;
}) {
  return (
    <Link
      href={getArticleUrl(article)}
      className="card-interactive group -mx-3 flex gap-3 rounded px-3 py-3.5"
    >
      <div className="relative aspect-[1.91/1] w-[120px] shrink-0 overflow-hidden rounded bg-paper-deep sm:w-[200px]">
        {article.thumbnail ? (
          <img
            src={article.thumbnail}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 grad-blog" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 text-[12px] leading-tight text-ink-soft">
          <CategoryTag category={article.category} />
          <span>{formatDate(article.date)}</span>
        </div>
        <h3 className="mt-1.5 text-[14px] font-bold leading-[1.35] text-ink group-hover:text-ocean sm:text-[15px]">
          {article.title}
        </h3>
        {showExcerpt && (
          <p className="mt-1.5 hidden text-[12px] leading-[1.7] text-ink-soft sm:line-clamp-2">
            {article.excerpt}
          </p>
        )}
        <p className="mt-1.5 text-[12px] leading-tight text-ink-soft">
          <span className="font-bold">{authorName(article)}</span>
          <span>・読了 {readingMinutes(article.body)}分</span>
        </p>
      </div>
    </Link>
  );
}
