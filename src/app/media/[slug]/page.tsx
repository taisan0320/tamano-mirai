import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchArticlesByCategory, fetchArticleBySlug, CATEGORY_LABEL, CATEGORY_ROUTE } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

export const revalidate = 60;
export const dynamicParams = true;

const categoryLabelStyle: Record<string, string> = {
  event: "bg-amber-pale text-amber border border-amber/20",
  interview: "bg-ocean-pale text-ocean border border-ocean/20",
  news: "bg-forest-pale text-forest border border-forest/20",
  story: "bg-coral-pale text-coral border border-coral/20",
  blog: "bg-forest-pale text-forest border border-forest/20",
};

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
  };
}

function renderMarkdown(text: string): string {
  return text
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
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

  const allInCategory = await fetchArticlesByCategory(article.category, 10);
  const related = allInCategory.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <div className="bg-paper">
      {/* Header */}
      <div className="bg-ink py-20">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="section-label text-white/40 mb-8 flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-white/70 transition-colors">HOME</Link>
            <span>/</span>
            <Link href="/media" className="hover:text-white/70 transition-colors">NEWS & MEDIA</Link>
            <span>/</span>
            <span className="text-white/60 truncate max-w-[200px]">{article.title}</span>
          </nav>
          <div className="mb-4">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${categoryLabelStyle[article.category]}`}
            >
              {CATEGORY_LABEL[article.category]}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 max-w-4xl leading-snug">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 section-label text-white/60">
            <span>{formattedDate}</span>
            {article.author && <span>{article.author}</span>}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <article className="lg:col-span-8">
            <div className="border-l-4 border-ocean pl-6 mb-10">
              <p className="text-ink-soft text-base leading-relaxed italic">
                {article.excerpt}
              </p>
            </div>
            <div
              className="prose-article"
              dangerouslySetInnerHTML={{ __html: article.isHtml ? (article.body || "") : renderMarkdown(article.body || "") }}
            />
            {article.tags && article.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border-line flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs border border-border-line text-ink-muted px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <Link
              href={CATEGORY_ROUTE[article.category]}
              className="inline-flex items-center gap-2 mt-10 section-label text-ink-muted hover:text-ink transition-colors"
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
