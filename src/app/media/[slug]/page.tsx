import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  fetchArticlesByCategory,
  fetchArticleBySlug,
  CATEGORY_LABEL,
  CATEGORY_ROUTE,
  CATEGORY_GRADIENT,
} from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

export const revalidate = 60;
export const dynamicParams = true;

const BASE_URL = "https://npo-tamano-mirai.com";

const categoryBadgeStyle: Record<string, string> = {
  event: "bg-amber-pale text-amber border border-amber/20",
  interview: "bg-ocean-pale text-ocean border border-ocean/20",
  news: "bg-forest-pale text-forest border border-forest/20",
  story: "bg-coral-pale text-coral border border-coral/20",
  blog: "bg-forest-pale text-forest border border-forest/20",
  explore: "bg-ocean-pale text-ocean border border-ocean/20",
  volunteer: "bg-coral-pale text-coral border border-coral/20",
};

function estimateReadingTime(text: string): number {
  return Math.max(1, Math.ceil(text.replace(/<[^>]+>/g, "").length / 400));
}

function getInitial(name: string): string {
  return name.slice(0, 1);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);
  if (!article) return { title: "記事が見つかりません" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      ...(article.thumbnail ? { images: [article.thumbnail] } : {}),
    },
  };
}

function renderMarkdown(text: string): string {
  return text
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^---$/gm, "<hr />")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^/, "<p>")
    .replace(/$/, "</p>");
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);
  if (!article) notFound();

  const formattedDate = new Date(article.date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const readingTime = estimateReadingTime(article.body || "");

  const allInCategory = await fetchArticlesByCategory(article.category, 10);
  const sorted = [...allInCategory].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const currentIndex = sorted.findIndex((a) => a.slug === article.slug);
  const newerArticle = currentIndex > 0 ? sorted[currentIndex - 1] : null;
  const olderArticle = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null;
  const related = sorted.filter((a) => a.slug !== article.slug).slice(0, 2);

  const shareUrl = `${BASE_URL}/media/${article.slug}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="bg-paper">
      {/* Hero Header */}
      <div
        className={`relative ${CATEGORY_GRADIENT[article.category]} min-h-[360px] flex items-end overflow-hidden`}
      >
        {article.thumbnail && (
          <img
            src={article.thumbnail}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/10" />

        <div className="relative max-w-7xl mx-auto px-6 pb-12 pt-28 w-full">
          <nav className="section-label text-white/50 mb-6 flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-white/80 transition-colors">
              HOME
            </Link>
            <span>/</span>
            <Link href="/media" className="hover:text-white/80 transition-colors">
              NEWS &amp; MEDIA
            </Link>
            <span>/</span>
            <span className="text-white/60 truncate max-w-[200px]">{article.title}</span>
          </nav>

          <div className="mb-4">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${categoryBadgeStyle[article.category]}`}
            >
              {CATEGORY_LABEL[article.category]}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-5 max-w-4xl leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-white/70 text-sm">
            <span>{formattedDate}</span>
            {article.author && (
              <>
                <span className="opacity-40">｜</span>
                <span>{article.author}</span>
              </>
            )}
            <span className="opacity-40">｜</span>
            <span>約{readingTime}分で読めます</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <article className="lg:col-span-8">
            {/* Lead excerpt */}
            <div className="border-l-4 border-ocean pl-6 mb-10 bg-ocean-pale/30 py-4 pr-4 rounded-r-lg">
              <p className="text-ink-soft text-base leading-relaxed italic">
                {article.excerpt}
              </p>
            </div>

            {/* Article body */}
            <div
              className="prose-article"
              dangerouslySetInnerHTML={{
                __html: article.isHtml
                  ? article.body || ""
                  : renderMarkdown(article.body || ""),
              }}
            />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border-line flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs border border-border-line text-ink-muted px-3 py-1 rounded-full hover:border-ocean hover:text-ocean transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author block */}
            {article.author && (
              <div className="mt-10 pt-8 border-t border-border-line flex items-center gap-5">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shrink-0 text-white ${CATEGORY_GRADIENT[article.category]}`}
                >
                  {getInitial(article.author)}
                </div>
                <div>
                  <p className="section-label text-ink-muted mb-1">著者</p>
                  <p className="font-bold text-ink text-lg">{article.author}</p>
                </div>
              </div>
            )}

            {/* Share */}
            <div className="mt-8 flex items-center gap-4">
              <span className="section-label text-ink-muted">SHARE</span>
              <a
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm border border-border-line text-ink-muted px-4 py-2 rounded-full hover:border-ink hover:text-ink transition-colors"
              >
                𝕏 でシェア
              </a>
            </div>

            {/* Prev / Next navigation */}
            {(olderArticle || newerArticle) && (
              <div className="mt-10 pt-8 border-t border-border-line grid grid-cols-2 gap-4">
                {olderArticle ? (
                  <Link
                    href={`/media/${olderArticle.slug}`}
                    className="group flex flex-col gap-1 p-4 border border-border-line rounded-xl hover:border-ocean transition-colors"
                  >
                    <span className="section-label text-ink-muted group-hover:text-ocean transition-colors">
                      ← 前の記事
                    </span>
                    <span className="text-sm font-semibold text-ink line-clamp-2 leading-snug group-hover:text-ocean transition-colors">
                      {olderArticle.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
                {newerArticle ? (
                  <Link
                    href={`/media/${newerArticle.slug}`}
                    className="group flex flex-col gap-1 p-4 border border-border-line rounded-xl hover:border-ocean transition-colors text-right"
                  >
                    <span className="section-label text-ink-muted group-hover:text-ocean transition-colors">
                      次の記事 →
                    </span>
                    <span className="text-sm font-semibold text-ink line-clamp-2 leading-snug group-hover:text-ocean transition-colors">
                      {newerArticle.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            )}

            <Link
              href={CATEGORY_ROUTE[article.category]}
              className="inline-flex items-center gap-2 mt-8 section-label text-ink-muted hover:text-ink transition-colors"
            >
              ← 一覧に戻る
            </Link>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {related.length > 0 && (
              <div className="border border-border-line bg-white p-6 rounded-xl">
                <h2 className="section-label text-ink-muted mb-4">RELATED ARTICLES</h2>
                <div>
                  {related.map((a) => (
                    <ArticleCard key={a.slug} article={a} variant="compact" />
                  ))}
                </div>
              </div>
            )}

            <div className="bg-ocean p-6 rounded-xl">
              <h2 className="font-bold text-white mb-2">お問い合わせ</h2>
              <p className="text-sm text-white/70 mb-5 leading-relaxed">
                この記事についてのご質問や、活動への参加はお気軽にご連絡ください。
              </p>
              <Link
                href="/contact"
                className="block text-center bg-white text-ocean text-sm font-bold py-3 rounded-full hover:bg-paper transition-colors"
              >
                お問い合わせ →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
