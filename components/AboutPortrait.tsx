"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const CLICKS_TO_TRIGGER = 4;
const HOVER_MS = 4000;

export default function AboutPortrait() {
  const [swapped, setSwapped] = useState(false);
  const clicks = useRef(0);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    };
  }, []);

  const onClick = () => {
    if (swapped) return;
    clicks.current += 1;
    if (clicks.current >= CLICKS_TO_TRIGGER) setSwapped(true);
  };

  const onEnter = () => {
    if (swapped) return;
    hoverTimer.current = setTimeout(() => setSwapped(true), HOVER_MS);
  };

  const onLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative aspect-[4/5] max-w-sm w-full mx-auto lg:mx-0 overflow-hidden rounded-3xl border border-lightBorder dark:border-darkBorder select-none"
    >
      {/* Portrait */}
      <Image
        src="/about.JPEG"
        alt={swapped ? "" : "Emmanuel Mendieta, founder of Queso Ventures"}
        fill
        priority
        className={`object-cover transition-all duration-500 ${
          swapped ? "opacity-0 scale-95" : "opacity-100"
        }`}
      />

      {/* Easter egg */}
      <div
        aria-hidden={!swapped}
        className={`absolute inset-0 flex flex-col items-center justify-center gap-8 bg-white dark:bg-[#151618] transition-opacity duration-500 ${
          swapped ? "opacity-100 delay-300" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative rounded-2xl border border-lightBorder dark:border-darkBorder bg-lightBG dark:bg-darkBG px-4 py-2.5">
          <p className="text-sm font-light text-lightTextMuted dark:text-darkTextMuted whitespace-nowrap">
            just going to leave this here…
          </p>
          {/* thought bubble dots */}
          <span className="absolute -bottom-2.5 right-7 h-2.5 w-2.5 rounded-full border border-lightBorder dark:border-darkBorder bg-lightBG dark:bg-darkBG" />
          <span className="absolute -bottom-[18px] right-4 h-1.5 w-1.5 rounded-full border border-lightBorder dark:border-darkBorder bg-lightBG dark:bg-darkBG" />
        </div>

        <Image
          src="/logo.png"
          alt="Queso Ventures logo"
          width={96}
          height={96}
          className="object-contain"
        />
      </div>
    </div>
  );
}
