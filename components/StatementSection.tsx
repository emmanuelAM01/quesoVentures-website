import Reveal from "components/Reveal";
import StatementCopy from "components/StatementCopy";
import { houseGradient } from "components/livery";

/**
 * The page's opening paragraph, straight after the hero.
 *
 * It used to be a dark band, which put two dark screens back to back under a
 * dark hero. On the page ground it reads as the first page of the book after
 * the cover: the house rule, the first sentence at display size, the rest
 * beneath it.
 */
export default function StatementSection({
  text,
  children,
}: {
  text: string;
  /** Anything that belongs under the statement, a postcode say. */
  children?: React.ReactNode;
}) {
  return (
    <section className="container mx-auto px-4 py-28 sm:py-40">
      <Reveal className="mx-auto max-w-4xl">
        <span
          aria-hidden
          className="mb-10 block h-1 w-24 rounded-full"
          style={{ backgroundImage: houseGradient() }}
        />
        <StatementCopy text={text} />
        {children}
      </Reveal>
    </section>
  );
}
