import { createClient, type MicroCMSListContent } from "microcms-js-sdk";

export type DocumentCategory = "報告書" | "機関誌" | "法定資料";

export interface DocumentItem {
  id: string;
  title: string;
  description: string;
  url: string;
  category: DocumentCategory;
  date: string;
}

type CMSDocument = MicroCMSListContent & {
  title: string;
  description: string;
  url: string;
  category: DocumentCategory | DocumentCategory[];
  date: string;
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

const FALLBACK: DocumentItem[] = [
  { id: "doc-001", category: "報告書", date: "2026年4月", title: "地域コミュニティ点検調査報告書", description: "玉野市内の地域コミュニティの現状を点検・調査した報告書です。", url: "#" },
  { id: "doc-002", category: "報告書", date: "2025年10月", title: "コミュニティ協議会聞き取り調査報告書", description: "市内各コミュニティ協議会へのヒアリング調査をまとめた報告書です。", url: "#" },
  { id: "doc-003", category: "報告書", date: "2025年10月", title: "地区社会福祉協議会関連調査報告書", description: "地区社会福祉協議会の活動実態と課題を整理した調査報告書です。", url: "#" },
  { id: "doc-004", category: "報告書", date: "2024年", title: "2023年度 活動報告書", description: "2023年度の活動全体をまとめた年次報告書です。", url: "#" },
  { id: "doc-005", category: "機関誌", date: "2025年10月", title: "みらいレター 第2号", description: "センターの機関誌「みらいレター」最新号です。", url: "#" },
  { id: "doc-006", category: "機関誌", date: "2025年", title: "みらいレター 第1号", description: "センターの機関誌「みらいレター」創刊号です。", url: "#" },
  { id: "doc-007", category: "法定資料", date: "2026年4月", title: "活動計算書・事業報告書", description: "最新の活動計算書・事業報告書・財産目録・貸借対照表です。", url: "#" },
  { id: "doc-008", category: "法定資料", date: "2025年1月20日", title: "定款", description: "特定非営利活動法人 玉野SDGsみらいづくりセンターの定款です。", url: "#" },
];

export async function fetchDocuments(): Promise<DocumentItem[]> {
  if (client) {
    try {
      const res = await client.getList<CMSDocument>({
        endpoint: "documents",
        queries: { limit: 100, orders: "-date" },
      });
      return res.contents.map((c) => ({
        id: c.id,
        title: c.title,
        description: c.description,
        url: c.url,
        category: Array.isArray(c.category) ? c.category[0] : c.category,
        date: c.date,
      }));
    } catch {
      return FALLBACK;
    }
  }
  return FALLBACK;
}
