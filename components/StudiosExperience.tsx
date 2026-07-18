"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

// The Queso Studios reveal. This page deliberately abandons the site's
// chrome: no header, no footer, dark only. Act one is the wordmark alone in
// a black void with laser light. Act two is the lineup, a center-snapped
// glass carousel where side cards fall away in perspective. The only way
// out is the "Leave" pill, which appears once the reveal has done its job.

type Tool = {
  name: string;
  price: string;
  tagline: string;
  href?: string;
  linkLabel?: string;
  accent: string; // hex used for the card's laser edge and price glow
};

const PRICE_NOTE = "Queso Ventures clients receive discounts";

const TOOLS: Tool[] = [
  {
    name: "Queso Rewards",
    price: "$20 / month",
    tagline:
      "Loyalty programs for local businesses. Digital punch cards, automatic texts, email campaigns, and a deals page customers actually check.",
    href: "https://www.quesorewards.com",
    linkLabel: "Visit quesorewards.com",
    accent: "#C4161C",
  },
  {
    name: "Delivery Fee Calculator",
    price: "$20 / month",
    tagline:
      "Instant delivery and catering quotes on your own website. Customers type an address and get a real price, with no back-and-forth calls.",
    linkLabel: "Built into Queso Ventures client websites",
    accent: "#FFD100",
  },
  {
    name: "AI Frontdesk",
    price: "$20 / month",
    tagline:
      "A phone agent that answers when you can't. It takes the call, books the appointment, and sends you the message.",
    accent: "#C4161C",
  },
  {
    name: "Queso Revenue System",
    price: "$20 / month",
    tagline:
      "Think IRS, but on your side. Licensed CPAs, Harvard economists, Wharton MBAs, and C-suite operators from nationwide logistics firms comb through your money in and out, find where revenue is leaking, and tighten the operation so your bookkeeping and numbers grow as fast as your business.",
    accent: "#FFD100",
  },
];

export default function StudiosExperience() {
  const [showLeave, setShowLeave] = useState(false);
  const [active, setActive] = useState(0);
  const [wantTool, setWantTool] = useState<string | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
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
      const norm = d / track.clientWidth;
      const scale = Math.max(0.84, 1 - Math.abs(norm) * 0.3);
      const tilt = Math.max(-12, Math.min(12, norm * -16));
      el.style.transform = `perspective(1200px) rotateY(${tilt}deg) scale(${scale})`;
      el.style.opacity = String(Math.max(0.3, 1 - Math.abs(norm) * 1.15));
    });
    setActive(best);
  }, []);

  useEffect(() => {
    updateCards();
    window.addEventListener("resize", updateCards);
    return () => window.removeEventListener("resize", updateCards);
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
          "border border-white/15 bg-white/5 backdrop-blur-md px-5 py-2.5",
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
              className="studios-motion text-[clamp(2.75rem,9vw,7rem)] leading-[1.04] font-bold tracking-tight text-balance bg-gradient-to-b from-white via-white to-white/30 bg-clip-text text-transparent"
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

          <p
            className="studios-motion mt-10 text-base sm:text-xl font-light text-white/60 max-w-xl mx-auto leading-relaxed"
            style={{ animation: "studios-rise 1.1s 1.5s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            What Queso Ventures is truly about, building software for those
            who need it most.
          </p>
        </div>
      </section>

      {/* The why, in first person */}
      <section className="relative px-6 pt-14 sm:pt-20 pb-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-base sm:text-lg text-white/65 leading-relaxed">
            Queso Ventures is a software engineering company at heart. As my
            relationships with clients grow, I hear the tech problems they
            actually need solved, so I build the tool, show it to them, and
            let them use it.
          </p>
          <p className="text-base sm:text-lg text-white/65 leading-relaxed">
            This list keeps growing as I talk to more people like you and
            build what you really need built. I am not guessing at products
            and hoping for market fit. I am listening to the market and
            building directly to it.
          </p>
        </div>
      </section>

      {/* Act two: the lineup */}
      <section className="relative pb-16 sm:pb-24">
        <div
          ref={trackRef}
          onScroll={() => requestAnimationFrame(updateCards)}
          className="studios-no-scrollbar flex gap-6 sm:gap-10 overflow-x-auto snap-x snap-mandatory py-10"
          style={{ paddingLeft: "max(1.5rem, calc(50vw - 300px))", paddingRight: "max(1.5rem, calc(50vw - 300px))" }}
        >
          {TOOLS.map((tool, i) => {
            const isActive = i === active;
            return (
              <div
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
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
                    "group relative overflow-hidden rounded-3xl border bg-white/[0.04] backdrop-blur-xl",
                    "p-7 sm:p-9 h-full flex flex-col gap-6",
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
                        <span aria-hidden>*</span>
                      </span>
                      <span
                        role="tooltip"
                        className="absolute right-0 top-full mt-2.5 w-max max-w-[230px] rounded-xl border border-white/15 bg-[#0A0C15]/95 backdrop-blur-md px-3.5 py-2 text-xs text-white/75 leading-snug opacity-0 translate-y-1 pointer-events-none transition-all duration-300 group-hover/price:opacity-100 group-hover/price:translate-y-0 group-focus/price:opacity-100 group-focus/price:translate-y-0 z-10"
                      >
                        {PRICE_NOTE}
                      </span>
                    </span>
                  </div>

                  <div className="relative flex-1 flex flex-col gap-4">
                    <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">{tool.name}</h3>
                    <p className="text-sm sm:text-base text-white/55 leading-relaxed max-w-md">
                      {tool.tagline}
                    </p>
                    {tool.href == null && tool.linkLabel && (
                      <p className="text-sm font-semibold text-white/40">{tool.linkLabel}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-3 mt-auto pt-3">
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
                className={[
                  "h-1 rounded-full transition-all duration-500",
                  i === active ? "w-10 bg-gradient-to-r from-[#C4161C] to-[#FFD100]" : "w-4 bg-white/20 hover:bg-white/40",
                ].join(" ")}
              />
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
