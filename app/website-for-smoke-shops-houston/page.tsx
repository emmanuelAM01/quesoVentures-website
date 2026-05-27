import type { Metadata } from "next";
import Header from "components/Header";
import Footer from "components/Footer";
import FreeAudit from "components/FreeAudit";
import IndustryLinks from "components/IndustryLinks";
import NicheCtaButton from "components/NicheCtaButton";
import FaqAccordion from "components/FaqAccordion";

export const metadata: Metadata = {
  title: "Smoke Shop Website & Google Maps Houston | Queso Ventures",
  description:
    "Get your smoke shop found on Google in Houston. I build your website, optimize your Google Maps listing, and help you show up before your competitors.",
  alternates: { canonical: "https://quesoventures.com/website-for-smoke-shops-houston" },
  openGraph: {
    title: "Smoke Shop Website & Google Maps Houston | Queso Ventures",
    description:
      "Get your smoke shop found on Google in Houston. I build your website, optimize your Google Maps listing, and help you show up before your competitors.",
    url: "https://quesoventures.com/website-for-smoke-shops-houston",
    siteName: "Queso Ventures",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Queso Ventures" }],
    locale: "en_US",
    type: "website",
  },
};

const faqItems = [
  {
    q: "Does my smoke shop need a website?",
    a: "At minimum you need a strong Google Business Profile. That's what shows on Maps. A simple website backs it up and lets customers see your hours, location, and what you carry before they drive over. Together they cover the two ways customers find you online.",
  },
  {
    q: "How do I become the first result on Google Maps?",
    a: "Google ranks Maps results based on three things: relevance (does your profile describe what you sell?), proximity, and credibility (reviews, profile completeness, website). I work all three so you climb to the top.",
  },
  {
    q: "Can you help me get more Google reviews?",
    a: "Yes. I set up a simple review system that makes it easy for satisfied customers to leave a Google review without you having to ask awkwardly every time.",
  },
  {
    q: "Is this about paying for ads?",
    a: "No ads involved. This is about showing up in the results when someone searches nearby. Once it's set up, it works without ongoing ad spend.",
  },
  {
    q: "How long before I see results?",
    a: "You can see movement in local rankings within a few weeks of optimizing your profile. Consistent top placement takes two to three months of steady work.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://quesoventures.com/website-for-smoke-shops-houston#service",
      name: "Smoke Shop Website & Local Search Optimization — Houston TX",
      provider: {
        "@type": "LocalBusiness",
        name: "Queso Ventures",
        url: "https://quesoventures.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Houston",
          addressRegion: "TX",
          addressCountry: "US",
        },
      },
      serviceType:
        "Smoke Shop Website Houston, Vape Shop Google Maps Houston, Local SEO for Smoke Shops",
      areaServed: { "@type": "City", name: "Houston", addressRegion: "TX" },
      description:
        "Website design and local search optimization for Houston smoke shops and vape shops — Google Maps ranking, review building, and mobile-ready websites.",
      offers: {
        "@type": "Offer",
        name: "Free Local Visibility Audit",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://quesoventures.com/website-for-smoke-shops-houston#faq",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

const PREFILL =
  "I own a smoke shop in Houston and want to show up first when people search nearby. Here's my current situation:";

const painPoints = [
  {
    heading: "Customers walk past but don't know you exist online",
    body: "Someone searches 'smoke shop near me' a block away from your store and you don't appear. They find a competitor across town instead.",
  },
  {
    heading: "The competitor shows up first on Maps",
    body: "Customers pick the first result they see. If another shop is ranking above you on Google Maps, they're getting your customers, even if you're closer.",
  },
  {
    heading: "No website = No trust",
    body: "A new customer wants to check what you carry before they drive over. Without a site, they can't find out, so they go somewhere that answers their question.",
  },
];

const whatChanges = [
  {
    title: "You show up first when someone searches 'smoke shop near me'",
    body: "I optimize your Google Business Profile so your shop appears at the top of Maps and local search results when customers search nearby.",
  },
  {
    title: "A clean website that answers every question before they walk in",
    body: "Hours, location, what you carry. All on a fast, mobile-first page. Customers find the information they need and show up ready to buy.",
  },
  {
    title: "Reviews that build trust for customers who don't know you yet",
    body: "I set up a review system so satisfied customers leave Google reviews consistently. More reviews means higher rankings and more trust from new customers.",
  },
  {
    title: "Your profile stays accurate and active",
    body: "Hours change. Inventory changes. I keep your Google profile up to date so customers always get the right information, and Google keeps ranking you.",
  },
];


export default function SmokeShopPage() {
  return (
    <div className="flex flex-col min-h-screen bg-lightBG dark:bg-darkBG">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="container mx-auto px-4 min-h-screen flex flex-col items-center justify-center text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest text-lightTextMuted dark:text-darkTextMuted mb-4">
              Houston Smoke &amp; Vape Shops
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-lightText dark:text-darkText mb-6 tracking-tight">
              Get Your Smoke Shop Found on Google in Houston
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-lightTextMuted dark:text-darkTextMuted font-light mb-10">
              Someone is searching for a smoke shop near them right now. I make sure they find yours.
            </p>
            <NicheCtaButton message={PREFILL} label="I'll Show You How It Works" />
          </div>
        </section>

        {/* Pain points */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-lightText dark:text-darkText mb-10 text-center">
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-lightText dark:text-darkText mb-4 text-center">
            Here&apos;s what changes
          </h2>
          <p className="text-lg text-lightTextMuted dark:text-darkTextMuted font-light text-center mb-10">
            I handle the online side so customers keep walking through your door.
          </p>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {whatChanges.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 rounded-2xl border border-lightBorder dark:border-darkBorder bg-white dark:bg-[#151618] p-6"
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

        {/* FAQ */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-lightText dark:text-darkText mb-10 text-center">
            Questions smoke shop owners ask
          </h2>
          <div className="max-w-4xl mx-auto">
            <FaqAccordion items={faqItems} />
          </div>
        </section>

        <FreeAudit />
        <IndustryLinks current="/website-for-smoke-shops-houston" />
      </main>
      <Footer />
    </div>
  );
}
