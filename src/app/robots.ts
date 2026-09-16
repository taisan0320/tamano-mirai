import type { MetadataRoute } from "next";

/* 検索エンジンへの案内（/robots.txt として配信される）。
   すべてのページをクロールしてよいことと、サイトマップの場所を伝える。
   Search Console に登録していない検索エンジンにも、ここから場所が伝わる。 */

const BASE_URL = "https://npo-tamano-mirai.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
