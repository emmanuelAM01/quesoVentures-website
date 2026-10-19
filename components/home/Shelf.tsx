"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ProductShot from "components/tools/ProductShot";
import { houseGradient } from "components/livery";
import { OUTCOMES, departmentNumber, productsFor } from "components/catalog";
import OutcomeRows from "components/tools/OutcomeRows";
import { openGetStarted } from "components/GetStarted";

/**
 * The shelf, as you scroll past it.
 *
 * The departments run down the left, one to a screen. The right side holds
 * still and shows the one you are reading: its lead tool, running, swapping
 * for the next as the next row reaches the middle of the screen. Rows you are
 * not on dim, so there is only ever one thing to read.
 *
 * On a phone there is no room beside the rows, so each row carries its own
 * shot underneath it and nothing is pinned.
 */
export default function Shelf() {
  const [active, setActive] = useState(0);
  const rows = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    rows.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-bandLight dark:bg-bandDark">
      <div className="container mx-auto px-4 pt-24 sm:pt-32">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-5xl font-extralight tracking-tight text-lightText sm:text-6xl dark:text-darkText">Go Shopping</h2>
          <span aria-hidden className="mt-8 block h-1 w-24 rounded-full" style={{ backgroundImage: houseGradient() }} />

          <div className="grid lg:grid-cols-2 lg:gap-16">
            <div className="pb-16 lg:pb-[8vh]">
              {OUTCOMES.map((o, i) => {
                const tools = productsFor(o.key);
                const on = active === i;
                return (
                  <div
                    key={o.key}
                    ref={(el) => {
                      rows.current[i] = el;
                    }}
                    data-i={i}
                    className={`flex flex-col justify-center py-14 transition-opacity duration-500 lg:min-h-[70vh] lg:py-0 ${
                      on ? "lg:opacity-100" : "lg:opacity-30"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="select-none text-7xl font-extralight leading-none tracking-tighter text-transparent sm:text-8xl"
                      style={{ WebkitTextStroke: `1.5px ${o.accent}` }}
                    >
                      {departmentNumber(o)}
                    </span>
                    <h3 className="mt-6 text-4xl font-light tracking-tight text-lightText sm:text-5xl dark:text-darkText">
                      {o.label}
                    </h3>
                    <p className="mt-4 max-w-md text-lg font-light leading-relaxed text-lightTextMuted dark:text-darkTextMuted">
                      {o.line}
                    </p>
                    <div className="mt-8 max-w-md border-y border-lightText/10 dark:border-darkText/10">
                      <OutcomeRows outcome={o} variant="shelf" onPack={(key) => openGetStarted(key, "home")} />
                    </div>
                    <div className="mt-12 lg:hidden">
                      <ProductShot product={tools[0]} size="md" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* The pinned side: every lead tool stacked, one showing. */}
            <div className="hidden lg:block">
              <div className="sticky top-[12vh] flex h-[76vh] items-center">
                <div className="relative h-[28rem] w-full">
                  {OUTCOMES.map((o, i) => {
                    const lead = productsFor(o.key)[0];
                    const on = active === i;
                    return (
                      <div
                        key={o.key}
                        aria-hidden={!on}
                        className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        style={{
                          opacity: on ? 1 : 0,
                          transform: on ? "none" : `translateY(${i < active ? -40 : 40}px) scale(0.94)`,
                          filter: on ? "none" : "blur(6px)",
                          pointerEvents: on ? "auto" : "none",
                        }}
                      >
                        <div className="w-full">
                          <ProductShot product={lead} size="lg" running={on} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Where you are on the shelf. */}
                <ol aria-hidden className="ml-6 flex flex-col gap-2">
                  {OUTCOMES.map((o, i) => (
                    <li
                      key={o.key}
                      className="w-[3px] rounded-full transition-all duration-500"
                      style={{ height: active === i ? 28 : 10, backgroundColor: active === i ? o.accent : "rgba(128,128,128,0.35)" }}
                    />
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
