import Link from "next/link";
import ArrowMark, { arrowTone } from "./ArrowMark";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { LISTED_INDUSTRIES } from "./serviceAreas";
import { houseAt } from "./livery";

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
 * The last row is always the open one. The list must never read as a closed
 * set: nobody should scan it, miss their trade, and conclude they aren't a fit.
 */
export default function IndustryLinks({ current, heading }: Props) {
  // Guard on `current` being set. Without it, `undefined !== undefined` is
  // false and every industry that has no page of its own gets filtered out.
  const shown = LISTED_INDUSTRIES.filter((i) => !current || i.slug !== current);
  const rows = [
    ...shown.map((i) => ({ label: i.label, line: i.tagline, href: i.slug ?? "/services" })),
    {
      label: "And plenty more",
      line: "This list grows every month. Don’t see your trade? Ask me.",
      href: "/contact",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading sub="If your customers find you by searching, you're on this list.">
            {heading ?? "Who I build for"}
          </SectionHeading>
        </Reveal>

        <ul className="mt-14 grid md:grid-cols-2 md:gap-x-16">
          {rows.map((row, i) => (
            <li key={row.label} className="border-t border-lightText/15 dark:border-darkText/15">
              <Link
                href={row.href}
                className={`${arrowTone("light")} relative w-full justify-between gap-6 py-6`}
              >
                <span
                  aria-hidden
                  className="absolute -top-px left-0 h-[2px] w-0 transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full group-focus-visible:w-full"
                  style={{ backgroundColor: houseAt(i, rows.length) }}
                />
                <span className="min-w-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5">
                  <span className="block text-2xl font-light tracking-tight text-lightText dark:text-darkText">
                    {row.label}
                  </span>
                  <span className="mt-1 block text-base font-light text-lightTextMuted dark:text-darkTextMuted">
                    {row.line}
                  </span>
                </span>
                <ArrowMark size="sm" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
