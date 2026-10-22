"use client";

import { useState } from "react";
import ArticleRow from "@/components/ArticleRow";
import ArticleTile from "@/components/ArticleTile";
import type { Article } from "@/lib/articles";

type Tab = "blog" | "event" | "all";

const TABS: { id: Tab; label: string }[] = [
  // { id: "blog", label: "ブログ" }, // 一時非表示
  { id: "event", label: "イベント" },
  { id: "all", label: "すべて" },
];

export default function LatestTabs({
  all,
  events,
  blog,
}: {
  all: Article[];
  events: Article[];
  blog: Article[];
}) {
  const [active, setActive] = useState<Tab>("all");

  const items = active === "all" ? all : active === "event" ? events : blog;

  return (
    <>
      <div className="flex gap-0 border-b border-border-line">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-4 py-2.5 text-[13px] font-bold leading-none transition-colors ${
              active === tab.id
                ? "border-b-2 border-ink text-ink"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-6 border-t border-border-line pt-4 sm:grid-cols-3">
        {items.length === 0 ? (
          <p className="col-span-3 py-8 text-center text-[13px] text-ink-muted">記事がありません</p>
        ) : (
          items.map((article) => <ArticleTile key={article.slug} article={article} />)
        )}
      </div>
    </>
  );
}
