import type { MetadataRoute } from "next";
import { fetchAllSlugs } from "@/lib/articles";
import { fetchAllInterviewSlugs } from "@/lib/interviews";

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
  { url: `${BASE_URL}/programs`,changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/services`,changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/documents`,changeFrequency: "monthly",priority: 0.6 },
  { url: `${BASE_URL}/join`,    changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/contact`, changeFrequency: "yearly",  priority: 0.5 },
  { url: `${BASE_URL}/privacy`, changeFrequency: "yearly",  priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugs, interviewSlugs] = await Promise.all([
    fetchAllSlugs(),
    fetchAllInterviewSlugs(),
  ]);

  const articleRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE_URL}/media/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const interviewRoutes: MetadataRoute.Sitemap = interviewSlugs.map((slug) => ({
    url: `${BASE_URL}/interviews/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...articleRoutes, ...interviewRoutes];
}
