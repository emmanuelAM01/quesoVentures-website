import type { PrimaryCity } from "components/places";

/**
 * Houston, and the Northeast Houston towns under it.
 *
 * The hand-written part of a metro lives here, in one file, so adding the next
 * one is a copy of this shape rather than a hunt through app/. Long-form page
 * prose still lives in each page file: this is the structure and the link
 * copy, which is what has to stay consistent across a metro.
 *
 * Summerwood & Fall Creek was removed on 2026-08-31. It took zero impressions
 * in three months, it is functionally Humble to anyone searching, and a town
 * page nobody searches is bloat that makes the rest of the cluster look
 * padded. /web-design-summerwood-tx now 301s to the Humble page.
 */
export const HOUSTON: PrimaryCity = {
  name: "Houston",
  region: "TX",
  regionName: "Texas",
  slug: "/web-design-houston-tx",
  tagline: "Web design and local SEO across the Houston area.",

  // Metro level, never per neighbourhood. Thirty {trade} x {town} pages that
  // differ by two nouns is a doorway network.
  industrySlugs: [
    "/seo-for-auto-shops-houston",
    "/seo-for-wrap-shops-houston",
    "/seo-for-contractors-houston",
    "/seo-for-med-spas-houston",
    "/website-for-food-trucks-houston",
  ],

  neighborhoods: [
    {
      name: "Atascocita",
      slug: "/web-design-atascocita-tx",
      tagline: "Show up first when Atascocita searches.",
      postalCode: "77346",
    },
    {
      name: "Humble",
      slug: "/web-design-humble-tx",
      tagline: "Own the FM 1960 corridor.",
      postalCode: "77338",
    },
    {
      name: "Kingwood",
      slug: "/web-design-kingwood-tx",
      tagline: "Be who Kingwood finds.",
      postalCode: "77339",
    },
    {
      name: "Porter & New Caney",
      slug: "/web-design-porter-tx",
      tagline: "Win the 59 corridor.",
      postalCode: "77365",
    },
    {
      name: "Channelview",
      slug: "/web-design-channelview-tx",
      tagline: "Get there before the chains.",
      postalCode: "77530",
    },
  ],
};
