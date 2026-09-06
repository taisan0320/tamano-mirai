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
