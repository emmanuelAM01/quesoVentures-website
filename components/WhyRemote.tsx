import NicheCtaButton from "components/NicheCtaButton";
import Reveal from "components/Reveal";
import SectionHeading from "components/SectionHeading";
import { SITE_COPY } from "components/siteCopy";

/**
 * The counterpart to WhyLocal, for cities outside the drive.
 *
 * This answers the question someone in another city actually has: does it
 * matter that these people are not down the street. Set as a spread, the
 * question on the left at heading size and the answer on the right, rather
 * than as a dark card; the page already has its dark moments.
 */
export default function WhyRemote({ city }: { city: string }) {
  return (
    <section className="container mx-auto px-4 py-28 sm:py-36">
      <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <SectionHeading>Wondering whether it matters that I am not in {city}?</SectionHeading>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-xl font-light leading-relaxed text-lightText/85 dark:text-darkText/85">
            It does not. I build the site, set up your Google profile, and
            structure everything so AI assistants recommend you by name. None
            of that requires me standing in your parking lot.
          </p>
          <p className="mt-5 text-lg font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">
            What changes is more calls and fewer drive-bys. You still get my
            direct number, you still talk to me instead of an account manager,
            and the price is the same either way.
          </p>

          {/* The report, not a phone call. Every call the published number
              has produced has been spam, and this block sits on a page someone
              reached by scanning a card, so asking them to dial is the highest
              friction thing on the page. */}
          <div className="mt-10">
            <NicheCtaButton
              from="why_remote"
              variant="arrow"
              message={SITE_COPY.audit.ctaPrefill}
              label={SITE_COPY.audit.cta}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
