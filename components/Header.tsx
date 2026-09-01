"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ThemeSwitch from "./ThemeSwitch";
import { LISTED_FEATURED } from "./serviceAreas";
import { CITIES, ALL_NEIGHBORHOODS } from "components/places";
import { BUSINESS } from "./businessInfo";
import CallLink from "./CallLink";
import NicheCtaButton from "./NicheCtaButton";
import { SITE_COPY } from "./siteCopy";

const navLinkClass =
  "relative text-[15px] font-medium text-lightText dark:text-darkText px-4 py-2 rounded-full transition-colors " +
  "after:content-[''] after:absolute after:left-4 after:right-4 after:bottom-1 after:h-[2px] " +
  "after:origin-left after:scale-x-0 after:transition-transform after:duration-200 " +
  "after:bg-lightAccent dark:after:bg-darkAccent hover:after:scale-x-100";

const mobileLinkClass =
  "block w-full text-left px-3 py-3.5 text-lg font-medium text-lightText dark:text-darkText rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors";

const dropdownHeadingClass =
  "mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-lightTextMuted dark:text-darkTextMuted";

const dropdownLinkClass =
  "block py-[7px] text-[15px] leading-snug text-lightTextMuted transition-colors " +
  "hover:text-lightText dark:text-darkTextMuted dark:hover:text-darkText";

function PhoneIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2Z" />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileWorkOpen, setMobileWorkOpen] = useState(false);
  const workRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 6);
      let over = false;
      document.querySelectorAll("[data-dark-section]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 76 && rect.bottom >= 32) over = true;
      });
      setOverDark(over);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (workRef.current && !workRef.current.contains(e.target as Node)) {
        setWorkOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full pt-3 px-3 sm:px-4",
        "transition-all duration-200",
        overDark ? "dark" : "",
      ].join(" ")}
    >
      <div className="container mx-auto">
        <div className="relative rounded-full">
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <div className="navbar-glow absolute inset-x-0 -top-4 h-10 blur-xl opacity-30 dark:opacity-15" />
            <div className="absolute inset-0 bg-headerLight dark:bg-headerDark backdrop-blur-md" />
          </div>

          <div
            className={[
              "absolute inset-0 rounded-full pointer-events-none transition-all duration-200",
              scrolled
                ? "ring-1 ring-lightBorder/90 dark:ring-darkBorder/90 shadow-md shadow-black/5 dark:shadow-black/20"
                : "ring-1 ring-lightBorder/60 dark:ring-darkBorder/60 shadow-sm shadow-black/5 dark:shadow-black/10",
            ].join(" ")}
          />

          {/* Three equal zones so the nav sits dead centre regardless of how
              wide the logo or the call button get. */}
          <div className="relative px-4 sm:px-6 h-16 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            <div className="flex items-center justify-start">
              <Link
                href="/"
                className="relative flex items-center gap-2 px-1 py-2 text-lg font-medium text-lightText dark:text-darkText transition-colors
                  after:content-[''] after:absolute after:left-1 after:right-1 after:bottom-1 after:h-[2px]
                  after:origin-left after:scale-x-0 after:transition-transform after:duration-200
                  after:bg-lightAccent dark:after:bg-darkAccent
                  hover:after:scale-x-100"
              >
                <Image
                  src="/logo.png"
                  alt="Queso Ventures logo"
                  width={26}
                  height={26}
                  className="object-contain"
                  priority={false}
                />
                <span className="hidden sm:inline">Queso Ventures</span>
              </Link>
            </div>

            {/* Desktop nav — centre zone */}
            <nav className="hidden md:flex items-center justify-center">
              <ul className="flex items-center space-x-1">
                <li>
                  <Link href="/services" className={navLinkClass}>
                    Services
                  </Link>
                </li>

                <li ref={workRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setWorkOpen((o) => !o)}
                    className={navLinkClass}
                    aria-expanded={workOpen}
                  >
                    Who I Help
                    <span
                      className={`ml-1 inline-block text-xs transition-transform duration-200 ${
                        workOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▾
                    </span>
                  </button>

                  {/* Always in the DOM, toggled with CSS. Mounting this
                      conditionally kept every link out of the server HTML,
                      which is why Google never crawled those pages.

                      Two labelled columns rather than two undifferentiated
                      stacks. Twelve links of identical weight on a dark slab
                      gave the eye nowhere to land and read as a wall; the
                      headings say what each column is, and dropping the hover
                      fills for a colour change takes the noise out. */}
                  <div
                    className={`${
                      workOpen ? "block" : "hidden"
                    } absolute left-1/2 top-full z-50 mt-3 w-[34rem] -translate-x-1/2 rounded-2xl border border-lightBorder bg-panelLight p-6 shadow-xl shadow-black/10 dark:border-darkBorder dark:bg-panelDark dark:shadow-black/40`}
                  >
                    <div className="grid grid-cols-2 gap-x-8">
                      <div>
                        <p className={dropdownHeadingClass}>By trade</p>
                        {LISTED_FEATURED.map((item) => (
                          <Link
                            key={item.slug}
                            href={item.slug}
                            onClick={() => setWorkOpen(false)}
                            className={dropdownLinkClass}
                          >
                            {item.label}
                          </Link>
                        ))}
                        {/* A link rather than dead italic text: /services is
                            the page that lists every trade, which is exactly
                            what someone who did not find theirs above wants. */}
                        <Link
                          href="/services"
                          onClick={() => setWorkOpen(false)}
                          className={`${dropdownLinkClass} italic`}
                        >
                          and many more
                        </Link>
                      </div>
                      <div>
                        <p className={dropdownHeadingClass}>By area</p>
                        {ALL_NEIGHBORHOODS.map((item) => (
                          <Link
                            key={item.slug}
                            href={item.slug}
                            onClick={() => setWorkOpen(false)}
                            className={dropdownLinkClass}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>

                <li>
                  <Link href="/about" className={navLinkClass}>
                    About
                  </Link>
                </li>

                <li>
                  <Link href="/studios" className={`${navLinkClass} font-semibold`}>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#C4161C] to-[#FFD100]" />
                      Studios
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Right zone.
                The pill used to be the phone number, on every page. Every call
                it produced was spam, so the most valuable button on the site
                was working for nobody. The form takes the pill; the number
                stays beside it as a quiet link, because a visible local number
                is still a trust signal and still has to match the Google
                Business Profile. */}
            <div className="hidden md:flex items-center justify-end gap-3">
              <NicheCtaButton
                from="header"
                variant="pill"
                message={SITE_COPY.audit.ctaPrefill}
                label="Free Report"
              />
              <ThemeSwitch />
            </div>

            {/* Mobile: the form is always one tap, outside the drawer. */}
            <div className="flex items-center justify-end gap-1 md:hidden">
              <NicheCtaButton
                from="header_mobile"
                variant="pill"
                message={SITE_COPY.audit.ctaPrefill}
                label="Free Report"
              />
              <ThemeSwitch />
              <button
                type="button"
                onClick={() => setMobileOpen((o) => !o)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                className="p-2 rounded-lg text-lightText dark:text-darkText hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                {mobileOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="md:hidden mt-2 rounded-3xl ring-1 ring-lightBorder/90 dark:ring-darkBorder/90 bg-panelLight dark:bg-panelDark shadow-xl overflow-hidden">
            <div className="px-4 py-3 flex flex-col gap-0.5">
              <Link href="/services" onClick={closeMobile} className={mobileLinkClass}>
                Services
              </Link>

              <div>
                <button
                  type="button"
                  onClick={() => setMobileWorkOpen((o) => !o)}
                  className={`${mobileLinkClass} flex items-center justify-between`}
                  aria-expanded={mobileWorkOpen}
                >
                  <span>Who I Help</span>
                  <span
                    className={`inline-block transition-transform duration-200 text-sm ${
                      mobileWorkOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▾
                  </span>
                </button>
                {mobileWorkOpen && (
                  <div className="pl-3 flex flex-col gap-0.5 mt-0.5 mb-1">
                    {LISTED_FEATURED.map((item) => (
                      <Link
                        key={item.slug}
                        href={item.slug}
                        onClick={closeMobile}
                        className="block px-3 py-2.5 text-base text-lightTextMuted dark:text-darkTextMuted rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                    {ALL_NEIGHBORHOODS.map((item) => (
                      <Link
                        key={item.slug}
                        href={item.slug}
                        onClick={closeMobile}
                        className="block px-3 py-2.5 text-base text-lightTextMuted dark:text-darkTextMuted rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/about" onClick={closeMobile} className={mobileLinkClass}>
                About
              </Link>

              <Link href="/studios" onClick={closeMobile} className={`${mobileLinkClass} font-semibold`}>
                <span className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#C4161C] to-[#FFD100]" />
                  Studios
                </span>
              </Link>

              <Link
                href="/contact"
                onClick={closeMobile}
                className={`${mobileLinkClass} text-lightButton dark:text-darkButton font-semibold`}
              >
                Contact
              </Link>

              {/* Reachable, not competing. */}
              <CallLink
                from="header_mobile"
                className={`${mobileLinkClass} flex items-center gap-2 text-lightTextMuted dark:text-darkTextMuted`}
              >
                <PhoneIcon size={14} />
                {BUSINESS.phone}
              </CallLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
