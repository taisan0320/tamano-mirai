import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
};

export default function PrivacyPage() {
  return (
    <div className="bg-paper min-h-screen">
      <div className="bg-ocean py-16">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="section-label text-white/60 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-white/80">PRIVACY POLICY</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-black text-white">プライバシーポリシー</h1>
        </div>
      </div>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white border border-border-line p-8 sm:p-12 rounded-xl prose-article">
            <p>
              特定非営利活動法人 玉野SDGsみらいづくりセンター（以下「当法人」）は、
              お客様の個人情報の保護を重要な責務と考え、以下のプライバシーポリシーを定めます。
            </p>

            <h2>1. 個人情報の収集について</h2>
            <p>
              当法人は、お問い合わせフォームやイベント申込み等を通じて、
              氏名・メールアドレス・電話番号等の個人情報をご提供いただく場合があります。
            </p>

            <h2>2. 個人情報の利用目的</h2>
            <p>収集した個人情報は、以下の目的のためにのみ使用します。</p>
            <ul>
              <li>お問い合わせへの回答・対応</li>
              <li>イベント・プログラムに関するご連絡</li>
              <li>活動報告・ニュースレターの送付（同意いただいた場合）</li>
            </ul>

            <h2>3. 個人情報の第三者提供</h2>
            <p>
              当法人は、法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。
            </p>

            <h2>4. 個人情報の管理</h2>
            <p>
              当法人は、個人情報の漏洩・紛失・毀損を防ぐため、適切な安全管理措置を講じます。
            </p>

            <h2>5. 個人情報の開示・訂正・削除</h2>
            <p>
              ご本人からの個人情報の開示・訂正・削除等のご要望は、
              下記お問い合わせ窓口にてお受けします。
            </p>

            <h2>6. プライバシーポリシーの変更</h2>
            <p>
              当法人は、必要に応じて本ポリシーを変更することがあります。
              変更後のポリシーは本ページにて公開します。
            </p>

            <h2>7. お問い合わせ</h2>
            <p>
              プライバシーポリシーに関するお問い合わせは、以下までご連絡ください。<br />
              E-mail: info@npo-tamano-mirai.com<br />
              TEL: 090-1356-3655（平日9:00〜18:00）
            </p>

            <p className="text-xs text-ink-muted mt-8">制定日：2024年1月1日</p>
          </div>
        </div>
      </section>
    </div>
  );
}
