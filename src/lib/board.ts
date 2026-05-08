import { createClient, type MicroCMSListContent } from "microcms-js-sdk";

export interface BoardCard {
  id: string;
  title: string;
  body: string;
  author: string;
  role: string;
  tag: string;
  publishedAt: string;
  thumbnail?: string;
}

type CMSBoardCard = MicroCMSListContent & {
  title: string;
  body: string;
  author: string;
  role: string;
  tag: string;
  thumbnail?: { url: string };
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
      thumbnail: c.thumbnail?.url,
    }));
  }
  return [];
}
