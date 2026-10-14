"use client";

import { useState } from "react";
import ArticleRow from "@/components/ArticleRow";
import ArticleTile from "@/components/ArticleTile";
import type { Article } from "@/lib/articles";

type Tab = "blog" | "event" | "all";

const TABS: { id: Tab; label: string }[] = [
  { id: "blog", label: "ブログ" },
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
  const [active, setActive] = useState<Tab>("blog");

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
      {active === "all" ? (
        <div className="divide-y divide-border-line border-t border-border-line">
          {items.length === 0 ? (
            <p className="py-8 text-center text-[13px] text-ink-muted">記事がありません</p>
          ) : (
            items.map((article) => <ArticleRow key={article.slug} article={article} />)
          )}
        </div>
      ) : (
        <div className={`grid gap-x-3 gap-y-6 border-t border-border-line pt-4 ${active === "blog" ? "grid-cols-3" : "grid-cols-2"}`}>
          {items.length === 0 ? (
            <p className="col-span-3 py-8 text-center text-[13px] text-ink-muted">記事がありません</p>
          ) : (
            items.map((article) => <ArticleTile key={article.slug} article={article} />)
          )}
        </div>
      )}
    </>
  );
}
