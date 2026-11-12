"use client";

import { useEffect, useRef, useState } from "react";
import { PiArrowRightBold } from "react-icons/pi";
import ProductShot from "components/tools/ProductShot";
import Lineup from "components/tools/Lineup";
import { openGetStarted } from "components/GetStarted";
import { houseGradient } from "components/livery";
import { OUTCOMES, PRODUCTS, outcomeBy, productsFor, type Product } from "components/catalog";

/**
 * Every tool, dealt one at a time as the page scrolls.
 *
 * The section pins for a short stretch per tool. The tool in front is a card
 * with the tool itself running on it, so nobody has to tap anything to see
 * what a thing does: scrolling is enough. The cards still to come wait behind
 * it; the ones already read lift away.
 *
 * Beside the card (above it on a phone) is every tool by name, all the time.
 * That list is the answer to "where is the website": the whole lineup is in
 * view before a single card has been read. The one in front is marked in its
 * own colour, the ones already seen stay lit, the ones to come are quiet.
 * Choosing a name scrolls to its card, so scroll and state never disagree.
 *
 * Tapping the card in front opens the tool in the Get Started panel.
 *
 * With reduced motion nothing pins and the plain list (Lineup) stands in.
 */

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
/** How much page each tool gets, in viewport heights. Short: a flick deals a few. */
const STEP_VH = 36;

const TOOLS = PRODUCTS;

