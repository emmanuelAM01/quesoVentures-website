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
  title: "Houston Websites, SEO & AI-SEO, Built by an Engineer",
  description:
    "Websites, SEO, and AI-SEO for Houston area businesses. More first-time customers, more repeat customers. A free report on where you show up today.",
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
        alt: "Queso Ventures logo - websites, SEO, and AI-SEO for local businesses",
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
/**
 * Eight questions, two sentences each, and both limits are load-bearing.
 *
 * These are the highest-value block on the page for AI assistants, because a
 * question and its answer extract cleanly where prose does not. They are also
 * read by a shop owner on a phone between jobs, and the deck shows one card at
 * a time — an answer long enough to scroll inside its own card is an answer
 * nobody finishes.
 *
 * No trade vocabulary. "I improve the content, structure, page speed, and lead
 * capture instead of rebuilding" was four things a customer cannot picture and
 * has no way to want. Say what changes for them, not what I touch.
 */
const faqItems = [
  {
    title: "People visit my site but nobody calls. Why?",
    content:
      "Usually the site is slow on a phone, or what to do next isn't obvious. I find which one it is and fix that first.",
  },
  {
    title: "My competitor shows up on Google and I don't. Why?",
    content:
      "Google trusts them more: a stronger profile, more reviews, better pages. I build you the same foundation, starting with whatever moves fastest.",
  },
  {
    title: "How do I show up when someone asks ChatGPT or Siri who to call?",
    content:
      "Those tools read your website before they recommend anyone. Yours has to say plainly who you are, what you do, and where you do it. That is what I set up.",
  },
  {
    title: "How fast will I see more calls?",
    content:
      "Some changes show up within a few weeks. Search results take eight to twelve. I run both at the same time so you are not waiting on one.",
  },
  {
    title: "Do I need a whole new website?",
    content:
      "Usually not. If what you have works, I fix what is losing you calls instead of starting over.",
  },
  {
    title: "Who do you work with?",
    content:
      "Local businesses whose customers find them by searching. Auto shops, contractors, roofers, cleaners, med spas, bakeries, and plenty more.",
  },
  {
    title: "What does it cost?",
    content: `${PRICING.monthlyLabel} a month for the website, getting you found on Google and in AI answers, and the tools I build for your business. No setup fee.`,
  },
  {
    title: "How does this start?",
    content:
      "Send me your business name. I look at where you show up today and get in touch with what I found. Free either way.",
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
      name: "Websites, SEO & AI-SEO for Northeast Houston Businesses",
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
            "A free report on where your business shows up today on Google, on Maps, and in AI answers, plus what is most likely costing you calls.",
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
                className="mt-4 inline-block py-2 text-base font-semibold text-lightAccent dark:text-darkAccent transition-opacity hover:opacity-70"
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
