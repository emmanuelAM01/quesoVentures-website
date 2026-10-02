"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { PiCaretDownBold, PiCaretRightBold } from "react-icons/pi";
import ThemeSwitch from "./ThemeSwitch";
import { INDUSTRIES, LISTED_FEATURED } from "./serviceAreas";
import { CITIES, ALL_NEIGHBORHOODS } from "components/places";
import NicheCtaButton from "./NicheCtaButton";
import { SITE_COPY } from "./siteCopy";
import { houseGradient } from "./livery";

/**
 * The bar, on every page but Studios and the stamp landing.
 *
 * Laid out in the order a prospect needs it: what I do (Services), who for
 * (Who I Help), what I have built (Studios), then the brand (the Guide, and
 * About). The Free Report closes the row, because it is where every one of
 * those is meant to lead.
 *
 * Three columns, so the nav sits at the true centre without measuring
 * anything: the logo holds the left, the actions the right, and the middle
 * column is the nav. It used to slide sideways on trade pages to make room
 * for the page's name; the Who I Help item names the page instead, which says
 * the same thing without the bar moving under the pointer.
 *
 * On a phone the bar is the logo, the Free Report in the middle, and the menu.
 * The menu is a full screen page of its own: it scrolls by itself, the page
 * underneath is locked while it is open, and it closes on a tap, a link, or
 * Escape.
 */
const NO_HEADER = ["/studios", "/foundCode"];

const navLinkClass =
  "relative whitespace-nowrap text-[15px] font-medium text-lightText dark:text-darkText px-3.5 py-2 transition-colors " +
  "after:content-[''] after:absolute after:left-3.5 after:right-3.5 after:bottom-0.5 after:h-[2px] after:rounded-full " +
  "after:origin-left after:scale-x-0 after:transition-transform after:duration-300 " +
  "after:bg-lightAccent dark:after:bg-darkAccent hover:after:scale-x-100 focus-visible:after:scale-x-100 focus:outline-none";

const dropdownLinkClass =
  "block py-[7px] text-[15px] leading-snug text-lightTextMuted transition-colors " +
  "hover:text-lightText dark:text-darkTextMuted dark:hover:text-darkText";

