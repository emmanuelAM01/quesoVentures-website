import type { Metadata } from "next";
import GuideHeader from "components/guide/GuideHeader";
import GuideGrid from "components/guide/GuideGrid";
import Chips from "components/guide/Chips";
import { getCategories, getCities, getPublished, redirectOrNotFound, SITE_URL } from "lib/guide/queries";
import { collectionGraph, guideTrail, GUIDE_NAME, ldJson } from "lib/guide/jsonld";

export const revalidate = 86400;

type Params = { city: string; category: string };

export async function generateStaticParams(): Promise<Params[]> {
  const published = await getPublished();
  const seen = new Map<string, Params>();
  for (const e of published) {
    seen.set(`${e.city.slug}/${e.category.slug}`, { city: e.city.slug, category: e.category.slug });
  }
  return Array.from(seen.values());
}

async function load(p: Params) {
  const [cities, categories, published] = await Promise.all([getCities(), getCategories(), getPublished()]);
  const city = cities.find((c) => c.slug === p.city);
  const category = categories.find((c) => c.slug === p.category);
  if (!city || !category) return null;
  const inCity = published.filter((e) => e.city.id === city.id);
  // Newest first, as published. A neutral collection, never a ranking.
  const entries = inCity.filter((e) => e.category.id === category.id);
  if (!entries.length) return null;
  const present = new Set(inCity.map((e) => e.category.id));
  return { city, category, entries, categories, siblings: categories.filter((c) => present.has(c.id)) };
}

function copy(plural: string, city: string, region: string) {
  const title = `${plural} in ${city}`;
  return {
    title,
    metaTitle: `${title}, ${region} | ${GUIDE_NAME}`,
    description: `${plural} around ${city}, ${region} worth knowing about. Who runs them, what they are known for, and what to know before you go.`,
  };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const data = await load(params);
  if (!data) return {};
  const { metaTitle, description } = copy(data.category.plural_name, data.city.name, data.city.region);
  const url = `${SITE_URL}/guide/${data.city.slug}/${data.category.slug}`;
  return {
    title: metaTitle,
    description,
    alternates: { canonical: url },
    openGraph: { title: metaTitle, description, url, siteName: "Queso Ventures", type: "website", locale: "en_US" },
    twitter: { card: "summary_large_image", title: metaTitle, description },
  };
}

export default async function CategoryHub({ params }: { params: Params }) {
  const data = await load(params);
  if (!data) return redirectOrNotFound(`/guide/${params.city}/${params.category}`);
  const { city, category, entries, categories, siblings } = data;
  const { title, description } = copy(category.plural_name, city.name, city.region);
  const path = `/guide/${city.slug}/${category.slug}`;
  const trail = guideTrail({ city, category });

  const jsonLd = collectionGraph({ path, name: title, description, entries, trail });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }} />
      <GuideHeader title={title} intro={description} trail={trail}>
        {siblings.length > 1 ? (
          <Chips
            items={siblings.map((c) => ({
              href: `/guide/${city.slug}/${c.slug}`,
              label: c.plural_name,
              current: c.id === category.id,
            }))}
          />
        ) : null}
      </GuideHeader>
      <section className="container mx-auto px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <GuideGrid entries={entries} categoryOrder={categories.map((c) => c.id)} />
        </div>
      </section>
    </>
  );
}
