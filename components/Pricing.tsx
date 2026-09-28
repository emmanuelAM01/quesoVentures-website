import Reveal from "./Reveal";
import NicheCtaButton from "./NicheCtaButton";
import LavaLamp from "./LavaLamp";
import { houseAt, houseGradient } from "./livery";
import { SITE_COPY, type SiteCopy } from "./siteCopy";

/**
 * The price, as a full screen spread over the blob field.
 *
 * The section the whole page has been walking toward. It was a frosted card
 * floating in the middle; now it is set the way the About page sets its
 * years: the heading, the house rule, then the amount in the thin display
 * weight at the size of a chapter's year, with the one way forward under it.
 * What the price includes runs down the other half as rows between hairlines,
 * each with a short line of house paint where a tick used to be.
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
      className="relative flex min-h-[100svh] scroll-mt-16 items-center overflow-hidden"
    >
      <LavaLamp scrim={0.66} />

      <div className="relative w-full">
        <div className="container mx-auto px-4 py-28 sm:py-32">
          <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <h2 className="text-4xl sm:text-5xl xl:text-6xl font-light leading-[1.05] tracking-tight text-balance text-white">
                {copy.heading}
              </h2>
              <span
                aria-hidden
                className="mt-8 block h-1 w-24 rounded-full"
                style={{ backgroundImage: houseGradient() }}
              />
              <p className="mt-10 flex items-baseline gap-4 text-white">
                <span className="text-[6.5rem] font-extralight leading-[0.85] tracking-tighter tabular-nums sm:text-[8rem] xl:text-[10rem]">
                  {copy.amount}
                </span>
                <span className="text-xl font-light text-white/55">{copy.period}</span>
              </p>
              <div className="mt-12">
                <NicheCtaButton
                  from="hero"
                  variant="arrow"
                  tone="dark"
                  message={copy.ctaPrefill}
                  label={copy.cta}
                />
              </div>
            </Reveal>

            <Reveal delay={150}>
              <ul className="border-b border-white/15">
                {copy.included.map((item, i) => (
                  <li key={item} className="flex items-start gap-5 border-t border-white/15 py-5">
                    <span
                      aria-hidden
                      className="mt-[0.8rem] h-[2px] w-6 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: houseAt(i, copy.included.length) }}
                    />
                    <span className="text-lg font-light leading-relaxed text-white/85">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm font-light leading-relaxed text-white/50">{copy.terms}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
