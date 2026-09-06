import Link from "next/link";
import { fetchLatestArticles } from "@/lib/articles";
import {
  AboutCard,
  PickupCard,
  MembershipCard,
  DocumentsCard,
} from "@/components/Sidebar";

/* 一覧ページ共通の枠。
   パンくず → ページ見出し → 本文（記事の並び） → サイドバー。
   カテゴリごとに色を変える大型バナーは廃止した。 */

export default async function ArchiveLayout({
  label,
  title,
  description,
  children,
}: {
  label: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const pickups = await fetchLatestArticles(5);

  return (
    <div className="mx-auto grid w-full max-w-[1232px] grid-cols-1 items-start gap-x-12 px-4 pb-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <main className="min-w-0">
        <nav className="flex flex-wrap items-center gap-1.5 pt-4 text-[11px] text-ink-soft">
          <Link href="/" className="hover:text-ocean">
            HOME
          </Link>
          <span className="text-ink-muted">/</span>
          <span>{title}</span>
        </nav>

        <div className="pb-1 pt-2">
          <p className="text-[10px] leading-tight tracking-[.12em] text-ink-muted">
            {label}
          </p>
          <h1 className="my-2 text-[24px] font-bold leading-[1.25] text-ink sm:text-[28px]">
            {title}
          </h1>
          <p className="text-[14px] leading-[1.8] text-ink-soft">{description}</p>
        </div>

        <div className="mt-4">{children}</div>
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
  );
}

/** 記事が0件のときの表示 */
export function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded border border-border-line py-12 text-center text-[14px] text-ink-soft">
      {children}
    </p>
  );
}

/* ── 固定ページ（センターについて・入会・お問い合わせなど）用の枠 ──
   一覧ページと同じ2カラム。サイドバーの中身だけ差し替えられるようにしてある。 */

export async function StaticPageLayout({
  label,
  title,
  description,
  breadcrumb,
  children,
  sidebar,
}: {
  label: string;
  title: string;
  description?: string;
  breadcrumb?: { label: string; href: string }[];
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}) {
  const pickups = await fetchLatestArticles(5);

  return (
    <div className="mx-auto grid w-full max-w-[1232px] grid-cols-1 items-start gap-x-12 px-4 pb-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <main className="min-w-0">
        <nav className="flex flex-wrap items-center gap-1.5 pt-4 text-[11px] text-ink-soft">
          <Link href="/" className="hover:text-ocean">
            HOME
          </Link>
          {breadcrumb?.map((item) => (
            <span key={item.href} className="flex items-center gap-1.5">
              <span className="text-ink-muted">/</span>
              <Link href={item.href} className="hover:text-ocean">
                {item.label}
              </Link>
            </span>
          ))}
          <span className="text-ink-muted">/</span>
          <span>{title}</span>
        </nav>

        <div className="pb-1 pt-2">
          <p className="text-[10px] leading-tight tracking-[.12em] text-ink-muted">
            {label}
          </p>
          <h1 className="my-2 text-[24px] font-bold leading-[1.25] text-ink sm:text-[28px]">
            {title}
          </h1>
          {description && (
            <p className="text-[14px] leading-[1.8] text-ink-soft">{description}</p>
          )}
        </div>

        <div className="mt-4">{children}</div>
      </main>

      <aside className="min-w-0 pb-8 pt-4">
        <div className="lg:sticky lg:top-[88px]">
          {sidebar ?? (
            <>
              <AboutCard />
              <PickupCard articles={pickups} />
              <MembershipCard />
              <DocumentsCard />
            </>
          )}
        </div>
      </aside>
    </div>
  );
}

/** 固定ページ内の見出し */
export function PageSection({
  label,
  title,
  id,
  children,
}: {
  label: string;
  title: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-10 scroll-mt-20 first:mt-0">
      <h2 className="mb-3 border-b border-ink pb-2 leading-none">
        <span className="section-label block text-ink-muted">{label}</span>
        <span className="mt-1.5 block text-[16px] font-bold text-ink sm:text-[18px]">
          {title}
        </span>
      </h2>
      {children}
    </section>
  );
}

/** 定義リスト（法人概要など） */
export function FactList({ items }: { items: { term: string; value: React.ReactNode }[] }) {
  return (
    <dl className="rounded border border-border-line">
      {items.map((item) => (
        <div
          key={item.term}
          className="flex gap-3 border-b border-border-line px-3.5 py-2.5 text-[13px] leading-[1.5] last:border-b-0"
        >
          <dt className="w-[88px] shrink-0 text-[12px] text-ink-soft">{item.term}</dt>
          <dd className="min-w-0 flex-1 text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
