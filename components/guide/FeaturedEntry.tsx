import Image from "next/image";
import Glow from "components/Glow";
import type { Paint } from "components/livery";
import type { GuideCard } from "lib/guide/queries";
import { guideImageUrl } from "lib/guide/supabase";

/**
 * The newest entry, held in the guide hero the way the homepage hero holds its
 * search demo: a white panel floating on the blob field, so the first thing on
 * the page is a real business rather than a description of the guide.
 *
 * "Newest" and not "featured": nothing in the guide is ranked, and a card that
 * called itself the pick would say otherwise.
 */
export default function FeaturedEntry({ entry, paint }: { entry: GuideCard; paint: Paint }) {
  const src = guideImageUrl(entry.hero_image_path);
  return (
    <Glow color={paint.hex} radius="rounded-3xl" href={entry.path} spread={420}>
      <article className="relative overflow-hidden rounded-3xl bg-panelLight shadow-2xl shadow-black/40 dark:bg-panelDark">
        <div className="relative aspect-[16/11] w-full bg-bandLight dark:bg-bandDark">
          {src ? (
            <Image
              src={src}
              alt={entry.hero_image_alt || entry.business_name}
              fill
              priority
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover"
            />
          ) : null}
          <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1.5 text-sm font-medium text-white backdrop-blur">
            Newest in the guide
          </span>
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-1.5" style={{ background: paint.hex }} />
        </div>
        <div className="p-6 sm:p-7">
          <p className="text-sm font-semibold" style={{ color: paint.ink }}>
            {entry.category.name} in {entry.area || entry.city.name}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-lightText dark:text-darkText sm:text-3xl">
            {entry.business_name}
          </h2>
          {entry.dek ? (
            <p className="mt-3 text-base font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted sm:text-lg">
              {entry.dek}
            </p>
          ) : null}
          <p className="mt-5 inline-flex items-center gap-2 text-base font-semibold text-lightAccent dark:text-darkAccent">
            Read the entry
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </p>
        </div>
      </article>
    </Glow>
  );
}
