"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "components/Reveal";
import { STUDIO_DEMOS } from "components/StudiosDemos";
import ArrowMark, { arrowTone } from "components/ArrowMark";
import { houseGradient } from "components/livery";
import {
  BUNDLE,
  OUTCOMES,
  PACKS,
  PRODUCTS as PRODUCT_LIST,
  packTitle,
  oneAtATime,
  packFor,
  productsFor,
  type Outcome,
  type Pack,
  type Product,
} from "components/studiosCatalog";

// The Queso Studios shop. This page deliberately abandons the site's chrome:
// no header, no footer, dark only. Act one is the wordmark alone in a black
// void with laser light. Act two is the shop, laid out by what an owner wants
// (more calls, regulars back, new customers, a business that is straightened
// out, real numbers) rather than by the names of the tools. The only way out
// is the "Leave" pill, which appears once the reveal has done its job.
//
// Every product on the shelf carries a working demo of itself, and opens into
// a popup with the rest: what you get, what it costs, and the way to ask for
// it. A tagline can tell a shop owner there is a booking tool; watching a slot
// get picked and confirmed is the only version they can actually picture.
//
// Names and prices come from components/studiosCatalog.ts, which mirrors the
// portal's catalogue so the shop and the portal never quote two numbers.

/**
 * Whether an element is on screen, so its demo plays when you reach it and
 * holds its finished state otherwise. Only as much motion as you are looking
 * at.
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

const outcomeId = (o: Outcome) => `outcome-${o.key}`;

/** "$99 / month", or the note that stands in for a number. */
function listPrice(p: { list: number | null; priceNote?: string }) {
  return p.list != null ? `$${p.list} / month` : p.priceNote ?? "";
}

/** "$49 for Queso clients", or its stand in. Null when there is nothing to say. */
function clientPrice(p: { client: number | null; clientNote?: string; list: number | null }) {
  if (p.client != null) return `$${p.client} for Queso clients`;
  if (p.clientNote) return p.clientNote;
  return null;
}

/**
 * One product as a magazine story: its demo shot on a backdrop of its own
 * colour, like product photography, then the headline, the standfirst, the
 * price, and the way in. The whole story is a button that opens the popup.
 *
 * `feature` is the lead story of a spread: the backdrop runs taller and the
 * type a size up, so a spread of three reads as one big story and two
 * smaller ones rather than three equal boxes.
 */
function Story({ product, feature = false, onOpen }: { product: Product; feature?: boolean; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const live = useInView(ref);
  const Demo = STUDIO_DEMOS[product.demo];
  const forClients = clientPrice(product);

  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      className="group flex h-full w-full flex-col text-left focus:outline-none"
    >
      <div
        className={`relative flex w-full items-center justify-center overflow-hidden rounded-3xl border border-white/10 px-6 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-white/25 group-focus-visible:border-white/40 ${
          feature ? "py-16 lg:min-h-[26rem]" : "py-10"
        }`}
        style={{ background: `radial-gradient(ellipse 75% 70% at 50% 60%, ${product.accent}2e, transparent 72%), rgba(255,255,255,0.025)` }}
      >
        <div className="w-full max-w-sm transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]">
          <div
            className="rounded-2xl border border-white/10 bg-black/40 p-3.5"
            style={{ boxShadow: `0 30px 90px -40px ${product.accent}88` }}
          >
            <Demo on={live} />
          </div>
        </div>
      </div>

      <div className="mt-7 flex flex-1 flex-col">
        <span aria-hidden className="block h-[3px] w-10 rounded-full transition-[width] duration-500 group-hover:w-16" style={{ backgroundColor: product.accent }} />
        <p className={`mt-5 font-extralight tracking-tight text-white ${feature ? "text-4xl sm:text-5xl" : "text-3xl"}`}>
          {product.name}
        </p>
        <p className={`mt-3 font-light leading-relaxed text-white/65 ${feature ? "max-w-xl text-lg" : "text-base"}`}>
          {product.line}
        </p>
        <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="text-lg font-light tabular-nums text-white">{listPrice(product)}</span>
          {forClients && <span className="text-sm text-white/45">{forClients}</span>}
        </div>
        <span className={`${arrowTone("dark")} mt-6`}>
          <ArrowMark tone="dark" size="sm" label="See what you get" />
        </span>
      </div>
    </button>
  );
}

