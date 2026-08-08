export interface ServiceArea {
  city: string;
  slug: string;
  tagline: string;
}

export const SERVICE_AREAS: ServiceArea[] = [
  {
    city: "Atascocita",
    slug: "/web-design-atascocita-tx",
    tagline: "Show up first when Atascocita searches.",
  },
  {
    city: "Humble",
    slug: "/web-design-humble-tx",
    tagline: "Own the FM 1960 corridor.",
  },
  {
    city: "Kingwood",
    slug: "/web-design-kingwood-tx",
    tagline: "Be who Kingwood finds.",
  },
  {
    city: "Summerwood & Fall Creek",
    slug: "/web-design-summerwood-tx",
    tagline: "Reach the families moving in.",
  },
  {
    city: "Porter & New Caney",
    slug: "/web-design-porter-tx",
    tagline: "Win the 59 corridor.",
  },
  {
    city: "Channelview",
    slug: "/web-design-channelview-tx",
    tagline: "Get there before the chains.",
  },
];

export interface Industry {
  label: string;
  /** Set when this industry has its own page. Otherwise it's listed only. */
  slug?: string;
  tagline: string;
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
    slug: "/seo-for-auto-shops-houston",
    tagline: "Be the shop that comes up before the dealership.",
  },
  {
    label: "Wrap & Detail Shops",
    slug: "/seo-for-wrap-shops-houston",
    tagline: "Show the work to the people already looking for it.",
  },
  {
    label: "Construction, Roofing & Flooring",
    slug: "/seo-for-contractors-houston",
    tagline: "Get called by homeowners, not just referrals.",
  },
  {
    label: "Med Spas, Clinics & Dentists",
    slug: "/seo-for-med-spas-houston",
    tagline: "Fill the appointment book from search.",
  },
  {
    label: "Food Trucks & Restaurants",
    slug: "/website-for-food-trucks-houston",
    tagline: "Get found by people deciding where to eat right now.",
  },
  {
    label: "Landscaping & Lawn Care",
    tagline: "Win the season before it starts.",
  },
  {
    label: "Cleaning & Carpet Care",
    tagline: "Be the first call, not the third quote.",
  },
  {
    label: "Event Venues",
    tagline: "Get booked further out.",
  },
  {
    label: "Music Schools & Bands",
    tagline: "Be findable when someone is ready to book.",
  },
  {
    label: "Bakeries & Donut Shops",
    tagline: "Own the morning search.",
  },
  {
    label: "Licensed & Specialty Retail",
    tagline: "Show up for the people already searching for you.",
  },
  {
    label: "Online & Home-Based Shops",
    tagline: "Look established, wherever you run it from.",
  },
];

/** Only the industries that have their own page. */
export const FEATURED_INDUSTRIES = INDUSTRIES.filter(
  (i): i is Industry & { slug: string } => Boolean(i.slug)
);
