import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { draftMode } from "next/headers";
import Breadcrumbs from "components/guide/Breadcrumbs";
import AtAGlance from "components/guide/AtAGlance";
import Markdown from "components/guide/Markdown";
import CtaLink from "components/guide/CtaLink";
import DraftBanner from "components/guide/DraftBanner";
import GuideGrid from "components/guide/GuideGrid";
import PageviewTracker from "components/guide/PageviewTracker";
import PageHero from "components/PageHero";
import SectionHeading from "components/SectionHeading";
import { liveryAt, houseGradient } from "components/livery";
import {
  getCategories,
  getEntry,
  getPublished,
  getRelated,
  redirectOrNotFound,
  SITE_URL,
  type GuideEntry,
} from "lib/guide/queries";
import { articleGraph, guideTrail, GUIDE_NAME, ldJson } from "lib/guide/jsonld";
import { guideImageUrl } from "lib/guide/supabase";
import { guideItemsHeading } from "lib/guide/types";
import { dayMonth } from "lib/guide/format";

export const revalidate = 86400;

type Params = { city: string; category: string; slug: string };

/** Where both membership links go. Chosen in planning: the form the whole site drives to. */
const CTA_HREF = "/contact";

export async function generateStaticParams(): Promise<Params[]> {
  const published = await getPublished();
  return published.map((e) => ({ city: e.city.slug, category: e.category.slug, slug: e.slug }));
}

function derivedMeta(entry: GuideEntry) {
  return {
    title: entry.seo_title || `${entry.business_name} in ${entry.area || entry.city.name} | ${GUIDE_NAME}`,
    description: entry.seo_description || entry.dek || `${entry.business_name}, in ${GUIDE_NAME}.`,
  };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const draft = draftMode().isEnabled;
  const entry = await getEntry(params.city, params.category, params.slug, draft);
  if (!entry) return {};
  const { title, description } = derivedMeta(entry);
  const url = `${SITE_URL}${entry.path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    // A draft must never be indexed, even if a preview link leaks.
    robots: entry.status === "published" ? undefined : { index: false, follow: false },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: "Queso Ventures",
      locale: "en_US",
      publishedTime: entry.published_at ?? undefined,
      modifiedTime: entry.updated_at,
      authors: [`${SITE_URL}/guide/editor`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${url}/opengraph-image`],
    },
  };
}

