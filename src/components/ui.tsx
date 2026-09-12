import Link from "next/link";
import Image from "next/image";
import { CATEGORY_LABEL, type Article } from "@/lib/articles";
import { writerPhoto } from "@/lib/writers";

/* サイト全体で使い回す小さな表示部品。
   NewsPicks型の決め事（塗らない・影を使わない・罫線で区切る）をここで守る。 */

/* カテゴリごとの枠と文字の色。ここにないカテゴリ（お知らせなど）はグレー */
const CATEGORY_TONE: Partial<Record<Article["category"], string>> = {
  event: "border-cat-event text-cat-event",
  interview: "border-cat-interview text-cat-interview",
  blog: "border-cat-blog text-cat-blog",
  learning: "border-cat-learning text-cat-learning",
};

/** カテゴリ表示。塗りつぶさず、枠と文字の色だけで種類を示す。 */
export function CategoryTag({
  category,
}: {
  category: Article["category"];
}) {
  const tone = CATEGORY_TONE[category] ?? "border-[#bdbdbd] text-ink-soft";
  return (
    <span
      className={`rounded-sm border px-1.5 py-[3px] text-[11px] font-bold leading-tight tracking-[.06em] ${tone}`}
    >
      {CATEGORY_LABEL[category]}
    </span>
  );
}

/** セクション見出し。小さな英字ラベルの下に日本語の見出しを置く。 */
export function SectionHead({
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
    <div className="mb-1 flex h-14 items-center justify-between gap-3">
      <h2 className="leading-none">
        <span className="section-label block text-ink-muted">{label}</span>
        <span className="mt-1.5 block text-[16px] font-bold text-ink sm:text-[18px]">
          {title}
        </span>
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

/** 人の丸アイコン。lib/writers.ts に顔写真があれば写真、なければ頭文字。 */
export function Avatar({ name, size = 40 }: { name: string; size?: number }) {
  const photo = writerPhoto(name);
  if (photo) {
    return (
      <Image
        src={photo}
        alt=""
        width={size}
        height={size}
        className="shrink-0 rounded-full border border-border-line object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full border border-border-line bg-paper-alt font-bold text-ink-soft"
      style={{ width: size, height: size, fontSize: size * 0.32 }}
    >
      {name.slice(0, 1)}
    </span>
  );
}

/** 罫線で仕切る「もっと見る」ボタン */
export function OutlineLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="mt-4 block rounded border border-border-line py-3 text-center text-[14px] font-bold text-ink hover:bg-[rgba(34,34,34,.05)]"
    >
      {children}
    </Link>
  );
}
