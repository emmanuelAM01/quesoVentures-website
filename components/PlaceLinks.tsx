import Link from "next/link";
import { CITIES, cityOf, type PrimaryCity } from "components/places";
import { houseAt } from "components/livery";

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

  const links = [
    ...(!isMetro ? [{ href: city.slug, name: `All of ${city.name}`, hub: true }] : []),
    ...towns.map((t) => ({ href: t.slug, name: t.name, hub: false })),
  ];

  return (
    <section className="border-t border-lightBorder dark:border-darkBorder">
      <div className="container mx-auto px-4 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[minmax(0,16rem),1fr] md:gap-12">
          <h2 className="text-2xl font-light tracking-tight text-lightText dark:text-darkText md:pt-1">
            {isMetro ? `Across ${city.name}` : `Elsewhere in ${city.name}`}
          </h2>

          <ul className="-my-1.5 flex flex-wrap gap-x-9 gap-y-2">
            {links.map((l, i) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`group relative inline-block py-1.5 text-2xl tracking-tight text-lightText transition-colors dark:text-darkText ${
                    l.hub ? "font-normal" : "font-light text-lightTextMuted hover:text-lightText dark:text-darkTextMuted dark:hover:text-darkText"
                  }`}
                >
                  {l.name}
                  {/* The house line draws in under the name on hover; the hub keeps its line. */}
                  <span
                    aria-hidden
                    className={`absolute bottom-0 left-0 h-[2px] rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      l.hub ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                    style={{ backgroundColor: houseAt(i, links.length) }}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
