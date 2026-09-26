import Breadcrumbs from "components/guide/Breadcrumbs";
import LavaLamp from "components/LavaLamp";
import type { Crumb } from "lib/guide/jsonld";

/**
 * The top of every guide page that is not an article.
 *
 * The same hero vocabulary as the rest of the site: the blob field when there
 * is no photograph, light type in white, tucked under the sticky bar. It was a
 * flat ink strip, which read as a different, cheaper site the moment you
 * clicked from the homepage into the guide.
 *
 * `tall` is the full screen version, for the pages people arrive on first
 * (the guide home and the standards page). Hubs keep a shorter band so the
 * entries are above the fold.
 */
export default function GuideHeader({
  title,
  intro,
  trail,
  tall = false,
  aside,
  children,
}: {
  title: string;
  intro?: string;
  trail?: Crumb[];
  tall?: boolean;
  /** Rendered beside the copy from lg up, the way the homepage hero holds its demo. */
  aside?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section
      data-dark-section
      className={`relative -mt-[76px] flex overflow-hidden pt-[76px] ${
        tall ? "min-h-[82svh] items-center lg:min-h-[88vh]" : "min-h-[56svh] items-end"
      }`}
    >
      <LavaLamp scrim={0.55} />

      <div className={`relative container mx-auto px-4 ${tall ? "py-20 sm:py-28" : "pb-14 pt-20 sm:pb-20"}`}>
        <div
          className={`mx-auto max-w-6xl ${
            aside ? "grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16" : ""
          }`}
        >
          <div>
            {trail && trail.length > 1 ? <Breadcrumbs trail={trail} tone="dark" /> : null}
            <h1
              className={`max-w-4xl font-sans tracking-tight text-balance text-white ${
                trail && trail.length > 1 ? "mt-6" : ""
              } ${tall ? "text-5xl sm:text-6xl lg:text-7xl" : "text-4xl sm:text-6xl"}`}
            >
              {title}
            </h1>
            {intro ? (
              <p className="mt-7 max-w-2xl text-xl font-light leading-relaxed text-white/80 sm:text-2xl">
                {intro}
              </p>
            ) : null}
            {children}
          </div>
          {aside ? <div>{aside}</div> : null}
        </div>
      </div>
    </section>
  );
}
