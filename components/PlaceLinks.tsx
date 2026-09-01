import Link from "next/link";
import { CITIES, cityOf, type PrimaryCity } from "components/places";

/**
 * The cluster block: a metro and the towns under it.
 *
 * On the metro page it is the list of neighbourhoods. On a neighbourhood page
 * it is the same list plus a link back up to the metro, which is what makes
 * the hub a hub — every child page links to it, so it accumulates the internal
 * authority instead of six sibling pages splitting it between them.
 *
 * Deliberately quiet. This is navigation and internal linking, not a section
 * anyone is meant to read, and it used to be seven cards standing between the
 * visitor and the call to action.
 */
export default function PlaceLinks({
  /** The page this renders on, so it is not listed against itself. */
  current,
  /**
   * Which metro to show when `current` is not itself in the tree. Trade pages
   * are metro-level and pass this, which is how "auto shops" ends up linking
   * to Kingwood without there being an auto-shops-in-Kingwood page.
   */
  scope,
}: {
  current: string;
  scope?: PrimaryCity;
}) {
  const city: PrimaryCity | undefined =
    CITIES.find((c) => c.slug === current) ?? cityOf(current) ?? scope;
  if (!city) return null;

  const isMetro = city.slug === current;
  const towns = city.neighborhoods.filter((n) => n.slug !== current);

  return (
    <section className="border-t border-lightBorder dark:border-darkBorder">
      <div className="container mx-auto px-4 py-14">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[minmax(0,14rem),1fr] md:gap-12">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-lightTextMuted dark:text-darkTextMuted md:pt-1">
            {isMetro ? `Across ${city.name}` : `Elsewhere in ${city.name}`}
          </h2>

          <div>
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {!isMetro && (
                <li>
                  <Link
                    href={city.slug}
                    className="text-lg font-semibold text-lightText underline decoration-gialloOrion decoration-2 underline-offset-[6px] transition-opacity hover:opacity-70 dark:text-darkText"
                  >
                    All of {city.name}
                  </Link>
                </li>
              )}
              {towns.map((n) => (
                <li key={n.slug}>
                  <Link
                    href={n.slug}
                    className="text-lg font-light text-lightText underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors hover:decoration-gialloOrion dark:text-darkText"
                  >
                    {n.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
