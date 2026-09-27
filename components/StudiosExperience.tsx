"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "components/Reveal";
import { STUDIO_DEMOS, type DemoId } from "components/StudiosDemos";
import ArrowMark, { arrowTone } from "components/ArrowMark";
import { houseGradient } from "components/livery";

// The Queso Studios reveal. This page deliberately abandons the site's
// chrome: no header, no footer, dark only. Act one is the wordmark alone in
// a black void with laser light. Act two is the lineup, a center-snapped
// glass carousel where side cards fall away in perspective. The only way
// out is the "Leave" pill, which appears once the reveal has done its job.
//
// Every card in the lineup carries a working demo of the tool it is selling,
// running only while that card is centred. A tagline can tell a shop owner
// there is a booking tool; watching a slot get picked and confirmed is the
// only version of that sentence they can actually picture.

type Tool = {
  /** Keys the live demo in StudiosDemos. */
  demo: DemoId;
  name: string;
  price: string;
  tagline: string;
  /**
   * A quieter line under the tagline. Used where the strongest thing about a
   * tool would swallow the sentence that explains it, so it gets set small and
   * separated instead, and reads like fine print that happens to be a flex.
   */
  note?: string;
  href?: string;
  linkLabel?: string;
  /**
   * Runs the width of the grid, for the one entry that is not a product.
   *
   * The open slot is an invitation, and sat in a column beside eight finished
   * tools it read as a ninth thing you could buy that happened to have nothing
   * in it -- with two empty cells beside it, which looked like the page had
   * run out rather than finished.
   */
  wide?: boolean;
  /**
   * Kept out of the lineup bundle and its running total.
   *
   * The bundle is priced for software that costs next to nothing to run per
   * client. The AI Frontdesk pays per minute of phone call, and a busy line
   * costs $400 to $500 a month to run by itself, so it cannot ride inside $450.
   */
  unbundled?: boolean;
  /** What its button says, where "Want this?" would be asking about nothing. */
  cta?: string;
  /**
   * The card's laser edge, glow, and price pill.
   *
   * Factory paint, with one house rule bent: a few of the palette's inks are
   * mixed for legibility on cream and go nearly black against this page, so
   * where that happens the brighter sibling is used instead. One colour per
   * tool, so flipping the lineup feels like flipping a lineup rather than
   * scrolling a spec sheet.
   */
  accent: string;
};

/**
 * Everything, for less than the sum of it.
 *
 * Nine cards is nine decisions, and a shop owner who would happily take one
 * says no to the fourth simply because it is the fourth thing they have been
 * asked. One price is one decision. It is deliberately well under the running
 * total -- the saving is the offer, and without it there is no reason to take
 * this over the two tools you came for.
 *
 * The total is added up from the lineup rather than typed out, so changing a
 * price on a card can never leave this line quietly wrong. The bundle itself
 * is not, which is the half that needs watching: adding Queso Organization at
 * $250 took the lineup to $960 and left this at $350, quietly turning a
 * half-price offer into a two-thirds-off one nobody had decided to make.
 *
 * $450 is roughly the share that was already being given away -- a little over
 * half off, which is what $350 against $710 was -- and it stays under the
 * monthly rate, so the whole toolbox still reads as something added to Queso
 * Ventures rather than a second thing the same size as it.
 */
const BUNDLE_PRICE = 450;

function oneAtATime(): number {
  return TOOLS.filter((t) => !t.unbundled).reduce((sum, t) => {
    const n = Number(t.price.replace(/[^0-9]/g, ""));
    return sum + (Number.isFinite(n) ? n : 0);
  }, 0);
}

const PRICE_NOTE = "Queso Ventures clients receive discounts";

/**
 * The lineup.
 *
 * Ordered the way it should be met: the one with a website of its own first,
 * because it is proof rather than a promise, then the tools in rough order of
 * how easily an owner can picture them, and the open slot last. That slot only
 * means anything once someone has seen nine finished things.
 */
