import type { Metadata } from "next";
import SimpleHeader from "components/SimpleHeader";

export const metadata: Metadata = {
  title: "You Found It | Queso Ventures",
  description:
    "You found the Queso Ventures QR code. Learn how we help Houston service businesses get more leads from Google and AI search.",
  robots: { index: false, follow: false },
};
import FoundFlyer from "components/FoundFlyer";
import Features from "components/Features";
import Section from "components/Section";
import Accordion from "components/Accordion";
import Footer from "components/Footer";
import PriceEstimator from "components/PriceEstimator";

export default function Page() {

  return (
    <div className="flex flex-col min-h-screen bg-lightBG dark:bg-darkBG">
      <SimpleHeader />
      <main>
        <FoundFlyer />
      </main>
      <Footer />
    </div>
  );
}
