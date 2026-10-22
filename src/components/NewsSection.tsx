import Link from "next/link";
import { fetchArticlesByCategory, getArticleUrl, type Article } from "@/lib/articles";
import { formatDate } from "@/lib/format";

function NewsBadge({ article }: { article: Article }) {
  const isPress = article.tags?.includes("プレスリリース");
  if (isPress) {
    return (
      <span className="inline-flex shrink-0 items-center rounded px-2.5 py-1 text-[11px] font-bold leading-tight tracking-wide bg-forest text-paper">
        プレスリリース
      </span>
    );
  }
  return (
    <span className="inline-flex shrink-0 items-center rounded px-2.5 py-1 text-[11px] font-bold leading-tight tracking-wide bg-accent text-forest">
      お知らせ
    </span>
  );
}

export default async function NewsSection() {
  const items = await fetchArticlesByCategory("news", 5);

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-[1232px] px-4 sm:px-6">
        {/* ヘッダー */}
        <div className="mb-6 flex items-end justify-between gap-4 border-b border-border-line pb-3">
          <div className="leading-none">
            <span className="section-label block text-ink-muted">05</span>
            <h2 className="mt-1.5 text-[18px] font-bold text-ink sm:text-[20px]">NEWS</h2>
            <p className="mt-1 text-[13px] text-ink-soft">お知らせ・プレスリリース</p>
          </div>
        </div>

        {/* 記事リスト */}
        <div className="divide-y divide-border-line">
          {items.map((article) => (
            <Link
              key={article.slug}
              href={getArticleUrl(article)}
              className="group flex items-center gap-4 py-4 transition-opacity hover:opacity-70 sm:gap-6"
            >
              {/* 日付 */}
              <span className="w-[88px] shrink-0 text-[13px] tabular-nums text-ink-soft">
                {formatDate(article.date).replace(/-/g, ".")}
              </span>

              {/* バッジ */}
              <div className="w-[96px] shrink-0">
                <NewsBadge article={article} />
              </div>

              {/* タイトル */}
              <span className="min-w-0 flex-1 text-[14px] font-bold leading-snug text-ink group-hover:text-ocean sm:text-[15px]">
                {article.title}
              </span>

              {/* 矢印 */}
              <span className="shrink-0 text-[18px] text-ink-soft transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          ))}
        </div>

        {/* VIEW ALL */}
        <div className="mt-8 border-t border-border-line pt-6">
          <Link
            href="/news"
            className="text-[13px] font-bold tracking-widest text-ink hover:text-ocean"
          >
            VIEW ALL NEWS →
          </Link>
        </div>
      </div>
    </section>
  );
}
