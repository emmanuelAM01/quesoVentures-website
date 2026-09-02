"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import ThemeSwitch from "./ThemeSwitch";
import { INDUSTRIES, LISTED_FEATURED } from "./serviceAreas";
import { CITIES, ALL_NEIGHBORHOODS } from "components/places";
import { BUSINESS } from "./businessInfo";
import CallLink from "./CallLink";
import NicheCtaButton from "./NicheCtaButton";
import { SITE_COPY } from "./siteCopy";

const navLinkClass =
  "relative whitespace-nowrap text-[15px] font-medium text-lightText dark:text-darkText px-4 py-2 rounded-full transition-colors " +
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

/**
 * What the "Who I Help" item should say on this page.
 *
 * Null everywhere except a trade or area page, where the nav stops being a
 * menu and starts telling you where you are. Unlisted trades count: Food Trucks
 * is kept out of the dropdown, but someone who landed on that page should still
 * see it named rather than see the generic label.
 */
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

/**
 * Routes that bring their own chrome.
 *
 * /studios is a deliberate departure from the rest of the site and has no
 * header at all; /foundCode uses SimpleHeader. Both used to get this simply by
 * not rendering it, which stopped being an option once it moved into the root
 * layout.
 */
const NO_HEADER = ["/studios", "/foundCode"];

