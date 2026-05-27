"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ThemeSwitch from "./ThemeSwitch";

const navLinkClass =
  "relative text-sm font-medium text-lightText dark:text-darkText px-4 py-2 rounded-full transition-colors " +
  "after:content-[''] after:absolute after:left-4 after:right-4 after:bottom-1 after:h-[2px] " +
  "after:origin-left after:scale-x-0 after:transition-transform after:duration-200 " +
  "after:bg-lightAccent dark:after:bg-darkAccent hover:after:scale-x-100";

const mobileLinkClass =
  "block w-full text-left px-3 py-3 text-base font-medium text-lightText dark:text-darkText rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors";

const industries = [
  { label: "Food Trucks", href: "/website-for-food-trucks-houston" },
  { label: "Smoke & Vape Shops", href: "/website-for-smoke-shops-houston" },
  { label: "Contractors & Trades", href: "/seo-for-contractors-houston" },
  { label: "Med Spas & Salons", href: "/seo-for-med-spas-houston" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const industriesRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (industriesRef.current && !industriesRef.current.contains(e.target as Node)) {
        setIndustriesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full",
        "bg-cheese-header-light dark:bg-cheese-header-dark",
        "backdrop-blur-md",
        "transition-all duration-200",
        scrolled
          ? "border-b border-lightBorder/90 dark:border-darkBorder/90 shadow-sm"
          : "border-b border-lightBorder/60 dark:border-darkBorder/60 shadow-none",
      ].join(" ")}
    >
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        <div className="flex items-center">
          <Link
            href="/"
            className="relative flex items-center gap-2 px-4 py-2 text-lg font-medium text-lightText dark:text-darkText rounded-full transition-colors
              after:content-[''] after:absolute after:left-4 after:right-4 after:bottom-1 after:h-[2px]
              after:origin-left after:scale-x-0 after:transition-transform after:duration-200
              after:bg-lightAccent dark:after:bg-darkAccent
              hover:after:scale-x-100"
          >
            <Image
              src="/logo.png"
              alt="Queso Ventures logo - Houston web design and local SEO"
              width={25}
              height={25}
              className="object-contain"
              priority={false}
            />
            <span>Queso Ventures</span>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center">
          <ul className="flex items-center space-x-1 mr-2">
            <li>
              <Link href="/services" className={navLinkClass}>
                Services
              </Link>
            </li>

            <li ref={industriesRef} className="relative">
              <button
                type="button"
                onClick={() => setIndustriesOpen((o) => !o)}
                className={navLinkClass}
                aria-expanded={industriesOpen}
              >
                Industries
                <span
                  className={`ml-1 inline-block transition-transform duration-200 ${
                    industriesOpen ? "rotate-180" : ""
                  }`}
                >
                  ▾
                </span>
              </button>

              {industriesOpen && (
                <div className="absolute right-0 top-full mt-1 w-52 rounded-xl border border-lightBorder dark:border-darkBorder bg-lightBG dark:bg-darkBG shadow-lg py-1.5 z-50">
                  {industries.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIndustriesOpen(false)}
                      className="block px-4 py-2 text-sm text-lightText dark:text-darkText hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li>
              <Link href="/blog" className={navLinkClass}>
                Blog
              </Link>
            </li>

            <li>
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("modal:open", { detail: { id: "about-popup" } })
                  )
                }
                className={navLinkClass}
              >
                About
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("modal:open", { detail: { id: "contact-popup" } })
                  )
                }
                className={navLinkClass}
              >
                Contact
              </button>
            </li>
          </ul>

          <ThemeSwitch />
        </nav>

        {/* Mobile: theme switch + hamburger */}
        <div className="flex items-center gap-1 md:hidden">
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

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-lightBorder dark:border-darkBorder bg-lightBG dark:bg-darkBG">
          <div className="container mx-auto px-4 py-2 flex flex-col gap-0.5">
            <Link href="/services" onClick={closeMobile} className={mobileLinkClass}>
              Services
            </Link>

            <div>
              <button
                type="button"
                onClick={() => setMobileIndustriesOpen((o) => !o)}
                className={`${mobileLinkClass} flex items-center justify-between`}
                aria-expanded={mobileIndustriesOpen}
              >
                <span>Industries</span>
                <span
                  className={`inline-block transition-transform duration-200 text-sm ${
                    mobileIndustriesOpen ? "rotate-180" : ""
                  }`}
                >
                  ▾
                </span>
              </button>
              {mobileIndustriesOpen && (
                <div className="pl-3 flex flex-col gap-0.5 mt-0.5 mb-1">
                  {industries.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobile}
                      className="block px-3 py-2.5 text-sm text-lightTextMuted dark:text-darkTextMuted rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/blog" onClick={closeMobile} className={mobileLinkClass}>
              Blog
            </Link>

            <button
              type="button"
              onClick={() => {
                closeMobile();
                window.dispatchEvent(new CustomEvent("modal:open", { detail: { id: "about-popup" } }));
              }}
              className={mobileLinkClass}
            >
              About
            </button>

            <button
              type="button"
              onClick={() => {
                closeMobile();
                window.dispatchEvent(new CustomEvent("modal:open", { detail: { id: "contact-popup" } }));
              }}
              className={`${mobileLinkClass} text-lightButton dark:text-darkButton font-semibold`}
            >
              Contact
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
