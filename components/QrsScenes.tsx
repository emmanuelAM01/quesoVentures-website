"use client";

import { useEffect, useState } from "react";
import { FaCheck, FaLock } from "react-icons/fa6";

/**
 * The Queso Revenue System, drawn.
 *
 * Every scene here is a thing the tool really does, in the order an owner meets
 * it: link a bank, tag what comes in, read the month. Nothing is shown that the
 * tool does not do, because this page is also what Plaid reviews before it
 * lets anyone link a bank through us.
 *
 * Colours are the tool's own: business blue, personal purple, amber for a
 * charge still waiting on a tag, green for money in. Merchant names are
 * generic on purpose, the same rule as every other drawn demo on the site.
 */

const BUSINESS = "#0690FF";
const PERSONAL = "#8B3FD9";
const UNTAGGED = "#FEA700";
const IN = "#16A34A";
const OUT = "#C4161C";

const PANE = "rounded-xl border border-white/10 bg-white/[0.055]";
const MUTED = "text-white/45";
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

const rise = (shown: boolean) => ({
  opacity: shown ? 1 : 0,
  transform: shown ? "none" : "translateY(8px)",
});

/**
 * Steps through a script of beats, then starts over while `on`.
 *
 * Off holds the finished state rather than an empty one, so a scene that
 * scrolls away is never caught half drawn. `marks` must be a module-level
 * constant: it is an effect dependency.
 */
function useBeats(on: boolean, marks: readonly number[], loopMs: number) {
  const [step, setStep] = useState(marks.length);
  const [pass, setPass] = useState(0);
  useEffect(() => {
    if (!on || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(marks.length);
      return;
    }
    setStep(0);
    const timers = marks.map((ms, i) => setTimeout(() => setStep(i + 1), ms));
    timers.push(setTimeout(() => setPass((n) => n + 1), loopMs));
    return () => timers.forEach(clearTimeout);
  }, [on, marks, loopMs, pass]);
  return step;
}

function Tag({ scope }: { scope: "business" | "personal" | null }) {
  const label = scope === "business" ? "Business" : scope === "personal" ? "Personal" : "Not tagged yet";
  const hex = scope === "business" ? BUSINESS : scope === "personal" ? PERSONAL : UNTAGGED;
  return (
    <span
      className="shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold transition-colors duration-500"
      style={{ color: hex, borderColor: `${hex}66`, backgroundColor: `${hex}14` }}
    >
      {label}
    </span>
  );
}

// ── The card on the Studios shelf ──────────────────────────────────────────

const CARD_MARKS = [420, 1100, 1800] as const;

/** The whole tool in three rows: a bank linked, a charge tagged, the answer. */
export function QrsCard({ on }: { on: boolean }) {
  const step = useBeats(on, CARD_MARKS, 6200);
  return (
    <div className="flex h-[10.5rem] w-full flex-col justify-center gap-2.5">
      <div className={`${PANE} flex items-center gap-2.5 px-3 py-2 transition-all duration-500`} style={rise(step >= 1)}>
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-black" style={{ backgroundColor: IN }}>
          <FaCheck size={9} />
        </span>
        <p className="min-w-0 flex-1 truncate text-[12px] text-white/80">Business checking ····4021</p>
        <span className={`shrink-0 text-[10px] ${MUTED}`}>Linked</span>
      </div>
      <div className={`${PANE} flex items-center gap-2.5 px-3 py-2 transition-all duration-500`} style={rise(step >= 2)}>
        <p className="min-w-0 flex-1 truncate text-[12px] text-white/80">Lumber yard</p>
        <p className="shrink-0 text-[12px] font-semibold tabular-nums text-white">−$184.20</p>
        <Tag scope={step >= 3 ? "business" : null} />
      </div>
      <div className={`${PANE} flex items-baseline justify-between gap-2.5 px-3 py-2 transition-all duration-500`} style={rise(step >= 3)}>
        <p className="text-[12px] text-white/80">
          <span className="font-semibold text-white">$2,680</span> left over
        </p>
        <p className={`text-[11px] ${MUTED}`}>in a typical month</p>
      </div>
    </div>
  );
}

