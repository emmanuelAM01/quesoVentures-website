import type { Metadata } from "next";
import Link from "next/link";
import GuideHeader from "components/guide/GuideHeader";
import GuideFilters from "components/guide/GuideFilters";
import GuideGrid from "components/guide/GuideGrid";
import { getActiveFacets, getCategories, SITE_URL } from "lib/guide/queries";
import { collectionGraph, guideTrail, GUIDE_NAME, ldJson } from "lib/guide/jsonld";

const TITLE = `${GUIDE_NAME} | Local businesses worth knowing`;
const DESCRIPTION =
  "The Queso Guide is a collection of local businesses we have visited in person. Who runs them, what to get, and what to know before you go.";
const INTRO =
  "Local businesses we have visited in person. Who runs each one, what to get, and what to know before you go.";

type Search = { city?: string; category?: string };

function pick(value: string | string[] | undefined) {
  return typeof value === "string" && /^[a-z0-9-]{1,80}$/.test(value) ? value : undefined;
}

/**
 * A filtered view is the same content as a hub page that already exists, so it
 * points its canonical there: city only is the city hub, city and industry is
 * the category hub. Industry alone has no hub and stays on /guide.
 */
export async function generateMetadata({ searchParams }: { searchParams: Search }): Promise<Metadata> {
  const city = pick(searchParams.city);
  const category = pick(searchParams.category);
  const canonical = city ? (category ? `/guide/${city}/${category}` : `/guide/${city}`) : "/guide";
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: `${SITE_URL}${canonical}` },
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: `${SITE_URL}/guide`,
      siteName: "Queso Ventures",
      type: "website",
      locale: "en_US",
      images: [{ url: "/logo.png", width: 512, height: 512, alt: "Queso Ventures" }],
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/logo.png"] },
  };
}

export default async function GuideHome({ searchParams }: { searchParams: Search }) {
  const city = pick(searchParams.city);
  const category = pick(searchParams.category);

  const [{ published, cities, categories }, allCategories] = await Promise.all([
    getActiveFacets(),
    getCategories(),
  ]);

  const shown = published.filter(
    (e) => (!city || e.city.slug === city) && (!category || e.category.slug === category)
  );

  const jsonLd = collectionGraph({
    path: "/guide",
    name: GUIDE_NAME,
    description: DESCRIPTION,
    entries: published,
    trail: guideTrail(),
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }} />
      <GuideHeader title={GUIDE_NAME} intro={INTRO}>
        {published.length ? (
          <GuideFilters
            key={`${city ?? ""}|${category ?? ""}`}
            cities={cities.map((c) => ({ slug: c.slug, label: `${c.name}, ${c.region}` }))}
            categories={categories.map((c) => ({ slug: c.slug, label: c.plural_name }))}
            city={city}
            category={category}
          />
        ) : null}
      </GuideHeader>

      <section className="container mx-auto px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <GuideGrid
            entries={shown}
            categoryOrder={allCategories.map((c) => c.id)}
            empty={
              published.length
                ? "Nothing in the guide matches that yet. Try another city or industry."
                : "The first entries are on their way."
            }
          />
          <p className="mt-16 max-w-2xl text-base font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">
            Some businesses in the guide are Queso Ventures clients, and every entry says so plainly.{" "}
            <Link
              href="/guide/standards"
              className="font-medium text-lightAccent underline underline-offset-4 dark:text-darkAccent"
            >
              How businesses are chosen
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
