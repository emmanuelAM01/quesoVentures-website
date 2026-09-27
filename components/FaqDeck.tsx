"use client";

import { useRef, useState } from "react";
import NicheCtaButton from "components/NicheCtaButton";
import SectionHeading from "components/SectionHeading";
import Reveal from "components/Reveal";
import { houseAt } from "components/livery";

interface FaqItem {
  title: string;
  content: string;
}

interface Props {
  items: FaqItem[];
  heading?: string;
  subheading?: string;
}

/**
 * The questions, as a deck on the ink ground.
 *
 * The list of questions sits on the left like the About page's index: a line
 * and the words, the chosen one lit and lined in its colour down the house
 * ramp. The answer is the card on top of the stack on the right. No arrows
 * and no count: the list is the way through on desktop, and on a phone, where
 * the list does not fit, the dots are, and a swipe.
 */
export default function FaqDeck({
  items,
  heading = "Common Questions",
  subheading = "Things I've seen on the job",
}: Props) {
  const [active, setActive] = useState(0);
  const touchX = useRef<number | null>(null);
  const n = items.length;
  const go = (i: number) => setActive(((i % n) + n) % n);

  return (
    <section data-dark-section className="bg-[#101216] py-28 sm:py-36">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading tone="dark" sub={subheading}>
              {heading}
            </SectionHeading>
          </Reveal>

          <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1fr,1.1fr] lg:gap-16">
            {/* The questions (desktop). */}
            <ol className="hidden lg:block">
              {items.map((item, i) => {
                const on = i === active;
                return (
                  <li key={item.title}>
                    <button
                      type="button"
                      aria-current={on}
                      onClick={() => go(i)}
                      className="group flex w-full items-start gap-5 py-3 text-left focus:outline-none"
                    >
                      <span
                        aria-hidden
                        className={`mt-[0.8rem] h-[2px] flex-shrink-0 rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          on ? "w-10" : "w-4 bg-white/20 group-hover:w-7 group-hover:bg-white/45"
                        }`}
                        style={on ? { backgroundColor: houseAt(i, n) } : undefined}
                      />
                      <span
                        className={`text-lg leading-snug transition-all duration-500 ${
                          on
                            ? "text-[#F5F7FA]"
                            : "font-light text-[#8E99A5] group-hover:translate-x-1 group-hover:text-[#F5F7FA] group-focus-visible:text-[#F5F7FA]"
                        }`}
                      >
                        {item.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* The answer, on top of the stack. */}
            <div
              onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                touchX.current = null;
                if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
              }}
            >
              <div className="relative h-[380px] sm:h-[340px]">
                {items.map((item, i) => {
                  const offset = (i - active + n) % n;
                  const inStack = offset < 3;
                  return (
                    <div
                      key={item.title}
                      aria-hidden={offset !== 0}
                      className="absolute inset-0 overflow-hidden rounded-3xl border border-white/10 bg-[#171A20] p-7 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:p-9"
                      style={{
                        transform: `translateY(${offset * -16}px) scale(${1 - offset * 0.045})`,
                        opacity: offset === 0 ? 1 : inStack ? 0.45 - offset * 0.12 : 0,
                        zIndex: n - offset,
                        pointerEvents: offset === 0 ? "auto" : "none",
                      }}
                    >
                      <span
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-1"
                        style={{ backgroundColor: houseAt(i, n) }}
                      />
                      <h3 className="text-2xl font-light leading-snug tracking-tight text-[#F5F7FA] sm:text-[1.7rem]">
                        {item.title}
                      </h3>
                      <p className="mt-5 max-h-[210px] overflow-y-auto text-lg font-light leading-relaxed text-[#B7C0C8] sm:max-h-[180px]">
                        {item.content}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
                {/* Where you are, without a number. */}
                <div className="flex items-center gap-2.5">
                  {items.map((item, i) => {
                    const on = i === active;
                    return (
                      <button
                        key={item.title}
                        type="button"
                        aria-label={item.title}
                        aria-current={on}
                        onClick={() => go(i)}
                        className="group grid h-6 place-items-center focus:outline-none"
                      >
                        <span
                          className={`block h-1.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            on ? "w-6" : "w-1.5 bg-white/35 group-hover:w-2.5 group-hover:bg-white/70"
                          }`}
                          style={on ? { backgroundColor: houseAt(i, n) } : undefined}
                        />
                      </button>
                    );
                  })}
                </div>

                <NicheCtaButton
                  from="faq"
                  variant="arrow"
                  tone="dark"
                  message="I have a question about getting my business found online:"
                  label="Ask me anything"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
