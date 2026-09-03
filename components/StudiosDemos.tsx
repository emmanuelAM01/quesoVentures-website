"use client";

import { useEffect, useState } from "react";
import {
  FaCheck,
  FaPhone,
  FaQrcode,
  FaRegFileExcel,
  FaArrowUp,
  FaArrowDown,
  FaTriangleExclamation,
  FaTruckFast,
} from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";
import { ASKS } from "./tools";

/**
 * The Queso Studios demos.
 *
 * Same idea as the reel on the homepage, rebuilt for the dark. These could not
 * be shared with it: the homepage panels are written in the site's light and
 * dark tokens and this page is dark whatever the visitor's theme says, so the
 * tokens would resolve to cream on cream for half of the people who land here.
 * Rather than thread a theme override through both, the demos live twice — a
 * few dozen lines of duplication against a page that would otherwise be
 * unreadable in light mode.
 *
 * Everything is drawn, never screenshotted. A screenshot dates the day the UI
 * changes and carries a business name that has to be legally safe; a drawing is
 * the shape of the tool, which is the only part a visitor is here to see.
 *
 * Each demo runs only while its card is the centred one. Nine looping
 * animations on one page is nine repaints a frame for eight things nobody is
 * looking at.
 */

/** Every demo sits in the same box so the card never resizes between tools. */
const BOX = "flex h-[10.5rem] w-full flex-col justify-center gap-2.5";

const PANE = "rounded-xl border border-white/10 bg-white/[0.055]";
const MUTED = "text-white/45";

const RED = "#C4161C";
const YELLOW = "#FFD100";
const GREEN = "#7DC23B";
const VIOLET = "#A855F7";
const BLUE = "#4C93FF";

/** Fades and lifts in one place, since every demo does it. */
const rise = (shown: boolean) => ({
  opacity: shown ? 1 : 0,
  transform: shown ? "none" : "translateY(8px)",
});

function useReduced() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return reduced;
}

/**
 * Advances through a fixed script of beats.
 *
 * Off means finished, not empty, and that is the important part. These demos
 * used to be unmounted whenever their card left the centre, so swiping the
 * lineup emptied every card you passed and refilled it from nothing — which
 * looked exactly like the page glitching. Now every demo stays mounted and
 * holds its completed state; only the centred one replays. Nothing appears or
 * disappears on scroll, and the timers still only run in one place.
 *
 * `marks` must be a module-level constant. It is a dependency of the effect,
 * so an inline array would re-run the script on every render and the demo
 * would never get past its first beat.
 */
function useScript(on: boolean, marks: readonly number[]) {
  const reduced = useReduced();
  const [step, setStep] = useState(marks.length);
  useEffect(() => {
    if (!on || reduced) return setStep(marks.length);
    setStep(0);
    const timers = marks.map((ms, i) => setTimeout(() => setStep(i + 1), ms));
    return () => timers.forEach(clearTimeout);
  }, [on, marks, reduced]);
  return step;
}

function useTyped(text: string, on: boolean, speed = 42) {
  const reduced = useReduced();
  const [typed, setTyped] = useState(text);
  useEffect(() => {
    if (!on || reduced) return setTyped(text);
    setTyped("");
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text, on, speed, reduced]);
  return typed;
}

/* ------------------------------------------------------------------ */

