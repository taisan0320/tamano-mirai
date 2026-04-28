import Link from "next/link";
import {
  fetchLatestArticles,
  fetchArticlesByCategory,
  CATEGORY_LABEL,
} from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

const heroCategoryGradient: Record<string, string> = {
  event: "grad-event",
  interview: "grad-interview",
  news: "grad-news",
  story: "grad-story",
};

const heroCategoryBadge: Record<string, string> = {
  event: "bg-amber-pale text-amber border border-amber/30",
  interview: "bg-ocean-pale text-ocean border border-ocean/30",
  news: "bg-forest-pale text-forest border border-forest/30",
  story: "bg-coral-pale text-coral border border-coral/30",
};

const categoryLinks = [
  { href: "/media", label: "すべて", style: "bg-ink text-white hover:bg-ink-soft" },
  { href: "/media?category=event", label: "イベント情報", style: "bg-amber-pale text-amber border border-amber/20 hover:bg-amber/10" },
  { href: "/media?category=interview", label: "インタビュー", style: "bg-ocean-pale text-ocean border border-ocean/20 hover:bg-ocean/10" },
  { href: "/media?category=story", label: "玉野の話", style: "bg-coral-pale text-coral border border-coral/20 hover:bg-coral/10" },
  { href: "/media?category=news", label: "お知らせ", style: "bg-forest-pale text-forest border border-forest/20 hover:bg-forest/10" },
];

