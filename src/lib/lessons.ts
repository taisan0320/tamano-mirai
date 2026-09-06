import { createClient, type MicroCMSListContent } from "microcms-js-sdk";

/* ============================================================
   学校と、つくる。（授業の記録）

   ■ データの入れ方
   1. いまは下の staticLessons を編集すると反映される。
   2. microCMS に「lessons」エンドポイントを作ると、自動でそちらを読む。
      必要なフィールド名は CMSLesson の型のとおり。

   ■ コーディネーター日記との紐付け
   授業ごとに programTag（例：「エジソン」）を持たせている。
   日記の記事のタグに同じ言葉が入っていれば、その授業のページに自動で並ぶ。
   microCMS の設定変更は不要で、タグ欄に言葉を足すだけでつながる。
   ============================================================ */

export interface LessonPhoto {
  url: string;
  caption: string;
}

export interface Lesson {
  slug: string;
  /** 日記のタグと突き合わせる合言葉。例：「エジソン」 */
  programTag: string;
  school: string;
  target: string;
  title: string;
  summary: string;
  /** センターが担った役割 */
  roles: string[];
  /** 実施時期など */
  period: string;
  /** 企画・運営の主体 */
  organizer: string;
  /** 担当コーディネーター */
  coordinator: string;
  /** 参加した地域の大人の人数。数えられる授業だけ入れる（任意） */
  guestCount?: number;
  /** 人数の数え方の補足。例：「前年度実績」 */
  guestCountNote?: string;
  mainPhoto?: LessonPhoto;
  subPhotos: LessonPhoto[];
  /** 何を狙った授業か */
  aim: string;
  /** どう組み立てたか */
  design: string;
  /** コーディネーターがしたこと */
  work: string;
  /** トップページで大きく出す1件 */
  featured?: boolean;
}

const CMS_ASSET =
  "https://images.microcms-assets.io/assets/45c7a565086a4fe7ae9f8e8071059fe5";

// ─── 静的データ ──────────────────────────────────────────────
// ※ 内容はリニューアル案のプロトタイプから起こした暫定値です。
//    公開前に、学校名・実施時期・人数・本文の確認が必要です。

