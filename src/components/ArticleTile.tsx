import Link from "next/link";
import { getArticleUrl, type Article } from "@/lib/articles";
import { formatDate, readingMinutes, authorName } from "@/lib/format";

/* 記事のタイル。写真を上、見出しを下に置き、2〜3列の格子で並べる。
   枠線や影は付けず、写真と文字だけで区切る（NewsPicks型の決め事）。 */

/** 見出し先頭の連載名。セクション名と重複する場所では省略して表示する */
const SERIES_PREFIX = /^\s*(【コーディネーター日記】|コーディネーター日記\s*[｜|]\s*)/;

export default function ArticleTile({
  article,
  hideSeriesPrefix = false,
}: {
  article: Article;
  /** 見出し先頭の「【コーディネーター日記】」などを省く */
  hideSeriesPrefix?: boolean;
}) {
  const title = hideSeriesPrefix
    ? article.title.replace(SERIES_PREFIX, "")
    : article.title;

  return (
    <Link href={getArticleUrl(article)} className="group flex flex-col">
      <div className="relative aspect-[1.91/1] w-full overflow-hidden rounded bg-paper-deep">
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
      <span className="mt-2 block text-[11px] leading-tight text-ink-soft">
        {formatDate(article.date)}
      </span>
      <h3 className="mt-1 line-clamp-3 text-[13px] font-bold leading-[1.45] text-ink group-hover:text-ocean sm:text-[14px]">
        {title}
      </h3>
      <span className="mt-auto block pt-1.5 text-[11px] leading-tight text-ink-soft">
        {authorName(article)}・読了 {readingMinutes(article.body)}分
      </span>
    </Link>
  );
}
