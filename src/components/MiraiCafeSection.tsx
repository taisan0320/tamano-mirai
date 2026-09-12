import {
  fetchUpcomingCafeEvents,
  cafeDateParts,
  DEFAULT_CAFE_TIME,
} from "@/lib/cafe";

/* みらいCafe。データは lib/cafe.ts（microCMS では「トップページ設定」の cafeEvents）。
   今日以降の回だけを近い順に3件出す。終わった回は自動で消える。 */

const EMAIL = "info@npo-tamano-mirai.com";
const INSTAGRAM_URL = "https://www.instagram.com/tamano.miraizukuri/";
const MAIL_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "みらいCafeについてのお問い合わせ"
)}`;

export default async function MiraiCafeSection() {
  const events = await fetchUpcomingCafeEvents(3);

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
          href={MAIL_HREF}
          className="shrink-0 text-[13px] font-bold text-ocean hover:underline"
        >
          申し込む →
        </a>
      </div>

      <p className="text-[13px] leading-[1.7] text-ink-soft">
        毎月開く、地域のことを気軽に話す場です。予約なしでも参加できます。
        主催：玉野SDGsみらいづくりセンター
      </p>

      {events.length === 0 ? (
        <p className="mt-4 rounded border border-border-line py-6 text-center text-[13px] text-ink-soft">
          次回の予定は、決まり次第お知らせします。
        </p>
      ) : (
        <div className="mt-4 divide-y divide-border-line border-t border-border-line">
          {events.map((event) => {
            const { month, day, weekday } = cafeDateParts(event.date);
            return (
              <div key={event.id} className="flex items-start gap-3.5 py-3">
                <div className="w-14 shrink-0 border-r border-border-line pr-2 text-center">
                  <span className="block text-[10px] text-ink-muted">{month}月</span>
                  <span className="block text-[20px] font-bold leading-none text-ink">
                    {day}
                  </span>
                  <span className="mt-0.5 block text-[10px] text-ink-muted">
                    （{weekday}）
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {event.special && (
                      <span className="rounded-sm border border-border-line px-1.5 py-[3px] text-[10px] font-bold leading-tight text-ink">
                        特別回
                      </span>
                    )}
                    <h3
                      className={`text-[14px] font-bold leading-tight ${
                        event.tbd ? "text-ink-muted" : "text-ink"
                      }`}
                    >
                      {event.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-[12px] leading-[1.7] text-ink-muted">
                    {event.time ?? DEFAULT_CAFE_TIME}
                    {event.venue ? `・${event.venue}` : ""}
                    {event.fee ? `・${event.fee}` : ""}
                  </p>
                  {event.detail && (
                    <p className="mt-1 text-[12px] leading-[1.7] text-ink-soft">
                      {event.detail}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-4 flex gap-2">
        <a
          href={MAIL_HREF}
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
