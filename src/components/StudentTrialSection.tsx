import Link from "next/link";
import { fetchAllStudentTeams } from "@/lib/studentTeams";

function PhotoPlaceholder({ index }: { index: number }) {
  const hues = ["#a05510", "#c86d1a", "#e07e24"];
  const bg = hues[index % hues.length];
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ background: `linear-gradient(135deg, ${bg}cc 0%, ${bg} 100%)` }}
    >
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true" className="opacity-30">
        <rect x="6" y="10" width="36" height="28" rx="3" stroke="white" strokeWidth="2.5" />
        <circle cx="24" cy="24" r="7" stroke="white" strokeWidth="2.5" />
        <circle cx="36" cy="14" r="2" fill="white" />
      </svg>
    </div>
  );
}

export default async function StudentTrialSection() {
  const teams = await fetchAllStudentTeams();

  return (
    <section className="bg-amber-pale border-t border-amber/15">
      <div className="max-w-[1400px] mx-auto px-6 py-20 lg:py-28">

        {/* ── ヘッダー ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-16">

          {/* 左: 見出し + 説明 */}
          <div className="lg:col-span-7">
            <p className="section-label text-amber mb-4">STUDENT TRIAL · 学生まちづくり支援</p>
            <h2 className="font-serif-h text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-ink mb-8">
              <span className="accent-coral">学生が、</span><br />玉野を動かす<span className="accent-coral">。</span>
            </h2>
            <p className="text-[15px] leading-[2] text-ink-soft max-w-2xl">
              玉野市「協働のまちづくり事業補助金 学生トライアル版」は、
              中学生以上の学生チームが企画するまちづくり活動を全額補助する2026年度スタートの新制度です。
              NPO法人玉野SDGsみらいづくりセンターが委託を受け、申請から活動終了まで一貫して伴走支援を行っています。
            </p>
          </div>

          {/* 右: 制度概要 + 問い合わせ */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-6">

            {/* キーファクト */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { num: "10万円", label: "補助上限額" },
                { num: "100%", label: "補助率" },
                { num: "2026年\n4月〜", label: "受付開始" },
              ].map(({ num, label }) => (
                <div key={label} className="bg-white rounded-xl border border-amber/20 px-4 py-5 text-center">
                  <p className="font-serif-h font-black text-amber leading-tight whitespace-pre-line" style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}>
                    {num}
                  </p>
                  <p className="text-[11px] text-ink-muted mt-1 tracking-wide">{label}</p>
                </div>
              ))}
            </div>

            {/* 問い合わせ先 */}
            <div className="bg-white rounded-xl border border-amber/20 px-6 py-5">
              <p className="section-label text-amber mb-3">CONTACT · まずはご相談を</p>
              <p className="text-sm text-ink-soft leading-relaxed mb-3">
                申請・相談の窓口は玉野市協働・交通政策課です。
                活動の伴走支援はNPO法人玉野SDGsみらいづくりセンターが担当します。
              </p>
              <div className="flex flex-col gap-1">
                <p className="font-bold text-ink text-sm">玉野市 協働・交通政策課</p>
                <p className="text-ink-muted text-sm tracking-wider">TEL: 0863-32-5567</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── 活動中のチーム ── */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-serif-h text-2xl font-bold text-ink">
              活動中のチーム
            </h3>
            <span className="section-label text-amber">
              {teams.length}チームが活動中
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {teams.map((team, i) => (
              <div
                key={team.slug}
                className="bg-white rounded-xl border border-amber/15 overflow-hidden flex flex-col"
              >
                {/* 写真エリア */}
                <div className="relative aspect-[16/9] overflow-hidden bg-amber-pale">
                  {team.photo ? (
                    <img
                      src={team.photo}
                      alt={`${team.teamName}の活動の様子`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <PhotoPlaceholder index={i} />
                  )}
                  {/* 写真がないときだけ「写真準備中」ラベル */}
                  {!team.photo && (
                    <span className="absolute bottom-3 left-3 text-[10px] text-white/70 tracking-widest section-label">
                      写真準備中
                    </span>
                  )}
                </div>

                {/* テキスト */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                  <div>
                    <p className="text-[11px] text-amber font-bold tracking-widest mb-1">TEAM</p>
                    <p className="font-bold text-ink text-lg leading-snug">{team.teamName}</p>
                  </div>
                  <p className="text-sm text-amber font-medium leading-snug">{team.theme}</p>
                  <p className="text-[13px] text-ink-muted leading-relaxed flex-1">{team.description}</p>
                  <p className="text-[11px] text-ink-muted tracking-widest mt-auto">
                    {new Date(team.date).toLocaleDateString("ja-JP", { year: "numeric", month: "long" })}〜
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 制度ページへのリンク ── */}
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <a
            href="https://www.city.tamano.lg.jp/soshiki/8/52233.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-amber border border-amber/30 bg-white px-5 py-3 rounded-full hover:bg-amber hover:text-white transition-colors"
          >
            制度の詳細を見る（玉野市公式） →
          </a>
          <p className="text-xs text-ink-muted">
            ※ 学生トライアル版は令和9年1月まで活動可能です
          </p>
        </div>

      </div>
    </section>
  );
}
