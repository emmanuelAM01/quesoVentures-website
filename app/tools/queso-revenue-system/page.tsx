import type { Metadata } from "next";
import Footer from "components/Footer";
import QrsStory from "components/QrsExperience";
import { productByKey } from "components/catalog";
import { BUSINESS } from "components/businessInfo";
import { GoesWellWith, ReadyWhenYouAre, ToolHero, ToolQuestions, toolJsonLd } from "components/tools/ToolPage";

/**
 * The Queso Revenue System: the tool page's five beats, with how it works and
 * what happens to the bank data in the middle, where "What you get" sits on
 * every other tool.
 */
const QRS = productByKey("revenue")!;
const URL = `${BUSINESS.url}/tools/${QRS.slug}`;

export const metadata: Metadata = {
  title: QRS.seoTitle,
  description: QRS.seoDescription,
  alternates: { canonical: URL },
  openGraph: { title: QRS.seoTitle, description: QRS.seoDescription, url: URL, siteName: BUSINESS.name, type: "website" },
};

export default function QrsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-lightBG dark:bg-darkBG">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd(QRS)) }} />
      <main>
        <ToolHero product={QRS} />
        <QrsStory />
        <ToolQuestions product={QRS} />
        <GoesWellWith product={QRS} />
        <ReadyWhenYouAre product={QRS} />
      </main>
      <Footer />
    </div>
  );
}
