import Header from "components/Header";
import Footer from "components/Footer";
import FreeAudit from "components/FreeAudit";
import FaqDeck from "components/FaqDeck";
import PageHero from "components/PageHero";
import WhyRemote from "components/WhyRemote";
import LiveryCard from "components/LiveryCard";
import StatementCopy from "components/StatementCopy";
import Glow from "components/Glow";
import { liveryAt, PAINT } from "components/livery";
import { siteCopy } from "components/siteCopy";
import { MONTHLY_PLAN_OFFER } from "components/pricingCopy";
import {
  BUSINESS,
  LOCAL_BUSINESS_SCHEMA,
  breadcrumbSchema,
} from "components/businessInfo";
import type { CityPageData } from "components/cityPageData";

/**
 * Renders a city page at whichever depth its data carries.
 *
 * With an `seo` block it is the full page: pain points, what changes, FAQ, and
 * the schema graph that goes with a page meant to rank. Without one it stops
 * after the intro and the conversion path, which is all a business card landing
 * needs. See components/cityPageData.ts for why the split exists.
 *
 * This is additive. GeoPageTemplate still drives every existing page and is
 * untouched.
 */
export default function CityPageTemplate({ data }: { data: CityPageData }) {
  const {
    city,
    slug,
    headline,
    intro,
    prefill,
    proof,
    heroImage,
    seo,
  } = data;

  const region = data.region ?? BUSINESS.region;
  const isLocal = proof === "local";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      LOCAL_BUSINESS_SCHEMA,
      /**
       * The Service and FAQPage nodes only make sense on a page that is trying
       * to rank. A card landing keeps the LocalBusiness node so an AI assistant
       * fetching the page still resolves the right company, and nothing else.
       */
      ...(seo
        ? [
            {
              "@type": "Service",
              "@id": `${BUSINESS.url}${slug}#service`,
              name: `Web Design & SEO, ${city}, ${region}`,
              provider: { "@id": `${BUSINESS.url}/#localbusiness` },
              serviceType: [
                "Web Design",
                "Local SEO",
                "Google Business Profile Optimization",
              ],
              areaServed: {
                "@type": "City",
                name: city,
                addressRegion: region,
                ...(seo.postalCode ? { postalCode: seo.postalCode } : {}),
              },
              description: `Website design, SEO, and Google Business Profile work for businesses in ${city}, ${region}.`,
              // The plan price as a fact, so an assistant can answer "what do
              // they charge" without the page saying it in prose again.
              offers: [
                MONTHLY_PLAN_OFFER,
                {
                  "@type": "Offer",
                  name: "Free Visibility Audit",
                  price: "0",
                  priceCurrency: "USD",
                },
              ],
            },
            {
              "@type": "FAQPage",
              "@id": `${BUSINESS.url}${slug}#faq`,
              mainEntity: seo.faqItems.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            },
          ]
        : []),
      breadcrumbSchema([{ name: city, path: slug }]),
    ],
  };


  return (
    <div className="flex flex-col min-h-screen bg-lightBG dark:bg-darkBG">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <PageHero
          headline={headline}
          sub={siteCopy({ city }).hero.sub}
          prefill={prefill}
          image={heroImage}
        />

        {/* Full-contrast statement. On a card landing this is the whole pitch. */}
        <section data-dark-section className="bg-inkLight">
          <div className="container mx-auto px-4 py-28">
            <StatementCopy
              text={intro}
              tone="dark"
              paint={PAINT.gialloOrion}
              className="max-w-4xl mx-auto"
            />
            {seo?.postalCode && (
              <p className="max-w-4xl mx-auto mt-8 text-lg text-[#B7C0C8]">
                {city}, {region} {seo.postalCode}
              </p>
            )}
          </div>
        </section>

        {seo && (
          <section className="container mx-auto px-4 py-24">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-lightText dark:text-darkText mb-12">
                Sound familiar?
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {seo.painPoints.map((item, i) => (
                  <LiveryCard
                    key={i}
                    title={item.heading}
                    body={item.body}
                    paint={liveryAt(i)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {seo && (
          <section className="bg-bandLight dark:bg-bandDark border-y border-lightBorder dark:border-darkBorder">
            <div className="container mx-auto px-4 py-24">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl sm:text-4xl md:text-5xl text-lightText dark:text-darkText mb-12">
                  Here&apos;s what changes
                </h2>
                <div className="space-y-5">
                  {seo.whatChanges.map((item, i) => (
                    <Glow
                      key={i}
                      color={liveryAt(i + 2).hex}
                      radius="rounded-3xl"
                      lift={false}
                      spread={340}
                    >
                      <div className="relative flex gap-5 rounded-3xl border border-lightBorder dark:border-darkBorder bg-lightBG dark:bg-darkBG p-8">
                        <span
                          className="font-bold text-2xl mt-0.5 shrink-0"
                          style={{ color: liveryAt(i + 2).ink }}
                        >
                          {i + 1}
                        </span>
                        <div>
                          <p className="text-xl sm:text-2xl font-semibold text-lightText dark:text-darkText mb-2">
                            {item.title}
                          </p>
                          <p className="text-lg font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">
                            {item.body}
                          </p>
                        </div>
                      </div>
                    </Glow>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {seo && (
          <FaqDeck
            heading={`Questions ${city} business owners ask`}
            items={seo.faqItems.map((f) => ({ title: f.q, content: f.a }))}
          />
        )}

        {!isLocal && <WhyRemote city={city} />}

        <FreeAudit copy={siteCopy({ city }).audit} />

      </main>
      <Footer />
    </div>
  );
}