export default function ToolDeck() {
  const [active, setActive] = useState(0);
  /** The furthest card reached, so the names already seen stay lit. */
  const [seen, setSeen] = useState(0);
  const [calm, setCalm] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const n = TOOLS.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => setCalm(mq.matches);
    decide();
    mq.addEventListener("change", decide);
    return () => mq.removeEventListener("change", decide);
  }, []);

  // Where the page is in the track decides the card: an equal stretch each.
  useEffect(() => {
    if (calm) return;
    let raf = 0;
    const update = () => {
      const el = track.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      if (span <= 0) return;
      const p = Math.min(1, Math.max(0, -r.top / span));
      const i = Math.min(n - 1, Math.floor(p * n));
      setActive(i);
      setSeen((s) => Math.max(s, i));
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
  }, [calm, n]);

  // On a phone the names are one row; keep the one in front in the middle of it.
  useEffect(() => {
    const row = strip.current;
    const tab = row?.querySelector<HTMLElement>(`[data-i="${active}"]`);
    if (!row || !tab) return;
    row.scrollTo({ left: tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    // The middle of that card's stretch, so a small nudge does not leave it.
    const span = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + ((i + 0.5) / n) * span, behavior: "smooth" });
  };

  const heading = (
    <>
      <h2 className="text-4xl font-extralight tracking-tight text-lightText sm:text-5xl lg:whitespace-nowrap xl:text-6xl dark:text-darkText">What do you need?</h2>
      <span aria-hidden className="mt-5 block h-1 w-24 rounded-full lg:mt-8" style={{ backgroundImage: houseGradient() }} />
    </>
  );

  if (calm) {
    return (
      <section id="tools" className="scroll-mt-20 bg-bandLight dark:bg-bandDark">
        <div className="container mx-auto px-4 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl">
            {heading}
            <div className="mt-14">
              <Lineup from="home" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  const current = TOOLS[active];

  return (
    <section id="tools" className="bg-bandLight dark:bg-bandDark">
      <div ref={track} style={{ height: `calc(100svh + ${(n - 1) * STEP_VH}svh)` }}>
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pt-[84px] lg:justify-center">
          <div className="container mx-auto flex min-h-0 flex-1 flex-col px-4 lg:flex-none">
            <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col lg:grid lg:flex-none lg:grid-cols-[minmax(0,5fr),minmax(0,6fr)] lg:items-center lg:gap-16">
              <div className="pt-3 lg:pt-0">
                {heading}

                {/*
                  Desktop: what each tool is for, and under it the tools, small.
                  Two sizes, so it is plain which is which: the big line is the
                  need, the small line is what answers it. Each sits on one
                  line; nothing wraps. The need in front gets the long rule in
                  its colour, the way the About page's index marks its card.
                */}
                <ol className="mt-8 hidden space-y-4 lg:block xl:mt-10 xl:space-y-5">
                  {OUTCOMES.map((o) => {
                    const here = current.outcome === o.key;
                    const first = TOOLS.findIndex((t) => t.outcome === o.key);
                    return (
                      <li key={o.key} className="flex gap-5">
                        {/* A fixed slot, so the rule grows without pushing the words. */}
                        <span aria-hidden className="mt-[0.95rem] block h-[2px] w-10 shrink-0">
                          <span
                            className={`block h-full rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                              here ? "w-10" : "w-4 bg-lightText/20 dark:bg-darkText/20"
                            }`}
                            style={here ? { backgroundColor: o.accent } : undefined}
                          />
                        </span>
                        <div className="min-w-0">
                          <button
                            type="button"
                            onClick={() => go(first)}
                            className={`block whitespace-nowrap text-left text-2xl tracking-tight transition-colors duration-500 focus:outline-none ${
                              here
                                ? "font-normal text-lightText dark:text-darkText"
                                : "font-light text-lightTextMuted hover:text-lightText dark:text-darkTextMuted dark:hover:text-darkText"
                            }`}
                          >
                            {o.label}
                          </button>
                          <div className="mt-0.5 flex gap-x-5 whitespace-nowrap">
                            {productsFor(o.key).map((t) => (
                              <Name key={t.key} tool={t} i={TOOLS.indexOf(t)} active={active} seen={seen} go={go} small />
                            ))}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* Phone: the same names in one row that follows the card. */}
              <div
                ref={strip}
                className="-mx-4 mt-5 flex shrink-0 gap-6 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden"
              >
                {TOOLS.map((t, i) => (
                  <Name key={t.key} tool={t} i={i} active={active} seen={seen} go={go} />
                ))}
              </div>

              {/* The deck. */}
              <div className="relative mt-5 min-h-0 flex-1 lg:mt-0 lg:h-[34rem] lg:flex-none">
                {TOOLS.map((t, i) => {
                  const d = i - active;
                  // Only the card in front and its neighbours are drawn at all.
                  if (d < -1 || d > 3) return null;
                  const on = d === 0;
                  const transform =
                    d < 0
                      ? "translateY(-12%) rotate(-5deg) scale(0.96)"
                      : `translateY(${d * 14}px) translateX(${d * 10}px) rotate(${d * 1.6}deg) scale(${1 - d * 0.045})`;
                  return (
                    <div
                      key={t.key}
                      aria-hidden={!on}
                      className="absolute inset-x-0 top-0 mx-auto h-[calc(100%-3.25rem)] max-w-md origin-bottom will-change-transform lg:h-[calc(100%-3rem)]"
                      style={{
                        transform,
                        opacity: d < 0 ? 0 : 1,
                        zIndex: 40 - Math.abs(d),
                        pointerEvents: on ? "auto" : "none",
                        transition: `transform 650ms ${EASE}, opacity 450ms ease`,
                      }}
                    >
                      <Card tool={t} on={on} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** One tool's name in the list: quiet until reached, lit once seen, marked while in front. */
function Name({
  tool,
  i,
  active,
  seen,
  go,
  small = false,
}: {
  tool: Product;
  i: number;
  active: number;
  seen: number;
  go: (i: number) => void;
  /** Under a need on desktop, where the need is the big line. */
  small?: boolean;
}) {
  const on = i === active;
  const visited = i <= seen;
  return (
    <button
      type="button"
      data-i={i}
      aria-current={on}
      onClick={() => go(i)}
      className={`relative shrink-0 whitespace-nowrap transition-colors duration-500 focus:outline-none ${small ? "py-1 text-[15px]" : "py-1.5 text-[17px]"} ${
        on
          ? "font-medium text-lightText dark:text-darkText"
          : visited
            ? "font-light text-lightText/80 hover:text-lightText dark:text-darkText/80 dark:hover:text-darkText"
            : "font-light text-lightTextMuted/60 hover:text-lightText dark:text-darkTextMuted/60 dark:hover:text-darkText"
      }`}
    >
      {tool.name}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left rounded-full transition-transform duration-500"
        style={{ backgroundColor: tool.accent, transform: on ? "scaleX(1)" : "scaleX(0)", transitionTimingFunction: EASE }}
      />
    </button>
  );
}

/** A tool's card: the tool running, its name, one line, its price. The whole card opens it. */
function Card({ tool, on }: { tool: Product; on: boolean }) {
  return (
    <button
      type="button"
      tabIndex={on ? 0 : -1}
      onClick={() => openGetStarted(tool.key, "home")}
      className={`group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-lightBorder bg-panelLight p-5 text-left transition-shadow duration-500 sm:p-7 dark:border-darkBorder dark:bg-panelDark ${
        on ? "shadow-2xl shadow-black/15 dark:shadow-black/50" : "shadow-lg shadow-black/5"
      }`}
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundColor: tool.accent }} />

      <div className="flex min-h-0 flex-1 items-center justify-center pt-3">
        {/* A short phone gets a smaller shot and no second line, so the card never outgrows the screen. */}
        <div className="w-full max-w-[17rem] sm:max-w-sm [@media(max-height:740px)]:max-w-[12.5rem]">
          <ProductShot product={tool} size="md" running={on} />
        </div>
      </div>

      <div className="shrink-0">
        <p className="text-sm font-light text-lightTextMuted dark:text-darkTextMuted">{outcomeBy(tool.outcome).label}</p>
        <p className="mt-1 text-3xl font-light tracking-tight text-lightText sm:text-4xl dark:text-darkText">{tool.name}</p>
        <p className="mt-2 text-base font-light leading-snug text-lightTextMuted sm:text-lg [@media(max-height:740px)]:hidden dark:text-darkTextMuted">{tool.line}</p>
        <div className="mt-4 flex items-center justify-between gap-4">
          {tool.list != null && (
            <span className="tabular-nums text-lightText dark:text-darkText">
              <span className="text-xl font-light">${tool.list}</span>
              <span className="text-sm text-lightTextMuted dark:text-darkTextMuted"> / month</span>
            </span>
          )}
          <span className="inline-flex items-center gap-2 text-[15px] font-medium text-lightText dark:text-darkText">
            See it
            <PiArrowRightBold aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>

      {/* Cards behind are veiled in the page colour rather than faded, so they stay solid. */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-bandLight transition-opacity duration-500 dark:bg-bandDark ${on ? "opacity-0" : "opacity-50"}`}
      />
    </button>
  );
}
