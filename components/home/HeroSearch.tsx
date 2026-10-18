"use client";

import { useEffect, useState } from "react";
import { PiStorefrontDuotone } from "react-icons/pi";
import { useBusinessSearch } from "components/useBusinessSearch";
import { openGetStarted } from "components/GetStarted";
import { productByKey } from "components/catalog";

/**
 * The home hero's picture, and why the name is plural.
 *
 * One business's phone on a good day. The name at the top is the business;
 * everything under it is a different tool at work, each notification in its
 * tool's own colour and under its tool's name: a call from Google, a missed
 * call answered, a regular checked in, an invoice paid. One business, many
 * tools.
 *
 * It used to open on a Google search with the business at #1, and that read
 * as the whole card being a search product, with the notifications coming
 * out of it. Ranking is one tool among the rest, so it is one notification
 * among the rest.
 *
 * It is also the start of an order. Click the name and it becomes a real
 * Google lookup for their own business; pick it and Get started opens with it
 * filled in, so whichever tool they choose, the form already knows who they
 * are.
 */

/** Made up, one per trade, so the reel reads as "a business like yours". */
const NAMES = [
  "Bob's Roofing",
  "Glazed Donut Co",
  "Westside Auto",
  "Luxe Med Spa",
  "Big Tex Wraps",
  "Taco Loco Truck",
  "Liberty Bail Bonds",
];

/** What the shelf says once it is working. Keys are catalog product keys. */
const PINGS: { key: string; text: string }[] = [
  { key: "website", text: "#1 on Google nearby. New call." },
  { key: "frontdesk", text: "Missed call answered, booked Tue 9:30" },
  { key: "rewards", text: "Maria checked in. 5th visit." },
  { key: "invoicing", text: "Invoice paid, $480" },
  { key: "leads", text: "3 new leads near you" },
  { key: "quotes", text: "Quote request: full truck wrap" },
  { key: "email", text: "This week's deals went to 412 regulars" },
  { key: "revenue", text: "Best week this month, up $1,240" },
];

const VISIBLE = 3;
const PING_MS = 1700;

/** A running count; the newest ping is always the last one. */
function usePings(running: boolean) {
  // Opens already full; an empty phone for the first five seconds read as broken.
  const [count, setCount] = useState(VISIBLE);
  useEffect(() => {
    if (!running) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setCount((c) => c + 1), PING_MS);
    return () => clearInterval(t);
  }, [running]);
  return count;
}

/**
 * The visitor's own time and date, from their own device, so the timezone is
 * always theirs. The server has no idea where they are, so the page arrives
 * at 9:41 (every phone ad's time) and switches to the real one on mount.
 */
function useClock() {
  const [now, setNow] = useState<{ time: string; date: string } | null>(null);
  useEffect(() => {
    const read = () => {
      const d = new Date();
      setNow({
        time: d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }).replace(/\s?[AP]M$/i, ""),
        date: d.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" }),
      });
    };
    read();
    // Tick on the minute, not every second: nothing on screen shows seconds.
    let t: ReturnType<typeof setInterval>;
    const first = setTimeout(() => {
      read();
      t = setInterval(read, 60_000);
    }, 60_000 - (Date.now() % 60_000));
    return () => {
      clearTimeout(first);
      clearInterval(t);
    };
  }, []);
  return now;
}

