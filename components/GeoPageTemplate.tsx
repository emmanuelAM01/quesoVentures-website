import Footer from "components/Footer";
import FreeAudit from "components/FreeAudit";
import FaqDeck from "components/FaqDeck";
import PageHero from "components/PageHero";
import StatementSection from "components/StatementSection";
import PainDeck from "components/PainDeck";
import ChangeList from "components/ChangeList";
import { siteCopy } from "components/siteCopy";
import PlaceLinks from "components/PlaceLinks";
import { placeTrail } from "components/places";
import { MONTHLY_PLAN_OFFER } from "components/pricingCopy";
import {
  BUSINESS,
  LOCAL_BUSINESS_SCHEMA,
  breadcrumbSchema,
} from "components/businessInfo";

export interface GeoPageData {
  city: string;
  slug: string;
  postalCode?: string;
  /** Keep under ~34 characters. It has to hold one line. */
  headline: string;
  /** Opens section two. Where the local detail lives. */
  intro: string;
  prefill: string;
  painPoints: { heading: string; body: string }[];
  whatChanges: { title: string; body: string }[];
  faqItems: { q: string; a: string }[];
  heroImage?: { src: string; alt: string };
}

export default function GeoPageTemplate({ data }: { data: GeoPageData }) {
  const {
    city,
    slug,
    postalCode,
    headline,
    intro,
    prefill,
    painPoints,
    whatChanges,
    faqItems,
    heroImage,
  } = data;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      LOCAL_BUSINESS_SCHEMA,
      {
        "@type": "Service",
        "@id": `${BUSINESS.url}${slug}#service`,
        name: `Websites, SEO & AI-SEO, ${city}, TX`,
        provider: { "@id": `${BUSINESS.url}/#localbusiness` },
        serviceType: [
          "Web Design",
          "Local SEO",
          "Google Business Profile Optimization",
        ],
        areaServed: {
          "@type": "City",
          name: city,
          addressRegion: BUSINESS.region,
          ...(postalCode ? { postalCode } : {}),
        },
        description: `Website design, local search, and Google Business Profile work for businesses in ${city}, Texas.`,
        // The plan price as a fact, so an assistant can answer "what do they
        // charge" without the page having to say it in prose again.
        offers: [
          MONTHLY_PLAN_OFFER,
          {
            "@type": "Offer",
            name: "Free Local Visibility Audit",
            price: "0",
            priceCurrency: "USD",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${BUSINESS.url}${slug}#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      breadcrumbSchema(placeTrail(slug)),
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

        <StatementSection text={intro} />

        <PainDeck items={painPoints} />

        <ChangeList items={whatChanges} />

        <FaqDeck
          heading={`Questions ${city} business owners ask`}
          items={faqItems.map((f) => ({ title: f.q, content: f.a }))}
        />

        {/* Objection, then close, then navigation. The page used to end on a
            grid of links to other towns, which is a strange note to finish on
            right after the call to action. */}
        <FreeAudit copy={siteCopy({ city }).audit} />
        <PlaceLinks current={slug} />

      </main>
      <Footer />
    </div>
  );
}
