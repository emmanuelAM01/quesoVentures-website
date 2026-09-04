"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Reveal from "components/Reveal";
import { STUDIO_DEMOS, type DemoId } from "components/StudiosDemos";

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

const PRICE_NOTE = "Queso Ventures clients receive discounts";

/**
 * The lineup.
 *
 * Ordered the way it should be met: the one with a website of its own first,
 * because it is proof rather than a promise, then the tools in rough order of
 * how easily an owner can picture them, and the open slot last. That slot only
 * means anything once someone has seen eight finished things.
 */
const TOOLS: Tool[] = [
  {
    demo: "rewards",
    name: "Queso Rewards",
    price: "$40 / month",
    tagline:
      "A punch card that lives on your customer's phone. It fills as they come back, and it texts them when they are one are getting closer to their reward.",
    href: "https://www.quesorewards.com",
    linkLabel: "Visit quesorewards.com",
    accent: "#FEA700",
  },
  {
    demo: "memberships",
    name: "Memberships",
    price: "$30 / month",
    tagline:
      "A QR code by the register that opens your own page of deals and store news. Post whatever you want that week, and every scan tells you who came back for it.",
    note: "Not a punch card. You write the offer, change it whenever, and see which customers keep showing up.",
    accent: "#7DC23B",
  },
  {
    demo: "chat",
    name: "AI Chat",
    price: "$30 / month",
    tagline:
      "A chat box on your website that knows your policies, rules, business both inside and out. Only answers how you would answer.",
    accent: "#A855F7",
  },
  {
    demo: "frontdesk",
    name: "AI Frontdesk",
    price: "$30 / month",
    tagline:
      "A phone agent that answers when you cannot. It takes the call, books the appointment, and keeps you the updated.",
    accent: "#C4161C",
  },
  {
    demo: "booking",
    name: "Booking",
    price: "$20 / month",
    tagline:
      "They pick a time and get a confirmation, then a reminder. No confusion, no double bookings, just simple cohesion.",
    accent: "#0690FF",
  },
  {
    demo: "delivery",
    name: "Delivery Fee Calculator",
    price: "$25 / month",
    tagline:
      "Instant delivery and catering quotes based on your business needs. Type an address, get a factual price, so there is no more guessing or spitballing.",
    accent: "#E64A37",
  },
  {
    demo: "invoicing",
    name: "Invoicing",
    price: "$30 / month",
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
    tagline:
      "Every tool on this page started as somebody telling me what was slowing them down. Tell me yours and it is the next thing I build.",
    accent: "#FEA700",
  },
];

