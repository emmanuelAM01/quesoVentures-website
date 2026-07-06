import type { Metadata } from "next";
import Header from "components/Header";
import Footer from "components/Footer";
import FreeAudit from "components/FreeAudit";
import IndustryLinks from "components/IndustryLinks";
import NicheCtaButton from "components/NicheCtaButton";
import FaqAccordion from "components/FaqAccordion";

export const metadata: Metadata = {
  title: "Food Truck Website & Google Maps Setup Houston | Queso Ventures",
  description:
    "Get a website for your food truck in Houston and show up when customers search nearby. I build the site, set up Google Maps, and become your ongoing tech partner.",
  alternates: { canonical: "https://www.quesoventures.com/website-for-food-trucks-houston" },
  openGraph: {
    title: "Food Truck Website & Google Maps Setup Houston | Queso Ventures",
    description:
      "Get a website for your food truck in Houston and show up when customers search nearby. I build the site, set up Google Maps, and become your ongoing tech partner.",
    url: "https://www.quesoventures.com/website-for-food-trucks-houston",
    siteName: "Queso Ventures",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Queso Ventures" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Food Truck Website & Google Maps Setup Houston | Queso Ventures",
    description:
      "Get a website for your food truck in Houston and show up when customers search nearby. I build the site, set up Google Maps, and become your ongoing tech partner.",
    images: ["/logo.png"],
  },
};

const faqItems = [
  {
    q: "Do I need a website or is a Google profile enough?",
    a: "Both, though the Google Business Profile is the priority. That's what shows your location, hours, and photos when someone searches on Maps. A simple website backs it up and gives people a place to see your full menu before they drive over.",
  },
  {
    q: "My location changes every day. Can Google keep up?",
    a: "Yes. I'll set up a simple system so your current location is always accurate on Google, whether you're at a regular spot or a weekend event. Customers see where you actually are, not where you were last week.",
  },
  {
    q: "I have Instagram but it's not bringing new customers. Why?",
    a: "Instagram keeps you in front of people who already follow you. Google Maps reaches customers who don't know you exist yet. People searching for food nearby right now are ready to eat and are a completely different audience.",
  },
  {
    q: "Will this help me book more events and markets?",
    a: "Yes. A well-maintained online presence with reviews, photos, and a real website makes you look established, which helps when pitching to event organizers or market coordinators.",
  },
  {
    q: "How long before I see more customers?",
    a: "Your Google Business Profile can start showing in more local searches within a few weeks of being properly set up. Consistent rankings take a bit longer, usually two to three months of steady work.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://www.quesoventures.com/website-for-food-trucks-houston#service",
      name: "Food Truck Website & Local Search Optimization — Houston TX",
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
      serviceType:
        "Website Design for Food Trucks, Google Business Profile Optimization, Local SEO, Food Truck Google Maps Houston",
      areaServed: { "@type": "City", name: "Houston", addressRegion: "TX" },
      description:
        "Website design and local search optimization for Houston food trucks — Google Business Profile setup, Maps visibility, mobile-ready websites, and review building.",
      offers: {
        "@type": "Offer",
        name: "Free Local Visibility Audit",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.quesoventures.com/website-for-food-trucks-houston#faq",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

const PREFILL =
  "I run a food truck in Houston and want to show up when people search for food nearby. Here's my current situation:";

const painPoints = [
  {
    heading: "Customers can't find your location",
    body: "Your hours, location, and menu aren't showing up when someone nearby searches for food. They pick whoever shows up first. That usually isn't you.",
  },
  {
    heading: "No way to show your menu online",
    body: "A customer wants to check your menu before they drive over. If there's no website, they move on to the next truck that has one.",
  },
  {
    heading: "Not showing up for 'food trucks near me'",
    body: "Someone opens Maps, types 'food truck near me,' and your truck doesn't appear, even if you're half a mile away. That customer goes somewhere else.",
  },
];

const whatChanges = [
  {
    title: "A website built for your food truck",
    body: "Menu, location, schedule, and a way to follow or contact you. All on a fast, mobile-first page that works every time. I build it and you own it.",
  },
  {
    title: "Your truck shows up on Google Maps",
    body: "I set up and optimize your Google Business Profile so customers see your location, hours, and photos when they search nearby, even people who've never heard of you.",
  },
  {
    title: "You show up when someone searches 'food trucks near me'",
    body: "With the right Google profile and website in place, your truck starts appearing in the local searches that hungry customers actually use.",
  },
  {
    title: "I'm your ongoing tech partner",
    body: "Menu changed? New schedule? New location? I handle the updates so your online presence is always accurate. You focus on the food.",
  },
];


export default function FoodTruckPage() {
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
          <div className="max-w-5xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest text-lightTextMuted dark:text-darkTextMuted mb-4">
              Houston Food Trucks
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-lightText dark:text-darkText mb-6 tracking-tight">
              Get a Website for Your Food Truck in Houston
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-lightTextMuted dark:text-darkTextMuted font-light mb-10">
              Your truck is out there every day. I make sure customers can find you before they find someone else.
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
            I handle the online side so you can focus on the food.
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
            Questions food truck owners ask
          </h2>
          <div className="max-w-4xl mx-auto">
            <FaqAccordion items={faqItems} />
          </div>
        </section>

        <FreeAudit />
        <IndustryLinks current="/website-for-food-trucks-houston" />
      </main>
      <Footer />
    </div>
  );
}
