"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PAINT, houseAt, HOUSE, type Paint } from "components/livery";

export type Photo = {
  src: string;
  alt: string;
  /** Where to hold the crop, since a split screen throws away much of a frame. */
  position?: string;
  /**
   * The easter egg. Landing on this photo opens the contact modal, titled
   * "Gotcha", once per visit and after a beat so the photo registers first.
   */
  caught?: boolean;
};

export type Chapter = {
  /**
   * The year, set huge. Optional: a stretch of time with no single year
   * (the younger years) leaves it out, and the title takes its place.
   */
  mark?: string;
  title: string;
  /** The line you read first. */
  body: string;
  /** The rest of it, for whoever stays. */
  story?: string;
  /**
   * The photographs for the year, first one showing. More than one makes a
   * carousel. None and the chapter still stands: the frame becomes a field of
   * the year's colour.
   */
  photos?: Photo[];
  /**
   * "left" and "right" split the screen, the photograph edge to edge on that
   * side and the words on the page ground on the other. "full" puts the words
   * over the photograph across the whole screen, for the years that carry the
   * most weight.
   */
  layout: "left" | "right" | "full";
};

/**
 * The story is the page: one year per screen, read top to bottom like a book.
 *
 * After Ferrari's own pages, which mix screens split down the middle with
 * screens that run edge to edge and let the photograph carry the words. The
 * rhythm is the point. A run of identical cards is a list; alternating sides
 * and breaking the run with a full screen is what makes it read as chapters.
 *
 * It warms as it goes. The paint runs from Blu Tour de France in 2008 to Rosso
 * Corsa at the end, the house red, which is where Queso Ventures sits.
 *
 * A thin rail of every year is pinned to the left edge while the chapters are
 * on screen, so you always know how far through you are and can jump. It is
 * drawn in the house colours, the same red to yellow as the rule under the
 * hero, running down the years. Paint holds up on the pale page and over a
 * photograph alike; each dot carries a thin dark ring so it never melts into
 * a sunlit frame, and the year label sits on its own small dark pill.
 *
 * Each chapter reveals once as it arrives: the photograph uncovers from its
 * outer edge and settles from a slight zoom, the words rise in after it.
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


/** What names a chapter on the rail and in its anchor: the year, or else the title. */
const labelOf = (c: Chapter) => c.mark ?? c.title;