/** Layout effect on the client, plain effect on the server. */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileWorkOpen, setMobileWorkOpen] = useState(false);
  const workRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();
  const selected = useMemo(() => selectedPlaceOrTrade(pathname), [pathname]);

  /*
    The slide.

    With nothing selected the nav sits in the middle of the bar. Land on a
    trade or an area page and it slides right, out of the way, and the name of
    where you are takes the middle. Going back slides it home again.

    It is one element that moves rather than two that swap, because a swap
    cannot be animated: the nav is always laid out on the right, next to the
    button, and a transform carries it to the centre when there is nothing to
    put there. Transforms do not touch layout, so nothing else on the bar
    shifts while it travels.

    Measured with offsetLeft rather than getBoundingClientRect, and that is
    load-bearing: offsetLeft is a layout value and ignores transforms, so a
    re-measure returns the same answer no matter what offset is currently
    applied. Rects do not, and reading one while the nav is already displaced
    compounds the previous measurement — the nav walks off the left edge the
    moment the web font swaps in and triggers a second pass.
  */
  const navRef = useRef<HTMLElement>(null);
  const centerRef = useRef<HTMLSpanElement>(null);
  const [shift, setShift] = useState(0);
  const [measured, setMeasured] = useState(false);
  /* Below this the name is not drawn, so the nav has no reason to move. */
  const [wide, setWide] = useState(false);

  const measure = useCallback(() => {
    const nav = navRef.current;
    const mark = centerRef.current;
    if (!nav || !mark) return;
    /* Both are positioned against the same offsetParent (the bar row), so the
       difference is the distance the nav has to travel to sit dead centre. */
    setShift(mark.offsetLeft - (nav.offsetLeft + nav.offsetWidth / 2));
    setMeasured(true);
  }, []);

  useIsoLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setWide(mq.matches);
    const onChange = () => {
      setWide(mq.matches);
      measure();
    };
    mq.addEventListener("change", onChange);
    measure();
    window.addEventListener("resize", measure);

    /*
      The first measurement happens before Inter Tight has loaded, so it sizes
      the nav in the fallback face and centres it about 45px off. Watching the
      nav's own box catches the font swap, and anything else that resizes it,
      without guessing at a delay.
    */
    const ro = new ResizeObserver(measure);
    if (navRef.current) ro.observe(navRef.current);

    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [measure]);

  /** Centre the nav unless a name has taken the middle. */
  const centred = !selected || !wide;
  const offset = centred ? shift : 0;
  /**
   * Below lg the centred name is not drawn, so the nav item carries it instead.
   * Above lg it must go back to saying "Who I Help" — the same word in the
   * middle of the bar and again in the menu label reads as a rendering bug.
   */
  const inlineLabel = selected && !wide ? selected : "Who I Help";

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

  if (pathname && NO_HEADER.includes(pathname)) return null;

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

          {/* Logo left, everything else right, and the true centre marked by a
              zero-width span the transform can measure against. */}
          <div className="relative px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
            <span
              ref={centerRef}
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 h-0 w-0"
            />

            <div className="flex shrink-0 items-center justify-start">
              <Link
                href="/"
                className="relative flex items-center gap-2 px-1 py-3 text-lg font-medium text-lightText dark:text-darkText transition-colors
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
                <span className="hidden whitespace-nowrap sm:inline">Queso Ventures</span>
              </Link>
            </div>

            {/* The name of the page you are on, in the middle of the bar,
                wearing the house gradient.

                Two ramps, not one. Over a dark hero the logo's red-to-yellow
                reads fine; on the cream header further down the page the yellow
                end lands at about 1.3:1 and the last syllable of the town
                simply vanishes. The light ramp stops at bronze instead, which
                still reads as the house colours and still reads as words.

                Only from lg up. Narrower than that the nav is already using
                most of the width, so the name would collide with it; there the
                "Who I Help" item carries the label inline instead. */}
            <span
              aria-hidden
              style={{
                /* In behind the nav: wait for it to clear, or the two words
                   overlap mid-travel and read as one broken string. Out ahead
                   of it: the name goes first, then the nav comes home. */
                transitionDelay: selected && wide ? "260ms" : "0ms",
                transitionDuration: selected && wide ? "420ms" : "180ms",
              }}
              className={`pointer-events-none absolute left-1/2 top-1/2 hidden -translate-y-1/2 whitespace-nowrap bg-gradient-to-r from-[#C4161C] to-[#B87200] bg-clip-text text-[22px] font-semibold tracking-tight text-transparent transition-all ease-out dark:from-[#FF5A4E] dark:to-[#FFD100] lg:block ${
                selected && wide
                  ? "-translate-x-1/2 opacity-100 blur-0"
                  : "-translate-x-[calc(50%+12px)] opacity-0 blur-[2px]"
              }`}
            >
              {selected}
            </span>

            <div className="hidden shrink-0 md:flex items-center justify-end gap-3">
            <nav
              ref={navRef}
              style={{ transform: `translateX(${offset}px)` }}
              className={`flex items-center ${
                measured
                  ? "transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  : ""
              }`}
            >
              <ul className="flex items-center space-x-1">
                <li>
                  <Link href="/services" className={navLinkClass}>
                    Services
                  </Link>
                </li>

                <li ref={workRef} className="relative">
                  {/*
                    On a trade or area page this item names the page instead of
                    the menu, with the underline left drawn.

                    A nav that reads the same on every page makes eleven pages
                    feel like one; this is the cheapest possible way to tell
                    someone which of the eleven they are standing on, and it
                    costs no extra row, no breadcrumb and no second colour. The
                    label is keyed so it animates in on arrival rather than
                    simply being different.
                  */}
                  <button
                    type="button"
                    onClick={() => setWorkOpen((o) => !o)}
                    className={`${navLinkClass} ${
                      selected ? "after:scale-x-100" : ""
                    }`}
                    aria-expanded={workOpen}
                  >
                    {/* No marker dot: Studios already owns a dot in this row,
                        and two different dots meaning two different things is
                        exactly the noise the dropdown rewrite removed. The
                        changed word plus the drawn underline is the state. */}
                    <span key={inlineLabel} className="nav-swap">
                      {inlineLabel}
                    </span>
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
                            aria-current={item.slug === pathname ? "page" : undefined}
                            className={`${dropdownLinkClass} ${
                              item.slug === pathname
                                ? "font-medium text-lightText dark:text-darkText"
                                : ""
                            }`}
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
                        {/*
                          Metro first, towns underneath it.

                          The column used to be a flat list of six towns with no
                          Houston in it at all, so the one page that covers the
                          whole metro was reachable only from the footer — which
                          is backwards, because it is the parent of every other
                          page in the group and the one carrying the broadest
                          search. The nesting here is the same tree that
                          places.ts already describes and that the breadcrumbs
                          and the sitemap already follow; the nav was the last
                          place still pretending it was flat.

                          It also scales: the day a second metro is added, it
                          arrives as another block rather than eleven more towns
                          in one undifferentiated stack.
                        */}
                        {CITIES.map((city) => (
                          <div key={city.slug} className="mb-1 last:mb-0">
                            <Link
                              href={city.slug}
                              onClick={() => setWorkOpen(false)}
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
                                  onClick={() => setWorkOpen(false)}
                                  aria-current={item.slug === pathname ? "page" : undefined}
                                  className={`${dropdownLinkClass} ${
                                    item.slug === pathname
                                      ? "font-medium text-lightText dark:text-darkText"
                                      : ""
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
                  <span key={selected ?? "menu"} className="nav-swap">
                    {selected ?? "Who I Help"}
                  </span>
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
                    {CITIES.map((city) => (
                      <div key={city.slug}>
                        <Link
                          href={city.slug}
                          onClick={closeMobile}
                          className="block px-3 py-2.5 text-base font-medium text-lightText dark:text-darkText rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        >
                          All of {city.name}
                        </Link>
                        <div className="ml-3 border-l border-lightBorder pl-2 dark:border-darkBorder">
                          {city.neighborhoods.map((item) => (
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
                      </div>
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