export default function StudiosExperience() {
  const [showLeave, setShowLeave] = useState(false);
  const [active, setActive] = useState(0);
  const [wantTool, setWantTool] = useState<string | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frame = useRef(0);
  const glowRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

  // Coverflow math: each card's distance from the track center drives its
  // scale, tilt, and brightness. Runs on scroll inside rAF so swiping stays
  // at frame rate.
  const updateCards = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const cardCenter = el.offsetLeft + el.offsetWidth / 2;
      const d = cardCenter - center;
      if (Math.abs(d) < bestDist) {
        bestDist = Math.abs(d);
        best = i;
      }
      if (reducedMotion.current) return;
      /*
        Deliberately gentle. The first pass swung 12 degrees and dropped 30% of
        scale across the width of the track, so a flick of a trackpad threw the
        whole row around and the carousel read as twitchy. The same gesture now
        moves the cards about half as far, which is the difference between a
        lineup turning and a lineup being shoved.
      */
      const norm = d / track.clientWidth;
      const scale = Math.max(0.9, 1 - Math.abs(norm) * 0.16);
      const tilt = Math.max(-7, Math.min(7, norm * -8.5));
      el.style.transform = `perspective(1600px) rotateY(${tilt}deg) scale(${scale})`;
      el.style.opacity = String(Math.max(0.42, 1 - Math.abs(norm) * 0.72));
    });
    setActive(best);
  }, []);

  /* One measurement per frame, however many scroll events arrive in it. */
  const onTrackScroll = useCallback(() => {
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      updateCards();
    });
  }, [updateCards]);

  useEffect(() => {
    updateCards();
    window.addEventListener("resize", updateCards);
    return () => {
      window.removeEventListener("resize", updateCards);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [updateCards]);

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

  const setCardRef = useMemo(
    () =>
      TOOLS.map((_, i) => (el: HTMLDivElement | null) => {
        cardRefs.current[i] = el;
      }),
    []
  );

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    const el = cardRefs.current[Math.max(0, Math.min(TOOLS.length - 1, index))];
    if (!track || !el) return;
    track.scrollTo({
      left: el.offsetLeft - (track.clientWidth - el.offsetWidth) / 2,
      behavior: reducedMotion.current ? "auto" : "smooth",
    });
  }, []);

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
      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
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

        <div className="relative text-center px-6">
          <div className="relative overflow-hidden">
            <h1
              className="studios-motion text-[clamp(2.5rem,7.5vw,5.5rem)] leading-[1.04] font-bold tracking-tight text-balance bg-gradient-to-b from-white via-white to-white/30 bg-clip-text text-transparent"
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
            className="studios-motion mx-auto mt-10 h-px w-64 max-w-[70vw] origin-center bg-gradient-to-r from-transparent via-[#C4161C] to-transparent"
            style={{ animation: "studios-laser-draw 1.2s 1.1s cubic-bezier(0.16,1,0.3,1) both" }}
          />

          {/* One line at desktop. The old sentence broke across two under a
              wordmark five times its size, which is the exact hierarchy this
              page should not have: cut to a single clause and set larger, so
              the gap between the title and the line under it is a step rather
              than a cliff. */}
          <p
            className="studios-motion mt-9 text-[clamp(1.2rem,2.4vw,1.75rem)] font-normal text-white/80 max-w-3xl mx-auto leading-relaxed text-balance"
            style={{ animation: "studios-rise 1.1s 1.5s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            Building software for the companies that need it most.
          </p>
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
      <section className="relative px-6 pt-16 sm:pt-24 pb-2">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <h2 className="text-[clamp(1.75rem,3.7vw,3rem)] font-bold leading-[1.12] tracking-tight text-balance bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent">
              Queso Ventures is a software company at heart
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-7 max-w-4xl text-[clamp(1.05rem,1.55vw,1.5rem)] font-light leading-relaxed text-white/55 text-balance">
              Every tool on this page started with a conversation from a real business owner who needed help.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div
              aria-hidden
              className="mx-auto mt-10 h-px w-48 max-w-[55vw] bg-gradient-to-r from-transparent via-[#C4161C] to-transparent"
            />
          </Reveal>

          <Reveal delay={420}>
            <p className="mt-10 text-[clamp(1.75rem,3.7vw,3rem)] font-bold leading-[1.12] tracking-tight bg-gradient-to-r from-[#C4161C] via-[#FF7A1A] to-[#FFD100] bg-clip-text text-transparent">
              Go shopping
            </p>
          </Reveal>

        </div>
      </section>

      {/* Act two: the lineup */}
      <section className="relative pb-16 sm:pb-24">
        <div
          ref={trackRef}
          onScroll={onTrackScroll}
          className="studios-no-scrollbar flex items-center gap-6 sm:gap-10 overflow-x-auto overscroll-x-contain snap-x snap-mandatory py-10"
          style={{ paddingLeft: "max(1.5rem, calc(50vw - 300px))", paddingRight: "max(1.5rem, calc(50vw - 300px))" }}
        >
          {TOOLS.map((tool, i) => {
            const isActive = i === active;
            const Demo = STUDIO_DEMOS[tool.demo];
            return (
              <div
                key={i}
                ref={setCardRef[i]}
                className={`snap-center shrink-0 w-[84vw] max-w-[600px] will-change-transform ${
                  isActive ? "" : "cursor-pointer"
                }`}
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
                onClickCapture={(e) => {
                  // A side card is a navigation target, not a content surface:
                  // clicking anywhere on it slides it to center instead of
                  // activating its links or buttons.
                  if (!isActive) {
                    e.preventDefault();
                    e.stopPropagation();
                    goTo(i);
                  }
                }}
              >
                <article
                  className={[
                    "group relative overflow-hidden rounded-3xl border bg-white/[0.045]",
                    "p-7 sm:p-9 flex flex-col gap-6",
                    "transition-[border-color,box-shadow] duration-500",
                    isActive ? "border-white/25" : "border-white/10",
                  ].join(" ")}
                  style={
                    isActive
                      ? { boxShadow: `0 0 90px -20px ${tool.accent}55, inset 0 1px 0 rgba(255,255,255,0.08)` }
                      : { boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }
                  }
                >
                  {/* Cursor spotlight (desktop only, cheap and glorious) */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), ${tool.accent}14, transparent 60%)`,
                    }}
                  />
                  {/* Top edge laser */}
                  <div
                    aria-hidden
                    className="absolute top-0 left-10 right-10 h-px"
                    style={{
                      background: `linear-gradient(to right, transparent, ${tool.accent}, transparent)`,
                      opacity: isActive ? 1 : 0.35,
                      transition: "opacity 0.5s",
                    }}
                  />

                  <div className="relative flex items-center justify-between gap-4">
                    <div className="flex gap-1.5">
                      <span className="w-7 h-1 rounded-full bg-[#C4161C]" />
                      <span className="w-7 h-1 rounded-full bg-[#FFD100]" />
                    </div>
                    <span tabIndex={0} className="group/price relative outline-none">
                      <span
                        className="text-sm font-bold rounded-full border px-4 py-1.5 whitespace-nowrap"
                        style={{ color: tool.accent, borderColor: `${tool.accent}55`, textShadow: `0 0 14px ${tool.accent}66` }}
                      >
                        {tool.price}
                        {tool.price.includes("$") && <span aria-hidden>*</span>}
                      </span>
                      {tool.price.includes("$") && (
                      <span
                        role="tooltip"
                        className="absolute right-0 top-full mt-2.5 w-max max-w-[230px] rounded-xl border border-white/15 bg-[#0A0C15]/95 backdrop-blur-md px-3.5 py-2 text-xs text-white/75 leading-snug opacity-0 translate-y-1 pointer-events-none transition-all duration-300 group-hover/price:opacity-100 group-hover/price:translate-y-0 group-focus/price:opacity-100 group-focus/price:translate-y-0 z-10"
                      >
                        {PRICE_NOTE}
                      </span>
                      )}
                    </span>
                  </div>

                  <div className="relative flex-1 flex flex-col gap-4">
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">{tool.name}</h3>

                    {/*
                      The demo. Mounted only while this card is the centred one,
                      so exactly one of these is animating at a time — eight
                      idle loops repainting behind the perspective transforms
                      would cost frames on the swipe and buy nothing, since
                      nobody can read a card that is turned 12 degrees away.
                    */}
                    <div className="rounded-2xl border border-white/[0.07] bg-black/25 p-3.5">
                      {/*
                        Always mounted. Swapping the demo for a spacer when the
                        card left the centre meant every card you scrolled past
                        visibly emptied and refilled, which read as the page
                        glitching. Off does not mean gone: the demo holds its
                        finished state and only the centred one replays, so the
                        timers still run in exactly one place.
                      */}
                      <Demo on={isActive} />
                    </div>

                    <p className="text-sm sm:text-base text-white/55 leading-relaxed">
                      {tool.tagline}
                    </p>
                    {tool.note && (
                      <p className="border-t border-white/10 pt-3 text-xs leading-relaxed text-white/35">
                        {tool.note}
                      </p>
                    )}
                    {tool.href == null && tool.linkLabel && (
                      <p className="text-sm font-semibold text-white/40">{tool.linkLabel}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      {tool.href && (
                        <a
                          href={tool.href}
                          className="inline-block rounded-xl bg-white text-black text-sm font-bold px-6 py-3.5 hover:bg-white/85 active:scale-[0.98] transition-all"
                        >
                          {tool.linkLabel}
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => setWantTool(tool.name)}
                        className="inline-block rounded-xl border border-white/25 text-sm font-bold px-6 py-3.5 text-white/85 hover:text-white hover:border-white/50 active:scale-[0.98] transition-all"
                      >
                        Want this?
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-2">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous tool"
            className="w-11 h-11 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/40 disabled:opacity-25 transition-all text-lg"
          >
            ←
          </button>
          <div className="flex gap-2.5">
            {TOOLS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to tool ${i + 1}`}
                /* The visible pip is 4px tall; the button around it is 36, or
                   nobody on a phone ever hits it. */
                className="group -my-4 flex h-9 items-center"
              >
                <span
                  className={[
                    "block h-1 rounded-full transition-all duration-500",
                    i === active
                      ? "w-10 bg-gradient-to-r from-[#C4161C] to-[#FFD100]"
                      : "w-4 bg-white/20 group-hover:bg-white/40",
                  ].join(" ")}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === TOOLS.length - 1}
            aria-label="Next tool"
            className="w-11 h-11 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/40 disabled:opacity-25 transition-all text-lg"
          >
            →
          </button>
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
        <WantModal tool={wantTool} onClose={() => setWantTool(null)} />
      )}
    </div>
  );
}

function WantModal({ tool, onClose }: { tool: string; onClose: () => void }) {
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
          message: `[Queso Studios: ${tool}] ${formData.get("message") || "Interested in this tool."}`,
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
            <p className="text-2xl font-bold tracking-tight">Got it.</p>
            <p className="text-sm text-white/60">We will reach out about {tool}.</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 rounded-xl bg-white text-black text-sm font-bold px-6 py-3 hover:bg-white/85 transition-all"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1.5 pr-8">
              <h2 className="text-2xl font-bold tracking-tight">Want {tool}?</h2>
              <p className="text-sm text-white/55">Leave your info and we will reach out.</p>
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
              className="w-full rounded-xl bg-white text-black text-sm font-bold py-3.5 hover:bg-white/85 disabled:opacity-50 active:scale-[0.99] transition-all"
            >
              {status === "sending" ? "Sending…" : "Send"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
