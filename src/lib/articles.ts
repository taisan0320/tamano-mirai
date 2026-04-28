export type Category = "event" | "interview" | "news" | "story";

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
  isHtml?: boolean; // true when body comes from microCMS rich editor
}

export const CATEGORY_LABEL: Record<Category, string> = {
  event: "イベント情報",
  interview: "インタビュー",
  news: "お知らせ",
  story: "玉野の話",
};

export const CATEGORY_COLOR: Record<Category, string> = {
  event: "bg-amber-pale text-amber",
  interview: "bg-ocean-pale text-ocean",
  news: "bg-forest-pale text-forest",
  story: "bg-coral-pale text-coral",
};

export const articles: Article[] = [
  {
    slug: "tamano-uminoeki-2024",
    title: "玉野・海の駅フェスタ2024 〜春の港に集まれ！〜",
    excerpt:
      "玉野港を舞台に、地元の海産物や飲食ブース、音楽ライブが楽しめる春の一大イベント。今年は過去最大規模で開催します。",
    category: "event",
    date: "2024-05-01",
    author: "玉野SDGsみらいづくりセンター",
    body: `## 玉野・海の駅フェスタ2024 開催のお知らせ

瀬戸内海を望む玉野港を舞台に、「海の駅フェスタ2024」を開催します。今年は過去最大規模となる50以上の出店ブースが集結し、地元漁師直送の新鮮な魚介や、地域の食材を使った料理が勢揃いします。

### イベント概要

- **日時**: 2024年5月18日（土）〜19日（日） 10:00〜16:00
- **場所**: 玉野港 多目的広場
- **入場**: 無料

### みどころ

地元の漁師さんによる「朝獲れ魚介の即売会」は毎年大人気。タコやカキ、サワラなど瀬戸内の恵みをその場で味わえます。午後からはステージイベントも開催。地元バンドの演奏や、子どもたちによるダンスパフォーマンスで港が賑やかになります。

また、今年は新企画として「玉野の海の未来を考えるトークセッション」も実施。地元漁師・研究者・市民が集い、豊かな海をどう守っていくかを語り合います。

家族連れはもちろん、玉野に初めて来る方にもおすすめのイベントです。春の玉野港に、ぜひお越しください！`,
    tags: ["イベント", "港", "海産物", "春"],
  },
  {
    slug: "zerochi-lab-2024",
    title: "ゼロイチラボ2024年度参加者募集！高校生のまちへの思いをカタチに",
    excerpt:
      "玉野市の高校生を対象にした実践型探究プログラム「ゼロイチラボ」の2024年度参加者を募集しています。全7回のプログラムを通じて、地域課題に取り組みます。",
    category: "event",
    date: "2024-04-15",
    author: "玉野SDGsみらいづくりセンター",
    body: `## ゼロイチラボ2024年度参加者募集

玉野市の高校生を対象にした実践型探究プログラム「ゼロイチラボ」の2024年度参加者を募集しています。

### プログラムの特徴

- 全7回（5月〜11月）の実践型プログラム
- 地域の課題発見からアイデア創出・実践まで
- 地域で活躍する社会人メンターのサポート
- 最終発表会で市民・行政に提案

### 対象

岡山県玉野市内に在住・通学する高校生

### 参加費

無料

### 申込み締切

2024年4月30日（火）

詳細・申込みは以下のお問い合わせフォームよりご連絡ください。`,
    tags: ["ゼロイチラボ", "高校生", "まちづくり"],
  },
  {
    slug: "mirai-cafe-april",
    title: "みらいcafé 4月 〜春の交流会〜 開催のお知らせ",
    excerpt:
      "4月の定期市民交流会「みらいcafé」を開催します。今回のテーマは「玉野でやってみたいこと」。気軽にご参加ください。",
    category: "event",
    date: "2024-04-01",
    author: "玉野SDGsみらいづくりセンター",
    body: `## みらいcafé 4月開催のお知らせ

毎月恒例の市民交流会「みらいcafé」を4月も開催します。

### 開催概要

- **日時**: 2024年4月27日（土）13:30〜15:30
- **場所**: 玉野SDGsみらいづくりセンター
- **参加費**: 無料（飲み物持参歓迎）
- **テーマ**: 「玉野でやってみたいこと」

### こんな方におすすめ

- 地域活動に興味があるけど何から始めればいいかわからない
- 仲間を探している
- 玉野をもっと好きになりたい

予約不要・途中参加退出OK。お気軽にどうぞ！`,
    tags: ["みらいcafé", "交流会", "市民参加"],
  },
  {
    slug: "tamano-sea-story",
    title: "瀬戸内海と生きる ── 玉野の漁師たちの朝",
    excerpt:
      "夜明け前から港に出て、海と向き合い続ける玉野の漁師たち。その暮らしと誇りを追いました。",
    category: "story",
    date: "2024-03-25",
    author: "編集部",
    body: `## 瀬戸内海と生きる

夜明け前の午前4時。玉野港には、すでに漁船のエンジン音が響いている。ゴム長靴を履いた漁師たちが、静かに、しかし素早く船の準備を進めている。

### 穏やかな海、厳しい仕事

瀬戸内海は「穏やかな内海」として知られるが、潮の流れは複雑で、天候の読み間違いは命取りになる。玉野で生まれ育った漁師の石原さん（62歳）は言う。「海は毎日違う顔をしている。同じ日は一日もない」。

タコ漁を専門とする石原さんのもとには、最近、都市部から移住してきた若者が弟子入りした。「最初は驚いた。でも、若い人が来てくれるのは嬉しい。この海の良さを知ってほしい」。

### 食卓に届くまで

早朝に揚がった魚介は、午前中には市場へ。玉野で水揚げされるマダコ、サワラ、カキは、その日のうちに岡山や関西の食卓に届く。「鮮度が命。時間との戦いです」と石原さんは笑う。

豊かな瀬戸内の海と生きる玉野の漁師たちの暮らしは、今日も夜明けとともに続いている。`,
    tags: ["漁業", "瀬戸内海", "まち"],
  },
  {
    slug: "interview-local-farmer",
    title: "「玉野の農業を次世代へ」〜若手農家・田中さんの挑戦",
    excerpt:
      "玉野市で有機農業に取り組む若手農家の田中さんにインタビュー。地域農業の課題と、新しい農業の形について語ってもらいました。",
    category: "interview",
    date: "2024-03-20",
    author: "編集部",
    body: `## 玉野の農業を次世代へ

玉野市南部で有機農業に取り組む田中さん（29歳）。農業大学を卒業後、故郷・玉野に戻り就農してから3年が経ちます。

### 地域農業の現状と課題

「玉野市の農家の平均年齢は65歳を超えています。担い手不足は深刻で、耕作放棄地も増えています」と田中さんは語ります。

一方で、「玉野の土と気候は有機農業に向いている。ここでしか作れない野菜がある」とも。

### 新しい農業の形

田中さんが取り組むのは、CSA（Community Supported Agriculture＝地域支援型農業）。市内の家庭に会員になってもらい、毎週旬の野菜を届ける仕組みです。

「農家と市民が直接つながることで、農業の価値が伝わり、地域の食文化も守れる」と話します。

### これからの夢

「5年後には、玉野の若い農家が10人以上集まるコミュニティを作りたい。農業を通じて玉野をもっと元気にしたいです」`,
    tags: ["農業", "若者", "インタビュー"],
  },
  {
    slug: "interview-ceramics-artist",
    title: "「玉野の土で、玉野の器を」陶芸家・山本さんのものづくり",
    excerpt:
      "東京での会社員生活を離れ、玉野に移住して陶芸家になった山本さん。地域との向き合い方を聞きました。",
    category: "interview",
    date: "2024-02-28",
    author: "編集部",
    body: `## 「玉野の土で、玉野の器を」

東京で10年間デザイナーとして働いた山本さん（38歳）が、玉野市に移住して陶芸家になったのは3年前のこと。「都会での暮らしに疲れたのではなく、もっと手で何かをつくりたいという気持ちが強くなった」と話す。

### 玉野との出会い

玉野を選んだのは、友人のすすめで訪れた「みらいcafé」がきっかけだった。「初めて来たのに、みんなが温かく迎えてくれた。この町に住んでみたいと思った」。

移住後、地元の陶芸家・中西さんに弟子入りし、玉野周辺の土を使った器づくりを始めた。瀬戸内の海の色を閉じ込めたような青磁と、素朴な土色の器が山本さんのシグネチャーになっている。

### 地域とのつながり

今では玉野市内の飲食店や直売所に作品を置いてもらい、地元の農産物や海産物と一緒に食卓を彩っている。「玉野の土から生まれた器に、玉野の食材が盛られる。それが理想の形」と目を細める。

工房は週末に一般開放しており、陶芸体験も受け付けている。玉野を訪れた際にはぜひ立ち寄ってほしい場所だ。`,
    tags: ["移住", "陶芸", "インタビュー"],
  },
  {
    slug: "mountain-trail-tamano",
    title: "玉野の山を歩く ── 里山が育む、つながりの風景",
    excerpt:
      "海だけじゃない。玉野の山々には、豊かな里山文化と、地域を守る人たちの姿があります。",
    category: "story",
    date: "2024-02-10",
    author: "編集部",
    body: `## 玉野の山を歩く

玉野市といえば、瀬戸内海の美しい海岸線が真っ先に浮かぶ。しかし市内を少し車で走ると、すぐに緑豊かな里山の風景に変わる。

### 里山で出会う人々

市北部の山間地区では、地元の高齢者グループが毎月山道の整備を続けている。「昔はみんな山を使っていた。たきぎを拾ったり、山菜を採ったり」と語るのは、活動をリードする岡本さん（74歳）。「今は人が来なくなったけど、道だけは守りたい」。

この里山保全活動には、近年、市内の若者やファミリー層も加わるようになった。SNSで活動を知り、「何か地域のために動きたい」と参加する人が増えているという。

### 四季折々の恵み

春にはワラビやゼンマイ、夏には涼しい木陰でのハイキング、秋には紅葉と松茸、冬には霜で輝く落ち葉の絨毯。玉野の里山は、一年中訪れる人を迎え入れる。

海と山、二つの自然が共存する玉野。その豊かさを守るのは、地道に活動を続ける市民の力だ。`,
    tags: ["里山", "自然", "玉野"],
  },
  {
    slug: "idobata-koza-report",
    title: "いどばた講座「地域活動のはじめかた」開催レポート",
    excerpt:
      "3月に開催した市民向け学習プログラム「いどばた講座」のレポートです。30名の参加者が地域活動について学び、意見交換しました。",
    category: "news",
    date: "2024-03-10",
    author: "玉野SDGsみらいづくりセンター",
    body: `## いどばた講座「地域活動のはじめかた」開催レポート

去る3月9日（土）、玉野市中央公民館にて「いどばた講座〜地域活動のはじめかた〜」を開催しました。

### 当日の様子

市内外から30名が参加。NPO・自治会・ボランティア団体など多様なバックグラウンドを持つ方々が集まりました。

前半は当センタースタッフによる「地域活動の基礎」レクチャー。後半はグループに分かれてのワークショップ形式で行い、参加者同士が自分の活動について語り合いました。

### 参加者の声

「一人でやってきたけど、同じ悩みを持つ人がいることがわかり心強くなった」
「具体的なスキルだけでなく、仲間づくりのヒントも得られた」

次回のいどばた講座は6月開催予定です。詳細はSNSでお知らせします。`,
    tags: ["いどばた講座", "市民活動", "レポート"],
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