const staticLessons: Lesson[] = [
  {
    slug: "tamano-high-edison",
    programTag: "エジソン",
    school: "岡山県立玉野高等学校",
    target: "1年生 ・ 総合的な探究の時間",
    title: "地域交流プログラム「エジソン」——40人の大人が、学校にやってくる日",
    summary:
      "地域の大人と生徒が同じテーブルにつき、時間をともにする交流授業。他者と出会い、さまざまな価値観に触れる中で、生徒が気づけば自分自身のことを考えている——そんな場をどうつくるか。BGMの選び方から、グループの組み方、先輩が後輩の探究を設計する仕組みまで、たくさんの意図を詰めています。",
    roles: [
      "企画・単元設計",
      "地域ゲストの募集・調整",
      "テーマカードの設計",
      "当日ファシリテーション",
      "振り返りの設計",
      "実行委員会への伴走",
    ],
    period: "2026年10月（予定）",
    guestCount: 40,
    guestCountNote: "前年度実績",
    organizer: "2年生「エジソン実行委員会」＋ 玉野高校の先生方",
    coordinator: "西田井 祐也（地域学校連携コーディネーター）",
    mainPhoto: {
      url: `${CMS_ASSET}/d3c2e7370ce943a88add7a35c3ca8ad4/IMG_1346.jpg?w=1000`,
      caption:
        "体育館での地域交流の様子。生徒のグループに地域の大人が入り、テーマカードを手がかりに対話します。（掲載は本人の許可を得たもの）",
    },
    subPhotos: [
      {
        url: `${CMS_ASSET}/5bcce03be3d74e4991ae805c5730be4d/S__137707536.jpg?w=500`,
        caption: "対話に使うテーマカード",
      },
      {
        url: `${CMS_ASSET}/9f4dd030f81447beb0d9f36117abf78e/IMG_6487.JPG?w=500`,
        caption: "市民・行政・企業の関係を説明するスライド",
      },
      {
        url: `${CMS_ASSET}/5656f58b1c914dcfbac729f85ed73d0a/IMG_6062.JPG?w=500`,
        caption: "屋外で輪になって話す参加者",
      },
    ],
    aim: "他者と出会い、さまざまな価値観に触れる中で、生徒が気づけば自分自身のことを考えている——そんな場をどうつくるか。「地域を知る」ことを目的にすると学習は表面的になりがちです。この授業では、地域の大人一人ひとりの「選んできた道」を聞く時間として設計しています。",
    design:
      "生徒4〜5人のグループに地域の大人が入り、テーマカードを手がかりに対話します。カードには「仕事のやりがい」「高校生の頃の夢は何でしたか」「高校生の自分にアドバイスするとしたら何を伝えますか」といった問いが書かれていて、話の入口が用意されている状態をつくります。BGMの選び方、グループの組み方、席の配置まで、すべてに意図があります。",
    work: "地域の大人40名の声かけと当日までの調整、先生方との単元設計の打ち合わせ、実行委員会の生徒たちへの伴走。当日だけでなく、準備の数か月と、終わったあとの振り返りまでを一続きで担当しています。",
    featured: true,
  },
  {
    slug: "shoko-high-exchange",
    programTag: "商工高校 地域交流会",
    school: "岡山県立玉野商工高等学校",
    target: "地域交流会",
    title: "「職業」じゃなく、「人」を見せる——職業調べの設計を変えた",
    summary:
      "職業を調べる授業を、「その人がどう選んできたか」を聞く授業に組み替え。問いを書いたカードを対話の入口に置くことで、生徒の関心の持ち方が変わりました。",
    roles: ["授業設計", "問い・カードの設計", "ゲスト選定"],
    period: "2026年度",
    organizer: "玉野商工高等学校の先生方",
    coordinator: "西田井 祐也（地域学校連携コーディネーター）",
    mainPhoto: {
      url: `${CMS_ASSET}/5bcce03be3d74e4991ae805c5730be4d/S__137707536.jpg?w=900`,
      caption:
        "「高校生の頃の夢は何でしたか」などの問いを書いたテーマカード",
    },
    subPhotos: [],
    aim: "職業の名前や仕事内容を調べて終わりにせず、「その人がどう選んできたか」に触れる時間にすること。仕事の情報ではなく、選び方に関心が向くように設計しました。",
    design:
      "問いを書いたカードを対話の入口に置き、生徒がゲストに聞きたいことを自分の言葉にできる状態をつくります。",
    work: "授業の設計、問いとカードの設計、ゲストの選定と調整を担当しました。",
  },
  {
    slug: "tamano-high-presentation",
    programTag: "プレゼンテーション講座",
    school: "岡山県立玉野高等学校",
    target: "プレゼンテーション講座（11月予定）",
    title: "プレゼンから「相手」が消えている——伝える技術より前の話",
    summary:
      "「自分の伝えたいことをうまく伝える技術」で完結しないために。相手との接点を見つけに行く・作りに行くことを軸にした講座を設計中です。",
    roles: ["講座設計", "講師"],
    period: "2026年11月（予定）",
    organizer: "玉野高等学校の先生方",
    coordinator: "西田井 祐也（地域学校連携コーディネーター）",
    subPhotos: [],
    aim: "伝える技術の前に、「誰に伝えるのか」を考える時間をつくること。",
    design:
      "相手との接点を見つけに行く・作りに行くことを軸に、講座の流れを組み立てています。",
    work: "講座の設計と、当日の講師を担当します。",
  },
  {
    slug: "junior-high-inquiry",
    programTag: "中学校の探究導入",
    school: "玉野市立東児中学校・荘内中学校",
    target: "探究導入",
    title: "種をまくということ——中学校での探究のはじめかた",
    summary:
      "すぐに結果が出るわけではない関わりを、先生とどう続けるか。単元設計の伴走と、地域とつなぐ入口づくりを担当しています。",
    roles: ["単元設計の伴走", "教員との打ち合わせ", "地域資源のコーディネート"],
    period: "2026年度",
    organizer: "東児中学校・荘内中学校の先生方",
    coordinator: "西田井 祐也（地域学校連携コーディネーター）",
    mainPhoto: {
      url: `${CMS_ASSET}/273269a5526142209a9cad1098a1ce83/IMG_6544.JPG?w=900`,
      caption: "中学校での打ち合わせの様子",
    },
    subPhotos: [],
    aim: "すぐに芽が出るわけではない関わりを、どう続けるか。探究のはじめかたを先生と一緒に考えています。",
    design: "単元設計の伴走と、地域とつなぐ入口づくりを並行して進めています。",
    work: "単元設計の伴走、先生との打ち合わせ、地域資源のコーディネートを担当しています。",
  },
  {
    slug: "shoko-high-first-exchange",
    programTag: "はじめての地域交流会",
    school: "岡山県立玉野商工高等学校",
    target: "はじめての地域交流会",
    title: "「体験」と「探究」は、似ているようで構造がまるで違う",
    summary:
      "授業に「問い」を中心に置くこと、そしてそれを繰り返し言い続けること。短い打ち合わせの積み重ねから立ち上がった授業の記録です。",
    roles: ["授業設計", "教員研修"],
    period: "2026年度",
    organizer: "玉野商工高等学校の先生方",
    coordinator: "西田井 祐也（地域学校連携コーディネーター）",
    mainPhoto: {
      url: `${CMS_ASSET}/9cb2be41e5e84f6b9f7cea953aae2a30/D98A5921-2A63-4FD0-BE8C-A4C6EADE412F.jpg?w=900`,
      caption: "玉野商工高等学校の校舎",
    },
    subPhotos: [],
    aim: "「体験して終わり」にせず、授業の中心に問いを置くこと。",
    design:
      "短い打ち合わせを積み重ね、先生と一緒に問いの立て方から組み立てました。",
    work: "授業の設計と、教員研修を担当しました。",
  },
];