// ── Connect ────────────────────────────────────────────────────────────────

const ACCOUNTS = [
  { name: "Business checking", mask: "4021" },
  { name: "Savings", mask: "7730" },
  { name: "Business card", mask: "1188" },
] as const;
const CONNECT_MARKS = [500, 1300, 1900, 2500, 3200] as const;

/** Signing in on Plaid's screen, then every account behind that login, linked. */
export function QrsConnect({ on }: { on: boolean }) {
  const step = useBeats(on, CONNECT_MARKS, 7600);
  const signedIn = step >= 2;
  return (
    <div className="w-full space-y-3">
      <div className={`${PANE} px-4 py-3.5`}>
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-semibold text-white">Your bank</p>
          <span className={`flex items-center gap-1.5 text-[11px] ${MUTED}`}>
            <FaLock size={9} /> Secured by Plaid
          </span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
          <span
            className={`block h-full rounded-full transition-all duration-[900ms] ${EASE}`}
            style={{ width: step >= 1 ? (signedIn ? "100%" : "55%") : "0%", backgroundColor: IN }}
          />
        </div>
        <p className={`mt-2 text-[11px] ${MUTED}`}>{signedIn ? "Signed in. Read only." : "Signing in on your bank's own screen"}</p>
      </div>
      <div className="space-y-2">
        {ACCOUNTS.map((a, i) => (
          <div
            key={a.mask}
            className={`${PANE} flex items-center gap-3 px-4 py-2.5 transition-all duration-500`}
            style={rise(step >= i + 2)}
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-black" style={{ backgroundColor: IN }}>
              <FaCheck size={10} />
            </span>
            <p className="min-w-0 flex-1 truncate text-[13px] text-white/85">{a.name}</p>
            <p className={`shrink-0 text-[12px] tabular-nums ${MUTED}`}>····{a.mask}</p>
          </div>
        ))}
      </div>
      <p className={`text-center text-[12px] transition-opacity duration-500 ${MUTED}`} style={{ opacity: step >= 5 ? 1 : 0 }}>
        One login, three accounts. That is one bank connection.
      </p>
    </div>
  );
}

// ── Tag ────────────────────────────────────────────────────────────────────

type Charge = { who: string; amount: string; incoming?: boolean; tag: "business" | "personal" | null; at: number };

/**
 * `at` is the beat a charge gets its tag. The first lumber yard charge is
 * tapped by hand; that tap is remembered, and the second one is tagged on
 * arrival. That is the rule the tool keeps, shown in the order it happens.
 */
const CHARGES: Charge[] = [
  { who: "Job payment", amount: "+$2,400.00", incoming: true, tag: null, at: 0 },
  { who: "Lumber yard", amount: "−$184.20", tag: "business", at: 5 },
  { who: "Grocery store", amount: "−$96.40", tag: "personal", at: 7 },
  { who: "Gas station", amount: "−$62.15", tag: "business", at: 8 },
  { who: "Lumber yard", amount: "−$311.75", tag: "business", at: 6 },
];
const TAG_MARKS = [300, 650, 1000, 1350, 1700, 2600, 3400, 4200, 4800] as const;

