import HeroBackdrop from "components/HeroBackdrop";
import NicheCtaButton from "components/NicheCtaButton";
import LavaLamp from "components/LavaLamp";

interface Props {
  headline: string;
  /**
   * Rendered beside the copy instead of under it, which turns the hero from a
   * centred statement into a split. The homepage passes the search demo here.
   */
  aside?: React.ReactNode;
  /** One line under the headline. This is where the search terms live. */
  sub?: string;
  prefill: string;
  ctaLabel?: string;
  /** Small line under the buttons. Price, usually. */
  note?: string;
  /**
   * Full-bleed background photograph: the interchange for Houston, pines for
   * Kingwood. Drop a file in /public and pass the path. Without one the hero
   * falls back to the lava lamp, so a city page is never a blank cream screen
   * waiting on a photo.
   */
  image?: { src: string; alt: string };
}

/**
 * Every hero on the site, centred on one axis over a dark ground.
 *
 * Type is white in both cases — over a scrimmed photograph or over the blurred
 * blob field — so the layout never changes shape when a city finally gets its
 * picture.
 */
/**
 * Type over a photograph needs its own contrast, independent of the scrim.
 *
 * Kingwood is a bright sky over water; the mechanic shot is a dark engine bay.
 * A scrim heavy enough for the first flattens the second into mud. A shadow on
 * the glyphs themselves costs nothing on a dark image and saves a light one.
 */
const OVER_PHOTO = { textShadow: "0 2px 28px rgba(0,0,0,0.55)" };

export default function PageHero({
  headline,
  sub,
  prefill,
  ctaLabel = "Get My Free Report",
  note,
  image,
  aside,
}: Props) {
  const split = Boolean(aside);
  return (
    <section
      data-dark-section
      className="relative -mt-[76px] flex min-h-[92vh] items-center overflow-hidden pt-[76px]"
    >
      {image ? (
        <HeroBackdrop src={image.src} alt={image.alt} />
      ) : (
        <LavaLamp scrim={0.5} />
      )}

      <div className="relative container mx-auto px-4 pb-20 pt-32">
        <div
          className={
            split
              ? "mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-10"
              : "mx-auto max-w-3xl text-center"
          }
        >
          <div>
            <h1
              style={image ? OVER_PHOTO : undefined}
              className={`font-sans tracking-tight text-balance text-white ${
                split
                  ? "text-4xl sm:text-5xl lg:text-6xl"
                  : "text-4xl sm:text-6xl lg:text-7xl"
              }`}
            >
              {headline}
            </h1>

            {sub && (
              <p
                style={image ? OVER_PHOTO : undefined}
                className={`mt-7 text-xl sm:text-2xl font-light leading-relaxed text-white/85 ${
                  split ? "max-w-xl" : "mx-auto max-w-xl"
                }`}
              >
                {sub}
              </p>
            )}

            {/*
              One button. Nothing beside it.

              "or call" sat here as a second, quieter CTA and it was the same
              mistake the navbar was making: two destinations at the moment of
              highest intent, one of which routes to a phone that only rings
              with spam. The number is not hidden — it is in the footer under
              Support, which is where someone who already wants to talk goes
              looking for it.
            */}
            <div
              className={`mt-10 flex ${split ? "" : "justify-center"}`}
            >
              <NicheCtaButton message={prefill} label={ctaLabel} variant="onDark" />
            </div>

            {note && (
              <p className="mt-6 text-base font-light text-white/60">{note}</p>
            )}
          </div>

          {aside && <div className="lg:pl-6">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
