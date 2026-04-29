import Link from "next/link";
import { Article, CATEGORY_LABEL, CATEGORY_GRADIENT, CATEGORY_BADGE } from "@/lib/articles";

interface Props {
  article: Article;
  variant?: "featured" | "default" | "compact";
}

export default function ArticleCard({ article, variant = "default" }: Props) {
  const formattedDate = new Date(article.date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (variant === "featured") {
    return (
      <Link
        href={`/media/${article.slug}`}
        className="group flex flex-col bg-white border border-border-line card-interactive overflow-hidden rounded-lg"
      >
        <div className={`h-56 ${CATEGORY_GRADIENT[article.category]} relative overflow-hidden`}>
          {article.thumbnail && (
            <img src={article.thumbnail} alt="" className="absolute inset-0 w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-black/15" />
          <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded ${CATEGORY_BADGE[article.category]}`}>
              {CATEGORY_LABEL[article.category]}
            </span>
            <span className="text-white/80 text-xs">{formattedDate}</span>
          </div>
        </div>
        <div className="flex flex-col flex-1 p-6">
          <h2 className="text-xl font-bold text-ink leading-snug mb-3 group-hover:text-ocean transition-colors line-clamp-2">
            {article.title}
          </h2>
          <p className="text-sm text-ink-muted leading-relaxed line-clamp-3 flex-1">
            {article.excerpt}
          </p>
          <p className="mt-5 text-xs text-ink-muted group-hover:text-ocean transition-colors">
            続きを読む →
          </p>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/media/${article.slug}`}
        className="group flex gap-4 items-start py-4 border-b border-border-line last:border-0 hover:opacity-75 transition-opacity"
      >
        <div className={`shrink-0 w-16 h-16 rounded ${CATEGORY_GRADIENT[article.category]} relative overflow-hidden`}>
          {article.thumbnail && (
            <img src={article.thumbnail} alt="" className="absolute inset-0 w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-black/15" />
        </div>
        <div className="flex-1 min-w-0">
          <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded mb-1.5 ${CATEGORY_BADGE[article.category]}`}>
            {CATEGORY_LABEL[article.category]}
          </span>
          <p className="text-sm font-semibold text-ink group-hover:text-ocean line-clamp-2 leading-snug transition-colors">
            {article.title}
          </p>
          <p className="text-xs text-ink-muted mt-1">{formattedDate}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/media/${article.slug}`}
      className="group flex flex-col bg-white border border-border-line card-interactive overflow-hidden rounded-lg"
    >
      <div className={`h-44 ${CATEGORY_GRADIENT[article.category]} relative overflow-hidden`}>
        {article.thumbnail && (
          <img src={article.thumbnail} alt="" className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${CATEGORY_BADGE[article.category]}`}>
            {CATEGORY_LABEL[article.category]}
          </span>
          <span className="text-white/80 text-[10px]">{formattedDate}</span>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-bold text-ink leading-snug mb-2 group-hover:text-ocean transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-ink-muted leading-relaxed line-clamp-2 flex-1">
          {article.excerpt}
        </p>
        <p className="mt-4 text-xs text-ink-muted group-hover:text-ocean transition-colors">
          続きを読む →
        </p>
      </div>
    </Link>
  );
}
