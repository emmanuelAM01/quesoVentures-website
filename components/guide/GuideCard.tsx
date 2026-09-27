import Image from "next/image";
import Link from "next/link";
import { liveryAt } from "components/livery";
import type { GuideCard as Card } from "lib/guide/queries";
import { guideImageUrl } from "lib/guide/supabase";

/**
 * One entry in a grid, set like a magazine rather than a card: the photograph,
 * then the words on the page ground under it, with no box around either.
 * Pointing at it slowly pushes into the photograph and draws the category's
 * line across its foot.
 *
 * The line's colour follows the category, not the position, so the same trade
 * always wears the same paint and nothing about an entry's colour reads as a
 * rank.
 */
export default function GuideCard({ entry, paintIndex }: { entry: Card; paintIndex: number }) {
  const paint = liveryAt(paintIndex);
  const src = guideImageUrl(entry.hero_image_path);
  return (
    <Link href={entry.path} className="group block focus:outline-none">
      <article>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-bandLight dark:bg-bandDark">
          {src ? (
            <Image
              src={src}
              alt={entry.hero_image_alt || entry.business_name}
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
          ) : null}
          <span
            aria-hidden
            className="absolute bottom-0 left-0 h-1 w-0 transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full group-focus-visible:w-full"
            style={{ background: paint.hex }}
          />
        </div>
        <p
          className="mt-5 text-sm font-medium text-[color:var(--paint-ink)] dark:text-[color:var(--paint)]"
          style={{ "--paint": paint.hex, "--paint-ink": paint.ink } as React.CSSProperties}
        >
          {entry.category.name}
          {entry.area || entry.city.name ? ` in ${entry.area || entry.city.name}` : ""}
        </p>
        <h3 className="mt-2 text-2xl font-light tracking-tight text-lightText transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 dark:text-darkText">
          {entry.business_name}
        </h3>
        {entry.dek ? (
          <p className="mt-2 text-base font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">
            {entry.dek}
          </p>
        ) : null}
      </article>
    </Link>
  );
}
