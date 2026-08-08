"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import { SERVICE_AREAS, FEATURED_INDUSTRIES } from "components/serviceAreas";
import { BUSINESS } from "components/businessInfo";
import CallLink from "components/CallLink";

const CLICKS_TO_TRIGGER = 3;

const columnHeading =
  "text-sm font-semibold text-lightText dark:text-darkText mb-4";
const columnLink =
  "block text-[15px] text-lightTextMuted dark:text-darkTextMuted hover:text-lightText dark:hover:text-darkText transition-colors py-1.5";

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
    <footer className="border-t border-lightBorder dark:border-darkBorder bg-panelLight dark:bg-panelDark text-lightText dark:text-darkText">
      <div className="container mx-auto px-4 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto">
          {/* No oversized phone number here. Every page already ends with a
              call CTA directly above the footer, and repeating it at 48px read
              as shouting the same thing twice. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
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
              {FEATURED_INDUSTRIES.map((industry) => (
                <Link key={industry.slug} href={industry.slug} className={columnLink}>
                  {industry.label}
                </Link>
              ))}
            </div>

            <div>
              <p className={columnHeading}>Areas</p>
              {SERVICE_AREAS.map((area) => (
                <Link key={area.slug} href={area.slug} className={columnLink}>
                  {area.city}
                </Link>
              ))}
            </div>

            <div>
              <p className={columnHeading}>Get in touch</p>
              <CallLink from="footer" className={columnLink} />
              <a href={BUSINESS.emailHref} className={`${columnLink} break-words`}>
                {BUSINESS.email}
              </a>
              <p className="text-[15px] text-lightTextMuted dark:text-darkTextMuted py-1.5">
                {BUSINESS.addressLine}
              </p>
              <Link href="/privacy" className={columnLink}>
                Privacy Policy
              </Link>
              <Link href="/terms" className={columnLink}>
                Terms &amp; Conditions
              </Link>

              <div className="flex items-center gap-4 mt-6">
                <a
                  href={BUSINESS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-lightTextMuted dark:text-darkTextMuted hover:text-lightText dark:hover:text-darkText transition-colors"
                >
                  <AiOutlineInstagram size={24} />
                </a>
                <a
                  href={BUSINESS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="text-lightTextMuted dark:text-darkTextMuted hover:text-lightText dark:hover:text-darkText transition-colors"
                >
                  <AiOutlineYoutube size={24} />
                </a>
              </div>
            </div>
          </div>

          <div className="relative mt-14 pt-8 border-t border-lightBorder dark:border-darkBorder flex flex-col items-center gap-2 text-center">
            <p
              onClick={onCopyrightClick}
              className="cursor-default select-none text-[15px] text-lightTextMuted dark:text-darkTextMuted"
            >
              &copy; {currentYear} Queso Ventures LLC
            </p>
            {/* Every client site carries this line. So does this one. */}
            <Link
              href="/"
              className="text-[15px] font-semibold text-lightText dark:text-darkText hover:text-lightButton dark:hover:text-darkButton transition-colors"
            >
              Built By Queso Ventures
            </Link>
            {showMsg && (
              <p className="absolute left-1/2 -translate-x-1/2 -top-4 whitespace-nowrap text-sm text-lightTextMuted dark:text-darkTextMuted bg-lightBG dark:bg-darkBG border border-lightBorder dark:border-darkBorder rounded-full px-3 py-1.5 shadow-sm animate-fadeIn">
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
