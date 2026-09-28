"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  PiBrowsersDuotone,
  PiCpuDuotone,
  PiGlobeHemisphereWestDuotone,
  PiMapPinDuotone,
  PiPuzzlePieceDuotone,
  PiSquaresFourDuotone,
  PiWrenchDuotone,
} from "react-icons/pi";
import ArrowMark, { arrowTone } from "components/ArrowMark";
import { liveryAt } from "components/livery";

export type DeckCard = {
  /** The big coloured word. Without it, the title takes its place. */
  mark?: string;
  title: string;
  body: string;
  icon?: "browser" | "cpu" | "puzzle" | "tools" | "pin" | "globe" | "wrench";
  href?: string;
  cta?: string;
};

/*
  Icons are chosen here, not passed in: the page is a server component and a
  component function cannot cross into a client one as a prop. Phosphor's
  duotone set, because it reads as drawn rather than clip art.
*/
const ICONS: Record<DeckCard["icon"], IconType> = {
  browser: PiBrowsersDuotone,
  cpu: PiCpuDuotone,
  puzzle: PiPuzzlePieceDuotone,
  tools: PiSquaresFourDuotone,
  pin: PiMapPinDuotone,
  globe: PiGlobeHemisphereWestDuotone,
  wrench: PiWrenchDuotone,
};

/**
 * A deck you page through by scrolling, with its own index. First drawn for
 * What Queso Ventures is on the About page; now every card set on the site.
 *
 * Modelled on the free report's PillarDeck in the portal. The chosen card
 * sits upright in front and the rest are stacked behind it in reading order,
 * the ones already read to the left and the ones still to come to the right,
 * each a step further back. It does not wrap: the order is the pitch.
 *
 * The heading and an index hold the left of the row and the deck the right,
 * like a contents page beside the page it opens to. The index and the deck are
 * one control: pointing at a line lifts its card, choosing a line brings the
 * card forward, and choosing a card lights its line. No numbers anywhere; the
 * lines and the pile already say where you are.
 *
 * The page scrolls through the deck. The section is pinned for a screen per
 * card and the scroll position picks the card, so reading down the page deals
 * them one after another, then lets go. Clicking a line or a card scrolls to
 * that card's stretch rather than jumping, so scroll and state never disagree.
 * Without room for the pin (below lg) or with reduced motion, nothing is
 * pinned and choosing works directly.
 *
 * The deck is a desktop idea only. Below lg a stack of tipped cards is a pile
 * of corners, so phones and tablets get the same faces one after another, open.
 */
/** One easing for every move: quick off the mark, long soft landing. */
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const MOVE_MS = 650;
/** Gap between cards as the deck is dealt out. */
const DEAL_STAGGER_MS = 90;

/** Horizontal place of a card `d` steps from the chosen one, in % of a card's width. */
const place = (d: number) =>
  d === 0 ? 0 : Math.sign(d) * (40 + (Math.abs(d) - 1) * 12);

