import type { Metadata } from "next";
import GuideHeader from "components/guide/GuideHeader";
import GuideGrid from "components/guide/GuideGrid";
import Chips from "components/guide/Chips";
import { getCategories, getCities, getPublished, redirectOrNotFound, SITE_URL } from "lib/guide/queries";
import { collectionGraph, guideTrail, GUIDE_NAME, ldJson } from "lib/guide/jsonld";

export const revalidate = 86400;

type Params = { city: string };

export async function generateStaticParams(): Promise<Params[]> {
  const published = await getPublished();
  return Array.from(new Set(published.map((e) => e.city.slug))).map((city) => ({ city }));
}

async function load(slug: string) {
  const [cities, categories, published] = await Promise.all([getCities(), getCategories(), getPublished()]);
  const city = cities.find((c) => c.slug === slug);
  if (!city) return null;
  const entries = published.filter((e) => e.city.id === city.id);
  if (!entries.length) return null;
  const present = new Set(entries.map((e) => e.category.id));
  return { city, entries, categories, activeCategories: categories.filter((c) => present.has(c.id)) };
}

function copy(name: string, region: string) {
  return {
    title: `${GUIDE_NAME}: ${name}, ${region}`,
    description: `Local businesses in and around ${name}, ${region} that I have been to for The Queso Guide.`,
    intro: `Local spots in and around ${name} that I have actually been to.`,
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
    openGraph: { title, description, url, siteName: "Queso Ventures", type: "website", locale: "en_US" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CityHub({ params }: { params: Params }) {
  const data = await load(params.city);
  if (!data) return redirectOrNotFound(`/guide/${params.city}`);
  const { city, entries, categories, activeCategories } = data;
  const { title, description, intro } = copy(city.name, city.region);
  const trail = guideTrail({ city });

  const jsonLd = collectionGraph({ path: `/guide/${city.slug}`, name: title, description, entries, trail });

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
        <div className="mx-auto max-w-6xl">
          <GuideGrid entries={entries} categoryOrder={categories.map((c) => c.id)} />
        </div>
      </section>
    </>
  );
}
