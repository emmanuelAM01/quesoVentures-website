import SimpleHeader from "components/SimpleHeader";
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
