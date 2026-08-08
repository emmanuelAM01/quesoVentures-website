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
import KonamiEasterEgg from "components/KonamiEasterEgg";
import IndustryLinks from "components/IndustryLinks";
import Link from "next/link";
import {
  BUSINESS,
  LOCAL_BUSINESS_SCHEMA,
  AREA_SERVED_SCHEMA,
  POSTAL_ADDRESS,
  SAME_AS,
} from "components/businessInfo";

const TITLE = "Web Design & Local SEO That Gets Your Phone Ringing";
const DESCRIPTION =
  "Get found by the customers closest to you. Web design and local SEO for local businesses, headquartered in Houston and working nationwide. $300 a month. Call (281) 203-4531.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.quesoventures.com" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.quesoventures.com",
    siteName: "Queso Ventures",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Queso Ventures logo - web design and local SEO for local businesses",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
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
      "Local businesses of almost every kind. Auto shops and mobile mechanics, wrap and detail shops, roofers and flooring crews, landscapers, cleaners, med spas and dental practices, event venues, music schools, bakeries, food trucks, and online shops run out of a spare room. I am headquartered in Houston and work with clients from Conroe and Fort Worth out to Miami. If your customers find you by searching, we are likely a strong fit.",
  },
  {
    title: "How does this actually start?",
    content:
      "We build a preview of what your business could look like online before we ever talk numbers. You see something real, not a pitch deck. If it makes sense for your business, we go from there. If not, no pressure.",
  },
  {
    title: "What does it cost?",
    content:
      "Simple monthly plans at $300 a month with a minimum 4 month commitment. Compare that to the $1,500 or more that traditional agencies charge, and most of them still have no answer for customers who ask an AI assistant for a recommendation. No hourly billing, no surprise fees.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BUSINESS.url}/#organization`,
      name: BUSINESS.name,
      legalName: BUSINESS.legalName,
      url: BUSINESS.url,
      logo: {
        "@type": "ImageObject",
        url: `${BUSINESS.url}/logo.png`,
      },
      telephone: BUSINESS.phoneE164,
      email: BUSINESS.email,
      address: POSTAL_ADDRESS,
      sameAs: SAME_AS,
      description:
        "Queso Ventures helps local businesses get more calls from Google, Google Maps, and AI assistants. Headquartered in Northeast Houston, working with clients nationwide.",
      areaServed: AREA_SERVED_SCHEMA,
      knowsAbout: [
        "Web Design",
        "Search Engine Optimization",
        "Local SEO",
        "Google Business Profile Optimization",
        "Lead Generation",
      ],
    },
    // The canonical description of the business. Same node id everywhere.
    LOCAL_BUSINESS_SCHEMA,
    {
      "@type": "Service",
      "@id": `${BUSINESS.url}/#service-seo`,
      name: "Web Design & Local SEO for Northeast Houston Businesses",
      provider: { "@id": `${BUSINESS.url}/#localbusiness` },
      serviceType: "Local Search Engine Optimization",
      description:
        "Website design, local search, and Google Business Profile work that gets local service businesses found by the customers nearest them, and recommended when someone asks an AI assistant who to call.",
      areaServed: AREA_SERVED_SCHEMA,
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
      "@id": `${BUSINESS.url}/#faq`,
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
      <KonamiEasterEgg />
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
                From restaurant websites to AI and biomedical software, I
                have built it all and kept it running. And because I helped
                build AI tools myself, I know exactly what they look for when
                they decide which business to recommend.
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
        <IndustryLinks heading="Who I build for" />
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
