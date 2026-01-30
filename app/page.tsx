import Header from "components/Header";
import Hero from "components/Hero";
import Features from "components/Features";
import Section from "components/Section";
import Accordion from "components/Accordion";
import Footer from "components/Footer";
import PriceEstimator from "components/PriceEstimator";

export default function Page() {

const faqItems = [
  {
    title: "What is a domain",
    content:
      "A domain is your website address, like yourbusiness.com. You buy it yearly and you own it. I can help you pick one and set it up.",
  },
  {
    title: "What is hosting",
    content:
      "Hosting is what puts your website on the internet so people can visit it. If you want, I handle hosting and all the technical setup for you.",
  },
  {
    title: "What do I need to get my website online",
    content:
      "Just two things, a domain and hosting. I handle everything else, design, building, setup, and launch.",
  },
  {
    title: "Are there monthly fees",
    content:
      "Only if you want me to host and manage the site. Hosting is 50 per month and covers keeping it online, secure, and running smoothly.",
  },
  {
    title: "What is a maintenance fee",
    content:
      "Maintenance is 150 per month and includes monitoring, keeping things up to date, and up to 4 text changes per month.",
  },
  {
    title: "What if I only need changes once in a while",
    content:
      "Every project includes a 30 day warranty after launch with up to 2 rounds of text changes. After that you can do maintenance or one off changes for 50 per change.",
  },
];



  return (
    <div className="flex flex-col min-h-screen bg-lightBG dark:bg-darkBG">
      <Header />
      <main>
        <Hero />
        <Features />

        <PriceEstimator />
<Section
  leftHalf={
  <div className="flex flex-col items-center text-center w-full">
    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-lightText dark:text-darkText mb-4">
      Common questions
    </h2>

    <p className="text-xl font-light text-lightTextMuted dark:text-darkTextMuted mb-6 max-w-xl">
      Simple answers to things clients ask me all the time.
    </p>

    <Accordion items={faqItems} />
  </div>
}



/>

      </main>
      <Footer />
    </div>
  );
}
