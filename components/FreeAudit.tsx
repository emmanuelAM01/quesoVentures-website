"use client";

import React from "react";
import { FaCheck } from "react-icons/fa";

const checks = [
  "Why you are not showing up in local searches",
  "Quick wins for getting found in your area",
  "What stops your visitors from calling or booking",
  "Whether AI tools would recommend you today",
];

export default function FreeAuditSection() {
  const openContactWithPrefill = (message: string) => {
    window.dispatchEvent(new CustomEvent("contact:prefill", { detail: { message } }));
    window.dispatchEvent(new CustomEvent("modal:open", { detail: { id: "contact-popup" } }));
  };

  return (
    <section
      id="free-audit"
      className="container mx-auto px-4 py-20 scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto">
        <div className="rounded-3xl border border-lightBorder dark:border-darkBorder bg-white dark:bg-[#151618] p-8 sm:p-12 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-lightText dark:text-darkText mb-4">
              Ready to stop being invisible online?
            </h2>
            <p className="text-lg sm:text-xl font-light text-lightTextMuted dark:text-darkTextMuted">
              We take a free look at where you stand, show you what is
              possible, and you decide. No pressure.
            </p>

            <button
              type="button"
              onClick={() =>
                openContactWithPrefill(
                  "I want to see what my website could look like. I need help with getting more..."
                )
              }
              className="mt-8 w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-lightButton hover:bg-lightButtonHover dark:bg-darkButton dark:hover:bg-darkButtonHover px-6 py-3.5 text-base sm:px-8 sm:py-4 sm:text-lg font-semibold text-lightBG dark:text-darkBG transition-colors"
            >
              See What Your Website Could Look Like
            </button>
            <p className="mt-4 text-sm font-light text-lightTextMuted dark:text-darkTextMuted">
              Free. No commitment. We reply within 24 hours.
            </p>
          </div>

          <ul className="space-y-4">
            {checks.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lightAccent/10 dark:bg-darkAccent/10 text-lightAccent dark:text-darkAccent">
                  <FaCheck size={11} />
                </span>
                <span className="text-base sm:text-lg font-light text-lightText dark:text-darkText">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
