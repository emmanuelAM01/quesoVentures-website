import "server-only";
import { cache } from "react";
import { notFound, permanentRedirect } from "next/navigation";
import { BUSINESS } from "components/businessInfo";
import { guidePublic, guideService } from "lib/guide/supabase";
import {
  guideArticlePath,
  type GuideArticle,
  type GuideCategory,
  type GuideCity,
} from "lib/guide/types";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || BUSINESS.url).replace(/\/$/, "");

export type CityRef = Pick<GuideCity, "id" | "slug" | "name" | "region">;
export type CategoryRef = Pick<GuideCategory, "id" | "slug" | "name" | "plural_name" | "schema_type" | "items_label">;

export type GuideCard = Pick<
  GuideArticle,
  | "id"
  | "slug"
  | "business_name"
  | "dek"
  | "area"
  | "hero_image_path"
  | "hero_image_alt"
  | "published_at"
  | "updated_at"
> & { city: CityRef; category: CategoryRef; path: string };

export type GuideEntry = GuideArticle & { city: CityRef; category: CategoryRef; path: string };

const CARD_COLUMNS =
  "id, slug, business_name, dek, area, hero_image_path, hero_image_alt, published_at, updated_at, " +
  "city:cities!inner(id, slug, name, region), category:categories!inner(id, slug, name, plural_name, schema_type, items_label)";

const ENTRY_COLUMNS =
  "*, city:cities!inner(id, slug, name, region), category:categories!inner(id, slug, name, plural_name, schema_type, items_label)";

function withPath<T extends { slug: string; city: CityRef; category: CategoryRef }>(row: T) {
  return { ...row, path: guideArticlePath(row.city.slug, row.category.slug, row.slug) };
}

/**
 * Every published entry, newest first.
 *
 * One query for the whole guide rather than one per hub. It is a list of a few
 * hundred rows at the very most, it is cached under the `guide` tag, and every
 * hub, the sitemap and "More from" are filters over the same list, so they can
 * never disagree about what is published.
 */
export const getPublished = cache(async (): Promise<GuideCard[]> => {
  const db = guidePublic();
  if (!db) return [];
  const { data, error } = await db
    .from("articles")
    .select(CARD_COLUMNS)
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) {
    console.error("[guide] published list", error.message);
    return [];
  }
  return (data as unknown as Omit<GuideCard, "path">[]).map(withPath);
});

export const getCities = cache(async (): Promise<GuideCity[]> => {
  const db = guidePublic();
  if (!db) return [];
  const { data } = await db.from("cities").select("*").order("sort_order");
  return data ?? [];
});

export const getCategories = cache(async (): Promise<GuideCategory[]> => {
  const db = guidePublic();
  if (!db) return [];
  const { data } = await db.from("categories").select("*").order("sort_order");
  return data ?? [];
});

/** Cities and categories that have at least one published entry, in their set order. */
export async function getActiveFacets() {
  const [published, cities, categories] = await Promise.all([
    getPublished(),
    getCities(),
    getCategories(),
  ]);
  const cityIds = new Set(published.map((a) => a.city.id));
  const categoryIds = new Set(published.map((a) => a.category.id));
  return {
    published,
    cities: cities.filter((c) => cityIds.has(c.id)),
    categories: categories.filter((c) => categoryIds.has(c.id)),
  };
}

/**
 * One entry by its path.
 *
 * In draft mode it reads with the service role and ignores status, so the
 * admin's "Preview on site" shows a draft exactly as it will render. Outside
 * draft mode only a published row can come back.
 */
export const getEntry = cache(
  async (city: string, category: string, slug: string, draft: boolean): Promise<GuideEntry | null> => {
    const db = draft ? guideService() : guidePublic();
    if (!db) return null;
    let query = db
      .from("articles")
      .select(ENTRY_COLUMNS)
      .eq("slug", slug)
      .eq("city.slug", city)
      .eq("category.slug", category);
    if (!draft) query = query.eq("status", "published");
    const { data } = await query.maybeSingle();
    if (!data) return null;
    return withPath(data as unknown as Omit<GuideEntry, "path">);
  }
);

/**
 * A few other published entries: same category in the same city first, then
 * the same city, then the same category elsewhere. Newest first within each,
 * never by any judgement of quality.
 */
export async function getRelated(entry: GuideEntry, limit = 3): Promise<GuideCard[]> {
  const others = (await getPublished()).filter((a) => a.id !== entry.id);
  const tiers = [
    others.filter((a) => a.city.id === entry.city.id && a.category.id === entry.category.id),
    others.filter((a) => a.city.id === entry.city.id && a.category.id !== entry.category.id),
    others.filter((a) => a.city.id !== entry.city.id && a.category.id === entry.category.id),
  ];
  return tiers.flat().slice(0, limit);
}

/**
 * The end of every guide route that found nothing. An article that moved left
 * its old path in queso_guide.redirects; send the visitor, and the link equity,
 * to where it went.
 */
export async function redirectOrNotFound(path: string): Promise<never> {
  const db = guidePublic();
  if (db) {
    const { data } = await db
      .from("redirects")
      .select("to_path")
      .eq("from_path", path)
      .maybeSingle();
    if (data?.to_path && data.to_path !== path) permanentRedirect(data.to_path);
  }
  notFound();
}
