import GuideCard from "components/guide/GuideCard";
import type { GuideCard as Card } from "lib/guide/queries";

/**
 * A collection, in the order it was published. There is deliberately no
 * numbering and no sort by anything that could be read as quality.
 */
export default function GuideGrid({
  entries,
  categoryOrder,
  empty = "Nothing here yet.",
}: {
  entries: Card[];
  /** Category ids in their set order, so each trade keeps one paint everywhere. */
  categoryOrder: string[];
  empty?: string;
}) {
  if (!entries.length) {
    return (
      <p className="rounded-3xl border border-dashed border-lightBorder p-10 text-center text-lg font-light text-lightTextMuted dark:border-darkBorder dark:text-darkTextMuted">
        {empty}
      </p>
    );
  }
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map((e) => (
        <li key={e.id}>
          <GuideCard entry={e} paintIndex={Math.max(0, categoryOrder.indexOf(e.category.id))} />
        </li>
      ))}
    </ul>
  );
}
