import Link from "next/link";
import Header from "components/Header";
import Footer from "components/Footer";
import FreeAudit from "components/FreeAudit";
import FaqDeck from "components/FaqDeck";
import LightBar from "components/LightBar";
import NicheCtaButton from "components/NicheCtaButton";
import { SERVICE_AREAS } from "components/serviceAreas";

export interface GeoPageData {
  city: string;
  slug: string;
  headline: string;
  subline: string;
  prefill: string;
  painPoints: { heading: string; body: string }[];
  whatChanges: { title: string; body: string }[];
  faqItems: { q: string; a: string }[];
}

export default function GeoPageTemplate({ data }: { data: GeoPageData }) {
  const { city, slug, headline, subline, prefill, painPoints, whatChanges, faqItems } = data;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `https://www.quesoventures.com${slug}#service`,
        name: `Web Design & Local SEO, ${city}, TX`,
        provider: {
          "@type": "LocalBusiness",
          name: "Queso Ventures",
          url: "https://www.quesoventures.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Houston",
            addressRegion: "TX",
            addressCountry: "US",
          },
          priceRange: "$300 per month",
        },
        serviceType: [
          "Web Design",
          "Local SEO",
          "Google Business Profile Optimization",
          "AI Search Visibility",
        ],
        areaServed: { "@type": "City", name: city, addressRegion: "TX" },
        description: `Website design, local search, Google Business Profile work, and AI search visibility for businesses in ${city}, Texas.`,
        offers: {
          "@type": "Offer",
          name: "Free Local Visibility Audit",
          price: "0",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `https://www.quesoventures.com${slug}#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  const otherAreas = SERVICE_AREAS.filter((a) => a.slug !== slug);

  return (
    <div className="flex flex-col min-h-screen bg-lightBG dark:bg-darkBG">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest text-lightTextMuted dark:text-darkTextMuted mb-4">
              {city}, Texas
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-lightText dark:text-darkText mb-6 tracking-tight">
              {headline}
            </h1>
            <p className="max-w-3xl text-lg sm:text-xl md:text-2xl text-lightTextMuted dark:text-darkTextMuted font-light mb-10">
              {subline}
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <NicheCtaButton message={prefill} label="See What Your Website Could Look Like" />
              <p className="text-sm font-light text-lightTextMuted dark:text-darkTextMuted">
                Simple plans at $300 a month.
                <br className="hidden sm:block" /> Never the thousands agencies
                charge.
              </p>
            </div>
          </div>
        </section>

        <LightBar />

        {/* Pain points */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-lightText dark:text-darkText mb-10 max-w-4xl mx-auto">
            Sound familiar?
          </h2>
          <div className="max-w-4xl mx-auto divide-y divide-lightBorder dark:divide-darkBorder">
            {painPoints.map((item, i) => (
              <div key={i} className="py-6 first:pt-0">
                <p className="text-lg font-semibold text-lightText dark:text-darkText mb-2">
                  {item.heading}
                </p>
                <p className="text-base font-light text-lightTextMuted dark:text-darkTextMuted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* What changes */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-lightText dark:text-darkText mb-4 max-w-4xl mx-auto">
            Here&apos;s what changes
          </h2>
          <p className="text-lg text-lightTextMuted dark:text-darkTextMuted font-light mb-10 max-w-4xl mx-auto">
            We handle the online side so you can focus on the work.
          </p>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {whatChanges.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 rounded-3xl border border-lightBorder dark:border-darkBorder bg-white dark:bg-[#151618] p-6"
                >
                  <span className="text-lightAccent dark:text-darkAccent font-bold text-xl mt-0.5 shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-lg font-semibold text-lightText dark:text-darkText mb-1">
                      {item.title}
                    </p>
                    <p className="text-base font-light text-lightTextMuted dark:text-darkTextMuted">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FaqDeck
          heading={`Questions ${city} business owners ask`}
          items={faqItems.map((f) => ({ title: f.q, content: f.a }))}
        />

        <FreeAudit />

        {/* Other areas */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest text-lightTextMuted dark:text-darkTextMuted mb-3">
              Not in {city}?
            </p>
            <h2 className="text-2xl sm:text-3xl text-lightText dark:text-darkText mb-8">
              We work with businesses across Northeast Houston
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {otherAreas.map((area) => (
                <Link
                  key={area.slug}
                  href={area.slug}
                  className="group block rounded-3xl border border-lightBorder dark:border-darkBorder bg-white dark:bg-[#151618] p-8 transition-colors hover:border-lightButton dark:hover:border-darkButton"
                >
                  <p className="text-base font-semibold text-lightText dark:text-darkText mb-1 group-hover:text-lightButton dark:group-hover:text-darkButton transition-colors">
                    {area.city}
                  </p>
                  <p className="text-sm font-light text-lightTextMuted dark:text-darkTextMuted">
                    {area.tagline}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-lightButton dark:text-darkButton">
                    See how →
                  </p>
                </Link>
              ))}
              <Link
                href="/services"
                className="group block rounded-3xl border border-lightBorder dark:border-darkBorder bg-white dark:bg-[#151618] p-8 transition-colors hover:border-lightButton dark:hover:border-darkButton"
              >
                <p className="text-base font-semibold text-lightText dark:text-darkText mb-1 group-hover:text-lightButton dark:group-hover:text-darkButton transition-colors">
                  Greater Houston
                </p>
                <p className="text-sm font-light text-lightTextMuted dark:text-darkTextMuted">
                  Anywhere in the Houston area, I&apos;ll come to you.
                </p>
                <p className="mt-3 text-sm font-semibold text-lightButton dark:text-darkButton">
                  See services →
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
