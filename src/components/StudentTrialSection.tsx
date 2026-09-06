import Link from "next/link";
import { fetchAllStudentTeams } from "@/lib/studentTeams";

/* 学生トライアル：サイト内で唯一ゴールドを使う縦割り。
   写真は使わず、数値とチームの記録だけで構成する。 */

export default async function StudentTrialSection() {
  const teams = await fetchAllStudentTeams();

  const stats = [
    { value: "10", unit: "万円", label: "補助上限額" },
    { value: "100", unit: "%", label: "補助率" },
    { value: String(teams.length), unit: "チーム", label: "現在活動中" },
  ];

  return (
    <section id="student" className="mt-12 border-t border-border-line pt-8">
      <div className="mb-4 flex items-end justify-between gap-4">
        <h2 className="leading-none">
          <span className="block text-[10px] font-bold tracking-[.12em] text-gold">
            STUDENT TRIAL · 学生まちづくり支援
          </span>
          <span className="mt-1.5 block text-[19px] font-bold text-ink">
            学生が、玉野を動かす
          </span>
        </h2>
        <a
          href="https://www.city.tamano.lg.jp/soshiki/8/52233.html"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-[13px] font-bold text-ocean hover:underline"
        >
          制度を見る →
        </a>
      </div>

      <p className="text-[13px] leading-[1.7] text-ink-soft">
        玉野市「協働のまちづくり事業補助金 学生トライアル版」は、中学生以上の学生チームが
        企画するまちづくり活動を全額補助する制度です。センターが申請から活動終了まで伴走します。
      </p>

      <div className="my-4 flex rounded border border-border-line">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex-1 border-r border-border-line px-3 py-3.5 last:border-r-0"
          >
            <p className="text-[24px] font-bold leading-none text-gold">
              {stat.value}
              <span className="text-[12px]">{stat.unit}</span>
            </p>
            <p className="mt-1.5 text-[11px] leading-tight text-ink-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="divide-y divide-border-line border-t border-border-line">
        {teams.map((team, index) => (
          <div key={team.slug} className="py-3.5">
            <p className="text-[11px] font-bold leading-tight tracking-[.08em] text-gold">
              TEAM {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-1 text-[14px] font-bold leading-tight text-ink">
              {team.teamName}
            </h3>
            <p className="mt-1.5 text-[12px] leading-[1.7] text-ink-soft">
              {team.description}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-3 text-[11px] leading-[1.7] text-ink-muted">
        申請・相談の窓口は玉野市 協働・交通政策課（TEL 0863-32-5567）です。
        活動の伴走支援をセンターが担当します。学生トライアル版は令和9年1月まで活動可能です。
      </p>

      <Link
        href="/contact"
        className="mt-4 block rounded border border-border-line py-3 text-center text-[14px] font-bold text-ink hover:bg-[rgba(34,34,34,.05)]"
      >
        学生トライアルについて相談する
      </Link>
    </section>
  );
}
