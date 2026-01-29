import React from "react";
import ServiceCard from "./FeatureCard";
import { FaGlobe, FaChartLine, FaClock, FaHandshake, FaMobileAlt, FaRocket } from "react-icons/fa";

const Services = () => {
  const services = [
    {
      icon: FaGlobe,
      title: "Look Professional Online",
      description: "People check your website before they call. Make a strong first impression that builds trust.",
    },
    {
      icon: FaChartLine,
      title: "Compete With Bigger Companies",
      description: "Modern features without enterprise costs. Booking, forms, or sales built in.",
    },
    {
      icon: FaMobileAlt,
      title: "Works Perfectly on Phones",
      description: "Your site looks great on every screen, so you never lose mobile customers.",
    },
    {
      icon: FaRocket,
      title: "Capture Leads Automatically",
      description: "Forms and systems that collect inquiries even when you’re offline.",
    },
    {
      icon: FaClock,
      title: "Fast, Reliable Support",
      description: "US based. Quick responses. Changes handled without delays.",
    },
    {
      icon: FaHandshake,
      title: "Clear Pricing Upfront",
      description: "One quote. No hourly billing. No surprise invoices.",
    },
  ];


  return (
<section className="container mx-auto px-4 py-16 bg-lightBG dark:bg-darkBG transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-lightText dark:text-darkText mb-4">
  Why This Matters for Your Business
</h2>

<p className="mt-6 text-xl text-lightTextMuted dark:text-darkTextMuted font-light">
  Practical benefits that help you get more customers
</p>

        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;