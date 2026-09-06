import Link from "next/link";

const EMAIL = "info@npo-tamano-mirai.com";
const INSTAGRAM_URL = "https://www.instagram.com/tamano.miraizukuri/";

const EVENTS = [
  {
    id: "apr",
    month: "4月",
    num: "4",
    date: "15日(水)",
    venue: "船越町集会所",
    title: "地域を語る①",
    detail: null,
    fee: "無料" as const,
    special: false,
    tbd: false,
  },
  {
    id: "may",
    month: "5月",
    num: "5",
    date: "18日(月)",
    venue: "深山イギリス庭園",
    title: "深山イギリス庭園ツアー",
    detail: "庭園の管理や歴史を学ぶ1時間ツアー。13:00 庭園前集合 / 13:30〜スタート。入園料：65歳以上100円・大人200円",
    fee: "入園料" as const,
    special: true,
    tbd: false,
  },
  {
    id: "jun",
    month: "6月",
    num: "6",
    date: "17日(水)",
    venue: "船越町集会所",
    title: "地域を語る②",
    detail: null,
    fee: "無料" as const,
    special: false,
    tbd: false,
  },
  {
    id: "jul",
    month: "7月",
    num: "7",
    date: "15日(水)",
    venue: "中央公民館",
    title: "Canvaを使って楽しみましょう！",
    detail: "定員10名",
    fee: "無料" as const,
    special: true,
    tbd: false,
  },
  {
    id: "aug",
    month: "8月",
    num: "8",
    date: "19日(水)",
    venue: "船越町集会所",
    title: "地域を語る③",
    detail: null,
    fee: "無料" as const,
    special: false,
    tbd: false,
  },
  {
    id: "sep",
    month: "9月",
    num: "9",
    date: "16日(水)",
    venue: "未定",
    title: "内容未定",
    detail: "詳細が決まり次第インスタグラムでお知らせします。お楽しみに！",
    fee: "未定" as const,
    special: false,
    tbd: true,
  },
  {
    id: "oct",
    month: "10月",
    num: "10",
    date: "21日(水)",
    venue: "船越町集会所",
    title: "地域を語る④",
    detail: null,
    fee: "無料" as const,
    special: false,
    tbd: false,
  },
  {
    id: "nov",
    month: "11月",
    num: "11",
    date: "15日(日)",
    venue: "片山産婦人科2階",
    title: "地域で健康に暮らすためには",
    detail: "講師：片山典子医院長（玉野市医尾229-1）",
    fee: "無料" as const,
    special: true,
    tbd: false,
  },
  {
    id: "dec",
    month: "12月",
    num: "12",
    date: "16日(水)",
    venue: "船越町集会所",
    title: "地域を語る⑤",
    detail: null,
    fee: "無料" as const,
    special: false,
    tbd: false,
  },
  {
    id: "jan",
    month: "1月",
    num: "1",
    date: "20日(水)",
    venue: "船越町集会所",
    title: "短歌を作って楽しみましょう！",
    detail: "講師：藤原多惠子",
    fee: "無料" as const,
    special: false,
    tbd: false,
  },
  {
    id: "feb",
    month: "2月",
    num: "2",
    date: "17日(水)",
    venue: "船越町集会所",
    title: "地域を語る⑥",
    detail: null,
    fee: "無料" as const,
    special: false,
    tbd: false,
  },
  {
    id: "mar",
    month: "3月",
    num: "3",
    date: "17日(水)",
    venue: "船越町集会所",
    title: "地域を語る⑦",
    detail: null,
    fee: "無料" as const,
    special: false,
    tbd: false,
  },
] satisfies {
  id: string;
  month: string;
  num: string;
  date: string;
  venue: string;
  title: string;
  detail: string | null;
  fee: "無料" | "入園料" | "未定";
  special: boolean;
  tbd: boolean;
}[];

const QUARTER = EVENTS.filter((e) => ["jul", "aug", "sep"].includes(e.id));

export default function MiraiCafeSection() {
  return (
    <section id="mirai-cafe" className="mt-12 border-t border-border-line pt-8">
      <div className="mb-4 flex items-end justify-between gap-4">
        <h2 className="leading-none">
          <span className="section-label block text-ink-muted">
            Original Event · 独自企画
          </span>
          <span className="mt-1.5 block text-[19px] font-bold text-ink">
            みらいCafe
          </span>
        </h2>
        <a
          href={`mailto:${EMAIL}?subject=${encodeURIComponent(
            "みらいCafeについてのお問い合わせ"
          )}`}
          className="shrink-0 text-[13px] font-bold text-ocean hover:underline"
        >
          申し込む →
        </a>
      </div>

      <p className="text-[13px] leading-[1.7] text-ink-soft">
        毎回 13:00〜16:00。地域のことを気軽に話す場です。予約なしでも参加できます。
        主催：玉野SDGsみらいづくりセンター
      </p>

      <div className="mt-4 divide-y divide-border-line border-t border-border-line">
        {QUARTER.map((event) => (
          <div key={event.id} className="flex items-start gap-3.5 py-3">
            <div className="w-14 shrink-0 border-r border-border-line pr-2 text-center">
              <span className="block text-[10px] text-ink-muted">{event.month}</span>
              <span className="block text-[20px] font-bold leading-none text-ink">
                {event.date.replace(/日.*$/, "")}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[14px] font-bold leading-tight text-ink">
                {event.title}
              </h3>
              <p className="mt-1 text-[12px] leading-[1.7] text-ink-muted">
                {event.venue}
                {event.fee ? `・${event.fee}` : ""}
              </p>
              {event.detail && (
                <p className="mt-1 text-[12px] leading-[1.7] text-ink-soft">
                  {event.detail}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <a
          href={`mailto:${EMAIL}?subject=${encodeURIComponent(
            "みらいCafeについてのお問い合わせ"
          )}`}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded border border-border-line py-2.5 text-[13px] font-bold text-ink hover:bg-[rgba(34,34,34,.05)]"
        >
          <MailIcon />
          メールで申し込む
        </a>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded border border-border-line py-2.5 text-[13px] font-bold text-ink hover:bg-[rgba(34,34,34,.05)]"
        >
          <InstagramIcon />
          InstagramのDM
        </a>
      </div>
    </section>
  );
}

function MailIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1" y="3" width="14" height="10" rx="1.5" />
      <path d="M1 4.5 8 9.5l7-5" />
    </svg>
  );
}

function InstagramIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
    </svg>
  );
}
