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
    <section id="mirai-cafe">

      {/* ── Header ── */}
      <div className="bg-paper-alt px-6 pt-12 pb-0 lg:pt-16">
        <div className="max-w-[1400px] mx-auto">
          <p className="section-label text-ink-muted mb-4">ORIGINAL EVENT · 独自企画</p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-10 border-b border-border-line">
            <div>
              <h2
                className="font-serif-h font-black leading-none text-ink mb-2"
                style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)" }}
              >
                みらいCafe<span className="accent-coral">。</span>
              </h2>
              <p className="text-ink-muted text-[13px]">
                2026年 7〜9月 ・ 毎回 13:00〜16:00 ・ 主催：玉野SDGsみらいづくりセンター
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent("みらいCafeについてのお問い合わせ")}`}
                className="inline-flex items-center gap-2 rounded-sm border border-border-line px-3.5 py-2 text-[11px] font-bold text-ink-soft hover:bg-paper-deep transition-colors"
              >
                <MailIcon />
                メール
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-border-line px-3.5 py-2 text-[11px] font-bold text-ink-soft hover:bg-paper-deep transition-colors"
              >
                <InstagramIcon />
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Cards ── */}
      <div className="bg-paper-alt">
        <div className="max-w-[1400px] mx-auto px-6 py-10 lg:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {QUARTER.map((event) => (
              <div
                key={event.id}
                className={[
                  "bg-paper rounded-sm flex flex-col",
                  event.special
                    ? "border-t-2 border-t-amber border-x border-b border-amber/25"
                    : "border border-border-line",
                  event.tbd ? "opacity-60" : "",
                ].filter(Boolean).join(" ")}
              >
                <div className="px-6 pt-6 pb-4 flex items-end gap-3 border-b border-border-line/60">
                  <span
                    className="font-serif-h font-black leading-none select-none"
                    style={{
                      fontSize: "3.5rem",
                      color: event.special ? "#c86d1a" : "#c9bfa6",
                    }}
                  >
                    {event.num}
                  </span>
                  <div className="pb-1.5">
                    <p className="text-[11px] text-ink-muted leading-none mb-1">
                      {event.tbd ? "月" : event.month}
                    </p>
                    <p className="text-[15px] font-bold text-ink leading-none">
                      {event.date}
                    </p>
                  </div>
                  {event.special && (
                    <span className="ml-auto mb-1.5 text-[9px] font-bold tracking-widest text-amber bg-amber-pale px-2 py-0.5 rounded-full border border-amber/20">
                      SPECIAL
                    </span>
                  )}
                </div>

                <div className="px-6 py-5 flex flex-col flex-1 gap-3">
                  <h3 className="font-serif text-[16px] font-bold leading-snug text-ink">
                    {event.title}
                  </h3>
                  {event.detail && (
                    <p className="text-[12px] leading-relaxed text-ink-soft">
                      {event.detail}
                    </p>
                  )}

                  <div className="mt-auto pt-3 border-t border-border-line/60 flex items-center justify-between gap-2">
                    <p className="text-[12px] text-ink-muted truncate">
                      {event.tbd ? "会場未定" : `📍 ${event.venue}`}
                    </p>
                    <span className={[
                      "shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full",
                      event.fee === "無料" ? "bg-forest-pale text-forest" :
                      event.fee === "入園料" ? "bg-amber-pale text-amber" :
                      "bg-paper-alt text-ink-muted",
                    ].join(" ")}>
                      {event.fee}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 共通CTA */}
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-[13px] text-ink-muted leading-relaxed">
              参加は事前申し込み不要の回もあります。詳細はお気軽にお問い合わせください。
            </p>
            <div className="flex gap-3 shrink-0">
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent("みらいCafeへの参加について")}`}
                className="inline-flex items-center gap-2 bg-ink text-paper text-[12px] font-bold px-4 py-2 rounded-sm hover:bg-ink-soft transition-colors"
              >
                <MailIcon size={11} />
                メールで申し込む
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border-line text-ink-soft text-[12px] font-bold px-4 py-2 rounded-sm hover:bg-paper-alt transition-colors"
              >
                <InstagramIcon size={11} />
                Instagram をフォロー
              </a>
            </div>
          </div>
        </div>
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
