import Footer from "components/Footer";
import FreeAudit from "components/FreeAudit";
import FaqDeck from "components/FaqDeck";
import PageHero from "components/PageHero";
import StatementSection from "components/StatementSection";
import PainDeck from "components/PainDeck";
import ChangeList from "components/ChangeList";
import WhyRemote from "components/WhyRemote";
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
      <main>
        <PageHero
          headline={headline}
          sub={siteCopy({ city }).hero.sub}
          prefill={prefill}
          image={heroImage}
        />

        <StatementSection text={intro}>
          {seo?.postalCode && (
            <p className="mt-8 text-lg font-light text-lightTextMuted dark:text-darkTextMuted">
              {city}, {region} {seo.postalCode}
            </p>
          )}
        </StatementSection>

        {seo && <PainDeck items={seo.painPoints} />}

        {seo && <ChangeList items={seo.whatChanges} />}


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
