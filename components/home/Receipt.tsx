"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { houseGradient } from "components/livery";
import { productByKey } from "components/catalog";

/**
 * Built at the counter, as the thing every counter has: a receipt.
 *
 * An order ticket feeds out of the printer a line at a time. The business,
 * what they said was eating their week, the tool that got built for it, and
 * the two promises after. It holds, tears off, and the next shop's ticket
 * prints with a different problem and a different tool, which is the whole
 * story of the shelf: every tool on it started as one owner's problem.
 *
 * The four steps are plain text on the ticket, so they read without the
 * animation (reduced motion gets the first ticket, printed).
 *
 * Nothing about the layout waits on JavaScript. Every ticket is also drawn
 * invisibly in the same spot, so the space is the longest ticket's from the
 * first paint, and the printer never shifts while one prints or when the
 * next one is a line longer. Only how much paper is out gets measured, and
 * that happens before paint, so a line never shows a frame early.
 */

/** `result` is the ticket's total: what changed for that shop, in their terms. */
type Order = { shop: string; problem: string; tool: string; runs: string; result: string };

const ORDERS: Order[] = [
  {
    shop: "Bob's Roofing",
    problem: "Missed calls while on a roof",
    tool: "frontdesk",
    runs: "Answers every call",
    result: "No more missed jobs",
  },
  {
    shop: "Glazed Donut Co",
    problem: "Regulars stopped coming back",
    tool: "rewards",
    runs: "A punch card on their phone",
    result: "Regulars back in the door",
  },
  {
    shop: "Westside Auto",
    problem: "Can't keep track of business vs personal expenses",
    tool: "revenue",
    runs: "Real numbers and true organization",
    result: "Clean books at tax time",
  },
  {
    shop: "Big Tex Wraps",
    problem: "Quoting by text all night",
    tool: "quotes",
    runs: "Prices right on the site",
    result: "Evenings back",
  },
];

const LINE_MS = 380;
const HOLD_MS = 3200;
const TEAR_MS = 700;
/** Header, four items, the total, the sign-off. */
const TOTAL_LINES = 7;

const TORN_EDGE =
  "linear-gradient(#000,#000) top / 100% calc(100% - 8px) no-repeat, radial-gradient(circle at 6px 100%, transparent 5px, #000 5.5px) bottom left / 12px 8px repeat-x";

/** One ticket, printed up to `printed` lines. */
function Ticket({ index, printed, paperRef }: { index: number; printed: number; paperRef?: React.Ref<HTMLDivElement> }) {
  const o = ORDERS[index];
  const tool = productByKey(o.tool)!;
  const lines = [
    // Each row reads on its own: a plain label, then the answer.
    { k: "The problem", v: `“${o.problem}”` },
    { k: "What I built", v: tool.name, accent: tool.accent },
    { k: "What it does", v: o.runs },
    { k: "Every month", v: "I check in with their numbers" },
  ];
  const show = (i: number) => ({ opacity: printed > i ? 1 : 0, transition: "opacity 250ms ease" });

  return (
    <div
      ref={paperRef}
      className="relative rounded-b-sm bg-[#FBFAF7] px-6 pb-8 pt-7 text-[#1B1F27] shadow-[0_24px_40px_-24px_rgba(0,0,0,0.45)]"
      style={{ WebkitMaskImage: TORN_EDGE, maskImage: TORN_EDGE }}
    >
      <div data-line={0} style={show(0)} className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em]">Queso Ventures</p>
        <p className="mt-1 text-sm text-[#1B1F27]/60">
          Order #{String(41 + index).padStart(4, "0")} · {o.shop}
        </p>
      </div>

      <div className="my-5 border-t border-dashed border-[#1B1F27]/30" />

      <ul className="space-y-3.5">
        {lines.map((l, i) => (
          <li key={l.k} data-line={i + 1} style={show(i + 1)} className="flex items-baseline gap-2">
            <span className="shrink-0 text-[15px] font-medium">
              {l.k}
              {/* The dotted leader is only drawn; copied text and screen readers get a colon. */}
              <span className="sr-only">: </span>
            </span>
            <span aria-hidden className="mb-1 min-w-4 flex-1 border-b border-dotted border-[#1B1F27]/35" />
            <span className="text-right text-[15px] font-light" style={l.accent ? { color: l.accent, fontWeight: 500 } : undefined}>
              {l.v}
            </span>
          </li>
        ))}
      </ul>

      <div className="my-5 border-t border-dashed border-[#1B1F27]/30" />

      <div data-line={5} style={show(5)} className="flex items-baseline justify-between">
        <span className="text-base font-semibold uppercase tracking-[0.2em]">
          Result<span className="sr-only">: </span>
        </span>
        <span className="text-right text-lg font-light">{o.result}</span>
      </div>
      <p data-line={6} style={show(6)} className="mt-6 text-center text-sm text-[#1B1F27]/60">
        Thank you, come again.
      </p>
    </div>
  );
}

