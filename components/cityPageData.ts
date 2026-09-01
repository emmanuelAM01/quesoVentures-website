/**
 * One shape for every city page, at two depths.
 *
 * A city page does one of two jobs:
 *
 *   1. It ranks. Someone in Humble searches for a web designer and finds it.
 *      That needs original local copy, and it needs to be indexed.
 *
 *   2. It catches. Someone scans a business card in another city and needs to
 *      land somewhere that names their city instead of Houston. That needs a
 *      headline, a paragraph, and a way to get in touch. Nothing more.
 *
 * The `seo` block is what separates them. Present means job one: the full page
 * renders and the page is indexed. Absent means job two: a short page that is
 * deliberately kept out of the index.
 */

export interface CitySeoBlock {
  /** Keep near 60 characters so Google does not truncate it. */
  metaTitle: string;
  /** Keep near 155 characters. */
  metaDescription: string;
  postalCode?: string;
  painPoints: { heading: string; body: string }[];
  whatChanges: { title: string; body: string }[];
  faqItems: { q: string; a: string }[];
}

export interface CityPageData {
  city: string;
  /**
   * Two letter state code. Defaults to the home region, so Texas pages can
   * leave it off and anywhere else must set it. Schema that claims the wrong
   * region for a city is worse than schema that claims none.
   */
  region?: string;
  slug: string;
  /** Keep under ~34 characters. It has to hold one line. */
  headline: string;
  /** The paragraph under the headline. On a card page this is the whole pitch. */
  intro: string;
  /** Seeds the contact modal. */
  prefill: string;
  /**
   * Which proof block runs, and whether the page links back to the Houston
   * suburbs. "local" claims proximity, so only use it where the drive is real.
   */
  proof: "local" | "remote";
  heroImage?: { src: string; alt: string };
  /** Present means this page is built to rank. See the note above. */
  seo?: CitySeoBlock;
}

/** A page earns a place in the index by carrying real copy. */
export const isIndexable = (page: CityPageData): boolean => Boolean(page.seo);

/**
 * Every city page, registered once. Drives the sitemap.
 *
 * Empty until the cities are chosen.
 */
export const CITY_PAGES: CityPageData[] = [];
