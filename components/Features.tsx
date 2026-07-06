import React from "react";
import ServiceCard from "./FeatureCard";
import { FaGlobe, FaChartLine, FaHandshake } from "react-icons/fa";

const Services = () => {
const services = [
  {
    icon: FaGlobe,
    title: "You Get Found",
    description: "Google, Maps, and AI search. When someone nearby looks for what you do, you're the one they see.",
  },
  {
    icon: FaChartLine,
    title: "Visitors Become Customers",
    description: "A fast, clear website that makes calling or booking you the obvious next step — especially on a phone.",
  },
  {
    icon: FaHandshake,
    title: "Simple Billing",
    description: "$300 a month covers it all — website, Google, updates, and support. No hourly billing, no surprises.",
  },
];

  return (
    <section className="container mx-auto px-4 py-16 bg-lightBG dark:bg-darkBG transition-colors">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-lightText dark:text-darkText mb-4">
          What You Get
        </h2>

        <p className="text-lg sm:text-xl md:text-2xl text-lightTextMuted dark:text-darkTextMuted font-light">
          Three things, done for you every month.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
