import React from "react";
import { FaGlobe, FaChartLine, FaArrowTrendUp } from "react-icons/fa6";
import Reveal from "./Reveal";
import { liveryAt } from "./livery";
import Glow from "./Glow";
import { SITE_COPY, type SiteCopy } from "./siteCopy";

/** Paired with `copy.cards` by index. Words live in siteCopy.ts. */
const ICONS = [FaGlobe, FaChartLine, FaArrowTrendUp];

export default function Features({
  copy = SITE_COPY.outcomes,
}: {
  copy?: SiteCopy["outcomes"];
}) {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-lightText dark:text-darkText mb-3">
            {copy.heading}
          </h2>
          <p className="text-lg sm:text-xl text-lightTextMuted dark:text-darkTextMuted font-light">
            {copy.sub}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mt-12">
          {copy.cards.map((card, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={card.title} delay={i * 120}>
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
                        {card.title}
                      </h3>
                      <p className="text-lg text-lightTextMuted dark:text-darkTextMuted font-light leading-relaxed">
                        {card.body}
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
}
