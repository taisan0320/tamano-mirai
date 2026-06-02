import Link from "next/link";

const EMAIL = "info@npo-tamano-mirai.com";
const INSTAGRAM_URL = "https://www.instagram.com/tamano.miraizukuri/";

const EVENTS = [
  {
    id: "apr",
    month: "4月",
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
  date: string;
  venue: string;
  title: string;
  detail: string | null;
  fee: "無料" | "入園料" | "未定";
  special: boolean;
  tbd: boolean;
}[];

const FEE_STYLE: Record<string, string> = {
  無料: "bg-forest-pale text-forest",
  入園料: "bg-amber-pale text-amber",
  未定: "bg-paper-alt text-ink-muted",
};

export default function MiraiCafeSection() {
  return (
    <section id="mirai-cafe">
      {/* ── Header ── */}
      <div
        className="px-6 py-14 lg:py-20"
        style={{
          background:
            "linear-gradient(135deg, #172b1f 0%, #1f3828 50%, #2a4a34 100%)",
        }}
      >
        <div className="max-w-[1400px] mx-auto">
          <p className="section-label text-white/35 mb-5 tracking-[.22em]">
            ORIGINAL EVENT · 独自企画
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-12">
            <div>
              <h2
                className="font-serif-h font-black leading-[1.1] text-white mb-5"
                style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}
              >
                みらいCafe
                <span style={{ color: "#c86d1a" }}>。</span>
              </h2>
              <p className="text-white/55 text-[15px] leading-[2.1] max-w-lg">
                美しい、語らい、いっしょに——<br />
                玉野に魅力ある未来を、一緒に探しませんか。
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end shrink-0">
              <div className="text-white/40 text-[13px] leading-relaxed lg:text-right">
                <p className="font-bold text-white/60">2026年 年間スケジュール</p>
                <p>毎回 13:00〜16:00</p>
                <p>主催：玉野SDGsみらいづくりセンター</p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent("みらいCafeについてのお問い合わせ")}`}
                  className="inline-flex items-center gap-2 rounded-sm border border-white/20 bg-white/8 px-4 py-2 text-[12px] font-bold text-white/80 hover:bg-white/15 hover:text-white transition-colors"
                >
                  <MailIcon />
                  メールで問い合わせ
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm border border-white/20 bg-white/8 px-4 py-2 text-[12px] font-bold text-white/80 hover:bg-white/15 hover:text-white transition-colors"
                >
                  <InstagramIcon />
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Event Grid ── */}
      <div className="bg-paper-deep">
        <div className="max-w-[1400px] mx-auto px-6 py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {EVENTS.map((event) => {
              const mailSubject = encodeURIComponent(
                `みらいCafe申し込み：${event.month}${event.date}「${event.title}」`
              );
              return (
                <div
                  key={event.id}
                  className={[
                    "flex flex-col rounded-sm border bg-paper overflow-hidden shadow-[0_1px_0_#e8e2d9]",
                    event.special ? "border-amber/40" : "border-border-line",
                    event.tbd ? "opacity-60" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {/* Month header */}
                  <div
                    className="flex items-baseline gap-3 px-4 pt-4 pb-3 border-b"
                    style={{
                      borderBottomColor: event.special ? "#c86d1a" : "#e8e2d9",
                      borderBottomWidth: event.special ? "2px" : "1px",
                    }}
                  >
                    <span
                      className="font-serif-h text-[2.4rem] font-black leading-none"
                      style={{ color: event.special ? "#c86d1a" : "#c9bfa6" }}
                    >
                      {event.month}
                    </span>
                    <span className="font-bold text-ink text-[15px]">
                      {event.date}
                    </span>
                    {event.special && (
                      <span className="ml-auto shrink-0 rounded-full bg-amber-pale px-2 py-0.5 text-[10px] font-bold tracking-widest text-amber">
                        SPECIAL
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col gap-3 px-4 py-4">
                    <h3 className="font-serif text-[15px] font-bold leading-snug text-ink">
                      {event.title}
                    </h3>
                    {event.detail && (
                      <p className="text-[12px] leading-[1.85] text-ink-soft">
                        {event.detail}
                      </p>
                    )}
                    <div className="mt-auto flex items-center justify-between gap-2">
                      <span className="text-[11px] text-ink-muted">
                        📍 {event.venue}
                      </span>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${FEE_STYLE[event.fee]}`}
                      >
                        {event.fee}
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="border-t border-border-line px-4 py-3">
                    {event.tbd ? (
                      <p className="text-center text-[11px] text-ink-muted">
                        詳細はInstagramで告知予定
                      </p>
                    ) : (
                      <div className="flex gap-2">
                        <a
                          href={`mailto:${EMAIL}?subject=${mailSubject}`}
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-sm border border-ocean/30 py-1.5 text-[11px] font-bold text-ocean transition-colors hover:bg-ocean-pale"
                        >
                          <MailIcon size={11} />
                          メール
                        </a>
                        <a
                          href={INSTAGRAM_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-sm border border-border-line py-1.5 text-[11px] font-bold text-ink-soft transition-colors hover:bg-paper-alt"
                        >
                          <InstagramIcon size={11} />
                          Instagram DM
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function MailIcon({ size = 13 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="1" y="3" width="14" height="10" rx="1.5" />
      <path d="M1 4.5 8 9.5l7-5" />
    </svg>
  );
}

function InstagramIcon({ size = 13 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
    </svg>
  );
}
