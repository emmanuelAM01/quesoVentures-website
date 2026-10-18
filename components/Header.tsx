"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PiCaretRightBold } from "react-icons/pi";
import ThemeSwitch from "./ThemeSwitch";
import { GetStartedButton } from "./GetStarted";
import { houseGradient } from "./livery";

/**
 * The bar, on every page but the stamp landing.
 *
 * Three things to look at and one thing to do: the Tools (the catalog, which
 * is the company), the Report Card (the proof), About (the person), and Get
 * Started, which opens the catalog as an order list (components/GetStarted).
 *
 * Three columns, so the nav sits at the true centre without measuring
 * anything: the logo holds the left, the actions the right, and the middle
 * column is the nav.
 *
 * On a phone the bar is the logo, Get Started in the middle, and the menu.
 * The menu is a full screen page of its own: it scrolls by itself, the page
 * underneath is locked while it is open, and it closes on a tap, a link, or
 * Escape.
 */
const NO_HEADER = ["/foundCode"];

const NAV = [
  { href: "/tools", label: "Tools", dot: true },
  { href: "/report-card", label: "Report Card" },
  { href: "/about", label: "About" },
] as const;

const navLinkClass =
  "relative whitespace-nowrap text-[15px] font-medium text-lightText dark:text-darkText px-3.5 py-2 transition-colors " +
  "after:content-[''] after:absolute after:left-3.5 after:right-3.5 after:bottom-0.5 after:h-[2px] after:rounded-full " +
  "after:origin-left after:scale-x-0 after:transition-transform after:duration-300 " +
  "after:bg-lightAccent dark:after:bg-darkAccent hover:after:scale-x-100 focus-visible:after:scale-x-100 focus:outline-none";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isCurrent = (href: string) => pathname === href || (pathname?.startsWith(`${href}/`) ?? false);

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

  // Every navigation closes whatever was open.
  useEffect(() => {
    setMobileOpen(false);
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

            {/* Middle: the nav on desktop, Get Started on a phone. */}
            <nav aria-label="Main" className="hidden lg:block">
              <ul className="flex items-center">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isCurrent(item.href) ? "page" : undefined}
                      className={`${navLinkClass} inline-flex items-center gap-1.5 ${isCurrent(item.href) ? "after:scale-x-100" : ""}`}
                    >
                      {"dot" in item && (
                        <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ backgroundImage: houseGradient() }} />
                      )}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="lg:hidden">
              <GetStartedButton from="header_mobile" />
            </div>

            {/* Right: theme and Get Started on desktop, the menu on a phone. */}
            <div className="flex items-center justify-self-end gap-2">
              <div className="hidden items-center gap-2 lg:flex">
                <ThemeSwitch />
                <GetStartedButton from="header" />
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
            {[...NAV, { href: "/contact", label: "Contact" }].map((item, i) => (
              <MenuLink key={item.href} href={item.href} onClick={closeMobile} shown={mobileOpen} i={i}>
                <span className="inline-flex items-center gap-3">
                  {"dot" in item && item.dot && (
                    <span aria-hidden className="h-2 w-2 rounded-full" style={{ backgroundImage: houseGradient() }} />
                  )}
                  {item.label}
                </span>
              </MenuLink>
            ))}
          </ul>

          <div className="mt-10 flex items-center justify-end gap-6" style={stagger(mobileOpen, 5)}>
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
