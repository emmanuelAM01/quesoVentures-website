import type { Metadata } from "next";
import Hero from "components/Hero";
import Showcase from "components/Showcase";
import Footer from "components/Footer";
import FreeAudit from "components/FreeAudit";
import Pricing from "components/Pricing";
import { ToolQuestions } from "components/tools/ToolPage";
import ScrollDivider from "components/ScrollDivider";
import LightBar from "components/LightBar";
import { MONTHLY_PLAN_OFFER } from "components/pricingCopy";
import { SITE_COPY } from "components/siteCopy";
import { productByKey } from "components/catalog";
import { BUSINESS, AREA_SERVED_SCHEMA } from "components/businessInfo";

/**
 * The website, item No. 01. What used to be the homepage, because the
 * homepage was always really this page: the search demo, the foundation and
 * the tools to taste, the plan, the questions, and the free report.
 *
 * It keeps its own hero (the live search demo, "Try yours") rather than the
 * tool template's, because it is the one tool you can try on the spot.
 */
const SITE = productByKey("website")!;
const URL = `${BUSINESS.url}/tools/${SITE.slug}`;

export const metadata: Metadata = {
  title: SITE.seoTitle,
  description: SITE.seoDescription,
  alternates: { canonical: URL },
  openGraph: { title: SITE.seoTitle, description: SITE.seoDescription, url: URL, siteName: BUSINESS.name, type: "website" },
};

/**
 * The shared copy, pointed at the website. The old homepage headline was a
 * promise for the whole company; on this page the reader has already picked
 * the website, so the headline names it. The tools line comes out of what
 * the $500 covers, because tools are their own line in the catalogue now.
 */
const HERO = {
  ...SITE_COPY.hero,
  headline: "A website that brings in new business.",
  sub: "Built, hosted, and found on Google, Maps, and AI answers. Kept working every month.",
};
const PLAN = {
  ...SITE_COPY.pricing,
  heading: "Your website",
  included: [
    "A website built, hosted, and sharpened every single day.",
    "Found on Google, Maps, ChatGPT, and Siri.",
    "Every form on it goes to your inbox and your phone.",
    "Analysis with clear next steps, not weightless statements.",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${URL}#service`,
      name: "Websites for small businesses",
      provider: { "@id": `${BUSINESS.url}/#organization` },
      serviceType: "Website design and local search",
      description:
        "A website built, hosted and kept working every month, found on Google, on Maps, and in AI answers, with a plain monthly report.",
      areaServed: AREA_SERVED_SCHEMA,
      url: URL,
      offers: [
        MONTHLY_PLAN_OFFER,
        {
          "@type": "Offer",
          name: "Free report",
          price: "0",
          priceCurrency: "USD",
          description: "A free report on where your business shows up today on Google, on Maps, and in AI answers.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${URL}#faq`,
      mainEntity: SITE.questions.map((q) => ({
        "@type": "Question",
        name: q.q,
        acceptedAnswer: { "@type": "Answer", text: q.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Tools", item: `${BUSINESS.url}/tools` },
        { "@type": "ListItem", position: 2, name: SITE.name, item: URL },
      ],
    },
  ],
};

export default function WebsitePage() {
  return (
    <div className="flex min-h-screen flex-col bg-lightBG dark:bg-darkBG">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <Hero copy={HERO} />
        <LightBar />
        <Showcase />
        <ScrollDivider />
        <Pricing copy={PLAN} />
        <ToolQuestions product={SITE} />
        <FreeAudit image={{ src: "/hero/ctaHero.JPEG", alt: "A trench path running into the treeline at Verdun" }} />
      </main>
      <Footer />
    </div>
  );
}
