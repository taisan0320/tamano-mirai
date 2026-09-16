import type { MetadataRoute } from "next";
import { fetchAllSlugsWithDates } from "@/lib/articles";
import { fetchAllInterviewSlugsWithDates } from "@/lib/interviews";

const BASE_URL = "https://npo-tamano-mirai.com";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: BASE_URL,              changeFrequency: "daily",   priority: 1.0 },
  { url: `${BASE_URL}/about`,   changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/media`,   changeFrequency: "daily",   priority: 0.9 },
  { url: `${BASE_URL}/members`,     changeFrequency: "yearly",  priority: 0.6 },
  { url: `${BASE_URL}/history`,     changeFrequency: "yearly",  priority: 0.5 },
  { url: `${BASE_URL}/lessons`,     changeFrequency: "weekly",  priority: 0.8 },
  { url: `${BASE_URL}/events`,     changeFrequency: "weekly",  priority: 0.8 },
  { url: `${BASE_URL}/interviews`, changeFrequency: "weekly",  priority: 0.8 },
  { url: `${BASE_URL}/news`,    changeFrequency: "weekly",  priority: 0.7 },
  { url: `${BASE_URL}/blog`,    changeFrequency: "weekly",  priority: 0.7 },
  { url: `${BASE_URL}/learning`, changeFrequency: "weekly",  priority: 0.7 },
  { url: `${BASE_URL}/programs`,changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/services`,changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/documents`,changeFrequency: "monthly",priority: 0.6 },
  { url: `${BASE_URL}/join`,    changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/contact`, changeFrequency: "yearly",  priority: 0.5 },
  { url: `${BASE_URL}/privacy`, changeFrequency: "yearly",  priority: 0.3 },
];

/** "2026-09-16" や ISO 形式の文字列を Date に。空や不正な値は undefined */
function toDate(value: string): Date | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, interviews] = await Promise.all([
    fetchAllSlugsWithDates(),
    fetchAllInterviewSlugsWithDates(),
  ]);

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/media/${a.slug}`,
    lastModified: toDate(a.lastModified),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const interviewRoutes: MetadataRoute.Sitemap = interviews.map((i) => ({
    url: `${BASE_URL}/interviews/${i.slug}`,
    lastModified: toDate(i.lastModified),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // 記事が更新されれば、トップと一覧の中身も変わる
  const newest = [...articleRoutes, ...interviewRoutes]
    .map((r) => r.lastModified)
    .filter((d): d is Date => d instanceof Date)
    .sort((a, b) => b.getTime() - a.getTime())[0];

  const listRoutes = new Set([
    BASE_URL,
    `${BASE_URL}/media`,
    `${BASE_URL}/events`,
    `${BASE_URL}/interviews`,
    `${BASE_URL}/news`,
    `${BASE_URL}/blog`,
    `${BASE_URL}/learning`,
  ]);
  const dated = staticRoutes.map((r) =>
    newest && listRoutes.has(String(r.url)) ? { ...r, lastModified: newest } : r
  );

  return [...dated, ...articleRoutes, ...interviewRoutes];
}
