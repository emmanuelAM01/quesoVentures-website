"use client";

import { useEffect, useState } from "react";
import {
  FaCheck,
  FaRegFileExcel,
  FaArrowUp,
  FaArrowDown,
  FaTriangleExclamation,
} from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";
import { PAINT } from "./livery";
import { ASKS, TOOLS, type Tool } from "./tools";

/**
 * The tool reel.
 *
 * The site could only ever say "custom tools built for your business", which
 * is a sentence a shop owner cannot picture. This shows six of them, one at a
 * time, and lets someone stop on the one that is their problem.
 *
 * Every panel is drawn rather than screenshotted, on purpose: a real screenshot
 * dates the moment a UI changes, carries a fake business name that has to be
 * legally safe, and reads like somebody else's product. These are the shapes
 * the tools take, at the size a phone can render.
 */

const HOLD_MS = 5000;

/**
 * A paint per tool, used as the ground the panel sits on.
 *
 * Six white panels in a row on a white card is a spec sheet. Flipping through
 * a suite should feel like flipping through a suite, and this site already
 * rotates factory paint across every card grid — so the reel does the same,
 * one colour per tool, laid down as a soft wash rather than a fill. Livery
 * rules still hold: a wash at this strength is an accent, not a surface.
 */
const GROUND: Record<Tool["id"], string> = {
  rewards: PAINT.gialloOrion.hex,
  checkin: PAINT.verdeMantis.hex,
  frontdesk: PAINT.rossoCorsa.hex,
  booking: PAINT.bluLeMans.hex,
  invoicing: PAINT.arancioXanto.hex,
  qrs: PAINT.bluTourDeFrance.hex,
  next: PAINT.gialloModena.hex,
};

/** Every panel sits in the same box so the card never jumps between tools. */
const PANEL = "flex h-[15.5rem] w-full flex-col justify-center gap-3";

const cardBase =
  "rounded-2xl border border-lightBorder bg-white p-4 shadow-sm dark:border-darkBorder dark:bg-[#151618]";
const muted = "text-lightTextMuted dark:text-darkTextMuted";

