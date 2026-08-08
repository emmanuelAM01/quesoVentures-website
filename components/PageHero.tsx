import Image from "next/image";
import NicheCtaButton from "components/NicheCtaButton";
import { BUSINESS } from "components/businessInfo";
import CallLink from "components/CallLink";

interface Props {
  /**
   * Keep this under ~34 characters. It is sized to sit on a single line on
   * desktop, and anything longer breaks that.
   */
  headline: string;
  prefill: string;
  ctaLabel?: string;
  /**
   * Optional hero image — a photo of the work for an industry page, a map for
   * a city page. Drop a file in /public and pass the path; the layout switches
   * from centred type to a split automatically.
   */
  image?: { src: string; alt: string };
}

export default function PageHero({
  headline,
  prefill,
  ctaLabel = "See What I'd Build",
  image,
}: Props) {
  const actions = (
    <div
      className={`mt-10 flex flex-col sm:flex-row items-center gap-5 ${
        image ? "sm:justify-start" : "sm:justify-center"
      }`}
    >
      <NicheCtaButton message={prefill} label={ctaLabel} />
      <CallLink
        from="hero"
        className="text-lg font-semibold text-lightText dark:text-darkText hover:opacity-70 transition-opacity whitespace-nowrap"
      >
        or call {BUSINESS.phone}
      </CallLink>
    </div>
  );

  if (image) {
    return (
      <section className="relative min-h-[88vh] flex items-center px-4">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center pt-28 pb-16">
            <div>
              <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl tracking-tight text-lightText dark:text-darkText text-balance">
                {headline}
              </h1>
              {actions}
            </div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-lightBorder dark:border-darkBorder">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center px-4">
      <div className="max-w-5xl mx-auto text-center pt-28 pb-16">
        {/* Sized so a ~34 character headline holds one line from lg up. */}
        <h1 className="font-sans text-4xl sm:text-5xl xl:text-6xl tracking-tight text-lightText dark:text-darkText xl:whitespace-nowrap">
          {headline}
        </h1>
        {actions}
      </div>
    </section>
  );
}
