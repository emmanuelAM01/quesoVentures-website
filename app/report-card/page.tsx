import type { Metadata } from "next";
import Footer from "components/Footer";
import ReportCardView from "components/ReportCard";
import FreeAudit from "components/FreeAudit";
import { getReportCard } from "lib/reportCard";
import { SITE_COPY } from "components/siteCopy";
import { LOCAL_BUSINESS_SCHEMA, breadcrumbSchema } from "components/businessInfo";

const TITLE = "Report Card | How Queso Ventures Clients Are Doing";
const DESCRIPTION =
  "Real numbers from Google for the local businesses I work with. More calls, more website visits, and more people finding them.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.quesoventures.com/report-card" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.quesoventures.com/report-card",
    siteName: "Queso Ventures",
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

// The numbers are cached in getReportCard; the page itself re-renders with
// them at most hourly.
export const revalidate = 3600;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [LOCAL_BUSINESS_SCHEMA, breadcrumbSchema([{ name: "Report Card", path: "/report-card" }])],
};

/**
 * The page Emmanuel pulls up on his phone when a lead asks "who else have you
 * helped?". It opens on the average client; a category link
 * (/report-card?tab=the-underbellies) opens straight onto that tab, so he can
 * show a lead their own trade first.
 */
export default async function ReportCardPage() {
  const card = await getReportCard();

  return (
    <div className="flex flex-col min-h-screen bg-lightBG dark:bg-darkBG">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex-1">
        <ReportCardView card={card} />
        {/* The page's one job: someone who just watched the line climb asks
            for theirs. */}
        <FreeAudit
          copy={{
            ...SITE_COPY.audit,
            heading: "Want your business on this chart?",
            sub: "Get a free report on where you show up today. Then let me build your line.",
            ctaPrefill: "I saw the Report Card. I want my business on it.",
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
