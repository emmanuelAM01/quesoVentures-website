"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import { SERVICE_AREAS } from "components/serviceAreas";

const CLICKS_TO_TRIGGER = 3;

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
    <footer className="bg-lightBG border-t border-gray-100 dark:bg-darkBG shadow-sm text-lightText dark:text-darkText py-6 dark:border-t dark:border-gray-800">
      <div className="container mx-auto px-4 flex flex-col items-center gap-3 text-sm">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-lightTextMuted dark:text-darkTextMuted">
          <span>Serving:</span>
          {SERVICE_AREAS.map((area) => (
            <Link
              key={area.slug}
              href={area.slug}
              className="hover:opacity-70 transition-opacity"
            >
              {area.city}
            </Link>
          ))}
          <Link href="/services" className="hover:opacity-70 transition-opacity">
            Greater Houston
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://instagram.com/quesoventures"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:opacity-70 transition-opacity"
          >
            <AiOutlineInstagram size={22} />
          </a>
          <a
            href="https://youtube.com/@quesoventures"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="hover:opacity-70 transition-opacity"
          >
            <AiOutlineYoutube size={22} />
          </a>
        </div>
        <div className="flex items-center gap-4 text-lightTextMuted dark:text-darkTextMuted">
          <Link href="/privacy" className="hover:opacity-70 transition-opacity">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:opacity-70 transition-opacity">
            Terms &amp; Conditions
          </Link>
        </div>
        <div className="relative">
          <p
            onClick={onCopyrightClick}
            className="cursor-default select-none"
          >
            &copy; {currentYear} Queso Ventures LLC
          </p>
          {showMsg && (
            <p className="absolute left-1/2 -translate-x-1/2 -top-8 whitespace-nowrap text-xs text-lightTextMuted dark:text-darkTextMuted bg-white dark:bg-[#151618] border border-lightBorder dark:border-darkBorder rounded-full px-3 py-1.5 shadow-sm animate-fadeIn">
              clicking it that many times wont change it
            </p>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
