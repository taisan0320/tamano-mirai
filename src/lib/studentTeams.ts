import { createClient, type MicroCMSListContent } from "microcms-js-sdk";

export interface StudentTeam {
  slug: string;
  teamName: string;
  theme: string;
  description: string;
  photo?: string;
  date: string;
}

// ─── Static fallback data ────────────────────────────────────────────────────

const staticTeams: StudentTeam[] = [
  {
    slug: "tamano-gohan-tsushin",
    teamName: "たまの食べる通信部",
    theme: "玉野の食と農を、学生の目線で発信する",
    description: "地元農家と連携しながら、玉野産食材を使ったレシピ開発や産直マップの制作に取り組んでいます。SNSを活用して市内外に玉野の食の魅力を届けます。",
    date: "2026-04-10",
  },
  {
    slug: "uno-harbor-lab",
    teamName: "UNO HARBOR LAB",
    theme: "宇野港エリアの魅力を、若者の感覚で再発見",
    description: "アートの島・直島の玄関口でもある宇野港周辺を舞台に、観光客と地元をつなぐコンテンツ制作や案内板のデザイン提案などを進めています。",
    date: "2026-04-15",
  },
  {
    slug: "tamano-green-team",
    theme: "緑と公園を活かした、新しい地域の居場所づくり",
    teamName: "たまのグリーンチーム",
    description: "市内の公園や緑地を活用したイベント企画・清掃活動を通じて、世代を超えた交流の場をつくることを目指しています。",
    date: "2026-04-20",
  },
];

// ─── microCMS integration ────────────────────────────────────────────────────

type CMSTeam = MicroCMSListContent & {
  teamName: string;
  theme: string;
  description: string;
  photo?: { url: string };
  date?: string;
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

function cmsToTeam(item: CMSTeam): StudentTeam {
  return {
    slug: item.id,
    teamName: item.teamName,
    theme: item.theme,
    description: item.description,
    photo: item.photo?.url,
    date: item.date ?? item.publishedAt ?? new Date().toISOString(),
  };
}

export async function fetchAllStudentTeams(limit = 12): Promise<StudentTeam[]> {
  if (client) {
    try {
      const res = await client.getList<CMSTeam>({
        endpoint: "student-teams",
        queries: { limit, orders: "date" },
      });
      return res.contents.map(cmsToTeam);
    } catch {
      // endpoint not yet created – fall through to static data
    }
  }
  return [...staticTeams].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}
