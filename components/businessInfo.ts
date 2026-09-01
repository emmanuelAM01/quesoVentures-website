/**
 * Single source of truth for name, address, phone, and profile links.
 *
 * Local search only works when what the site says matches what the Google
 * Business Profile says, character for character. Everything that renders a
 * phone number, a locality, or a schema block reads from here so the two can
 * never drift apart.
 */

export const BUSINESS = {
  name: "Queso Ventures",
  legalName: "Queso Ventures LLC",

  phone: "(281) 203-4531",
  phoneHref: "tel:+12812034531",
  /** E.164, for schema.org telephone */
  phoneE164: "+1-281-203-4531",

  email: "hello@quesoventures.com",
  emailHref: "mailto:hello@quesoventures.com",

  url: "https://www.quesoventures.com",

  /**
   * Service-area business: no street address is published. Google still needs
   * a home locality to anchor the listing, and it must match the GBP.
   */
  locality: "Atascocita",
  region: "TX",
  regionName: "Texas",
  postalCode: "77346",
  country: "US",

  /**
   * What people read. Deliberately not "Atascocita office" — the company isn't
   * a single-suburb shop and shouldn't read like one.
   *
   * The ZIP came out on 2026-08-31. It was never doing work here: nobody thinks
   * in ZIP codes, and the one that matters is the `postalCode` in
   * `POSTAL_ADDRESS` below, which is on every page and is what Google reads
   * against the Business Profile. This line only has to tell a human roughly
   * where I am.
   */
  addressLine: "Northeast Houston, TX",
  addressLineShort: "Northeast Houston",

  /**
   * The Business Profile, by CID. Resolved from the maps.app.goo.gl share link
   * (CID 0x7ca5e75e33f65e94). This form is used rather than the long
   * /maps/place/... URL because that one carries session and zoom parameters
   * that change every time it's copied — this one is stable forever.
   */
  gbp: "https://maps.google.com/?cid=8981839423645048468",

  /**
   * Google's own entity id for this business, from the profile URL
   * (`16s/g/11nb2z6drb`). Stating it in schema removes any ambiguity about
   * which listing this site belongs to.
   */
  googleEntityId: "/g/11nb2z6drb",

  instagram: "https://instagram.com/quesoventures",
  youtube: "https://youtube.com/@quesoventures",

  priceRange: "$500 per month",
} as const;

/** Everything that identifies this business as the same entity across the web. */
export const SAME_AS: string[] = [
  BUSINESS.gbp,
  BUSINESS.instagram,
  BUSINESS.youtube,
];

/**
 * Towns worked, nearest first. Drives schema areaServed and the plain-language
 * service-area line in the footer and on /contact.
 */
export const AREAS_SERVED: { city: string; zips: string[] }[] = [
  { city: "Atascocita", zips: ["77346"] },
  { city: "Humble", zips: ["77338", "77339", "77396"] },
  { city: "Kingwood", zips: ["77339", "77345"] },
  { city: "Summerwood", zips: ["77044", "77396"] },
  { city: "Fall Creek", zips: ["77396"] },
  { city: "Porter", zips: ["77365"] },
  { city: "New Caney", zips: ["77357"] },
  { city: "Channelview", zips: ["77530"] },
  { city: "Crosby", zips: ["77532"] },
  { city: "Huffman", zips: ["77336"] },
  { city: "Houston", zips: [] },
];

export const SERVICE_ZIPS: string[] = Array.from(
  new Set(AREAS_SERVED.flatMap((a) => a.zips))
);

/** schema.org areaServed for any LocalBusiness/Service node. */
export const AREA_SERVED_SCHEMA = AREAS_SERVED.map((a) => ({
  "@type": "City" as const,
  name: a.city,
  addressRegion: BUSINESS.region,
}));

/** schema.org PostalAddress. No street line: this is a service-area business. */
export const POSTAL_ADDRESS = {
  "@type": "PostalAddress" as const,
  addressLocality: BUSINESS.locality,
  addressRegion: BUSINESS.region,
  postalCode: BUSINESS.postalCode,
  addressCountry: BUSINESS.country,
};

/**
 * The LocalBusiness node, reused by every page so there is exactly one
 * description of this business across the site.
 */
export const LOCAL_BUSINESS_SCHEMA = {
  "@type": "ProfessionalService",
  "@id": `${BUSINESS.url}/#localbusiness`,
  name: BUSINESS.name,
  legalName: BUSINESS.legalName,
  url: BUSINESS.url,
  image: `${BUSINESS.url}/logo.png`,
  logo: `${BUSINESS.url}/logo.png`,
  telephone: BUSINESS.phoneE164,
  email: BUSINESS.email,
  address: POSTAL_ADDRESS,
  areaServed: AREA_SERVED_SCHEMA,
  sameAs: SAME_AS,
  hasMap: BUSINESS.gbp,
  identifier: {
    "@type": "PropertyValue",
    propertyID: "Google Knowledge Graph ID",
    value: BUSINESS.googleEntityId,
  },
  priceRange: BUSINESS.priceRange,
  description:
    "Website design and local search for businesses in Atascocita, Humble, Kingwood, and the rest of Northeast Houston. Simple plans at $500 a month.",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:00",
      closes: "19:00",
    },
  ],
};

/** BreadcrumbList for any inner page. */
export function breadcrumbSchema(
  trail: { name: string; path: string }[]
) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${BUSINESS.url}${trail[trail.length - 1]?.path ?? ""}#breadcrumb`,
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map(
      (item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: `${BUSINESS.url}${item.path === "/" ? "" : item.path}`,
      })
    ),
  };
}
