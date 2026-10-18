"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import { BUSINESS } from "components/businessInfo";
import { PAINT } from "components/livery";

const CLICKS_TO_TRIGGER = 3;

// The footer is dark in both themes now, so these stop being theme-aware.
const columnLink =
  "block py-1.5 text-[14px] text-[#8A949E] transition-colors hover:text-[#F5F7FA]";
const FOOTER_LINKS = [
  { href: "/tools", label: "Tools" },
  { href: "/report-card", label: "Report Card" },
  { href: "/about", label: "About" },
  { href: "/guide", label: "The Queso Guide" },
  { href: "/contact", label: "Contact" },
];

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

      <div className="container mx-auto px-4 py-10">
        <div className="max-w-6xl mx-auto">
          {/*
            Two lines: who this is, and where else to go. The fourteen tools
            used to be listed here too, under a second "Tools" beside the first;
            every tool is one click away on /tools and on the home page, so the
            footer only needs the door. The email moved down to the bottom
            bar, beside the other ways to reach the business.
          */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
              <Link href="/" className="-my-1.5 inline-flex shrink-0 items-center gap-2.5 py-1.5">
                <Image src="/logo.png" alt="" width={26} height={26} className="object-contain" />
                <span className="text-lg font-medium text-[#F5F7FA]">Queso Ventures</span>
              </Link>
              <p className="max-w-md text-[14px] font-light leading-relaxed text-[#8A949E]">
                Software for small businesses, built in Houston.
              </p>
            </div>

            <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-1">
              {FOOTER_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className={columnLink}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="relative mt-8 flex flex-col items-center gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-between">
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

            <div className="flex flex-wrap items-center justify-center gap-5">
              <a href={BUSINESS.emailHref} className="py-2 text-[14px] text-[#8A949E] transition-colors hover:text-[#F5F7FA]">
                {BUSINESS.email}
              </a>
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
