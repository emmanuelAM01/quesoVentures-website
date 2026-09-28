import Footer from "components/Footer";
import FreeAudit from "components/FreeAudit";
import FaqDeck from "components/FaqDeck";
import PageHero from "components/PageHero";
import StatementSection from "components/StatementSection";
import PainDeck from "components/PainDeck";
import ChangeList from "components/ChangeList";
import IndustryLinks from "components/IndustryLinks";
import PlaceLinks from "components/PlaceLinks";
import { HOUSTON } from "content/houston";
import { MONTHLY_PLAN_OFFER } from "components/pricingCopy";
import {
  BUSINESS,
  LOCAL_BUSINESS_SCHEMA,
  AREA_SERVED_SCHEMA,
  breadcrumbSchema,
} from "components/businessInfo";

export interface IndustryPageData {
  /** Plain name of the trade, used in headings and schema. */
  industry: string;
  slug: string;
  /** One line. Long framing goes in `intro`. */
  headline: string;
  intro: string;
  prefill: string;
  serviceName: string;
  painPoints: { heading: string; body: string }[];
  whatChanges: { title: string; body: string }[];
  faqItems: { q: string; a: string }[];
  heroImage?: { src: string; alt: string };
}

export default function IndustryPageTemplate({
  data,
}: {
  data: IndustryPageData;
}) {
  const {
    industry,
    slug,
    headline,
    intro,
    prefill,
    serviceName,
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
        name: serviceName,
        provider: { "@id": `${BUSINESS.url}/#localbusiness` },
        serviceType: [
          "Web Design",
          "Local SEO",
          "Google Business Profile Optimization",
        ],
        areaServed: AREA_SERVED_SCHEMA,
        audience: { "@type": "Audience", audienceType: industry },
        description: intro,
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
      breadcrumbSchema([{ name: industry, path: slug }]),
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
          sub={`Websites, SEO, and AI-SEO for Houston area ${industry.toLowerCase()}, built by a software engineer.`}
          prefill={prefill}
          image={heroImage}
        />

        <StatementSection text={intro} />

        <PainDeck items={painPoints} />

        <ChangeList items={whatChanges} />

        <FaqDeck
          heading={`Questions ${industry.toLowerCase()} ask`}
          items={faqItems.map((f) => ({ title: f.q, content: f.a }))}
        />

        <FreeAudit />
        {/* Metro level, and it links down to the towns. A trade page per town
            would be thirty pages differing by two nouns. */}
        <PlaceLinks current={slug} scope={HOUSTON} />
        <IndustryLinks current={slug} />
      </main>
      <Footer />
    </div>
  );
}
