import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "玉野SDGsみらいづくりセンターへのご相談・お問い合わせはこちらから。",
};

const inquiryTypes = [
  { label: "一般的なお問い合わせ", value: "general" },
  { label: "プログラムへの参加・申込み", value: "program" },
  { label: "協力・連携のご相談", value: "partner" },
  { label: "取材・メディア", value: "media" },
  { label: "その他", value: "other" },
];

export default function ContactPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="bg-ink py-20">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="section-label text-white/40 mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-white/70 transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-white/60">CONTACT</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">お問い合わせ</h1>
          <p className="text-white/80 text-base max-w-xl leading-relaxed">
            ご相談・ご質問・連携のご提案など、お気軽にご連絡ください。
          </p>
        </div>
      </div>

      <section className="bg-paper-alt py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form */}
            <div className="lg:col-span-8">
              <div className="bg-white border border-border-line p-8 sm:p-12 rounded-xl">
                <h2 className="text-xl font-bold text-ink mb-8 pb-6 border-b border-border-line">お問い合わせフォーム</h2>
                <form
                  action="https://formsubmit.co/info@npo-tamano-mirai.com"
                  method="POST"
                  className="space-y-6"
                >
                  <input type="hidden" name="_subject" value="【HPお問い合わせ】玉野SDGsみらいづくりセンター" />
                  <input type="hidden" name="_next" value="https://npo-tamano-mirai.com/contact/thanks" />
                  <input type="hidden" name="_captcha" value="false" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block section-label text-ink-muted mb-2">
                        お名前 <span className="text-coral">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="山田 太郎"
                        className="w-full border border-border-line bg-paper px-4 py-3 text-sm text-ink rounded-lg focus:outline-none focus:border-ocean transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block section-label text-ink-muted mb-2">
                        メールアドレス <span className="text-coral">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="example@email.com"
                        className="w-full border border-border-line bg-paper px-4 py-3 text-sm text-ink rounded-lg focus:outline-none focus:border-ocean transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block section-label text-ink-muted mb-2">
                      所属・団体名（任意）
                    </label>
                    <input
                      type="text"
                      name="organization"
                      placeholder="○○NPO法人 / 玉野市在住"
                      className="w-full border border-border-line bg-paper px-4 py-3 text-sm text-ink rounded-lg focus:outline-none focus:border-ocean transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block section-label text-ink-muted mb-2">
                      お問い合わせの種別 <span className="text-coral">*</span>
                    </label>
                    <select
                      name="type"
                      required
                      className="w-full border border-border-line bg-paper px-4 py-3 text-sm text-ink rounded-lg focus:outline-none focus:border-ocean transition-colors"
                    >
                      <option value="">選択してください</option>
                      {inquiryTypes.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block section-label text-ink-muted mb-2">
                      お問い合わせ内容 <span className="text-coral">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={7}
                      placeholder="ご相談内容・ご質問をご記入ください"
                      className="w-full border border-border-line bg-paper px-4 py-3 text-sm text-ink rounded-lg focus:outline-none focus:border-ocean transition-colors resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacy"
                      required
                      className="mt-1"
                    />
                    <label htmlFor="privacy" className="text-sm text-ink-muted">
                      <Link href="/privacy" className="text-ocean underline hover:no-underline">
                        プライバシーポリシー
                      </Link>
                      に同意します
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-ocean text-white font-bold py-4 text-sm rounded-full hover:bg-ocean-dark transition-colors"
                  >
                    送信する →
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <aside className="lg:col-span-4 space-y-4">
              <div className="bg-white border border-border-line p-8 rounded-xl">
                <h2 className="section-label text-ink-muted mb-6">CONTACT INFO</h2>
                <ul className="space-y-6">
                  <li>
                    <p className="section-label text-ink-muted mb-1">電話番号</p>
                    <a href="tel:09013563655" className="text-base font-bold text-ink hover:text-ocean transition-colors">
                      090-1356-3655
                    </a>
                  </li>
                  <li>
                    <p className="section-label text-ink-muted mb-1">メール</p>
                    <a href="mailto:info@npo-tamano-mirai.com" className="text-sm font-bold text-ink hover:text-ocean transition-colors break-all">
                      info@npo-tamano-mirai.com
                    </a>
                  </li>
                  <li>
                    <p className="section-label text-ink-muted mb-1">受付時間</p>
                    <p className="text-sm font-bold text-ink">平日 9:00〜18:00</p>
                    <p className="text-xs text-ink-muted">土日祝日は定休</p>
                  </li>
                  <li>
                    <p className="section-label text-ink-muted mb-1">所在地</p>
                    <p className="text-sm font-bold text-ink leading-snug">
                      〒706-0142<br />
                      岡山県玉野市迫間2252番地３
                    </p>
                  </li>
                </ul>
              </div>

              <div className="bg-ocean-pale border border-ocean/20 p-6 rounded-xl">
                <p className="section-label text-ocean mb-2">返信について</p>
                <p className="text-sm text-ink-muted leading-relaxed">
                  お問い合わせには、通常2〜3営業日以内にご返信します。
                  お急ぎの場合はお電話でご連絡ください。
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
