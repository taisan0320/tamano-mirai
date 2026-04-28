import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Calendar, User, Tag, ArrowLeft } from "lucide-react";
import { articles, getArticleBySlug, CATEGORY_LABEL, CATEGORY_COLOR } from "@/lib/articles";
import { cn } from "@/lib/utils";
import ArticleCard from "@/components/ArticleCard";

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
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
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const formattedDate = new Date(article.date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const related = articles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 2);

  return (
    <div className="bg-surface">
      {/* Header */}
      <div className="bg-primary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">ホーム</Link>
            <ChevronRight size={12} />
            <Link href="/media" className="hover:text-white transition-colors">ニュース・メディア</Link>
            <ChevronRight size={12} />
            <span className="text-white truncate max-w-[200px]">{article.title}</span>
          </nav>
          <div className="flex items-center gap-2 mb-4">
            <span
              className={cn(
                "text-xs font-semibold px-3 py-1 rounded-full",
                CATEGORY_COLOR[article.category]
              )}
            >
              {CATEGORY_LABEL[article.category]}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug mb-5">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {formattedDate}
            </span>
            {article.author && (
              <span className="flex items-center gap-1.5">
                <User size={13} />
                {article.author}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 sm:p-10 border border-border">
              <p className="text-slate-600 text-base leading-relaxed mb-8 border-l-4 border-accent pl-4 italic">
                {article.excerpt}
              </p>
              <div
                className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-primary prose-h2:text-xl prose-h3:text-lg prose-p:leading-relaxed prose-p:text-slate-700"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(article.body) }}
              />
              {article.tags && article.tags.length > 0 && (
                <div className="mt-10 pt-6 border-t border-border flex flex-wrap gap-2">
                  <Tag size={14} className="text-slate-400 mt-0.5" />
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-surface text-slate-600 px-2.5 py-1 rounded-full border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/media"
              className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-slate-500 hover:text-primary transition-colors"
            >
              <ArrowLeft size={14} />
              一覧に戻る
            </Link>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-white rounded-2xl p-5 border border-border">
              <h2 className="text-sm font-bold text-slate-700 mb-4">関連記事</h2>
              {related.length > 0 ? (
                <div>
                  {related.map((a) => (
                    <ArticleCard key={a.slug} article={a} variant="compact" />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400">関連記事はありません</p>
              )}
            </div>

            <div className="bg-primary rounded-2xl p-5 text-white">
              <h2 className="font-bold mb-2">お問い合わせ</h2>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                この記事についてのご質問や、活動への参加はお気軽にご連絡ください。
              </p>
              <Link
                href="/contact"
                className="block text-center bg-white text-primary text-sm font-semibold py-2.5 rounded-full hover:bg-slate-100 transition-colors"
              >
                お問い合わせ
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
