import Header from "components/Header";
import Hero from "components/Hero";
import Features from "components/Features";
import Section from "components/Section";
import Footer from "components/Footer";
import Customers from "components/Customers";
import Accordion from "components/Accordion";
import PriceEstimator from "components/PriceEstimator";

export default function Page() {

  const defaultAccordionItems = [
  {
    title: "waba",
    content: "Start your journey with a 34-day trial. It's easy no credit card or commitment.",
  },
  {
    title: "Easy to use",
    content:
      "Our app is designed to be user-friendly and easy to use. We want to provide a seamless experience for your users so that you can focus on what matters.",
  },
  {
    title: "Focus on what matters",
    content:
      "With better financial management, you can reduce money-related stress and focus on what matters most. More to come.",
  },
];


  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <Header />
      <main>
        <Hero />
        <Features />

        <Customers />
        <PriceEstimator />
        <Section
          leftHalf={<Accordion />}
          rightHalf={
            <div className="flex flex-col justify-end">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-4">
                Highlight the key features
              </h2>
              <p className="text-xl font-light">
                Talk about some of the key features of your app that you want to highlight. Use the beautiful accordion
                to highlight the key features of your app.
              </p>
            </div>
          }
        />
      </main>
      <Footer />
    </div>
  );
}
