export const revalidate = 60;

import Link from "next/link";
import {
  fetchLatestArticles,
  fetchArticlesByCategory,
  CATEGORY_LABEL,
  getArticleUrl,
  type Article,
} from "@/lib/articles";
import { fetchAllInterviews, type Interview } from "@/lib/interviews";
import StudentTrialSection from "@/components/StudentTrialSection";
import MiraiCafeSection, { NEXT_CAFE } from "@/components/MiraiCafeSection";
import {
  AboutCard,
  PickupCard,
  WritersCard,
  MiraiCafeCard,
  MembershipCard,
  FollowCard,
  DocumentsCard,
} from "@/components/Sidebar";
import ArticleRow from "@/components/ArticleRow";
import { CategoryTag, SectionHead, Avatar, OutlineLink } from "@/components/ui";
import {
  formatDate,
  formatMonthDay,
  readingMinutes,
  authorName,
} from "@/lib/format";

/* ============================================================
   トップページ（Webマガジン型）
   ヒーローのキャッチコピーは置かず、最上部を記事にする。
   以降は日付順のフィードで、イベント・日記・インタビューを混ぜる。
   寸法はプロトタイプ準拠：本文1232px幅／サイドバー320px／間隔48px。
   ============================================================ */

// ── 部品 ──────────────────────────────────────────────────

/** 最上部の1本。写真を大きく、見出しで読ませる。 */
function TopStory({ article }: { article: Article }) {
  const name = authorName(article);
  return (
    <article className="pb-5 pt-4">
      <Link href={getArticleUrl(article)} className="group block">
        <div className="relative aspect-[1.91/1] w-full overflow-hidden rounded bg-paper-deep">
          {article.thumbnail ? (
            <img
              src={article.thumbnail}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          ) : (
            <div className="absolute inset-0 grad-blog" />
          )}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[12px] leading-tight text-ink-soft">
          <CategoryTag category={article.category} />
          <span>{formatDate(article.date)}</span>
        </div>
        <h2 className="mt-2.5 text-[22px] font-bold leading-[1.35] text-ink group-hover:text-ocean sm:text-[28px]">
          {article.title}
        </h2>
        <p className="mt-2.5 text-[14px] leading-[1.7] text-ink-soft">
          {article.excerpt}
        </p>
      </Link>
      <div className="mt-3.5 flex items-center gap-2.5">
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
          読了 {readingMinutes(article.body)}分
        </span>
      </div>
    </article>
  );
}

function InterviewCard({ interview }: { interview: Interview }) {
  return (
    <Link
      href={`/interviews/${interview.slug}`}
      className="group flex flex-col border-t border-border-line pt-3.5"
    >
      <div className="relative aspect-[1.91/1] w-full overflow-hidden rounded bg-paper-deep">
        {interview.photo ? (
          <img
            src={interview.photo}
            alt={interview.name}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-paper-deep" />
        )}
      </div>
      <h3 className="mb-2 mt-2.5 text-[14px] font-bold leading-[1.35] text-ink group-hover:text-ocean">
        ❝ {interview.catchphrase} ❞
      </h3>
      <div className="mt-auto flex items-center gap-2">
        <Avatar name={interview.name} size={36} />
        <span className="min-w-0">
          <span className="block text-[13px] font-bold leading-tight text-ink">
            {interview.name}
          </span>
          <span className="block text-[12px] leading-tight text-ink-soft">
            {interview.role}
          </span>
        </span>
      </div>
    </Link>
  );
}

