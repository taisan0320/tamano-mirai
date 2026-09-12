import { fetchTopObject } from "@/lib/top";

/* ============================================================
   みらいCafe（独自企画の定例会）

   ■ データの入れ方
   1. いまは下の staticEvents を編集すると反映される。
   2. microCMS の「トップページ設定」（top）に繰り返しフィールド cafeEvents を作り、
      1回分ずつ入れると、自動でそちらを読む。無料プランの API 数の上限（5つ）に
      収めるため、みらいCafe専用の API は作らない。中身は CMSCafeEvent の型のとおり。

   ■ 表示のしかた
   今日の日付より後の回だけを、近い順に表示する。
   終わった回は自動で消えるので、毎月の手直しは要らない。
   ============================================================ */

export interface CafeEvent {
  id: string;
  /** 開催日（ISO形式。例 "2026-09-16"） */
  date: string;
  title: string;
  venue: string;
  /** 参加費。「無料」「入園料」「未定」など自由記述 */
  fee: string;
  detail?: string;
  /** 開催時間。空なら既定の 13:00〜16:00 */
  time?: string;
  /** ゲスト講師や見学などの特別回 */
  special: boolean;
  /** 内容が未定の回 */
  tbd: boolean;
}

export const DEFAULT_CAFE_TIME = "13:00〜16:00";

// ─── 静的データ（2026年度） ──────────────────────────────────

const staticEvents: CafeEvent[] = [
  { id: "2026-04", date: "2026-04-15", title: "地域を語る①", venue: "船越町集会所", fee: "無料", special: false, tbd: false },
  {
    id: "2026-05",
    date: "2026-05-18",
    title: "深山イギリス庭園ツアー",
    venue: "深山イギリス庭園",
    fee: "入園料",
    detail:
      "庭園の管理や歴史を学ぶ1時間ツアー。13:00 庭園前集合 / 13:30〜スタート。入園料：65歳以上100円・大人200円",
    special: true,
    tbd: false,
  },
  { id: "2026-06", date: "2026-06-17", title: "地域を語る②", venue: "船越町集会所", fee: "無料", special: false, tbd: false },
  {
    id: "2026-07",
    date: "2026-07-15",
    title: "Canvaを使って楽しみましょう！",
    venue: "中央公民館",
    fee: "無料",
    detail: "定員10名",
    special: true,
    tbd: false,
  },
  { id: "2026-08", date: "2026-08-19", title: "地域を語る③", venue: "船越町集会所", fee: "無料", special: false, tbd: false },
  {
    id: "2026-09",
    date: "2026-09-16",
    title: "内容未定",
    venue: "未定",
    fee: "未定",
    detail: "詳細が決まり次第インスタグラムでお知らせします。お楽しみに！",
    special: false,
    tbd: true,
  },
  { id: "2026-10", date: "2026-10-21", title: "地域を語る④", venue: "船越町集会所", fee: "無料", special: false, tbd: false },
  {
    id: "2026-11",
    date: "2026-11-15",
    title: "地域で健康に暮らすためには",
    venue: "片山産婦人科2階",
    fee: "無料",
    detail: "講師：片山典子医院長（玉野市医尾229-1）",
    special: true,
    tbd: false,
  },
  { id: "2026-12", date: "2026-12-16", title: "地域を語る⑤", venue: "船越町集会所", fee: "無料", special: false, tbd: false },
  {
    id: "2027-01",
    date: "2027-01-20",
    title: "短歌を作って楽しみましょう！",
    venue: "船越町集会所",
    fee: "無料",
    detail: "講師：藤原多惠子",
    special: false,
    tbd: false,
  },
  { id: "2027-02", date: "2027-02-17", title: "地域を語る⑥", venue: "船越町集会所", fee: "無料", special: false, tbd: false },
  { id: "2027-03", date: "2027-03-17", title: "地域を語る⑦", venue: "船越町集会所", fee: "無料", special: false, tbd: false },
];

// ─── 日付の扱い ──────────────────────────────────────────────
// サーバー（Vercel）は協定世界時で動くため、必ず日本時間で判定・表示する。
// microCMS の日時フィールドは「9/16」を選ぶと "2026-09-15T15:00:00.000Z" で返るので、
// ここでも日本時間に直さないと1日ずれる。

const TOKYO = "Asia/Tokyo";

/** 日本時間の「YYYY-MM-DD」 */
function tokyoDay(value: string | Date): string {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: TOKYO }).format(new Date(value));
}

/** 表示用に 月・日・曜日 を返す */
export function cafeDateParts(value: string): { month: string; day: string; weekday: string } {
  const parts = new Intl.DateTimeFormat("ja-JP", {
    timeZone: TOKYO,
    month: "numeric",
    day: "numeric",
    weekday: "short",
  }).formatToParts(new Date(value));
  const pick = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return { month: pick("month"), day: pick("day"), weekday: pick("weekday") };
}

// ─── microCMS 連携（「トップページ設定」の繰り返しフィールド cafeEvents） ──

type CMSCafeEvent = {
  /** 繰り返しフィールドの各行に付くカスタムフィールドのID（cafeEvent） */
  fieldId?: string;
  date?: string;
  title?: string;
  venue?: string;
  fee?: string | string[];
  detail?: string;
  time?: string;
  special?: boolean;
  tbd?: boolean;
};

function cmsToCafe(item: CMSCafeEvent, index: number): CafeEvent | null {
  // 日付とタイトルがない行（入力途中）は出さない
  if (!item.date || !item.title) return null;
  return {
    id: `cms-${index}-${item.date}`,
    date: item.date,
    title: item.title,
    venue: item.venue ?? "",
    // セレクトフィールドで作った場合は配列で返るので先頭を使う
    fee: (Array.isArray(item.fee) ? item.fee[0] : item.fee) ?? "",
    detail: item.detail || undefined,
    time: item.time || undefined,
    special: item.special ?? false,
    tbd: item.tbd ?? false,
  };
}

/** 年間のすべての回（古い順）。microCMS に1件でもあればそちら、なければ静的データ */
export async function fetchAllCafeEvents(): Promise<CafeEvent[]> {
  const top = await fetchTopObject<{ cafeEvents?: CMSCafeEvent[] }>();
  const fromCms = (top?.cafeEvents ?? [])
    .map(cmsToCafe)
    .filter((e): e is CafeEvent => e !== null);
  const events = fromCms.length > 0 ? fromCms : staticEvents;
  return [...events].sort((a, b) => tokyoDay(a.date).localeCompare(tokyoDay(b.date)));
}

/** 今日以降の回を、近い順に n 件 */
export async function fetchUpcomingCafeEvents(n = 3): Promise<CafeEvent[]> {
  const today = tokyoDay(new Date());
  const events = await fetchAllCafeEvents();
  return events.filter((e) => tokyoDay(e.date) >= today).slice(0, n);
}
