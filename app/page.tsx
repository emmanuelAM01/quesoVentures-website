import type { Metadata } from "next";
import Hero from "components/Hero";
import Showcase from "components/Showcase";
import Footer from "components/Footer";
import FreeAudit from "components/FreeAudit";
import IndustriesMarquee from "components/IndustriesMarquee";
import Pricing from "components/Pricing";
import FaqDeck from "components/FaqDeck";
import Reveal from "components/Reveal";
import ScrollDivider from "components/ScrollDivider";
import LightBar from "components/LightBar";
import KonamiEasterEgg from "components/KonamiEasterEgg";
import Link from "next/link";
import { PRICING, MONTHLY_PLAN_OFFER } from "components/pricingCopy";
import { metaFor } from "components/siteCopy";
import {
  BUSINESS,
  LOCAL_BUSINESS_SCHEMA,
  AREA_SERVED_SCHEMA,
  POSTAL_ADDRESS,
  SAME_AS,
} from "components/businessInfo";

const { title: TITLE, description: DESCRIPTION } = metaFor("Houston", {
  title: "Web Design & Development in Houston, Built by an Engineer",
  description:
    "Websites, local SEO, and AI visibility for Houston area businesses. More first-time customers, more repeat customers. See a free report on where you show up today.",
});

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: BUSINESS.url },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: BUSINESS.url,
    siteName: BUSINESS.name,
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

/**
 * The FAQ is the highest-value block on the page for AI assistants: discrete
 * question and answer pairs extract cleanly where prose does not. It costs
 * almost no height, because the deck shows one card at a time.
 */
const faqItems = [
  {
    title: "People visit my site but nobody calls or books. Why?",
    content:
      "Traffic without calls usually means one of three things: the next step isn't obvious, the site is slow on a phone, or the message doesn't match what the visitor searched for. I find which one is costing you and fix that first.",
  },
  {
    title: "My competitor shows up on Google and I don't. How do I change that?",
    content:
      "They have built more trust with Google. A stronger Business Profile, more reviews, better pages, and content that matches what local customers actually search. I audit what is working for them and build the same foundation for you, starting with whatever moves fastest.",
  },
  {
    title: "How do I show up when someone asks ChatGPT or Google AI to recommend a business like mine?",
    content:
      "AI assistants scan your website to decide whether your business is credible enough to recommend. To get cited, your site has to state clearly who you are, what you offer, where you are, and who you serve, in a structure those tools can read. That is exactly what I build for.",
  },
  {
    title: "How fast will I see more leads?",
    content:
      "Messaging and layout fixes can show results within a few weeks. The majority of search changes show up between eight and twelve weeks, and the work is applied continuously rather than in one launch. I run both at the same time, so you are not waiting three months before anything changes.",
  },
  {
    title: "Can you work with my current website, or do I need to start over?",
    content:
      "Almost always I can work with what you have. If the site functions, I improve the content, structure, page speed, and lead capture instead of rebuilding. A full redesign only makes sense when a site is truly beyond saving.",
  },
  {
    title: "Who do you work with?",
    content:
      "Local businesses of almost every kind. Auto shops and mobile mechanics, wrap and detail shops, roofers and flooring crews, landscapers, cleaners, med spas and dental practices, event venues, music schools, bakeries, food trucks, and online shops run out of a spare room. I am headquartered in Houston and work with clients from Conroe and Fort Worth out to Miami. If your customers find you by searching, we are likely a strong fit.",
  },
  {
    title: "How does this actually start?",
    content:
      "You send me your business name through the form. I look at what someone searching for you right now actually finds, and what an AI assistant says when asked to recommend someone like you, then I get in touch with what I found. We talk it through from there. No contract, no commitment, and nothing to pay to have that conversation.",
  },
  {
    title: "What does it cost?",
    content: `${PRICING.monthlyLabel} a month for the website, the search and AI visibility, and the tools I build for your business. No setup fee. Agencies charge ${PRICING.agencyAnchor} or more and still have no answer for customers who ask an AI assistant who to call. We go through the details together before anything starts.`,
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
      // Two offers. The page states the price once in the hero and once in the
      // pricing block; the machine-readable version below is what lets an AI
      // assistant answer "how much do they charge" without the page having to
      // repeat itself a third and fourth time.
      offers: [
        MONTHLY_PLAN_OFFER,
        {
          "@type": "Offer",
          name: "Free Website Growth Audit",
          price: "0",
          priceCurrency: "USD",
          description:
            "A free audit of your site structure, Google visibility, conversion blockers, page speed, and lead capture setup with a prioritized 30-day improvement plan.",
        },
      ],
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
      <KonamiEasterEgg />
      <main>
        <Hero />
        <LightBar />
        <IndustriesMarquee />

        {/* Credibility. One line: the whole argument is that a software
            engineer is doing this, not a marketing agency. */}
        <section className="container mx-auto px-4 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="text-2xl sm:text-3xl md:text-4xl font-light leading-snug text-balance text-lightText dark:text-darkText">
                Industry-trained software engineer, working for the businesses that rarely get one.
              </p>
              <Link
                href="/about"
                className="mt-6 inline-block text-base font-semibold text-lightAccent dark:text-darkAccent transition-opacity hover:opacity-70"
              >
                Meet the founder →
              </Link>
            </Reveal>
          </div>
        </section>

        <Showcase />
        <ScrollDivider />
        <Pricing />
        <FaqDeck items={faqItems} />
        <FreeAudit
          image={{
            src: "/hero/ctaHero.JPEG",
            alt: "A trench path running into the treeline at Verdun",
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