function Rewards({ on }: { on: boolean }) {
  const [filled, setFilled] = useState(0);
  useEffect(() => {
    if (!on) return setFilled(0);
    let n = 0;
    const t = setInterval(() => {
      n = n >= 4 ? 4 : n + 1;
      setFilled(n);
    }, 420);
    return () => clearInterval(t);
  }, [on]);

  return (
    <div className={PANEL}>
      <div className={cardBase}>
        <p className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${muted}`}>
          Visit {Math.max(filled, 1)} of 5
        </p>
        <div className="mt-3 flex items-center gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="h-8 w-8 rounded-full border-2 transition-all duration-300"
              style={{
                borderColor:
                  i < filled ? PAINT.gialloOrion.hex : "rgba(128,128,128,0.28)",
                backgroundColor:
                  i < filled ? PAINT.gialloOrion.hex : "transparent",
                transform: i === filled - 1 ? "scale(1.12)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>

      <div
        className="max-w-[92%] rounded-2xl rounded-bl-md bg-black/[0.05] px-4 py-3 text-[14px] leading-snug text-lightText transition-all duration-500 dark:bg-white/10 dark:text-darkText"
        style={{
          opacity: filled >= 4 ? 1 : 0,
          transform: filled >= 4 ? "none" : "translateY(6px)",
        }}
      >
        One more visit and your next one is on us. See you soon.
      </div>
    </div>
  );
}

function CheckIn({ on }: { on: boolean }) {
  return (
    <div className={PANEL}>
      <div
        className={`${cardBase} flex flex-col items-center py-7 text-center transition-all duration-500`}
        style={{ opacity: on ? 1 : 0, transform: on ? "none" : "scale(0.96)" }}
      >
        <span
          className="flex h-12 w-12 items-center justify-center rounded-full text-white transition-transform duration-500"
          style={{
            backgroundColor: PAINT.verdeMantis.hex,
            transform: on ? "scale(1)" : "scale(0.6)",
          }}
        >
          <FaCheck size={20} />
        </span>
        <p className="mt-3 text-base font-semibold text-lightText dark:text-darkText">
          Checked in
        </p>
        <p className={`mt-1.5 text-[14px] leading-snug ${muted}`}>
          That is visit 3. Keep coming back to earn more deals.
        </p>
      </div>
    </div>
  );
}

function FrontDesk({ on }: { on: boolean }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!on) return setStep(0);
    const a = setTimeout(() => setStep(1), 500);
    const b = setTimeout(() => setStep(2), 1600);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [on]);

  const bubble = (shown: boolean) => ({
    opacity: shown ? 1 : 0,
    transform: shown ? "none" : "translateY(8px)",
  });

  return (
    <div className={PANEL}>
      <div
        className="max-w-[85%] rounded-2xl rounded-bl-md bg-black/[0.05] px-4 py-3 text-[14px] leading-snug text-lightText transition-all duration-500 dark:bg-white/10 dark:text-darkText"
        style={bubble(step >= 1)}
      >
        Do you take walk-ins on Saturday?
      </div>

      <div
        className="ml-auto max-w-[85%] rounded-2xl rounded-br-md px-4 py-3 text-[14px] leading-snug text-white transition-all duration-500"
        style={{ ...bubble(step >= 2), backgroundColor: PAINT.rossoCorsa.hex }}
      >
        We do, 8am to 2pm. Want me to hold a spot for you?
      </div>

      <p
        className={`ml-auto flex items-center gap-1.5 text-[11px] font-medium transition-opacity duration-500 ${muted}`}
        style={{ opacity: step >= 2 ? 1 : 0 }}
      >
        <HiSparkles size={11} /> Answered in 4 seconds
      </p>
    </div>
  );
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const SLOTS = ["8:00", "9:30", "11:00", "1:30"];

function Booking({ on }: { on: boolean }) {
  const [picked, setPicked] = useState(-1);
  useEffect(() => {
    if (!on) return setPicked(-1);
    const t = setTimeout(() => setPicked(1), 900);
    return () => clearTimeout(t);
  }, [on]);

  return (
    <div className={PANEL}>
      <div className={cardBase}>
        <div className="flex gap-1.5">
          {DAYS.map((d, i) => (
            <span
              key={d}
              className="flex-1 rounded-lg py-1.5 text-center text-[11px] font-medium transition-colors"
              style={
                i === 1
                  ? { backgroundColor: PAINT.rossoCorsa.hex, color: "#fff" }
                  : { backgroundColor: "rgba(128,128,128,0.10)" }
              }
            >
              {d}
            </span>
          ))}
        </div>
        <div className="mt-2.5 grid grid-cols-4 gap-1.5">
          {SLOTS.map((t, i) => (
            <span
              key={t}
              className="rounded-lg border py-2 text-center text-[11px] font-medium transition-all duration-300"
              style={
                i === picked
                  ? {
                      borderColor: PAINT.rossoCorsa.hex,
                      color: PAINT.rossoCorsa.hex,
                      backgroundColor: `${PAINT.rossoCorsa.hex}12`,
                    }
                  : { borderColor: "rgba(128,128,128,0.25)" }
              }
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div
        className={`${cardBase} flex items-center gap-2.5 transition-all duration-500`}
        style={{
          opacity: picked >= 0 ? 1 : 0,
          transform: picked >= 0 ? "none" : "translateY(6px)",
        }}
      >
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: PAINT.verdeMantis.hex }}
        >
          <FaCheck size={11} />
        </span>
        <p className="text-[14px] font-medium text-lightText dark:text-darkText">
          Booked, Tuesday at 9:30
        </p>
      </div>
    </div>
  );
}

const INVOICE_PROMPT = "send the invoice for last week's job";

function Invoicing({ on }: { on: boolean }) {
  const [typed, setTyped] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!on) {
      setTyped("");
      setSent(false);
      return;
    }
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setTyped(INVOICE_PROMPT.slice(0, i));
      if (i >= INVOICE_PROMPT.length) {
        clearInterval(t);
        setTimeout(() => setSent(true), 500);
      }
    }, 45);
    return () => clearInterval(t);
  }, [on]);

  return (
    <div className={PANEL}>
      <div className="flex items-center gap-2 rounded-full border border-lightBorder px-4 py-2.5 dark:border-darkBorder">
        <HiSparkles
          size={13}
          className="shrink-0 text-lightAccent dark:text-darkAccent"
        />
        <span className="min-w-0 truncate text-[14px] text-lightText dark:text-darkText">
          {typed}
        </span>
        <span className="caret inline-block h-4 w-[2px] shrink-0 bg-lightText dark:bg-darkText" />
      </div>

      <div
        className={`${cardBase} transition-all duration-500`}
        style={{ opacity: sent ? 1 : 0, transform: sent ? "none" : "translateY(8px)" }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[14px] font-semibold text-lightText dark:text-darkText">
              Invoice 1043
            </p>
            <p className={`mt-0.5 text-[12px] ${muted}`}>
              Driveway repair, Thursday
            </p>
          </div>
          <p className="text-[15px] font-semibold text-lightText dark:text-darkText">
            $1,850
          </p>
        </div>
        <div className="mt-3 flex items-center gap-2 border-t border-lightBorder pt-3 dark:border-darkBorder">
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
            style={{ backgroundColor: PAINT.verdeMantis.hex }}
          >
            Sent
          </span>
          <span className={`text-[12px] ${muted}`}>Emailed and texted</span>
        </div>
      </div>
    </div>
  );
}

/**
 * What an audit actually hands back, in the order it hands it back.
 *
 * Three tones, and the order is the point: what is working, what is quietly
 * leaking, then what is costing real money. An all-red list reads as an
 * accusation and nobody books a call to be told they are bad at running their
 * own shop. Leading with the healthy line is also honest about what this tool
 * does — most of what it finds is fine, and the value is knowing which part
 * is not.
 *
 * Every line here is a thing that genuinely turns up in small-business books:
 * two overlapping subscriptions nobody cancelled, invoices going out late
 * enough to hurt cash flow, a utility that crept up and never got questioned.
 * Swap freely, but keep one of each tone and keep the numbers plausible for a
 * shop, not for a chain.
 */
type Tone = "good" | "watch" | "bad";

const FINDINGS: { tone: Tone; label: string; value: string }[] = [
  { tone: "good", label: "Revenue steady, no big swings", value: "12 months" },
  { tone: "watch", label: "Two subscriptions doing the same job", value: "$240 / mo" },
  { tone: "bad", label: "Invoices going out four days late", value: "3 accounts" },
];

const TONE: Record<Tone, { hex: string; Icon: typeof FaArrowUp }> = {
  good: { hex: PAINT.verdeMantis.hex, Icon: FaArrowUp },
  watch: { hex: PAINT.gialloOrion.hex, Icon: FaTriangleExclamation },
  bad: { hex: PAINT.rossoCorsa.hex, Icon: FaArrowDown },
};

function Qrs({ on }: { on: boolean }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (!on) return setShown(0);
    let n = 0;
    const t = setInterval(() => {
      n += 1;
      setShown(n);
      if (n >= FINDINGS.length + 1) clearInterval(t);
    }, 550);
    return () => clearInterval(t);
  }, [on]);

  return (
    <div className={PANEL}>
      <div className="flex items-center gap-2.5 rounded-xl border border-dashed border-lightBorder px-4 py-2.5 dark:border-darkBorder">
        <FaRegFileExcel size={14} className="shrink-0 text-[#1D6F42]" />
        <span className="min-w-0 truncate text-[14px] text-lightText dark:text-darkText">
          last-quarter.xlsx
        </span>
        <span className={`ml-auto shrink-0 text-[11px] ${muted}`}>Read</span>
      </div>

      <div className="space-y-1.5">
        {FINDINGS.map((f, i) => (
          <div
            key={f.label}
            className={`${cardBase} flex items-center gap-3 py-2.5 transition-all duration-500`}
            style={{
              opacity: shown > i ? 1 : 0,
              transform: shown > i ? "none" : "translateY(8px)",
            }}
          >
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white"
              style={{ backgroundColor: TONE[f.tone].hex }}
            >
              {(() => {
                const Icon = TONE[f.tone].Icon;
                return <Icon size={10} />;
              })()}
            </span>
            <p className="min-w-0 flex-1 truncate text-[13px] text-lightText dark:text-darkText">
              {f.label}
            </p>
            <p className="shrink-0 text-[13px] font-semibold text-lightText dark:text-darkText">
              {f.value}
            </p>
          </div>
        ))}
      </div>

      {/*
        The bench, not the price.

        "Prepared by" rather than "second opinion": the bench is who reads the
        numbers in the first place, not an upsell bolted on after. A second
        opinion is something you go looking for when you doubt the first one,
        which is the opposite of the impression this panel should leave.

        There is a subscription behind this line and it is deliberately not on
        the page. The $500 plan is the number this site is teaching people; a
        second figure in a carousel panel turns the section into a price list
        and starts the comparison before there is a conversation. What no
        competitor here can answer is who reads the numbers, so that is what it
        says.
      */}
      <p
        className={`mt-1 border-t border-lightBorder pt-2.5 text-center text-[11px] leading-snug transition-opacity duration-500 dark:border-darkBorder ${muted}`}
        style={{ opacity: shown > FINDINGS.length ? 1 : 0 }}
      >
        Prepared by Harvard economists, Wharton MBAs, CPAs, and CFOs. (a bunch of number nerds)
      </p>
    </div>
  );
}

/**
 * The one that has not been built yet.
 *
 * Six panels of finished software make a convincing case and then quietly imply
 * the list is the list. It is not: what gets built next comes out of a
 * conversation, which is the part no platform competitor can copy. So the last
 * panel is deliberately empty — a slot with a question in it, and a real ask
 * filling it.
 *
 * The asks rotate. One fixed example reads as the one clever thing that got
 * built; eight of them, different every time the reel comes round, read as a
 * standing offer.
 */

/**
 * Where the next viewing of this panel starts.
 *
 * Module scope on purpose. The panel is keyed by tool id and remounts every
 * time the reel returns to it, so component state would reset to the same ask
 * forever. This survives the remount, which is the whole point: come back to
 * this panel and it is asking something else.
 */
let askCursor = 0;

const ASK_MS = 4200;

function WhatsNext({ on }: { on: boolean }) {
  const [n, setN] = useState(() => askCursor++ % ASKS.length);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!on) return setStep(0);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStep(2);
      return;
    }
    let dead = false;
    let timers: ReturnType<typeof setTimeout>[] = [];
    const after = (ms: number, fn: () => void) => {
      timers.push(setTimeout(() => !dead && fn(), ms));
    };

    /* Ask, then answer. */
    after(600, () => setStep(1));
    after(1700, () => setStep(2));

    /*
      Swap the words only once both bubbles have finished fading out. Changing
      the text on the same tick as the fade means the new question is what the
      reader watches disappear, which looks like a typo correcting itself.

      This only advances while the panel is up. On the auto reel it never fires
      — the carousel has moved on by then — so a passive viewer sees one
      exchange and someone who stops on this panel sees the range.
    */
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
  }, [on]);

  const bubble = (shown: boolean) => ({
    opacity: shown ? 1 : 0,
    transform: shown ? "none" : "translateY(8px)",
  });

  const { ask, reply } = ASKS[n];

  return (
    <div className={PANEL}>
      <div className="flex items-center justify-center">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <span
            aria-hidden
            className="queso-ask-ring absolute inset-0 rounded-2xl border-2"
            style={{
              borderColor: PAINT.gialloOrion.hex,
              animation: "queso-ask-ring 2.6s ease-out infinite",
            }}
          />
          <span
            className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-dashed text-3xl font-semibold"
            style={{
              borderColor: "rgba(128,128,128,0.35)",
              color: PAINT.gialloOrion.ink,
            }}
          >
            <span
              className="queso-ask inline-block"
              style={{ animation: "queso-ask 3s ease-in-out infinite" }}
            >
              ?
            </span>
          </span>
        </div>
      </div>

      <div
        className="max-w-[88%] rounded-2xl rounded-bl-md bg-black/[0.05] px-4 py-2.5 text-[14px] leading-snug text-lightText transition-all duration-500 dark:bg-white/10 dark:text-darkText"
        style={bubble(step >= 1)}
      >
        {ask}
      </div>

      <div
        className="ml-auto max-w-[88%] rounded-2xl rounded-br-md px-4 py-2.5 text-[14px] leading-snug text-white transition-all duration-500"
        style={{ ...bubble(step >= 2), backgroundColor: PAINT.rossoCorsa.hex }}
      >
        {reply}
      </div>
    </div>
  );
}

const PANELS: Record<string, (p: { on: boolean }) => JSX.Element> = {
  rewards: Rewards,
  checkin: CheckIn,
  frontdesk: FrontDesk,
  booking: Booking,
  invoicing: Invoicing,
  qrs: Qrs,
  next: WhatsNext,
};

export default function ToolCarousel({ running }: { running: boolean }) {
  const [i, setI] = useState(0);
  /** Clicking a tab stops the reel: they found the one that is their problem. */
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (!running || held) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % TOOLS.length), HOLD_MS);
    return () => clearInterval(t);
  }, [running, held]);

  const tool = TOOLS[i];
  const Panel = PANELS[tool.id];

  return (
    <div className="w-full">
      {/*
        The rail.

        Seven pills of text was the obvious build and the wrong one: at this
        width they wrapped, no two were the same size, and nothing about them
        said the panel was going to change on its own. These are equal
        rectangles butted up against each other, and the live one fills over
        exactly the time the panel is held. Position, progress and navigation in
        one strip three pixels tall. The name of what you are looking at moves
        under the panel, where it can be read at a size that matters.
      */}
      <div className="-my-2 flex gap-[3px]">
        {TOOLS.map((t, n) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              setI(n);
              setHeld(true);
            }}
            aria-label={t.full ? `${t.name}, ${t.full}` : t.name}
            title={t.full ?? t.name}
            aria-pressed={n === i}
            /* 44px tall, not the 19px the 3px bar and its padding came to.
               The bar is the only thing you can see; the button is the thing
               you have to hit with a thumb. */
            className="group flex min-h-[44px] flex-1 items-center"
          >
            <span className="block h-[3px] w-full overflow-hidden rounded-full bg-black/10 transition-colors group-hover:bg-black/20 dark:bg-white/15 dark:group-hover:bg-white/25">
              <span
                key={`${t.id}-${n === i ? "live" : "idle"}-${held}`}
                className="story-fill block h-full w-full origin-left rounded-full"
                style={{
                  backgroundColor: PAINT.rossoCorsa.hex,
                  transform:
                    n < i || (n === i && held) ? "scaleX(1)" : "scaleX(0)",
                  animation:
                    n === i && !held
                      ? `story-fill ${HOLD_MS}ms linear forwards`
                      : undefined,
                }}
              />
            </span>
          </button>
        ))}
      </div>

      {/*
        Keyed so every tool remounts and replays its own animation, and slid in
        from the right so the set reads as one thing moving rather than seven
        things blinking. Only an entrance: holding the outgoing panel mounted
        long enough to animate it out would double the DOM for 300ms and buy
        nothing a reader would notice.
      */}
      <div
        className="mt-3 overflow-hidden rounded-2xl p-4 transition-[background-image] duration-700"
        style={{
          backgroundImage: `radial-gradient(130% 105% at 50% 0%, ${GROUND[tool.id]}3D, ${GROUND[tool.id]}12 58%, transparent 100%)`,
        }}
      >
        <div key={tool.id} className="panel-in">
          <Panel on={running} />
        </div>
      </div>

      <div key={tool.id} className="nav-swap mt-4">
        <p className="text-[15px] font-semibold text-lightText dark:text-darkText">
          {tool.full ?? tool.name}
        </p>
        {/* This is the sentence that explains the picture above it, so it is
            set at reading size rather than caption size. */}
        <p className="mt-1 min-h-[3.25rem] text-[15px] font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">
          {tool.line}
        </p>
      </div>
    </div>
  );
}
