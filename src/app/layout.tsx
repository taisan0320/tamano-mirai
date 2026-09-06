import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopicBar from "@/components/TopicBar";

export const metadata: Metadata = {
  title: {
    default: "玉野SDGsみらいづくりセンター",
    template: "%s | 玉野SDGsみらいづくりセンター",
  },
  description:
    "岡山県玉野市を拠点とする中間支援NPO。市民・企業・行政をつなぎ、住み続けたい・住んでみたい町づくりを支援します。",
  keywords: ["玉野市", "NPO", "SDGs", "まちづくり", "地域活動", "中間支援"],
  openGraph: {
    siteName: "玉野SDGsみらいづくりセンター",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // html に scroll-smooth は付けない。付けると、ページ移動のときに
  // Next.js が行う「先頭へ戻すスクロール」がアニメーションになり、
  // 新しいページが前の位置（ページ中ほど）から上へスーッと動いて見えてしまう。
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <TopicBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
