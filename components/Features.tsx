import React from "react";
import ServiceCard from "./FeatureCard";
import { FaGlobe, FaChartLine, FaClock, FaHandshake, FaMobileAlt, FaRocket } from "react-icons/fa";

const Services = () => {
  const services = [
    {
      icon: FaGlobe,
      title: "Look Legitimate Online",
      description: "People Google you before they buy. Give them a professional site that makes them trust you enough to pick up the phone.",
    },
    {
      icon: FaChartLine,
      title: "Compete With the Big Guys",
      description: "Your competitors have websites. Some have online booking and e-commerce. You should too. Level the playing field without the enterprise budget.",
    },
    {
      icon: FaMobileAlt,
      title: "Reach Customers on Their Phones",
      description: "Most people browse on their phone. Your site will look perfect on every screen size, so you don't lose customers to a broken mobile experience.",
    },
    {
      icon: FaRocket,
      title: "Stop Losing Leads",
      description: "Capture inquiries 24/7 with contact forms, booking systems, or online sales. Make money while you sleep instead of missing calls after hours.",
    },
    {
      icon: FaClock,
      title: "I'm Here When You Need Me",
      description: "Based in the US, working your hours. Questions answered fast, changes made quickly. No offshore delays or timezone headaches.",
    },
    {
      icon: FaHandshake,
      title: "Clear Price, No Surprises",
      description: "One flat price quoted upfront. You know exactly what you're paying before we start. No hourly billing, no surprise invoices at the end.",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-200 rounded-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-4">
            Why Your Business Needs This
          </h2>
          <p className="mt-8 text-xl text-gray-600 dark:text-gray-300 font-light">
            Real benefits that help you grow, compete, and win more customers
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