/**
 * The complete experience, across the foot of the spread.
 *
 * It sat under the outcome's line in small type, and even the person who
 * wrote it read past it. Now it closes the shelf as its own card, edged in the
 * paints of the tools inside it: the complete experience in the display
 * weight, what is in it, the price, and what it saves, said as a number.
 */
function PackCard({ pack, onWant }: { pack: Pack; onWant: () => void }) {
  const inside = pack.products
    .map((k) => PRODUCT_LIST.find((p) => p.key === k))
    .filter((p): p is Product => Boolean(p));
  const separately = inside.reduce((sum, p) => sum + (p.list ?? 0), 0);
  const saves = separately - pack.list;
  const edge = `linear-gradient(120deg, ${inside.map((p) => p.accent).join(", ")})`;

  return (
    <div
      id={`pack-${pack.key}`}
      className="group relative scroll-mt-24 rounded-3xl p-[1.5px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5"
      style={{ backgroundImage: edge }}
    >
      {/* The glow the edge throws, stronger under the pointer. */}
      <div
        aria-hidden
        className="absolute -inset-3 -z-10 rounded-[2rem] opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
        style={{ backgroundImage: edge }}
      />
      <div className="relative overflow-hidden rounded-[calc(1.5rem-1.5px)] bg-[#0A0C15] px-6 py-8 sm:px-9 sm:py-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{ backgroundImage: edge }}
        />
        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.35fr),minmax(0,1fr)] lg:gap-14">
          <div>
            <p className="text-4xl font-extralight leading-[1.02] tracking-tighter text-balance text-white sm:text-5xl">
              {packTitle(pack)}
            </p>
            <p className="mt-5 max-w-lg text-lg font-light leading-relaxed text-white/70">{pack.line}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {inside.map((p) => (
                <li
                  key={p.key}
                  className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-sm text-white/85"
                >
                  <span aria-hidden className="h-2 w-2 rounded-full" style={{ backgroundColor: p.accent }} />
                  {p.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-between gap-6 border-t border-white/10 pt-7 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <div>
              <p className="flex flex-wrap items-baseline gap-x-3">
                <span className="text-6xl font-extralight tracking-tighter tabular-nums text-white">${pack.list}</span>
                <span className="text-base text-white/50">/ month</span>
                {saves > 0 && <span className="text-base text-white/40 line-through tabular-nums">${separately}</span>}
              </p>
              <p className="mt-2 text-base text-white/60">${pack.client} for Queso clients</p>
              {saves > 0 && (
                <span
                  className="mt-4 inline-block rounded-full px-3.5 py-1 text-sm font-semibold text-black"
                  style={{ backgroundImage: houseGradient() }}
                >
                  Save ${saves} a month
                </span>
              )}
            </div>
            <button type="button" onClick={onWant} className={arrowTone("dark")}>
              <ArrowMark tone="dark" label="Get the complete experience" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * One outcome, one magazine spread: the question as the headline, the tools
 * as stories in columns under it, and the complete experience across the foot
 * of the spread.
 */
function OutcomeChapter({
  outcome,
  index,
  onOpen,
  onWant,
}: {
  outcome: Outcome;
  index: number;
  onOpen: (p: Product) => void;
  onWant: (name: string) => void;
}) {
  const shelf = productsFor(outcome.key);
  const pack = packFor(outcome.key);

  return (
    <section
      id={outcomeId(outcome)}
      data-outcome={index}
      className="relative border-t border-white/[0.06] px-6 py-24 sm:px-10 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(ellipse 50% 40% at 15% 20%, ${outcome.accent}1c, transparent 70%)` }}
      />
      <div className="relative mx-auto max-w-6xl lg:pl-10 xl:pl-0">
        {/* The spread's headline: the question, and its colour under it. The
            stories below say the rest, so there is no standfirst. */}
        <Reveal>
          <div className="border-b border-white/10 pb-10">
            <h2 className="text-5xl font-extralight leading-[0.98] tracking-tighter text-balance text-white sm:text-6xl xl:text-7xl">
              {outcome.label}
            </h2>
            <span aria-hidden className="mt-8 block h-1 w-16 rounded-full" style={{ backgroundColor: outcome.accent }} />
          </div>
        </Reveal>

        {/* The stories. Three make a lead story and two beside it; two sit as a pair. */}
        {shelf.length >= 3 ? (
          <div className="mt-14 grid gap-x-10 gap-y-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <Story product={shelf[0]} feature onOpen={() => onOpen(shelf[0])} />
            </Reveal>
            <div className="grid gap-16 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              {shelf.slice(1).map((p, i) => (
                <Reveal key={p.key} delay={(i + 1) * 100}>
                  <Story product={p} onOpen={() => onOpen(p)} />
                </Reveal>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-14 grid gap-x-10 gap-y-16 md:grid-cols-2">
            {shelf.map((p, i) => (
              <Reveal key={p.key} delay={i * 100}>
                <Story product={p} onOpen={() => onOpen(p)} />
              </Reveal>
            ))}
          </div>
        )}

        {pack && (
          <Reveal className="mt-20">
            <PackCard pack={pack} onWant={() => onWant(packTitle(pack))} />
          </Reveal>
        )}
      </div>
    </section>
  );
}

/**
 * The shop's contents, pinned to the left edge while the outcomes are on
 * screen: a dot per outcome in its colour, the one you are in lit and named.
 */
function OutcomeRail() {
  const [active, setActive] = useState(0);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const chapters = document.querySelectorAll("[data-outcome]");
    if (!chapters.length) return;
    const current = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.outcome));
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
      aria-label="The shop"
      className={`fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 transition-opacity duration-500 lg:block xl:left-8 ${
        onScreen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ol className="relative flex flex-col gap-5">
        <span aria-hidden className="absolute bottom-1.5 left-[5px] top-1.5 w-px bg-white/20" />
        {OUTCOMES.map((o, i) => {
          const on = i === active;
          return (
            <li key={o.key}>
              <a href={`#${outcomeId(o)}`} aria-current={on} className="group relative flex items-center gap-4 focus:outline-none">
                <span
                  className={`block h-[11px] w-[11px] rounded-full border-2 transition-all duration-500 ${
                    on ? "scale-125" : "group-hover:scale-125"
                  }`}
                  style={{
                    borderColor: o.accent,
                    backgroundColor: i <= active ? o.accent : "#04050A",
                    boxShadow: on ? `0 0 14px ${o.accent}` : "none",
                  }}
                />
                {/* Named on hover only: the outcome you are in is already the
                    biggest words on screen, and the pill would sit on them. */}
                <span className="-translate-x-1 whitespace-nowrap rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium tracking-[0.08em] text-white opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-90 group-focus-visible:opacity-90">
                  {o.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** The open slot's demo, playing while it is on screen. */
function IdeaDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const live = useInView(ref);
  const Demo = STUDIO_DEMOS.next;
  return (
    <div ref={ref}>
      <Demo on={live} />
    </div>
  );
}

/**
 * In the product popup: one line saying it is cheaper bundled, and a way to
 * the bundle. No arithmetic here; the card it leads to has the numbers.
 */
function PackNote({ product, pack, onSee }: { product: Product; pack: Pack; onSee: () => void }) {
  const others = pack.products
    .filter((k) => k !== product.key)
    .map((k) => PRODUCT_LIST.find((p) => p.key === k)?.name)
    .filter(Boolean) as string[];
  const withWhat = others.length > 1 ? `${others.slice(0, -1).join(", ")} and ${others[others.length - 1]}` : others[0];
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
      <p className="text-base font-light text-white/80">Save when you bundle it with {withWhat}.</p>
      <button type="button" onClick={onSee} className={arrowTone("dark")}>
        <ArrowMark tone="dark" size="sm" label="See the bundle" />
      </button>
    </div>
  );
}

/**
 * The product popup: everything on the shelf plus what the shelf has no room
 * for. The demo big on one side; on the other the price for anybody and for a
 * Queso client, what it covers when it is billed by use, what you get, and the
 * way to ask. Built to order is said plainly, and framed the way it works:
 * the first businesses to ask shape it.
 */
function ProductModal({
  product,
  onClose,
  onWant,
}: {
  product: Product;
  onClose: () => void;
  onWant: () => void;
}) {
  const Demo = STUDIO_DEMOS[product.demo];
  const forClients = clientPrice(product);
  const pack = PACKS.find((p) => p.products.includes(product.key));
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(r);
  }, []);

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:px-4" role="dialog" aria-modal="true" aria-label={product.name}>
      <div
        className={`absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-500 ${shown ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <div
        className={`relative max-h-[92svh] w-full max-w-5xl overflow-y-auto rounded-t-3xl border border-white/15 bg-[#0A0C15]/95 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:rounded-3xl ${
          shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <span
          aria-hidden
          className="absolute inset-x-10 top-0 h-px"
          style={{ background: `linear-gradient(to right, transparent, ${product.accent}, transparent)` }}
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/60 transition-all hover:border-white/40 hover:text-white"
        >
          ✕
        </button>

        <div className="grid lg:grid-cols-2">
          <div
            className="flex items-center justify-center px-6 py-12 sm:px-10"
            style={{ background: `radial-gradient(ellipse 70% 60% at 50% 55%, ${product.accent}24, transparent 70%)` }}
          >
            <div
              className="w-full max-w-sm rounded-3xl border border-white/10 bg-black/35 p-4"
              style={{ boxShadow: `0 40px 120px -40px ${product.accent}66` }}
            >
              <Demo on />
            </div>
          </div>

          <div className="px-6 pb-10 pt-4 sm:px-10 lg:py-12 lg:pr-14">
            <h2 className="pr-10 text-4xl font-extralight leading-[1] tracking-tighter text-white sm:text-5xl">{product.name}</h2>
            <span aria-hidden className="mt-6 block h-[3px] w-12 rounded-full" style={{ backgroundColor: product.accent }} />
            <p className="mt-6 text-lg font-light leading-relaxed text-white/75">{product.line}</p>

            <div className="mt-8 border-y border-white/10 py-5">
              <p className="text-3xl font-extralight tabular-nums text-white">{listPrice(product)}</p>
              {forClients && <p className="mt-1 text-base text-white/55">{forClients}</p>}
              {product.usage && <p className="mt-3 text-sm text-white/45">{product.usage}</p>}
            </div>

            <ul className="mt-6 space-y-3">
              {product.points.map((pt) => (
                <li key={pt} className="flex gap-4 text-base font-light leading-relaxed text-white/80">
                  <span aria-hidden className="mt-[0.8rem] h-[2px] w-4 flex-shrink-0 rounded-full" style={{ backgroundColor: product.accent }} />
                  {pt}
                </li>
              ))}
            </ul>

            {pack && (
              <PackNote
                product={product}
                pack={pack}
                onSee={() => {
                  onClose();
                  // After the popup lets go of the page's scroll.
                  setTimeout(() => document.getElementById(`pack-${pack.key}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 60);
                }}
              />
            )}

            <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-5">
              <button type="button" onClick={onWant} className={arrowTone("dark")}>
                <ArrowMark tone="dark" label="Want this?" />
              </button>
              {product.href && (
                <a href={product.href} className={arrowTone("dark")}>
                  <ArrowMark tone="dark" label={product.linkLabel ?? "Visit"} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudiosExperience() {
  const [showLeave, setShowLeave] = useState(false);
  const [wantTool, setWantTool] = useState<{ name: string; idea: boolean } | null>(null);
  const [openProduct, setOpenProduct] = useState<Product | null>(null);
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

  // Popups: lock scroll and close on Escape while one is open. The ask sits
  // over the product, so Escape closes the ask first.
  useEffect(() => {
    if (!wantTool && !openProduct) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (wantTool) setWantTool(null);
      else setOpenProduct(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [wantTool, openProduct]);

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
          The site's hero, in the dark, and the one hero that stays centred:
          this page is a reveal, and the name alone in the middle of the void
          is the reveal. It still speaks the house language: the name in the
          thin display weight, the house rule drawn in under it, the line under
          that, the circled arrow at the foot.
        */}
        <div className="relative m-auto px-6 text-center">
          <h1
            className="studios-motion relative pb-2 text-[clamp(3.25rem,10vw,8rem)] font-extralight leading-[0.95] tracking-tighter text-balance bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent"
            style={{ animation: "studios-rise 1.3s 0.3s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            Queso Studios
            {/*
              The glint: the same word again, over the first, painted with a
              narrow streak of house light and clipped to the letters, so the
              light runs through the type itself once and is gone.
            */}
            <span
              aria-hidden
              className="studios-glint pointer-events-none absolute inset-0 pb-2 bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, transparent 38%, rgba(255,209,0,0.9) 45%, #ffffff 50%, rgba(196,22,28,0.9) 55%, transparent 62%)",
                backgroundSize: "300% 100%",
                backgroundPosition: "100% 0",
                animation: "studios-glint 1.8s 1.35s cubic-bezier(0.45,0,0.2,1) both",
              }}
            >
              Queso Studios
            </span>
          </h1>

          <div
            aria-hidden
            className="studios-motion mx-auto mt-9 h-1 w-24 origin-center rounded-full"
            style={{
              backgroundImage: houseGradient(),
              animation: "studios-laser-draw 1.2s 1.1s cubic-bezier(0.16,1,0.3,1) both",
            }}
          />

          <p
            className="studios-motion mx-auto mt-9 max-w-2xl text-[clamp(1.2rem,2.2vw,1.6rem)] font-light leading-relaxed text-white/80 text-balance"
            style={{ animation: "studios-rise 1.1s 1.5s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            Building software for the companies that need it most.
          </p>
        </div>

        {/* Centred by its row, since the rise animation owns its transform. */}
        <div className="absolute inset-x-0 bottom-10 flex justify-center">
          <a
            href={`#${outcomeId(OUTCOMES[0])}`}
            aria-label="Go to the shop"
            className={`studios-motion ${arrowTone("dark")}`}
            style={{ animation: "studios-rise 1.1s 1.9s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            <ArrowMark tone="dark" direction="down" />
          </a>
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

          {/* Centred: the one line that turns the page from the pitch to the shop. */}
          <Reveal delay={200} className="text-center">
            <p className="mt-24 inline-block pb-3 text-5xl font-extralight leading-tight tracking-tighter bg-clip-text text-transparent sm:text-6xl xl:text-7xl" style={{ backgroundImage: houseGradient() }}>
              Go shopping
            </p>
          </Reveal>
        </div>
      </section>

      {/*
        Act two: the shop, by outcome.

        It has been a coverflow carousel, then a grid, then a chapter per
        tool, and every version was organised by the names of the tools. An
        owner does not come looking for "booking"; they come wanting more
        calls. So each outcome is a chapter, its question held on the left,
        its tools on the shelf beside it, and every product opens into a
        popup with the rest. The rail at the edge names the outcomes.
      */}
      <OutcomeRail />
      <div className="relative">
        {OUTCOMES.map((o, i) => (
          <OutcomeChapter
            key={o.key}
            outcome={o}
            index={i}
            onOpen={setOpenProduct}
            onWant={(name) => setWantTool({ name, idea: false })}
          />
        ))}
      </div>

      {/* The open slot, last: it only means anything once someone has seen the shelf. */}
      <section className="relative border-t border-white/[0.06] px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="text-5xl font-extralight leading-[0.98] tracking-tighter text-balance text-white sm:text-6xl">
              Whatever you need next
            </h2>
            <span aria-hidden className="mt-8 block h-1 w-16 rounded-full" style={{ backgroundImage: houseGradient() }} />
            <p className="mt-8 max-w-md text-xl font-light leading-relaxed text-white/65">
              Every tool on this page started as somebody telling me what was slowing their week down. Tell me yours and it is the next thing I build.
            </p>
            <button type="button" onClick={() => setWantTool({ name: "Whatever you need next", idea: true })} className={`${arrowTone("dark")} mt-10`}>
              <ArrowMark tone="dark" label="I have an idea" />
            </button>
          </Reveal>
          <Reveal delay={120} className="mx-auto w-full max-w-md">
            <div className="rounded-3xl border border-white/10 bg-black/35 p-4">
              <IdeaDemo />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative border-t border-white/[0.06] px-6 py-28 sm:px-10 sm:py-40">
        {/* Every paint at once, which is the offer said in one stroke. */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${OUTCOMES.map((o) => o.accent).join(", ")}, transparent)`,
          }}
        />
        <div className="mx-auto grid max-w-6xl items-end gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="text-4xl font-light leading-[1.05] tracking-tight text-balance text-white sm:text-5xl xl:text-6xl">
              {BUNDLE.name}
            </h2>
            <span aria-hidden className="mt-8 block h-1 w-24 rounded-full" style={{ backgroundImage: houseGradient() }} />
            <p className="mt-8 max-w-xl text-xl font-light leading-relaxed text-white/60">
              {BUNDLE.line}
            </p>
            <button
              type="button"
              onClick={() => setWantTool({ name: BUNDLE.name, idea: false })}
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
                ${BUNDLE.list}
              </span>
              <span className="text-xl font-light text-white/50">/ month</span>
            </p>
            <p className="mt-6 text-lg text-white/70 tabular-nums">${BUNDLE.client} a month for Queso clients</p>
            <p className="mt-2 text-base text-white/45 tabular-nums">
              ${oneAtATime().list} one at a time (${oneAtATime().client} for Queso clients)
            </p>
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

      {openProduct && (
        <ProductModal
          product={openProduct}
          onClose={() => setOpenProduct(null)}
          onWant={() => setWantTool({ name: openProduct.name, idea: false })}
        />
      )}

      {/* Want-this modal, in the house style, over the product when there is one */}
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