/** 参加した地域の大人の合計。人数を入れている授業だけを足す。
    どの授業にも人数がなければ0を返し、表示側はその項目を出さない。 */
export function totalGuests(lessons: Lesson[]): number {
  return lessons.reduce((sum, l) => sum + (l.guestCount ?? 0), 0);
}

// ─── microCMS 連携 ───────────────────────────────────────────

type CMSLesson = MicroCMSListContent & {
  programTag: string;
  school: string;
  target: string;
  title: string;
  summary: string;
  roles?: string[] | string;
  period?: string;
  organizer?: string;
  coordinator?: string;
  guestCount?: number;
  guestCountNote?: string;
  mainPhoto?: { url: string };
  mainPhotoCaption?: string;
  subPhotos?: { photo?: { url: string }; caption?: string }[];
  aim?: string;
  design?: string;
  work?: string;
  featured?: boolean;
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

function cmsToLesson(item: CMSLesson): Lesson {
  return {
    slug: item.id,
    programTag: item.programTag,
    school: item.school,
    target: item.target,
    title: item.title,
    summary: item.summary,
    roles: Array.isArray(item.roles)
      ? item.roles
      : (item.roles || "").split(/[,、]/).map((r) => r.trim()).filter(Boolean),
    period: item.period ?? "",
    organizer: item.organizer ?? "",
    coordinator: item.coordinator ?? "",
    guestCount: item.guestCount,
    guestCountNote: item.guestCountNote,
    mainPhoto: item.mainPhoto
      ? { url: item.mainPhoto.url, caption: item.mainPhotoCaption ?? "" }
      : undefined,
    subPhotos: (item.subPhotos ?? [])
      .filter((s) => s.photo?.url)
      .map((s) => ({ url: s.photo!.url, caption: s.caption ?? "" })),
    aim: item.aim ?? "",
    design: item.design ?? "",
    work: item.work ?? "",
    featured: item.featured,
  };
}

export async function fetchAllLessons(limit = 20): Promise<Lesson[]> {
  if (client) {
    try {
      const res = await client.getList<CMSLesson>({
        endpoint: "lessons",
        queries: { limit },
      });
      if (res.contents.length > 0) return res.contents.map(cmsToLesson);
    } catch {
      // lessons エンドポイントが未作成のときは静的データを使う
    }
  }
  return staticLessons.slice(0, limit);
}

export async function fetchLessonBySlug(slug: string): Promise<Lesson | null> {
  const lessons = await fetchAllLessons(100);
  return lessons.find((l) => l.slug === slug) ?? null;
}

export async function fetchAllLessonSlugs(): Promise<string[]> {
  const lessons = await fetchAllLessons(100);
  return lessons.map((l) => l.slug);
}

/** 連携している学校の数（重複を除く） */
export function countSchools(lessons: Lesson[]): number {
  return new Set(lessons.flatMap((l) => l.school.split("・"))).size;
}

// ─── 日記との紐付け（タグ方式） ───────────────────────────────

import type { Article } from "@/lib/articles";

/** この授業について書かれた日記を、タグが一致するものから集める */
export function diariesForLesson(lesson: Lesson, articles: Article[]): Article[] {
  return articles
    .filter((a) => (a.tags ?? []).includes(lesson.programTag))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** この記事が書かれた授業を、記事のタグから逆引きする */
export function lessonForArticle(
  article: Pick<Article, "tags">,
  lessons: Lesson[]
): Lesson | null {
  const tags = article.tags ?? [];
  return lessons.find((l) => tags.includes(l.programTag)) ?? null;
}
