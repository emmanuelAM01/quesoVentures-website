"use client";

import { useEffect, useRef, useState } from "react";
import { FaSearch, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { PAINT } from "./livery";
import ToolCarousel from "./ToolCarousel";
import { useBusinessSearch } from "./useBusinessSearch";
import { SITE_COPY, type SiteCopy } from "./siteCopy";

/**
 * Two cards: where you rank, and what runs the shop afterwards.
 *
 * This replaced three icon cards. The icons were decoration — a globe next to
 * the words "they find you" tells a reader nothing the words did not — and the
 * argument the page is making is visual. So the left card shows their own
 * business at number one, using their real name off Google, and the right card
 * shows the six tools nobody could picture from the phrase "custom tools".
 *
 * Both halves are live. The left one is the same lookup as the hero and lands
 * in the same form; the right one stops on whichever tool someone clicks.
 */

/** Fires once when the section scrolls into view. Both cards animate off it. */
function useOnScreen<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, on };
}

const QUERIES = ["mechanic near me", "med spa near me", "roofer near me"];

/**
 * The search half, live.
 *
 * A second real lookup rather than a picture of one. The hero copy is above the
 * fold and gets the visitor who is already sold; this one catches the reader
 * who scrolled past it, and it is far enough down the page that the two never
 * compete for the same glance.
 */
function SearchCard({ on }: { on: boolean }) {
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
  } = useBusinessSearch({ queries: QUERIES, from: "showcase", holdMs: 3200 });

  return (
    <div onClick={takeOver} className="w-full cursor-text">
      <div className="flex items-center gap-3 rounded-full bg-white px-4 py-3 shadow-lg shadow-black/20">
        <FaSearch size={13} className="shrink-0 text-black/35" />
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
            className="w-full bg-transparent text-sm text-black/80 placeholder:text-black/35 focus:outline-none"
          />
        ) : (
          <>
            <span className="min-w-0 truncate text-sm text-black/80">{typed}</span>
            <span className="caret inline-block h-4 w-[2px] shrink-0 bg-black/60" />
          </>
        )}

        {!live && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              takeOver();
            }}
            className="ml-auto shrink-0 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: PAINT.rossoCorsa.hex }}
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
            className="ml-auto shrink-0 rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: PAINT.rossoCorsa.hex }}
          >
            Enter
          </button>
        )}
      </div>

      {isTheirs && (
        <p className="mt-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
          <span className="inline-block h-1 w-6 rounded-full bg-white/50" />
          Soon to be reality
        </p>
      )}

      {live && suggestions.length > 0 && (
        <ul className="mt-3 overflow-hidden rounded-2xl bg-white">
          {suggestions.map((s) => (
            <li key={s.placeId}>
              <button
                type="button"
                onClick={() => pick(s)}
                className="block w-full px-4 py-2.5 text-left transition-colors hover:bg-black/[0.04]"
              >
                <span className="block text-sm font-medium text-black/85">
                  {s.name}
                </span>
                {s.address && (
                  <span className="block text-xs text-black/45">{s.address}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 space-y-2.5">
        <div
          className="flex items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow-lg shadow-black/20 transition-all duration-500"
          style={resultStyle()}
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-black/85">{bizName}</p>
            <div className="mt-1 flex items-center gap-0.5 text-amber-400">
              {[0, 1, 2, 3, 4].map((i) => (
                <FaStar key={i} size={10} />
              ))}
            </div>
            <p className="mt-1 flex items-center gap-1 truncate text-[11px] text-black/45">
              <FaMapMarkerAlt size={9} /> {bizWhere}
            </p>
          </div>
          <span
            className="shrink-0 rounded-lg px-2.5 py-1.5 text-[11px] font-bold text-white"
            style={{ backgroundColor: PAINT.rossoCorsa.hex }}
          >
            #1
          </span>
        </div>

        {[0, 1].map((i) => (
          <div
            key={i}
            className="rounded-2xl bg-white/25 p-4 transition-all duration-500"
            style={{ ...resultStyle(140 + i * 110), opacity: showResults ? 0.55 : 0 }}
          >
            <div className="mb-2 h-2.5 w-28 rounded bg-white/40" />
            <div className="h-2 w-40 rounded bg-white/25" />
          </div>
        ))}
      </div>

      <div
        className="mt-4 flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 transition-all duration-500"
        style={resultStyle(320)}
      >
        <HiSparkles size={13} className="shrink-0 text-white/70" />
        <p className="min-w-0 text-[12px] leading-snug text-white/70">
          <span className="font-semibold text-white/90">{bizName}</span> is the
          top rated option nearby.
        </p>
      </div>

      {isTheirs && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            requestReport();
          }}
          className="mt-4 w-full truncate rounded-xl bg-white px-5 py-3 text-sm font-semibold text-inkLight transition-opacity hover:opacity-90"
        >
          Get the real report for {bizName}
        </button>
      )}
    </div>
  );
}

export default function Showcase({
  copy = SITE_COPY.showcase,
}: {
  copy?: SiteCopy["showcase"];
}) {
  const { ref, on } = useOnScreen<HTMLDivElement>();

  return (
    <section className="container mx-auto px-4 py-20">
      <div ref={ref} className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-balance text-lightText dark:text-darkText">
            {copy.heading}
          </h2>
          <p className="mt-3 text-lg sm:text-xl font-light text-lightTextMuted dark:text-darkTextMuted">
            {copy.sub}
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-2">
          <div className="relative flex flex-col overflow-hidden rounded-3xl bg-inkLight p-8 sm:p-10">
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-1.5"
              style={{ backgroundColor: PAINT.rossoCorsa.hex }}
            />
            <div className="flex flex-1 items-center justify-center py-6">
              <div className="w-full max-w-sm">
                <SearchCard on={on} />
              </div>
            </div>
            <p className="mt-6 text-xl sm:text-2xl font-medium leading-snug text-balance text-white">
              {copy.cards[0].title}
            </p>
            <p className="mt-2 text-base font-light leading-relaxed text-white/60">
              {copy.cards[0].body}
            </p>
          </div>

          <div className="relative flex flex-col overflow-hidden rounded-3xl border border-lightBorder bg-panelLight p-8 sm:p-10 dark:border-darkBorder dark:bg-panelDark">
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-1.5"
              style={{ backgroundColor: PAINT.gialloOrion.hex }}
            />
            {/* Full width, unlike the search card. That one is a search box and
                a search box has a natural size; this is a screen, and a screen
                boxed to 384px inside a 480px card reads as a thumbnail of
                something rather than the thing. */}
            <div className="flex flex-1 items-start py-6">
              <ToolCarousel running={on} />
            </div>
            <p className="mt-6 text-xl sm:text-2xl font-medium leading-snug text-balance text-lightText dark:text-darkText">
              {copy.cards[1].title}
            </p>
            <p className="mt-2 text-base font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">
              {copy.cards[1].body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