export default function HeroSearch() {
  const clock = useClock();
  const s = useBusinessSearch({ queries: NAMES, from: "home", holdMs: 3200 });
  const count = usePings(true);
  const named = s.chosen?.name ?? s.entered;

  const start = () =>
    openGetStarted(undefined, "home", {
      label: s.chosen?.address ? `${s.chosen.name}, ${s.chosen.address}` : named,
      name: named,
      address: s.chosen?.address ?? "",
      placeId: s.chosen?.placeId ?? "",
    });

  // Newest first, at most three; a ping older than that has slid away.
  const shown = Array.from({ length: Math.min(VISIBLE, count) }, (_, depth) => count - 1 - depth);

  return (
    <div className="relative mx-auto w-full max-w-md">
      {/* The floor, house warm, like every product shot. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 -bottom-10 top-1/3"
        style={{ background: "radial-gradient(ellipse 55% 45% at 50% 80%, #FEA70033, transparent 70%)" }}
      />

      <div
        className="relative rounded-[1.8rem] p-[7px]"
        style={{
          background: "linear-gradient(160deg, #3A404C 0%, #161A21 38%, #0C0E13 62%, #2A2F3A 100%)",
          boxShadow: "0 1px 0 rgba(255,255,255,0.18) inset, 0 50px 90px -40px #C4161Caa, 0 18px 40px -24px rgba(0,0,0,0.6)",
        }}
      >
        <div className="relative overflow-hidden rounded-[1.4rem] bg-[#07090D] p-4 ring-1 ring-white/[0.06] sm:p-5">
          {/* The phone's lock screen, in the visitor's own time, so the card reads as a phone at a glance. */}
          <div aria-hidden className="pb-4 pt-1 text-center">
            <p className="text-sm text-white/55">{clock?.date ?? "\u00a0"}</p>
            <p className="mt-0.5 text-5xl font-extralight tabular-nums tracking-tight text-white/90">{clock?.time ?? "9:41"}</p>
          </div>

          {/* Whose phone: the business, typed in, and theirs if they click. */}
          <div
            onClick={s.takeOver}
            className="flex cursor-text items-center gap-3 rounded-full bg-white/[0.07] py-2 pl-4 pr-2 ring-1 ring-white/10 transition-colors hover:ring-white/25"
          >
            <PiStorefrontDuotone aria-hidden size={18} className="shrink-0 text-white/60" />
            {s.live ? (
              <input
                ref={s.inputRef}
                type="text"
                value={s.query}
                onChange={(e) => s.edit(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (named) start();
                    else s.commit();
                  }
                }}
                aria-label="Your business name"
                className="min-w-0 flex-1 bg-transparent text-[15px] text-white focus:outline-none"
              />
            ) : (
              <span className="flex min-w-0 flex-1 items-center text-[15px] text-white/85">
                <span className="truncate">{s.typed}</span>
                <span aria-hidden className="caret ml-px inline-block h-4 w-[2px] shrink-0 bg-white/70" />
              </span>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (named) start();
                else if (s.live) s.commit();
                else s.takeOver();
              }}
              className="inline-flex min-h-[36px] shrink-0 items-center whitespace-nowrap rounded-full bg-darkButton px-4 text-[13px] font-semibold text-darkBG transition-colors hover:bg-darkButtonHover"
            >
              {named ? "Get started" : s.live ? "Enter" : "Try yours"}
            </button>
          </div>

          {s.live && s.suggestions.length > 0 && (
            <ul className="mt-2 overflow-hidden rounded-2xl bg-white/[0.06] ring-1 ring-white/10">
              {s.suggestions.map((sug) => (
                <li key={sug.placeId}>
                  <button
                    type="button"
                    onClick={() => s.pick(sug)}
                    className="block w-full px-4 py-2.5 text-left transition-colors hover:bg-white/[0.06]"
                  >
                    <span className="block text-sm text-white">{sug.name}</span>
                    {sug.address && <span className="block text-xs text-white/50">{sug.address}</span>}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* The shelf at work. */}
          <div className="relative mt-3 h-[12.25rem]" aria-live="off">
            {shown.map((n, depth) => {
              const ping = PINGS[n % PINGS.length];
              const tool = productByKey(ping.key)!;
              return (
                <div
                  key={n}
                  className="absolute inset-x-0 top-0 flex animate-fadeIn items-center gap-3 rounded-2xl bg-[#14171D] px-4 py-3 ring-1 ring-white/10 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    transform: `translateY(${depth * 4.1}rem) scale(${1 - depth * 0.03})`,
                    opacity: 1 - depth * 0.32,
                    zIndex: VISIBLE - depth,
                  }}
                >
                  <span aria-hidden className="h-8 w-[3px] shrink-0 rounded-full" style={{ backgroundColor: tool.accent }} />
                  <div className="min-w-0">
                    <p className="text-[11px] text-white/45">{tool.name}</p>
                    <p className="truncate text-[13px] text-white/90">{ping.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(172deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 22%, transparent 23%)" }}
          />
        </div>
      </div>
    </div>
  );
}
