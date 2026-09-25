import Image from "next/image";
import Glow from "components/Glow";
import { liveryAt } from "components/livery";
import type { GuideCard as Card } from "lib/guide/queries";
import { guideImageUrl } from "lib/guide/supabase";

/**
 * One entry in a grid. The stripe colour follows the category, not the
 * position, so the same trade always wears the same paint and nothing about a
 * card's colour can read as a rank.
 */
export default function GuideCard({ entry, paintIndex }: { entry: Card; paintIndex: number }) {
  const paint = liveryAt(paintIndex);
  const src = guideImageUrl(entry.hero_image_path);
  return (
    <Glow color={paint.hex} radius="rounded-3xl" href={entry.path}>
      <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-lightBorder bg-panelLight dark:border-darkBorder dark:bg-panelDark">
        <div className="relative aspect-[4/3] w-full bg-bandLight dark:bg-bandDark">
          {src ? (
            <Image
              src={src}
              alt={entry.hero_image_alt || entry.business_name}
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          ) : null}
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-1" style={{ background: paint.hex }} />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="text-sm font-medium" style={{ color: paint.ink }}>
            {entry.category.name}
            {entry.area || entry.city.name ? ` in ${entry.area || entry.city.name}` : ""}
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-lightText dark:text-darkText">
            {entry.business_name}
          </h3>
          {entry.dek ? (
            <p className="mt-3 text-base font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">
              {entry.dek}
            </p>
          ) : null}
        </div>
      </article>
    </Glow>
  );
}
