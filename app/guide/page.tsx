import type { Metadata } from "next";
import GuideHeader from "components/guide/GuideHeader";
import FeaturedEntry from "components/guide/FeaturedEntry";
import FreeAudit from "components/FreeAudit";
import Link from "next/link";
import ArrowMark, { arrowTone } from "components/ArrowMark";
import ChangeList from "components/ChangeList";
import SectionHeading from "components/SectionHeading";
import StatementSection from "components/StatementSection";
import { liveryAt } from "components/livery";
import GuideFilters from "components/guide/GuideFilters";
import GuideGrid from "components/guide/GuideGrid";
import { getActiveFacets, getCategories, SITE_URL } from "lib/guide/queries";
import { collectionGraph, guideTrail, GUIDE_NAME, ldJson } from "lib/guide/jsonld";

const TITLE = `${GUIDE_NAME} | Local businesses worth knowing`;
const DESCRIPTION =
  "Local businesses I have actually been to. Who runs them, what to get, and what to know before you go.";
const INTRO = "Local spots worth knowing. I go, I try it, then I write it up.";

const STATEMENT =
  "Every entry starts with me walking through the door. Who runs the place, what to order, and what I wish I knew before I went. The basics sit in one box at the top, and the bottom tells you if the business is a Queso Ventures client.";

const PRINCIPLES = [
  {
    title: "I actually went",
    body: "Every entry is written after a visit. The month I went is right at the top.",
  },
  {
    title: "No rankings",
    body: "No top 10 lists and no stars. Entries show up in the order I publish them.",
  },
  {
    title: "Clients are labeled",
    body: "Some of these businesses are Queso Ventures clients. The bottom of every entry tells you which.",
  },
];

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
  const categoryOrder = allCategories.map((c) => c.id);
  const newest = published[0];
  const filtered = Boolean(city || category);
  const cityName = cities.find((c) => c.slug === city)?.name;
  const categoryName = categories.find((c) => c.slug === category)?.plural_name;
  const gridTitle = filtered
    ? [categoryName ?? "Everything", cityName ? `in ${cityName}` : ""].filter(Boolean).join(" ")
    : "The latest entries";

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

      <GuideHeader
        title={GUIDE_NAME}
        intro={INTRO}
        tall
        aside={
          newest ? (
            <FeaturedEntry
              entry={newest}
              paint={liveryAt(Math.max(0, categoryOrder.indexOf(newest.category.id)))}
            />
          ) : undefined
        }
      >
        {published.length ? (
          <>
            <GuideFilters
              key={`${city ?? ""}|${category ?? ""}`}
              cities={cities.map((c) => ({ slug: c.slug, label: `${c.name}, ${c.region}` }))}
              categories={categories.map((c) => ({ slug: c.slug, label: c.plural_name }))}
              city={city}
              category={category}
            />
            <p className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-base text-white/65">
              <span>
                <span className="font-semibold text-white">{published.length}</span>{" "}
                {published.length === 1 ? "entry" : "entries"}
              </span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-white/40" />
              <span>
                <span className="font-semibold text-white">{cities.length}</span>{" "}
                {cities.length === 1 ? "city" : "cities"}
              </span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-white/40" />
              <span>I have been to every one</span>
            </p>
          </>
        ) : null}
      </GuideHeader>

      <section id="entries" className="container mx-auto scroll-mt-24 px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading>{gridTitle}</SectionHeading>
            {filtered ? (
              <a href="/guide" className={arrowTone("light")}>
                <ArrowMark label="Show everything" size="sm" />
              </a>
            ) : null}
          </div>
          <GuideGrid
            entries={shown}
            categoryOrder={categoryOrder}
            empty={
              published.length
                ? "Nothing here for that one yet. Try another city or industry."
                : "The first entries are on the way."
            }
          />
        </div>
      </section>

      <div id="about-the-guide">
        <StatementSection text={STATEMENT} />
      </div>

      <div id="how" className="scroll-mt-20">
        <ChangeList heading="How the guide works" items={PRINCIPLES}>
          <Link href="/guide/standards" className={`${arrowTone("light")} mt-10`}>
            <ArrowMark label="The standards" />
          </Link>
        </ChangeList>
      </div>

      <FreeAudit />
    </>
  );
}
