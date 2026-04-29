"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export interface HeroSliderItem {
  slug: string;
  categoryLabel: string;
  date: string;
  title: string;
}

const GROUP_SIZE = 3;
const INTERVAL_MS = 5000;

export default function HeroSubSlider({ items }: { items: HeroSliderItem[] }) {
  const numGroups = Math.ceil(items.length / GROUP_SIZE);
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (numGroups <= 1 || paused) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % numGroups);
      setAnimKey((k) => k + 1);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [numGroups, paused]);

  const goTo = (i: number) => {
    setActive(i);
    setAnimKey((k) => k + 1);
  };

  const group = items.slice(active * GROUP_SIZE, active * GROUP_SIZE + GROUP_SIZE);

  return (
    <div
      className="mt-12 lg:mt-16 border-t border-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* cards */}
      <div key={animKey} className="grid grid-cols-1 md:grid-cols-3 gap-0 anim-fade-slide">
        {group.map((a, i) => (
          <Link
            key={a.slug}
            href={`/media/${a.slug}`}
            className={`group flex flex-col gap-3 py-6 px-1 md:px-6 ${i > 0 ? "md:border-l border-border-line" : ""}`}
          >
            <div className="flex items-center justify-between">
              <span className="section-label text-ink-muted">{a.categoryLabel}</span>
              <span className="text-[10px] text-ink-muted tracking-widest">{a.date}</span>
            </div>
            <h3 className="font-serif-h text-base lg:text-lg font-bold text-ink leading-snug group-hover:text-coral transition-colors line-clamp-2">
              {a.title}
            </h3>
            <span className="text-xs text-ink-muted mt-auto">続きを読む →</span>
          </Link>
        ))}
      </div>

      {/* dots + counter */}
      {numGroups > 1 && (
        <div className="flex items-center justify-between px-1 md:px-6 py-3 border-t border-border-line">
          <div className="flex gap-2">
            {Array.from({ length: numGroups }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`${i + 1}ページ目`}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === active ? "bg-ink" : "bg-border-line hover:bg-ink-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] tracking-[.24em] text-ink-muted">
            {active + 1} / {numGroups}
          </span>
        </div>
      )}
    </div>
  );
}
