"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PAINT, type Paint } from "components/livery";

export type Chapter = {
  /** The year, or the span: "2008", "2010s". */
  mark: string;
  title: string;
  /** The line you read first. */
  body: string;
  /** The rest of it, for whoever stays. */
  story?: string;
  /**
   * The photograph for the year. Without one the chapter still stands: the
   * frame becomes a field of the year's colour.
   */
  image?: { src: string; alt: string; position?: string };
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
 * drawn in `mix-blend-difference`, which keeps it legible over the pale page
 * and a dark photograph alike without having to know which it is over.
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

export const chapterId = (mark: string) => `year-${mark}`;

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
        className={`fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 text-white mix-blend-difference transition-opacity duration-500 lg:block xl:left-8 ${
          onScreen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ol className="relative flex flex-col gap-5">
          <span aria-hidden className="absolute bottom-1.5 left-[5px] top-1.5 w-px bg-white/30">
            <span
              className={`block w-full bg-white transition-[height] duration-700 ${EASE}`}
              style={{ height: n > 1 ? `${(active / (n - 1)) * 100}%` : "0%" }}
            />
          </span>
          {chapters.map((c, i) => {
            const on = i === active;
            return (
              <li key={c.mark}>
                <a
                  href={`#${chapterId(c.mark)}`}
                  aria-current={on}
                  className="group relative flex items-center gap-4 focus:outline-none"
                >
                  <span
                    className={`block h-[11px] w-[11px] rounded-full border border-white transition-all duration-500 ${
                      i <= active ? "bg-white" : "bg-black"
                    } ${on ? "scale-125" : "group-hover:scale-125"}`}
                  />
                  <span
                    className={`text-xs font-medium tabular-nums tracking-[0.2em] transition-all duration-500 ${
                      on
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-70 group-focus-visible:opacity-70"
                    }`}
                  >
                    {c.mark}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      {chapters.map((c, i) => (
        <ChapterScreen
          key={c.mark}
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
  const full = chapter.layout === "full";
  const imageRight = chapter.layout === "right";

  if (full) {
    return (
      <section
        ref={ref}
        id={chapterId(chapter.mark)}
        data-i={index}
        data-dark-section
        className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#0B0D12]"
      >
        <Media chapter={chapter} paint={paint} seen={seen} from="bottom" />
        <div
          aria-hidden
          className="absolute inset-0"
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
      </section>
    );
  }

  return (
    <section
      ref={ref}
      id={chapterId(chapter.mark)}
      data-i={index}
      className="relative grid bg-lightBG dark:bg-darkBG lg:min-h-[92svh] lg:grid-cols-2"
    >
      <div
        className={`relative aspect-[4/5] overflow-hidden sm:aspect-[16/10] lg:aspect-auto ${
          imageRight ? "lg:order-2" : ""
        }`}
      >
        <Media chapter={chapter} paint={paint} seen={seen} from={imageRight ? "right" : "left"} />
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
}: {
  chapter: Chapter;
  paint: Paint;
  seen: boolean;
  from: "left" | "right" | "bottom";
}) {
  const hidden =
    from === "left" ? "inset(0 100% 0 0)" : from === "right" ? "inset(0 0 0 100%)" : "inset(100% 0 0 0)";

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
        {chapter.image ? (
          <Image
            src={chapter.image.src}
            alt={chapter.image.alt}
            fill
            sizes={chapter.layout === "full" ? "100vw" : "(max-width: 1024px) 100vw, 50vw"}
            className="object-cover"
            style={{ objectPosition: chapter.image.position ?? "center" }}
          />
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

  return (
    <>
      <p
        aria-hidden
        style={rise(250).style}
        className={`${rise(250).className} text-[5.5rem] font-extralight leading-[0.85] tracking-tighter tabular-nums sm:text-[7rem] xl:text-[9rem] ${
          dark ? "text-white" : "text-lightText dark:text-darkText"
        }`}
      >
        {chapter.mark}
      </p>
      <span
        aria-hidden
        className={`mt-8 block h-[3px] rounded-full transition-[width] duration-[1200ms] ${EASE} motion-reduce:transition-none`}
        style={{ width: seen ? "3.5rem" : "0rem", transitionDelay: "500ms", backgroundColor: paint.hex }}
      />
      <h3
        style={rise(400).style}
        className={`${rise(400).className} mt-8 text-3xl font-light tracking-tight text-balance sm:text-4xl xl:text-5xl ${
          dark ? "text-white" : "text-lightText dark:text-darkText"
        }`}
      >
        {/* The year is read out here, since the big numeral is aria-hidden. */}
        <span className="sr-only">{chapter.mark}: </span>
        {chapter.title}
      </h3>
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
