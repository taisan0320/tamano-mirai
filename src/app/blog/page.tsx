import type { Metadata } from "next";
import Link from "next/link";
import { fetchArticlesByCategory, getArticleUrl } from "@/lib/articles";

export const metadata: Metadata = {
  title: "コーディネーター日記",
  description: "学校地域連携コーディネーターによる活動日記。地域と学校をつなぐ現場の記録です。",
};

export default async function BlogPage() {
  const posts = await fetchArticlesByCategory("blog", 100);

  return (
    <div>
      <div className="bg-forest py-20">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="section-label text-white/50 mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-white/80 transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-white/70">コーディネーター日記</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            コーディネーター日記
          </h1>
          <p className="text-white/80 text-base max-w-lg leading-relaxed">
            学校地域連携コーディネーターによる活動日記。地域と学校をつなぐ現場の記録です。
          </p>
        </div>
      </div>

      <section className="bg-paper py-16">
        <div className="max-w-3xl mx-auto px-6">

          {posts.length === 0 && (
            <div className="text-center py-20 text-ink-muted">
              <p>現在記事はありません</p>
            </div>
          )}

          <div className="space-y-0 divide-y divide-border-line border-t border-border-line">
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                href={getArticleUrl(post)}
                className="group flex gap-6 py-8 hover:bg-paper-alt transition-colors -mx-4 px-4 rounded"
              >
                <div className="shrink-0 pt-1">
                  <span className="section-label text-ink/20 text-lg font-black w-8 inline-block text-right">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-ink group-hover:text-forest transition-colors leading-snug mb-2 text-lg line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-ink-muted leading-relaxed line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-ink-muted">
                    <span>{new Date(post.date).toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" })}</span>
                    {post.author && (
                      <>
                        <span className="text-border-line">|</span>
                        <span>{post.author}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="shrink-0 text-ink/20 group-hover:text-forest transition-colors font-bold pt-1">
                  →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
