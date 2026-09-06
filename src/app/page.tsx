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
import MiraiCafeSection from "@/components/MiraiCafeSection";

/* ============================================================
   トップページ（Webマガジン型）
   ヒーローのキャッチコピーは置かず、最上部を記事にする。
   以降は日付順のフィードで、イベント・日記・インタビューを混ぜる。
   ============================================================ */

// ── 表示用のちいさなユーティリティ ──────────────────────────

function formatDate(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function formatMonthDay(value: string): { month: string; day: string } {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return { month: "", day: "" };
  return {
    month: String(d.getMonth() + 1),
    day: String(d.getDate()).padStart(2, "0"),
  };
}

/** 本文の文字数から読了時間を出す（日本語はおよそ500字/分） */
function readingMinutes(body: string): number {
  const text = body.replace(/<[^>]*>/g, "").replace(/\s+/g, "");
  return Math.max(1, Math.round(text.length / 500));
}

function authorName(article: Article): string {
  return article.author?.trim() || "編集部";
}

/** 日記だけクリーム、それ以外はモノクロ。色でカテゴリを分けない方針。 */
function categoryChipClass(article: Article): string {
  return article.category === "blog"
    ? "bg-cream text-ink"
    : "bg-paper-alt text-ink-soft";
}

// ── 部品 ────────────────────────────────────────────────────

function SectionHead({
  label,
  title,
  moreHref,
  moreText = "すべて見る",
}: {
  label: string;
  title: string;
  moreHref?: string;
  moreText?: string;
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4 border-b border-ink pb-2.5">
      <h2 className="leading-none">
        <span className="section-label block text-ink-muted">{label}</span>
        <span className="mt-1.5 block text-[19px] font-bold text-ink">{title}</span>
      </h2>
      {moreHref && (
        <Link
          href={moreHref}
          className="shrink-0 text-[13px] font-bold text-ocean hover:underline"
        >
          {moreText} →
        </Link>
      )}
    </div>
  );
}

function Byline({ article }: { article: Article }) {
  const name = authorName(article);
  return (
    <div className="mt-4 flex items-center gap-2.5 border-t border-border-line pt-3.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper-alt text-[12px] font-bold text-ink-soft">
        {name.slice(0, 1)}
      </span>
      <span className="min-w-0">
        <span className="block text-[13px] font-bold text-ink">{name}</span>
        <span className="block text-[11px] text-ink-muted">
          玉野SDGsみらいづくりセンター
        </span>
      </span>
      <span className="ml-auto shrink-0 text-[11px] text-ink-muted">
        読了 {readingMinutes(article.body)}分
      </span>
    </div>
  );
}

/** 最上部の1本。写真を大きく、見出しで読ませる。 */
function TopStory({ article }: { article: Article }) {
  return (
    <article className="pb-8">
      <Link href={getArticleUrl(article)} className="group block">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded bg-paper-deep">
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
        <div className="mt-3.5 flex flex-wrap items-center gap-2 text-[11px] text-ink-muted">
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${categoryChipClass(
              article
            )}`}
          >
            {CATEGORY_LABEL[article.category]}
          </span>
          <span>{formatDate(article.date)}</span>
        </div>
        <h2 className="mt-2.5 text-[26px] font-bold leading-[1.35] text-ink group-hover:text-ocean sm:text-[30px]">
          {article.title}
        </h2>
        <p className="mt-3 text-[14px] leading-[1.9] text-ink-soft">
          {article.excerpt}
        </p>
      </Link>
      <Byline article={article} />
    </article>
  );
}

/** フィードの1行。左に写真、右にテキスト。 */
function FeedRow({ article }: { article: Article }) {
  return (
    <Link
      href={getArticleUrl(article)}
      className="card-interactive group -mx-3 flex gap-4 rounded px-3 py-5"
    >
      <div className="relative aspect-[4/3] w-[104px] shrink-0 overflow-hidden rounded bg-paper-deep sm:w-[168px]">
        {article.thumbnail ? (
          <img
            src={article.thumbnail}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 grad-blog" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-ink-muted">
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${categoryChipClass(
              article
            )}`}
          >
            {CATEGORY_LABEL[article.category]}
          </span>
          <span>{formatDate(article.date)}</span>
        </div>
        <h3 className="mt-1.5 text-[15px] font-bold leading-[1.5] text-ink group-hover:text-ocean sm:text-[17px]">
          {article.title}
        </h3>
        <p className="mt-1.5 hidden text-[13px] leading-[1.8] text-ink-soft sm:line-clamp-2">
          {article.excerpt}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-x-2 text-[11px] text-ink-muted">
          <span className="font-bold text-ink-soft">{authorName(article)}</span>
          <span>・読了 {readingMinutes(article.body)}分</span>
        </div>
      </div>
    </Link>
  );
}

function InterviewCard({ interview }: { interview: Interview }) {
  return (
    <Link
      href={`/interviews/${interview.slug}`}
      className="group block"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded bg-paper-deep">
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
      <p className="mt-3 text-[15px] font-bold leading-[1.6] text-ink group-hover:text-ocean">
        ❝ {interview.catchphrase} ❞
      </p>
      <p className="mt-2 text-[12px] text-ink-muted">{interview.role}</p>
      <p className="text-[13px] font-bold text-ink">{interview.name}</p>
    </Link>
  );
}

