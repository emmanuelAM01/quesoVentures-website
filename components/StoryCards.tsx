"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { PiArrowsClockwiseBold } from "react-icons/pi";
import Glow from "components/Glow";
import Reveal from "components/Reveal";
import { liveryAt } from "components/livery";

export type StoryCard = {
  mark: string;
  title: string;
  /** The front: one short line, for skimming. */
  body: string;
  /** The back: the story the way I would tell it. No story, no flip. */
  story?: string;
};

/**
 * The timeline, two sided.
 *
 * The front is for the skim: year, one bold line, one sentence. The back is
 * the story told the long way. With a pointer it turns over on hover, since a
 * click to flip went unnoticed even by the person who wrote it; touch has no
 * hover, so a tap turns it. Keyboard users get Enter or Space. The cards used to carry the long
 * version on their face and read like an essay squeezed into boxes.
 *
 * Both faces sit in the same grid cell rather than one being absolutely
 * positioned over the other, so the card is always as tall as its longer side
 * and a long story can never be clipped.
 */
const HOVER_INTENT_MS = 140;

export default function StoryCards({
  cards,
  offset = 0,
  between,
}: {
  cards: StoryCard[];
  offset?: number;
  /** Rendered full width after card `index`, for an aside between rows. */
  between?: { index: number; node: React.ReactNode };
}) {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  /** A real pointer that can hover. Decided after mount, so touch stays tap. */
  const [canHover, setCanHover] = useState(false);
  const intent = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
    return () => {
      if (intent.current) clearTimeout(intent.current);
    };
  }, []);

  /*
    A short wait before turning, so moving the pointer down the page past the
    cards does not flip each one it crosses.
  */
  const hoverTo = (i: number, value: boolean) => {
    if (intent.current) clearTimeout(intent.current);
    if (!value) {
      setFlipped((f) => ({ ...f, [i]: false }));
      return;
    }
    intent.current = setTimeout(() => setFlipped((f) => ({ ...f, [i]: true })), HOVER_INTENT_MS);
  };

  return (
    <div className="max-w-6xl mx-auto grid gap-5 sm:grid-cols-2">
      {cards.map((card, i) => {
        const paint = liveryAt(i + offset);
        const canFlip = Boolean(card.story?.trim());
        const isFlipped = canFlip && Boolean(flipped[i]);
        const toggle = () => canFlip && setFlipped((f) => ({ ...f, [i]: !f[i] }));

        const face = "relative h-full overflow-hidden rounded-3xl border border-lightBorder dark:border-darkBorder bg-panelLight dark:bg-panelDark [backface-visibility:hidden] [grid-area:1/1]";
        const stripe = (
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-1.5"
            style={{ backgroundColor: paint.hex }}
          />
        );

        return (
          <Fragment key={card.mark + card.title}>
            <Reveal delay={(i % 2) * 100} className="h-full">
              <Glow color={paint.hex} radius="rounded-3xl" lift={false} className="h-full">
                <div
                  role={canFlip ? "button" : undefined}
                  tabIndex={canFlip ? 0 : undefined}
                  aria-pressed={canFlip ? isFlipped : undefined}
                  onClick={canHover ? undefined : toggle}
                  onMouseEnter={canFlip && canHover ? () => hoverTo(i, true) : undefined}
                  onMouseLeave={canFlip && canHover ? () => hoverTo(i, false) : undefined}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggle();
                    }
                  }}
                  className={`h-full [perspective:1400px] ${canFlip ? "cursor-pointer select-none" : ""}`}
                >
                  <div
                    className="grid h-full transform-gpu transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] motion-reduce:transition-none"
                    style={{ transform: isFlipped ? "rotateY(180deg)" : "none" }}
                  >
                    {/* Front */}
                    <div className={face} aria-hidden={isFlipped}>
                      {stripe}
                      <div className="p-8 pt-10">
                        <div className="flex items-start justify-between gap-4">
                          <p
                            className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3"
                            style={{ color: paint.ink }}
                          >
                            {card.mark}
                          </p>
                          {canFlip && (
                            <PiArrowsClockwiseBold
                              aria-hidden
                              className="mt-2 h-5 w-5 flex-shrink-0 text-lightTextMuted/60 dark:text-darkTextMuted/60"
                            />
                          )}
                        </div>
                        <h3 className="text-2xl font-semibold text-lightText dark:text-darkText mb-3 tracking-tight text-balance">
                          {card.title}
                        </h3>
                        <p className="text-lg font-light text-lightTextMuted dark:text-darkTextMuted leading-relaxed">
                          {card.body}
                        </p>
                      </div>
                    </div>

                    {/* Back */}
                    {canFlip && (
                      <div className={`${face} [transform:rotateY(180deg)]`} aria-hidden={!isFlipped}>
                        {stripe}
                        <div className="p-8 pt-10">
                          <p
                            className="text-lg font-semibold tracking-tight mb-3"
                            style={{ color: paint.ink }}
                          >
                            {card.mark} &middot; {card.title}
                          </p>
                          <p className="text-base sm:text-lg font-light text-lightTextMuted dark:text-darkTextMuted leading-relaxed">
                            {card.story}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Glow>
            </Reveal>
            {between?.index === i && between.node}
          </Fragment>
        );
      })}
    </div>
  );
}
