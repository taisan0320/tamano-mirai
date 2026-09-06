import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  fetchArticlesByCategory,
  fetchArticleBySlug,
  fetchLatestArticles,
  CATEGORY_LABEL,
  CATEGORY_ROUTE,
  getArticleUrl,
} from "@/lib/articles";
import ArticleRow from "@/components/ArticleRow";
import { CategoryTag, SectionHead, Avatar } from "@/components/ui";
import { formatDate, readingMinutes, authorName } from "@/lib/format";

export const revalidate = 60;
export const dynamicParams = true;

const BASE_URL = "https://npo-tamano-mirai.com";

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

  const name = authorName(article);
  const minutes = readingMinutes(article.body);
  const isInterview = article.category === "interview" || article.category === "story";

  const [sameCategory, latest] = await Promise.all([
    fetchArticlesByCategory(article.category, 10),
    fetchLatestArticles(6),
  ]);

  const sorted = [...sameCategory].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const currentIndex = sorted.findIndex((a) => a.slug === article.slug);
  const newerArticle = currentIndex > 0 ? sorted[currentIndex - 1] : null;
  const olderArticle =
    currentIndex >= 0 && currentIndex < sorted.length - 1
      ? sorted[currentIndex + 1]
      : null;
  const related = sorted.filter((a) => a.slug !== article.slug).slice(0, 3);
  const pickups = latest.filter((a) => a.slug !== article.slug).slice(0, 3);

  const shareUrl = `${BASE_URL}/media/${article.slug}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    article.title
  )}&url=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="mx-auto grid w-full max-w-[1232px] grid-cols-1 items-start gap-x-12 px-4 pb-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <main className="min-w-0">
        {/* ── パンくず ── */}
        <nav className="flex flex-wrap items-center gap-1.5 pt-4 text-[11px] text-ink-soft">
          <Link href="/" className="hover:text-ocean">
            HOME
          </Link>
          <span className="text-ink-muted">/</span>
          <Link href={CATEGORY_ROUTE[article.category]} className="hover:text-ocean">
            {CATEGORY_LABEL[article.category]}
          </Link>
          <span className="text-ink-muted">/</span>
          <span className="truncate">{article.title}</span>
        </nav>

        <article className="pb-6 pt-2">
          <div className="flex flex-wrap items-center gap-2 text-[12px] leading-tight text-ink-soft">
            <CategoryTag category={article.category} />
            <span>{formatDate(article.date)}</span>
          </div>

          {isInterview ? (
            <>
              <h1 className="my-3 text-[22px] font-bold leading-[1.5] text-ink sm:text-[28px]">
                <span className="text-ink-muted">❝ </span>
                {article.title}
                <span className="text-ink-muted"> ❞</span>
              </h1>
              <p className="text-[14px] leading-[1.7] text-ink-soft">
                {article.excerpt}
              </p>
            </>
          ) : (
            <h1 className="mb-3 mt-2.5 text-[24px] font-bold leading-[1.25] text-ink sm:text-[28px]">
              {article.title}
            </h1>
          )}

          {/* ── 署名 ── */}
          <div className="mt-3.5 flex items-center gap-2.5 border-t border-border-line pt-3.5">
            <Avatar name={name} />
            <span className="min-w-0">
              <span className="block text-[13px] font-bold leading-tight text-ink">
                {name}
              </span>
              <span className="mt-[3px] block text-[12px] leading-tight text-ink-soft">
                玉野SDGsみらいづくりセンター
              </span>
            </span>
            <span className="ml-auto shrink-0 text-[12px] text-ink-soft">
              読了 {minutes}分
            </span>
          </div>

          {/* ── 本文冒頭の写真 ── */}
          {article.thumbnail && (
            <div className="my-4 overflow-hidden rounded bg-paper-deep">
              <img
                src={article.thumbnail}
                alt=""
                className="aspect-[1.91/1] w-full object-cover"
              />
            </div>
          )}

          {/* ── 本文 ── */}
          <div
            className={`prose-article ${isInterview ? "prose-interview" : ""}`}
            dangerouslySetInnerHTML={{
              __html: article.isHtml
                ? article.body || ""
                : renderMarkdown(article.body || ""),
            }}
          />

          {/* ── タグ ── */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-1.5">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm border border-border-line px-2 py-1 text-[11px] leading-none text-ink-soft"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* ── シェア ── */}
          <div className="my-6 flex items-center gap-2 border-y border-border-line py-3.5">
            <span className="text-[11px] tracking-[.12em] text-ink-muted">SHARE</span>
            <a
              href={twitterShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-border-line px-3 py-2 text-[12px] font-bold text-ink hover:bg-[rgba(34,34,34,.05)]"
            >
              X でシェア
            </a>
          </div>

          {/* ── 執筆者 ── */}
          <div className="my-6 flex gap-3.5 rounded border border-border-line p-4">
            <Avatar name={name} size={56} />
            <div className="min-w-0">
              <p className="text-[14px] font-bold leading-tight text-ink">{name}</p>
              <p className="mt-1 text-[12px] leading-tight text-ink-soft">
                玉野SDGsみらいづくりセンター
              </p>
              <p className="mt-2 text-[12px] leading-[1.7] text-ink-soft">
                市民・団体・企業・行政をつなぎ、相談・伴走・情報発信で地域の活動を支えています。
              </p>
              <Link
                href={CATEGORY_ROUTE[article.category]}
                className="mt-2 inline-block text-[12px] font-bold text-ocean hover:underline"
              >
                {CATEGORY_LABEL[article.category]}の記事をすべて見る →
              </Link>
            </div>
          </div>

          {/* ── 前後の記事 ── */}
          {(olderArticle || newerArticle) && (
            <div className="my-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {olderArticle && (
                <Link
                  href={getArticleUrl(olderArticle)}
                  className="rounded border border-border-line px-3.5 py-3 hover:bg-[rgba(34,34,34,.05)]"
                >
                  <span className="block text-[11px] leading-tight text-ink-muted">
                    ← 前の記事
                  </span>
                  <span className="mt-1.5 block text-[13px] font-bold leading-[1.5] text-ink">
                    {olderArticle.title}
                  </span>
                </Link>
              )}
              {newerArticle && (
                <Link
                  href={getArticleUrl(newerArticle)}
                  className="rounded border border-border-line px-3.5 py-3 hover:bg-[rgba(34,34,34,.05)]"
                >
                  <span className="block text-[11px] leading-tight text-ink-muted">
                    次の記事 →
                  </span>
                  <span className="mt-1.5 block text-[13px] font-bold leading-[1.5] text-ink">
                    {newerArticle.title}
                  </span>
                </Link>
              )}
            </div>
          )}
        </article>

        {/* ── 関連する記事 ── */}
        {related.length > 0 && (
          <section className="border-t border-border-line">
            <SectionHead
              label="Related"
              title="関連する記事"
              moreHref={CATEGORY_ROUTE[article.category]}
              moreText="一覧を見る"
            />
            <div className="divide-y divide-border-line border-t border-border-line">
              {related.map((a) => (
                <ArticleRow key={a.slug} article={a} showExcerpt={false} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* ── サイドバー ── */}
      <aside className="min-w-0 pb-8 pt-4">
        <div className="lg:sticky lg:top-[88px]">
          <div className="mb-4 rounded border border-border-line p-4">
            <h2 className="mb-1">
              <span className="section-label block text-ink-muted">Writer</span>
              <span className="mt-1 block text-[14px] font-bold text-ink">
                この記事を書いた人
              </span>
            </h2>
            <div className="mt-3 flex items-center gap-2.5">
              <Avatar name={name} />
              <span className="min-w-0">
                <span className="block text-[13px] font-bold leading-tight text-ink">
                  {name}
                </span>
                <span className="mt-[3px] block text-[12px] leading-tight text-ink-soft">
                  玉野SDGsみらいづくりセンター
                </span>
              </span>
            </div>
          </div>

          {pickups.length > 0 && (
            <div className="mb-4 rounded border border-border-line p-4">
              <h2 className="mb-1">
                <span className="section-label block text-ink-muted">
                  Editors&apos; Pick
                </span>
                <span className="mt-1 block text-[14px] font-bold text-ink">
                  今週のピックアップ
                </span>
              </h2>
              <ol className="mt-2 divide-y divide-border-line">
                {pickups.map((a, index) => (
                  <li key={a.slug}>
                    <Link href={getArticleUrl(a)} className="group flex gap-2.5 py-2.5">
                      <span className="w-[18px] shrink-0 text-[16px] font-bold leading-tight text-ocean">
                        {index + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[13px] font-bold leading-[1.4] text-ink group-hover:text-ocean">
                          {a.title}
                        </span>
                        <span className="mt-1.5 block text-[11px] leading-tight text-ink-soft">
                          {CATEGORY_LABEL[a.category]}・読了{" "}
                          {readingMinutes(a.body)}分
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="rounded border border-membership p-4">
            <h2 className="mb-1">
              <span className="section-label block text-membership">Membership</span>
              <span className="mt-1 block text-[14px] font-bold leading-tight text-ink">
                入会・寄付でセンターを支える
              </span>
            </h2>
            <p className="mt-2 text-[12px] leading-[1.7] text-ink-soft">
              会員・寄付として、玉野のまちづくりを継続的に支えていただけませんか。
            </p>
            <Link
              href="/join"
              className="mt-3 block rounded bg-membership py-2.5 text-center text-[14px] font-bold leading-none text-white hover:opacity-90"
            >
              入会・寄付について
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
