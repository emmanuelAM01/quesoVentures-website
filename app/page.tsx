import type { Metadata } from "next";
import Header from "components/Header";
import Hero from "components/Hero";
import Features from "components/Features";
import Footer from "components/Footer";
import FreeAudit from "components/FreeAudit";
import AskDirectlyButton from "components/AskDirectlyButton";

export const metadata: Metadata = {
  title: "Queso Ventures | Websites and Local Search for Houston Businesses",
  description:
    "More calls and bookings from your website. I help Houston service businesses get found on Google and AI search — starting with a free audit.",
  alternates: { canonical: "https://www.quesoventures.com" },
  openGraph: {
    title: "Queso Ventures | Websites and Local Search for Houston Businesses",
    description:
      "More calls and bookings from your website. I help Houston service businesses get found on Google and AI search — starting with a free audit.",
    url: "https://www.quesoventures.com",
    siteName: "Queso Ventures",
    images: [{ url: "/logo.png", width: 512, height: 512, alt:"Queso Ventures logo - Houston web design and local SEO" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Queso Ventures | Websites and Local Search for Houston Businesses",
    description:
      "More calls and bookings from your website. I help Houston service businesses get found on Google and AI search — starting with a free audit.",
    images: ["/logo.png"],
  },
};

const faqItems = [
  {
    title: "People visit my site but nobody calls or books. Why?",
    content:
      "Traffic without calls usually means one of three things: your site doesn't make the next step obvious, it loads too slowly on mobile, or the messaging doesn't match what visitors searched for. I find exactly which one is costing you and fix it first.",
  },
  {
    title: "My competitor shows up on Google and I don't. How do I change that?",
    content:
      "Your competitor has built more trust with Google: a stronger Business Profile, more reviews, better-structured pages, and content that matches what local customers actually search. I audit what they're doing right and build the same foundation for you, starting with what moves the needle fastest.",
  },
  {
    title: "How do I show up when someone asks ChatGPT or Google AI to recommend a business like mine?",
    content:
      "AI tools like ChatGPT and Google's AI Overviews scan your website to decide if your business is credible enough to recommend. To get cited, your site needs to clearly state who you are, what services you offer, where you're located, and who you serve, in a structure AI can read and trust. That's exactly what I optimize for.",
  },
  {
    title: "How fast will I see more leads?",
    content:
      "Messaging and layout fixes can show results within a few weeks, and visitors start actually contacting you. Consistent search rankings take two to four months of steady work. I focus on both at the same time so you are not waiting months before anything changes.",
  },
  {
    title: "Can you work with my current website, or do I need to start over?",
    content:
      "Almost always we can work with what you have. If your site is functional, I'll improve the content, structure, page speed, and lead capture without rebuilding. A full redesign only makes sense when the site is truly impossible to update or nonexistent.",
  },
  {
    title: "Who do you work with?",
    content:
      "Service businesses in Houston: med spas, clinics, law firms, contractors, restaurants, cafes, and concierge services. If you have a local customer base and want more of them finding you through Google or AI search, we are likely a strong fit.",
  },
  {
    title: "How does this actually start?",
    content:
      "I build a preview of what your business could look like online before we ever talk numbers. You see something real, not a pitch deck. If it makes sense for your business, we go from there. If not, no pressure.",
  },
  {
    title: "What does it cost?",
    content:
      "Simple monthly plans with a minimum 4 month commitment. No hourly billing, no surprise fees. Just consistent work every month. Get the free assessment first and I'll walk you through what makes sense for your specific situation.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.quesoventures.com/#organization",
      name: "Queso Ventures",
      url: "https://www.quesoventures.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.quesoventures.com/logo.png",
      },
      description:
        "Queso Ventures helps Houston service businesses get more leads from Google and AI search through SEO and Generative Engine Optimization (GEO).",
      areaServed: {
        "@type": "City",
        name: "Houston",
        "@id": "https://www.wikidata.org/wiki/Q16555",
      },
      knowsAbout: [
        "Search Engine Optimization",
        "Generative Engine Optimization",
        "Local SEO",
        "AI Search Optimization",
        "Lead Generation",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.quesoventures.com/#localbusiness",
      name: "Queso Ventures",
      url: "https://www.quesoventures.com",
      image: "https://www.quesoventures.com/logo.png",
      description:
        "SEO and AI search optimization for Houston service businesses — med spas, clinics, law firms, contractors, restaurants, and more.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Houston",
        addressRegion: "TX",
        addressCountry: "US",
      },
      areaServed: [
        { "@type": "City", name: "Houston", addressRegion: "TX" },
        { "@type": "State", name: "Texas" },
      ],
      priceRange: "$$",
      serviceType: ["SEO", "GEO", "Local SEO", "Lead Generation", "Website Optimization"],
    },
    {
      "@type": "Service",
      "@id": "https://www.quesoventures.com/#service-seo",
      name: "SEO & GEO Optimization for Houston Businesses",
      provider: { "@id": "https://www.quesoventures.com/#organization" },
      serviceType: "Search Engine Optimization",
      description:
        "Comprehensive SEO and Generative Engine Optimization (GEO) to help Houston service businesses rank higher on Google and get cited by AI search tools like ChatGPT and Perplexity.",
      areaServed: { "@type": "City", name: "Houston", addressRegion: "TX" },
      offers: {
        "@type": "Offer",
        name: "Free Website Growth Audit",
        price: "0",
        priceCurrency: "USD",
        description:
          "A free audit of your site structure, Google visibility, conversion blockers, page speed, and lead capture setup with a prioritized 30-day improvement plan.",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.quesoventures.com/#faq",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.title,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.content,
        },
      })),
    },
  ],
};

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-lightBG dark:bg-darkBG">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <Features />
        <FreeAudit />
        <section className="container mx-auto px-4 py-16 bg-lightBG dark:bg-darkBG transition-colors">
          <div className="flex flex-col items-center text-center w-full">
            <div className="max-w-4xl mx-auto mb-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-lightText dark:text-darkText mb-6">
                Common Questions About Getting More Leads Online
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl font-light text-lightTextMuted dark:text-darkTextMuted">
                Real answers for Houston business owners trying to grow online.
              </p>
            </div>

            <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-4">
              {faqItems.map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-lightBorder dark:border-darkBorder bg-white dark:bg-[#151618] p-6 flex flex-col gap-3 text-left"
                >
                  <p className="text-base sm:text-lg font-semibold text-lightText dark:text-darkText leading-snug">
                    {item.title}
                  </p>
                  <p className="text-sm sm:text-base font-light text-lightTextMuted dark:text-darkTextMuted leading-relaxed">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-base sm:text-lg text-lightTextMuted dark:text-darkTextMuted font-light mb-4">
                Still have questions?
              </p>
              <AskDirectlyButton />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