export const chapterId = (c: Chapter) =>
  `year-${labelOf(c).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

export default function AboutChapters({
  chapters,
  coda,
}: {
  chapters: Chapter[];
  /** Set under the last chapter's words. */
  coda?: React.ReactNode;
}) {
  const [active, setActive] = useState(0);
  const [onScreen, setOnScreen] = useState(false);
  const book = useRef<HTMLDivElement>(null);
  const n = chapters.length;

  /** The ramp spread over however many chapters there are, ends pinned. */
  const paintAt = (i: number) =>
    RAMP[n < 2 ? RAMP.length - 1 : Math.round((i * (RAMP.length - 1)) / (n - 1))];

  useEffect(() => {
    const root = book.current;
    if (!root) return;

    // The chapter crossing the middle of the screen is the one you are on.
    const current = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    root.querySelectorAll("[data-i]").forEach((el) => current.observe(el));

    // The rail shows only while the chapters fill the screen.
    const whole = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), {
      rootMargin: "-40% 0px -40% 0px",
    });
    whole.observe(root);

    return () => {
      current.disconnect();
      whole.disconnect();
    };
  }, []);

  return (
    <div ref={book} className="relative">
      <nav
        aria-label="Years"
        className={`fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 transition-opacity duration-500 lg:block xl:left-8 ${
          onScreen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ol className="relative flex flex-col gap-5">
          <span
            aria-hidden
            className="absolute bottom-1.5 left-[5px] top-1.5 w-px bg-[#7F8A96]/45"
          >
            {/* The line behind you fills with the ramp, top to where you are. */}
            <span
              className={`block w-full transition-[height] duration-700 ${EASE}`}
              style={{
                height: n > 1 ? `${(active / (n - 1)) * 100}%` : "0%",
                backgroundImage: `linear-gradient(to bottom, ${HOUSE.join(", ")})`,
                backgroundSize: `100% ${n > 1 ? ((n - 1) / Math.max(active, 1)) * 100 : 100}%`,
              }}
            />
          </span>
          {chapters.map((c, i) => {
            const on = i === active;
            const hex = houseAt(i, n);
            return (
              <li key={labelOf(c)}>
                <a
                  href={`#${chapterId(c)}`}
                  aria-current={on}
                  className="group relative flex items-center gap-4 focus:outline-none"
                >
                  <span
                    className={`block h-[11px] w-[11px] rounded-full border-2 transition-all duration-500 ${
                      on ? "scale-125" : "group-hover:scale-125"
                    }`}
                    style={{
                      borderColor: hex,
                      // Passed years are solid; the ones ahead are rings.
                      backgroundColor: i <= active ? hex : "transparent",
                      boxShadow: on
                        ? `0 0 0 1px rgba(8,10,14,0.35), 0 0 14px ${hex}`
                        : "0 0 0 1px rgba(8,10,14,0.25)",
                    }}
                  />
                  <span
                    className={`whitespace-nowrap rounded-full bg-[#0B0D12]/70 px-2.5 py-1 text-xs font-medium tabular-nums tracking-[0.2em] text-white backdrop-blur-sm transition-all duration-500 ${
                      // A chapter with no year has its title on screen already,
                      // and the longer pill would run into it: hover only.
                      on && c.mark
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-90 group-focus-visible:opacity-90"
                    }`}
                  >
                    {labelOf(c)}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      {chapters.map((c, i) => (
        <ChapterScreen
          key={labelOf(c)}
          chapter={c}
          index={i}
          paint={paintAt(i)}
          coda={i === n - 1 ? coda : undefined}
        />
      ))}
    </div>
  );
}

/** Flips once, the first time a quarter of the element is on screen. */
function useSeen<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setSeen(true);
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, seen };
}

function ChapterScreen({
  chapter,
  index,
  paint,
  coda,
}: {
  chapter: Chapter;
  index: number;
  paint: Paint;
  coda?: React.ReactNode;
}) {
  const { ref, seen } = useSeen<HTMLElement>();
  const reel = useReel(chapter.photos ?? []);
  const full = chapter.layout === "full";
  const imageRight = chapter.layout === "right";

  if (full) {
    return (
      <section
        ref={ref}
        id={chapterId(chapter)}
        data-i={index}
        data-dark-section
        className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#0B0D12]"
      >
        <Media chapter={chapter} paint={paint} seen={seen} from="bottom" reel={reel} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(8,10,14,0.92) 0%, rgba(8,10,14,0.6) 32%, rgba(8,10,14,0.15) 65%, rgba(8,10,14,0.25) 100%)",
          }}
        />
        <div className="relative w-full px-6 pb-20 pt-40 sm:px-12 lg:pl-28 xl:pl-36">
          <div className="max-w-2xl" style={{ textShadow: "0 2px 24px rgba(0,0,0,0.4)" }}>
            <Words chapter={chapter} paint={paint} seen={seen} tone="dark" coda={coda} />
          </div>
        </div>
        {/* Over the scrim, in a corner the words leave empty: top on phones, where the words run full width. */}
        <Dots reel={reel} className="right-6 top-24 sm:bottom-20 sm:right-12 sm:top-auto xl:right-16" />
      </section>
    );
  }

  return (
    <section
      ref={ref}
      id={chapterId(chapter)}
      data-i={index}
      className="relative grid bg-lightBG dark:bg-darkBG lg:min-h-[92svh] lg:grid-cols-2"
    >
      <div
        className={`relative aspect-[5/4] overflow-hidden sm:aspect-[16/10] lg:aspect-auto ${
          imageRight ? "lg:order-2" : ""
        }`}
      >
        <Media chapter={chapter} paint={paint} seen={seen} from={imageRight ? "right" : "left"} reel={reel} />
        <Dots reel={reel} className="bottom-6 left-1/2 -translate-x-1/2" />
      </div>
      <div
        className={`flex items-center px-6 py-16 sm:px-12 lg:py-24 ${
          imageRight ? "lg:pl-28 lg:pr-16 xl:pl-36 xl:pr-24" : "lg:px-16 xl:px-24"
        }`}
      >
        <div className="max-w-xl">
          <Words chapter={chapter} paint={paint} seen={seen} tone="light" coda={coda} />
        </div>
      </div>
    </section>
  );
}

