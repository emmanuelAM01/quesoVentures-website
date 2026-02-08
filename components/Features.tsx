import React from "react";
import ServiceCard from "./FeatureCard";
import { FaGlobe, FaChartLine, FaClock, FaHandshake, FaMobileAlt, FaRocket } from "react-icons/fa";

const Services = () => {
const services = [
  {
    icon: FaGlobe,
    title: "Rank Higher on Google",
    description: "Local SEO that helps Houston customers find you before your competitors.",
  },
  {
    icon: FaChartLine,
    title: "Convert Visitors Into Leads",
    description: "Better messaging and layout so more people call, book, or submit your form.",
  },
  {
    icon: FaMobileAlt,
    title: "Mobile Optimized",
    description: "Most customers search on their phone. Your site will load fast and look sharp.",
  },
  {
    icon: FaRocket,
    title: "Get More Leads Automatically",
    description: "Lead capture systems that work 24/7 even when you're not available.",
  },
  {
    icon: FaClock,
    title: "Fast Updates and Support",
    description: "Quick changes, quick fixes, and direct communication. No delays.",
  },
  {
    icon: FaHandshake,
    title: "Simple Monthly Retainers",
    description: "No hourly billing. No surprises. Just consistent growth work every month.",
  },
];

  return (
    <section className="container mx-auto px-4 py-16 bg-lightBG dark:bg-darkBG transition-colors">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-lightText dark:text-darkText mb-4">
          What Queso Ventures Actually Does
        </h2>

        <p className="text-lg sm:text-xl md:text-2xl text-lightTextMuted dark:text-darkTextMuted font-light">
          SEO, GEO, and conversion improvements built to generate leads.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;