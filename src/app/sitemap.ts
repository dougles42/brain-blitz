import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://pitch-perfect.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/solo`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/daily`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/leaderboard`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/multiplayer`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];
}
