"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ThemeSwitch from "./ThemeSwitch";
import { SERVICE_AREAS, FEATURED_INDUSTRIES } from "./serviceAreas";
import { BUSINESS } from "./businessInfo";
import CallLink from "./CallLink";

const navLinkClass =
  "relative text-[15px] font-medium text-lightText dark:text-darkText px-4 py-2 rounded-full transition-colors " +
  "after:content-[''] after:absolute after:left-4 after:right-4 after:bottom-1 after:h-[2px] " +
  "after:origin-left after:scale-x-0 after:transition-transform after:duration-200 " +
  "after:bg-lightAccent dark:after:bg-darkAccent hover:after:scale-x-100";

const mobileLinkClass =
  "block w-full text-left px-3 py-3.5 text-lg font-medium text-lightText dark:text-darkText rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors";

const callPillClass =
  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[15px] font-semibold " +
  "bg-lightButton hover:bg-lightButtonHover dark:bg-darkButton dark:hover:bg-darkButtonHover " +
  "text-lightBG dark:text-darkBG transition-colors whitespace-nowrap";

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
            <div className="absolute inset-0 bg-cheese-header-light dark:bg-cheese-header-dark backdrop-blur-md" />
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
                      which is why Google never crawled those pages. */}
                  <div
                    className={`${
                      workOpen ? "block" : "hidden"
                    } absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[36rem] rounded-2xl border border-lightBorder dark:border-darkBorder bg-panelLight dark:bg-panelDark shadow-xl shadow-black/10 dark:shadow-black/40 p-3 z-50`}
                  >
                    <div className="grid grid-cols-2 gap-2">
                      <div className="pr-2 border-r border-lightBorder dark:border-darkBorder">
                        {FEATURED_INDUSTRIES.map((item) => (
                          <Link
                            key={item.slug}
                            href={item.slug}
                            onClick={() => setWorkOpen(false)}
                            className="block rounded-lg px-3 py-2 text-[15px] leading-tight text-lightText dark:text-darkText hover:bg-lightAccent/10 dark:hover:bg-darkAccent/10 transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                      <div>
                        {SERVICE_AREAS.map((item) => (
                          <Link
                            key={item.slug}
                            href={item.slug}
                            onClick={() => setWorkOpen(false)}
                            className="block rounded-lg px-3 py-2 text-[15px] leading-tight text-lightText dark:text-darkText hover:bg-lightAccent/10 dark:hover:bg-darkAccent/10 transition-colors"
                          >
                            {item.city}
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

            {/* Right zone */}
            <div className="hidden md:flex items-center justify-end gap-2">
              <CallLink from="header" className={callPillClass}>
                <PhoneIcon />
                {BUSINESS.phone}
              </CallLink>
              <ThemeSwitch />
            </div>

            {/* Mobile: call is always one tap, outside the drawer */}
            <div className="flex items-center justify-end gap-1 md:hidden">
              <CallLink
                from="header_mobile"
                aria-label={`Call ${BUSINESS.phone}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-lightButton dark:bg-darkButton text-lightBG dark:text-darkBG transition-colors"
              >
                <PhoneIcon size={15} />
              </CallLink>
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
              <CallLink
                from="header_mobile"
                className="mb-2 flex w-full items-center justify-center gap-2 rounded-xl bg-lightButton dark:bg-darkButton px-4 py-4 text-lg font-semibold text-lightBG dark:text-darkBG"
              >
                <PhoneIcon size={16} />
                Call {BUSINESS.phone}
              </CallLink>

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
                    {FEATURED_INDUSTRIES.map((item) => (
                      <Link
                        key={item.slug}
                        href={item.slug}
                        onClick={closeMobile}
                        className="block px-3 py-2.5 text-base text-lightTextMuted dark:text-darkTextMuted rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                    {SERVICE_AREAS.map((item) => (
                      <Link
                        key={item.slug}
                        href={item.slug}
                        onClick={closeMobile}
                        className="block px-3 py-2.5 text-base text-lightTextMuted dark:text-darkTextMuted rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      >
                        {item.city}
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
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
