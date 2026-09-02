import Footer from "components/Footer";
import FreeAudit from "components/FreeAudit";
import FaqDeck from "components/FaqDeck";
import PageHero from "components/PageHero";
import IndustryLinks from "components/IndustryLinks";
import PlaceLinks from "components/PlaceLinks";
import { HOUSTON } from "content/houston";
import LiveryCard from "components/LiveryCard";
import StatementCopy from "components/StatementCopy";
import Glow from "components/Glow";
import { liveryAt, PAINT } from "components/livery";
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

        {/* Full-contrast statement, so section two reads as a design moment
            rather than the opening paragraph of an article. */}
        <section data-dark-section className="bg-inkLight">
          <div className="container mx-auto px-4 py-28">
            <StatementCopy
              text={intro}
              tone="dark"
              paint={PAINT.gialloOrion}
              className="max-w-4xl mx-auto"
            />
          </div>
        </section>

        <section className="container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-lightText dark:text-darkText mb-12">
              Sound familiar?
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {painPoints.map((item, i) => (
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

        <section className="bg-bandLight dark:bg-bandDark border-y border-lightBorder dark:border-darkBorder">
          <div className="container mx-auto px-4 py-24">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-lightText dark:text-darkText mb-12">
                Here&apos;s what changes
              </h2>
              <div className="space-y-5">
                {whatChanges.map((item, i) => (
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
