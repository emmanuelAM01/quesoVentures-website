import type { Metadata } from "next";
import Header from "components/Header";
import Footer from "components/Footer";
import FreeAudit from "components/FreeAudit";
import IndustryLinks from "components/IndustryLinks";
import NicheCtaButton from "components/NicheCtaButton";
import FaqDeck from "components/FaqDeck";
import LightBar from "components/LightBar";

export const metadata: Metadata = {
  title: "Med Spa Website & More Clients in Houston | Queso Ventures",
  description:
    "Fill your appointment book with clients who found you on Google. I help Houston med spas and salons get found online, build reviews, and stop relying on paid ads.",
  alternates: { canonical: "https://www.quesoventures.com/seo-for-med-spas-houston" },
  openGraph: {
    title: "Med Spa Website & More Clients in Houston | Queso Ventures",
    description:
      "Fill your appointment book with clients who found you on Google. I help Houston med spas and salons get found online, build reviews, and stop relying on paid ads.",
    url: "https://www.quesoventures.com/seo-for-med-spas-houston",
    siteName: "Queso Ventures",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Queso Ventures" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Med Spa Website & More Clients in Houston | Queso Ventures",
    description:
      "Fill your appointment book with clients who found you on Google. I help Houston med spas and salons get found online, build reviews, and stop relying on paid ads.",
    images: ["/logo.png"],
  },
};

const faqItems = [
  {
    q: "My booking calendar has empty slots. Is this the right solution?",
    a: "If empty slots are the problem, visibility is almost always part of the answer. People looking for Botox, laser, or facials search before they book. If you're not showing up in those searches, they book somewhere else.",
  },
  {
    q: "I already have regulars. Do I need to worry about online visibility?",
    a: "Regulars are valuable, but they're not growth. Online visibility is where new clients come from: someone new to Houston, someone whose previous provider retired, someone finally ready to try a med spa.",
  },
  {
    q: "Can I show up when someone searches for a specific treatment like 'Botox Houston'?",
    a: "Yes, and this is one of the most valuable things to optimize for. I build dedicated pages for your key treatments so each one has its own chance to rank when someone searches specifically for it.",
  },
  {
    q: "I'm paying for ads that aren't converting. Should I stop?",
    a: "Ads send traffic to your site, but if the site isn't set up to convert (slow, confusing on mobile, no trust signals) the clicks don't turn into bookings. I fix the conversion side so your spend stops being wasted.",
  },
  {
    q: "How long before I see more bookings?",
    a: "Your Google profile can start pulling in more visibility within weeks. Consistent top rankings for your key services take two to four months of steady work.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://www.quesoventures.com/seo-for-med-spas-houston#service",
      name: "Med Spa & Salon Website & Local Search, Houston TX",
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
        "Med Spa Website Houston, Laser Hair Removal Botox SEO Houston, Local SEO for Med Spas",
      areaServed: { "@type": "City", name: "Houston", addressRegion: "TX" },
      description:
        "Website optimization and local search for Houston med spas, salons, and aesthetic clinics, more new clients from Google, more bookings, less reliance on paid ads.",
      offers: {
        "@type": "Offer",
        name: "Free Local Visibility Audit",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.quesoventures.com/seo-for-med-spas-houston#faq",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

const PREFILL =
  "I run a med spa / salon in Houston and want more bookings from people searching online. Here's my current situation:";

const painPoints = [
  {
    heading: "Paying for ads that don't convert",
    body: "You're getting clicks but not bookings. The traffic lands on a site that isn't built to convert, and the ad spend keeps going out with nothing coming back.",
  },
  {
    heading: "Appointment book has gaps",
    body: "Regulars keep coming. New clients aren't. You're not showing up when someone new to Houston searches for your services.",
  },
  {
    heading: "New clients don't find you",
    body: "Someone searches 'Botox Houston' or 'med spa near me' and sees your competitors. You're qualified. You just aren't visible.",
  },
];

const whatChanges = [
  {
    title: "New clients in Houston find you when they search for your treatments",
    body: "I build dedicated pages for each of your key services (Botox, laser, facials, whatever you specialize in) and optimize your Google profile so you show up in the searches that matter.",
  },
  {
    title: "Your site converts visitors into booked appointments",
    body: "Fast on mobile, easy to book, and built with the trust signals a new client needs: reviews, credentials, before/after photos. Every visitor gets a clear path to booking.",
  },
  {
    title: "Reviews build trust before clients walk in the door",
    body: "I set up a review system so happy clients leave Google reviews consistently. More recent reviews means more trust and more new clients choosing you over a competitor.",
  },
  {
    title: "You stop relying on paid ads to stay visible",
    body: "Search rankings work around the clock without ongoing spend. I build the foundation that keeps new clients finding you even when you're not running campaigns.",
  },
];


export default function MedSpaPage() {
  return (
    <div className="flex flex-col min-h-screen bg-lightBG dark:bg-darkBG">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="container mx-auto px-4 pt-32 pb-16">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest text-lightTextMuted dark:text-darkTextMuted mb-4">
              Houston Med Spas &amp; Salons
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-lightText dark:text-darkText mb-6 tracking-tight">
              Fill Your Appointment Book With Clients From Google
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-lightTextMuted dark:text-darkTextMuted font-light mb-10">
              New clients in Houston are searching for your treatments right now. I make sure they find you and not your competitor.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <NicheCtaButton message={PREFILL} label="I'll Show You How It Works" />
              <p className="text-sm font-light text-lightTextMuted dark:text-darkTextMuted">
                Simple plans at $300 a month.
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
            I handle the online side so new clients can find you and choose you.
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
          heading="Questions med spa owners ask"
          items={faqItems.map((f) => ({ title: f.q, content: f.a }))}
        />

        <FreeAudit />
        <IndustryLinks current="/seo-for-med-spas-houston" />
      </main>
      <Footer />
    </div>
  );
}
