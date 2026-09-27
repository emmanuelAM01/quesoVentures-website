import Reveal from "components/Reveal";
import SectionHeading from "components/SectionHeading";
import { houseAt } from "components/livery";

/**
 * "Here's what changes": what a page's reader gets, as an editorial list.
 *
 * It was four numbered cards. The numbers implied a sequence the items do not
 * have, and a column of boxed cards is the look the About page moved away
 * from. Now each item is a row between hairlines: the title large and light,
 * the explanation under it. The heading holds its place beside the rows on
 * desktop while they pass, like a chapter title in a margin.
 *
 * Pointing at a row sweeps its line across in its colour, which runs down the
 * house ramp from red to yellow, and nudges the title in.
 */
export default function ChangeList({
  items,
  heading = "Here’s what changes",
}: {
  items: { title: string; body: string }[];
  heading?: string;
}) {
  return (
    <section className="bg-bandLight dark:bg-bandDark">
      <div className="container mx-auto px-4 py-28 sm:py-36">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,5fr),minmax(0,7fr)] lg:gap-16">
          <div>
            <Reveal className="lg:sticky lg:top-32">
              <SectionHeading>{heading}</SectionHeading>
            </Reveal>
          </div>

          <ul className="border-b border-lightText/15 dark:border-darkText/15">
            {items.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={i * 90}>
                  <div className="group relative border-t border-lightText/15 py-9 dark:border-darkText/15">
                    <span
                      aria-hidden
                      className="absolute -top-px left-0 h-[2px] w-0 transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
                      style={{ backgroundColor: houseAt(i, items.length) }}
                    />
                    <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-balance text-lightText transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 dark:text-darkText">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-lg font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
