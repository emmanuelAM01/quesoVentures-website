import type { Metadata } from "next";
import GuideHeader from "components/guide/GuideHeader";
import GuideGrid from "components/guide/GuideGrid";
import Chips from "components/guide/Chips";
import { getCategories, getCities, getPublished, redirectOrNotFound, SITE_URL } from "lib/guide/queries";
import { collectionGraph, guideTrail, GUIDE_NAME, ldJson } from "lib/guide/jsonld";

export const revalidate = 86400;

type Params = { city: string };

/**
 * Below this many entries a town's page is a thin page, and Google is told
 * not to index it until it fills in. It still renders, and the entry still
 * links to it, so nothing is a dead end.
 */
const MIN_INDEXED_ENTRIES = 2;

export async function generateStaticParams(): Promise<Params[]> {
  const [published, cities] = await Promise.all([getPublished(), getCities()]);
  const ids = new Set(published.flatMap((e) => [e.city.id, ...(e.serves_city_ids ?? [])]));
  return cities.filter((c) => ids.has(c.id)).map((c) => ({ city: c.slug }));
}

async function load(slug: string) {
  const [cities, categories, published] = await Promise.all([getCities(), getCategories(), getPublished()]);
  const city = cities.find((c) => c.slug === slug);
  if (!city) return null;
  // The businesses in this town, then the ones elsewhere whose customers come
  // from here (migration 110). One article each, listed on every town it serves.
  const entries = published.filter((e) => e.city.id === city.id);
  const serving = published.filter((e) => e.city.id !== city.id && (e.serves_city_ids ?? []).includes(city.id));
  if (!entries.length && !serving.length) return null;
  // Category pages are /guide/<town>/<category> and list the town's own
  // businesses, so only those categories get a chip.
  const present = new Set(entries.map((e) => e.category.id));
  return {
    city,
    entries,
    serving,
    categories,
    activeCategories: categories.filter((c) => present.has(c.id)),
    thin: entries.length + serving.length < MIN_INDEXED_ENTRIES,
  };
}

function copy(name: string, region: string) {
  return {
    title: `${GUIDE_NAME}: ${name}, ${region}`,
    description: `Local businesses in and around ${name}, ${region} worth knowing about, in The Queso Guide.`,
    intro: `Local spots in and around ${name} worth knowing about.`,
  };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const data = await load(params.city);
  if (!data) return {};
  const { title, description } = copy(data.city.name, data.city.region);
  const url = `${SITE_URL}/guide/${data.city.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: data.thin ? { index: false, follow: true } : undefined,
    openGraph: { title, description, url, siteName: "Queso Ventures", type: "website", locale: "en_US" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CityHub({ params }: { params: Params }) {
  const data = await load(params.city);
  if (!data) return redirectOrNotFound(`/guide/${params.city}`);
  const { city, entries, serving, categories, activeCategories } = data;
  const { title, description, intro } = copy(city.name, city.region);
  const trail = guideTrail({ city });

  const jsonLd = collectionGraph({ path: `/guide/${city.slug}`, name: title, description, entries: [...entries, ...serving], trail });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }} />
      <GuideHeader title={`${city.name}, ${city.region}`} intro={intro} trail={trail}>
        <Chips
          items={activeCategories.map((c) => ({
            href: `/guide/${city.slug}/${c.slug}`,
            label: c.plural_name,
          }))}
        />
      </GuideHeader>
      <section className="container mx-auto px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl space-y-16">
          {entries.length > 0 && <GuideGrid entries={entries} categoryOrder={categories.map((c) => c.id)} />}
          {serving.length > 0 && (
            <div>
              <h2 className="text-3xl font-light tracking-tight text-lightText dark:text-darkText">
                Also serving {city.name}
              </h2>
              <p className="mt-2 text-lg font-light text-lightTextMuted dark:text-darkTextMuted">
                Nearby, with customers who come in from {city.name}.
              </p>
              <div className="mt-8">
                <GuideGrid entries={serving} categoryOrder={categories.map((c) => c.id)} />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
