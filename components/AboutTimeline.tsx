"use client";

import { useRef, useState } from "react";
import { PiArrowLeftBold, PiArrowRightBold } from "react-icons/pi";
import { PAINT, type Paint } from "components/livery";

export type TimelineEntry = {
  /** The year, or the span: "2008", "2010s". */
  mark: string;
  title: string;
  /** The line you read first. */
  body: string;
  /** The rest of it, for whoever stays. */
  story?: string;
};

/**
 * The story as a timeline, one year at a time.
 *
 * After the Ferrari history page: one huge year, the words beside it, and a
 * rail of every year underneath showing how far along you are. With no
 * photographs to carry it, the numeral is the picture. Moving forward rolls
 * the year up like a counter and slides the words in from the right; moving
 * back does both the other way, so the direction is felt as well as seen.
 *
 * It warms as it goes. The paint runs from Blu Tour de France in 2008 to Rosso
 * Corsa at the end, the house red, which is where Queso Ventures sits. The
 * rail behind you fills with the colours you have passed through.
 *
 * Every entry stays in the document. The ones not showing are stacked in the
 * same grid cell, invisible, so the panel is always as tall as its longest
 * entry and never jumps, and crawlers read all of it.
 *
 * Phones get a plain vertical timeline with everything open: eight labels
 * across 375px is a row of collisions.
 */
const RAMP: Paint[] = [
  PAINT.bluTourDeFrance,
  PAINT.bluLeMans,
  PAINT.verdeMantis,
  PAINT.gialloModena,
  PAINT.gialloOrion,
  PAINT.arancioXanto,
  PAINT.rossoScuderia,
  PAINT.rossoCorsa,
];

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