const TOOLS: Tool[] = [
  {
    demo: "rewards",
    name: "Queso Rewards",
    price: "$100 / month",
    tagline:
      "A punch card that lives on your customer's phone. It fills as they come back, and it texts them when they are one are getting closer to their reward.",
    href: "https://www.quesorewards.com",
    linkLabel: "Visit quesorewards.com",
    accent: "#FEA700",
  },
  {
    demo: "memberships",
    name: "Memberships",
    price: "$80 / month",
    tagline:
      "A QR code by the register that opens your own page of deals and store news. Post whatever you want that week, and every scan tells you who came back for it.",
    note: "Not a punch card. You write the offer, change it whenever, and see which customers keep showing up.",
    accent: "#7DC23B",
  },
  {
    demo: "chat",
    name: "AI Chat",
    price: "$80 / month",
    tagline:
      "A chat box on your website that knows your policies, rules, business both inside and out. Only answers how you would answer.",
    accent: "#A855F7",
  },
  {
    demo: "frontdesk",
    name: "AI Frontdesk",
    price: "$500 / month",
    unbundled: true,
    tagline:
      "A phone agent that answers when you cannot. It takes the call, books the appointment, and keeps you the updated.",
    // Every minute on the phone is paid for underneath, at roughly 18 cents.
    // 1,500 minutes costs about $270 against the $500, and past it each minute
    // bills at about double its cost, so a busy line pays for itself.
    note: "Includes 1,500 call minutes a month, about six calls a day. Extra minutes are 35 cents each.",
    accent: "#C4161C",
  },
  {
    demo: "booking",
    name: "Booking",
    price: "$70 / month",
    tagline:
      "They pick a time and get a confirmation, then a reminder. No confusion, no double bookings, just simple cohesion.",
    accent: "#0690FF",
  },
  {
    demo: "delivery",
    name: "Deliveries",
    price: "$80 / month",
    tagline:
      "Type an address and get a real price, with traffic, weather and the time of day already in it. Then it hands your driver the route to drive.",
    accent: "#E64A37",
  },
  {
    demo: "organization",
    name: "Queso Organization",
    price: "$250 / month",
    tagline:
      "Every customer in one place, and where each one stands right now. What you agreed, what they owe, when they are due back, and every note anybody has written down.",
    note: "For the businesses running on spreadsheets, napkin math and memory. Bail bonds, garages, clinics, law offices.",
    accent: "#2243AA",
  },
  {
    demo: "invoicing",
    name: "Invoicing",
    price: "$100 / month",
    tagline:
      "Ask for it the way you would ask a person. It builds the invoice, sends it by email and text, and chases it if it goes unpaid. (Because this part is never fun)",
    accent: "#FFD100",
  },
  {
    demo: "qrs",
    name: "Queso Revenue System",
    price: "Priced per case",
    tagline:
      "Think IRS, but on your side. Upload your numbers and it shows you what is working, what needs attention, and what to do about it.",
    note: "Prepared by licensed CPAs, Harvard economists, Wharton MBAs, and CFOs out of nationwide logistics firms. (a bunch of number nerds)",
    accent: "#7692A5",
  },
  /*
    The empty slot, and the only card here that is not software. Eight finished
    tools make the case that things get built; this one says the list is not
    closed, which is the part no platform can copy.
  */
  {
    demo: "next",
    name: "Whatever you need next",
    price: "Let's talk",
    wide: true,
    cta: "I have an idea",
    tagline:
      "Every tool on this page started as somebody telling me what was slowing them down. Tell me yours and it is the next thing I build.",
    accent: "#FEA700",
  },
];

/**
 * Whether a card is on screen, so its demo plays when you reach it.
 *
 * The carousel could rely on "is this the centred one", because there was only
 * ever one. A catalogue has nine on the page at once, and nine loops all
 * running is both a waste and a fairground. This plays the ones you are
 * actually looking at and leaves the rest holding their finished state, which
 * is what the demos already do when `on` is false.
 */
