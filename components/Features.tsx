import React from "react";
import { FaGlobe, FaChartLine, FaHandshake } from "react-icons/fa";
import Reveal from "./Reveal";
import { liveryAt } from "./livery";
import Glow from "./Glow";

const services = [
  {
    icon: FaGlobe,
    title: "You Get Found",
    description:
      "Google, Maps, and AI search. When someone nearby looks for what you do, you're the one they see.",
  },
  {
    icon: FaChartLine,
    title: "Visitors Become Customers",
    description:
      "A fast, clear website that makes calling or booking you the obvious next step, especially on a phone.",
  },
  {
    icon: FaHandshake,
    title: "Simple Billing",
    description:
      "$300 a month covers it all. Website, Google, updates, and support. No hourly billing, no surprises.",
  },
];

const Services = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-lightText dark:text-darkText mb-3">
            What You Get
          </h2>
          <p className="text-lg sm:text-xl text-lightTextMuted dark:text-darkTextMuted font-light">
            Three things, done for you every month.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mt-12">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={i} delay={i * 120}>
                <Glow color={liveryAt(i).hex} radius="rounded-3xl" lift={false}>
                  <div className="relative h-full overflow-hidden rounded-3xl border border-lightBorder dark:border-darkBorder bg-panelLight dark:bg-panelDark">
                    <span
                      className="absolute inset-x-0 top-0 h-1.5"
                      style={{ backgroundColor: liveryAt(i).hex }}
                    />
                    <div className="p-8 pt-10">
                    <span
                      className="inline-flex h-12 w-12 items-center justify-center rounded-xl mb-5"
                      style={{
                        backgroundColor: `${liveryAt(i).hex}1A`,
                        color: liveryAt(i).ink,
                      }}
                    >
                      <Icon size={22} />
                    </span>
                    <h3 className="text-xl font-semibold mb-2 text-lightText dark:text-darkText">
                      {service.title}
                    </h3>
                    <p className="text-lg text-lightTextMuted dark:text-darkTextMuted font-light leading-relaxed">
                      {service.description}
                    </p>
                    </div>
                  </div>
                </Glow>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
