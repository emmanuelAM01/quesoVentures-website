/**
 * Geography moved to components/places.ts, which holds it as a metro tree
 * rather than a flat list. SERVICE_AREAS is kept as a derived flat view so the
 * footer and the older link lists did not all have to change at once.
 */
export { ALL_NEIGHBORHOODS } from "components/places";

export interface Industry {
  label: string;
  /**
   * Nav-width version of `label`. Only needed on industries with a page: when
   * someone is on one, the navbar swaps "Who I Help" for where they are, and
   * "Construction, Roofing & Flooring" is four times the width of the item it
   * replaces. Falls back to `label`.
   */
  short?: string;
  /** Set when this industry has its own page. Otherwise it's listed only. */
  slug?: string;
  tagline: string;
  /**
   * Kept out of the nav, the footer and every on-page list, while the page
   * itself stays live and in the sitemap.
   *
   * For work that is welcome when it arrives but not worth going after. The
   * page can still rank and still convert; it just stops being an invitation.
   */
  unlisted?: boolean;
}

/**
 * Every kind of business worked with, in one list. The ones with a `slug` have
 * a dedicated page; the rest are listed so visitors recognise themselves and
 * so the page carries the full range of what this business actually serves.
 *
 * Two categories are deliberately generic. Licensed and specialty retail covers
 * clients whose category names put some visitors off, and home-based commerce
 * covers the people selling out of a garage or spare room.
 */
export const INDUSTRIES: Industry[] = [
  {
    label: "Auto Shops & Mobile Mechanics",
    short: "Auto Shops",
    slug: "/seo-for-auto-shops-houston",
    tagline: "Beat the dealership to the search.",
  },
  {
    label: "Wrap & Detail Shops",
    short: "Wrap & Detail",
    slug: "/seo-for-wrap-shops-houston",
    tagline: "Your best work is driving around town. Let them find you.",
  },
  {
    label: "Construction, Roofing & Flooring",
    short: "Construction",
    slug: "/seo-for-contractors-houston",
    tagline: "Calls that didn't come from a referral.",
  },
  {
    label: "Med Spas, Clinics & Dentists",
    short: "Med Spas",
    slug: "/seo-for-med-spas-houston",
    tagline: "Fill the booking slots.",
  },
  {
    label: "Food Trucks & Restaurants",
    short: "Food Trucks",
    slug: "/website-for-food-trucks-houston",
    tagline: "Be the answer to where should we eat.",
    unlisted: true,
  },
  {
    label: "Landscaping & Lawn Care",
    tagline: "Booked before the season starts.",
  },
  {
    label: "Cleaning & Carpet Care",
    tagline: "Be the first call, not the third quote.",
  },
  {
    label: "Event Venues",
    tagline: "Got book?",
  },
  {
    label: "Music Schools & Bands",
    tagline: "Found the week someone decides to start.",
  },
  {
    label: "Bakeries & Donut Shops",
    tagline: "Own the morning search.",
  },
  {
    label: "Licensed & Specialty Retail",
    tagline: "Found by the people already looking.",
  },
  {
    label: "Online & Home-Based Shops",
    tagline: "Look established, wherever you run it from.",
  },
];

/**
 * Every industry with its own page, unlisted ones included. This is what the
 * sitemap reads: an unlisted page still gets crawled and can still rank.
 */
export const FEATURED_INDUSTRIES = INDUSTRIES.filter(
  (i): i is Industry & { slug: string } => Boolean(i.slug)
);

/** What the nav, the footer and the on-page lists show. */
export const LISTED_INDUSTRIES = INDUSTRIES.filter((i) => !i.unlisted);

/** Listed industries that have a page, for link lists. */
export const LISTED_FEATURED = FEATURED_INDUSTRIES.filter((i) => !i.unlisted);
