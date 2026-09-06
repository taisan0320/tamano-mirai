import Link from "next/link";
import { CATEGORY_LABEL, getArticleUrl, type Article } from "@/lib/articles";
import { readingMinutes } from "@/lib/format";
import { summarizeWriters, type WriterSummary } from "@/lib/writers";
import { Avatar } from "@/components/ui";

/* サイドバーのカード群。
   トップページと記事詳細で並べ方を変えられるよう、1枚ずつ部品にしてある。
   カードは白地＋細枠のみ。影もグラデーションも使わない。 */

export function SidebarCard({
  label,
  title,
  children,
  tone = "default",
}: {
  label: string;
  title: string;
  children: React.ReactNode;
  tone?: "default" | "membership";
}) {
  return (
    <div
      className={`mb-4 rounded border p-4 ${
        tone === "membership" ? "border-membership" : "border-border-line"
      }`}
    >
      <h2 className="mb-1">
        <span
          className={`section-label block ${
            tone === "membership" ? "text-membership" : "text-ink-muted"
          }`}
        >
          {label}
        </span>
        <span className="mt-1 block text-[14px] font-bold leading-tight text-ink">
          {title}
        </span>
      </h2>
      {children}
    </div>
  );
}

/** 罫線だけのボタン */
function GhostButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="mt-3 block rounded border border-border-line py-2.5 text-center text-[14px] font-bold leading-none text-ink hover:bg-[rgba(34,34,34,.05)]"
    >
      {children}
    </Link>
  );
}

/** 青い実ボタン */
function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="mt-3 block rounded bg-ocean py-2.5 text-center text-[14px] font-bold leading-none text-white hover:bg-ocean-dark"
    >
      {children}
    </Link>
  );
}

export function AboutCard() {
  return (
    <SidebarCard label="About" title="玉野の声を、つながる力に。">
      <p className="mt-2 text-[12px] leading-[1.7] text-ink-soft">
        市民・団体・企業・行政をつなぎ、相談・伴走・情報発信で地域の活動を支える中間支援NPOです。
      </p>
      <PrimaryButton href="/contact">まず相談してみる</PrimaryButton>
      <GhostButton href="/about">センターについて</GhostButton>
    </SidebarCard>
  );
}

export function PickupCard({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;
  return (
    <SidebarCard label="Editors' Pick" title="今週のピックアップ">
      <ol className="mt-2">
        {articles.map((article, index) => (
          <li key={article.slug}>
            <Link
              href={getArticleUrl(article)}
              className="group flex items-start gap-2.5 border-b border-border-line py-2.5 last:border-b-0"
            >
              <span
                className={`w-[18px] shrink-0 text-[16px] font-bold leading-tight ${
                  index < 3 ? "text-ocean" : "text-ink-muted"
                }`}
              >
                {index + 1}
              </span>
              <span className="min-w-0">
                <span className="block text-[13px] font-bold leading-[1.4] text-ink group-hover:text-ocean">
                  {article.title}
                </span>
                <span className="mt-1.5 block text-[11px] leading-tight text-ink-soft">
                  {CATEGORY_LABEL[article.category]}・読了{" "}
                  {readingMinutes(article.body)}分
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </SidebarCard>
  );
}

function WriterRow({ writer }: { writer: WriterSummary }) {
  return (
    <div className="flex items-center gap-2.5 border-b border-border-line py-2.5 last:border-b-0">
      <Avatar name={writer.name} size={36} />
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-bold leading-tight text-ink">
          {writer.name}
        </span>
        <span className="mt-[3px] block text-[12px] leading-tight text-ink-soft">
          {writer.role}
        </span>
      </span>
      <span className="shrink-0 text-[11px] text-ink-muted">{writer.count}本</span>
    </div>
  );
}

export function WritersCard({ articles }: { articles: Article[] }) {
  const writers = summarizeWriters(articles);
  if (writers.length === 0) return null;
  return (
    <SidebarCard label="Writers" title="書いている人">
      <div className="mt-2">
        {writers.map((writer) => (
          <WriterRow key={writer.name} writer={writer} />
        ))}
      </div>
    </SidebarCard>
  );
}

/** 記事詳細用。その記事を書いた人だけを出す。 */
export function SingleWriterCard({ writer }: { writer: WriterSummary }) {
  return (
    <SidebarCard label="Writer" title="この記事を書いた人">
      <div className="mt-2">
        <WriterRow writer={writer} />
      </div>
    </SidebarCard>
  );
}

export function MiraiCafeCard({
  date,
  note,
}: {
  date: string;
  note: string;
}) {
  return (
    <SidebarCard label="Original Event" title="次回のみらいCafe">
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="text-[24px] font-bold leading-none text-ink">{date}</span>
        <span className="text-[12px] text-ink-soft">{note}</span>
      </div>
      <p className="mt-2 text-[12px] leading-[1.7] text-ink-soft">
        玉野のことを話す場です。内容が決まり次第Instagramでお知らせします。
      </p>
      <GhostButton href="/#mirai-cafe">みらいCafeの予定を見る</GhostButton>
    </SidebarCard>
  );
}

export function MembershipCard() {
  return (
    <SidebarCard
      label="Membership"
      title="入会・寄付でセンターを支える"
      tone="membership"
    >
      <p className="mt-2 text-[12px] leading-[1.7] text-ink-soft">
        会員・寄付として、玉野のまちづくりを継続的に支えていただけませんか。
      </p>
      <Link
        href="/join"
        className="mt-3 block rounded bg-membership py-2.5 text-center text-[14px] font-bold leading-none text-white hover:opacity-90"
      >
        入会・寄付について
      </Link>
    </SidebarCard>
  );
}

export function FollowCard() {
  return (
    <SidebarCard label="Follow" title="最新情報を受け取る">
      <p className="mt-2 text-[12px] leading-[1.7] text-ink-soft">
        イベントの追加や当日の様子は、Instagramでいちばん早くお知らせしています。
      </p>
      <a
        href="https://www.instagram.com/tamano.miraizukuri/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 block rounded border border-border-line py-2.5 text-center text-[14px] font-bold leading-none text-ink hover:bg-[rgba(34,34,34,.05)]"
      >
        Instagram
      </a>
    </SidebarCard>
  );
}

export function DocumentsCard() {
  return (
    <SidebarCard label="Documents" title="資料・報告書">
      <p className="mt-2 text-[12px] leading-[1.7] text-ink-soft">
        調査報告書・機関誌・定款・決算書など、センターの活動記録を公開しています。
      </p>
      <GhostButton href="/documents">一覧を見る</GhostButton>
    </SidebarCard>
  );
}
