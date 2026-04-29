import type { Metadata } from "next";
import Link from "next/link";
import { fetchArticlesByCategory, getArticleUrl, CATEGORY_GRADIENT, CATEGORY_BADGE, CATEGORY_LABEL } from "@/lib/articles";

export const metadata: Metadata = {
  title: "まちの人・団体",
  description: "玉野市で活動する人や団体のインタビュー記事。まちを動かす人たちの声を届けます。",
};

export default async function StoriesPage() {
  const [interviews, stories] = await Promise.all([
    fetchArticlesByCategory("interview", 100),
    fetchArticlesByCategory("story", 100),
  ]);
  const all = [...interviews, ...stories].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const featured = all[0];
  const rest = all.slice(1);

  return (
    <div>
      <div className="bg-ocean py-20">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="section-label text-white/50 mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-white/80 transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-white/70">まちの人・団体</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            まちの人・団体
          </h1>
          <p className="text-white/80 text-base max-w-lg leading-relaxed">
            玉野市で活動する人や団体のインタビュー記事です。まちを動かす人たちの声を届けます。
          </p>
        </div>
      </div>

      <section className="bg-paper py-16">
        <div className="max-w-7xl mx-auto px-6">

          {all.length === 0 && (
            <div className="text-center py-20 text-ink-muted">
              <p>現在記事はありません</p>
            </div>
          )}

          {featured && (
            <div className="mb-10">
              <Link
                href={getArticleUrl(featured)}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-2xl card-interactive"
              >
                <div className={`relative min-h-[280px] lg:min-h-[400px] ${CATEGORY_GRADIENT[featured.category]}`}>
                  {featured.thumbnail && (
                    <img
                      src={featured.thumbnail}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/30" />
                </div>
                <div className="bg-white p-8 lg:p-12 flex flex-col justify-center">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-4 w-fit ${CATEGORY_BADGE[featured.category]}`}>
                    {CATEGORY_LABEL[featured.category]}
                  </span>
                  <h2 className="text-2xl font-bold text-ink leading-snug mb-4 group-hover:text-ocean transition-colors line-clamp-3">
                    {featured.title}
                  </h2>
                  <p className="text-sm text-ink-muted leading-relaxed line-clamp-3 mb-6">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-ink-muted">
                    <span>{new Date(featured.date).toLocaleDateString("ja-JP")}</span>
                    {featured.author && <span>{featured.author}</span>}
                  </div>
                  <div className="mt-6 text-sm font-bold text-ocean group-hover:gap-3 transition-all flex items-center gap-2">
                    記事を読む →
                  </div>
                </div>
              </Link>
            </div>
          )}

          {rest.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((article) => (
                <Link
                  key={article.slug}
                  href={getArticleUrl(article)}
                  className="group bg-white border border-border-line rounded-xl overflow-hidden card-interactive flex flex-col"
                >
                  <div className={`h-44 relative ${CATEGORY_GRADIENT[article.category]}`}>
                    {article.thumbnail && (
                      <img
                        src={article.thumbnail}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute bottom-3 left-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${CATEGORY_BADGE[article.category]}`}>
                        {CATEGORY_LABEL[article.category]}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-ink leading-snug mb-2 group-hover:text-ocean transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-ink-muted line-clamp-2 leading-relaxed flex-1">
                      {article.excerpt}
                    </p>
                    <p className="text-xs text-ink-muted mt-3">
                      {new Date(article.date).toLocaleDateString("ja-JP")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
