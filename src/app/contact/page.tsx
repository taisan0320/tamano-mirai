import type { Metadata } from "next";
import Link from "next/link";
import { StaticPageLayout, PageSection, FactList } from "@/components/ArchiveLayout";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "玉野SDGsみらいづくりセンターへのご相談・お問い合わせはこちらから。",
};

const inquiryTypes = [
  { label: "一般的なお問い合わせ", value: "general" },
  { label: "プログラムへの参加・申込み", value: "program" },
  { label: "協力・連携のご相談", value: "partner" },
  { label: "学校の授業づくりのご相談", value: "school" },
  { label: "講演・ファシリテーターのご依頼", value: "speaker" },
  { label: "取材・メディア", value: "media" },
  { label: "その他", value: "other" },
];

const fieldClass =
  "w-full rounded border border-border-line bg-paper px-3 py-2.5 text-[14px] text-ink placeholder:text-ink-muted focus:border-ink focus:outline-none";
const labelClass = "mb-1.5 block text-[12px] font-bold text-ink";

export default function ContactPage() {
  return (
    <StaticPageLayout
      label="CONTACT"
      title="お問い合わせ"
      description="ご相談・ご質問・連携のご提案など、お気軽にご連絡ください。"
      sidebar={
        <>
          <div className="mb-4 rounded border border-border-line p-4">
            <h2 className="mb-1">
              <span className="section-label block text-ink-muted">Contact Info</span>
              <span className="mt-1 block text-[14px] font-bold text-ink">連絡先</span>
            </h2>
            <ul className="mt-2 text-[13px]">
              <li className="border-t border-border-line py-2.5">
                <span className="block text-[11px] text-ink-soft">電話番号</span>
                <a href="tel:09013563655" className="font-bold text-ink hover:text-ocean">
                  090-1356-3655
                </a>
              </li>
              <li className="border-t border-border-line py-2.5">
                <span className="block text-[11px] text-ink-soft">メール</span>
                <a
                  href="mailto:info@npo-tamano-mirai.com"
                  className="break-all font-bold text-ink hover:text-ocean"
                >
                  info@npo-tamano-mirai.com
                </a>
              </li>
              <li className="border-t border-border-line py-2.5">
                <span className="block text-[11px] text-ink-soft">受付時間</span>
                <span className="font-bold text-ink">平日 9:00〜18:00</span>
                <span className="block text-[11px] text-ink-muted">土日祝日は定休</span>
              </li>
              <li className="border-t border-border-line py-2.5">
                <span className="block text-[11px] text-ink-soft">所在地</span>
                <span className="font-bold leading-[1.6] text-ink">
                  〒706-0142
                  <br />
                  岡山県玉野市迫間2252番地３
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded border border-border-line p-4">
            <h2 className="mb-1">
              <span className="section-label block text-ink-muted">Reply</span>
              <span className="mt-1 block text-[14px] font-bold text-ink">
                返信について
              </span>
            </h2>
            <p className="mt-2 text-[12px] leading-[1.7] text-ink-soft">
              お問い合わせには、通常2〜3営業日以内にご返信します。
              お急ぎの場合はお電話でご連絡ください。
            </p>
          </div>
        </>
      }
    >
      <PageSection label="Form" title="お問い合わせフォーム">
        <form
          action="https://formspree.io/f/xwvyngzj"
          method="POST"
          className="flex flex-col gap-4"
        >
          <input
            type="hidden"
            name="_next"
            value="https://npo-tamano-mirai.com/contact/thanks"
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="name">
                お名前 <span className="text-ocean">*</span>
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                placeholder="山田 太郎"
                className={fieldClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="email">
                メールアドレス <span className="text-ocean">*</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="example@email.com"
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="organization">
              所属・団体名（任意）
            </label>
            <input
              id="organization"
              type="text"
              name="organization"
              placeholder="○○NPO法人 / 玉野市在住"
              className={fieldClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="type">
              お問い合わせの種別 <span className="text-ocean">*</span>
            </label>
            <select id="type" name="type" required className={fieldClass}>
              <option value="">選択してください</option>
              {inquiryTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="message">
              お問い合わせ内容 <span className="text-ocean">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={7}
              placeholder="ご相談内容・ご質問をご記入ください"
              className={`${fieldClass} resize-none`}
            />
          </div>

          <div className="flex items-start gap-2.5">
            <input type="checkbox" id="privacy" required className="mt-1" />
            <label htmlFor="privacy" className="text-[13px] text-ink-soft">
              <Link href="/privacy" className="font-bold text-ocean hover:underline">
                プライバシーポリシー
              </Link>
              に同意します
            </label>
          </div>

          <button
            type="submit"
            className="rounded bg-ocean py-3 text-[14px] font-bold leading-none text-white hover:bg-ocean-dark"
          >
            送信する
          </button>
        </form>
      </PageSection>

      <PageSection label="Access" title="所在地・受付時間">
        <FactList
          items={[
            { term: "所在地", value: "〒706-0142 岡山県玉野市迫間2252番地３" },
            { term: "TEL", value: "090-1356-3655" },
            { term: "Email", value: "info@npo-tamano-mirai.com" },
            { term: "受付時間", value: "平日 9:00〜18:00（土日祝日は定休）" },
          ]}
        />
      </PageSection>
    </StaticPageLayout>
  );
}
