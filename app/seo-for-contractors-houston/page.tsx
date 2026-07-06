import type { Metadata } from "next";
import Header from "components/Header";
import Footer from "components/Footer";
import FreeAudit from "components/FreeAudit";
import IndustryLinks from "components/IndustryLinks";
import NicheCtaButton from "components/NicheCtaButton";
import FaqAccordion from "components/FaqAccordion";

export const metadata: Metadata = {
  title: "Contractor Website & More Leads in Houston | Queso Ventures",
  description:
    "Get more calls from homeowners searching for contractors in Houston. I fix your website, set up Google search, and build a lead pipeline beyond word of mouth.",
  alternates: { canonical: "https://www.quesoventures.com/seo-for-contractors-houston" },
  openGraph: {
    title: "Contractor Website & More Leads in Houston | Queso Ventures",
    description:
      "Get more calls from homeowners searching for contractors in Houston. I fix your website, set up Google search, and build a lead pipeline beyond word of mouth.",
    url: "https://www.quesoventures.com/seo-for-contractors-houston",
    siteName: "Queso Ventures",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Queso Ventures" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contractor Website & More Leads in Houston | Queso Ventures",
    description:
      "Get more calls from homeowners searching for contractors in Houston. I fix your website, set up Google search, and build a lead pipeline beyond word of mouth.",
    images: ["/logo.png"],
  },
};

const faqItems = [
  {
    q: "My website has been up for years and it never gets me calls. Why?",
    a: "Most contractor websites have two problems: they're not structured for Google to understand what you offer and where, and they don't make it obvious for a visitor to call. I fix both.",
  },
  {
    q: "I already get referrals. Why do I need this?",
    a: "Referrals are great but unpredictable. Online visibility gives you a second pipeline that works even when referrals slow down, reaching homeowners searching for a contractor right now who are ready to hire.",
  },
  {
    q: "Do I need separate pages for each service?",
    a: "Yes, this is the biggest missed opportunity for contractors. A page for 'roof repair Houston' ranks separately from 'HVAC installation Houston.' Each service should have its own dedicated page.",
  },
  {
    q: "How do I show up when someone asks Google or an AI assistant for a contractor?",
    a: "AI tools and voice search pull from your website content, your Google Business Profile, and your reviews. I make sure all three are set up so you get cited when someone searches for a contractor in your service area.",
  },
  {
    q: "How long before I see more calls?",
    a: "Quick wins like fixing your Google Business Profile and contact page can improve call volume within a few weeks. Full local search rankings take two to four months of consistent work.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://www.quesoventures.com/seo-for-contractors-houston#service",
      name: "Contractor Website & Lead Generation — Houston TX",
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
        "Contractor Website Houston, HVAC Plumber Electrician Google Search Houston, Local SEO for Contractors",
      areaServed: { "@type": "City", name: "Houston", addressRegion: "TX" },
      description:
        "Website optimization and local search for Houston contractors — plumbers, HVAC, electricians, roofers. Get found when homeowners search and get the phone ringing.",
      offers: {
        "@type": "Offer",
        name: "Free Local Visibility Audit",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.quesoventures.com/seo-for-contractors-houston#faq",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

const PREFILL =
  "I'm a contractor in Houston and want my website to actually get me calls. Here's my current situation:";

const painPoints = [
  {
    heading: "Relying on word of mouth",
    body: "Referrals come and go. Some months are busy, some are slow, and you have no way to predict which is coming. You need a second pipeline you can count on.",
  },
  {
    heading: "Slow seasons with no leads coming in",
    body: "When referrals dry up, there's nothing to fall back on. A contractor who shows up on Google keeps getting calls even in slow months.",
  },
  {
    heading: "Competitors show up on Google first",
    body: "Homeowners search, call the first credible result they see, and hire. If that's not you, you never get the chance to bid.",
  },
];

const whatChanges = [
  {
    title: "You show up when homeowners search for your service in Houston",
    body: "I optimize your Google Business Profile and website so you appear in search results when someone types 'roofer Houston' or 'HVAC repair near me' before they call a competitor.",
  },
  {
    title: "Your website actually gets people to call",
    body: "Most contractor sites are hard to navigate on a phone. I fix the layout, the messaging, and the call-to-action so every visitor knows how to reach you and is motivated to do it.",
  },
  {
    title: "Each service you offer gets found separately",
    body: "One page per service: roof repair, installation, emergency work, commercial. Each targets the exact search a homeowner is using. More searches covered means more calls.",
  },
  {
    title: "You build a lead pipeline beyond word of mouth",
    body: "Online leads are consistent and scalable in a way referrals aren't. I build the foundation so your phone keeps ringing even when referrals slow down.",
  },
];


export default function ContractorPage() {
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
              Houston Contractors &amp; Trades
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-lightText dark:text-darkText mb-6 tracking-tight">
              Get More Calls From Homeowners Searching for Contractors in Houston
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-lightTextMuted dark:text-darkTextMuted font-light mb-10">
              Referrals are not a plan. I build you a second pipeline that brings in calls from customers searching right now.
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
            I handle the online side so you can focus on the work.
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
            Questions contractors ask
          </h2>
          <div className="max-w-4xl mx-auto">
            <FaqAccordion items={faqItems} />
          </div>
        </section>

        <FreeAudit />
        <IndustryLinks current="/seo-for-contractors-houston" />
      </main>
      <Footer />
    </div>
  );
}