/** The trade or town a page is about, for the Who I Help label. */
function selectedPlaceOrTrade(pathname: string | null): string | null {
  if (!pathname) return null;
  const trade = INDUSTRIES.find((i) => i.slug && i.slug === pathname);
  if (trade) return trade.short ?? trade.label;
  const hood = ALL_NEIGHBORHOODS.find((n) => n.slug === pathname);
  if (hood) return hood.name;
  const city = CITIES.find((c) => c.slug === pathname);
  if (city) return city.name;
  return null;
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileWorkOpen, setMobileWorkOpen] = useState(false);
  const workRef = useRef<HTMLLIElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const selected = useMemo(() => selectedPlaceOrTrade(pathname), [pathname]);

  // Light or dark by what is under the bar, and a firmer edge once scrolled.
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
      if (workRef.current && !workRef.current.contains(e.target as Node)) setWorkOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Every navigation closes whatever was open.
  useEffect(() => {
    setMobileOpen(false);
    setWorkOpen(false);
  }, [pathname]);

  /*
    While the phone menu is open the page underneath does not move. Without
    this a swipe on the menu scrolled the page behind it, and the menu itself
    could not be scrolled at all.

    Done with listeners rather than overflow: hidden. The body here carries
    overflow-x: hidden, so any overflow lock on the root turns the body into
    its own scroll container, and the sticky bar then sticks to the top of the
    body, far above the screen once the page is scrolled. Swallowing the
    wheel and touch moves that start outside the menu stops the page, and
    overscroll-contain on the menu stops a swipe at its end handing over.
  */
  useEffect(() => {
    if (!mobileOpen) return;
    const block = (e: Event) => {
      if (menuRef.current?.contains(e.target as Node)) return;
      e.preventDefault();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("wheel", block, { passive: false });
    document.addEventListener("touchmove", block, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("wheel", block);
      document.removeEventListener("touchmove", block);
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  // Pages under them too: /studios/qrs is Studios chrome like /studios.
  if (pathname && NO_HEADER.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return null;

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full pt-3 px-3 sm:px-4 transition-all duration-200",
        // The open menu is on the page ground, so the bar follows it.
        overDark && !mobileOpen ? "dark" : "",
      ].join(" ")}
    >
      <div className="container mx-auto">
        <div className="relative rounded-full">
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
            <div className="navbar-glow absolute inset-x-0 -top-4 h-10 opacity-30 blur-xl dark:opacity-15" />
            <div className="absolute inset-0 bg-headerLight backdrop-blur-md dark:bg-headerDark" />
          </div>
          <div
            className={`pointer-events-none absolute inset-0 rounded-full ring-1 transition-all duration-200 ${
              scrolled
                ? "shadow-md shadow-black/5 ring-lightBorder/90 dark:shadow-black/20 dark:ring-darkBorder/90"
                : "shadow-sm shadow-black/5 ring-lightBorder/60 dark:shadow-black/10 dark:ring-darkBorder/60"
            }`}
          />

          <div className="relative grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 sm:px-6">
            {/* Left: the logo. */}
            <Link
              href="/"
              className="flex items-center gap-2 justify-self-start py-3 text-lg font-medium text-lightText dark:text-darkText"
            >
              <Image src="/logo.png" alt="Queso Ventures logo" width={26} height={26} className="object-contain" />
              <span className="hidden whitespace-nowrap sm:inline">Queso Ventures</span>
            </Link>

            {/* Middle: the nav on desktop, the Free Report on a phone. */}
            <nav aria-label="Main" className="hidden lg:block">
              <ul className="flex items-center">
                <li>
                  <Link href="/services" className={navLinkClass}>
                    Services
                  </Link>
                </li>

                <li ref={workRef} className="relative">
                  {/* On a trade or town page this item names the page, with its
                      line drawn, which is how you know which of the pages you
                      are on without a breadcrumb. */}
                  <button
                    type="button"
                    onClick={() => setWorkOpen((o) => !o)}
                    className={`${navLinkClass} inline-flex items-center gap-1.5 ${selected ? "after:scale-x-100" : ""}`}
                    aria-expanded={workOpen}
                  >
                    {/* No entrance animation on the label: it left the text on a
                        compositing layer that painted it grey beside its neighbours. */}
                    <span>{selected ?? "Who I Help"}</span>
                    <PiCaretDownBold
                      aria-hidden
                      className={`h-3 w-3 transition-transform duration-300 ${workOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Always in the DOM, toggled with CSS, so every link is in
                      the server HTML for crawlers. */}
                  <div
                    className={`${
                      workOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
                    } absolute left-1/2 top-full z-50 mt-4 w-[36rem] -translate-x-1/2 rounded-3xl border border-lightBorder bg-panelLight p-7 shadow-2xl shadow-black/10 transition-all duration-300 dark:border-darkBorder dark:bg-panelDark dark:shadow-black/40`}
                  >
                    <span
                      aria-hidden
                      className="absolute inset-x-7 top-0 h-[2px] rounded-full"
                      style={{ backgroundImage: houseGradient() }}
                    />
                    <div className="grid grid-cols-2 gap-x-10">
                      <div>
                        <p className="mb-3 text-sm text-lightTextMuted dark:text-darkTextMuted">By trade</p>
                        {LISTED_FEATURED.map((item) => (
                          <Link
                            key={item.slug}
                            href={item.slug}
                            aria-current={item.slug === pathname ? "page" : undefined}
                            className={`${dropdownLinkClass} ${
                              item.slug === pathname ? "font-medium text-lightText dark:text-darkText" : ""
                            }`}
                          >
                            {item.label}
                          </Link>
                        ))}
                        <Link href="/services" className={`${dropdownLinkClass} italic`}>
                          and many more
                        </Link>
                      </div>
                      <div>
                        <p className="mb-3 text-sm text-lightTextMuted dark:text-darkTextMuted">By area</p>
                        {CITIES.map((city) => (
                          <div key={city.slug} className="mb-1 last:mb-0">
                            <Link
                              href={city.slug}
                              aria-current={city.slug === pathname ? "page" : undefined}
                              className={`${dropdownLinkClass} font-medium text-lightText dark:text-darkText`}
                            >
                              All of {city.name}
                            </Link>
                            <div className="ml-1 border-l border-lightBorder pl-3 dark:border-darkBorder">
                              {city.neighborhoods.map((item) => (
                                <Link
                                  key={item.slug}
                                  href={item.slug}
                                  aria-current={item.slug === pathname ? "page" : undefined}
                                  className={`${dropdownLinkClass} ${
                                    item.slug === pathname ? "font-medium text-lightText dark:text-darkText" : ""
                                  }`}
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>

                <li>
                  <Link href="/studios" className={`${navLinkClass} inline-flex items-center gap-1.5`}>
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ backgroundImage: houseGradient() }} />
                    Studios
                  </Link>
                </li>
                <li>
                  <Link href="/guide" className={navLinkClass}>
                    Guide
                  </Link>
                </li>
                <li>
                  <Link href="/about" className={navLinkClass}>
                    About
                  </Link>
                </li>
              </ul>
            </nav>

            {/* The Free Report, dead centre on a phone: the one thing the bar
                is for, one tap away, without the drawer. */}
            <div className="lg:hidden">
              <NicheCtaButton
                from="header_mobile"
                variant="pill"
                message={SITE_COPY.audit.ctaPrefill}
                label="Free Report"
              />
            </div>

            {/* Right: theme and the Free Report on desktop, the menu on a phone. */}
            <div className="flex items-center justify-self-end gap-2">
              <div className="hidden items-center gap-2 lg:flex">
                <ThemeSwitch />
                <NicheCtaButton
                  from="header"
                  variant="pill"
                  message={SITE_COPY.audit.ctaPrefill}
                  label="Free Report"
                />
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen((o) => !o)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                className="grid h-10 w-10 place-items-center rounded-full text-lightText transition-colors hover:bg-black/5 dark:text-darkText dark:hover:bg-white/10 lg:hidden"
              >
                <span aria-hidden className="relative block h-3.5 w-5">
                  <span
                    className={`absolute left-0 h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${
                      mobileOpen ? "top-1.5 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-1.5 h-[2px] w-5 rounded-full bg-current transition-opacity duration-200 ${
                      mobileOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute left-0 h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${
                      mobileOpen ? "top-1.5 -rotate-45" : "top-3"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*
        The phone menu: a page of its own under the bar. It is its own scroll
        container (overscroll-contain, so reaching its end does not hand the
        swipe to the page), and the page is locked while it is open.
      */}
      <div
        className={`fixed inset-0 top-0 z-[-1] bg-lightBG transition-opacity duration-300 dark:bg-darkBG lg:hidden ${
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!mobileOpen}
      >
        <nav
          ref={menuRef}
          aria-label="Menu"
          className="h-full overflow-y-auto overscroll-contain px-6 pb-12 pt-28"
        >
          <ul className="border-b border-lightText/10 dark:border-darkText/10">
            <MenuLink href="/services" onClick={closeMobile} shown={mobileOpen} i={0}>
              Services
            </MenuLink>

            <li className="border-t border-lightText/10 dark:border-darkText/10" style={stagger(mobileOpen, 1)}>
              <button
                type="button"
                onClick={() => setMobileWorkOpen((o) => !o)}
                className="flex w-full items-center justify-between py-5 text-left text-3xl font-light tracking-tight text-lightText dark:text-darkText"
                aria-expanded={mobileWorkOpen}
              >
                {selected ?? "Who I Help"}
                <PiCaretDownBold
                  aria-hidden
                  className={`h-5 w-5 transition-transform duration-300 ${mobileWorkOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobileWorkOpen && (
                <div className="grid gap-8 pb-6 sm:grid-cols-2">
                  <div>
                    <p className="mb-2 text-sm text-lightTextMuted dark:text-darkTextMuted">By trade</p>
                    {LISTED_FEATURED.map((item) => (
                      <Link
                        key={item.slug}
                        href={item.slug}
                        onClick={closeMobile}
                        className="block py-2.5 text-lg font-light text-lightText dark:text-darkText"
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Link href="/services" onClick={closeMobile} className="block py-2.5 text-lg font-light italic text-lightTextMuted dark:text-darkTextMuted">
                      and many more
                    </Link>
                  </div>
                  <div>
                    <p className="mb-2 text-sm text-lightTextMuted dark:text-darkTextMuted">By area</p>
                    {CITIES.map((city) => (
                      <div key={city.slug}>
                        <Link href={city.slug} onClick={closeMobile} className="block py-2.5 text-lg text-lightText dark:text-darkText">
                          All of {city.name}
                        </Link>
                        <div className="ml-1 border-l border-lightText/15 pl-4 dark:border-darkText/15">
                          {city.neighborhoods.map((item) => (
                            <Link
                              key={item.slug}
                              href={item.slug}
                              onClick={closeMobile}
                              className="block py-2.5 text-lg font-light text-lightTextMuted dark:text-darkTextMuted"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>

            <MenuLink href="/studios" onClick={closeMobile} shown={mobileOpen} i={2}>
              <span className="inline-flex items-center gap-3">
                <span aria-hidden className="h-2 w-2 rounded-full" style={{ backgroundImage: houseGradient() }} />
                Studios
              </span>
            </MenuLink>
            <MenuLink href="/guide" onClick={closeMobile} shown={mobileOpen} i={3}>
              The Queso Guide
            </MenuLink>
            <MenuLink href="/about" onClick={closeMobile} shown={mobileOpen} i={4}>
              About
            </MenuLink>
            <MenuLink href="/contact" onClick={closeMobile} shown={mobileOpen} i={5}>
              Contact
            </MenuLink>
          </ul>

          <div className="mt-10 flex items-center justify-between gap-6" style={stagger(mobileOpen, 6)}>
            <NicheCtaButton
              from="header_mobile"
              variant="arrow"
              message={SITE_COPY.audit.ctaPrefill}
              label="Get My Free Report"
            />
            <ThemeSwitch />
          </div>
        </nav>
      </div>
    </header>
  );
}

/** Each line of the phone menu rises in a beat after the one above it. */
function stagger(shown: boolean, i: number): React.CSSProperties {
  return {
    opacity: shown ? 1 : 0,
    transform: shown ? "none" : "translateY(10px)",
    transition: `opacity 500ms cubic-bezier(0.22,1,0.36,1) ${shown ? 60 + i * 45 : 0}ms, transform 500ms cubic-bezier(0.22,1,0.36,1) ${shown ? 60 + i * 45 : 0}ms`,
  };
}

function MenuLink({
  href,
  onClick,
  shown,
  i,
  children,
}: {
  href: string;
  onClick: () => void;
  shown: boolean;
  i: number;
  children: React.ReactNode;
}) {
  return (
    <li className="border-t border-lightText/10 dark:border-darkText/10" style={stagger(shown, i)}>
      <Link
        href={href}
        onClick={onClick}
        className="group flex items-center justify-between py-5 text-3xl font-light tracking-tight text-lightText dark:text-darkText"
      >
        {children}
        <PiCaretRightBold
          aria-hidden
          className="h-5 w-5 text-lightTextMuted transition-transform duration-300 group-hover:translate-x-1 dark:text-darkTextMuted"
        />
      </Link>
    </li>
  );
}
