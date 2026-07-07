"use client";

import { useEffect, useRef, useState } from "react";
import { FaSearch, FaStar, FaMapMarkerAlt } from "react-icons/fa";

const QUERIES = [
  "mechanic near me",
  "med spa in houston",
  "food truck near me",
  "kitchen remodeler humble tx",
];

export default function SearchDemo() {
  const [typed, setTyped] = useState("");
  const [showResults, setShowResults] = useState(false);
  const queryIndex = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(QUERIES[0]);
      setShowResults(true);
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const type = (query: string, pos: number) => {
      if (cancelled) return;
      setTyped(query.slice(0, pos));
      if (pos < query.length) {
        timer = setTimeout(() => type(query, pos + 1), 55);
      } else {
        timer = setTimeout(() => {
          if (cancelled) return;
          setShowResults(true);
          timer = setTimeout(() => {
            if (cancelled) return;
            setShowResults(false);
            queryIndex.current = (queryIndex.current + 1) % QUERIES.length;
            timer = setTimeout(() => type(QUERIES[queryIndex.current], 0), 400);
          }, 2800);
        }, 250);
      }
    };

    type(QUERIES[0], 0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="w-full max-w-md mx-auto rounded-3xl border border-lightBorder dark:border-darkBorder bg-white dark:bg-[#151618] shadow-xl shadow-black/5 dark:shadow-black/30 p-6 sm:p-7"
    >
      {/* Source pills */}
      <div className="flex items-center gap-2 mb-5">
        {["Google", "Maps", "AI"].map((label, i) => (
          <span
            key={label}
            className={`text-xs font-medium px-3 py-1 rounded-full border ${
              i === 0
                ? "border-lightAccent/40 text-lightAccent dark:border-darkAccent/50 dark:text-darkAccent"
                : "border-lightBorder dark:border-darkBorder text-lightTextMuted dark:text-darkTextMuted"
            }`}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Search bar */}
      <div className="flex items-center gap-3 rounded-full border border-lightBorder dark:border-darkBorder px-4 py-3">
        <FaSearch size={14} className="text-lightTextMuted dark:text-darkTextMuted shrink-0" />
        <span className="text-sm sm:text-base text-lightText dark:text-darkText whitespace-nowrap overflow-hidden">
          {typed}
        </span>
        <span className="caret inline-block w-[2px] h-5 bg-lightText dark:bg-darkText shrink-0" />
      </div>

      {/* Results */}
      <div className="mt-5 space-y-3">
        <div
          className="rounded-2xl border-2 border-lightAccent dark:border-darkAccent p-4 flex items-center justify-between gap-3 transition-all duration-500"
          style={{
            opacity: showResults ? 1 : 0,
            transform: showResults ? "none" : "translateY(10px)",
          }}
        >
          <div>
            <p className="text-sm sm:text-base font-semibold text-lightText dark:text-darkText">
              Your Business
            </p>
            <div className="flex items-center gap-1 mt-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} size={11} />
              ))}
            </div>
            <p className="flex items-center gap-1 mt-1 text-xs text-lightTextMuted dark:text-darkTextMuted">
              <FaMapMarkerAlt size={10} /> Houston, TX
            </p>
          </div>
          <span className="shrink-0 text-xs font-bold px-2.5 py-1.5 rounded-lg bg-lightAccent dark:bg-darkAccent text-white dark:text-darkBG">
            #1
          </span>
        </div>

        {[0, 1].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-lightBorder dark:border-darkBorder p-4 transition-all duration-500"
            style={{
              opacity: showResults ? 0.55 : 0,
              transform: showResults ? "none" : "translateY(10px)",
              transitionDelay: `${150 + i * 120}ms`,
            }}
          >
            <div className="h-3 w-32 rounded bg-black/10 dark:bg-white/10 mb-2" />
            <div className="h-2.5 w-44 rounded bg-black/5 dark:bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
