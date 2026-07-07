import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { MetadataRoute } from "next";

const BASE = "https://www.quesoventures.com";

function getBlogSlugs(): string[] {
  const dir = path.join(process.cwd(), "content/blog");
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

function getBlogDate(slug: string): string {
  try {
    const raw = fs.readFileSync(
      path.join(process.cwd(), "content/blog", `${slug}.mdx`),
      "utf8"
    );
    const { data } = matter(raw);
    return data.date ?? new Date().toISOString();
  } catch {
    return new Date().toISOString();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = getBlogSlugs();

  const nichePages = [
    "/website-for-food-trucks-houston",
    // "/website-for-smoke-shops-houston",
    "/seo-for-contractors-houston",
    "/seo-for-med-spas-houston",
    "/web-design-humble-tx",
    "/web-design-atascocita-tx",
    "/web-design-kingwood-tx",
  ];

  return [
    {
      url: BASE,
      lastModified: new Date("2026-07-06"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE}/services`,
      lastModified: new Date("2026-07-06"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    ...nichePages.map((page) => ({
      url: `${BASE}${page}`,
      lastModified: new Date("2026-07-06"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${BASE}/about`,
      lastModified: new Date("2026-07-06"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE}/blog`,
      lastModified: new Date("2026-06-11"),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...blogSlugs.map((slug) => ({
      url: `${BASE}/blog/${slug}`,
      lastModified: new Date(getBlogDate(slug)),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
