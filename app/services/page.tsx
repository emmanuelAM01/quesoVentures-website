import type { Metadata } from "next";
import Header from "components/Header";
import Footer from "components/Footer";
import FreeAudit from "components/FreeAudit";
import {
  FaGlobe,
  FaMapMarkerAlt,
  FaChartLine,
  FaMobileAlt,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Website Design, Local SEO & Google Business Profile Services | Queso Ventures",
  description:
    "Website design, local SEO, and Google Business Profile services for Houston businesses. Simple plans at $300/month — not agency prices. Free audit first.",
  alternates: { canonical: "https://www.quesoventures.com/services" },
  openGraph: {
    title: "Website Design, Local SEO & Google Business Profile Services | Queso Ventures",
    description:
      "Website design, local SEO, and Google Business Profile services for Houston businesses. Simple plans at $300/month — not agency prices. Free audit first.",
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
      "Website design, local SEO, and Google Business Profile services for Houston businesses. Simple plans at $300/month — not agency prices. Free audit first.",
    images: ["/logo.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.quesoventures.com/services#service",
  name: "Web Design & Local SEO — Houston TX",
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
    body: "I build it around what your customers are already searching for. Fast on mobile, easy to find, and clear enough that visitors actually call.",
  },
  {
    icon: FaChartLine,
    heading: "You need to show up on Google",
    body: "When someone searches for your service in Houston, your name should be there. I build the pages and content that earn those rankings.",
  },
  {
    icon: FaMapMarkerAlt,
    heading: "You need to own your Google Maps listing",
    body: "Most customers pick from the first three businesses that show up on Maps. I get you into that group and keep you there.",
  },
  {
    icon: FaGlobe,
    heading: "You need customers to find you on AI search too",
    body: "When someone asks Siri or ChatGPT who to call, I make sure your business is the answer they get.",
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
        <section className="container mx-auto px-4 pt-24 pb-16 text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-lightText dark:text-darkText mb-6 tracking-tight">
              From No Website to Customers Finding You on Google
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-lightTextMuted dark:text-darkTextMuted font-light">
              Most Houston businesses lose customers every day because they cannot be found online. I fix that, start to finish.
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-lightBorder dark:border-darkBorder bg-white dark:bg-[#151618] p-8"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <Icon
                      size={28}
                      className="text-lightAccent dark:text-darkAccent shrink-0 mt-1"
                    />
                    <h2 className="text-xl sm:text-2xl font-semibold text-lightText dark:text-darkText leading-snug">
                      {svc.heading}
                    </h2>
                  </div>
                  <p className="text-base text-lightTextMuted dark:text-darkTextMuted font-light">
                    {svc.body}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Pricing callout */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto rounded-2xl border border-lightBorder dark:border-darkBorder bg-white dark:bg-[#151618] p-8 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-lightText dark:text-darkText mb-3">
              How pricing works
            </h2>
            <p className="text-base text-lightTextMuted dark:text-darkTextMuted font-light mb-6">
              Simple monthly plans at $300 a month, with a minimum 4 month commitment. Traditional agencies charge $1,500+ and most of them aren&apos;t even touching AI search.
            </p>
            <p className="text-base text-lightTextMuted dark:text-darkTextMuted font-light">
              No hourly billing, no surprise fees. The best first step is letting me take a look — I will show you exactly where the opportunity is, and you will know your exact price before anything starts.
            </p>
          </div>
        </section>

        <FreeAudit />
      </main>
      <Footer />
    </div>
  );
}
