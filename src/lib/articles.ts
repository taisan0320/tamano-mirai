export type Category = "event" | "interview" | "news" | "story" | "blog" | "explore" | "volunteer";

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  date: string;
  author?: string;
  thumbnail?: string;
  body: string;
  tags?: string[];
  isHtml?: boolean;
}

export const CATEGORY_LABEL: Record<Category, string> = {
  event: "イベント情報",
  interview: "まちの人・団体",
  news: "お知らせ",
  story: "玉野の話",
  blog: "日記",
  explore: "探究学習サポート",
  volunteer: "ボランティア募集",
};

export const CATEGORY_COLOR: Record<Category, string> = {
  event: "bg-amber-pale text-amber",
  interview: "bg-ocean-pale text-ocean",
  news: "bg-forest-pale text-forest",
  story: "bg-coral-pale text-coral",
  blog: "bg-forest-pale text-forest",
  explore: "bg-ocean-pale text-ocean",
  volunteer: "bg-coral-pale text-coral",
};

export const CATEGORY_GRADIENT: Record<Category, string> = {
  event: "grad-event",
  interview: "grad-interview",
  news: "grad-news",
  story: "grad-story",
  blog: "grad-blog",
  explore: "grad-explore",
  volunteer: "grad-volunteer",
};

export const CATEGORY_ROUTE: Record<Category, string> = {
  event: "/events",
  interview: "/stories",
  blog: "/blog",
  news: "/news",
  story: "/stories",
  explore: "/programs",
  volunteer: "/join",
};

export function getArticleUrl(article: Pick<Article, "category" | "slug">): string {
  return `/media/${article.slug}`;
}

export function getCategoryListUrl(category: Category): string {
  return CATEGORY_ROUTE[category];
}

export const CATEGORY_BADGE: Record<Category, string> = {
  event: "bg-amber-pale text-amber border border-amber/30",
  interview: "bg-ocean-pale text-ocean border border-ocean/30",
  news: "bg-forest-pale text-forest border border-forest/30",
  story: "bg-coral-pale text-coral border border-coral/30",
  blog: "bg-forest-pale text-forest border border-forest/30",
  explore: "bg-ocean-pale text-ocean border border-ocean/30",
  volunteer: "bg-coral-pale text-coral border border-coral/30",
};