export default async function Home() {
  const [latestArticles, interviewArticles, eventArticles] = await Promise.all([
    fetchLatestArticles(6),
    fetchArticlesByCategory("interview", 3),
    fetchArticlesByCategory("event", 3),
  ]);

  return (
    <div className="flex flex-col">

      {/* ── HERO ── */}
      <section className="overflow-hidden lg:grid lg:grid-cols-[5fr_7fr] lg:min-h-[580px]">

        {/* Left: Identity column */}
        <div className="bg-ink px-8 md:px-14 lg:px-16 py-20 md:py-28 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/60 text-[11px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-8 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-ocean inline-block" />
            玉野のいまと未来を、ともに
          </div>
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-white leading-[1.2] mb-6">
            玉野から、<br />
            <span className="text-ocean">届ける</span><br />
            メディア。
          </h1>
          <p className="text-white/55 text-sm leading-relaxed mb-10 max-w-xs">
            瀬戸内海に面した玉野市の人・まち・自然を取材し、地域の今を伝えます。NPO法人 玉野SDGsみらいづくりセンターが運営するローカルメディアです。
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/media"
              className="inline-flex items-center justify-center bg-ocean text-white text-sm font-bold px-7 py-3.5 rounded-full hover:bg-ocean-dark transition-colors"
            >
              記事を読む →
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center border border-white/20 text-white/70 text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-white/10 transition-colors"
            >
              NPOについて
            </Link>
          </div>
          <div className="flex items-center gap-8 mt-12 pt-8 border-t border-white/10">
            {[
              { value: "8", label: "記事公開中" },
              { value: "200+", label: "連携団体" },
              { value: "10年+", label: "の実績" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-lg font-bold text-white">{s.value}</p>
                <p className="text-[11px] text-white/50 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Magazine article grid */}
        <div className="hidden lg:flex flex-col gap-px bg-ink">
          {/* Featured article */}
          <Link
            href={`/media/${latestArticles[0].slug}`}
            className="relative overflow-hidden flex-1 group"
          >
            <div className={`absolute inset-0 ${heroCategoryGradient[latestArticles[0].category]}`} />
            {latestArticles[0].thumbnail && (
              <img src={latestArticles[0].thumbnail} alt="" className="absolute inset-0 w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="relative h-full p-7 flex flex-col justify-end">
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-3 w-fit ${heroCategoryBadge[latestArticles[0].category]}`}>
                {CATEGORY_LABEL[latestArticles[0].category]}
              </span>
              <h2 className="text-2xl font-bold text-white leading-snug mb-2 group-hover:opacity-80 transition-opacity line-clamp-2">
                {latestArticles[0].title}
              </h2>
              <p className="text-white/60 text-sm line-clamp-2 leading-relaxed">
                {latestArticles[0].excerpt}
              </p>
            </div>
          </Link>
          {/* Bottom 2 cards */}
          <div className="grid grid-cols-2 gap-px bg-ink h-52">
            {latestArticles.slice(1, 3).map((article) => (
              <Link
                key={article.slug}
                href={`/media/${article.slug}`}
                className="relative overflow-hidden group"
              >
                <div className={`absolute inset-0 ${heroCategoryGradient[article.category]}`} />
                {article.thumbnail && (
                  <img src={article.thumbnail} alt="" className="absolute inset-0 w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="relative h-full p-5 flex flex-col justify-end">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 w-fit ${heroCategoryBadge[article.category]}`}>
                    {CATEGORY_LABEL[article.category]}
                  </span>
                  <h3 className="text-sm font-bold text-white leading-snug group-hover:opacity-80 transition-opacity line-clamp-2">
                    {article.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </section>

      {/* ── CATEGORY TABS ── */}
      <div className="bg-white border-y border-border-line sticky top-14 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {categoryLinks.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className={`shrink-0 section-label px-4 py-2 rounded-full transition-colors ${c.style}`}
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── LATEST ARTICLES ── */}
      <section className="bg-paper py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Editorial header */}
          <div className="flex items-center gap-4 mb-10">
            <span className="section-label text-ink/30">01</span>
            <h2 className="text-2xl font-bold text-ink whitespace-nowrap">最新の記事</h2>
            <div className="flex-1 h-px bg-ink/15" />
            <Link href="/media" className="section-label text-ink-muted hover:text-ink transition-colors whitespace-nowrap hidden sm:block">
              すべて見る →
            </Link>
          </div>
          {/* Desktop: 1 large + 2 stacked, then bottom 3 */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-[5fr_3fr] grid-rows-2 gap-4 h-[480px] mb-4">
              <Link
                href={`/media/${latestArticles[0].slug}`}
                className="row-span-2 relative overflow-hidden rounded-xl group card-interactive"
              >
                <div className={`absolute inset-0 ${heroCategoryGradient[latestArticles[0].category]}`} />
                {latestArticles[0].thumbnail && (
                  <img src={latestArticles[0].thumbnail} alt="" className="absolute inset-0 w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="relative h-full p-8 flex flex-col justify-end">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-4 w-fit ${heroCategoryBadge[latestArticles[0].category]}`}>
                    {CATEGORY_LABEL[latestArticles[0].category]}
                  </span>
                  <h3 className="text-2xl font-bold text-white leading-snug mb-3 line-clamp-2 group-hover:opacity-80 transition-opacity">
                    {latestArticles[0].title}
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed line-clamp-3">
                    {latestArticles[0].excerpt}
                  </p>
                </div>
              </Link>
              {latestArticles.slice(1, 3).map((article) => (
                <Link
                  key={article.slug}
                  href={`/media/${article.slug}`}
                  className="relative overflow-hidden rounded-xl group card-interactive"
                >
                  <div className={`absolute inset-0 ${heroCategoryGradient[article.category]}`} />
                  {article.thumbnail && (
                    <img src={article.thumbnail} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="relative h-full p-5 flex flex-col justify-end">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 w-fit ${heroCategoryBadge[article.category]}`}>
                      {CATEGORY_LABEL[article.category]}
                    </span>
                    <h3 className="text-base font-bold text-white leading-snug line-clamp-2 group-hover:opacity-80 transition-opacity">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {latestArticles.slice(3).map((article) => (
                <ArticleCard key={article.slug} article={article} variant="default" />
              ))}
            </div>
          </div>
          {/* Mobile: regular grid */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-5">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} variant="default" />
            ))}
          </div>
          <div className="mt-8 sm:hidden text-center">
            <Link href="/media" className="section-label text-ink-muted hover:text-ink transition-colors">
              すべての記事を見る →
            </Link>
          </div>
        </div>
      </section>

      {/* ── TAMANO ── */}
      <section className="overflow-hidden">
        {/* Editorial header */}
        <div className="bg-paper">
          <div className="max-w-7xl mx-auto px-6 pt-20 pb-8">
            <div className="flex items-center gap-4">
              <span className="section-label text-ink/30">02</span>
              <h2 className="text-2xl font-bold text-ink whitespace-nowrap">玉野という場所</h2>
              <div className="flex-1 h-px bg-ink/15" />
              <span className="section-label text-ink-muted whitespace-nowrap hidden sm:block">TAMANO, OKAYAMA</span>
            </div>
            <p className="text-ink-muted text-sm mt-4 max-w-lg leading-relaxed">
              瀬戸内の自然と人のぬくもりに包まれたまち。海と山と人が、ここに集まる。
            </p>
          </div>
        </div>

        {/* 3-panel feature */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Sea */}
          <div className="relative overflow-hidden group" style={{ minHeight: "340px" }}>
            <div className="absolute inset-0 grad-interview" />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <p className="text-white/20 text-[100px] font-black leading-none absolute top-2 right-4 select-none">01</p>
              <div className="w-8 h-px bg-white/50 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">瀬戸内の豊かな海</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                穏やかな瀬戸内海に面し、新鮮な魚介が並ぶ漁港と美しい海岸線が広がります。タコ・カキ・サワラなど、豊かな恵みが食卓を彩ります。
              </p>
            </div>
          </div>

          {/* Mountain */}
          <div className="relative overflow-hidden group" style={{ minHeight: "340px" }}>
            <div className="absolute inset-0 grad-news" />
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute -left-12 -bottom-12 w-56 h-56 rounded-full bg-white/10" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <p className="text-white/20 text-[100px] font-black leading-none absolute top-2 right-4 select-none">02</p>
              <div className="w-8 h-px bg-white/50 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">里山と緑の風景</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                市内には豊かな里山が広がり、春の山菜・秋の紅葉など四季折々の自然と人の暮らしが溶け合っています。
              </p>
            </div>
          </div>

          {/* People */}
          <div className="relative overflow-hidden group" style={{ minHeight: "340px" }}>
            <div className="absolute inset-0 grad-story" />
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-white/10" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <p className="text-white/20 text-[100px] font-black leading-none absolute top-2 right-4 select-none">03</p>
              <div className="w-8 h-px bg-white/50 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">温かいコミュニティ</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                造船と漁業の歴史で培われた助け合いの文化。初めて来た人も「おかえり」と迎えてくれる、そんなまちです。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERVIEW PICKUP ── */}
      {interviewArticles.length > 0 && (
        <section className="bg-paper-alt py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-10">
              <span className="section-label text-ink/30">03</span>
              <h2 className="text-2xl font-bold text-ink whitespace-nowrap">地域の人に会いに行く</h2>
              <div className="flex-1 h-px bg-ink/15" />
              <Link href="/media?category=interview" className="section-label text-ink-muted hover:text-ink transition-colors whitespace-nowrap hidden sm:block">
                インタビュー一覧 →
              </Link>
            </div>
            {/* Desktop: 1 large + 2 stacked */}
            <div className="hidden lg:grid lg:grid-cols-[5fr_3fr] gap-5">
              <Link
                href={`/media/${interviewArticles[0].slug}`}
                className="relative overflow-hidden rounded-xl group card-interactive min-h-[380px]"
              >
                <div className="absolute inset-0 grad-interview" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="relative h-full p-8 flex flex-col justify-end">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-4 w-fit bg-ocean-pale text-ocean border border-ocean/30">
                    インタビュー
                  </span>
                  <h3 className="text-2xl font-bold text-white leading-snug mb-3 line-clamp-2 group-hover:opacity-80 transition-opacity">
                    {interviewArticles[0].title}
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed line-clamp-3">
                    {interviewArticles[0].excerpt}
                  </p>
                </div>
              </Link>
              <div className="flex flex-col gap-5">
                {interviewArticles.slice(1, 3).map((article) => (
                  <ArticleCard key={article.slug} article={article} variant="default" />
                ))}
              </div>
            </div>
            {/* Mobile: regular grid */}
            <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-5">
              {interviewArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} variant="default" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── EVENTS ── */}
      {eventArticles.length > 0 && (
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-10">
              <span className="section-label text-ink/30">04</span>
              <h2 className="text-2xl font-bold text-ink whitespace-nowrap">イベント情報</h2>
              <div className="flex-1 h-px bg-ink/15" />
              <Link href="/media?category=event" className="section-label text-ink-muted hover:text-ink transition-colors whitespace-nowrap hidden sm:block">
                イベント一覧 →
              </Link>
            </div>
            <div className="divide-y divide-border-line border-t border-border-line">
              {eventArticles.map((article) => {
                const d = new Date(article.date);
                return (
                  <Link
                    key={article.slug}
                    href={`/media/${article.slug}`}
                    className="group flex items-center gap-6 py-6 hover:bg-paper transition-colors -mx-2 px-2 rounded"
                  >
                    <div className="shrink-0 w-14 text-center">
                      <p className="text-3xl font-bold text-ink leading-none">{d.getDate()}</p>
                      <p className="section-label text-ink-muted mt-1">
                        {d.toLocaleDateString("ja-JP", { month: "short" })}
                      </p>
                    </div>
                    <div className="w-px self-stretch bg-border-line shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5 inline-block ${heroCategoryBadge["event"]}`}>
                        イベント
                      </span>
                      <h3 className="font-bold text-ink group-hover:text-ocean transition-colors leading-snug line-clamp-1 mb-0.5">
                        {article.title}
                      </h3>
                      <p className="text-sm text-ink-muted line-clamp-1 leading-relaxed">{article.excerpt}</p>
                    </div>
                    <span className="shrink-0 text-ink/30 group-hover:text-ocean transition-colors font-bold">→</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── NPO INTRO ── */}
      <section className="bg-paper-ocean py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-6">
                <span className="section-label text-ink/30">05</span>
                <h2 className="text-2xl font-bold text-ink">玉野SDGsみらいづくりセンターとは</h2>
              </div>
              <p className="text-ink-muted leading-relaxed mb-2">
                市民・企業・行政をつなぐ中間支援NPOとして、地域課題の解決と住み続けたいまちづくりを支援しています。
                玉野市を拠点に、10年以上にわたって地域の「つながり」を育ててきました。
              </p>
              <p className="text-ink-muted leading-relaxed mb-6">
                高校生向けプログラム「ゼロイチラボ」、市民交流会「みらいcafé」など多彩な活動を通じ、
                玉野の未来を市民とともにつくっています。
              </p>
              <div className="flex gap-3">
                <Link
                  href="/about"
                  className="text-sm font-bold text-white bg-ocean px-5 py-2.5 rounded-full hover:bg-ocean-dark transition-colors"
                >
                  詳しく見る →
                </Link>
                <Link
                  href="/services"
                  className="text-sm font-bold text-ocean border border-ocean/40 px-5 py-2.5 rounded-full hover:bg-ocean/5 transition-colors"
                >
                  事業紹介
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "10年+", label: "の支援実績", color: "text-ocean" },
                  { value: "200+", label: "連携団体数", color: "text-forest" },
                  { value: "4つ", label: "の中核事業", color: "text-amber" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white border border-ocean/15 rounded-2xl p-5 text-center shadow-whisper"
                  >
                    <p className={`text-2xl font-black mb-1 ${stat.color}`}>{stat.value}</p>
                    <p className="text-[11px] text-ink-muted leading-tight">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-amber py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            一緒に、玉野の未来をつくりませんか？
          </h2>
          <p className="text-white/85 text-base mb-10 max-w-xl mx-auto leading-relaxed">
            活動への参加・協力・ご相談など、お気軽にお問い合わせください。
            どんな小さな一歩も大切にします。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-amber font-bold text-sm px-8 py-4 rounded-full hover:bg-paper transition-colors"
            >
              お問い合わせ →
            </Link>
            <Link
              href="/media"
              className="inline-flex items-center justify-center border-2 border-white/60 text-white text-sm font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-colors"
            >
              活動を見る
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
