"use client";

import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface FaqItem {
  title: string;
  content: string;
}

interface Props {
  items: FaqItem[];
  heading?: string;
  subheading?: string;
}

export default function FaqDeck({
  items,
  heading = "Questions, answered",
  subheading = "Straight answers for Houston business owners.",
}: Props) {
  const [active, setActive] = useState(0);
  const n = items.length;

  const prev = () => setActive((a) => (a - 1 + n) % n);
  const next = () => setActive((a) => (a + 1) % n);

  const openContact = () => {
    window.dispatchEvent(
      new CustomEvent("contact:prefill", {
        detail: { message: "I have a question about getting my business found online:" },
      })
    );
    window.dispatchEvent(
      new CustomEvent("modal:open", { detail: { id: "contact-popup" } })
    );
  };

  return (
    <section data-dark-section className="bg-[#101216] py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#F5F7FA] mb-3">
            {heading}
          </h2>
          <p className="text-lg sm:text-xl font-light text-[#B7C0C8] mb-12">
            {subheading}
          </p>

          <div className="grid lg:grid-cols-[1fr,1.1fr] gap-10 lg:gap-14 items-start">
            {/* Question list (desktop) */}
            <div className="hidden lg:flex flex-col gap-1">
              {items.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`text-left px-4 py-3 rounded-xl text-sm transition-colors border-l-2 ${
                    i === active
                      ? "border-darkButton bg-white/[0.07] text-[#F5F7FA] font-medium"
                      : "border-transparent text-[#B7C0C8] hover:bg-white/[0.04]"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>

            {/* Card deck */}
            <div>
              <div className="relative h-[360px] sm:h-[320px]">
                {items.map((item, i) => {
                  const offset = (i - active + n) % n;
                  const inStack = offset < 3;
                  return (
                    <div
                      key={i}
                      aria-hidden={offset !== 0}
                      className="absolute inset-0 rounded-3xl border border-white/10 bg-[#191C22] p-6 sm:p-8 transition-all duration-500 ease-out"
                      style={{
                        transform: `translateY(${offset * -16}px) scale(${1 - offset * 0.045})`,
                        opacity: offset === 0 ? 1 : inStack ? 0.45 - offset * 0.12 : 0,
                        zIndex: n - offset,
                        pointerEvents: offset === 0 ? "auto" : "none",
                      }}
                    >
                      <p className="text-xs font-semibold uppercase tracking-widest text-darkButton mb-4">
                        {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                      </p>
                      <h3 className="text-lg sm:text-xl font-semibold text-[#F5F7FA] mb-3 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base font-light text-[#B7C0C8] leading-relaxed overflow-y-auto max-h-[190px] sm:max-h-[160px]">
                        {item.content}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous question"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#F5F7FA] hover:bg-white/10 transition-colors"
                  >
                    <FaChevronLeft size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next question"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#F5F7FA] hover:bg-white/10 transition-colors"
                  >
                    <FaChevronRight size={13} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={openContact}
                  className="inline-flex items-center justify-center rounded-xl bg-darkButton hover:bg-darkButtonHover px-6 py-3 text-base font-semibold text-darkBG transition-colors"
                >
                  Ask Us Anything
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