/** Charges arriving by themselves, tagged once, remembered after. */
export function QrsTag({ on }: { on: boolean }) {
  const step = useBeats(on, TAG_MARKS, 8800);
  return (
    <div className="w-full min-w-0 space-y-2">
      {CHARGES.map((c, i) => (
        <div
          key={`${c.who}-${c.amount}`}
          className={`${PANE} flex items-center gap-3 px-4 py-2.5 transition-all duration-500`}
          style={rise(step >= i + 1)}
        >
          <p className="min-w-0 flex-1 truncate text-[13px] text-white/85">{c.who}</p>
          <p className="shrink-0 text-[13px] font-semibold tabular-nums" style={{ color: c.incoming ? IN : "white" }}>
            {c.amount}
          </p>
          {c.incoming ? (
            <span className={`w-[5.5rem] shrink-0 text-right text-[10px] ${MUTED}`}>Money in</span>
          ) : (
            <span className="flex w-[5.5rem] shrink-0 justify-end">
              <Tag scope={step >= c.at ? c.tag : null} />
            </span>
          )}
        </div>
      ))}
      <div
        className="flex items-center gap-2.5 rounded-xl border px-4 py-2.5 transition-all duration-500"
        style={{ ...rise(step >= 6), borderColor: `${BUSINESS}55`, backgroundColor: `${BUSINESS}12` }}
      >
        <FaCheck size={10} style={{ color: BUSINESS }} className="shrink-0" />
        <p className="text-[12px] text-white/85">Lumber yard is business from now on. Remembered.</p>
      </div>
    </div>
  );
}

// ── The month ──────────────────────────────────────────────────────────────

/** Six months in and out, in thousands. Plausible for a shop, not a chain. */
const MONTHS = [
  { m: "May", i: 16.2, o: 14.1 },
  { m: "Jun", i: 17.8, o: 15.0 },
  { m: "Jul", i: 15.1, o: 15.9 },
  { m: "Aug", i: 18.9, o: 14.6 },
  { m: "Sep", i: 19.4, o: 15.2 },
  { m: "Oct", i: 18.4, o: 14.9 },
] as const;
const PEAK = 20;
const MONTH_MARKS = [400, 1300, 2100] as const;

/**
 * What the screen answers: in and out, what a day costs, what is left over.
 * The figures agree with the bars: $14,950 out on average is $491 a day.
 */
export function QrsMonth({ on }: { on: boolean }) {
  const step = useBeats(on, MONTH_MARKS, 7600);
  return (
    <div className="w-full space-y-3">
      <div className={`${PANE} px-4 py-3.5`}>
        <div className="flex items-baseline justify-between">
          <p className="text-[13px] font-semibold text-white">In and out</p>
          <p className={`flex items-center gap-3 text-[10px] ${MUTED}`}>
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: IN }} /> In</span>
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: OUT }} /> Out</span>
          </p>
        </div>
        <div className="mt-3 flex h-28 items-end gap-3">
          {MONTHS.map((r, i) => (
            <div key={r.m} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="flex h-24 w-full items-end justify-center gap-1">
                {[r.i, r.o].map((v, k) => (
                  <span
                    key={k}
                    className={`w-2.5 rounded-t-sm transition-all duration-700 ${EASE}`}
                    style={{
                      height: step >= 1 ? `${(v / PEAK) * 100}%` : "0%",
                      backgroundColor: k === 0 ? IN : OUT,
                      transitionDelay: `${i * 70}ms`,
                    }}
                  />
                ))}
              </div>
              <span className={`text-[10px] ${MUTED}`}>{r.m}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className={`${PANE} px-4 py-3 transition-all duration-500`} style={rise(step >= 2)}>
          <p className="text-2xl font-light tabular-nums text-white">$491</p>
          <p className={`mt-0.5 text-[11px] leading-snug ${MUTED}`}>spent a day on average</p>
        </div>
        <div className={`${PANE} px-4 py-3 transition-all duration-500`} style={rise(step >= 2)}>
          <p className="text-2xl font-light tabular-nums text-white">$3,180</p>
          <p className={`mt-0.5 text-[11px] leading-snug ${MUTED}`}>business costs a month</p>
        </div>
      </div>
      <div className={`${PANE} flex items-baseline justify-between gap-3 px-4 py-3 transition-all duration-500`} style={rise(step >= 3)}>
        <p className="text-[13px] text-white/85">
          <span className="font-semibold text-white">$2,680</span> left over
        </p>
        <p className={`text-[12px] ${MUTED}`}>in a typical month</p>
      </div>
    </div>
  );
}
