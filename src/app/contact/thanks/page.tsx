import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "送信完了 | お問い合わせ",
  description: "お問い合わせを受け付けました。",
};

export default function ThanksPage() {
  return (
    <div>
      <div className="bg-ink py-20">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="section-label text-white/40 mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-white/70 transition-colors">HOME</Link>
            <span>/</span>
            <Link href="/contact" className="hover:text-white/70 transition-colors">CONTACT</Link>
            <span>/</span>
            <span className="text-white/60">THANKS</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">送信完了</h1>
        </div>
      </div>

      <section className="bg-paper-alt py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mx-auto text-center">
            <div className="bg-white border border-border-line p-12 rounded-xl">
              <div className="w-16 h-16 bg-ocean-pale rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-ocean" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-ink mb-4">お問い合わせを受け付けました</h2>
              <p className="text-sm text-ink-muted leading-relaxed mb-8">
                ご連絡いただきありがとうございます。<br />
                通常2〜3営業日以内にご返信いたします。<br />
                お急ぎの場合はお電話でご連絡ください。
              </p>
              <Link
                href="/"
                className="inline-block bg-ocean text-white font-bold py-3 px-8 text-sm rounded-full hover:bg-ocean-dark transition-colors"
              >
                トップページへ戻る
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
