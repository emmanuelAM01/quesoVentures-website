"use client";

import { useEffect, useState } from "react";

/**
 * The work after the website is live, drawn as the loop it is.
 *
 *   Check:  the search data. One query is close but not getting clicks.
 *   Change: the page gets fixed for it, typed in front of you.
 *   Watch:  the same query, a few weeks later, climbing.
 *
 * Then it starts over, because it never stops: that is what the monthly plan
 * pays for. Every number here is illustrative; the real ones go in the
 * monthly report.
 */

const PHASES = ["Check", "Change", "Watch"] as const;
const PHASE_MS = 3600;
const NEW_TITLE = "Roofer in Humble, TX | Bob's Roofing";

const RED = "#C4161C";
const GREEN = "#2E9E4F";

function useTyped(text: string, on: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!on) return setN(0);
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= text.length) clearInterval(t);
    }, 45);
    return () => clearInterval(t);
  }, [text, on]);
  return text.slice(0, n);
}

const ROWS = [
  { q: "roof repair humble", pos: 4, clicks: 22 },
  { q: "roofer humble", pos: 8, clicks: 0, focus: true },
  { q: "roof inspection near me", pos: 6, clicks: 9 },
];

export default function TuneLoop({ running }: { running: boolean }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!running) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setPhase(2);
    const t = setInterval(() => setPhase((p) => (p + 1) % PHASES.length), PHASE_MS);
    return () => clearInterval(t);
  }, [running]);

  const typed = useTyped(NEW_TITLE, running && phase === 1);

  const card = "rounded-2xl bg-white p-5 shadow-xl shadow-black/5 ring-1 ring-black/5 dark:bg-[#151618] dark:ring-white/10";
  const muted = "text-lightTextMuted dark:text-darkTextMuted";
  const ink = "text-lightText dark:text-darkText";

  return (
    <div className="w-full max-w-md">
      <style>{`
        @keyframes tune-fill { from { width: 0% } to { width: 100% } }
        @keyframes tune-draw { from { stroke-dashoffset: 400 } to { stroke-dashoffset: 0 } }
        .tune-draw { stroke-dasharray: 400; animation: tune-draw 1.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        @media (prefers-reduced-motion: reduce) { .tune-draw { animation: none; stroke-dasharray: none; } }
      `}</style>
      {/* Where in the loop we are. */}
      <div className="mb-5 grid grid-cols-3 gap-2">
        {PHASES.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setPhase(i)}
            className="text-left"
            aria-pressed={phase === i}
          >
            <span className="block h-[3px] overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
              <span
                key={`${phase}-${i}`}
                className="block h-full rounded-full bg-lightAccent dark:bg-darkAccent"
                style={{
                  width: phase > i ? "100%" : phase === i ? undefined : "0%",
                  animation: phase === i ? `tune-fill ${running ? PHASE_MS : 0}ms linear forwards` : undefined,
                }}
              />
            </span>
            <span className={`mt-2 block text-sm ${phase === i ? ink : muted}`}>{label}</span>
          </button>
        ))}
      </div>

      <div key={phase} className={`${card} animate-fadeIn`}>
        {phase === 0 && (
          <>
            <p className={`text-sm ${muted}`}>Searches this month</p>
            <ul className="mt-3 divide-y divide-black/5 dark:divide-white/10">
              {ROWS.map((r) => (
                <li key={r.q} className="flex items-center gap-3 py-2.5">
                  <span className={`flex-1 truncate text-[15px] ${ink}`}>{r.q}</span>
                  <span className={`w-16 text-right text-sm tabular-nums ${muted}`}>#{r.pos}</span>
                  <span
                    className="w-20 text-right text-sm tabular-nums"
                    style={r.focus ? { color: RED, fontWeight: 600 } : undefined}
                  >
                    {r.clicks} clicks
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm" style={{ color: RED }}>
              Close to the top, nobody clicking.
            </p>
          </>
        )}

        {phase === 1 && (
          <>
            <p className={`text-sm ${muted}`}>Page title</p>
            <p className={`mt-3 text-[15px] line-through decoration-2 ${muted}`} style={{ textDecorationColor: RED }}>
              Home | Bob&apos;s Roofing
            </p>
            <p className={`mt-2 min-h-[1.5rem] text-[15px] font-medium ${ink}`}>
              {typed}
              <span aria-hidden className="caret ml-px inline-block h-4 w-[2px] translate-y-0.5 bg-current" />
            </p>
            <p
              className="mt-4 text-sm transition-opacity duration-500"
              style={{ color: GREEN, opacity: typed.length === NEW_TITLE.length ? 1 : 0 }}
            >
              Published
            </p>
          </>
        )}

        {phase === 2 && (
          <>
            <p className={`text-sm ${muted}`}>roofer humble, six weeks later</p>
            <svg viewBox="0 0 300 90" className="mt-3 h-24 w-full" aria-hidden>
              <path
                d="M4,80 C40,78 70,76 100,66 S160,40 190,30 S250,14 296,8"
                fill="none"
                stroke={GREEN}
                strokeWidth={2.5}
                strokeLinecap="round"
                className="tune-draw"
              />
            </svg>
            <div className="mt-2 flex items-baseline justify-between">
              <span className={`text-sm ${muted}`}>
                #8 <span aria-hidden>→</span> <span className={ink}>#3</span>
              </span>
              <span className="text-lg font-light tabular-nums" style={{ color: GREEN }}>
                14 clicks
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
