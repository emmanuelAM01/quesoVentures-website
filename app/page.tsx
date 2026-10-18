import type { Metadata } from "next";
import Footer from "components/Footer";
import FreeAudit from "components/FreeAudit";
import KonamiEasterEgg from "components/KonamiEasterEgg";
import { CompanyHero, FounderLine, ProofBand } from "components/home/HomeSections";
import Receipt from "components/home/Receipt";
import Shelf from "components/home/Shelf";
import { getReportCard } from "lib/reportCard";
import {
  BUSINESS,
  LOCAL_BUSINESS_SCHEMA,
  AREA_SERVED_SCHEMA,
  POSTAL_ADDRESS,
  SAME_AS,
} from "components/businessInfo";

const TITLE = "Queso Ventures | Software for Small Businesses, Built in Houston";
const DESCRIPTION =
  "Websites and tools that bring customers in, bring them back, and straighten out the busywork. Built by talking to owners, one shop at a time.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: BUSINESS.url },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: BUSINESS.url,
    siteName: BUSINESS.name,
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Queso Ventures" }],
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

// The proof band reads the Report Card, which is cached for an hour.
export const revalidate = 3600;

/*
  The company, and the business behind it. The website's own Service, offers
  and questions moved to /tools/website with the rest of what used to be this
  page; each tool carries its own on its page.
*/
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BUSINESS.url}/#organization`,
      name: BUSINESS.name,
      legalName: BUSINESS.legalName,
      url: BUSINESS.url,
      logo: { "@type": "ImageObject", url: `${BUSINESS.url}/logo.png` },
      telephone: BUSINESS.phoneE164,
      email: BUSINESS.email,
      address: POSTAL_ADDRESS,
      sameAs: SAME_AS,
      description:
        "Queso Ventures builds software for small businesses: websites that get found on Google, Maps, and AI answers, and tools that answer calls, bring regulars back, and keep the books straight. Based in Houston.",
      areaServed: AREA_SERVED_SCHEMA,
      knowsAbout: [
        "Small Business Software",
        "Web Design",
        "Search Engine Optimization",
        "Local SEO",
        "Google Business Profile Optimization",
        "Customer Loyalty Programs",
        "AI Phone Answering",
      ],
    },
    // The canonical description of the business. Same node id everywhere.
    LOCAL_BUSINESS_SCHEMA,
  ],
};

export default async function Page() {
  const card = await getReportCard();
  return (
    <div className="flex min-h-screen flex-col bg-lightBG dark:bg-darkBG">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <KonamiEasterEgg />
      <main>
        <CompanyHero />
        <Receipt />
        <Shelf />
        <ProofBand card={card} />
        <FounderLine />
        <FreeAudit image={{ src: "/hero/ctaHero.JPEG", alt: "A trench path running into the treeline at Verdun" }} />
      </main>
      <Footer />
    </div>
  );
}