function Bubble({
  side,
  shown,
  color,
  children,
}: {
  side: "them" | "us";
  shown: boolean;
  color?: string;
  children: React.ReactNode;
}) {
  const us = side === "us";
  return (
    <div
      className={[
        "max-w-[86%] px-3.5 py-2 text-[13px] leading-snug transition-all duration-500",
        us
          ? "ml-auto rounded-2xl rounded-br-md text-white"
          : "rounded-2xl rounded-bl-md bg-white/[0.09] text-white/85",
      ].join(" ")}
      style={{ ...rise(shown), backgroundColor: us ? color : undefined }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */

/**
 * Queso Rewards, on a loop.
 *
 * The first cut filled four circles once and then sat there, which meant a
 * card that is entirely about coming back showed you one visit and stopped.
 * This runs the whole arc and starts over: punches stamp down one at a time,
 * the last empty slot starts asking to be filled, the shop types, the text
 * lands, and the card wipes for the next customer.
 *
 * A single tick counter drives all of it. Separate timers per beat drift apart
 * over a loop this long and end up with the message arriving before the last
 * punch, which is a bug you only see after watching it for a minute.
 */
const REWARD_TICKS = 13;
const REWARD_MS = 430;

function Rewards({ on }: { on: boolean }) {
  const reduced = useReduced();
  /* 9 is the beat where the text has landed: the state an idle card holds. */
  const [tick, setTick] = useState(9);

  useEffect(() => {
    if (!on || reduced) return setTick(9);
    setTick(0);
    const t = setInterval(() => setTick((n) => (n + 1) % REWARD_TICKS), REWARD_MS);
    return () => clearInterval(t);
  }, [on, reduced]);

  const wiping = tick >= 11;
  const filled = wiping ? 0 : Math.min(tick, 4);
  const awaiting = tick >= 5 && !wiping;
  const typing = tick === 6 || tick === 7;
  const sent = tick >= 8 && !wiping;

  return (
    <div className={BOX}>
      <div
        className={`${PANE} p-3.5 transition-opacity duration-300`}
        style={{ opacity: wiping ? 0.35 : 1 }}
      >
        <div className="flex items-baseline justify-between">
          <p className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${MUTED}`}>
            Visit {Math.max(filled, 1)} of 5
          </p>
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.16em] transition-opacity duration-500"
            style={{ color: YELLOW, opacity: awaiting ? 1 : 0 }}
          >
            1 away
          </p>
        </div>

        <div className="mt-2.5 flex items-center gap-2">
          {[0, 1, 2, 3, 4].map((i) => {
            const punched = i < filled;
            const newest = i === filled - 1 && !wiping;
            return (
              <span key={i} className="relative flex h-7 w-7 items-center justify-center">
                {/* The ring the stamp leaves behind, on the newest punch only. */}
                {newest && (
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full border-2"
                    style={{
                      borderColor: YELLOW,
                      animation: "queso-ask-ring 900ms ease-out both",
                    }}
                  />
                )}
                <span
                  /* Keyed on its own filled state so the stamp keyframe
                     restarts the moment this circle is punched, and again on
                     the next pass round the loop. */
                  key={`${i}-${punched}-${wiping}`}
                  className={`h-7 w-7 rounded-full border-2 ${punched ? "queso-stamp" : ""} ${
                    !punched && i === filled && awaiting ? "queso-await" : ""
                  }`}
                  style={{
                    borderColor: punched ? YELLOW : "rgba(255,255,255,0.22)",
                    backgroundColor: punched ? YELLOW : "transparent",
                    borderStyle: punched ? "solid" : "dashed",
                  }}
                />
              </span>
            );
          })}
        </div>
      </div>

      {/* Fixed height so the card does not jump when the dots become a text. */}
      <div className="flex min-h-[3.25rem] items-start">
        {typing ? (
          <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-white/[0.09] px-4 py-3">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="queso-typing h-1.5 w-1.5 rounded-full bg-white/70"
                style={{ animationDelay: `${i * 160}ms` }}
              />
            ))}
          </div>
        ) : (
          <div className="w-full">
            <Bubble side="them" shown={sent}>
              One more visit and your next one is on us. See you soon.
            </Bubble>
            <p
              className={`mt-1 pl-1 text-[10px] transition-opacity duration-500 ${MUTED}`}
              style={{ opacity: sent ? 1 : 0 }}
            >
              Sent to 214 regulars this morning
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Memberships, which is not a punch card and had to stop looking like one.
 *
 * The first version was a green tick and "that is visit 3", which is the
 * Rewards card's story told a second time and describes a ladder this tool
 * does not have. What actually happens: a QR code sits on the counter, a
 * customer scans it, and it opens that shop's own page of deals and updates.
 * The owner writes what goes on that page and changes it whenever they like,
 * and because redeeming means scanning again, the check-ins are how they find
 * out who keeps coming back.
 *
 * So the demo shows the counter, then the page, then the one line the owner
 * cares about. The page is the product; the tick was never the product.
 *
 * Careful with the copy on the fake page: it must read as a deal a shop would
 * actually post, and it must not imply a POS is connected. Nothing here knows
 * what anybody spent.
 */
const MEMBER_MARKS = [350, 1150, 2200] as const;

const POSTS: { label: string; tag: string; live: boolean }[] = [
  { label: "$2 off any plate today", tag: "Scan to redeem", live: true },
  { label: "Birria is back on Fridays", tag: "Update", live: false },
];

function Memberships({ on }: { on: boolean }) {
  const step = useScript(on, MEMBER_MARKS);

  return (
    <div className={BOX}>
      {/* The counter. */}
      <div
        className={`${PANE} flex items-center gap-2.5 px-3 py-1.5 transition-all duration-500`}
        style={rise(step >= 1)}
      >
        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-black"
          style={{ backgroundColor: GREEN }}
        >
          <FaQrcode size={12} />
        </span>
        <p className="text-[12px] text-white/70">Scan the code by the register</p>
      </div>

      {/* Their page, which is the actual product. */}
      <div
        className={`${PANE} overflow-hidden transition-all duration-500`}
        style={rise(step >= 2)}
      >
        <div className="border-b border-white/10 px-3 py-1">
          <span className={`rounded-full bg-white/[0.08] px-2 py-0.5 text-[9px] ${MUTED}`}>
            quesorewards.com/your-shop/news
          </span>
        </div>
        {POSTS.map((post) => (
          <div
            key={post.label}
            className="flex items-center gap-2 px-3 py-1 [&+&]:border-t [&+&]:border-white/[0.06]"
          >
            <p className="min-w-0 flex-1 truncate text-[12px] text-white/85">
              {post.label}
            </p>
            <span
              className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold"
              style={
                post.live
                  ? { backgroundColor: `${GREEN}26`, color: GREEN }
                  : { backgroundColor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)" }
              }
            >
              {post.tag}
            </span>
          </div>
        ))}
      </div>

      {/* The one line the owner is actually here for. */}
      <p
        className={`text-center text-[10px] transition-opacity duration-500 ${MUTED}`}
        style={{ opacity: step >= 3 ? 1 : 0 }}
      >
        That is Maria&apos;s 4th check-in this month.
      </p>
    </div>
  );
}

const CHAT_MARKS = [700, 1800] as const;

function Chat({ on }: { on: boolean }) {
  const step = useScript(on, CHAT_MARKS);
  return (
    <div className={BOX}>
      <div className={`${PANE} overflow-hidden`}>
        {/* Three dots and a URL is all it takes to say "your website" without
            having to draw a website. */}
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <span key={c} className="h-2 w-2 rounded-full" style={{ backgroundColor: c, opacity: 0.6 }} />
          ))}
          <span className={`ml-2 rounded-full bg-white/[0.08] px-2.5 py-0.5 text-[10px] ${MUTED}`}>
            yourshop.com
          </span>
        </div>
        <div className="space-y-2 p-3">
          <Bubble side="them" shown={step >= 1}>
            Do you warranty the work?
          </Bubble>
          <Bubble side="us" shown={step >= 2} color={VIOLET}>
            Yes. 24 months or 24,000 miles on parts and labor.
          </Bubble>
          <p
            className={`flex items-center justify-end gap-1.5 text-[10px] font-medium transition-opacity duration-500 ${MUTED}`}
            style={{ opacity: step >= 2 ? 1 : 0 }}
          >
            <HiSparkles size={10} /> Straight off your warranty page
          </p>
        </div>
      </div>
    </div>
  );
}

const DESK_MARKS = [500, 1500, 2500] as const;

function Frontdesk({ on }: { on: boolean }) {
  const step = useScript(on, DESK_MARKS);
  return (
    <div className={BOX}>
      <div className={`${PANE} flex items-center gap-3 px-3.5 py-2.5`}>
        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center">
          {step < 3 && (
            <span
              aria-hidden
              className="queso-ask-ring absolute inset-0 rounded-full border-2"
              style={{ borderColor: RED, animation: "queso-ask-ring 2s ease-out infinite" }}
            />
          )}
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: RED }}
          >
            <FaPhone size={12} />
          </span>
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold text-white">
            {step >= 3 ? "Call handled" : "Incoming call"}
          </p>
          <p className={`truncate text-[11px] ${MUTED}`}>
            {step >= 3 ? "0:41, and you never picked up" : "(281) 555 0148"}
          </p>
        </div>
      </div>
      <Bubble side="them" shown={step >= 1}>
        Y&apos;all open Saturday? Need an oil change.
      </Bubble>
      <Bubble side="us" shown={step >= 2} color={RED}>
        We are, 8 to 2. I put you down for 9:30.
      </Bubble>
    </div>
  );
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const SLOTS = ["8:00", "9:30", "11:00", "1:30"];
const BOOK_MARKS = [900, 1600] as const;

function Booking({ on }: { on: boolean }) {
  const step = useScript(on, BOOK_MARKS);
  return (
    <div className={BOX}>
      <div className={`${PANE} p-3`}>
        <div className="flex gap-1.5">
          {DAYS.map((d, i) => (
            <span
              key={d}
              className="flex-1 rounded-lg py-1.5 text-center text-[10px] font-medium transition-colors"
              style={
                i === 1
                  ? { backgroundColor: BLUE, color: "#08111F" }
                  : { backgroundColor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)" }
              }
            >
              {d}
            </span>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-4 gap-1.5">
          {SLOTS.map((t, i) => (
            <span
              key={t}
              className="rounded-lg border py-1.5 text-center text-[10px] font-medium transition-all duration-300"
              style={
                i === 1 && step >= 1
                  ? { borderColor: BLUE, color: BLUE, backgroundColor: `${BLUE}1F` }
                  : { borderColor: "rgba(255,255,255,0.16)", color: "rgba(255,255,255,0.5)" }
              }
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div
        className={`${PANE} flex items-center gap-2.5 px-3.5 py-2.5 transition-all duration-500`}
        style={rise(step >= 2)}
      >
        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-black"
          style={{ backgroundColor: GREEN }}
        >
          <FaCheck size={10} />
        </span>
        <p className="text-[13px] font-medium text-white/85">Booked, Tuesday at 9:30</p>
      </div>
    </div>
  );
}

const INVOICE_PROMPT = "send the invoice for last week's job";

function Invoicing({ on }: { on: boolean }) {
  const typed = useTyped(INVOICE_PROMPT, on);
  const done = typed.length >= INVOICE_PROMPT.length;
  return (
    <div className={BOX}>
      <div className="flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-2">
        <HiSparkles size={12} className="shrink-0" style={{ color: YELLOW }} />
        <span className="min-w-0 truncate text-[13px] text-white/85">{typed}</span>
        <span className="caret inline-block h-3.5 w-[2px] shrink-0 bg-white/70" />
      </div>
      <div className={`${PANE} p-3.5 transition-all duration-500`} style={rise(done)}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[13px] font-semibold text-white">Invoice 1043</p>
            <p className={`mt-0.5 text-[11px] ${MUTED}`}>Driveway repair, Thursday</p>
          </div>
          <p className="text-[14px] font-semibold text-white">$1,850</p>
        </div>
        <div className="mt-2.5 flex items-center gap-2 border-t border-white/10 pt-2.5">
          <span
            className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-black"
            style={{ backgroundColor: GREEN }}
          >
            Sent
          </span>
          <span className={`text-[11px] ${MUTED}`}>Emailed and texted</span>
        </div>
      </div>
    </div>
  );
}

const ADDRESS = "1420 Kingwood Dr, Kingwood";

function Delivery({ on }: { on: boolean }) {
  const typed = useTyped(ADDRESS, on, 38);
  const done = typed.length >= ADDRESS.length;
  return (
    <div className={BOX}>
      <div className="flex items-center gap-2 rounded-xl border border-white/15 px-3.5 py-2.5">
        <FaTruckFast size={13} className="shrink-0" style={{ color: YELLOW }} />
        <span className="min-w-0 truncate text-[13px] text-white/85">{typed}</span>
        <span className="caret inline-block h-3.5 w-[2px] shrink-0 bg-white/70" />
      </div>
      <div className={`${PANE} p-3.5 transition-all duration-500`} style={rise(done)}>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${MUTED}`}>
              Delivery
            </p>
            <p className="mt-1 text-[11px] text-white/55">8.2 miles, 25 to 35 minutes</p>
          </div>
          <p className="text-2xl font-bold leading-none" style={{ color: YELLOW }}>
            $18
          </p>
        </div>
        <p className={`mt-2.5 border-t border-white/10 pt-2.5 text-[11px] ${MUTED}`}>
          Quoted on the spot. Nobody had to call the shop.
        </p>
      </div>
    </div>
  );
}

/**
 * What an audit hands back, in the order it hands it back.
 *
 * The order is the point: what is working, what is quietly leaking, then what
 * is costing real money. An all-red list reads as an accusation, and nobody
 * books a call to be told they are bad at running their own shop. Keep one of
 * each tone and keep the numbers plausible for a shop, not for a chain.
 */
type Tone = "good" | "watch" | "bad";

const FINDINGS: { tone: Tone; label: string; value: string }[] = [
  { tone: "good", label: "Revenue steady, no big swings", value: "12 months" },
  { tone: "watch", label: "Two subscriptions doing the same job", value: "$240 / mo" },
  { tone: "bad", label: "Invoices going out four days late", value: "3 accounts" },
];

const TONE: Record<Tone, { hex: string; Icon: typeof FaArrowUp }> = {
  good: { hex: GREEN, Icon: FaArrowUp },
  watch: { hex: YELLOW, Icon: FaTriangleExclamation },
  bad: { hex: RED, Icon: FaArrowDown },
};

function Qrs({ on }: { on: boolean }) {
  const reduced = useReduced();
  const [shown, setShown] = useState(FINDINGS.length);
  useEffect(() => {
    if (!on || reduced) return setShown(FINDINGS.length);
    setShown(0);
    let n = 0;
    const t = setInterval(() => {
      n += 1;
      setShown(n);
      if (n >= FINDINGS.length) clearInterval(t);
    }, 520);
    return () => clearInterval(t);
  }, [on, reduced]);

  return (
    <div className={BOX}>
      <div className="flex items-center gap-2.5 rounded-xl border border-dashed border-white/20 px-3.5 py-2">
        <FaRegFileExcel size={13} className="shrink-0" style={{ color: GREEN }} />
        <span className="min-w-0 truncate text-[13px] text-white/85">last-quarter.xlsx</span>
        <span className={`ml-auto shrink-0 text-[10px] ${MUTED}`}>Read</span>
      </div>
      <div className="space-y-1.5">
        {FINDINGS.map((f, i) => {
          const { hex, Icon } = TONE[f.tone];
          return (
            <div
              key={f.label}
              className={`${PANE} flex items-center gap-2.5 px-3 py-2 transition-all duration-500`}
              style={rise(shown > i)}
            >
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-black"
                style={{ backgroundColor: hex }}
              >
                <Icon size={9} />
              </span>
              <p className="min-w-0 flex-1 truncate text-[12px] text-white/80">{f.label}</p>
              <p className="shrink-0 text-[12px] font-semibold text-white">{f.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Where the next viewing starts. Module scope on purpose: the demo unmounts
 * whenever its card leaves the centre, so component state would reset to the
 * same ask forever. This survives, which is the whole point — come back to
 * this card and it is asking something else.
 */
let askCursor = 0;
const ASK_MS = 4200;

function WhatsNext({ on }: { on: boolean }) {
  const reduced = useReduced();
  /*
    Renders ask zero on both sides, then takes its place in the rotation once
    mounted. Seeding straight from the module counter meant the server picked
    one ask and the browser picked another, and React answers a text mismatch
    by throwing the subtree away and rebuilding it — which is a card visibly
    flickering the moment the page hydrates. This card is always rendered now,
    so the mismatch was reachable on every load.
  */
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(askCursor++ % ASKS.length);
  }, []);
  const [step, setStep] = useState(2);

  useEffect(() => {
    if (!on || reduced) return setStep(2);
    setStep(0);

    let dead = false;
    let timers: ReturnType<typeof setTimeout>[] = [];
    const after = (ms: number, fn: () => void) => {
      timers.push(setTimeout(() => !dead && fn(), ms));
    };

    after(500, () => setStep(1));
    after(1500, () => setStep(2));

    /* Swap the words only once both bubbles have faded out. Changing the text
       on the same tick as the fade means the new question is what the reader
       watches disappear, which looks like a typo correcting itself. */
    const loop = setInterval(() => {
      if (dead) return;
      timers.forEach(clearTimeout);
      timers = [];
      setStep(0);
      after(450, () => {
        setN((prev) => (prev + 1) % ASKS.length);
        askCursor = (askCursor + 1) % ASKS.length;
        after(250, () => setStep(1));
        after(900, () => setStep(2));
      });
    }, ASK_MS);

    return () => {
      dead = true;
      timers.forEach(clearTimeout);
      clearInterval(loop);
    };
  }, [on, reduced]);

  const { ask, reply } = ASKS[n];

  return (
    <div className={BOX}>
      <div className="flex items-center justify-center">
        <div className="relative flex h-14 w-14 items-center justify-center">
          <span
            aria-hidden
            className="queso-ask-ring absolute inset-0 rounded-2xl border-2"
            style={{ borderColor: YELLOW, animation: "queso-ask-ring 2.6s ease-out infinite" }}
          />
          <span
            className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-dashed text-2xl font-semibold"
            style={{ borderColor: "rgba(255,255,255,0.28)", color: YELLOW }}
          >
            <span className="queso-ask inline-block" style={{ animation: "queso-ask 3s ease-in-out infinite" }}>
              ?
            </span>
          </span>
        </div>
      </div>
      <Bubble side="them" shown={step >= 1}>
        {ask}
      </Bubble>
      <Bubble side="us" shown={step >= 2} color={RED}>
        {reply}
      </Bubble>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export type DemoId =
  | "rewards"
  | "memberships"
  | "chat"
  | "frontdesk"
  | "booking"
  | "invoicing"
  | "delivery"
  | "qrs"
  | "next";

export const STUDIO_DEMOS: Record<DemoId, (p: { on: boolean }) => JSX.Element> = {
  rewards: Rewards,
  memberships: Memberships,
  chat: Chat,
  frontdesk: Frontdesk,
  booking: Booking,
  invoicing: Invoicing,
  delivery: Delivery,
  qrs: Qrs,
  next: WhatsNext,
};
