export type Category = "event" | "interview" | "news";

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
}

export const CATEGORY_LABEL: Record<Category, string> = {
  event: "イベント情報",
  interview: "インタビュー",
  news: "お知らせ",
};

export const CATEGORY_COLOR: Record<Category, string> = {
  event: "bg-amber-pale text-amber",
  interview: "bg-accent-pale text-accent",
  news: "bg-blue-50 text-primary",
};

export const articles: Article[] = [
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