export default async function GuideArticle({ params }: { params: Params }) {
  const draft = draftMode().isEnabled;
  const entry = await getEntry(params.city, params.category, params.slug, draft);
  if (!entry) return redirectOrNotFound(`/guide/${params.city}/${params.category}/${params.slug}`);

  const [related, categories] = await Promise.all([getRelated(entry), getCategories()]);
  const meta = derivedMeta(entry);
  // The header photos in order. Rows from before 089 only have the single
  // cover columns, so fall back to those.
  const heroes = (entry.hero_images?.length
    ? entry.hero_images
    : entry.hero_image_path
      ? [{ path: entry.hero_image_path, alt: entry.hero_image_alt ?? "" }]
      : []
  )
    .map((h) => ({ src: guideImageUrl(h.path), alt: h.alt || entry.business_name }))
    .filter((h): h is { src: string; alt: string } => Boolean(h.src));
  // Updated, always, even on the day it was written. No Visited line: the
  // guide is a spotlight, not a review, and does not lead with a visit.
  const updated = dayMonth(entry.updated_at);
  const trail = guideTrail({
    city: entry.city,
    category: entry.category,
    business: { name: entry.business_name, path: entry.path },
  });

  const whatToGet = (entry.what_to_get ?? []).filter((w) => w.name);
  const goodToKnow = (entry.good_to_know ?? []).filter(Boolean);
  const faqs = (entry.faqs ?? []).filter((f) => f.question && f.answer);
  const gallery = (entry.gallery ?? []).filter((g) => g.path);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldJson(articleGraph(entry, meta)) }}
      />
      {draft ? <DraftBanner path={entry.path} status={entry.status} /> : <PageviewTracker articleId={entry.id} />}

      {/*
        The entry opens on its own photographs, full screen, the way every
        page on the site opens: the trade and the place over the breadcrumb,
        the headline, the house rule, the dek, then the byline. Several header
        photos crossfade slowly, with dots to pick one.
      */}
      <PageHero
        headline={entry.headline || entry.business_name}
        sub={entry.dek || undefined}
        slides={heroes.length ? heroes : undefined}
        above={
          <>
            <Breadcrumbs trail={trail} tone="dark" />
            <p className="mt-5 text-base font-medium text-white/90">
              {entry.category.name} in {entry.area || entry.city.name}
            </p>
          </>
        }
      >
        <p className="flex flex-wrap gap-x-5 gap-y-1 text-base font-light text-white/70">
          <span>
            By{" "}
            <Link
              href="/guide/editor"
              rel="author"
              className="text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
            >
              {entry.author_name}
            </Link>
          </span>
          {updated ? <span>Updated {updated}</span> : null}
        </p>
      </PageHero>

      <article className="container mx-auto px-4 pb-24 pt-20 sm:pt-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">

            {/* Under the header on a phone, a sticky sidebar from lg up. */}
            <aside className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <div className="lg:sticky lg:top-24">
                <AtAGlance entry={entry} />
              </div>
            </aside>

            <div className="min-w-0 lg:col-start-1">
              {entry.story ? (
                <Section title="The Story">
                  <div className="text-lg font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted sm:text-xl">
                    <Markdown source={entry.story} />
                  </div>
                </Section>
              ) : null}

              {entry.owner_quote ? (
                <figure className="mt-20">
                  <span aria-hidden className="mb-8 block h-1 w-24 rounded-full" style={{ backgroundImage: houseGradient() }} />
                  <blockquote className="text-3xl font-light leading-snug tracking-tight text-balance text-lightText dark:text-darkText sm:text-4xl">
                    <p>&ldquo;{entry.owner_quote}&rdquo;</p>
                  </blockquote>
                  {entry.owner_quote_attribution ? (
                    <figcaption className="mt-4 text-base text-lightTextMuted dark:text-darkTextMuted">
                      {entry.owner_quote_attribution}
                    </figcaption>
                  ) : null}
                </figure>
              ) : null}

              {whatToGet.length ? (
                <Section title={guideItemsHeading(entry, entry.category)}>
                  <ul className="grid border-b border-lightText/15 dark:border-darkText/15 sm:grid-cols-2 sm:gap-x-10">
                    {whatToGet.map((item, i) => (
                      <li
                        key={i}
                        className={`flex gap-5 border-t border-lightText/15 py-6 dark:border-darkText/15 ${
                          // An odd count leaves the last one alone in its row,
                          // so it takes the whole row instead.
                          lastOfOdd(i, whatToGet.length) ? "sm:col-span-2" : ""
                        }`}
                      >
                        <span aria-hidden className="mt-[0.9rem] h-[2px] w-6 shrink-0 rounded-full" style={{ background: liveryAt(i).hex }} />
                        <div>
                          <p className="text-xl font-light tracking-tight text-lightText dark:text-darkText">{item.name}</p>
                          {item.description ? (
                            <p className="mt-1.5 text-base font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">
                              {item.description}
                            </p>
                          ) : null}
                        </div>
                      </li>
                    ))}
                  </ul>
                </Section>
              ) : null}

              {goodToKnow.length ? (
                <Section title="Good to Know">
                  <ul className="space-y-3 text-lg font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">
                    {goodToKnow.map((line, i) => (
                      <li key={i} className="flex gap-3">
                        <span aria-hidden className="mt-[0.85rem] h-[2px] w-4 shrink-0 rounded-full bg-lightAccent dark:bg-darkAccent" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </Section>
              ) : null}

              {entry.who_its_for ? (
                <Section title="Who It's For">
                  <p className="text-lg font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted sm:text-xl">
                    {entry.who_its_for}
                  </p>
                </Section>
              ) : null}

              {faqs.length ? (
                <Section title="Questions">
                  <div className="divide-y divide-lightText/15 border-y border-lightText/15 dark:divide-darkText/15 dark:border-darkText/15">
                    {faqs.map((f, i) => (
                      <details key={i} className="group py-6" open={i === 0}>
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-xl font-light tracking-tight text-lightText dark:text-darkText [&::-webkit-details-marker]:hidden">
                          <span>{f.question}</span>
                          <span aria-hidden className="mt-0.5 text-2xl leading-none transition-transform group-open:rotate-45">
                            +
                          </span>
                        </summary>
                        <p className="mt-3 text-base font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">
                          {f.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </Section>
              ) : null}

              {gallery.length ? (
                <Section title="Gallery">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {gallery.map((g, i) => {
                      const src = guideImageUrl(g.path);
                      if (!src) return null;
                      return (
                        <figure key={i} className={lastOfOdd(i, gallery.length) ? "sm:col-span-2" : ""}>
                          <div
                            className={`relative overflow-hidden rounded-2xl bg-bandLight dark:bg-bandDark ${
                              lastOfOdd(i, gallery.length) ? "aspect-[4/3] sm:aspect-[16/7]" : "aspect-[4/3]"
                            }`}
                          >
                            <Image
                              src={src}
                              alt={g.alt || ""}
                              fill
                              sizes={lastOfOdd(i, gallery.length) ? "(min-width: 640px) 720px, 100vw" : "(min-width: 640px) 360px, 100vw"}
                              className="object-cover"
                            />
                          </div>
                          {g.caption ? (
                            <figcaption className="mt-2 text-sm text-lightTextMuted dark:text-darkTextMuted">{g.caption}</figcaption>
                          ) : null}
                        </figure>
                      );
                    })}
                  </div>
                </Section>
              ) : null}

              <MembershipNote entry={entry} />
            </div>
          </div>
        </div>
      </article>

      {related.length ? (
        <section className="border-t border-lightBorder bg-bandLight dark:border-darkBorder dark:bg-bandDark">
          <div className="container mx-auto px-4 py-24 sm:py-32">
            <div className="mx-auto max-w-6xl">
              <SectionHeading className="mb-12">More from {GUIDE_NAME}</SectionHeading>
              <GuideGrid entries={related} categoryOrder={categories.map((c) => c.id)} />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

/** The last item of an odd-length list, in a two column grid. */
function lastOfOdd(i: number, length: number) {
  return length % 2 === 1 && i === length - 1;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-20 first:mt-0">
      <h2 className="mb-8 text-3xl font-light tracking-tight text-lightText dark:text-darkText sm:text-4xl">
        {title}
      </h2>
      {children}
    </section>
  );
}

/** The disclosure. Wording is fixed; only the business name changes. */
function MembershipNote({ entry }: { entry: GuideEntry }) {
  return (
    <aside className="mt-16 rounded-3xl bg-inkLight p-7 text-lg font-light leading-relaxed text-white/80 sm:p-9">
      {entry.membership === "member" ? (
        <p>
          {entry.business_name} is a loud and proud member of the Queso Network (that means they are a client).{" "}
          <CtaLink articleId={entry.id} href={CTA_HREF}>
            See how you could become one too.
          </CtaLink>
        </p>
      ) : (
        <p>
          {entry.business_name} is on The Queso Guide but is not a Queso Member yet.{" "}
          <CtaLink articleId={entry.id} href={CTA_HREF}>
            Want to join?
          </CtaLink>
        </p>
      )}
      <p className="mt-4 text-base text-white/60">
        <Link href="/guide/standards" className="underline underline-offset-4 hover:text-white">
          How businesses are chosen for the guide
        </Link>
      </p>
    </aside>
  );
}