export default function Deck({
  cards,
  children,
  label = "What Queso Ventures is",
  index = true,
}: {
  cards: DeckCard[];
  /** The heading, set above the index. */
  children: React.ReactNode;
  /** What the deck is, for screen readers. */
  label?: string;
  /**
   * The line per card beside the deck. Off when the cards' own titles are
   * long sentences: an index of them would only say everything twice.
   */
  index?: boolean;
}) {
  const [active, setActive] = useState(0);
  const [peek, setPeek] = useState<number | null>(null);
  const [dealt, setDealt] = useState(false);
  /** The deal has finished; from here on every move is immediate, no stagger. */
  const [settled, setSettled] = useState(false);
  const deck = useRef<HTMLDivElement>(null);
  /** The tall run of page the pinned deck scrolls through. */
  const track = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const n = cards.length;

  // Pinned only where there is a deck to show and motion is welcome.
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => setPinned(wide.matches && !calm.matches);
    decide();
    wide.addEventListener("change", decide);
    calm.addEventListener("change", decide);
    return () => {
      wide.removeEventListener("change", decide);
      calm.removeEventListener("change", decide);
    };
  }, []);

  // Where the page is in the track decides the card: an equal stretch each.
  useEffect(() => {
    if (!pinned) return;
    let raf = 0;
    const update = () => {
      const el = track.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      if (span <= 0) return;
      const p = Math.min(1, Math.max(0, -r.top / span));
      setActive(Math.min(n - 1, Math.floor(p * n)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pinned, n]);

  /*
    The deal. The deck waits as one squared up pile until it scrolls into
    view, then spreads out one card after another. Reduced motion skips
    straight to the spread.
  */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !deck.current) {
      setDealt(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setDealt(true);
      },
      { threshold: 0.35 }
    );
    observer.observe(deck.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!dealt) return;
    const t = setTimeout(() => setSettled(true), MOVE_MS + n * DEAL_STAGGER_MS);
    return () => clearTimeout(t);
  }, [dealt, n]);

  const go = (to: number) => {
    const i = Math.max(0, Math.min(n - 1, to));
    const el = track.current;
    if (!pinned || !el) {
      setActive(i);
      return;
    }
    // The middle of that card's stretch, so a small nudge does not leave it.
    const span = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + ((i + 0.5) / n) * span, behavior: "smooth" });
  };
  const keys = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      go(active - 1);
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      go(active + 1);
    }
  };

  /*
    Stacking everything to one side of the chosen card leaves the other side
    empty on the first and last card. The whole deck is shifted so the pile,
    not the chosen card, sits in the middle of its column.
  */
  const xs = cards.map((_, i) => place(i - active));
  const centre = (Math.min(...xs) + Math.max(...xs)) / 2;

  return (
    <div
      ref={track}
      // A screen for the first card and most of one more for each after it.
      style={pinned ? { height: `calc(100vh + ${(n - 1) * 70}vh)` } : undefined}
    >
      <div className={pinned ? "sticky top-0 flex h-screen items-center pt-[76px]" : ""}>
        <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,5fr),minmax(0,7fr)] lg:gap-10 xl:gap-16">
          <div>
            {children}

            {/* The index. Desktop only, since below lg there is no deck to steer. */}
            {index && (
              <ol className="mt-12 hidden lg:block" onMouseLeave={() => setPeek(null)} onKeyDown={keys}>
                {cards.map((card, i) => {
                  const on = i === active;
                  const paint = liveryAt(i);
                  return (
                    <li key={card.title}>
                      <button
                        type="button"
                        aria-current={on}
                        onClick={() => go(i)}
                        onMouseEnter={() => setPeek(i === active ? null : i)}
                        onFocus={() => go(i)}
                        className="group flex w-full items-center gap-5 py-3.5 text-left focus:outline-none"
                      >
                        <span
                          aria-hidden
                          className={`h-[2px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            on
                              ? "w-14"
                              : "w-5 bg-lightBorder dark:bg-darkBorder group-hover:w-9 group-hover:bg-lightTextMuted/50 dark:group-hover:bg-darkTextMuted/50"
                          }`}
                          style={on ? { backgroundColor: paint.hex } : undefined}
                        />
                        <span
                          className={`text-2xl tracking-tight transition-all duration-500 ${
                            on
                              ? "font-medium text-lightText dark:text-darkText"
                              : "font-light text-lightTextMuted dark:text-darkTextMuted group-hover:translate-x-1 group-hover:text-lightText dark:group-hover:text-darkText group-focus-visible:text-lightText"
                          }`}
                        >
                          {card.mark ?? card.title}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            )}

          </div>

          <div>
            <div className="lg:hidden grid gap-4 sm:grid-cols-2">
              {cards.map((card, i) => (
                <Face key={card.title} card={card} index={i} state="on" />
              ))}
            </div>

            <div
              ref={deck}
              tabIndex={0}
              role="group"
              aria-roledescription="deck"
              aria-label={`${label}, card ${active + 1} of ${n}`}
              onKeyDown={keys}
              onMouseLeave={() => setPeek(null)}
              className="relative hidden h-[27rem] rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-lightAccent/40 dark:focus-visible:ring-darkAccent/40 lg:block"
            >
              {cards.map((card, i) => {
                const d = i - active;
                const a = Math.abs(d);
                const on = dealt && d === 0;
                const peeking = dealt && !on && peek === i;

                let transform: string;
                if (!dealt) {
                  // Squared up in the middle, a hair of scatter so it reads as a pile.
                  const pos = i - (n - 1) / 2;
                  transform = `translateX(calc(-50% + ${pos * 3}%)) translateY(24px) rotate(${pos * 1.5}deg) scale(0.94)`;
                } else {
                  // Each step back: further out, lower, smaller, tipped a bit more.
                  // A card being pointed at comes up and straightens partway.
                  const lift = peeking ? -18 : 0;
                  const tip = Math.sign(d) * Math.min(a, 3) * (peeking ? 2.5 : 4);
                  transform = `translateX(calc(-50% + ${xs[i] - centre}%)) translateY(${a * 14 + lift}px) rotate(${tip}deg) scale(${1 - a * 0.07})`;
                }

                return (
                  <div
                    key={card.title}
                    onMouseEnter={() => setPeek(i)}
                    onClick={() => go(i)}
                    onFocus={() => go(i)}
                    className={`absolute left-1/2 top-3 h-[22.5rem] w-[58%] origin-bottom will-change-transform ${
                      on ? "" : "cursor-pointer"
                    }`}
                    style={{
                      transform,
                      /*
                        The card coming forward jumps to the top at once. The one
                        going back keeps its height until it is most of the way
                        there, so it slides under its neighbour instead of
                        vanishing behind it mid move.
                      */
                      transition: !dealt
                        ? "none"
                        : settled
                          ? `transform ${MOVE_MS}ms ${EASE}, z-index 0s linear ${on ? 0 : MOVE_MS * 0.45}ms`
                          : `transform ${MOVE_MS}ms ${EASE} ${i * DEAL_STAGGER_MS}ms`,
                      zIndex: 40 - a,
                    }}
                  >
                    <Face card={card} index={i} state={on ? "on" : peeking ? "peek" : "off"} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Face({
  card,
  index,
  state,
}: {
  card: DeckCard;
  index: number;
  state: "on" | "peek" | "off";
}) {
  const paint = liveryAt(index);
  const Icon = card.icon ? ICONS[card.icon] : null;

  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-3xl border border-lightBorder dark:border-darkBorder bg-panelLight dark:bg-panelDark p-8 pt-10 transition-shadow duration-500 ${
        state === "on"
          ? "shadow-2xl shadow-black/10 dark:shadow-black/40"
          : "shadow-lg shadow-black/5"
      }`}
    >
      {/* Livery stripe across the top, full bleed. */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1.5"
        style={{ backgroundColor: paint.hex }}
      />

      {Icon && (
        <span
          aria-hidden
          className="mb-7 inline-flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${paint.hex}1f`, color: paint.ink }}
        >
          <Icon className="h-7 w-7" />
        </span>
      )}

      {card.mark ? (
        <>
          {/* Ink on the light page, the factory paint on the dark one. */}
          <p
            className="text-3xl xl:text-4xl font-semibold tracking-tight text-balance text-[color:var(--paint-ink)] dark:text-[color:var(--paint)]"
            style={{ "--paint": paint.hex, "--paint-ink": paint.ink } as React.CSSProperties}
          >
            {card.mark}
          </p>
          <h3 className="mt-3 text-xl xl:text-2xl font-semibold tracking-tight text-lightText dark:text-darkText text-balance">
            {card.title}
          </h3>
        </>
      ) : (
        // No mark: the title is the face, a size down from a mark since it is
        // usually a sentence rather than a word.
        <h3 className="text-2xl xl:text-[1.75rem] font-light leading-snug tracking-tight text-lightText dark:text-darkText text-balance">
          {card.title}
        </h3>
      )}
      <p className="mt-3 text-lg font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">
        {card.body}
      </p>

      {card.href && card.cta && (
        <Link href={card.href} className={`${arrowTone("light")} mt-auto pt-6`}>
          <ArrowMark label={card.cta} />
        </Link>
      )}

      {/*
        The cards behind are set back with a veil of the page colour rather
        than faded, so they stay solid and still hide what is under them.
        Pointing at one thins the veil, which is half the invitation to click.
      */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-lightBG dark:bg-darkBG transition-opacity duration-500 ${
          state === "on" ? "opacity-0" : state === "peek" ? "opacity-20" : "opacity-40"
        }`}
      />
    </div>
  );
}
