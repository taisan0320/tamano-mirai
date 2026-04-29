import type { Metadata } from "next";
import Link from "next/link";
import { fetchArticlesByCategory, getArticleUrl } from "@/lib/articles";

export const metadata: Metadata = {
  title: "お知らせ",
  description: "玉野SDGsみらいづくりセンターからのお知らせ・活動報告です。",
};

export default async function NewsPage() {
  const items = await fetchArticlesByCategory("news", 100);

  const byYear = items.reduce<Record<string, typeof items>>((acc, item) => {
    const year = new Date(item.date).getFullYear().toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(item);
    return acc;
  }, {});

  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div>
      <div className="bg-ink py-20">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="section-label text-white/40 mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-white/70 transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-white/60">お知らせ</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            お知らせ
          </h1>
          <p className="text-white/80 text-base max-w-lg leading-relaxed">
            センターからのお知らせ・活動報告です。
          </p>
        </div>
      </div>

      <section className="bg-paper py-16">
        <div className="max-w-3xl mx-auto px-6">

          {items.length === 0 && (
            <div className="text-center py-20 text-ink-muted">
              <p>現在お知らせはありません</p>
            </div>
          )}

          {years.map((year) => (
            <div key={year} className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-black text-ink/15">{year}</span>
                <div className="flex-1 h-px bg-border-line" />
              </div>
              <div className="divide-y divide-border-line border-t border-border-line">
                {byYear[year].map((item) => (
                  <Link
                    key={item.slug}
                    href={getArticleUrl(item)}
                    className="group flex items-start gap-5 py-5 hover:bg-paper-alt transition-colors -mx-4 px-4 rounded"
                  >
                    <div className="shrink-0 section-label text-ink-muted w-20 pt-0.5">
                      {new Date(item.date).toLocaleDateString("ja-JP", { month: "2-digit", day: "2-digit" }).replace("/", ".")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-ink group-hover:text-forest transition-colors leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                    <span className="shrink-0 text-ink/20 group-hover:text-forest transition-colors font-bold pt-0.5">→</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
