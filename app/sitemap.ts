import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import { SERVICE_AREAS, FEATURED_INDUSTRIES } from "components/serviceAreas";

const BASE = "https://www.quesoventures.com";

/**
 * Last time the page's own source file changed. Beats a hardcoded date that
 * freezes months in the past and tells Google nothing here ever moves.
 */
function sourceDate(routePath: string): Date {
  const file = path.join(
    process.cwd(),
    "app",
    routePath.replace(/^\//, ""),
    "page.tsx"
  );
  try {
    return fs.statSync(file).mtime;
  } catch {
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: sourceDate("/"),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${BASE}/contact`,
      lastModified: sourceDate("/contact"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${BASE}/services`,
      lastModified: sourceDate("/services"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    // Geo pages carry the local intent — highest priority after the homepage.
    ...SERVICE_AREAS.map((area) => ({
      url: `${BASE}${area.slug}`,
      lastModified: sourceDate(area.slug),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...FEATURED_INDUSTRIES.map((industry) => ({
      url: `${BASE}${industry.slug}`,
      lastModified: sourceDate(industry.slug),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${BASE}/about`,
      lastModified: sourceDate("/about"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE}/studios`,
      lastModified: sourceDate("/studios"),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${BASE}/privacy`,
      lastModified: sourceDate("/privacy"),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${BASE}/terms`,
      lastModified: sourceDate("/terms"),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];
}
