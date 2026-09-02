"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import { LISTED_FEATURED } from "components/serviceAreas";
import { CITIES, ALL_NEIGHBORHOODS } from "components/places";
import { BUSINESS } from "components/businessInfo";
import CallLink from "components/CallLink";
import { PAINT } from "components/livery";

const CLICKS_TO_TRIGGER = 3;

// The footer is dark in both themes now, so these stop being theme-aware.
const columnHeading = "text-sm font-semibold text-[#F5F7FA] mb-4";
const columnLink =
  "block py-2.5 text-[15px] text-[#8A949E] transition-colors hover:text-[#F5F7FA]";
/**
 * Neither of these lists is the whole story, and the footer is now the only
 * place they appear. Nobody should scan six towns, miss theirs, and conclude
 * they aren't a fit.
 */
const columnTail = "block pt-2 text-[15px] italic text-[#6B747D]";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showMsg, setShowMsg] = useState(false);
  const clicks = useRef(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onCopyrightClick = () => {
    clicks.current += 1;
    if (clicks.current >= CLICKS_TO_TRIGGER) {
      setShowMsg(true);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => setShowMsg(false), 3000);
    }
  };

  return (
    <footer data-dark-section className="relative bg-inkLight text-[#F5F7FA]">
      {/*
        The house ramp, once, at the very bottom.

        Every card on the site wears one stripe of factory paint; this is the
        only place several appear together, so the last thing on the page is the
        signature rather than a horizontal rule. Deliberately only the warm end
        of the palette, run red to yellow — the full ten-paint spread reads as a
        rainbow rather than a livery, and red-to-yellow is already the gradient
        in the logo, the light bar and the scroll divider.
      */}
      <div aria-hidden className="flex h-1 w-full">
        {[
          PAINT.rossoCorsa,
          PAINT.rossoScuderia,
          PAINT.arancioXanto,
          PAINT.gialloOrion,
          PAINT.gialloModena,
        ].map((paint) => (
          <span
            key={paint.name}
            className="h-full flex-1"
            style={{ backgroundColor: paint.hex }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto">
          {/* No oversized phone number here. Every page already ends with a
              call CTA directly above the footer, and repeating it at 48px read
              as shouting the same thing twice. */}
          {/*
            Identity on the left, navigation on the right, and nothing else in
            either.

            The old shape had a column called "Get in touch" carrying a phone
            number, an email, a locality, two legal links and the social icons —
            five unrelated kinds of thing stacked to fill a column. That is why
            a line reading "Northeast Houston, TX" landed between an email
            address and a privacy policy and meant nothing. There are four
            columns again, but each one now answers a single question: what else
            is here, who is this for, where do you work, how do I reach you.
            Legal and social stay out of all four, on their own bar below.
          */}
          <div className="grid gap-12 lg:grid-cols-[minmax(0,20rem),1fr] lg:gap-16">
            <div>
              <Link href="/" className="-my-1.5 inline-flex items-center gap-2.5 py-1.5">
                <Image
                  src="/logo.png"
                  alt=""
                  width={28}
                  height={28}
                  className="object-contain"
                />
                <span className="text-lg font-medium text-[#F5F7FA]">
                  Queso Ventures
                </span>
              </Link>

              <p className="mt-5 max-w-xs text-[15px] font-light leading-relaxed text-[#8A949E]">
                Websites, SEO, and AI-SEO for Houston area businesses, built by
                a software engineer. Based in {BUSINESS.addressLine}.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-[repeat(3,minmax(0,1fr))_auto]">
              <div>
                <p className={columnHeading}>Company</p>
                <Link href="/services" className={columnLink}>
                  Services
                </Link>
                <Link href="/about" className={columnLink}>
                  About
                </Link>
                <Link href="/studios" className={columnLink}>
                  Studios
                </Link>
                <Link href="/contact" className={columnLink}>
                  Contact
                </Link>
              </div>

              <div>
                <p className={columnHeading}>Who I help</p>
                {LISTED_FEATURED.map((industry) => (
                  <Link key={industry.slug} href={industry.slug} className={columnLink}>
                    {industry.label}
                  </Link>
                ))}
                <span className={columnTail}>and plenty more</span>
              </div>

              <div>
                <p className={columnHeading}>Areas</p>
                {CITIES.map((city) => (
                  <Link key={city.slug} href={city.slug} className={columnLink}>
                    All of {city.name}
                  </Link>
                ))}
                {ALL_NEIGHBORHOODS.map((area) => (
                  <Link key={area.slug} href={area.slug} className={columnLink}>
                    {area.name}
                  </Link>
                ))}
                <span className={columnTail}>and wherever you are</span>
              </div>

              {/*
                The number gets a label now.

                Loose in the identity block it read as one more fact about the
                business, sitting between an address and an email. Headed
                "Support" it answers a question instead: someone already working
                with me, or already sold, knows this is the line to use. That is
                also the only place a phone number belongs on this site — the
                hero and the navbar are for people who have not decided yet, and
                every unqualified call so far has been spam.
              */}
              <div>
                <p className={columnHeading}>Support</p>
                <CallLink
                  from="footer"
                  className="block py-2.5 text-[15px] font-medium text-[#F5F7FA] transition-opacity hover:opacity-70"
                />
                <a
                  href={BUSINESS.emailHref}
                  className="block whitespace-nowrap py-2.5 text-[13px] text-[#8A949E] transition-colors hover:text-[#F5F7FA] sm:text-[15px]"
                >
                  {BUSINESS.email}
                </a>
              </div>
            </div>
          </div>

          <div className="relative mt-16 flex flex-col items-center gap-6 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[14px] text-[#6B747D]">
              <p
                onClick={onCopyrightClick}
                className="cursor-default select-none"
              >
                &copy; {currentYear} Queso Ventures LLC
              </p>
              <Link href="/privacy" className="py-2 transition-colors hover:text-[#F5F7FA]">
                Privacy
              </Link>
              <Link href="/terms" className="py-2 transition-colors hover:text-[#F5F7FA]">
                Terms
              </Link>
            </div>

            <div className="flex items-center gap-5">
              <a
                href={BUSINESS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="-m-2.5 flex h-10 w-10 items-center justify-center text-[#8A949E] transition-colors hover:text-[#F5F7FA]"
              >
                <AiOutlineInstagram size={20} />
              </a>
              <a
                href={BUSINESS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="-m-2.5 flex h-10 w-10 items-center justify-center text-[#8A949E] transition-colors hover:text-[#F5F7FA]"
              >
                <AiOutlineYoutube size={20} />
              </a>
              {/* Every client site carries this line. So does this one. */}
              <Link
                href="/"
                className="py-2 text-[14px] font-semibold text-[#F5F7FA] transition-colors hover:text-darkButton"
              >
                Built By Queso Ventures
              </Link>
            </div>

            {showMsg && (
              <p className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-inkLight px-3 py-1.5 text-sm text-[#8A949E] shadow-sm animate-fadeIn">
                clicking it that many times wont change it
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
