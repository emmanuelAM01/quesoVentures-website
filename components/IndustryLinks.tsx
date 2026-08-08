import { INDUSTRIES } from "./serviceAreas";
import { BUSINESS } from "./businessInfo";
import CallLink from "./CallLink";
import { liveryAt, OPEN_ENDED } from "./livery";
import LiveryCard from "./LiveryCard";

interface Props {
  /** Slug of the page this renders on, so it isn't listed against itself. */
  current?: string;
  heading?: string;
}

export default function IndustryLinks({
  current,
  heading = "Who I build for",
}: Props) {
  // Guard on `current` being set. Without it, `undefined !== undefined` is
  // false and every industry that has no page of its own gets filtered out —
  // which silently cut this grid from 12 cards to 5 on the homepage.
  const shown = INDUSTRIES.filter((i) => !current || i.slug !== current);

  // The open-ended card is always last, so where it lands depends on the count.
  // Alone on a row it reads like a leftover; centre it instead.
  const total = shown.length + 1;
  const lastRowOfThree = total % 3 === 0 ? 3 : total % 3;
  const placement = [
    total % 2 === 1 ? "sm:col-span-2" : "",
    lastRowOfThree === 1 ? "lg:col-span-1 lg:col-start-2" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className="container mx-auto px-4 py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-lightText dark:text-darkText mb-4">
          {heading}
        </h2>
        <p className="text-xl sm:text-2xl font-light text-lightTextMuted dark:text-darkTextMuted mb-12 max-w-3xl">
          If your customers find you by searching, you&apos;re on this list.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shown.map((item, i) => (
            <LiveryCard
              key={item.label}
              title={item.label}
              body={item.tagline}
              paint={liveryAt(i + 6)}
              href={item.slug ?? "/services"}
            />
          ))}

          {/* The list must never read as a closed set — nobody should scan it,
              miss their trade, and conclude they aren't a fit. */}
          <div className={placement}>
          <LiveryCard
            open
            paint={OPEN_ENDED}
            title="And plenty more"
            body={
              <>
                This list grows every month. Don&apos;t see your trade?{" "}
                <CallLink
                  from="industries"
                  className="font-semibold text-lightText dark:text-darkText underline underline-offset-4 decoration-gialloOrion decoration-2 hover:opacity-70 transition-opacity whitespace-nowrap"
                >
                  Call and ask.
                </CallLink>
              </>
            }
          />
          </div>
        </div>
      </div>
    </section>
  );
}
