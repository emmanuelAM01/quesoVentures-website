"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Reveal from "components/Reveal";
import ArrowMark, { arrowTone } from "components/ArrowMark";
import { houseGradient } from "components/livery";
import { PRODUCTS } from "components/studiosCatalog";
import { WantModal } from "components/StudiosExperience";
import { QrsConnect, QrsMonth, QrsTag } from "components/QrsScenes";

/**
 * The Queso Revenue System, on a page of its own.
 *
 * Two readers. An owner deciding whether to link their bank, and Plaid
 * deciding whether to let us ask. Both want the same things answered: what
 * it does, what it can see, what it can never do, and how to get out. So the
 * page walks the tool in the order it is used, then says plainly what happens
 * to the bank data, then the price.
 *
 * Laid out like the About page: the name over a dark field, then splits that
 * alternate sides, each a drawing of the tool and the words for it. Studios
 * dark, whatever the visitor's theme, because the drawings are made for it.
 */

const QRS = PRODUCTS.find((p) => p.key === "revenue")!;
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

function useInView<T extends Element>(ref: React.RefObject<T | null>): boolean {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return setSeen(true);
    const io = new IntersectionObserver(([entry]) => setSeen(entry.isIntersecting), {
      rootMargin: "-10% 0px -10% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return seen;
}

/** A drawing of the tool, played only while it is on screen. */
function Stage({ Scene }: { Scene: (p: { on: boolean }) => JSX.Element }) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref);
  return (
    <div
      ref={ref}
      className="flex h-full items-center justify-center px-6 py-16 sm:px-12 lg:py-24"
      style={{ background: `radial-gradient(ellipse 70% 60% at 50% 55%, ${QRS.accent}26, transparent 70%)` }}
    >
      <div
        className="w-full max-w-md rounded-3xl border border-white/10 bg-black/40 p-5"
        style={{ boxShadow: `0 40px 120px -40px ${QRS.accent}80` }}
      >
        <Scene on={on} />
      </div>
    </div>
  );
}

