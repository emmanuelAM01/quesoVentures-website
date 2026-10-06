import type { MetadataRoute } from "next";
import { getCities, getPublished, SITE_URL } from "lib/guide/queries";

export const revalidate = 86400;

/**
 * /guide/sitemap.xml, listed in robots.ts beside the main sitemap.
 *
 * Its own file rather than more entries in app/sitemap.ts. That one dates each
 * page from its source file's mtime, which only exists at build time; making it
 * refresh when an article is published would restamp every static page on the
 * site as modified that minute. This one changes on every publish and dates
 * each URL from the row itself.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [published, cities] = await Promise.all([getPublished(), getCities()]);
  const slugOf = new Map(cities.map((c) => [c.id, c.slug]));
  if (!published.length) {
    return [{ url: `${SITE_URL}/guide`, changeFrequency: "weekly", priority: 0.7 }];
  }

  const newest = (list: { updated_at: string }[]) =>
    new Date(Math.max(...list.map((e) => new Date(e.updated_at).getTime())));

  const byCity = new Map<string, typeof published>();
  const byCategory = new Map<string, typeof published>();
  for (const e of published) {
    // A town's page lists the businesses in it and the ones serving it.
    const towns = [e.city.slug, ...(e.serves_city_ids ?? []).map((id) => slugOf.get(id)).filter((s): s is string => !!s)];
    for (const town of Array.from(new Set(towns))) byCity.set(town, [...(byCity.get(town) ?? []), e]);
    const key = `${e.city.slug}/${e.category.slug}`;
    byCategory.set(key, [...(byCategory.get(key) ?? []), e]);
  }

  return [
    { url: `${SITE_URL}/guide`, lastModified: newest(published), changeFrequency: "weekly", priority: 0.7 },
    // A town page with one entry is not indexed (see app/guide/[city]), so it
    // is not offered to search engines either.
    ...Array.from(byCity).filter(([, list]) => list.length >= 2).map(([city, list]) => ({
      url: `${SITE_URL}/guide/${city}`,
      lastModified: newest(list),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...Array.from(byCategory, ([key, list]) => ({
      url: `${SITE_URL}/guide/${key}`,
      lastModified: newest(list),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...published.map((e) => ({
      url: `${SITE_URL}${e.path}`,
      lastModified: new Date(e.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${SITE_URL}/guide/standards`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/guide/editor`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