function EventRow({ article }: { article: Article }) {
  const { month, day } = formatMonthDay(article.date);
  return (
    <Link
      href={getArticleUrl(article)}
      className="card-interactive group -mx-3 flex items-start gap-4 rounded px-3 py-4"
    >
      <div className="w-[46px] shrink-0 border-r border-border-line pr-3 text-center">
        <span className="block text-[10px] text-ink-muted">{month}月</span>
        <span className="block text-[24px] font-bold leading-none text-ink">
          {day}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-[14px] font-bold leading-[1.5] text-ink group-hover:text-ocean">
          {article.title}
        </h3>
        <p className="mt-1 line-clamp-1 text-[12px] text-ink-muted">
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
      <div className="no-scrollbar mx-auto flex max-w-[1180px] gap-2 overflow-x-auto px-5 py-2.5">
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
    fetchAllInterviews(3),
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

      <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-x-10 px-5 py-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:py-10">
        {/* ── メインカラム ── */}
        <main className="min-w-0">
          {topStory && <TopStory article={topStory} />}

          {feed.length > 0 && (
            <section className="border-t border-border-line pt-8">
              <SectionHead label="Latest" title="最近の動き" moreHref="/media" />
              <div className="divide-y divide-border-line">
                {feed.map((article) => (
                  <FeedRow key={article.slug} article={article} />
                ))}
              </div>
              <Link
                href="/media"
                className="mt-6 block rounded border border-border-line py-3 text-center text-[13px] font-bold text-ink hover:border-ink"
              >
                もっと見る
              </Link>
            </section>
          )}

          {interviews.length > 0 && (
            <section className="mt-12">
              <SectionHead
                label="Voices from Tamano"
                title="動く人たち"
                moreHref="/interviews"
              />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
                {interviews.map((interview) => (
                  <InterviewCard key={interview.slug} interview={interview} />
                ))}
              </div>
            </section>
          )}

          {upcoming.length > 0 && (
            <section className="mt-12">
              <SectionHead
                label="Event Calendar"
                title="これからの予定"
                moreHref="/events"
              />
              <div className="divide-y divide-border-line">
                {upcoming.map((article) => (
                  <EventRow key={article.slug} article={article} />
                ))}
              </div>
            </section>
          )}

          {diaries.length > 0 && (
            <section className="mt-12 rounded bg-cream p-5 sm:p-7">
              <SectionHead
                label="Coordinator's Journal"
                title="コーディネーター日記"
                moreHref="/blog"
              />
              <div className="divide-y divide-border-line">
                {diaries.map((article) => (
                  <Link
                    key={article.slug}
                    href={getArticleUrl(article)}
                    className="group block py-3.5"
                  >
                    <span className="text-[11px] text-ink-muted">
                      {formatDate(article.date)}
                    </span>
                    <h3 className="mt-1 text-[15px] font-bold leading-[1.5] text-ink group-hover:text-ocean">
                      {article.title}
                    </h3>
                    <span className="mt-1 block text-[11px] text-ink-muted">
                      {authorName(article)}・読了 {readingMinutes(article.body)}分
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* ── サイドバー（PCのみ・スマホでは本文の下に回る） ── */}
        <aside className="mt-12 min-w-0 lg:mt-0">
          <div className="lg:sticky lg:top-6">
            <section>
              <SectionHead label="Editors' Pick" title="今週のピックアップ" />
              <ol className="divide-y divide-border-line">
                {pickups.map((article, index) => (
                  <li key={article.slug}>
                    <Link
                      href={getArticleUrl(article)}
                      className="group flex gap-3 py-3.5"
                    >
                      <span className="w-4 shrink-0 text-[15px] font-bold text-ink-muted">
                        {index + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[13px] font-bold leading-[1.6] text-ink group-hover:text-ocean">
                          {article.title}
                        </span>
                        <span className="mt-1 block text-[11px] text-ink-muted">
                          {CATEGORY_LABEL[article.category]}・
                          {formatDate(article.date)}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-10">
              <SectionHead label="About" title="センターについて" />
              <div className="flex flex-col divide-y divide-border-line">
                {[
                  { label: "理念・法人概要", href: "/about" },
                  { label: "事業内容", href: "/services" },
                  { label: "資料・報告書", href: "/documents" },
                  { label: "入会・寄付", href: "/join" },
                  { label: "お問い合わせ", href: "/contact" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="py-3 text-[13px] font-bold text-ink hover:text-ocean"
                  >
                    {item.label} →
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </aside>
      </div>

      {/* ── 幅いっぱいで見せるセクション ── */}
      <div id="mirai-cafe">
        <MiraiCafeSection />
      </div>

      <div id="student">
        <StudentTrialSection />
      </div>

      {/* ── 下部CTA ── */}
      <section className="border-t border-border-line bg-paper-alt">
        <div className="mx-auto max-w-[1180px] px-5 py-12">
          <h2 className="text-[20px] font-bold text-ink">次の一歩を、ここから。</h2>
          <p className="mt-2 text-[13px] leading-[1.9] text-ink-soft">
            相談、参加、支援。目的に合わせて、必要な入口へ進めます。
          </p>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                href: "/contact",
                label: "相談する",
                text: "連携・協力・取材のご相談、イベントのお申し込み。",
              },
              {
                href: "/join",
                label: "入会・寄付",
                text: "会員・寄付で、玉野のまちづくりを継続的に支える。",
              },
              {
                href: "/documents",
                label: "資料・報告書",
                text: "調査報告書・機関誌・定款・決算書を公開しています。",
              },
            ].map((cta) => (
              <Link
                key={cta.href}
                href={cta.href}
                className="group rounded border border-border-line bg-paper p-5 hover:border-ink"
              >
                <span className="block text-[15px] font-bold text-ink group-hover:text-ocean">
                  {cta.label} →
                </span>
                <span className="mt-2 block text-[12px] leading-[1.8] text-ink-soft">
                  {cta.text}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
