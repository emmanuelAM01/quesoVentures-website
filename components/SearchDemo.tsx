"use client";

import { useEffect, useRef, useState } from "react";
import { FaSearch, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const QUERIES = [
  "mechanic near me",
  "med spa in houston",
  "food truck near me",
  "kitchen remodeler humble tx",
];

const SOURCES = ["Google", "Maps", "AI"] as const;
type Source = (typeof SOURCES)[number];

export default function SearchDemo() {
  const [typed, setTyped] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [source, setSource] = useState<Source>("Google");
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

  const resultStyle = (delay = 0) => ({
    opacity: showResults ? 1 : 0,
    transform: showResults ? "none" : "translateY(10px)",
    transitionDelay: delay ? `${delay}ms` : undefined,
  });

  return (
    <div className="w-full max-w-md mx-auto rounded-3xl border border-lightBorder dark:border-darkBorder bg-white dark:bg-[#151618] shadow-xl shadow-black/5 dark:shadow-black/30 p-6 sm:p-7">
      {/* Source pills */}
      <div className="flex items-center gap-2 mb-5">
        {SOURCES.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => setSource(label)}
            aria-pressed={source === label}
            className={`text-xs font-medium px-3 py-1 rounded-full border transition-colors ${
              source === label
                ? "border-lightAccent/40 bg-lightAccent/5 text-lightAccent dark:border-darkAccent/50 dark:bg-darkAccent/10 dark:text-darkAccent"
                : "border-lightBorder dark:border-darkBorder text-lightTextMuted dark:text-darkTextMuted hover:text-lightText dark:hover:text-darkText"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Prompt bar */}
      <div className="flex items-center gap-3 rounded-full border border-lightBorder dark:border-darkBorder px-4 py-3">
        {source === "AI" ? (
          <HiSparkles size={14} className="text-lightAccent dark:text-darkAccent shrink-0" />
        ) : (
          <FaSearch size={14} className="text-lightTextMuted dark:text-darkTextMuted shrink-0" />
        )}
        <span className="text-sm sm:text-base text-lightText dark:text-darkText whitespace-nowrap overflow-hidden">
          {typed}
        </span>
        <span className="caret inline-block w-[2px] h-5 bg-lightText dark:bg-darkText shrink-0" />
      </div>

      {/* Results */}
      {source === "Google" && (
        <div className="mt-5 space-y-3">
          <div
            className="rounded-2xl border-2 border-lightAccent dark:border-darkAccent p-4 flex items-center justify-between gap-3 transition-all duration-500"
            style={resultStyle()}
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
              style={{ ...resultStyle(150 + i * 120), opacity: showResults ? 0.55 : 0 }}
            >
              <div className="h-3 w-32 rounded bg-black/10 dark:bg-white/10 mb-2" />
              <div className="h-2.5 w-44 rounded bg-black/5 dark:bg-white/5" />
            </div>
          ))}
        </div>
      )}

      {source === "Maps" && (
        <div className="mt-5 space-y-3">
          {/* Mini map */}
          <div className="relative h-24 rounded-2xl border border-lightBorder dark:border-darkBorder bg-gradient-to-br from-lightAccent/5 via-transparent to-black/5 dark:from-darkAccent/10 dark:via-transparent dark:to-white/5 overflow-hidden">
            <FaMapMarkerAlt
              size={14}
              className="absolute top-4 left-10 text-lightTextMuted/40 dark:text-darkTextMuted/40"
            />
            <FaMapMarkerAlt
              size={14}
              className="absolute bottom-5 right-14 text-lightTextMuted/40 dark:text-darkTextMuted/40"
            />
            <div
              className="absolute top-1/2 left-1/2 transition-all duration-500"
              style={{
                opacity: showResults ? 1 : 0,
                transform: showResults
                  ? "translate(-50%, -65%) scale(1)"
                  : "translate(-50%, -45%) scale(0.6)",
              }}
            >
              <FaMapMarkerAlt
                size={26}
                className="text-lightAccent dark:text-darkAccent drop-shadow"
              />
            </div>
          </div>

          <div
            className="rounded-2xl border-2 border-lightAccent dark:border-darkAccent p-4 flex items-center justify-between gap-3 transition-all duration-500"
            style={resultStyle()}
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
                <FaMapMarkerAlt size={10} /> 0.4 mi &middot; Houston, TX
              </p>
            </div>
            <span className="shrink-0 text-xs font-bold px-2.5 py-1.5 rounded-lg bg-lightAccent dark:bg-darkAccent text-white dark:text-darkBG">
              #1
            </span>
          </div>
        </div>
      )}

      {source === "AI" && (
        <div className="mt-5 space-y-3">
          <div
            className="rounded-2xl border-2 border-lightAccent dark:border-darkAccent p-4 transition-all duration-500"
            style={resultStyle()}
          >
            <div className="flex items-center gap-2 mb-2">
              <HiSparkles size={14} className="text-lightAccent dark:text-darkAccent" />
              <span className="text-xs font-semibold uppercase tracking-wide text-lightAccent dark:text-darkAccent">
                AI Overview
              </span>
            </div>
            <p className="text-sm text-lightText dark:text-darkText leading-relaxed">
              Based on reviews and location,{" "}
              <span className="font-semibold">Your Business</span> is the
              top rated option nearby, with a 5.0 rating and a profile that
              clearly lists services, hours, and service area.
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {["Your Business", "Google Business Profile", "yourbusiness.com"].map(
                (chip) => (
                  <span
                    key={chip}
                    className="text-[10px] font-medium px-2 py-1 rounded-full bg-black/5 dark:bg-white/10 text-lightTextMuted dark:text-darkTextMuted"
                  >
                    {chip}
                  </span>
                )
              )}
            </div>
          </div>

          {[0, 1].map((i) => (
            <div
              key={i}
              className="h-2.5 rounded bg-black/5 dark:bg-white/5 transition-all duration-500"
              style={{
                ...resultStyle(150 + i * 120),
                opacity: showResults ? 0.55 : 0,
                width: i === 0 ? "85%" : "65%",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
