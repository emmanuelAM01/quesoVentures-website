"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  PiArrowLeftBold,
  PiArrowRightBold,
  PiBrowsersDuotone,
  PiCpuDuotone,
  PiPuzzlePieceDuotone,
  PiSquaresFourDuotone,
} from "react-icons/pi";
import { liveryAt } from "components/livery";

export type DeckCard = {
  mark: string;
  title: string;
  body: string;
  icon: "browser" | "cpu" | "puzzle" | "tools";
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
};

/**
 * What Queso Ventures is, as a deck you page through.
 *
 * Modelled on the free report's PillarDeck in the portal, which is the version
 * that worked. The fan this replaced left every card where it was dealt and
 * only lifted the one under the pointer, so nothing ever moved and there was
 * no sense of being partway through anything.
 *
 * Here the chosen card sits upright in front and the rest are stacked behind
 * it in reading order, the ones already read to the left and the ones still to
 * come to the right, each a step further back. Where you are is answered by
 * the shape of the pile before anyone looks at the pips. Pointing at a card
 * behind lifts it a little, clicking brings it forward, and the arrows, the
 * pips and the arrow keys all do the same.
 *
 * Unlike the report's three card loop, this deck does not wrap. The order is
 * the pitch, and a loop would put the last card beside the first.
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
  d === 0 ? 0 : Math.sign(d) * (48 + (Math.abs(d) - 1) * 13);

export default function AboutDeck({ cards }: { cards: DeckCard[] }) {
  const [active, setActive] = useState(0);
  const [peek, setPeek] = useState<number | null>(null);
  const [dealt, setDealt] = useState(false);
  /** The deal has finished; from here on every move is immediate, no stagger. */
  const [settled, setSettled] = useState(false);
  const deck = useRef<HTMLDivElement>(null);
  const n = cards.length;

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

  const go = (i: number) => setActive(Math.max(0, Math.min(n - 1, i)));

  /*
    Stacking everything to one side of the chosen card leaves the other side
    empty on the first and last card. The whole deck is shifted so the pile,
    not the chosen card, sits in the middle of the row.
  */
  const xs = cards.map((_, i) => place(i - active));
  const centre = (Math.min(...xs) + Math.max(...xs)) / 2;
  const paint = liveryAt(active);

  return (
    <>
      <div className="lg:hidden grid gap-4 sm:grid-cols-2">
        {cards.map((card, i) => (
          <Face key={card.title} card={card} index={i} state="on" />
        ))}
      </div>

      <div className="hidden lg:block">
        <div
          ref={deck}
          tabIndex={0}
          role="group"
          aria-roledescription="deck"
          aria-label={`What Queso Ventures is, card ${active + 1} of ${n}`}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              go(active - 1);
            } else if (e.key === "ArrowRight") {
              e.preventDefault();
              go(active + 1);
            }
          }}
          onMouseLeave={() => setPeek(null)}
          className="relative h-[27rem] rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-lightAccent/40 dark:focus-visible:ring-darkAccent/40"
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
              const lift = peeking ? -16 : 0;
              const tip = Math.sign(d) * Math.min(a, 3) * (peeking ? 2.5 : 4);
              transform = `translateX(calc(-50% + ${xs[i] - centre}%)) translateY(${a * 14 + lift}px) rotate(${tip}deg) scale(${1 - a * 0.07})`;
            }

            return (
              <div
                key={card.title}
                onMouseEnter={() => setPeek(i)}
                onClick={() => go(i)}
                onFocus={() => go(i)}
                className={`absolute left-1/2 top-2 h-[23rem] w-[36%] origin-bottom will-change-transform ${
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

        {/* Where you are, and the way to the next one. */}
        <div className="mt-8 flex items-center justify-center gap-5">
          <StepButton label="Previous card" disabled={active === 0} onClick={() => go(active - 1)}>
            <PiArrowLeftBold className="h-4 w-4" />
          </StepButton>

          <div className="flex items-center gap-2">
            {cards.map((card, i) => (
              <button
                key={card.title}
                type="button"
                aria-label={card.mark}
                aria-current={i === active}
                onClick={() => go(i)}
                className="group flex h-6 items-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-500 ${
                    i === active
                      ? "w-14"
                      : "w-8 bg-lightBorder dark:bg-darkBorder group-hover:bg-lightTextMuted/40 dark:group-hover:bg-darkTextMuted/40"
                  }`}
                  style={i === active ? { backgroundColor: liveryAt(i).hex } : undefined}
                />
              </button>
            ))}
          </div>

          <StepButton label="Next card" disabled={active === n - 1} onClick={() => go(active + 1)}>
            <PiArrowRightBold className="h-4 w-4" />
          </StepButton>
        </div>
        <p className="mt-3 text-center text-sm text-lightTextMuted dark:text-darkTextMuted tabular-nums">
          <span
            className="font-semibold text-[color:var(--paint-ink)] dark:text-[color:var(--paint)]"
            style={{ "--paint": paint.hex, "--paint-ink": paint.ink } as React.CSSProperties}
          >
            {cards[active].mark}
          </span>{" "}
          &middot; {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </p>
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
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-lightBorder dark:border-darkBorder bg-panelLight dark:bg-panelDark text-lightText dark:text-darkText transition hover:-translate-y-0.5 hover:shadow-md disabled:pointer-events-none disabled:opacity-30"
    >
      {children}
    </button>
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
  const Icon = ICONS[card.icon];

  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-3xl border border-lightBorder dark:border-darkBorder bg-panelLight dark:bg-panelDark p-7 pt-9 transition-shadow duration-500 ${
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

      <span
        aria-hidden
        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl"
        style={{ backgroundColor: `${paint.hex}1f`, color: paint.ink }}
      >
        <Icon className="h-7 w-7" />
      </span>

      {/* Ink on the light page, the factory paint on the dark one. */}
      <p
        className="mt-6 text-3xl xl:text-4xl font-semibold tracking-tight text-balance text-[color:var(--paint-ink)] dark:text-[color:var(--paint)]"
        style={{ "--paint": paint.hex, "--paint-ink": paint.ink } as React.CSSProperties}
      >
        {card.mark}
      </p>
      <h3 className="mt-3 text-xl font-semibold tracking-tight text-lightText dark:text-darkText text-balance">
        {card.title}
      </h3>
      <p className="mt-2 text-lg font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">
        {card.body}
      </p>

      {card.href && card.cta && (
        <Link
          href={card.href}
          className="mt-auto inline-flex items-center gap-2 pt-5 text-base font-semibold text-lightText dark:text-darkText hover:gap-3 transition-all"
        >
          {card.cta}
          <PiArrowRightBold className="h-4 w-4" aria-hidden />
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