/** One spread: the drawing on one side, the words on the other. */
function Spread({
  title,
  children,
  Scene,
  flip = false,
}: {
  title: string;
  children: React.ReactNode;
  Scene: (p: { on: boolean }) => JSX.Element;
  flip?: boolean;
}) {
  return (
    <section className="grid grid-cols-1 border-t border-white/[0.06] lg:min-h-[80svh] lg:grid-cols-2 [&>*]:min-w-0">
      <div className={flip ? "lg:order-2" : ""}>
        <Stage Scene={Scene} />
      </div>
      <div className="flex items-center px-6 pb-20 pt-4 sm:px-10 lg:px-16 lg:py-24">
        <Reveal className="max-w-lg">
          <h2 className="text-4xl font-extralight leading-[1] tracking-tighter text-balance text-white sm:text-5xl">{title}</h2>
          <span aria-hidden className="mt-7 block h-[3px] w-12 rounded-full" style={{ backgroundColor: QRS.accent }} />
          <div className="mt-7 space-y-5 text-lg font-light leading-relaxed text-white/70">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}

/** What happens to the bank data. Each one true of the code as it stands. */
const PROMISES: { title: string; body: string }[] = [
  {
    title: "It only reads",
    body: "QRS asks your bank for your transactions and nothing else. It never gets your account or routing numbers, and nothing in it can move, send or spend money.",
  },
  {
    title: "Your login stays with your bank",
    body: "You sign in on Plaid's secure screen, not ours. We never see or store your bank username or password.",
  },
  {
    title: "Locked up",
    body: "The access your bank grants is stored encrypted, and the key to it lives only in the app that reads your accounts.",
  },
  {
    title: "Unlink any time",
    body: "Unlink a bank and its accounts and transactions are deleted with it.",
  },
];

export default function QrsExperience() {
  const [want, setWant] = useState(false);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(r);
  }, []);

  useEffect(() => {
    if (!want) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setWant(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [want]);

  return (
    <div className="min-h-screen overflow-x-clip bg-[#04050A] text-white">
      <Link
        href="/studios"
        className="fixed left-5 top-5 z-50 flex items-center gap-2 rounded-full border border-white/15 bg-[#04050A]/85 px-5 py-2.5 text-sm font-semibold text-white/80 backdrop-blur-md transition-all duration-500 hover:border-white/35 hover:text-white"
      >
        <span aria-hidden>←</span> Queso Studios
      </Link>

      {/* The name */}
      <section className="relative grid min-h-[100svh] grid-cols-1 lg:grid-cols-2 [&>*]:min-w-0">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(ellipse 55% 50% at 75% 50%, ${QRS.accent}22, transparent 70%)` }}
        />
        <div
          className={`relative flex flex-col justify-end px-6 pb-14 pt-32 transition-all duration-[1400ms] sm:px-10 lg:px-16 lg:pb-24 ${EASE} ${
            shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p className="text-[13px] font-semibold uppercase tracking-[0.28em] text-white/45">Queso Studios</p>
          <h1 className="mt-5 text-6xl font-extralight leading-[0.95] tracking-tighter text-balance sm:text-7xl lg:text-8xl">
            Queso Revenue System
          </h1>
          <span aria-hidden className="mt-8 block h-1 w-16 rounded-full" style={{ backgroundImage: houseGradient() }} />
          <p className="mt-8 max-w-md text-xl font-light leading-relaxed text-white/70">{QRS.line}</p>
          <button type="button" onClick={() => setWant(true)} className={`${arrowTone("dark")} mt-10 self-start`}>
            <ArrowMark tone="dark" label="Want this?" />
          </button>
        </div>
        <div className="relative hidden lg:block">
          <Stage Scene={QrsMonth} />
        </div>
      </section>

      <Spread title="Connect once" Scene={QrsConnect}>
        <p>
          Sign in to your bank through Plaid, the secure screen a great many finance apps use. From then on every charge on
          your accounts and cards comes in on its own.
        </p>
        <p>One bank login is one connection, however many accounts are behind it.</p>
      </Spread>

      <Spread title="Business or personal, once" Scene={QrsTag} flip>
        <p>A new charge waits as not tagged yet, one tap from business or personal.</p>
        <p>
          Tell it once that the lumber yard is business, and every lumber yard charge after that is tagged before you see
          it. A tag you set by hand is never written over.
        </p>
      </Spread>

      <Spread title="What your month really looks like" Scene={QrsMonth}>
        <p>What came in, what went out, and where it went, month by month.</p>
        <p>
          What a day costs you, what the business costs a month, what is left over in a typical month, and what it takes
          to hit a goal. Real numbers instead of a guess on the back of a receipt.
        </p>
      </Spread>

      {/* The bank data, said plainly */}
      <section className="border-t border-white/[0.06] px-6 py-24 sm:px-10 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="max-w-2xl text-5xl font-extralight leading-[0.98] tracking-tighter text-balance sm:text-6xl">
              Your bank data
            </h2>
            <span aria-hidden className="mt-8 block h-1 w-16 rounded-full" style={{ backgroundImage: houseGradient() }} />
          </Reveal>
          <div className="mt-16 grid gap-x-16 gap-y-12 md:grid-cols-2">
            {PROMISES.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <h3 className="text-2xl font-light tracking-tight text-white">{p.title}</h3>
                <p className="mt-3 text-lg font-light leading-relaxed text-white/65">{p.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={360}>
            <Link href="/privacy" className={`${arrowTone("dark")} mt-16`}>
              <ArrowMark tone="dark" label="Privacy policy" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* The price, and the way in */}
      <section className="border-t border-white/[0.06] px-6 py-24 sm:px-10 sm:py-32">
        <Reveal className="mx-auto max-w-6xl">
          <p className="text-5xl font-extralight tabular-nums tracking-tighter sm:text-6xl">${QRS.list} / month</p>
          <p className="mt-3 text-xl font-light text-white/60">${QRS.client} for Queso clients</p>
          {QRS.usage && <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-white/45">{QRS.usage}</p>}
          <div className="mt-12 flex flex-wrap items-center gap-x-12 gap-y-6">
            <button type="button" onClick={() => setWant(true)} className={arrowTone("dark")}>
              <ArrowMark tone="dark" label="Want this?" />
            </button>
            <Link href="/studios" className={arrowTone("dark")}>
              <ArrowMark tone="dark" label="Everything else in Studios" />
            </Link>
          </div>
        </Reveal>
      </section>

      {want && <WantModal tool={QRS.name} onClose={() => setWant(false)} />}
    </div>
  );
}
