import type { Article } from "@/lib/articles";
import { authorName } from "@/lib/format";

/* 検索エンジン向けの情報。
   - BASE_URL：サイトの正式なURL（canonical・構造化データで使う）
   - 構造化データ（JSON-LD）：団体情報と記事情報を、検索エンジンが読める形で表す。
     検索結果での見え方（団体名・住所・公開日など）に使われる。 */

export const BASE_URL = "https://npo-tamano-mirai.com";

export const ORG_NAME = "特定非営利活動法人 玉野SDGsみらいづくりセンター";
const OG_IMAGE = `${BASE_URL}/og.png`;

/** 団体情報。全ページの土台として1回だけ出す */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: ORG_NAME,
    alternateName: "玉野SDGsみらいづくりセンター",
    url: BASE_URL,
    logo: `${BASE_URL}/tamano-sdgs-logo.png`,
    image: OG_IMAGE,
    description:
      "岡山県玉野市を拠点とする中間支援NPO。市民・企業・行政をつなぎ、住み続けたい・住んでみたい町づくりを支援します。",
    email: "info@npo-tamano-mirai.com",
    telephone: "+81-90-1356-3655",
    foundingDate: "2024-03-21",
    address: {
      "@type": "PostalAddress",
      postalCode: "706-0142",
      addressRegion: "岡山県",
      addressLocality: "玉野市",
      streetAddress: "迫間2252番地３",
      addressCountry: "JP",
    },
    areaServed: { "@type": "City", name: "玉野市" },
    sameAs: ["https://www.instagram.com/tamano.miraizukuri/"],
  };
}

/** 執筆者名から「｜社会教育士」などの肩書きを外す */
function personName(name: string): string {
  return name.replace(/[｜|（(].*$/, "").trim();
}

/** 記事ページの情報 */
export function articleJsonLd(article: Article, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    image: article.thumbnail ? [article.thumbnail] : [OG_IMAGE],
    author: { "@type": "Person", name: personName(authorName(article)) },
    publisher: {
      "@type": "Organization",
      name: ORG_NAME,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/tamano-sdgs-logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "ja",
  };
}
