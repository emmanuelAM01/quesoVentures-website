"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import LavaLamp from "components/LavaLamp";
import { formatGrowth } from "components/formatGrowth";
import { PAINT, houseGradient } from "components/livery";
import type { ReportCard, ReportFigure, ReportGroup, ReportMetric, ReportPoint } from "lib/reportCard";

/**
 * The Report Card. Marketing material: handed across a counter on a phone,
 * and meant to make a stranger who lands here want in. It has fifteen seconds
 * and one job: show that this is a software company with real numbers, not a
 * marketing shop with adjectives.
 *
 * So the page is one instrument. Three cards that are the same three on every
 * tab (only the values change), and one chart that layers all three across
 * the calendar year, January to December, this month lit. It explains nothing.
 * Every figure is Google's own record for real clients (the portal decides
 * which figures exist: packages/metrics/src/report-card-math.ts in the portal
 * repo). The one fine print kept is "Projected" on the dashed months (every
 * month after this one; this month and earlier are always solid), because
 * a projection passed off as a result is the one thing that would make the
 * whole page a lie.
 */

/** The three metrics, in the one order every tab uses. */
const LAYERS: { key: ReportMetric; label: string; color: string }[] = [
  { key: "seen", label: "Found online", color: PAINT.gialloModena.hex },
  { key: "website", label: "Went to the website", color: "#3EA6FF" },
  { key: "reached", label: "Calls and/or directions", color: "#FF4D2E" },
];

/** The tools that have a Report Card, in picker order. The first is shown. */
const REPORT_TOOLS = ["Websites"] as const;

const UNDERBELLIES_NOTE =
  "If you have heard me say “underbellies,” you know why this is here. If not: these are the businesses tech forgot about. Nobody builds for them. I do.";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthShort = (p: number) => (MONTHS[p - 1] ?? "").slice(0, 3);

const isUnderbellies = (g: ReportGroup) => /underbell/i.test(g.name);
const tabLabel = (g: ReportGroup) => (g.slug === "all" && g.name === "Average Queso Ventures client" ? "All clients" : g.name);
/**
 * Whose year the tab shows, as the headline over the numbers. Every client
 * on the all tab, the trade's own name on every other.
 */
const whoseYear = (g: ReportGroup): { lead: string; name: string } =>
  g.slug === "all"
    ? { lead: "The average year with", name: "Queso Ventures" }
    : { lead: "The average year for", name: g.name.replace(/^the\s+/i, "") };

function prettyDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

// ── Motion ───────────────────────────────────────────────────────────────────

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/** A number that rolls to its target instead of jumping. */
function useRolling(target: number, ms = 1200): number {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(1);
  const from = useRef(1);
  useEffect(() => {
    if (reduced) {
      setShown(target);
      from.current = target;
      return;
    }
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      const v = a + (target - a) * (1 - Math.pow(1 - t, 3));
      setShown(v);
      from.current = v;
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, ms, reduced]);
  return shown;
}

function useSize<T extends HTMLElement>(): [React.RefObject<T>, { w: number; h: number }] {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) =>
      setSize({ w: Math.round(e.contentRect.width), h: Math.round(e.contentRect.height) })
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, size];
}

// ── Geometry ─────────────────────────────────────────────────────────────────

type XY = { x: number; y: number };

/**
 * A smooth line through the points that never overshoots them (monotone
 * cubic). A plain spline bulges past a peak, which on this page would draw a
 * month better than the one that happened.
 */