export const articles: Article[] = [
  {
    slug: "coordinator-diary-3",
    title: "コーディネーター3日目｜想いが、ついにカタチに",
    excerpt: "3年目を迎えた学校地域連携コーディネーターとして、今年初めて「自分が動かした」と感じられる出来事がありました。",
    category: "blog",
    date: "2026-04-22",
    author: "西田井 祐也",
    body: `## コーディネーター3日目｜想いが、ついにカタチに

3年目を迎えた学校地域連携コーディネーターとして、今年初めて「自分が動かした」と感じられる出来事がありました。

（詳細は準備中です）`,
    tags: ["コーディネーター日記", "学校連携", "探究学習"],
  },
  {
    slug: "coordinator-diary-2",
    title: "コーディネーター日記 Vol.2｜探究って、なんだろう",
    excerpt: "「総合的な探究の時間」って何をする時間なんだろう——学校の先生と話しながら、改めて考えました。",
    category: "blog",
    date: "2026-04-17",
    author: "西田井 祐也",
    body: `## コーディネーター日記 Vol.2｜探究って、なんだろう

「総合的な探究の時間」って何をする時間なんだろう——学校の先生と話しながら、改めて考えました。

（詳細は準備中です）`,
    tags: ["コーディネーター日記", "探究学習"],
  },
  {
    slug: "coordinator-diary-1",
    title: "コーディネーター3年目がはじまりました",
    excerpt: "学校地域連携コーディネーターとして3年目がスタート。今年はどんな出会いが待っているのか、ワクワクしながら書いています。",
    category: "blog",
    date: "2026-04-15",
    author: "西田井 祐也",
    body: `## コーディネーター3年目がはじまりました

学校地域連携コーディネーターとして3年目がスタート。今年はどんな出会いが待っているのか、ワクワクしながら書いています。

（詳細は準備中です）`,
    tags: ["コーディネーター日記", "学校連携"],
  },
  {
    slug: "fukuyama-park-50th",
    title: "今年で50周年！深山公園オープニングイベントでスタンプラリー",
    excerpt: "深山公園が開園50周年を迎えます。春の特別オープニングイベントでは、スタンプラリーや各種アトラクションが楽しめます。",
    category: "event",
    date: "2026-04-21",
    author: "玉野SDGsみらいづくりセンター",
    body: `## 今年で50周年！深山公園オープニングイベント

深山公園が開園50周年を迎えます。春の特別オープニングイベントでは、スタンプラリーや各種アトラクションが楽しめます。

（詳細は準備中です）`,
    tags: ["イベント", "深山公園", "50周年"],
  },
  {
    slug: "uno-port-naval",
    title: "護衛艦に乗れる！春の宇野港がにぎわう「第29回海上自衛隊記念日」",
    excerpt: "宇野港に護衛艦が一般公開されます。普段は立ち入れない護衛艦の甲板に上がれるチャンス。家族連れに大人気のイベントです。",
    category: "event",
    date: "2026-04-21",
    author: "玉野SDGsみらいづくりセンター",
    body: `## 護衛艦に乗れる！春の宇野港

宇野港に護衛艦が一般公開されます。普段は立ち入れない護衛艦の甲板に上がれるチャンスです。

（詳細は準備中です）`,
    tags: ["イベント", "宇野港", "海上自衛隊"],
  },
  {
    slug: "shibukaen-shark-feeding",
    title: "サメにエサをあげてみよう！渋川マリン水族館の体験イベント",
    excerpt: "渋川マリン水族館でサメへの餌やり体験イベントが開催されます。飼育員さんの解説を聞きながら、間近でサメを観察できます。",
    category: "event",
    date: "2026-04-10",
    author: "玉野SDGsみらいづくりセンター",
    body: `## サメにエサをあげてみよう！渋川マリン水族館

渋川マリン水族館でサメへの餌やり体験イベントが開催されます。

（詳細は準備中です）`,
    tags: ["イベント", "渋川マリン水族館", "体験"],
  },
  {
    slug: "tamano-sea-story",
    title: "瀬戸内海と生きる ── 玉野の漁師たちの朝",
    excerpt: "夜明け前から港に出て、海と向き合い続ける玉野の漁師たち。その暮らしと誇りを追いました。",
    category: "story",
    date: "2026-03-28",
    author: "編集部",
    body: `## 瀬戸内海と生きる

夜明け前の午前4時。玉野港には、すでに漁船のエンジン音が響いている。

（詳細は準備中です）`,
    tags: ["漁業", "瀬戸内海", "まち"],
  },
  {
    slug: "tamano-high-edison",
    title: "玉野高校のエジソンに参加してきました",
    excerpt: "玉野高校の探究学習発表会「エジソン」を見学しました。生徒たちが地域課題に向き合う姿に、大きな可能性を感じました。",
    category: "news",
    date: "2025-10-15",
    author: "玉野SDGsみらいづくりセンター",
    body: `## 玉野高校のエジソンに参加してきました

玉野高校の探究学習発表会「エジソン」を見学しました。

（詳細は準備中です）`,
    tags: ["探究学習", "高校生", "まちづくり"],
  },
  {
    slug: "interview-local-farmer",
    title: "「玉野の農業を次世代へ」〜若手農家・田中さんの挑戦",
    excerpt: "玉野市で有機農業に取り組む若手農家の田中さんにインタビュー。地域農業の課題と、新しい農業の形について語ってもらいました。",
    category: "interview",
    date: "2024-03-20",
    author: "編集部",
    body: `## 玉野の農業を次世代へ

玉野市南部で有機農業に取り組む田中さん（29歳）。

（詳細は準備中です）`,
    tags: ["農業", "若者", "インタビュー"],
  },
  {
    slug: "explore-school-collaboration",
    title: "玉野高校・探究学習「エジソンプロジェクト」に伴走しました",
    excerpt: "玉野高校2年生が地域課題に向き合う探究授業をサポート。生徒たちの問いが、地域の大人を動かすまでの記録です。",
    category: "explore",
    date: "2026-04-10",
    author: "玉野SDGsみらいづくりセンター",
    body: "（詳細は準備中です）",
    tags: ["探究学習", "高校連携", "エジソン"],
  },
  {
    slug: "volunteer-mirai-cafe-staff",
    title: "【募集中】みらいcafé 運営スタッフ（月1回・土曜）",
    excerpt: "毎月開催の市民交流会「みらいcafé」の企画・運営をお手伝いいただけるボランティアを募集しています。地域に関わる第一歩としてぴったりです。",
    category: "volunteer",
    date: "2026-04-20",
    author: "玉野SDGsみらいづくりセンター",
    body: "（詳細は準備中です）",
    tags: ["ボランティア", "みらいcafé"],
  },
  {
    slug: "interview-ceramics-artist",
    title: "「玉野の土で、玉野の器を」陶芸家・山本さんのものづくり",
    excerpt: "東京での会社員生活を離れ、玉野に移住して陶芸家になった山本さん。地域との向き合い方を聞きました。",
    category: "interview",
    date: "2024-02-28",
    author: "編集部",
    body: `## 「玉野の土で、玉野の器を」

東京で10年間デザイナーとして働いた山本さん（38歳）が、玉野市に移住して陶芸家になったのは3年前のこと。

（詳細は準備中です）`,
    tags: ["移住", "陶芸", "インタビュー"],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: Category): Article[] {
  return articles.filter((a) => a.category === category);
}

export function getLatestArticles(n: number): Article[] {
  return [...articles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, n);
}

export function getFeaturedArticle(): Article {
  return articles[0];
}

// ─── microCMS integration ────────────────────────────────────────────────────

import { createClient, type MicroCMSListContent } from "microcms-js-sdk";

type CMSArticle = MicroCMSListContent & {
  title: string;
  excerpt: string;
  category: Category;
  date?: string;
  author?: string;
  thumbnail?: { url: string };
  body: string;
  tags?: string[];
};

const client =
  process.env.MICROCMS_SERVICE_DOMAIN &&
  process.env.MICROCMS_API_KEY &&
  !process.env.MICROCMS_SERVICE_DOMAIN.startsWith("your-")
    ? createClient({
        serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
        apiKey: process.env.MICROCMS_API_KEY,
      })
    : null;

function cmsToArticle(item: CMSArticle): Article {
  return {
    slug: item.id,
    title: item.title,
    excerpt: item.excerpt,
    category: item.category,
    date: item.date ?? item.publishedAt ?? new Date().toISOString(),
    author: item.author,
    thumbnail: item.thumbnail?.url,
    body: item.body,
    tags: item.tags,
    isHtml: true,
  };
}

export async function fetchLatestArticles(limit = 10): Promise<Article[]> {
  if (client) {
    const res = await client.getList<CMSArticle>({
      endpoint: "articles",
      queries: { limit, orders: "-date" },
    });
    return res.contents.map(cmsToArticle);
  }
  return getLatestArticles(limit);
}

export async function fetchArticlesByCategory(
  category: Category,
  limit = 10
): Promise<Article[]> {
  if (client) {
    const res = await client.getList<CMSArticle>({
      endpoint: "articles",
      queries: { limit, orders: "-date", filters: `category[equals]${category}` },
    });
    return res.contents.map(cmsToArticle);
  }
  return getArticlesByCategory(category).slice(0, limit);
}

export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  if (client) {
    try {
      const item = await client.getListDetail<CMSArticle>({
        endpoint: "articles",
        contentId: slug,
      });
      return cmsToArticle(item);
    } catch {
      return null;
    }
  }
  return getArticleBySlug(slug) ?? null;
}

export async function fetchAllSlugs(): Promise<string[]> {
  if (client) {
    const res = await client.getList<CMSArticle>({
      endpoint: "articles",
      queries: { limit: 100, fields: "id" },
    });
    return res.contents.map((a) => a.id);
  }
  return articles.map((a) => a.slug);
}
