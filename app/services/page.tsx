import type { Metadata } from "next";
import Header from "components/Header";
import Footer from "components/Footer";
import FreeAudit from "components/FreeAudit";
import LightBar from "components/LightBar";
import Reveal from "components/Reveal";
import NicheCtaButton from "components/NicheCtaButton";
import {
  FaGlobe,
  FaMapMarkerAlt,
  FaChartLine,
  FaMobileAlt,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Website Design, Local SEO & Google Business Profile Services | Queso Ventures",
  description:
    "Website design, local SEO, and Google Business Profile services for Houston businesses. Simple plans at $300/ month, not agency prices. Free audit first.",
  alternates: { canonical: "https://www.quesoventures.com/services" },
  openGraph: {
    title: "Website Design, Local SEO & Google Business Profile Services | Queso Ventures",
    description:
      "Website design, local SEO, and Google Business Profile services for Houston businesses. Simple plans at $300/ month, not agency prices. Free audit first.",
    url: "https://www.quesoventures.com/services",
    siteName: "Queso Ventures",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Queso Ventures" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Design, Local SEO & Google Business Profile Services | Queso Ventures",
    description:
      "Website design, local SEO, and Google Business Profile services for Houston businesses. Simple plans at $300/ month, not agency prices. Free audit first.",
    images: ["/logo.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.quesoventures.com/services#service",
  name: "Web Design & Local SEO, Houston TX",
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
  },
  serviceType: [
    "Web Design",
    "Local SEO",
    "Google Business Profile Optimization",
    "AI Search Visibility",
    "Lead Generation",
  ],
  areaServed: { "@type": "City", name: "Houston", addressRegion: "TX" },
  description:
    "Website design, local SEO, Google Business Profile optimization, and AI search visibility for Houston service businesses.",
  offers: {
    "@type": "Offer",
    name: "Free Visibility Audit",
    price: "0",
    priceCurrency: "USD",
  },
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
        {/* Hero */}
        <section className="container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest text-lightTextMuted dark:text-darkTextMuted mb-4">
              Services
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-lightText dark:text-darkText mb-6 tracking-tight text-balance">
              From No Website to Customers Finding You on Google
            </h1>
            <p className="max-w-3xl text-lg sm:text-xl md:text-2xl text-lightTextMuted dark:text-darkTextMuted font-light mb-10">
              Most Houston businesses lose customers every day because they
              cannot be found online. We fix that, start to finish.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <NicheCtaButton
                message="I want to see what my website could look like. Here's my current situation:"
                label="See What Your Website Could Look Like"
              />
              <p className="text-sm font-light text-lightTextMuted dark:text-darkTextMuted">
                Simple plans at $300 a month.
              </p>
            </div>
          </div>
        </section>

        <LightBar />

        {/* Services */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-6">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <Reveal key={i} delay={(i % 2) * 120}>
                  <div className="h-full rounded-3xl border border-lightBorder dark:border-darkBorder bg-white dark:bg-[#151618] p-8">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-lightAccent/10 dark:bg-darkAccent/10 text-lightAccent dark:text-darkAccent mb-5">
                      <Icon size={22} />
                    </span>
                    <h2 className="text-xl sm:text-2xl font-semibold text-lightText dark:text-darkText leading-snug mb-2">
                      {svc.heading}
                    </h2>
                    <p className="text-base text-lightTextMuted dark:text-darkTextMuted font-light">
                      {svc.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Pricing callout */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="rounded-3xl border border-lightBorder dark:border-darkBorder bg-white dark:bg-[#151618] p-8 sm:p-12">
                <h2 className="text-2xl sm:text-3xl font-semibold text-lightText dark:text-darkText mb-3">
                  How pricing works
                </h2>
                <p className="max-w-3xl text-base text-lightTextMuted dark:text-darkTextMuted font-light mb-6">
                  Simple monthly plans at $300 a month, with a minimum 4 month
                  commitment. Traditional agencies charge $1,500 or more and
                  most of them are not even touching AI SEO.
                </p>
                <p className="max-w-3xl text-base text-lightTextMuted dark:text-darkTextMuted font-light">
                  No hourly billing, no surprise fees. The best first step is
                  letting us take a look. We will show you exactly where the
                  opportunity is, and you will know your exact price before
                  anything starts.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <FreeAudit />
      </main>
      <Footer />
    </div>
  );
}
