import type { Metadata } from "next";
import Header from "components/Header";
import Hero from "components/Hero";
import Features from "components/Features";
import Footer from "components/Footer";
import FreeAudit from "components/FreeAudit";
import IndustriesMarquee from "components/IndustriesMarquee";
import HowItWorks from "components/HowItWorks";
import Pricing from "components/Pricing";
import FaqDeck from "components/FaqDeck";
import Reveal from "components/Reveal";
import ScrollDivider from "components/ScrollDivider";
import LightBar from "components/LightBar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Web Design & Local SEO for Houston Businesses | Queso Ventures",
  description:
    "Web design and local SEO that gets Houston businesses found on Google and AI search. Simple monthly plans at $300/ month, not agency prices. Free audit first.",
  alternates: { canonical: "https://www.quesoventures.com" },
  openGraph: {
    title: "Web Design & Local SEO for Houston Businesses | Queso Ventures",
    description:
      "Web design and local SEO that gets Houston businesses found on Google and AI search. Simple monthly plans at $300/ month, not agency prices. Free audit first.",
    url: "https://www.quesoventures.com",
    siteName: "Queso Ventures",
    images: [{ url: "/logo.png", width: 512, height: 512, alt:"Queso Ventures logo - Houston web design and local SEO" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design & Local SEO for Houston Businesses | Queso Ventures",
    description:
      "Web design and local SEO that gets Houston businesses found on Google and AI search. Simple monthly plans at $300/ month, not agency prices. Free audit first.",
    images: ["/logo.png"],
  },
};

const faqItems = [
  {
    title: "People visit my site but nobody calls or books. Why?",
    content:
      "Traffic without calls usually means one of three things. Your site doesn't make the next step obvious, it loads too slowly on mobile, or the message doesn't match what visitors searched for. We find which one is costing you and fix it first.",
  },
  {
    title: "My competitor shows up on Google and I don't. How do I change that?",
    content:
      "Your competitor has built more trust with Google. A stronger Business Profile, more reviews, better pages, and content that matches what local customers actually search. We audit what they're doing right and build the same foundation for you, starting with what moves the needle fastest.",
  },
  {
    title: "How do I show up when someone asks ChatGPT or Google AI to recommend a business like mine?",
    content:
      "AI tools like ChatGPT and Google's AI Overviews scan your website to decide if your business is credible enough to recommend. To get cited, your site needs to clearly state who you are, what you offer, where you are, and who you serve, in a structure AI can read and trust. That is exactly what we optimize for.",
  },
  {
    title: "How fast will I see more leads?",
    content:
      "Messaging and layout fixes can show results within a few weeks. Consistent search rankings take two to four months of steady work. We work on both at the same time, so you are not waiting months before anything changes.",
  },
  {
    title: "Can you work with my current website, or do I need to start over?",
    content:
      "Almost always we can work with what you have. If your site is functional, we improve the content, structure, page speed, and lead capture without rebuilding. A full redesign only makes sense when the site is truly beyond saving.",
  },
  {
    title: "Who do you work with?",
    content:
      "Local service businesses across Houston, Humble, Atascocita, and Kingwood. Auto shops, wrap shops, contractors, carpet cleaners, food trucks, med spas, salons, event venues, and local retailers. If your customers find you by searching online, we are likely a strong fit.",
  },
  {
    title: "How does this actually start?",
    content:
      "We build a preview of what your business could look like online before we ever talk numbers. You see something real, not a pitch deck. If it makes sense for your business, we go from there. If not, no pressure.",
  },
  {
    title: "What does it cost?",
    content:
      "Simple monthly plans at $300 a month with a minimum 4 month commitment. Compare that to the $1,500 or more that traditional agencies charge, and most of them are not even touching AI SEO. No hourly billing, no surprise fees.",
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
        "Web design, local SEO, and AI search optimization for Houston-area service businesses, auto shops, contractors, med spas, salons, food trucks, event venues, and more.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Houston",
        addressRegion: "TX",
        addressCountry: "US",
      },
      areaServed: [
        { "@type": "City", name: "Houston", addressRegion: "TX" },
        { "@type": "City", name: "Humble", addressRegion: "TX" },
        { "@type": "City", name: "Atascocita", addressRegion: "TX" },
        { "@type": "City", name: "Kingwood", addressRegion: "TX" },
        { "@type": "City", name: "Spring", addressRegion: "TX" },
        { "@type": "City", name: "Porter", addressRegion: "TX" },
        { "@type": "State", name: "Texas" },
      ],
      priceRange: "$300 per month",
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
        <LightBar />
        <IndustriesMarquee />

        {/* Credibility statement */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <p className="max-w-4xl text-2xl sm:text-3xl md:text-4xl font-light text-lightText dark:text-darkText leading-snug text-balance">
                An enterprise grade team of engineers and problem solvers,
                straight from the AI space, now working for the businesses
                that need it most.
              </p>
              <p className="mt-6 max-w-3xl text-base sm:text-lg font-light text-lightTextMuted dark:text-darkTextMuted">
                From restaurant websites to AI and biomedical software, we
                have built it all and kept it running. And because we helped
                build AI tools ourselves, we know exactly what they want to
                see when they recommend a business.
              </p>
              <Link
                href="/about"
                className="mt-6 inline-block text-base font-semibold text-lightAccent dark:text-darkAccent hover:opacity-70 transition-opacity"
              >
                Meet the founder →
              </Link>
            </Reveal>
          </div>
        </section>

        <ScrollDivider />

        <Features />
        <HowItWorks />
        <ScrollDivider />
        <Pricing />
        <FaqDeck items={faqItems} />
        <ScrollDivider />
        <FreeAudit />
      </main>
      <Footer />
    </div>
  );
}
