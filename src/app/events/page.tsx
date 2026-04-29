import type { Metadata } from "next";
import Link from "next/link";
import { fetchArticlesByCategory, getArticleUrl } from "@/lib/articles";

export const metadata: Metadata = {
  title: "イベント情報",
  description: "玉野市で開催されるイベント・お祭り・体験プログラムの最新情報をお届けします。",
};

export default async function EventsPage() {
  const events = await fetchArticlesByCategory("event", 100);

  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.date) >= now);
  const past = events.filter((e) => new Date(e.date) < now);

  return (
    <div>
      <div className="bg-amber py-20">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="section-label text-white/50 mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-white/80 transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-white/70">イベント情報</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            イベント情報
          </h1>
          <p className="text-white/80 text-base max-w-lg leading-relaxed">
            玉野市で開催されるイベント・お祭り・体験プログラムの最新情報です。
          </p>
        </div>
      </div>

      <section className="bg-paper py-16">
        <div className="max-w-4xl mx-auto px-6">

          {upcoming.length > 0 && (
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-amber" />
                <h2 className="text-lg font-bold text-ink">開催予定・受付中</h2>
              </div>
              <div className="divide-y divide-border-line border-t border-border-line">
                {upcoming.map((article) => {
                  const d = new Date(article.date);
                  return (
                    <Link
                      key={article.slug}
                      href={getArticleUrl(article)}
                      className="group flex items-start gap-5 py-6 hover:bg-paper-alt transition-colors -mx-4 px-4 rounded"
                    >
                      <div className="shrink-0 w-14 text-center pt-0.5">
                        <p className="text-2xl font-bold text-amber leading-none">{d.getDate()}</p>
                        <p className="section-label text-ink-muted mt-0.5">
                          {d.toLocaleDateString("ja-JP", { month: "short" })}
                        </p>
                        <p className="text-[10px] text-ink-muted">
                          {d.toLocaleDateString("ja-JP", { year: "numeric" }).replace("年", "")}
                        </p>
                      </div>
                      <div className="w-px self-stretch bg-border-line shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-ink group-hover:text-amber transition-colors leading-snug mb-1.5 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-ink-muted line-clamp-2 leading-relaxed">{article.excerpt}</p>
                      </div>
                      <span className="shrink-0 text-ink/30 group-hover:text-amber transition-colors font-bold pt-1">→</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {past.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-ink-muted" />
                <h2 className="text-lg font-bold text-ink">開催済みのイベント</h2>
              </div>
              <div className="divide-y divide-border-line border-t border-border-line">
                {past.map((article) => {
                  const d = new Date(article.date);
                  return (
                    <Link
                      key={article.slug}
                      href={getArticleUrl(article)}
                      className="group flex items-start gap-5 py-5 hover:bg-paper-alt transition-colors -mx-4 px-4 rounded"
                    >
                      <div className="shrink-0 w-14 text-center pt-0.5">
                        <p className="text-xl font-bold text-ink-muted leading-none">{d.getDate()}</p>
                        <p className="section-label text-ink-muted mt-0.5">
                          {d.toLocaleDateString("ja-JP", { month: "short" })}
                        </p>
                      </div>
                      <div className="w-px self-stretch bg-border-line shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-ink-soft group-hover:text-ink transition-colors leading-snug line-clamp-1 mb-1">
                          {article.title}
                        </h3>
                        <p className="text-sm text-ink-muted line-clamp-1 leading-relaxed">{article.excerpt}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {events.length === 0 && (
            <div className="text-center py-20 text-ink-muted">
              <p>現在イベント情報はありません</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
