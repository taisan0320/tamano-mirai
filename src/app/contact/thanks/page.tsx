import type { Metadata } from "next";
import Link from "next/link";
import { StaticPageLayout } from "@/components/ArchiveLayout";

export const metadata: Metadata = {
  title: "送信完了",
  description: "お問い合わせを受け付けました。",
};

export default function ThanksPage() {
  return (
    <StaticPageLayout
      label="THANKS"
      title="送信完了"
      breadcrumb={[{ label: "お問い合わせ", href: "/contact" }]}
    >
      <div className="rounded border border-border-line p-6">
        <h2 className="text-[16px] font-bold text-ink">
          お問い合わせを受け付けました
        </h2>
        <p className="mt-3 text-[13px] leading-[1.9] text-ink-soft">
          ご連絡いただきありがとうございます。
          <br />
          通常2〜3営業日以内にご返信いたします。
          <br />
          お急ぎの場合はお電話（090-1356-3655／平日 9:00〜18:00）でご連絡ください。
        </p>
        <Link
          href="/"
          className="mt-5 block rounded bg-ocean py-3 text-center text-[14px] font-bold leading-none text-white hover:bg-ocean-dark"
        >
          トップページへ戻る
        </Link>
      </div>
    </StaticPageLayout>
  );
}
