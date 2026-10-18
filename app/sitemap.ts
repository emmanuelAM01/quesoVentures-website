import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import { PRODUCTS } from "components/catalog";

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

/**
 * The tool pages share one template and one data file, so the catalogue's
 * own date is the honest one for all of them. The Website and the Revenue
 * System have pages of their own on top of it; whichever moved last wins.
 */
function toolDate(slug: string): Date {
  const data = path.join(process.cwd(), "components", "catalog.ts");
  const own = path.join(process.cwd(), "app", "tools", slug, "page.tsx");
  const dates = [data, own].map((f) => {
    try {
      return fs.statSync(f).mtime.getTime();
    } catch {
      return 0;
    }
  });
  const latest = Math.max(...dates);
  return latest ? new Date(latest) : new Date();
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
      url: `${BASE}/tools`,
      lastModified: toolDate("."),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...PRODUCTS.map((p) => ({
      url: `${BASE}/tools/${p.slug}`,
      lastModified: toolDate(p.slug),
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
      // The data under it changes daily, so the page's own file date says
      // nothing about freshness. Weekly is what Google should expect.
      url: `${BASE}/report-card`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
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