/**
 * The frame: the year's photograph, or a field of its colour when there is none.
 *
 * It uncovers from the outside edge of the screen inwards, like a page being
 * turned onto it, while the picture underneath settles from a 12% zoom.
 */
function Media({
  chapter,
  paint,
  seen,
  from,
  reel,
}: {
  chapter: Chapter;
  paint: Paint;
  seen: boolean;
  from: "left" | "right" | "bottom";
  reel: Reel;
}) {
  const hidden =
    from === "left" ? "inset(0 100% 0 0)" : from === "right" ? "inset(0 0 0 100%)" : "inset(100% 0 0 0)";
  const photos = chapter.photos ?? [];

  return (
    <div
      className={`absolute inset-0 transition-[clip-path] duration-[1300ms] ${EASE} motion-reduce:transition-none`}
      style={{ clipPath: seen ? "inset(0 0 0 0)" : hidden }}
    >
      <div
        className={`absolute inset-0 transition-transform duration-[2200ms] ${EASE} motion-reduce:transition-none ${
          seen ? "scale-100" : "scale-[1.12]"
        }`}
      >
        {photos.length > 0 ? (
          /*
            Every frame is stacked and crossfaded rather than swapped, so the
            next photo is already decoded and the frame never flashes empty.
            The incoming one also settles from a hair of zoom.
          */
          photos.map((p, k) => (
            <div
              key={p.src}
              aria-hidden={k !== reel.at}
              className={`absolute inset-0 transition-[opacity,transform] duration-[1000ms] ${EASE} motion-reduce:transition-none ${
                k === reel.at ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
              }`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes={chapter.layout === "full" ? "100vw" : "(max-width: 1024px) 100vw, 50vw"}
                className="object-cover"
                style={{ objectPosition: p.position ?? "center" }}
              />
            </div>
          ))
        ) : (
          /*
            No photograph yet: a field of the year's colour over a fine dot
            grid. It used to draw the year in outline, which put the same four
            digits on both halves of the screen.
          */
          <div
            aria-hidden
            className="absolute inset-0 bg-[#0E1117]"
            style={{
              backgroundImage: `radial-gradient(ellipse at 30% 75%, ${paint.hex}55, transparent 60%), radial-gradient(ellipse at 85% 10%, ${paint.hex}22, transparent 55%), radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)`,
              backgroundSize: "auto, auto, 22px 22px",
            }}
          />
        )}
      </div>

      {/* The whole frame is the next button, and a swipe on touch. */}
      {reel.n > 1 && (
        <button
          type="button"
          tabIndex={-1}
          aria-hidden
          onClick={() => reel.show(reel.at + 1)}
          onTouchStart={reel.touchStart}
          onTouchEnd={reel.touchEnd}
          className="absolute inset-0 cursor-pointer"
        />
      )}
    </div>
  );
}

/*
  One carousel per chapter. The egg fires once per page load, not once per
  chapter, so it lives outside the component.
*/
let caughtThisVisit = false;
const CAUGHT_DELAY_MS = 900;

type Reel = ReturnType<typeof useReel>;

function useReel(photos: Photo[]) {
  const [at, setAt] = useState(0);
  const touchX = useRef<number | null>(null);
  const n = photos.length;

  const show = (to: number) => {
    if (n < 2) return;
    const k = ((to % n) + n) % n;
    setAt(k);
    if (photos[k].caught && !caughtThisVisit) {
      caughtThisVisit = true;
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent("contact:prefill", {
            detail: { title: "Gotcha", message: "I like to click around." },
          })
        );
        window.dispatchEvent(new CustomEvent("modal:open", { detail: { id: "contact-popup" } }));
      }, CAUGHT_DELAY_MS);
    }
  };

  return {
    at,
    n,
    show,
    touchStart: (e: React.TouchEvent) => (touchX.current = e.touches[0].clientX),
    touchEnd: (e: React.TouchEvent) => {
      if (touchX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchX.current;
      touchX.current = null;
      if (Math.abs(dx) > 40) show(at + (dx < 0 ? 1 : -1));
    },
  };
}

