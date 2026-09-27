import Deck from "components/Deck";
import Reveal from "components/Reveal";
import SectionHeading from "components/SectionHeading";

/**
 * "Sound familiar?": the problems a page's reader recognises, as the deck the
 * About page deals by scroll. The cards' titles are whole sentences, so there
 * is no index beside the deck; it would only say each one twice.
 */
export default function PainDeck({
  items,
  heading = "Sound familiar?",
}: {
  items: { heading: string; body: string }[];
  heading?: string;
}) {
  return (
    <section className="container mx-auto px-4 py-24 sm:py-32 lg:py-0">
      <div className="mx-auto max-w-6xl">
        <Deck
          label={heading}
          index={false}
          cards={items.map((p) => ({ title: p.heading, body: p.body }))}
        >
          <Reveal>
            <SectionHeading>{heading}</SectionHeading>
          </Reveal>
        </Deck>
      </div>
    </section>
  );
}
