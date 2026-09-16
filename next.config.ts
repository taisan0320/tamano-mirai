import type { NextConfig } from "next";

// 2026年7月のWordPressからの移行で、旧サイトのURLが404になっていた。
// Search Consoleの実測では24本の旧URLが検索結果に残ったまま入口を失っていたため、
// それぞれ現行ページへ恒久転送する（permanent: true = 308。Googleは301と同等に扱う）。
const legacyRedirects = [
  // --- 固定ページ ---
  { source: "/%E5%9B%A3%E4%BD%93%E6%A6%82%E8%A6%81", destination: "/about", permanent: true },
  { source: "/%E4%BA%8B%E6%A5%AD%E5%86%85%E5%AE%B9", destination: "/services", permanent: true },
  { source: "/%E5%85%A5%E4%BC%9A%E6%A1%88%E5%86%85%E3%83%BB%E5%AF%84%E4%BB%98", destination: "/join", permanent: true },
  { source: "/%E3%81%8A%E5%95%8F%E3%81%84%E5%90%88%E3%82%8F%E3%81%9B", destination: "/contact", permanent: true },
  { source: "/%E3%81%8A%E7%9F%A5%E3%82%89%E3%81%9B", destination: "/news", permanent: true },
  { source: "/shiryou", destination: "/documents", permanent: true },
  {
    source: "/%E3%80%90%E9%AB%98%E6%A0%A1%E7%94%9F%E5%AF%BE%E8%B1%A1%E3%80%91%E7%AC%AC%EF%BC%91%E5%9B%9E-%E3%82%BC%E3%83%AD%E3%82%A4%E3%83%81%EF%BC%88%EF%BC%90%EF%BC%91%EF%BC%89%E3%83%A9%E3%83%9C",
    destination: "/programs",
    permanent: true,
  },

  // --- カテゴリー一覧 ---
  { source: "/category/event-info", destination: "/events", permanent: true },
  { source: "/category/infomation", destination: "/news", permanent: true },
  { source: "/category/learning", destination: "/learning", permanent: true },
  { source: "/category/report", destination: "/media", permanent: true },
  { source: "/category/seminar", destination: "/events", permanent: true },

  // --- 個別記事（旧スラッグ → 現行の記事ID） ---
  { source: "/idobata-canva", destination: "/media/hp84hqddcg", permanent: true },
  { source: "/seminar-instagram", destination: "/media/fmm2mdga9", permanent: true },
  {
    source: "/4%E6%9C%88%E3%81%AF%E8%B1%AA%E8%8F%AF%E5%AE%A2%E8%88%B9%E3%81%8C%E5%AE%87%E9%87%8E%E6%B8%AF%E3%81%AB%E7%B6%9A%E3%80%85%E5%85%A5%E6%B8%AF%EF%BC%814%E6%9C%8815%E6%97%A5%E3%81%AF%E3%80%8C%E3%82%A2",
    destination: "/media/sbui__4-ykt",
    permanent: true,
  },

  // --- 個別記事（旧の日付つきURL） ---
  {
    source: "/2024/02/12/%E5%80%89%E6%95%B7%E3%82%B1%E3%83%BC%E3%83%96%E3%83%AB%E3%83%86%E3%83%AC%E3%83%93%E3%81%A7%E5%9C%B0%E5%9F%9F%E4%BA%A4%E6%B5%81%E7%A5%AD%E3%81%8C%E6%94%BE%E9%80%81%E3%81%95%E3%82%8C%E3%81%BE%E3%81%97",
    destination: "/media/5erhghkdm",
    permanent: true,
  },
  {
    source: "/2025/10/15/%E7%8E%89%E9%87%8E%E9%AB%98%E6%A0%A1%E3%81%AE%E3%82%A8%E3%82%B8%E3%82%BD%E3%83%B3%E3%81%AB%E5%8F%82%E5%8A%A0%E3%81%97%E3%81%A6%E3%81%8D%E3%81%BE%E3%81%97%E3%81%9F%E3%80%82",
    destination: "/media/q2xqt9ip1jw8",
    permanent: true,
  },
  { source: "/2025/10/17/%E3%82%8F%E3%81%8F%E3%82%8F%E3%81%8F%E3%81%BF%E3%82%89%E3%81%84cafe", destination: "/media/pxdrvkpo52", permanent: true },
  {
    source: "/2025/10/27/idobata-canva-blog",
    destination: "/media/hp84hqddcg",
    permanent: true,
  },
  {
    source: "/2025/10/27/instagram-seminar-blog",
    destination: "/media/fmm2mdga9",
    permanent: true,
  },
  {
    source: "/2025/10/28/chousa-houkoku-blog",
    destination: "/media/l9vwaj5nv91",
    permanent: true,
  },
  {
    source: "/2025/11/10/%F0%9F%8C%BF%E3%82%8F%E3%81%8F%E3%82%8F%E3%81%8F%E3%81%BF%E3%82%89%E3%81%84cafe%E9%96%8B%E5%82%AC%EF%BC%81%E7%8E%89%E9%87%8E%E3%81%A7%E3%81%A4%E3%81%AA%E3%81%8C%E3%82%8B%E3%83%BB%E8%AA%9E%E3%82%8B",
    destination: "/media/t-e1fhd8t",
    permanent: true,
  },
  {
    source: "/2026/02/04/%E3%80%90%E5%8F%82%E5%8A%A0%E7%84%A1%E6%96%99%E3%80%91%E3%82%8F%E3%81%8F%E3%82%8F%E3%81%8F%E3%81%BF%E3%82%89%E3%81%84cafe%E3%81%A7%E3%80%81%E6%A5%BD%E3%81%97%E3%81%84%E3%81%93%E3%81%A8%E4%B8%80",
    destination: "/media/dzn7dfrsu8",
    permanent: true,
  },

  // --- 取りこぼし防止（上の個別指定に当たらなかった旧URLの受け皿） ---
  // 旧サイトは /年/月/日/記事名 と /年/月 の形式だった。現行サイトに同じ形のURLはない。
  { source: "/:y(\\d{4})/:m(\\d{2})/:d(\\d{2})/:slug*", destination: "/media", permanent: true },
  { source: "/:y(\\d{4})/:m(\\d{2})", destination: "/media", permanent: true },
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 「玉野の話」は「動く人たち」に統合。旧URLは恒久的に転送する。
      { source: "/stories", destination: "/interviews", permanent: true },
      ...legacyRedirects,
    ];
  },
};

export default nextConfig;
