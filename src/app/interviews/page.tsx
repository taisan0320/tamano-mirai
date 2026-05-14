import type { Metadata } from "next";
import Link from "next/link";
import { fetchAllInterviews } from "@/lib/interviews";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "動く人たち | 玉野SDGsみらいづくりセンター",
  description: "玉野で地域を動かしている人たちのインタビュー。まちに根ざした活動を続ける方々の言葉と想いを届けます。",
};

export default async function InterviewsPage() {
  const interviews = await fetchAllInterviews();

  return (
    <div className="bg-paper min-h-screen">

      {/* Page Header */}
      <div
        className="px-6 py-16 lg:py-20"
        style={{ background: "linear-gradient(160deg, #6b3209 0%, #9a500f 50%, #c86d1a 100%)" }}
      >
        <div className="max-w-4xl mx-auto">
          <p className="section-label text-white/50 mb-4">INTERVIEW</p>
          <h1 className="text-4xl lg:text-5xl font-bold font-serif text-white leading-tight mb-4">
            動く人たち
          </h1>
          <p className="text-white/70 leading-relaxed max-w-xl">
            玉野で地域を動かしている人たちのインタビュー。まちに根ざした活動を続ける方々の言葉と想いを届けます。
          </p>
        </div>
      </div>

      {/* Interview Grid */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {interviews.length === 0 ? (
          <p className="text-ink-muted text-center py-20">インタビュー記事はまだありません。</p>
        ) : (
          <div className="space-y-6">
            {interviews.map((interview) => (
              <Link
                key={interview.slug}
                href={`/interviews/${interview.slug}`}
                className="group flex flex-col sm:flex-row gap-0 bg-white border border-border-line rounded-2xl overflow-hidden hover:border-amber/40 card-interactive transition-colors"
              >
                {/* Photo */}
                <div className="sm:w-52 shrink-0 bg-paper-deep overflow-hidden min-h-[200px] sm:min-h-0 relative">
                  {interview.photo ? (
                    <img
                      src={interview.photo}
                      alt={interview.name}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold font-serif"
                      style={{ background: "linear-gradient(160deg, #6b3209, #c86d1a)" }}
                    >
                      {interview.name.slice(0, 1)}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col justify-center px-7 py-7 gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(200,109,26,0.12)", color: "#9a500f" }}
                    >
                      INTERVIEW
                    </span>
                    <span className="text-xs text-ink-muted">
                      {new Date(interview.date).toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <p
                    className="font-serif text-ink leading-snug"
                    style={{ fontSize: "clamp(1.05rem, 2vw, 1.3rem)" }}
                  >
                    ❝ {interview.catchphrase} ❞
                  </p>

                  <div>
                    <p className="text-xs text-ink-muted mb-0.5">{interview.role}</p>
                    <p className="font-bold text-ink text-lg font-serif">{interview.name}</p>
                  </div>

                  <p className="text-sm text-ink-muted leading-relaxed line-clamp-2">
                    {interview.subtitle}
                  </p>

                  <span
                    className="text-xs font-bold tracking-widest mt-1 transition-colors"
                    style={{ color: "#c86d1a" }}
                  >
                    READ MORE →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
