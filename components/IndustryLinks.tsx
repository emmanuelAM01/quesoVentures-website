import Link from "next/link";
import ArrowMark, { arrowTone } from "./ArrowMark";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { LISTED_INDUSTRIES } from "./serviceAreas";
import { houseAt, houseGradient } from "./livery";
import NicheCtaButton from "./NicheCtaButton";

interface Props {
  /** Slug of the page this renders on, so it isn't listed against itself. */
  current?: string;
  heading?: string;
}

/**
 * Who I build for, as an index rather than a wall of cards.
 *
 * Twelve boxed cards read as a catalogue. As rows between hairlines, two
 * columns on desktop, it reads like a contents page: the trade large and
 * light, its line under it, and the circled arrow that every link on these
 * pages carries. Pointing at a row sweeps its line across in its colour down
 * the house ramp, and the arrow fills.
 *
 * The last row is always the open one, and it is a call to action: across the
 * full width and centred when it would otherwise sit alone.
 */
export default function IndustryLinks({ current, heading }: Props) {
  // Guard on `current` being set. Without it, `undefined !== undefined` is
  // false and every industry that has no page of its own gets filtered out.
  const shown = LISTED_INDUSTRIES.filter((i) => !current || i.slug !== current);
  /*
    With the open row the list is shown.length + 1 long. Odd, and the open
    row would sit alone in the left column, so it takes the whole width and
    becomes the call to action it is. Even, and it keeps its cell, still set
    as the call to action.
  */
  const alone = (shown.length + 1) % 2 === 1;

  return (
    <section className="container mx-auto px-4 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading sub="If your customers find you by searching, you're on this list.">
            {heading ?? "Who I build for"}
          </SectionHeading>
        </Reveal>

        <ul className="mt-14 grid md:grid-cols-2 md:gap-x-16">
          {shown.map((row, i) => (
            <li key={row.label} className="border-t border-lightText/15 dark:border-darkText/15">
              <Link
                href={row.slug ?? "/services"}
                className={`${arrowTone("light")} relative w-full justify-between gap-6 py-6`}
              >
                <span
                  aria-hidden
                  className="absolute -top-px left-0 h-[2px] w-0 transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full group-focus-visible:w-full"
                  style={{ backgroundColor: houseAt(i, shown.length) }}
                />
                <span className="min-w-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5">
                  <span className="block text-2xl font-light tracking-tight text-lightText dark:text-darkText">
                    {row.label}
                  </span>
                  <span className="mt-1 block text-base font-light text-lightTextMuted dark:text-darkTextMuted">
                    {row.tagline}
                  </span>
                </span>
                <ArrowMark size="sm" />
              </Link>
            </li>
          ))}

          {/*
            The open row. The list must never read as a closed set, and this is
            where someone who did not find their trade says so, so it opens the
            contact form rather than linking away.
          */}
          <li
            className={`border-t border-lightText/15 dark:border-darkText/15 ${
              alone ? "md:col-span-2" : ""
            }`}
          >
            <div
              className={
                alone
                  ? "flex flex-col items-center py-16 text-center sm:py-20"
                  : "flex flex-col items-start py-6"
              }
            >
              {alone && (
                <span
                  aria-hidden
                  className="mb-9 block h-1 w-24 rounded-full"
                  style={{ backgroundImage: houseGradient() }}
                />
              )}
              <p
                className={`font-light tracking-tight text-lightText dark:text-darkText ${
                  alone ? "text-4xl sm:text-5xl" : "text-2xl"
                }`}
              >
                And plenty more
              </p>
              <p
                className={`font-light text-lightTextMuted dark:text-darkTextMuted ${
                  alone ? "mt-5 max-w-xl text-xl" : "mt-1 text-base"
                }`}
              >
                This list grows every month. Don&apos;t see your trade?
              </p>
              <div className={alone ? "mt-10" : "mt-5"}>
                <NicheCtaButton
                  from="industries"
                  variant="arrow"
                  label="Ask me"
                  message="I didn't see my trade on your list. My business is: "
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
