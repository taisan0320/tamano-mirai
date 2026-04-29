import type { Metadata } from "next";
import Link from "next/link";
import { fetchArticlesByCategory, getArticleUrl } from "@/lib/articles";

export const metadata: Metadata = {
  title: "ボランティア募集",
  description: "玉野SDGsみらいづくりセンターのボランティア募集情報です。一緒に玉野のまちづくりに関わりませんか。",
};

export default async function JoinPage() {
  const posts = await fetchArticlesByCategory("volunteer", 50);

  return (
    <div>
      <div className="bg-coral py-20">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="section-label text-white/50 mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-white/80 transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-white/70">ボランティア募集</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            ボランティア募集
          </h1>
          <p className="text-white/80 text-base max-w-lg leading-relaxed">
            玉野のまちづくりに、あなたの力を貸してください。
            センターの活動を一緒に支えてくれるボランティアを随時募集しています。
          </p>
        </div>
      </div>

      <section className="bg-paper py-16">
        <div className="max-w-3xl mx-auto px-6">

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-ink-muted mb-2">現在、募集中のボランティアはありません。</p>
              <p className="text-sm text-ink-muted mb-10">
                新しい募集情報はSNSやお知らせでご案内します。
              </p>
              <Link
                href="/contact"
                className="inline-block bg-coral text-white text-sm font-bold px-6 py-3 rounded hover:opacity-90 transition-opacity"
              >
                参加の意思を伝える →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-border-line border-t border-border-line">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={getArticleUrl(post)}
                  className="group flex gap-6 py-8 hover:bg-paper-alt transition-colors -mx-4 px-4 rounded"
                >
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-ink group-hover:text-coral transition-colors leading-snug mb-2 text-lg line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-ink-muted leading-relaxed line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                    <p className="text-xs text-ink-muted">
                      {new Date(post.date).toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  </div>
                  <div className="shrink-0 text-ink/20 group-hover:text-coral transition-colors font-bold pt-1">
                    →
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-16 pt-10 border-t border-border-line">
            <h2 className="font-bold text-ink mb-3">参加について</h2>
            <p className="text-sm text-ink-muted leading-relaxed mb-6">
              特別なスキルや経験は必要ありません。玉野のまちに関わりたいという気持ちが一番大切です。
              まずはお気軽にお問い合わせください。
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-coral text-white text-sm font-bold px-6 py-3 rounded hover:opacity-90 transition-opacity"
            >
              お問い合わせ →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
