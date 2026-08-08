import { BUSINESS } from "components/businessInfo";
import CallLink from "components/CallLink";
import { PAINT } from "components/livery";
import Glow from "components/Glow";

/**
 * Appears only on the local pages, never on the homepage or /services.
 *
 * People who find this site through search want the local specificity. People
 * who type the domain off a business card in Fort Worth or Miami land on the
 * neutral pages and never see a Kingwood reference. This is here for the
 * overlap: someone from out of the area who clicked through to a city page and
 * is now wondering whether this company only works one suburb of Houston.
 *
 * Rendered as a dark card so it reads as an aside in a different voice — a note
 * from a person — rather than another cream section of marketing copy.
 */
export default function WhyLocal() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <Glow color={PAINT.gialloOrion.hex} radius="rounded-3xl" lift={false} spread={520}>
        <div
          data-dark-section
          className="relative overflow-hidden rounded-3xl bg-inkLight p-8 sm:p-12"
        >
          <span
            className="absolute inset-x-0 top-0 h-1.5"
            style={{ backgroundColor: PAINT.gialloOrion.hex }}
          />

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light leading-snug text-[#F5F7FA] text-balance">
            Wondering why this page is so specific about one corner of Texas?
          </h2>

          <p className="mt-7 text-lg sm:text-xl font-light leading-relaxed text-[#B7C0C8]">
            Because that is the job. If a page does not name the place, it does
            not rank for the place, and the business owner three miles away
            never finds it. I build these for my own backyard first because I
            can be standing in your shop in twenty minutes.
          </p>
          <p className="mt-5 text-lg sm:text-xl font-light leading-relaxed text-[#B7C0C8]">
            The work travels. I already have clients from Conroe and The
            Woodlands out to Fort Worth and Miami. If you are outside Northeast
            Houston, the method is identical, there are just more calls and
            fewer drive-bys. Same price either way.
          </p>

          <CallLink
            from="why_local"
            className="mt-9 inline-flex items-center gap-2 rounded-xl bg-darkButton hover:bg-darkButtonHover px-6 py-3.5 text-lg font-semibold text-darkBG transition-colors"
          >
            Call {BUSINESS.phone}
          </CallLink>
        </div>
        </Glow>
      </div>
    </section>
  );
}
