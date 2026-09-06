import Link from "next/link";

/* 記事カテゴリの絞り込みバー。
   「今日は何を読もうか」を担当する。全ページのヘッダー直下に出す。
   組織の情報（センターについて・入会など）はヘッダー側の担当なので、
   ここには入れない。両方に同じ項目を置かないこと。 */

const TOPICS: { label: string; href: string }[] = [
  { label: "すべて", href: "/media" },
  { label: "イベント情報", href: "/events" },
  { label: "動く人たち", href: "/interviews" },
  { label: "コーディネーター日記", href: "/blog" },
  { label: "学校と、つくる", href: "/lessons" },
  { label: "学生トライアル", href: "/#student" },
  { label: "みらいCafe", href: "/#mirai-cafe" },
  { label: "お知らせ", href: "/news" },
  { label: "資料・報告書", href: "/documents" },
];

export default function TopicBar() {
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
