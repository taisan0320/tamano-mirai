"use client";

import { useState } from "react";

/** 記事URLをコピーするボタン。押すと一時的に「コピーしました」に変わる。 */
export default function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // クリップボードが使えない環境では何もしない
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded border border-border-line px-3 py-2 text-[12px] font-bold text-ink hover:bg-[rgba(34,34,34,.05)]"
    >
      {copied ? "コピーしました" : "リンクをコピー"}
    </button>
  );
}
