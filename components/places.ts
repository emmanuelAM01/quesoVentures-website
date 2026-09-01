/**
 * Where this business claims to work, as a tree.
 *
 * One primary city per metro, with the neighbourhoods under it. Adding a metro
 * is a new file in content/ and one line in CITIES; nothing else in the site
 * has to learn about it. The sitemap, the breadcrumbs, the footer and the
 * cross-links all read from here.
 *
 * Why the tree and not a flat list of towns:
 *
 * The Search Console numbers for 2026-05-28 to 2026-08-28 are lopsided in a way
 * that decides the architecture. The geo pages took 64 impressions between them
 * (Kingwood 37, Atascocita 13, Humble 10, Porter 3, Channelview 1). The five
 * trade pages took 4, three of them zero. People search "web design kingwood
 * texas", not "kingwood mechanic website". So place is the axis that carries
 * the site, and trade is a qualifier inside a place page rather than a page of
 * its own per place.
 *
 * That is also why there is no {trade} x {neighbourhood} grid here. Six
 * neighbourhoods times five trades is thirty near-identical pages that differ
 * by two nouns, which is the textbook shape of a doorway network and gets the
 * whole domain discounted. The trade pages stay metro-level; the neighbourhood
 * pages mention trades without being about them.
 */

export interface Neighborhood {
  /** "Kingwood". Used in headings, schema and link lists. */
  name: string;
  slug: string;
  /** One line, for link lists. Not a page heading. */
  tagline: string;
  /** Primary ZIP, for the Service areaServed node. */
  postalCode?: string;
}

export interface PrimaryCity {
  /** "Houston". The hub every neighbourhood under it links back to. */
  name: string;
  /** Two-letter, for schema. */
  region: string;
  regionName: string;
  slug: string;
  tagline: string;
  /**
   * Trade pages that belong to this metro. Metro-level on purpose: see the
   * note above about the doorway grid.
   */
  industrySlugs: string[];
  neighborhoods: Neighborhood[];
}

import { HOUSTON } from "content/houston";

/** Every metro worked, in priority order. */
export const CITIES: PrimaryCity[] = [HOUSTON];

/** Flat list of every neighbourhood page, for the sitemap and the footer. */
export const ALL_NEIGHBORHOODS: (Neighborhood & { city: PrimaryCity })[] =
  CITIES.flatMap((city) => city.neighborhoods.map((n) => ({ ...n, city })));

/** The metro a neighbourhood page belongs to, or undefined for a metro page. */
export function cityOf(slug: string): PrimaryCity | undefined {
  return CITIES.find((c) => c.neighborhoods.some((n) => n.slug === slug));
}

export function cityBySlug(slug: string): PrimaryCity | undefined {
  return CITIES.find((c) => c.slug === slug);
}

/**
 * Breadcrumb trail for any page in the tree.
 *
 * A neighbourhood reads Home > Houston > Kingwood, which is the whole point of
 * the hierarchy: it tells Google that Kingwood is part of a Houston cluster
 * rather than a sixth unrelated town page, and it gives the metro page the
 * internal links that make it the hub.
 */
export function placeTrail(slug: string): { name: string; path: string }[] {
  const city = cityBySlug(slug);
  if (city) return [{ name: city.name, path: city.slug }];

  const parent = cityOf(slug);
  const hood = parent?.neighborhoods.find((n) => n.slug === slug);
  if (parent && hood) {
    return [
      { name: parent.name, path: parent.slug },
      { name: hood.name, path: hood.slug },
    ];
  }
  return [];
}
