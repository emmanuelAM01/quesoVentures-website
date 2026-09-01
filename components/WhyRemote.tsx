import NicheCtaButton from "components/NicheCtaButton";
import { SITE_COPY } from "components/siteCopy";
import { PAINT } from "components/livery";
import Glow from "components/Glow";

/**
 * The counterpart to WhyLocal, for cities outside the drive.
 *
 * WhyLocal answers "why is this page so specific about one corner of Texas."
 * This answers the question someone in another city actually has: does it
 * matter that these people are not down the street. Same dark card treatment
 * so the two read as the same aside in the same voice.
 */
export default function WhyRemote({ city }: { city: string }) {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <Glow
          color={PAINT.gialloOrion.hex}
          radius="rounded-3xl"
          lift={false}
          spread={520}
        >
          <div
            data-dark-section
            className="relative overflow-hidden rounded-3xl bg-inkLight p-8 sm:p-12"
          >
            <span
              className="absolute inset-x-0 top-0 h-1.5"
              style={{ backgroundColor: PAINT.gialloOrion.hex }}
            />

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light leading-snug text-[#F5F7FA] text-balance">
              Wondering whether it matters that I am not in {city}?
            </h2>

            <p className="mt-7 text-lg sm:text-xl font-light leading-relaxed text-[#B7C0C8]">
              It does not. I build the site, set up your Google profile, and
              structure everything so AI assistants recommend you by name. None
              of that requires me standing in your parking lot.
            </p>
            <p className="mt-5 text-lg sm:text-xl font-light leading-relaxed text-[#B7C0C8]">
              What changes is more calls and fewer drive-bys. You still get my
              direct number, you still talk to me instead of an account manager,
              and the price is the same either way.
            </p>

            {/* The report, not a phone call. Every call the published number
              has produced has been spam, and this block sits on a page someone
              reached by scanning a card, so asking them to dial is the highest
              friction thing on the page. */}
          <div className="mt-9">
            <NicheCtaButton
              from="why_remote"
              variant="onDark"
              message={SITE_COPY.audit.ctaPrefill}
              label={SITE_COPY.audit.cta}
            />
          </div>
          </div>
        </Glow>
      </div>
    </section>
  );
}
