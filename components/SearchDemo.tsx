"use client";

import { useState } from "react";
import { FaSearch, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { useBusinessSearch } from "./useBusinessSearch";

const QUERIES = [
  "mechanic near me",
  "med spa in houston",
  "where to get hardwood floors",
  "kitchen remodeler humble tx",
];

const SOURCES = ["Google", "Maps", "AI"] as const;
type Source = (typeof SOURCES)[number];

/**
 * The hero demo you can take over.
 *
 * It cycles hardcoded searches until someone clicks into the box, at which
 * point the reel stops and it becomes a real Google Places lookup. Pick your
 * own shop and the mock result stops saying "Your Business" and says your name,
 * your street, your rating slot — which is the whole argument the page has been
 * making, rendered about you instead of about a stranger.
 *
 * The state machine behind that lives in useBusinessSearch, because the
 * showcase card further down the page runs the same one. What is local here is
 * the Google/Maps/AI switch: three renderings of the same result, which is the
 * point the hero is making and the showcase card is not.
 */
export default function SearchDemo() {
  const [source, setSource] = useState<Source>("Google");
  const {
    typed,
    showResults,
    live,
    takeOver,
    query,
    edit,
    suggestions,
    chosen,
    entered,
    pick,
    commit,
    requestReport,
    inputRef,
    bizName,
    bizWhere,
    isTheirs,
    resultStyle,
  } = useBusinessSearch({ queries: QUERIES, from: "hero" });

  return (
    <div
      onClick={takeOver}
      className={`w-full max-w-md mx-auto rounded-3xl border bg-white dark:bg-[#151618] shadow-xl shadow-black/5 dark:shadow-black/30 p-6 sm:p-7 cursor-text transition-colors ${
        live
          ? "border-lightBorder dark:border-darkBorder"
          : "border-lightBorder hover:border-lightAccent/50 dark:border-darkBorder dark:hover:border-darkAccent/50"
      }`}
    >
      {/* Source pills */}
      <div className="flex items-center gap-2 mb-5">
        {SOURCES.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => setSource(label)}
            aria-pressed={source === label}
            className={`inline-flex min-h-[36px] items-center text-xs font-medium px-3.5 rounded-full border transition-colors ${
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
        {live ? (
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => edit(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                commit();
              }
            }}
            placeholder="Type your business name"
            aria-label="Search for your business"
            className="w-full bg-transparent text-sm sm:text-base text-lightText dark:text-darkText placeholder:text-lightTextMuted/60 dark:placeholder:text-darkTextMuted/60 focus:outline-none"
          />
        ) : (
          <>
            <span className="min-w-0 truncate text-sm sm:text-base text-lightText dark:text-darkText">
              {typed}
            </span>
            <span className="caret inline-block w-[2px] h-5 bg-lightText dark:bg-darkText shrink-0" />
          </>
        )}

        {/*
          The affordance, in the one place it is unmissable.

          A reel that happens to be clickable is a reel nobody clicks — nothing
          on screen said the box was live, so it read as a picture and the whole
          easter egg went unused. Owner.com gets this for free because their box
          ships with a submit button on it. This is the same trick: the pill
          says the bar takes input, and it is replaced by the real Enter button
          the moment someone starts typing.
        */}
        {!live && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              takeOver();
            }}
            className="ml-auto inline-flex min-h-[36px] shrink-0 items-center whitespace-nowrap rounded-full bg-lightButton px-3.5 text-xs font-semibold text-lightBG transition-colors hover:bg-lightButtonHover dark:bg-darkButton dark:text-darkBG dark:hover:bg-darkButtonHover"
          >
            Try yours
          </button>
        )}

        {live && query.trim().length >= 2 && !chosen && !entered && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              commit();
            }}
            className="inline-flex min-h-[36px] shrink-0 items-center rounded-full bg-lightButton px-3.5 text-xs font-semibold text-lightBG transition-colors hover:bg-lightButtonHover dark:bg-darkButton dark:text-darkBG dark:hover:bg-darkButtonHover"
          >
            Enter
          </button>
        )}
      </div>

      {/*
        The mock puts whoever is named at number one with five stars. Against
        "Your Business" that reads as the illustration it is; against a real
        name and a real street it starts to read as a claim about where they
        rank today, which it is not. The label is the whole difference, so it
        appears only once the card is about someone.
      */}
      {isTheirs && (
        <p className="mt-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-lightAccent dark:text-darkAccent">
          <span className="inline-block h-1 w-6 rounded-full bg-lightAccent dark:bg-darkAccent" />
          Soon to be reality
        </p>
      )}

      {live && suggestions.length > 0 && (
        <ul className="mt-3 overflow-hidden rounded-2xl border border-lightBorder dark:border-darkBorder">
          {suggestions.map((s) => (
            <li key={s.placeId}>
              <button
                type="button"
                onClick={() => pick(s)}
                className="block w-full px-4 py-3 text-left transition-colors hover:bg-black/[0.03] dark:hover:bg-white/[0.05]"
              >
                <span className="block text-sm font-medium text-lightText dark:text-darkText">
                  {s.name}
                </span>
                {s.address && (
                  <span className="block text-xs text-lightTextMuted dark:text-darkTextMuted">
                    {s.address}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Results */}
      {source === "Google" && (
        <div className="mt-5 space-y-3">
          <div
            className="rounded-2xl border-2 border-lightAccent dark:border-darkAccent p-4 flex items-center justify-between gap-3 transition-all duration-500"
            style={resultStyle()}
          >
            <div>
              <p className="text-sm sm:text-base font-semibold text-lightText dark:text-darkText">
                {bizName}
              </p>
              <div className="flex items-center gap-1 mt-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={11} />
                ))}
              </div>
              <p className="flex items-center gap-1 mt-1 text-xs text-lightTextMuted dark:text-darkTextMuted">
                <FaMapMarkerAlt size={10} /> {bizWhere}
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
                {bizName}
              </p>
              <div className="flex items-center gap-1 mt-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={11} />
                ))}
              </div>
              <p className="flex items-center gap-1 mt-1 text-xs text-lightTextMuted dark:text-darkTextMuted">
                <FaMapMarkerAlt size={10} /> 0.4 mi &middot; {bizWhere}
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
              <span className="font-semibold">{bizName}</span> is the
              top rated option nearby, with a 5.0 rating and a profile that
              clearly lists services, hours, and service area.
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {[bizName, "Google Business Profile", "Reviews"].map(
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

      {isTheirs && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            requestReport();
          }}
          className="mt-5 w-full rounded-xl bg-lightButton px-5 py-3 text-base font-semibold text-lightBG transition-colors hover:bg-lightButtonHover dark:bg-darkButton dark:text-darkBG dark:hover:bg-darkButtonHover"
        >
          Get the real report for {bizName}
        </button>
      )}
    </div>
  );
}
