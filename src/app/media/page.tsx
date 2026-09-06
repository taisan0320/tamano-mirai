export const revalidate = 60;

import type { Metadata } from "next";
import Link from "next/link";
import {
  fetchLatestArticles,
  fetchArticlesByCategory,
  CATEGORY_LABEL,
  type Category,
} from "@/lib/articles";
import ArticleRow from "@/components/ArticleRow";
import {
  AboutCard,
  PickupCard,
  MembershipCard,
  DocumentsCard,
} from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "すべての記事",
  description:
    "玉野SDGsみらいづくりセンターのイベント情報・動く人たち・コーディネーター日記・お知らせをまとめて読めます。",
};

const categories: { key: Category | "all"; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "event", label: CATEGORY_LABEL.event },
  { key: "blog", label: CATEGORY_LABEL.blog },
  { key: "news", label: CATEGORY_LABEL.news },
];

export default async function MediaPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category: categoryParam, q } = await searchParams;
  const activeCategory = (categoryParam || "all") as Category | "all";
  const keyword = (q || "").trim();

  const base =
    activeCategory === "all"
      ? await fetchLatestArticles(100)
      : await fetchArticlesByCategory(activeCategory, 100);

  const articles = keyword
    ? base.filter((article) =>
        `${article.title} ${article.excerpt} ${(article.tags || []).join(" ")}`
          .toLowerCase()
          .includes(keyword.toLowerCase())
      )
    : base;

  const pickups = await fetchLatestArticles(5);

  return (
    <div className="flex flex-col">
      {/* ── カテゴリの絞り込み ── */}
      <div className="border-b border-border-line bg-paper">
        <div className="no-scrollbar mx-auto flex max-w-[1232px] gap-2 overflow-x-auto px-4 py-2.5">
          {categories.map((c) => {
            const isActive = activeCategory === c.key;
            return (
              <Link
                key={c.key}
                href={c.key === "all" ? "/media" : `/media?category=${c.key}`}
                className={`shrink-0 rounded-full border px-3 py-1 text-[12px] ${
                  isActive
                    ? "border-ink bg-ink text-white"
                    : "border-border-line text-ink-soft hover:border-ink hover:text-ink"
                }`}
              >
                {c.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1232px] grid-cols-1 items-start gap-x-12 px-4 pb-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <main className="min-w-0">
          <nav className="flex flex-wrap items-center gap-1.5 pt-4 text-[11px] text-ink-soft">
            <Link href="/" className="hover:text-ocean">
              HOME
            </Link>
            <span className="text-ink-muted">/</span>
            <span>すべての記事</span>
          </nav>

          <div className="pb-1 pt-2">
            <p className="text-[10px] leading-tight tracking-[.12em] text-ink-muted">
              ALL ARTICLES
            </p>
            <h1 className="my-2 text-[24px] font-bold leading-[1.25] text-ink sm:text-[28px]">
              {activeCategory === "all"
                ? "すべての記事"
                : CATEGORY_LABEL[activeCategory]}
            </h1>
            <p className="text-[14px] leading-[1.8] text-ink-soft">
              イベント情報・動く人たち・コーディネーター日記・お知らせを、日付順にまとめています。
            </p>
          </div>

          {/* ── キーワード検索 ── */}
          <form
            action="/media"
            method="get"
            className="mt-4 flex gap-2"
            id="search"
          >
            {activeCategory !== "all" && (
              <input type="hidden" name="category" value={activeCategory} />
            )}
            <input
              type="search"
              name="q"
              defaultValue={keyword}
              placeholder="キーワードで記事を探す"
              className="min-w-0 flex-1 rounded border border-border-line px-3 py-2.5 text-[14px] text-ink placeholder:text-ink-muted focus:border-ink focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded bg-ocean px-4 py-2.5 text-[14px] font-bold leading-none text-white hover:bg-ocean-dark"
            >
              検索
            </button>
          </form>

          {keyword && (
            <p className="mt-3 text-[13px] text-ink-soft">
              「{keyword}」の検索結果：{articles.length}件
              <Link href="/media" className="ml-2 font-bold text-ocean hover:underline">
                検索を解除
              </Link>
            </p>
          )}

          {/* ── 記事一覧 ── */}
          {articles.length === 0 ? (
            <p className="mt-8 rounded border border-border-line py-12 text-center text-[14px] text-ink-soft">
              該当する記事がありません。
            </p>
          ) : (
            <div className="mt-4 divide-y divide-border-line border-t border-border-line">
              {articles.map((article) => (
                <ArticleRow key={article.slug} article={article} />
              ))}
            </div>
          )}
        </main>

        <aside className="min-w-0 pb-8 pt-4">
          <div className="lg:sticky lg:top-[88px]">
            <AboutCard />
            <PickupCard articles={pickups} />
            <MembershipCard />
            <DocumentsCard />
          </div>
        </aside>
      </div>
    </div>
  );
}
