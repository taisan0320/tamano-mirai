import { createClient, type MicroCMSListContent } from "microcms-js-sdk";

export interface BoardCard {
  id: string;
  title: string;
  body: string;
  author: string;
  role: string;
  tag: string;
  publishedAt: string;
}

type CMSBoardCard = MicroCMSListContent & {
  title: string;
  body: string;
  author: string;
  role: string;
  tag: string;
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

const FALLBACK: BoardCard[] = [
  { id: "b-001", author: "西田井", role: "学校連携コーディネーター", publishedAt: "2026-04-27", tag: "学校 × 地域", title: "高校生が町の人にインタビューする日をつくれないか", body: "玉野高校の探究の時間で、生徒が町の人にインタビューしに行く。受け入れてくれる商店・事業者を募りたい。" },
  { id: "b-002", author: "田中", role: "玉野市南部・若手農家", publishedAt: "2026-04-26", tag: "農業 × 食", title: "棚田の田植え体験、子どもたちと一緒にやってみたい", body: "GW明けに棚田の田植えを予定しています。サポートしてくれる人を3名くらい募集。" },
  { id: "b-003", author: "山本", role: "陶芸家", publishedAt: "2026-04-24", tag: "ものづくり", title: "玉野の土で器を焼く、月いちのワークショップ", body: "工房を月1で開放したい。初心者OK。土と向き合う時間を、一緒に過ごしてくれる人を探しています。" },
];

export async function fetchBoardCards(limit = 12): Promise<BoardCard[]> {
  if (client) {
    const res = await client.getList<CMSBoardCard>({
      endpoint: "board",
      queries: { limit, orders: "-publishedAt" },
    });
    return res.contents.map((c) => ({
      id: c.id,
      title: c.title,
      body: c.body,
      author: c.author,
      role: c.role,
      tag: c.tag,
      publishedAt: c.publishedAt ?? new Date().toISOString(),
    }));
  }
  return FALLBACK;
}