export default function Receipt() {
  const [order, setOrder] = useState(0);
  const [printed, setPrinted] = useState(0);
  const [torn, setTorn] = useState(false);
  const [seen, setSeen] = useState(false);
  /** How much paper is out of the printer, in pixels. */
  const [out, setOut] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const paper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Starts as the ticket comes up the screen, not once it is half way.
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!seen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPrinted(TOTAL_LINES);
      return;
    }
    let t: ReturnType<typeof setTimeout>;
    if (torn) {
      t = setTimeout(() => {
        setOrder((n) => (n + 1) % ORDERS.length);
        setOut(0);
        setPrinted(0);
        setTorn(false);
      }, TEAR_MS);
    } else if (printed < TOTAL_LINES) {
      t = setTimeout(() => setPrinted((p) => p + 1), printed === 0 ? 150 : LINE_MS);
    } else {
      t = setTimeout(() => setTorn(true), HOLD_MS);
    }
    return () => clearTimeout(t);
  }, [seen, printed, torn]);

  // Paper out to the last printed line plus a margin, the whole ticket once
  // the sign-off prints. Before paint, so the line and its paper arrive in
  // the same frame.
  useLayoutEffect(() => {
    const el = paper.current;
    if (!el) return;
    if (printed >= TOTAL_LINES) return setOut(el.scrollHeight);
    if (printed === 0) return setOut(0);
    const line = el.querySelector<HTMLElement>(`[data-line="${printed - 1}"]`);
    setOut(line ? line.offsetTop + line.offsetHeight + 18 : 0);
  }, [printed, order]);

  return (
    <section className="bg-lightBG dark:bg-darkBG">
      <div ref={ref} className="container mx-auto px-4 py-24 sm:py-32">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-16 lg:grid-cols-2">
          <div>
            <h2 className="text-5xl font-extralight tracking-tight text-lightText sm:text-6xl dark:text-darkText">Built at the counter.</h2>
            <span aria-hidden className="mt-8 block h-1 w-24 rounded-full" style={{ backgroundImage: houseGradient() }} />
            <p className="mt-8 max-w-md text-xl font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">
              Every tool here started as one owner&apos;s problem.
            </p>
          </div>

          <div className="mx-auto w-full max-w-sm">
            {/* The printer's mouth. The ticket feeds out from under it. */}
            <div className="relative z-10 h-4 rounded-full bg-[#1A1D23] shadow-[inset_0_-2px_0_rgba(255,255,255,0.08),0_8px_20px_-8px_rgba(0,0,0,0.5)] dark:bg-[#0A0B0E]" />

            {/* One grid cell holding every ticket invisibly, so it is always
                the tallest ticket's height; the live one sits on top. */}
            <div className="-mt-2 grid px-3 pb-10">
              {ORDERS.map((_, i) => (
                <div key={i} aria-hidden className="invisible col-start-1 row-start-1">
                  <Ticket index={i} printed={TOTAL_LINES} />
                </div>
              ))}
              <div
                // A fresh ticket per order, so the next one starts in the
                // printer instead of sliding back from where the last fell.
                key={order}
                className="col-start-1 row-start-1 self-start overflow-hidden"
                style={{
                  // Unrolls down out of the slot as it prints; falls away when torn.
                  height: out,
                  transform: torn ? "translateY(48px) rotate(-3deg)" : "none",
                  opacity: torn ? 0 : 1,
                  transition: torn
                    ? `transform ${TEAR_MS}ms cubic-bezier(0.5,0,0.75,0), opacity ${TEAR_MS}ms ease`
                    : `height ${LINE_MS}ms cubic-bezier(0.22,1,0.36,1)`,
                }}
              >
                <Ticket index={order} printed={printed} paperRef={paper} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