/**
 * Where you are in a year's photos, without a number in sight. The current
 * one is a short bar, the rest are dots, and a dot swells under the pointer.
 */
function Dots({ reel, className }: { reel: Reel; className: string }) {
  if (reel.n < 2) return null;
  return (
    <div className={`absolute z-10 flex items-center gap-2.5 ${className}`}>
      {Array.from({ length: reel.n }, (_, k) => {
        const on = k === reel.at;
        return (
          <button
            key={k}
            type="button"
            aria-label={`Photo ${k + 1} of ${reel.n}`}
            aria-current={on}
            onClick={() => reel.show(k)}
            className="group grid h-6 place-items-center focus:outline-none"
          >
            <span
              className={`block h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(0,0,0,0.45)] transition-all duration-500 ${EASE} ${
                on
                  ? "w-6 opacity-100"
                  : "w-1.5 opacity-50 group-hover:w-2.5 group-hover:opacity-90 group-focus-visible:opacity-90"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

function Words({
  chapter,
  paint,
  seen,
  tone,
  coda,
}: {
  chapter: Chapter;
  paint: Paint;
  seen: boolean;
  tone: "light" | "dark";
  coda?: React.ReactNode;
}) {
  const dark = tone === "dark";
  const rise = (delay: number) => ({
    className: `transition-all duration-[1000ms] ${EASE} motion-reduce:transition-none ${
      seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`,
    style: { transitionDelay: `${delay}ms` },
  });

  const ink = dark ? "text-white" : "text-lightText dark:text-darkText";
  const rule = (
    <span
      aria-hidden
      className={`mt-8 block h-[3px] rounded-full transition-[width] duration-[1200ms] ${EASE} motion-reduce:transition-none`}
      style={{ width: seen ? "3.5rem" : "0rem", transitionDelay: "500ms", backgroundColor: paint.hex }}
    />
  );

  return (
    <>
      {chapter.mark ? (
        <>
          <p
            aria-hidden
            style={rise(250).style}
            className={`${rise(250).className} text-[5.5rem] font-extralight leading-[0.85] tracking-tighter tabular-nums sm:text-[7rem] xl:text-[9rem] ${ink}`}
          >
            {chapter.mark}
          </p>
          {rule}
          <h3
            style={rise(400).style}
            className={`${rise(400).className} mt-8 text-3xl font-light tracking-tight text-balance sm:text-4xl xl:text-5xl ${ink}`}
          >
            {/* The year is read out here, since the big numeral is aria-hidden. */}
            <span className="sr-only">{chapter.mark}: </span>
            {chapter.title}
          </h3>
        </>
      ) : (
        <>
          {/*
            No year: the title is the display line, in the numeral's weight
            but a size down, since it is words rather than four digits.
          */}
          <h3
            style={rise(250).style}
            className={`${rise(250).className} text-6xl font-extralight leading-[0.95] tracking-tighter text-balance sm:text-7xl ${ink}`}
          >
            {chapter.title}
          </h3>
          {rule}
        </>
      )}
      <p
        style={rise(520).style}
        className={`${rise(520).className} mt-6 text-xl font-light leading-relaxed ${
          dark ? "text-white/90" : "text-lightText/85 dark:text-darkText/85"
        }`}
      >
        {chapter.body}
      </p>
      {chapter.story && (
        <p
          style={rise(640).style}
          className={`${rise(640).className} mt-4 text-lg font-light leading-relaxed ${
            dark ? "text-white/70" : "text-lightTextMuted dark:text-darkTextMuted"
          }`}
        >
          {chapter.story}
        </p>
      )}
      {coda && (
        <div style={rise(760).style} className={rise(760).className}>
          {coda}
        </div>
      )}
    </>
  );
}
