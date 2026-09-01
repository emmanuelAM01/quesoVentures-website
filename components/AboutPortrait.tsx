"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/** How long the portrait holds before it gives up and shows the mountains. */
const HOLD_MS = 3000;

/**
 * A portrait that gets bored, and then gets cheeky.
 *
 * Two acts. Before the joke is found the card shows Emmanuel for three seconds,
 * flips to the Alps on its own, and treats the pointer normally: hovering brings
 * him back, leaving sends it to the mountains.
 *
 * Clicking finds the cheese, and inverts the polarity. From then on the card
 * shows Emmanuel when you leave and the cheese when you come back, so it reads
 * as the thing dodging you rather than obeying you. Clicking the cheese again
 * makes it shake instead of doing anything useful.
 *
 * Built as a two-faced card rather than a three-sided prism because only one
 * face is ever visible: the back renders the mountains, or the cheese once the
 * joke is found. Same effect, half the geometry.
 *
 * `prefers-reduced-motion` skips only the unprompted three-second flip. Every
 * hover, click and shake still works, because a setting about autoplay should
 * not delete the easter egg.
 */
export default function AboutPortrait() {
  /** false shows the portrait, true shows whatever is on the back. */
  const [flipped, setFlipped] = useState(false);
  /** The cheese has been found. The back face changes, and so do the rules. */
  const [found, setFound] = useState(false);
  const [shaking, setShaking] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = setTimeout(() => setFlipped(true), HOLD_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const stopTimer = () => {
    if (timer.current) clearTimeout(timer.current);
  };

  return (
    <div
      onMouseEnter={() => {
        stopTimer();
        // Inverted once found: coming back shows the cheese, not the face.
        setFlipped(found);
      }}
      onMouseLeave={() => setFlipped(!found)}
      onClick={() => {
        stopTimer();
        if (found && flipped) {
          // Already on the cheese. There is nothing else to give you.
          setShaking(true);
          return;
        }
        setFound(true);
        setFlipped(true);
      }}
      className="relative aspect-[4/5] w-full max-w-sm mx-auto select-none [perspective:1400px] lg:mx-0"
    >
      <div
        onAnimationEnd={() => setShaking(false)}
        className={`relative h-full w-full transform-gpu transition-transform duration-700 ease-out [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        } ${shaking ? "queso-shake" : ""}`}
      >
        {/* Front */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl border border-lightBorder dark:border-darkBorder [backface-visibility:hidden]">
          <Image
            src="/about.JPEG"
            alt="Emmanuel Mendieta, founder of Queso Ventures"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Back: the mountains, until the joke is found. */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl border border-lightBorder dark:border-darkBorder [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {found ? (
            <div className="flex h-full flex-col items-center justify-center gap-8 bg-white dark:bg-[#151618]">
              <div className="relative rounded-2xl border border-lightBorder bg-lightBG px-4 py-2.5 dark:border-darkBorder dark:bg-darkBG">
                <p className="whitespace-nowrap text-sm font-light text-lightTextMuted dark:text-darkTextMuted">
                  just going to leave this here…
                </p>
                <span className="absolute -bottom-2.5 right-7 h-2.5 w-2.5 rounded-full border border-lightBorder bg-lightBG dark:border-darkBorder dark:bg-darkBG" />
                <span className="absolute -bottom-[18px] right-4 h-1.5 w-1.5 rounded-full border border-lightBorder bg-lightBG dark:border-darkBorder dark:bg-darkBG" />
              </div>
              <Image
                src="/logo.png"
                alt="Queso Ventures logo"
                width={96}
                height={96}
                className="object-contain"
              />
            </div>
          ) : (
            <Image
              src="/hero/aboutClouds.JPEG"
              alt="Cloud breaking over the Alps above a treeline"
              fill
              sizes="(max-width: 1024px) 100vw, 24rem"
              className="object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
}
