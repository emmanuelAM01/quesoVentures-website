"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  PiArrowRightBold,
  PiBrowsersDuotone,
  PiCpuDuotone,
  PiPuzzlePieceDuotone,
  PiSquaresFourDuotone,
} from "react-icons/pi";
import { liveryAt } from "components/livery";

export type HandCard = {
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
const ICONS: Record<HandCard["icon"], IconType> = {
  browser: PiBrowsersDuotone,
  cpu: PiCpuDuotone,
  puzzle: PiPuzzlePieceDuotone,
  tools: PiSquaresFourDuotone,
};

/**
 * What Queso Ventures is, dealt as a hand of four cards.
 *
 * The same idea as the free report's PillarDeck in the portal: a list of
 * points is a list, an accordion is an FAQ, so they are fanned instead. Every
 * card stays where it was dealt; pointing at one (or tabbing to it, or tapping
 * it) stands it upright and brings it forward, and the rest stay readable
 * behind it. The order is the pitch, left to right, so a hand that never
 * reshuffles keeps it.
 *
 * The fan is a desktop idea only. Below lg four tipped cards are a pile of
 * corners, so phones and tablets get the same faces one after another, open.
 */
/** One easing for every move: quick off the mark, long soft landing. */
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const MOVE_MS = 700;
/** How long the pointer has to rest on a card before it is picked up. */
const HOVER_INTENT_MS = 90;
/** Gap between cards as the hand is dealt out. */
const DEAL_STAGGER_MS = 90;

export default function AboutHand({ cards }: { cards: HandCard[] }) {
  const [active, setActive] = useState(0);
  const [dealt, setDealt] = useState(false);
  /** The deal has finished; from here on every move is immediate, no stagger. */
  const [settled, setSettled] = useState(false);
  const hand = useRef<HTMLDivElement>(null);
  const intent = useRef<ReturnType<typeof setTimeout> | null>(null);
  const n = cards.length;

  /*
    The deal. The hand waits as one squared up pile in the middle until it
    scrolls into view, then fans out left to right, one card after another.
    Reduced motion skips straight to the fan.
  */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !hand.current) {
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
    observer.observe(hand.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!dealt) return;
    const t = setTimeout(() => setSettled(true), MOVE_MS + n * DEAL_STAGGER_MS);
    return () => clearTimeout(t);
  }, [dealt, n]);

  useEffect(() => () => {
    if (intent.current) clearTimeout(intent.current);
  }, []);

  /*
    Sweeping the pointer across the fan crosses every card on the way. Picking
    each one up as it passes is what made the hand twitch, so a card is only
    lifted once the pointer settles on it for a beat.
  */
  const hover = (i: number) => {
    if (intent.current) clearTimeout(intent.current);
    intent.current = setTimeout(() => setActive(i), HOVER_INTENT_MS);
  };

  return (
    <>
      <div className="lg:hidden grid gap-4 sm:grid-cols-2">
        {cards.map((card, i) => (
          <Face key={card.title} card={card} index={i} on />
        ))}
      </div>

      <div ref={hand} className="hidden lg:block relative h-[27rem]">
        {cards.map((card, i) => {
          const pos = i - (n - 1) / 2;
          const on = dealt && i === active;
          const x = dealt ? pos * 75 : pos * 3;

          let transform: string;
          if (!dealt) {
            // Squared up in the middle, a hair of scatter so it reads as a pile.
            transform = `translateX(calc(-50% + ${x}%)) translateY(24px) rotate(${pos * 1.5}deg) scale(0.94)`;
          } else if (on) {
            // Picked up: upright, lifted, a touch closer.
            transform = `translateX(calc(-50% + ${x}%)) translateY(-22px) rotate(0deg) scale(1.04)`;
          } else {
            // In the hand: tipped out along an arc, and eased away from the
            // card that is up, so the one you are reading has room.
            const away = i < active ? -1.5 : i > active ? 1.5 : 0;
            transform = `translateX(calc(-50% + ${x + away}%)) translateY(${Math.abs(pos) * 12 + 6}px) rotate(${pos * 4}deg) scale(0.95)`;
          }

          return (
            <div
              key={card.title}
              tabIndex={0}
              onMouseEnter={() => hover(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className="absolute left-1/2 top-6 h-[23rem] w-[30%] origin-bottom cursor-pointer will-change-transform focus:outline-none"
              style={{
                transform,
                /*
                  The card being picked up jumps to the top at once. The one
                  being put down keeps its height until it is most of the way
                  back into the hand, so it slides under its neighbour instead
                  of vanishing behind it mid move.
                */
                transition: !dealt
                  ? "none"
                  : settled
                    ? `transform ${MOVE_MS}ms ${EASE}, z-index 0s linear ${on ? 0 : MOVE_MS * 0.45}ms`
                    : `transform ${MOVE_MS}ms ${EASE} ${i * DEAL_STAGGER_MS}ms`,
                // Like a real hand, each card lies on the one to its left, so the
                // left edge of every face, where the words start, stays in view.
                zIndex: on ? 40 : 10 + i,
              }}
            >
              <Face card={card} index={i} on={on} />
            </div>
          );
        })}
      </div>
    </>
  );
}

function Face({ card, index, on }: { card: HandCard; index: number; on: boolean }) {
  const paint = liveryAt(index);
  const Icon = ICONS[card.icon];

  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-3xl border bg-panelLight dark:bg-panelDark p-7 pt-9 transition-shadow duration-500 ${
        on
          ? "border-lightBorder dark:border-darkBorder shadow-2xl shadow-black/10 dark:shadow-black/40"
          : "border-lightBorder dark:border-darkBorder shadow-md shadow-black/5"
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

      <p
        className="mt-6 text-3xl xl:text-4xl font-semibold tracking-tight text-balance"
        style={{ color: paint.ink }}
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
    </div>
  );
}