function useInView<T extends Element>(ref: React.RefObject<T | null>): boolean {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return setSeen(true);
    const io = new IntersectionObserver(
      ([entry]) => setSeen(entry.isIntersecting),
      { rootMargin: "-10% 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return seen;
}

/** The anchor a tool's chapter lives at, for the rail. */
const toolId = (t: Tool) => `tool-${t.demo}`;

/**
 * One tool, one screen: its chapter in the lineup.
 *
 * After the About page's years. The live demo takes one half, lit from behind
 * in the tool's own colour; the words take the other: the price, the name in
 * the thin display weight, the tool's line of paint, what it does, and the
 * way forward. The sides alternate down the lineup.
 *
 * The demo plays while its chapter is on screen and holds its finished state
 * otherwise, so there is only ever as much motion as you are looking at.
 */
function ToolChapter({
  tool,
  index,
  onWant,
}: {
  tool: Tool;
  index: number;
  onWant: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const live = useInView(ref);
  const Demo = STUDIO_DEMOS[tool.demo];
  const flip = index % 2 === 1;

  return (
    <section
      ref={ref}
      id={toolId(tool)}
      data-tool={index}
      className="relative grid scroll-mt-0 border-t border-white/[0.06] lg:min-h-[88svh] lg:grid-cols-2"
    >
      <div
        className={`relative flex items-center justify-center overflow-hidden px-6 py-16 sm:px-12 lg:py-20 ${
          flip ? "lg:order-2" : ""
        }`}
        style={{ background: `radial-gradient(ellipse 70% 60% at 50% 55%, ${tool.accent}24, transparent 70%)` }}
      >
        <Reveal className="relative w-full max-w-md">
          <div
            className="rounded-3xl border border-white/10 bg-black/35 p-4 shadow-2xl shadow-black/60 backdrop-blur-sm sm:p-5"
            style={{ boxShadow: `0 40px 120px -40px ${tool.accent}55, inset 0 1px 0 rgba(255,255,255,0.06)` }}
          >
            <Demo on={live} />
          </div>
        </Reveal>
      </div>

      <div
        className={`flex items-center px-6 pb-20 sm:px-12 lg:py-20 ${
          flip ? "lg:pl-28 lg:pr-16 xl:pl-36 xl:pr-24" : "lg:px-16 xl:px-24"
        }`}
      >
        <Reveal delay={120} className="max-w-xl">
          <span tabIndex={0} className="group/price relative inline-block outline-none">
            <span
              className="inline-block rounded-full border px-4 py-1.5 text-sm font-semibold tabular-nums whitespace-nowrap"
              style={{ color: tool.accent, borderColor: `${tool.accent}55`, textShadow: `0 0 14px ${tool.accent}66` }}
            >
              {tool.price}
              {tool.price.includes("$") && <span aria-hidden>*</span>}
            </span>
            {tool.price.includes("$") && (
              <span
                role="tooltip"
                className="pointer-events-none absolute left-0 top-full z-10 mt-2.5 w-max max-w-[230px] translate-y-1 rounded-xl border border-white/15 bg-[#0A0C15]/95 px-3.5 py-2 text-xs leading-snug text-white/75 opacity-0 backdrop-blur-md transition-all duration-300 group-hover/price:translate-y-0 group-hover/price:opacity-100 group-focus/price:translate-y-0 group-focus/price:opacity-100"
              >
                {PRICE_NOTE}
              </span>
            )}
          </span>

          <h3 className="mt-8 text-5xl font-extralight leading-[0.95] tracking-tighter text-balance text-white sm:text-6xl xl:text-7xl">
            {tool.name}
          </h3>
          <span aria-hidden className="mt-8 block h-[3px] w-14 rounded-full" style={{ backgroundColor: tool.accent }} />
          <p className="mt-8 text-xl font-light leading-relaxed text-white/75">{tool.tagline}</p>
          {tool.note && (
            <p className="mt-5 border-t border-white/10 pt-4 text-sm leading-relaxed text-white/40">{tool.note}</p>
          )}
          {tool.href == null && tool.linkLabel && (
            <p className="mt-5 text-sm font-semibold text-white/40">{tool.linkLabel}</p>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5">
            {tool.href && (
              <a href={tool.href} className={arrowTone("dark")}>
                <ArrowMark tone="dark" label={tool.linkLabel ?? "Visit"} />
              </a>
            )}
            <button type="button" onClick={onWant} className={arrowTone("dark")}>
              <ArrowMark tone="dark" label={tool.cta ?? "Want this?"} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * The lineup's contents, pinned to the left edge while the tools are on
 * screen, the way the About page pins its years: a dot per tool in its own
 * paint, the one you are on lit and named, the rest named on hover.
 */
function ToolRail({ tools }: { tools: Tool[] }) {
  const [active, setActive] = useState(0);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const chapters = document.querySelectorAll("[data-tool]");
    if (!chapters.length) return;
    const current = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.tool));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    chapters.forEach((el) => current.observe(el));

    const onScroll = () => {
      const a = chapters[0].getBoundingClientRect();
      const z = chapters[chapters.length - 1].getBoundingClientRect();
      const mid = window.innerHeight / 2;
      setOnScreen(a.top < mid && z.bottom > mid);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      current.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav
      aria-label="The lineup"
      className={`fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 transition-opacity duration-500 lg:block xl:left-8 ${
        onScreen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ol className="relative flex flex-col gap-4">
        <span aria-hidden className="absolute bottom-1.5 left-[5px] top-1.5 w-px bg-white/20" />
        {tools.map((t, i) => {
          const on = i === active;
          return (
            <li key={t.name}>
              <a href={`#${toolId(t)}`} aria-current={on} className="group relative flex items-center gap-4 focus:outline-none">
                <span
                  className={`block h-[11px] w-[11px] rounded-full border-2 transition-all duration-500 ${
                    on ? "scale-125" : "group-hover:scale-125"
                  }`}
                  style={{
                    borderColor: t.accent,
                    backgroundColor: i <= active ? t.accent : "#04050A",
                    boxShadow: on ? `0 0 14px ${t.accent}` : "none",
                  }}
                />
                <span
                  className={`whitespace-nowrap rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium tracking-[0.12em] text-white backdrop-blur-sm transition-all duration-500 ${
                    on
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-90 group-focus-visible:opacity-90"
                  }`}
                >
                  {t.name}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default function StudiosExperience() {
  const [showLeave, setShowLeave] = useState(false);
  const [wantTool, setWantTool] = useState<{ name: string; idea: boolean } | null>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setShowLeave(window.scrollY > window.innerHeight * 0.35);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Page-wide cursor glow: a cool, faint counterpart to the warm card
  // spotlights. Direct style mutation, no re-renders.
  const onPageMouseMove = useCallback((e: React.MouseEvent) => {
    const el = glowRef.current;
    if (!el) return;
    el.style.background = `radial-gradient(700px circle at ${e.clientX}px ${e.clientY}px, rgba(145,170,255,0.055), transparent 65%)`;
  }, []);

  // Modal: lock scroll and close on Escape while open.
  useEffect(() => {
    if (!wantTool) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setWantTool(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [wantTool]);

  return (
    <div
      className="min-h-screen bg-[#04050A] text-white overflow-x-clip"
      onMouseMove={onPageMouseMove}
    >
      {/* Page-wide cursor glow */}
      <div ref={glowRef} aria-hidden className="fixed inset-0 pointer-events-none z-0" />

      {/* The way out. Appears only after the reveal. */}
      <Link
        href="/"
        className={[
          "fixed top-5 left-5 z-50 flex items-center gap-2 rounded-full",
          "border border-white/15 bg-[#04050A]/85 backdrop-blur-md px-5 py-2.5",
          "text-sm font-semibold text-white/80 hover:text-white hover:border-white/35",
          "transition-all duration-500",
          showLeave ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none",
        ].join(" ")}
      >
        <span aria-hidden>←</span> Leave
      </Link>

      {/* Act one: the void and the name */}
      <section className="relative flex h-[100dvh] min-h-[640px] overflow-hidden">
        {/* Laser field */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div
            className="studios-motion absolute top-[22%] -left-1/4 w-[150%] h-px rotate-[14deg] bg-gradient-to-r from-transparent via-[#C4161C] to-transparent"
            style={{ animation: "studios-pulse 7s ease-in-out infinite" }}
          />
          <div
            className="studios-motion absolute top-[22%] -left-1/4 w-[150%] h-[3px] rotate-[14deg] bg-gradient-to-r from-transparent via-[#C4161C]/60 to-transparent blur-[6px]"
            style={{ animation: "studios-pulse 7s ease-in-out infinite" }}
          />
          <div
            className="studios-motion absolute bottom-[26%] -left-1/4 w-[150%] h-px -rotate-[10deg] bg-gradient-to-r from-transparent via-[#FFD100]/80 to-transparent"
            style={{ animation: "studios-pulse 9s ease-in-out infinite", animationDelay: "-3s" }}
          />
          <div
            className="studios-motion absolute bottom-[26%] -left-1/4 w-[150%] h-[3px] -rotate-[10deg] bg-gradient-to-r from-transparent via-[#FFD100]/50 to-transparent blur-[6px]"
            style={{ animation: "studios-pulse 9s ease-in-out infinite", animationDelay: "-3s" }}
          />
          <div
            className="studios-motion absolute top-[58%] -left-1/4 w-[150%] h-px rotate-[3deg] bg-gradient-to-r from-transparent via-white/25 to-transparent"
            style={{ animation: "studios-pulse 11s ease-in-out infinite", animationDelay: "-5s" }}
          />
          {/* Depth vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_45%,rgba(255,255,255,0.05),transparent_70%)]" />
        </div>

        {/*
          The site's hero, in the dark. The lasers stay, since they are this
          page's own weather; the words move to the foot on the left like every
          other hero: the name in the thin display weight, the house rule drawn
          in under it, the line under that.
        */}
        <div className="relative w-full self-end">
          <div className="mx-auto flex max-w-6xl items-end justify-between gap-10 px-6 pb-14 sm:px-10 sm:pb-20">
            <div className="max-w-4xl">
              <div className="relative overflow-hidden">
                <h1
                  className="studios-motion pb-2 text-[clamp(3.25rem,9vw,7.5rem)] font-extralight leading-[0.95] tracking-tighter text-balance bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent"
                  style={{ animation: "studios-rise 1.3s 0.3s cubic-bezier(0.16,1,0.3,1) both" }}
                >
                  Queso Studios
                </h1>
                {/* One-time light sweep across the wordmark */}
                <div
                  aria-hidden
                  className="studios-motion absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  style={{ animation: "studios-sweep 1.6s 1.3s ease-in-out both" }}
                />
              </div>

              <div
                aria-hidden
                className="studios-motion mt-8 h-1 w-24 origin-left rounded-full"
                style={{
                  backgroundImage: houseGradient(),
                  animation: "studios-laser-draw 1.2s 1.1s cubic-bezier(0.16,1,0.3,1) both",
                }}
              />

              <p
                className="studios-motion mt-8 max-w-2xl text-[clamp(1.2rem,2.2vw,1.6rem)] font-light leading-relaxed text-white/80 text-balance"
                style={{ animation: "studios-rise 1.1s 1.5s cubic-bezier(0.16,1,0.3,1) both" }}
              >
                Building software for the companies that need it most.
              </p>
            </div>

            <a
              href={`#${toolId(TOOLS[0])}`}
              aria-label="Go to the lineup"
              className={`studios-motion ${arrowTone("dark")} hidden sm:inline-flex`}
              style={{ animation: "studios-rise 1.1s 1.8s cubic-bezier(0.16,1,0.3,1) both" }}
            >
              <ArrowMark tone="dark" direction="down" />
            </a>
          </div>
        </div>
      </section>

      {/*
        The why.

        One type scale, deliberately tight. No eyebrow label: a 10px kicker over
        a 48px headline is the inverted hierarchy this page kept falling into,
        and the sentence it carried belongs in the body copy anyway. The two
        statements are set at the same size so neither outranks the other, and
        the line between them is half their size rather than a third — a step
        down, not a cliff.

        Both statements have to hold one line at desktop width, which is what
        caps the headline at 3rem. Lengthen either one and the scale has to come
        down with it.
      */}
      <section className="relative px-6 py-28 sm:px-10 sm:py-40">
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-4xl">
            <span aria-hidden className="mb-10 block h-1 w-24 rounded-full" style={{ backgroundImage: houseGradient() }} />
            <h2 className="text-4xl font-light leading-[1.08] tracking-tight text-balance text-white sm:text-5xl xl:text-6xl">
              Queso Ventures is a software company at heart
            </h2>
            <p className="mt-8 max-w-3xl text-xl font-light leading-relaxed text-white/60 sm:text-2xl">
              Every tool on this page started with a conversation from a real business owner who needed help.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-24 inline-block text-5xl font-extralight tracking-tighter bg-clip-text text-transparent sm:text-6xl xl:text-7xl" style={{ backgroundImage: houseGradient() }}>
              Go shopping
            </p>
          </Reveal>
        </div>
      </section>

      {/*
        Act two: the lineup, as chapters.

        It has been a coverflow carousel (fine for four, a thing you operate at
        nine) and then a grid (everything at once, and every tool the same
        small box). Now each tool gets a screen, the way the About page gives
        each year one: the demo big enough to read on one half, the words on
        the other, the sides alternating, and a rail at the edge naming every
        tool so the one you came for is one click away.
      */}
      <ToolRail tools={TOOLS} />
      <div className="relative">
        {TOOLS.map((tool, i) => (
          <ToolChapter
            key={tool.name}
            tool={tool}
            index={i}
            onWant={() => setWantTool({ name: tool.name, idea: tool.wide === true })}
          />
        ))}
      </div>

      {/*
        Everything, on one row, under the things it replaces.

        Full width and below the lineup on purpose. Above it, it would be the
        first offer read and every card after it a smaller version of one
        already made. Inside the carousel it would be a ninth thing to choose
        between, which is the problem it exists to solve. Here it is the answer
        to the question eight cards have just raised.
      */}
      <section className="relative border-t border-white/[0.06] px-6 py-28 sm:px-10 sm:py-40">
        {/* Every paint at once, which is the offer said in one stroke. */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${TOOLS.filter((t) => !t.unbundled).map((t) => t.accent).join(", ")}, transparent)`,
          }}
        />
        <div className="mx-auto grid max-w-6xl items-end gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="text-4xl font-light leading-[1.05] tracking-tight text-balance text-white sm:text-5xl xl:text-6xl">
              Take the whole lineup
            </h2>
            <span aria-hidden className="mt-8 block h-1 w-24 rounded-full" style={{ backgroundImage: houseGradient() }} />
            <p className="mt-8 max-w-xl text-xl font-light leading-relaxed text-white/60">
              Every tool on this page but the AI Frontdesk, running for you, on one bill.
            </p>
            <button
              type="button"
              onClick={() => setWantTool({ name: "The whole lineup", idea: false })}
              className={`${arrowTone("dark")} mt-10`}
            >
              <ArrowMark tone="dark" label="Want this?" />
            </button>
          </Reveal>

          <Reveal delay={150}>
            <p className="flex items-baseline gap-4">
              <span
                className="bg-clip-text text-[6.5rem] font-extralight leading-[0.85] tracking-tighter tabular-nums text-transparent sm:text-[8rem] xl:text-[10rem]"
                style={{ backgroundImage: houseGradient() }}
              >
                ${BUNDLE_PRICE}
              </span>
              <span className="text-xl font-light text-white/50">/ month</span>
            </p>
            <p className="mt-6 text-base text-white/45 tabular-nums">${oneAtATime()} one at a time</p>
            {/* Said out loud rather than hidden behind the asterisk the
                tools use: on the row asking for the whole lineup, the thing
                that changes the number is worth a line of its own, and a
                tooltip is nothing at all on a phone. */}
            <p className="mt-1 text-base text-white/45">{PRICE_NOTE}</p>
          </Reveal>
        </div>
      </section>

      {/* Outro: just the mark */}
      <section className="relative px-6 pb-16 sm:pb-20 text-center">
        <div
          aria-hidden
          className="mx-auto mb-10 h-px w-72 max-w-[75vw] bg-gradient-to-r from-transparent via-white/25 to-transparent"
        />
        <Image
          src="/logo.png"
          alt="Queso Ventures"
          width={34}
          height={34}
          className="mx-auto object-contain opacity-80"
        />
      </section>

      {/* Want-this modal, in the house style */}
      {wantTool && (
        <WantModal tool={wantTool.name} idea={wantTool.idea} onClose={() => setWantTool(null)} />
      )}
    </div>
  );
}

function WantModal({ tool, idea, onClose }: { tool: string; idea?: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          contact: formData.get("contact"),
          business: tool,
          message: `[Queso Studios: ${tool}] ${formData.get("message") || (idea ? "Has an idea." : "Interested in this tool.")}`,
          website: formData.get("website"), // honeypot
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setError(data?.error || "Something went wrong. Try again.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Network error. Try again.");
    }
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md rounded-3xl border border-white/15 bg-[#0A0C15]/95 backdrop-blur-xl p-7 sm:p-8 overflow-hidden">
        <div
          aria-hidden
          className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-[#C4161C] to-transparent"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/40 transition-all"
        >
          ✕
        </button>

        {status === "success" ? (
          <div className="py-8 text-center space-y-3">
            <p className="text-3xl font-light tracking-tight">Got it.</p>
            <p className="text-sm text-white/60">
              {idea ? "I will read it and get back to you." : `We will reach out about ${tool}.`}
            </p>
            <button type="button" onClick={onClose} className={`${arrowTone("dark")} mt-4`}>
              <ArrowMark tone="dark" label="Close" />
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1.5 pr-8">
              <h2 className="text-3xl font-light tracking-tight">
                {idea ? "What would you build?" : `Want ${tool}?`}
              </h2>
              <p className="text-sm text-white/55">
                {idea
                  ? "The thing that slows your week down. However small."
                  : "Leave your info and we will reach out."}
              </p>
            </div>

            <input
              name="name"
              required
              placeholder="Your name"
              aria-label="Your name"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/35 focus:outline-none focus:border-white/40"
            />
            <input
              name="contact"
              required
              placeholder="Email or phone"
              aria-label="Email or phone"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/35 focus:outline-none focus:border-white/40"
            />
            <textarea
              name="message"
              rows={3}
              placeholder="Anything we should know? (optional)"
              aria-label="Message"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/35 focus:outline-none focus:border-white/40 resize-none"
            />
            {/* Honeypot */}
            <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            {error && <p className="text-sm text-[#FF6B6B]">{error}</p>}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full bg-white py-4 text-[13px] font-semibold uppercase tracking-[0.22em] text-black transition-all hover:bg-white/85 active:scale-[0.99] disabled:opacity-50"
            >
              {status === "sending" ? "Sending" : "Send"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