function smoothPath(pts: XY[]): string {
  if (pts.length === 0) return "";
  if (pts.length < 3) return pts.map((p, i) => `${i ? "L" : "M"}${p.x},${p.y}`).join(" ");
  const n = pts.length;
  const d: number[] = [];
  const m: number[] = [];
  for (let i = 0; i < n - 1; i++) d.push((pts[i + 1].y - pts[i].y) / (pts[i + 1].x - pts[i].x));
  m.push(d[0]);
  for (let i = 1; i < n - 1; i++) m.push(d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2);
  m.push(d[n - 2]);
  for (let i = 0; i < n - 1; i++) {
    if (d[i] === 0) {
      m[i] = 0;
      m[i + 1] = 0;
      continue;
    }
    const a = m[i] / d[i];
    const b = m[i + 1] / d[i];
    const s = a * a + b * b;
    if (s > 9) {
      const t = 3 / Math.sqrt(s);
      m[i] = t * a * d[i];
      m[i + 1] = t * b * d[i];
    }
  }
  let path = `M${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < n - 1; i++) {
    const h = (pts[i + 1].x - pts[i].x) / 3;
    path += ` C${pts[i].x + h},${pts[i].y + m[i] * h} ${pts[i + 1].x - h},${pts[i + 1].y - m[i + 1] * h} ${pts[i + 1].x},${pts[i + 1].y}`;
  }
  return path;
}

/** Gridline spacing in index points: the smallest giving five lines or fewer. */
function gridStep(span: number): number {
  for (const s of [25, 50, 100, 200, 250, 500]) if (span / s <= 5) return s;
  return 1000;
}

// ── The page ─────────────────────────────────────────────────────────────────

function FromUrl({ card }: { card: ReportCard | null }) {
  const params = useSearchParams();
  return <Body card={card} initialSlug={params.get("tab")} />;
}

export default function ReportCardView({ card }: { card: ReportCard | null }) {
  return (
    <Suspense fallback={<Body card={card} initialSlug={null} />}>
      <FromUrl card={card} />
    </Suspense>
  );
}

function Body({ card, initialSlug }: { card: ReportCard | null; initialSlug: string | null }) {
  const groups = card?.groups ?? [];
  const [slug, setSlug] = useState(() => (groups.find((g) => g.slug === initialSlug) ?? groups[0])?.slug ?? "all");
  const group = groups.find((g) => g.slug === slug) ?? groups[0];
  const [off, setOff] = useState<Set<ReportMetric>>(new Set());
  const [focus, setFocus] = useState<ReportMetric | null>(null);
  const [noteOpen, setNoteOpen] = useState(false);

  const pickGroup = (next: string) => {
    setSlug(next);
    setNoteOpen(false);
    const url = next === "all" ? window.location.pathname : `${window.location.pathname}?tab=${next}`;
    window.history.replaceState(null, "", url);
  };
  // A card takes its layer off the chart or puts it back; the last one on stays on.
  const toggle = (m: ReportMetric) =>
    setOff((s) => {
      const next = new Set(s);
      if (next.has(m)) next.delete(m);
      else if (LAYERS.filter((l) => group?.metrics[l.key] && !next.has(l.key)).length > 1) next.add(m);
      return next;
    });

  const layers = LAYERS.filter((l) => group?.metrics[l.key]);

  return (
    <section data-dark-section className="relative -mt-[76px] overflow-hidden min-h-[100svh]">
      <LavaLamp scrim={0.72} />
      <div className="relative container mx-auto px-4 pt-36 lg:pt-40 pb-20 lg:pb-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
            <div>
              {/* Which tool's numbers these are. One today; when a second tool
                  has a Report Card, this is where the picker goes (REPORT_TOOLS). */}
              <h1 className="text-[2.75rem] min-[400px]:text-5xl sm:text-6xl xl:text-7xl font-light leading-[1.02] tracking-tight text-balance text-white">
                Report Card{" "}
                <span aria-hidden className="font-extralight text-white/30">/</span>{" "}
                <span className="sr-only">for </span>
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: houseGradient() }}>
                  {REPORT_TOOLS[0]}
                </span>
              </h1>
              <span aria-hidden className="mt-6 block h-1 w-24 rounded-full" style={{ backgroundImage: houseGradient() }} />
            </div>
            {card && <OnAir asOf={card.asOf} />}
          </div>

          {groups.length > 1 && group && <Tabs groups={groups} active={group.slug} onPick={pickGroup} />}

          {!group || layers.length === 0 ? (
            <p className="mt-16 text-2xl font-light text-white/70">Back in a minute.</p>
          ) : (
            <>
              <div className="relative mt-12 sm:mt-14">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light leading-tight tracking-tight text-balance text-white">
                  {whoseYear(group).lead}{" "}
                  <span className="text-transparent bg-clip-text" style={{ backgroundImage: houseGradient() }}>
                    {whoseYear(group).name}
                  </span>
                </h2>
                <div className="mt-3 flex items-center gap-2">
                {isUnderbellies(group) && (
                  <button
                    type="button"
                    aria-label="What are the underbellies?"
                    aria-expanded={noteOpen}
                    onClick={() => setNoteOpen((o) => !o)}
                    onPointerEnter={(e) => e.pointerType === "mouse" && setNoteOpen(true)}
                    onPointerLeave={(e) => e.pointerType === "mouse" && setNoteOpen(false)}
                    className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-white/15 text-xs font-semibold text-white ring-1 ring-inset ring-white/25 hover:bg-white/25"
                  >
                    ?
                  </button>
                )}
                {noteOpen && (
                  <p
                    role="note"
                    className="absolute left-0 top-full z-20 mt-3 max-w-sm rounded-2xl bg-white/95 px-5 py-4 text-[15px] leading-relaxed text-[#101216] shadow-2xl backdrop-blur"
                  >
                    {UNDERBELLIES_NOTE}
                  </p>
                )}
                </div>
              </div>

              <div className={`mt-7 grid gap-2 sm:gap-4 ${layers.length === 3 ? "grid-cols-3" : layers.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
                {layers.map((l) => (
                  <MetricCard
                    key={`${group.slug}-${l.key}`}
                    layer={l}
                    figure={group.metrics[l.key]!}
                    on={!off.has(l.key)}
                    lit={focus === l.key}
                    onToggle={() => toggle(l.key)}
                    onFocus={(f) => setFocus(f ? l.key : null)}
                  />
                ))}
              </div>

              <Chart key={group.slug} group={group} layers={layers.filter((l) => !off.has(l.key))} focus={focus} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// ── On air ───────────────────────────────────────────────────────────────────

/**
 * The studio light: the numbers are live, said the way a radio booth says it
 * rather than with a pulsing green dot. Lit red, framed, with the faint
 * flicker of a sign that is actually switched on.
 */
function OnAir({ asOf }: { asOf: string }) {
  return (
    <div className="flex items-center gap-4" title={`Queso Ventures' Report Card updated less than 24 hours ago`}>
      <span
        className="on-air relative inline-flex items-center rounded-md border-2 border-[#FF2800] bg-[#2a0503]/70 px-3.5 py-1.5 shadow-[0_0_24px_rgba(255,40,0,0.45),inset_0_0_14px_rgba(255,40,0,0.35)]"
      >
        <span className="text-[15px] font-bold tracking-[0.28em] text-[#FF5A3C] [text-shadow:0_0_8px_rgba(255,60,30,0.9),0_0_18px_rgba(255,40,0,0.6)]">
          ON AIR
        </span>
      </span>
      <span className="text-sm text-white/55 tabular-nums">Updated less than 24 hours ago</span>
      <style>{`
        .on-air { animation: on-air-hum 4.5s ease-in-out infinite; }
        @keyframes on-air-hum {
          0%, 100% { opacity: 1; }
          46% { opacity: 1; }
          48% { opacity: 0.72; }
          50% { opacity: 1; }
          52% { opacity: 0.85; }
          54% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) { .on-air { animation: none; } }
      `}</style>
    </div>
  );
}

// ── Tabs ─────────────────────────────────────────────────────────────────────

function Tabs({ groups, active, onPick }: { groups: ReportGroup[]; active: string; onPick: (s: string) => void }) {
  const row = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = row.current?.querySelector<HTMLElement>("[aria-selected='true']");
    const box = row.current;
    if (!el || !box) return;
    // Scroll the row, never the page.
    box.scrollTo({ left: el.offsetLeft - box.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <div
      ref={row}
      role="tablist"
      aria-label="Trades"
      className="mt-10 -mx-4 px-4 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,transparent,black_16px,black_calc(100%-32px),transparent)] sm:mx-0 sm:px-0 sm:[mask-image:none] sm:flex-wrap"
    >
      {groups.map((g) => {
        const on = g.slug === active;
        return (
          <button
            key={g.slug}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onPick(g.slug)}
            className={`shrink-0 rounded-full px-5 py-2.5 text-[15px] font-medium whitespace-nowrap backdrop-blur-md transition-all duration-300 ${
              on
                ? "bg-white text-[#101216] shadow-[0_8px_30px_rgba(255,255,255,0.18)]"
                : "bg-white/[0.07] text-white/85 ring-1 ring-inset ring-white/15 hover:bg-white/15 hover:text-white"
            }`}
          >
            {tabLabel(g)}
          </button>
        );
      })}
    </div>
  );
}

// ── The cards ────────────────────────────────────────────────────────────────

/**
 * One metric: its colour, its name, the number. The same three cards on every
 * tab. Tapping one takes its layer off the chart or puts it back; hovering
 * lights its line.
 */
function MetricCard({
  layer,
  figure,
  on,
  lit,
  onToggle,
  onFocus,
}: {
  layer: (typeof LAYERS)[number];
  figure: ReportFigure;
  on: boolean;
  lit: boolean;
  onToggle: () => void;
  onFocus: (f: boolean) => void;
}) {
  const value = useRolling(figure.growth);
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      onPointerEnter={(e) => e.pointerType === "mouse" && onFocus(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && onFocus(false)}
      // A column, with the number held to the foot: a label that wraps to
      // three lines on a phone must not push its number below its neighbours'.
      className={`group relative flex flex-col overflow-hidden rounded-2xl px-3 py-4 sm:px-6 sm:py-6 text-left backdrop-blur-md [container-type:inline-size] transition-all duration-300 ring-1 ring-inset ${
        on ? "bg-white/[0.07] ring-white/15" : "bg-white/[0.03] ring-white/[0.06] opacity-50"
      } ${lit ? "!bg-white/[0.12]" : ""}`}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px] transition-opacity duration-300"
        style={{ background: `linear-gradient(to right, ${layer.color}, transparent)`, opacity: on ? 1 : 0.3 }}
      />
      <span className="flex items-start gap-2 sm:items-center sm:gap-2.5">
        <span
          aria-hidden
          className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full sm:mt-0 sm:h-2.5 sm:w-2.5"
          style={{ background: layer.color, boxShadow: `0 0 12px ${layer.color}` }}
        />
        <span className="text-sm sm:text-[15px] font-medium leading-snug text-white/85">{layer.label}</span>
      </span>
      {/* Sized to fit the card: as big as before for "+85%", smaller for
          "+1,150%", so a long number never runs out of a phone-width card.
          Sized from the final number, not the counting one, so it holds still. */}
      <span
        className="mt-auto block pt-3 whitespace-nowrap font-extralight leading-none tracking-tight tabular-nums text-white [--cap:1.875rem] sm:[--cap:3.75rem]"
        style={{ fontSize: `min(var(--cap), ${(100 / (formatGrowth(figure.growth).length * 0.62)).toFixed(1)}cqw)` }}
      >
        {formatGrowth(value)}
      </span>
      <span className="mt-2 sm:mt-3 block text-xs sm:text-sm leading-snug text-white/50">
        {/* The card is this month, and this month is never called projected. */}
        Since starting with Queso
      </span>
    </button>
  );
}

// ── The chart ────────────────────────────────────────────────────────────────

/**
 * Every layer on one axis, January to December. They can share one because
 * all three are the same unit: each client against their own month before
 * Queso, so 2x on the views line and 2x on the calls line mean the same thing.
 *
 * Drag across it and a readout follows the finger with all three numbers for
 * that month.
 */
function Chart({
  group,
  layers,
  focus,
}: {
  group: ReportGroup;
  layers: (typeof LAYERS)[number][];
  focus: ReportMetric | null;
}) {
  const [box, { w }] = useSize<HTMLDivElement>();
  const reduced = useReducedMotion();
  const [drawn, setDrawn] = useState(false);
  const [at, setAt] = useState<number | null>(null);
  const release = useRef<ReturnType<typeof setTimeout>>();

  const sized = w > 0;
  useEffect(() => {
    if (!sized) return;
    if (reduced) {
      setDrawn(true);
      return;
    }
    let id = requestAnimationFrame(() => {
      id = requestAnimationFrame(() => setDrawn(true));
    });
    return () => cancelAnimationFrame(id);
  }, [sized, reduced]);
  useEffect(
    () => () => {
      if (release.current) clearTimeout(release.current);
    },
    []
  );

  const H = w < 640 ? 280 : 400;
  const pad = { l: 8, r: w < 640 ? 44 : 56, t: 24, b: 40 };
  const lines = layers.map((l) => ({ layer: l, pts: group.metrics[l.key]!.line }));
  const all = lines.flatMap((l) => l.pts);
  const hi = Math.max(200, ...all.map((p) => p.index));
  const lo = Math.min(100, ...all.map((p) => p.index));
  const step = gridStep(hi - lo);
  const yMin = Math.max(0, Math.floor(lo / step) * step - step * 0.25);
  const yMax = Math.ceil(hi / step) * step;
  const x = (m: number) => pad.l + ((m - 1) / 11) * (w - pad.l - pad.r);
  const y = (i: number) => pad.t + (1 - (i - yMin) / (yMax - yMin)) * (H - pad.t - pad.b);

  const grid: number[] = [];
  for (let v = Math.ceil(yMin / step) * step; v <= yMax; v += step) grid.push(v);
  if (!grid.includes(100)) grid.push(100);

  const current = Math.max(0, ...lines.map((l) => l.pts.filter((p) => !p.projected).at(-1)?.period ?? 0));

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (release.current) clearTimeout(release.current);
    const r = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - r.left;
    const m = Math.min(12, Math.max(1, Math.round(((px - pad.l) / (w - pad.l - pad.r)) * 11) + 1));
    setAt(m);
  };
  const onEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    // A finger lifting off: hold the month a beat so it can be read.
    if (release.current) clearTimeout(release.current);
    release.current = setTimeout(() => setAt(null), e.pointerType === "mouse" ? 0 : 1600);
  };

  const readout = at
    ? lines
        .map((l) => ({ l, p: l.pts.find((p) => p.period === at) }))
        .filter((r): r is { l: (typeof lines)[number]; p: ReportPoint } => !!r.p)
    : [];
  const tipLeft = at ? Math.min(Math.max(x(at) - 110, 0), Math.max(0, w - 220)) : 0;

  return (
    <div className="mt-4 rounded-3xl bg-[#0B0D12]/55 ring-1 ring-inset ring-white/10 backdrop-blur-xl px-3 pt-5 pb-3 sm:px-6 sm:pt-6">
      <div className="flex flex-wrap items-center justify-between gap-3 px-2">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {layers.map((l) => (
            <span key={l.key} className="inline-flex items-center gap-2 text-sm text-white/75">
              <span aria-hidden className="h-[3px] w-5 rounded-full" style={{ background: l.color }} />
              {l.label}
            </span>
          ))}
        </div>
        {/* Only while there are months still ahead: in December there are none. */}
        {lines.some((l) => l.pts.some((p) => p.projected)) && (
        <span className="inline-flex items-center gap-2 text-sm text-white/55">
          <svg width="20" height="4" aria-hidden>
            <line x1="1" x2="19" y1="2" y2="2" stroke="white" strokeOpacity="0.6" strokeWidth="2" strokeDasharray="2 4" strokeLinecap="round" />
          </svg>
          Projected
        </span>
        )}
      </div>

      <div
        ref={box}
        className="relative mt-4 w-full select-none cursor-crosshair"
        style={{ height: H, touchAction: "pan-y" }}
        onPointerMove={onMove}
        onPointerDown={onMove}
        onPointerLeave={onEnd}
        onPointerUp={(e) => e.pointerType !== "mouse" && onEnd(e)}
      >
        {w > 0 && (
          <svg width={w} height={H} className="absolute inset-0 overflow-visible" aria-label="Growth by month">
            <defs>
              {/* In user space: a gradient sized to a flat line's own box (zero
                  height) renders as nothing. */}
              <linearGradient id="rc-base" gradientUnits="userSpaceOnUse" x1={pad.l} x2={w - pad.r} y1="0" y2="0">
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="18%" stopColor="white" stopOpacity="0.14" />
                <stop offset="82%" stopColor="white" stopOpacity="0.14" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <filter id="rc-glow" x="-10%" y="-50%" width="120%" height="200%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
            </defs>

            {/* This month, as a lit column. */}
            {current > 0 && (
              <rect
                x={x(current) - (w - pad.l - pad.r) / 22}
                width={(w - pad.l - pad.r) / 11}
                y={pad.t - 8}
                height={H - pad.t - pad.b + 8}
                fill="white"
                opacity={0.045}
                rx={10}
              />
            )}

            {grid.map((v) => (
              <g key={v}>
                <line
                  x1={pad.l}
                  x2={w - pad.r}
                  y1={y(v)}
                  y2={y(v)}
                  // The starting level is the one line that matters, but a
                  // hard white rule across the whole chart read as harsh: it
                  // fades in and out at the ends instead.
                  stroke={v === 100 ? "url(#rc-base)" : "white"}
                  strokeOpacity={v === 100 ? 1 : 0.07}
                  strokeDasharray={v === 100 ? undefined : "2 6"}
                />
                {v >= 100 && (
                  <text x={w - pad.r + 10} y={y(v)} dy="0.35em" fontSize={13} fill="white" fillOpacity={0.4}>
                    {v === 100 ? "Start" : formatGrowth(v / 100)}
                  </text>
                )}
              </g>
            ))}

            {lines.map(({ layer, pts }, li) => {
              const real = pts.filter((p) => !p.projected);
              // Solid only between two measured months. Any step touching a
              // projected month, or one set by hand, is dashed wherever it
              // falls, so the solid line is only ever what clients got.
              const runs: ReportPoint[][] = [];
              const steps: [ReportPoint, ReportPoint][] = [];
              pts.forEach((p, i) => {
                const prev = pts[i - 1];
                if (!prev) {
                  if (!p.projected) runs.push([p]);
                } else if (!p.projected && !prev.projected) {
                  const run = runs.at(-1);
                  if (run && run.at(-1) === prev) run.push(p);
                  else runs.push([prev, p]);
                } else {
                  steps.push([prev, p]);
                  if (!p.projected) runs.push([p]);
                }
              });
              const solids = runs.filter((r) => r.length > 1).map((r) => smoothPath(r.map((p) => ({ x: x(p.period), y: y(p.index) }))));
              const last = real.at(-1);
              const dim = focus && focus !== layer.key;
              return (
                <g key={layer.key} style={{ opacity: dim ? 0.18 : 1, transition: "opacity 300ms" }}>
                  {steps.length > 0 && (
                    <path
                      d={steps.map(([a, b]) => `M${x(a.period)},${y(a.index)} L${x(b.period)},${y(b.index)}`).join(" ")}
                      fill="none"
                      stroke={layer.color}
                      strokeOpacity={0.6}
                      strokeWidth={2}
                      strokeDasharray="2 7"
                      strokeLinecap="round"
                      style={{ opacity: drawn ? 1 : 0, transition: `opacity 700ms ease ${1500 + li * 150}ms` }}
                    />
                  )}
                  {solids.flatMap((d, si) => [true, false].map((glow) => (
                    <path
                      key={`${si}-${glow}`}
                      d={d}
                      fill="none"
                      stroke={layer.color}
                      strokeWidth={glow ? 7 : 2.75}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter={glow ? "url(#rc-glow)" : undefined}
                      opacity={glow ? 0.55 : 1}
                      pathLength={1}
                      strokeDasharray={1}
                      strokeDashoffset={drawn ? 0 : 1}
                      style={{ transition: `stroke-dashoffset 1600ms cubic-bezier(.2,.7,.1,1) ${li * 150}ms` }}
                    />
                  )))}
                  {last && (
                    <g style={{ opacity: drawn ? 1 : 0, transition: `opacity 500ms ease ${1400 + li * 150}ms` }}>
                      <circle cx={x(last.period)} cy={y(last.index)} r={11} fill={layer.color} opacity={0.2}>
                        {!reduced && <animate attributeName="r" values="6;15;6" dur="2.4s" repeatCount="indefinite" />}
                        {!reduced && <animate attributeName="opacity" values="0.35;0;0.35" dur="2.4s" repeatCount="indefinite" />}
                      </circle>
                      <circle cx={x(last.period)} cy={y(last.index)} r={4.5} fill={layer.color} stroke="#0B0D12" strokeWidth={2} />
                    </g>
                  )}
                </g>
              );
            })}

            {at && (
              <g>
                <line x1={x(at)} x2={x(at)} y1={pad.t - 8} y2={H - pad.b} stroke="white" strokeOpacity={0.35} />
                {readout.map(({ l, p }) => (
                  <circle key={l.layer.key} cx={x(at)} cy={y(p.index)} r={5} fill={l.layer.color} stroke="#0B0D12" strokeWidth={2} />
                ))}
              </g>
            )}

            {Array.from({ length: 12 }, (_, i) => i + 1)
              .filter((m) => w >= 640 || m === current || (m % 2 === 1 && Math.abs(m - current) > 1))
              .map((m) => (
                <text
                  key={m}
                  x={x(m)}
                  y={H - 12}
                  textAnchor="middle"
                  fontSize={13}
                  fontWeight={m === current ? 600 : 400}
                  fill="white"
                  fillOpacity={m === current || m === at ? 0.95 : 0.4}
                >
                  {monthShort(m)}
                </text>
              ))}
          </svg>
        )}

        {at && readout.length > 0 && (
          <div
            className="pointer-events-none absolute top-0 w-[220px] rounded-2xl bg-[#0B0D12]/90 px-4 py-3 ring-1 ring-inset ring-white/15 backdrop-blur-md shadow-2xl"
            style={{ left: tipLeft }}
          >
            <p className="text-sm font-semibold text-white">
              {MONTHS[at - 1]}
              {readout.some((r) => r.p.projected) && <span className="ml-2 font-normal text-white/50">Projected</span>}
            </p>
            <div className="mt-2 space-y-1.5">
              {readout.map(({ l, p }) => (
                <p key={l.layer.key} className="flex items-center justify-between gap-3 text-sm">
                  <span className="inline-flex items-center gap-2 text-white/70">
                    <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: l.layer.color }} />
                    {l.layer.label}
                  </span>
                  <span className="font-semibold tabular-nums text-white">
                    {p.index === 100 ? "Start" : formatGrowth(p.index / 100)}
                  </span>
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
