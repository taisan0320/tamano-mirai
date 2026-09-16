export type Category =
  | "event"
  | "interview"
  | "news"
  | "story"
  | "blog"
  | "learning"
  | "explore"
  | "volunteer";

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
  interview: "動く人たち",
  news: "お知らせ",
  story: "玉野の話",
  blog: "コーディネーター日記",
  learning: "学びを、考える",
  explore: "探究学習サポート",
  volunteer: "ボランティア募集",
};

export const CATEGORY_ROUTE: Record<Category, string> = {
  event: "/events",
  interview: "/interviews",
  blog: "/blog",
  learning: "/learning",
  news: "/news",
  story: "/interviews",
  explore: "/programs",
  volunteer: "/join",
};

/** 「学びを、考える。」の中を見分けるタグ */
export const LEARNING_TAGS: readonly string[] = ["AI", "教育"];

export function getArticleUrl(article: Pick<Article, "category" | "slug">): string {
  return `/media/${article.slug}`;
}

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

import {
  createClient,
  type MicroCMSListContent,
  type MicroCMSObjectContent,
} from "microcms-js-sdk";
import { fetchTopObject } from "@/lib/top";

type CMSArticle = MicroCMSListContent & {
  title: string;
  excerpt: string;
  category: Category | Category[];
  date?: string;
  author?: string;
  thumbnail?: { url: string };
  body: string;
  tags?: string[] | string;
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

/** タグ欄を配列にそろえる。文字入力で「エジソン, AI」のように書かれても分解する */
function normalizeTags(tags: string[] | string | undefined): string[] {
  if (!tags) return [];
  const list = Array.isArray(tags) ? tags : tags.split(/[,、，\s]+/);
  return list.map((t) => t.trim()).filter(Boolean);
}

function cmsToArticle(item: CMSArticle): Article {
  const category = Array.isArray(item.category) ? item.category[0] : item.category;
  return {
    slug: item.id,
    title: item.title,
    excerpt: item.excerpt,
    // 未知のカテゴリ（入力ミスや、コードより先にCMSへ追加した値）はお知らせ扱い
    category:
      category && Object.prototype.hasOwnProperty.call(CATEGORY_LABEL, category)
        ? category
        : "news",
    date: item.date ?? item.publishedAt ?? new Date().toISOString(),
    author: item.author,
    thumbnail: item.thumbnail?.url,
    body: item.body,
    tags: normalizeTags(item.tags),
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
    try {
      const res = await client.getList<CMSArticle>({
        endpoint: "articles",
        queries: { limit: 100, orders: "-date" },
      });
      const results = res.contents
        .map(cmsToArticle)
        .filter((a) => a.category === category)
        .slice(0, limit);
      if (results.length > 0) return results;
    } catch {
      // fall through to static data
    }
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

/** サイトマップ用：記事のURLと最終更新日。microCMS の revisedAt（最終更新）を使う */
export async function fetchAllSlugsWithDates(): Promise<
  { slug: string; lastModified: string }[]
> {
  if (client) {
    const res = await client.getList<CMSArticle & { revisedAt?: string }>({
      endpoint: "articles",
      queries: { limit: 100, fields: "id,revisedAt,publishedAt,date" },
    });
    return res.contents.map((a) => ({
      slug: a.id,
      lastModified: a.revisedAt ?? a.publishedAt ?? a.date ?? "",
    }));
  }
  return articles.map((a) => ({ slug: a.slug, lastModified: a.date }));
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

// ─── トップページ設定（microCMS のオブジェクト形式 API「top」） ─────────────
// 編集部が「トップの一番大きな記事」と「今週のピックアップ」を手で選ぶための画面。
// 未作成・未設定のときは、これまでどおり新着順で自動表示する。

type CMSTopSettings = MicroCMSObjectContent & {
  /** トップの記事（コンテンツ参照・1件） */
  hero?: CMSArticle | null;
  /** 今週のピックアップ（複数コンテンツ参照・最大5件） */
  pickups?: (CMSArticle | null)[];
};

export interface TopSettings {
  hero: Article | null;
  pickups: Article[];
}

export async function fetchTopSettings(): Promise<TopSettings> {
  const res = await fetchTopObject<CMSTopSettings>();
  if (!res) return { hero: null, pickups: [] };
  // 参照先の記事が非公開・削除されていると、null や中身の欠けたものが混ざるので除く
  const usable = (p: CMSArticle | null | undefined): p is CMSArticle => Boolean(p?.title);
  return {
    hero: usable(res.hero) ? cmsToArticle(res.hero) : null,
    pickups: (res.pickups ?? []).filter(usable).map(cmsToArticle),
  };
}

/** 今週のピックアップ。手で選んだものがあればそれ、なければ新着順 */
export async function fetchPickups(n = 5): Promise<Article[]> {
  const { pickups } = await fetchTopSettings();
  if (pickups.length > 0) return pickups.slice(0, n);
  return fetchLatestArticles(n);
}