function EventRow({ article }: { article: Article }) {
  const { month, day } = formatMonthDay(article.date);
  return (
    <Link
      href={getArticleUrl(article)}
      className="card-interactive group -mx-3 flex items-center gap-3.5 rounded px-3 py-3"
    >
      <div className="w-14 shrink-0 border-r border-border-line pr-2 text-center">
        <span className="block text-[10px] leading-tight text-ink-muted">
          {month}月
        </span>
        <span className="block text-[22px] font-bold leading-none text-ink">
          {day}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-[14px] font-bold leading-[1.35] text-ink group-hover:text-ocean">
          {article.title}
        </h3>
        <p className="mt-1 line-clamp-1 text-[12px] leading-tight text-ink-soft">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}

// ── トピックチップ（カテゴリへの入口） ──────────────────────

const TOPICS: { label: string; href: string }[] = [
  { label: "すべて", href: "/media" },
  { label: "イベント情報", href: "/events" },
  { label: "動く人たち", href: "/interviews" },
  { label: "コーディネーター日記", href: "/blog" },
  { label: "学生トライアル", href: "#student" },
  { label: "みらいCafe", href: "#mirai-cafe" },
  { label: "お知らせ", href: "/news" },
  { label: "資料・報告書", href: "/documents" },
];

function TopicBar() {
  return (
    <div className="border-b border-border-line bg-paper">
      <div className="no-scrollbar mx-auto flex max-w-[1232px] gap-2 overflow-x-auto px-4 py-2.5">
        {TOPICS.map((topic) => (
          <Link
            key={topic.label}
            href={topic.href}
            className="shrink-0 rounded-full border border-border-line px-3 py-1 text-[12px] text-ink-soft hover:border-ink hover:text-ink"
          >
            {topic.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

// ── ページ本体 ──────────────────────────────────────────────

export default async function Home() {
  const [latest, events, diaries, interviews] = await Promise.all([
    fetchLatestArticles(24),
    fetchArticlesByCategory("event", 12),
    fetchArticlesByCategory("blog", 4),
    fetchAllInterviews(4),
  ]);

  const [topStory, ...rest] = latest;
  const feed = rest.slice(0, 8);

  // 今週のピックアップ：将来はmicroCMSで編集部が手で選ぶ。
  // それまでは新着の上位を暫定的に並べる。
  const pickups = latest.slice(0, 5);

  const upcoming = events.slice(0, 5);

  return (
    <div className="flex flex-col">
      <TopicBar />

      <div className="mx-auto grid w-full max-w-[1232px] grid-cols-1 items-start gap-x-12 px-4 pb-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* ── メインカラム ── */}
        <main className="min-w-0">
          {topStory && <TopStory article={topStory} />}

          {feed.length > 0 && (
            <section className="border-t border-border-line">
              <SectionHead label="Latest" title="最近の動き" moreHref="/media" />
              <div className="divide-y divide-border-line border-t border-border-line">
                {feed.map((article) => (
                  <ArticleRow key={article.slug} article={article} />
                ))}
              </div>
              <OutlineLink href="/media">もっと見る</OutlineLink>
            </section>
          )}

          {interviews.length > 0 && (
            <section className="mt-8 border-t border-border-line">
              <SectionHead
                label="Voices from Tamano"
                title="動く人たち"
                moreHref="/interviews"
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {interviews.map((interview) => (
                  <InterviewCard key={interview.slug} interview={interview} />
                ))}
              </div>
            </section>
          )}

          {upcoming.length > 0 && (
            <section className="mt-12 border-t border-border-line">
              <SectionHead
                label="Event Calendar"
                title="これからの予定"
                moreHref="/events"
              />
              <div className="divide-y divide-border-line border-t border-border-line">
                {upcoming.map((article) => (
                  <EventRow key={article.slug} article={article} />
                ))}
              </div>
            </section>
          )}

          <MiraiCafeSection />

          <StudentTrialSection />

          {diaries.length > 0 && (
            <section className="my-6 rounded bg-cream px-4 pb-4 pt-1">
              <SectionHead
                label="Coordinator's Journal"
                title="コーディネーター日記"
                moreHref="/blog"
                moreText="日記を読む"
              />
              <p className="mb-1 text-[12px] leading-[1.7] text-ink-soft">
                現場の途中で考えていたことの記録です。
              </p>
              <div className="divide-y divide-border-line">
                {diaries.map((article) => (
                  <Link
                    key={article.slug}
                    href={getArticleUrl(article)}
                    className="group block py-3"
                  >
                    <span className="block text-[12px] leading-tight text-ink-soft">
                      {formatDate(article.date)}
                    </span>
                    <h3 className="mt-1.5 text-[14px] font-bold leading-[1.35] text-ink group-hover:text-ocean">
                      {article.title}
                    </h3>
                    <p className="mt-1.5 text-[12px] leading-[1.7] text-ink-soft">
                      {authorName(article)}・読了 {readingMinutes(article.body)}分
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* ── サイドバー（PCのみ・スマホでは本文の下に回る） ── */}
        <aside className="min-w-0 pb-8 pt-4">
          <div className="lg:sticky lg:top-[88px]">
            <AboutCard />
            <PickupCard articles={pickups} />
            <WritersCard articles={latest} />
            <MiraiCafeCard
              date={`${NEXT_CAFE.num}/${NEXT_CAFE.date.replace(/日.*$/, "")}`}
              note={`${NEXT_CAFE.date.replace(/^\d+日/, "")} 13:00〜16:00`}
            />
            <MembershipCard />
            <FollowCard />
            <DocumentsCard />
          </div>
        </aside>
      </div>

      {/* ── 下部CTA ── */}
      <section className="border-t border-border-line bg-paper">
        <div className="mx-auto grid max-w-[1232px] grid-cols-1 gap-4 px-4 py-8 sm:grid-cols-3">
          {[
            {
              key: "01 · SUPPORT",
              title: "寄付・入会",
              text: "寄付・賛助会員として、玉野のまちづくりを継続的にサポートしていただけませんか。",
              linkText: "くわしく見る",
              href: "/join",
            },
            {
              key: "02 · CONTACT",
              title: "お問い合わせ",
              text: "連携・協力・取材のご相談、イベントへのお申し込みなど、お気軽にご連絡ください。",
              linkText: "フォームを開く",
              href: "/contact",
            },
            {
              key: "03 · SPEAKER",
              title: "講演のご依頼",
              text: "理事長・副理事長が講演やワークショップのファシリテーターを承ります。",
              linkText: "依頼について",
              href: "/about#speakers",
            },
          ].map((cta) => (
            <Link
              key={cta.key}
              href={cta.href}
              className="group rounded border border-border-line p-4 hover:bg-[rgba(34,34,34,.05)]"
            >
              <span className="block text-[10px] leading-tight tracking-[.12em] text-ink-muted">
                {cta.key}
              </span>
              <span className="mt-1.5 block text-[14px] font-bold leading-tight text-ink">
                {cta.title}
              </span>
              <span className="mt-1.5 block text-[12px] leading-[1.7] text-ink-soft">
                {cta.text}
              </span>
              <span className="mt-2.5 block text-[13px] font-bold text-ocean">
                {cta.linkText} →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
