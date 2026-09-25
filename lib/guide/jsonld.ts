import { BUSINESS, breadcrumbSchema } from "components/businessInfo";
import { SITE_URL, type GuideCard, type GuideEntry } from "lib/guide/queries";
import { guideImageUrl } from "lib/guide/supabase";

export const GUIDE_NAME = "The Queso Guide";

/** Who publishes the guide. Referenced by id from every article. */
export const GUIDE_PUBLISHER = {
  "@type": "Organization",
  "@id": `${BUSINESS.url}/#organization`,
  name: BUSINESS.name,
  url: BUSINESS.url,
  logo: {
    "@type": "ImageObject",
    url: `${BUSINESS.url}/logo-512.png`,
    width: 512,
    height: 512,
  },
};

export type Crumb = { name: string; path: string };

export function guideTrail(entry?: {
  city?: { name: string; slug: string };
  category?: { plural_name: string; slug: string };
  business?: { name: string; path: string };
}): Crumb[] {
  const trail: Crumb[] = [{ name: GUIDE_NAME, path: "/guide" }];
  if (entry?.city) trail.push({ name: entry.city.name, path: `/guide/${entry.city.slug}` });
  if (entry?.city && entry.category)
    trail.push({
      name: entry.category.plural_name,
      path: `/guide/${entry.city.slug}/${entry.category.slug}`,
    });
  if (entry?.business) trail.push(entry.business);
  return trail;
}

function sameAs(entry: GuideEntry): string[] {
  return Array.from(
    new Set(
      [entry.website_url, entry.maps_url, entry.instagram_url, ...(entry.same_as ?? [])].filter(
        (u): u is string => Boolean(u && /^https?:\/\//.test(u))
      )
    )
  );
}

function e164(phone: string | null): string | undefined {
  if (!phone) return undefined;
  const d = phone.replace(/\D/g, "");
  if (d.length === 10) return `+1-${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
  if (d.length === 11 && d.startsWith("1"))
    return `+1-${d.slice(1, 4)}-${d.slice(4, 7)}-${d.slice(7)}`;
  return phone;
}

/** Drops keys whose value is empty, so the graph never states a blank as a fact. */
function clean<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== null && v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0)
    )
  ) as T;
}

export function articleGraph(entry: GuideEntry, meta: { title: string; description: string }) {
  const url = `${SITE_URL}${entry.path}`;
  const images = [
    guideImageUrl(entry.hero_image_path),
    ...(entry.gallery ?? []).map((g) => guideImageUrl(g.path)),
  ].filter(Boolean) as string[];

  const business = clean({
    "@type": entry.category.schema_type || "LocalBusiness",
    "@id": `${url}#business`,
    name: entry.business_name,
    url: entry.website_url || undefined,
    telephone: e164(entry.phone),
    image: images.length ? images : undefined,
    priceRange: entry.price_range || undefined,
    address: entry.street_address
      ? clean({
          "@type": "PostalAddress",
          streetAddress: entry.street_address,
          addressLocality: entry.locality || entry.city.name,
          addressRegion: entry.region || entry.city.region,
          postalCode: entry.postal_code || undefined,
          addressCountry: "US",
        })
      : undefined,
    geo:
      entry.latitude != null && entry.longitude != null
        ? { "@type": "GeoCoordinates", latitude: Number(entry.latitude), longitude: Number(entry.longitude) }
        : undefined,
    hasMap: entry.maps_url || undefined,
    openingHoursSpecification: (entry.hours ?? [])
      .filter((h) => h.days?.length && h.opens && h.closes)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
    sameAs: sameAs(entry),
  });

  const graph: Record<string, unknown>[] = [
    clean({
      "@type": "Article",
      "@id": `${url}#article`,
      mainEntityOfPage: url,
      headline: entry.headline || meta.title,
      description: meta.description,
      image: images.length ? images : undefined,
      datePublished: entry.published_at || undefined,
      dateModified: entry.updated_at,
      author: {
        "@type": "Person",
        name: entry.author_name,
        url: `${SITE_URL}/guide/editor`,
      },
      publisher: GUIDE_PUBLISHER,
      about: { "@id": `${url}#business` },
      isPartOf: { "@type": "CollectionPage", "@id": `${SITE_URL}/guide#collection`, name: GUIDE_NAME },
    }),
    business,
  ];

  const faqs = (entry.faqs ?? []).filter((f) => f.question && f.answer);
  if (faqs.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  graph.push(
    breadcrumbSchema(
      guideTrail({
        city: entry.city,
        category: entry.category,
        business: { name: entry.business_name, path: entry.path },
      })
    )
  );

  return { "@context": "https://schema.org", "@graph": graph };
}

export function collectionGraph(opts: {
  path: string;
  name: string;
  description: string;
  entries: GuideCard[];
  trail: Crumb[];
}) {
  const url = `${SITE_URL}${opts.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#collection`,
        url,
        name: opts.name,
        description: opts.description,
        publisher: GUIDE_PUBLISHER,
        // An ItemList with no position: this is a collection, not a ranking.
        mainEntity: {
          "@type": "ItemList",
          itemListOrder: "https://schema.org/ItemListUnordered",
          numberOfItems: opts.entries.length,
          itemListElement: opts.entries.map((e) => ({
            "@type": "ListItem",
            url: `${SITE_URL}${e.path}`,
            name: e.business_name,
          })),
        },
      },
      breadcrumbSchema(opts.trail),
    ],
  };
}

/** JSON for a <script> tag, with `<` escaped so a business name cannot close it. */
export function ldJson(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
