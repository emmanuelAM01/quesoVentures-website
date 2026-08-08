import type { Metadata } from "next";
import Header from "components/Header";
import Footer from "components/Footer";
import FreeAudit from "components/FreeAudit";
import Reveal from "components/Reveal";
import PageHero from "components/PageHero";
import IndustryLinks from "components/IndustryLinks";
import { liveryAt, PAINT } from "components/livery";
import Glow from "components/Glow";
import {
  BUSINESS,
  LOCAL_BUSINESS_SCHEMA,
  AREA_SERVED_SCHEMA,
  breadcrumbSchema,
} from "components/businessInfo";
import {
  FaGlobe,
  FaMapMarkerAlt,
  FaChartLine,
  FaMobileAlt,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Website Design, Local SEO & Google Business Profile Services",
  description:
    "Website design, local SEO, and Google Business Profile work for local businesses. Simple plans at $300 a month, not agency prices. Free audit first.",
  alternates: { canonical: "https://www.quesoventures.com/services" },
  openGraph: {
    title: "Website Design, Local SEO & Google Business Profile Services",
    description:
      "Website design, local SEO, and Google Business Profile work for local businesses. Simple plans at $300 a month, not agency prices. Free audit first.",
    url: "https://www.quesoventures.com/services",
    siteName: "Queso Ventures",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Queso Ventures" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Design, Local SEO & Google Business Profile Services",
    description:
      "Website design, local SEO, and Google Business Profile work for local businesses. Simple plans at $300 a month, not agency prices. Free audit first.",
    images: ["/logo.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    LOCAL_BUSINESS_SCHEMA,
    {
      "@type": "Service",
      "@id": `${BUSINESS.url}/services#service`,
      name: "Web Design & Local SEO, Northeast Houston TX",
      provider: { "@id": `${BUSINESS.url}/#localbusiness` },
      serviceType: [
        "Web Design",
        "Local SEO",
        "Google Business Profile Optimization",
        "Lead Generation",
      ],
      areaServed: AREA_SERVED_SCHEMA,
      description:
        "Website design, local SEO, and Google Business Profile work for service businesses in Atascocita, Humble, Kingwood, and the rest of Northeast Houston.",
      offers: {
        "@type": "Offer",
        name: "Free Visibility Audit",
        price: "0",
        priceCurrency: "USD",
      },
    },
    breadcrumbSchema([{ name: "Services", path: "/services" }]),
  ],
};

const services = [
  {
    icon: FaMobileAlt,
    heading: "You need a website",
    body: "We build it around what your customers are already searching for. Fast on mobile, easy to find, and clear enough that visitors actually call.",
  },
  {
    icon: FaChartLine,
    heading: "You need to show up on Google",
    body: "When someone searches for your service in Houston, your name should be there. We build the pages and content that earn those rankings.",
  },
  {
    icon: FaMapMarkerAlt,
    heading: "You need to own your Google Maps listing",
    body: "Most customers pick from the first three businesses that show up on Maps. We get you into that group and keep you there.",
  },
  {
    icon: FaGlobe,
    heading: "You need customers to find you on AI search too",
    body: "When someone asks Siri or ChatGPT who to call, we make sure your business is the answer they get.",
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-lightBG dark:bg-darkBG">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <PageHero
          headline="From invisible to obvious."
          prefill="I want to see what my website could look like. Here's my current situation:"
        />

        {/* Services */}
        <section className="bg-panelLight dark:bg-panelDark border-y border-lightBorder dark:border-darkBorder">
          <div className="container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-6">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <Reveal key={i} delay={(i % 2) * 120}>
                  <Glow color={liveryAt(i).hex} radius="rounded-3xl" lift={false}>
                  <div className="relative h-full overflow-hidden rounded-3xl border border-lightBorder dark:border-darkBorder bg-lightBG dark:bg-darkBG p-8 pt-10">
                    <span
                      className="absolute inset-x-0 top-0 h-1.5"
                      style={{ backgroundColor: liveryAt(i).hex }}
                    />
                    <span
                      className="inline-flex h-12 w-12 items-center justify-center rounded-xl mb-5"
                      style={{
                        backgroundColor: `${liveryAt(i).hex}1A`,
                        color: liveryAt(i).ink,
                      }}
                    >
                      <Icon size={22} />
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-lightText dark:text-darkText leading-snug mb-3">
                      {svc.heading}
                    </h2>
                    <p className="text-lg leading-relaxed text-lightTextMuted dark:text-darkTextMuted font-light">
                      {svc.body}
                    </p>
                  </div>
                  </Glow>
                </Reveal>
              );
            })}
          </div>
          </div>
        </section>

        {/* Pricing callout */}
        <section className="container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <Glow color={PAINT.rossoCorsa.hex} radius="rounded-3xl" lift={false} spread={420}>
              <div className="relative rounded-3xl border border-lightBorder dark:border-darkBorder bg-lightBG dark:bg-darkBG p-8 sm:p-12">
                <h2 className="text-3xl sm:text-4xl font-semibold text-lightText dark:text-darkText mb-5">
                  How pricing works
                </h2>
                <p className="max-w-3xl text-xl leading-relaxed text-lightTextMuted dark:text-darkTextMuted font-light mb-6">
                  Simple monthly plans at $300 a month, with a minimum 4 month
                  commitment. Traditional agencies charge $1,500 or more and
                  most of them still have no answer for customers who ask an AI
                  assistant who to call.
                </p>
                <p className="max-w-3xl text-xl leading-relaxed text-lightTextMuted dark:text-darkTextMuted font-light">
                  No hourly billing, no surprise fees. The best first step is
                  letting us take a look. We will show you exactly where the
                  opportunity is, and you will know your exact price before
                  anything starts.
                </p>
              </div>
              </Glow>
            </Reveal>
          </div>
        </section>

        <IndustryLinks />
        <FreeAudit />
      </main>
      <Footer />
    </div>
  );
}
