import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { Article, CATEGORY_LABEL, CATEGORY_COLOR } from "@/lib/articles";
import { cn } from "@/lib/utils";

interface Props {
  article: Article;
  variant?: "default" | "compact";
}

export default function ArticleCard({ article, variant = "default" }: Props) {
  const formattedDate = new Date(article.date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (variant === "compact") {
    return (
      <Link
        href={`/media/${article.slug}`}
        className="flex gap-4 items-start group py-4 border-b border-border last:border-0 hover:opacity-80 transition-opacity"
      >
        <div className="shrink-0 mt-1">
          <span
            className={cn(
              "text-[11px] font-semibold px-2 py-0.5 rounded",
              CATEGORY_COLOR[article.category]
            )}
          >
            {CATEGORY_LABEL[article.category]}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-800 group-hover:text-primary line-clamp-2 transition-colors">
            {article.title}
          </p>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
            <Calendar size={11} />
            {formattedDate}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/media/${article.slug}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-shadow"
    >
      <div className="h-44 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
        <span className="text-4xl opacity-30">📰</span>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={cn(
              "text-[11px] font-semibold px-2.5 py-0.5 rounded-full",
              CATEGORY_COLOR[article.category]
            )}
          >
            {CATEGORY_LABEL[article.category]}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Calendar size={11} />
            {formattedDate}
          </span>
        </div>
        <h3 className="font-bold text-slate-800 leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1">
          {article.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary">
          続きを読む <ArrowRight size={13} />
        </div>
      </div>
    </Link>
  );
}
