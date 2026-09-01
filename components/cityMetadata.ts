import type { Metadata } from "next";
import { BUSINESS } from "components/businessInfo";
import type { CityPageData } from "components/cityPageData";

/**
 * Builds the whole metadata block for a city page.
 *
 * Replaces the ~25 lines of title, openGraph, and twitter boilerplate that
 * every geo page currently repeats by hand, with the domain hardcoded twice.
 */
export function cityMetadata(data: CityPageData): Metadata {
  const url = `${BUSINESS.url}${data.slug}`;
  const title = data.seo?.metaTitle ?? `${BUSINESS.name} in ${data.city}`;
  const description = data.seo?.metaDescription ?? data.intro;

  return {
    title,
    description,
    alternates: { canonical: url },
    /**
     * A page with no seo block exists to be landed on, not found. Letting
     * Google index a thin, near duplicate location page next to the Houston
     * pages dilutes the local signal those pages depend on. `follow` still
     * passes link equity onward.
     */
    robots: data.seo ? undefined : { index: false, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: BUSINESS.name,
      images: [
        { url: "/logo.png", width: 512, height: 512, alt: BUSINESS.name },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/logo.png"],
    },
  };
}
