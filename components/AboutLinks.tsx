"use client";

import { useEffect, useRef, useState } from "react";

/** How long the bubble waits once the links are on screen, then how long it stays. */
const TOUCH_DELAY_MS = 900;
const TOUCH_HOLD_MS = 4500;

/**
 * GitHub and LinkedIn, for whoever came here to check.
 *
 * The GitHub link carries an aside in the same thought bubble the portrait
 * uses for the cheese: the public contribution graph undersells the work,
 * because most of it lives in private client repos. Pointers get it on hover
 * or focus. Touch has no hover, and a tap follows the link, so on touch the
 * bubble shows itself once when the links scroll into view and then leaves.
 *
 * rel="me" tells crawlers these profiles belong to the person on this page,
 * which is the same claim the Person schema makes with sameAs. The URLs come
 * in as props from the page so the schema and the links share one source; a
 * constant exported from a client module reaches a server component as a
 * client reference, not a string.
 */
export default function AboutLinks({
  github,
  linkedin,
}: {
  github: string;
  linkedin: string;
}) {
  const [bubble, setBubble] = useState(false);
  const row = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches || !row.current) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timers.push(setTimeout(() => setBubble(true), TOUCH_DELAY_MS));
        timers.push(setTimeout(() => setBubble(false), TOUCH_DELAY_MS + TOUCH_HOLD_MS));
      },
      { threshold: 1 }
    );
    observer.observe(row.current);
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const link =
    "text-lg font-normal text-lightText dark:text-darkText underline underline-offset-4 decoration-lightBorder dark:decoration-darkBorder hover:decoration-current transition-colors";

  return (
    <div ref={row} className="relative mt-8 flex items-center gap-6">
      {/* The bubble opens downward: the cards sit right above the links. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute top-full left-0 mt-5 w-64 transition-all duration-300 ${
          bubble ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
        }`}
      >
        <div className="relative rounded-2xl border border-lightBorder bg-lightBG px-4 py-2.5 dark:border-darkBorder dark:bg-darkBG">
          <p className="text-sm font-light leading-snug text-lightTextMuted dark:text-darkTextMuted">
            Most of my commits live in private client repos. The green squares
            are the tip of it.
          </p>
          <span className="absolute -top-2.5 left-7 h-2.5 w-2.5 rounded-full border border-lightBorder bg-lightBG dark:border-darkBorder dark:bg-darkBG" />
          <span className="absolute -top-[18px] left-4 h-1.5 w-1.5 rounded-full border border-lightBorder bg-lightBG dark:border-darkBorder dark:bg-darkBG" />
        </div>
      </div>

      <a
        href={github}
        target="_blank"
        rel="me noopener noreferrer"
        onMouseEnter={() => setBubble(true)}
        onMouseLeave={() => setBubble(false)}
        onFocus={() => setBubble(true)}
        onBlur={() => setBubble(false)}
        className={link}
      >
        GitHub
      </a>
      <a href={linkedin} target="_blank" rel="me noopener noreferrer" className={link}>
        LinkedIn
      </a>
    </div>
  );
}
