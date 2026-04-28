import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MapPin, Phone, Mail, Clock, MessageSquare, Users, Handshake } from "lucide-react";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "玉野SDGsみらいづくりセンターへのご相談・お問い合わせはこちらから。",
};

const inquiryTypes = [
  { icon: MessageSquare, label: "一般的なお問い合わせ", value: "general" },
  { icon: Users, label: "プログラムへの参加・申込み", value: "program" },
  { icon: Handshake, label: "協力・連携のご相談", value: "partner" },
  { icon: MessageSquare, label: "取材・メディア", value: "media" },
  { icon: MessageSquare, label: "その他", value: "other" },
];

export default function ContactPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="bg-primary py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">ホーム</Link>
            <ChevronRight size={12} />
            <span className="text-white">お問い合わせ</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">お問い合わせ</h1>
          <p className="text-slate-300 text-lg max-w-xl leading-relaxed">
            ご相談・ご質問・連携のご提案など、お気軽にご連絡ください。
          </p>
        </div>
      </div>

      <section className="bg-surface py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 sm:p-10 border border-border">
                <h2 className="text-xl font-bold text-primary mb-6">お問い合わせフォーム</h2>
                <form
                  action="https://formsubmit.co/info@npo-tamano-mirai.com"
                  method="POST"
                  className="space-y-5"
                >
                  <input type="hidden" name="_subject" value="【HPお問い合わせ】玉野SDGsみらいづくりセンター" />
                  <input type="hidden" name="_next" value="https://npo-tamano-mirai.com/contact/thanks" />
                  <input type="hidden" name="_captcha" value="false" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        お名前 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="山田 太郎"
                        className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                        メールアドレス <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="example@email.com"
                        className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      所属・団体名（任意）
                    </label>
                    <input
                      type="text"
                      name="organization"
                      placeholder="○○NPO法人 / 玉野市在住"
                      className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      お問い合わせの種別 <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="type"
                      required
                      className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors bg-white"
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
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      お問い合わせ内容 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={7}
                      placeholder="ご相談内容・ご質問をご記入ください"
                      className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacy"
                      required
                      className="mt-1 accent-primary"
                    />
                    <label htmlFor="privacy" className="text-sm text-slate-600">
                      <Link href="/privacy" className="text-primary underline hover:no-underline">
                        プライバシーポリシー
                      </Link>
                      に同意します
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-light transition-colors"
                  >
                    送信する
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <aside className="space-y-5">
              <div className="bg-white rounded-2xl p-6 border border-border">
                <h2 className="text-sm font-bold text-slate-700 mb-5">直接のご連絡</h2>
                <ul className="space-y-4">
                  <li className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone size={15} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5">電話番号</p>
                      <a href="tel:09013563655" className="text-sm font-semibold text-slate-800 hover:text-primary transition-colors">
                        090-1356-3655
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail size={15} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5">メール</p>
                      <a href="mailto:info@npo-tamano-mirai.com" className="text-sm font-semibold text-slate-800 hover:text-primary transition-colors break-all">
                        info@npo-tamano-mirai.com
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock size={15} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5">受付時間</p>
                      <p className="text-sm font-semibold text-slate-800">
                        平日 9:00〜18:00
                      </p>
                      <p className="text-xs text-slate-500">土日祝日は定休</p>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin size={15} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5">所在地</p>
                      <p className="text-sm font-semibold text-slate-800 leading-snug">
                        〒706-0142<br />
                        岡山県玉野市迫間2252番地３
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-accent-pale rounded-2xl p-5 border border-accent/20">
                <p className="text-sm font-bold text-accent mb-2">返信について</p>
                <p className="text-sm text-slate-600 leading-relaxed">
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