export default function AboutTimeline({ entries }: { entries: TimelineEntry[] }) {
  const [active, setActive] = useState(0);
  const touchX = useRef<number | null>(null);
  const n = entries.length;

  /** The ramp spread over however many entries there are, ends pinned. */
  const paintAt = (i: number) =>
    RAMP[n < 2 ? RAMP.length - 1 : Math.round((i * (RAMP.length - 1)) / (n - 1))];
  const go = (i: number) => setActive(Math.max(0, Math.min(n - 1, i)));
  const paint = paintAt(active);

  const passed = entries.slice(0, active + 1).map((_, i) => paintAt(i).hex);
  // The first colour twice, so a single stop is still a valid gradient.
  const fill = `linear-gradient(to right, ${passed[0]}, ${passed.join(", ")})`;

  return (
    <>
      {/* Phones: down the page, all open. */}
      <ol className="md:hidden relative ml-2 border-l border-lightBorder dark:border-darkBorder">
        {entries.map((e, i) => (
          <li key={e.mark} className="relative pl-8 pb-10 last:pb-0">
            <span
              aria-hidden
              className="absolute -left-[7px] top-3 h-3.5 w-3.5 rounded-full ring-4 ring-lightBG dark:ring-darkBG"
              style={{ backgroundColor: paintAt(i).hex }}
            />
            <p className="text-4xl font-light tracking-tight text-lightText dark:text-darkText tabular-nums">
              {e.mark}
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-lightText dark:text-darkText text-balance">
              {e.title}
            </h3>
            <p className="mt-2 text-lg font-light leading-relaxed text-lightText/85 dark:text-darkText/85">
              {e.body}
            </p>
            {e.story && (
              <p className="mt-3 text-base font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">
                {e.story}
              </p>
            )}
          </li>
        ))}
      </ol>

      {/* Tablets and up: one year at a time. */}
      <div
        data-dark-section
        tabIndex={0}
        role="group"
        aria-roledescription="timeline"
        aria-label={`${entries[active].mark}, ${active + 1} of ${n}`}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            go(active - 1);
          } else if (e.key === "ArrowRight") {
            e.preventDefault();
            go(active + 1);
          }
        }}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 50) go(active + (dx < 0 ? 1 : -1));
        }}
        className="hidden md:block relative overflow-hidden rounded-3xl bg-[#101216] p-10 lg:p-14 focus:outline-none focus-visible:ring-2 focus-visible:ring-darkAccent/50"
      >
        {/* The year's colour, as light coming in from the corner. */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full opacity-25 blur-3xl transition-colors duration-700"
          style={{ backgroundColor: paint.hex }}
        />

        <div className="relative flex items-center justify-between">
          <p className="font-mono text-sm tracking-widest text-[#7F8A96] tabular-nums">
            <span className="text-[#F5F7FA]">{String(active + 1).padStart(2, "0")}</span>
            {" / "}
            {String(n).padStart(2, "0")}
          </p>
          <div className="flex gap-3">
            <StepButton label="Earlier" disabled={active === 0} onClick={() => go(active - 1)}>
              <PiArrowLeftBold className="h-4 w-4" />
            </StepButton>
            <StepButton label="Later" disabled={active === n - 1} onClick={() => go(active + 1)}>
              <PiArrowRightBold className="h-4 w-4" />
            </StepButton>
          </div>
        </div>

        <div className="relative mt-8 grid items-center gap-10 lg:gap-14 grid-cols-[minmax(0,1fr),minmax(0,1.15fr)]">
          {/* The year. Rolls up going forward, down going back. */}
          <div className="grid overflow-hidden py-2">
            {entries.map((e, i) => {
              const d = i - active;
              return (
                <p
                  key={e.mark}
                  aria-hidden
                  className={`[grid-area:1/1] bg-clip-text text-[6.5rem] lg:text-[9.5rem] font-extralight leading-none tracking-tighter text-transparent tabular-nums transition-all duration-700 ${EASE} motion-reduce:transition-none`}
                  style={{
                    backgroundImage: `linear-gradient(170deg, #F5F7FA 35%, ${paintAt(i).hex} 130%)`,
                    transform: `translateY(${d === 0 ? 0 : d < 0 ? -70 : 70}%)`,
                    opacity: d === 0 ? 1 : 0,
                  }}
                >
                  {e.mark}
                </p>
              );
            })}
          </div>

          {/* The words. Slide in from the side you are heading to. */}
          <div className="grid">
            {entries.map((e, i) => {
              const d = i - active;
              const p = paintAt(i);
              return (
                <div
                  key={e.mark}
                  aria-hidden={d !== 0}
                  className={`[grid-area:1/1] self-center transition-all duration-700 ${EASE} motion-reduce:transition-none ${
                    d === 0 ? "" : "pointer-events-none"
                  }`}
                  style={{
                    transform: `translateX(${d === 0 ? 0 : d < 0 ? -32 : 32}px)`,
                    opacity: d === 0 ? 1 : 0,
                    transitionDelay: d === 0 ? "120ms" : "0ms",
                  }}
                >
                  <span
                    aria-hidden
                    className="block h-1 w-12 rounded-full"
                    style={{ backgroundColor: p.hex }}
                  />
                  <h3 className="mt-6 text-3xl lg:text-4xl font-semibold tracking-tight text-balance text-[#F5F7FA]">
                    {e.title}
                  </h3>
                  <p className="mt-4 text-xl font-light leading-relaxed text-[#DDE3E8]">
                    {e.body}
                  </p>
                  {e.story && (
                    <p className="mt-4 text-base lg:text-lg font-light leading-relaxed text-[#9AA5B1]">
                      {e.story}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* The rail: every year, and how far along you are. */}
        <div className="relative mt-14">
          <div className="absolute left-8 right-8 top-[7px] h-px bg-white/15">
            <div
              className={`h-full transition-[width] duration-700 ${EASE}`}
              style={{
                width: n > 1 ? `${(active / (n - 1)) * 100}%` : "0%",
                backgroundImage: fill,
              }}
            />
          </div>
          <div className="relative flex justify-between">
            {entries.map((e, i) => {
              const on = i === active;
              const p = paintAt(i);
              return (
                <button
                  key={e.mark}
                  type="button"
                  aria-current={on}
                  aria-label={`${e.mark}: ${e.title}`}
                  onClick={() => go(i)}
                  className="group flex w-16 flex-col items-center gap-3 focus:outline-none"
                >
                  <span
                    className={`block h-[15px] w-[15px] rounded-full border-2 transition-all duration-500 ${
                      on ? "scale-125" : "group-hover:scale-125"
                    }`}
                    style={{
                      borderColor: i <= active ? p.hex : "rgba(255,255,255,0.3)",
                      backgroundColor: on ? p.hex : i < active ? p.hex : "#101216",
                      boxShadow: on ? `0 0 0 6px ${p.hex}33, 0 0 22px ${p.hex}88` : "none",
                    }}
                  />
                  <span
                    className={`text-sm tabular-nums transition-colors ${
                      on
                        ? "font-semibold text-[#F5F7FA]"
                        : "text-[#7F8A96] group-hover:text-[#F5F7FA] group-focus-visible:text-[#F5F7FA]"
                    }`}
                  >
                    {e.mark}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function StepButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#F5F7FA] transition hover:border-white/40 hover:bg-white/5 disabled:pointer-events-none disabled:opacity-30"
    >
      {children}
    </button>
  );
}
