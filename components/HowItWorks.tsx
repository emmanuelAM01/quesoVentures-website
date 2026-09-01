import Reveal from "./Reveal";
import { liveryAt } from "./livery";
import { SITE_COPY, type SiteCopy } from "./siteCopy";

/**
 * Deliberately not cards.
 *
 * This used to be three glowing panels sitting directly under three glowing
 * panels, which is what made the page read as endless — same shape twice, so
 * the eye counted it as one long block instead of two short ones. Same
 * information, a third of the height, and it breaks the rhythm.
 */
export default function HowItWorks({
  copy = SITE_COPY.steps,
}: {
  copy?: SiteCopy["steps"];
}) {
  return (
    <section
      id="how"
      className="border-y border-lightBorder dark:border-darkBorder bg-bandLight dark:bg-bandDark scroll-mt-16"
    >
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center">
            <h2 className="text-2xl sm:text-3xl text-lightText dark:text-darkText mb-10">
              {copy.heading}
            </h2>
          </Reveal>

          <ol className="grid gap-8 sm:grid-cols-3 sm:gap-10">
            {copy.items.map((step, i) => (
              <Reveal key={step.title} delay={i * 100}>
                <li className="flex gap-4">
                  <span
                    className="mt-1 h-8 w-8 shrink-0 rounded-full border-2 grid place-items-center text-sm font-semibold"
                    style={{
                      borderColor: liveryAt(i + 3).hex,
                      color: liveryAt(i + 3).ink,
                    }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-lightText dark:text-darkText">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-base font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">
                      {step.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
