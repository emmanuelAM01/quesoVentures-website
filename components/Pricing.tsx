import { FaCheck } from "react-icons/fa";
import Reveal from "./Reveal";
import NicheCtaButton from "./NicheCtaButton";
import LavaLamp from "./LavaLamp";
import { SITE_COPY, type SiteCopy } from "./siteCopy";

/**
 * The price, on a card floating over the blob field.
 *
 * Centred type on flat cream read as a slide someone forgot to design. The
 * section is the moment the whole page has been walking toward, so it gets the
 * same treatment as the close: dark ground, live colour behind it, and a single
 * panel holding everything. The card does the containing that a bare centre
 * axis could not.
 */
export default function Pricing({
  copy = SITE_COPY.pricing,
}: {
  copy?: SiteCopy["pricing"];
}) {
  return (
    <section
      id="pricing"
      data-dark-section
      className="relative overflow-hidden scroll-mt-16"
    >
      <LavaLamp scrim={0.62} />

      <div className="relative container mx-auto px-4 py-28 sm:py-32">
        <Reveal>
          <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-[#14171D]/80 p-8 backdrop-blur-xl sm:p-12">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl tracking-tight text-[#F5F7FA]">
                {copy.heading}
              </h2>

              <p className="mt-6 text-6xl sm:text-7xl font-semibold tracking-tight text-white">
                {copy.amount}
                <span className="align-middle text-xl font-light text-white/50">
                  {" "}
                  {copy.period}
                </span>
              </p>

              <div className="mt-8 flex justify-center">
                <NicheCtaButton
                  message={copy.ctaPrefill}
                  label={copy.cta}
                  variant="onDark"
                />
              </div>
            </div>

            <ul className="mt-10 space-y-3.5 border-t border-white/10 pt-8">
              {copy.included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-darkButton/15 text-darkButton">
                    <FaCheck size={10} />
                  </span>
                  <span className="text-base font-light text-white/85">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-center text-sm font-light leading-relaxed text-white/45">
              {copy.terms}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
