import type { Metadata } from "next";
import Footer from "components/Footer";
import { AskForIt, CatalogCover, Department, catalogJsonLd } from "components/tools/Catalog";
import { OUTCOMES } from "components/catalog";
import { BUSINESS } from "components/businessInfo";

const URL = `${BUSINESS.url}/tools`;
const TITLE = "Tools for Small Businesses | Queso Ventures";
const DESCRIPTION =
  "Every tool Queso Ventures builds: websites, phone answering, loyalty punch cards, booking, quotes, a customer organizer, and real numbers on your money.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, siteName: BUSINESS.name, type: "website" },
};

export default function ToolsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-lightBG dark:bg-darkBG">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd(URL)) }} />
      <main>
        <CatalogCover />
        {OUTCOMES.map((o, i) => (
          <Department key={o.key} outcome={o} index={i} />
        ))}
        <AskForIt />
      </main>
      <Footer />
    </div>
  );
}
