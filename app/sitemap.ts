import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import { FEATURED_INDUSTRIES } from "components/serviceAreas";
import { CITIES, ALL_NEIGHBORHOODS } from "components/places";
import { CITY_PAGES, isIndexable } from "components/cityPageData";

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
    // The metro page is the hub of its cluster, so it outranks the towns under
    // it rather than sitting in the same undifferentiated list.
    ...CITIES.map((city) => ({
      url: `${BASE}${city.slug}`,
      lastModified: sourceDate(city.slug),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...ALL_NEIGHBORHOODS.map((area) => ({
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
    // City pages that carry real copy. A business card landing has no seo
    // block, so it stays out of the sitemap the same way it stays out of the
    // index. Empty until cities are registered.
    ...CITY_PAGES.filter(isIndexable).map((page) => ({
      url: `${BASE}${page.slug}`,
      lastModified: sourceDate(page.slug),
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
