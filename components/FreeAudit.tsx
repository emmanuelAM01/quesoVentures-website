"use client";

import React from "react";

export default function FreeAuditSection() {
  const openContactWithPrefill = (message: string) => {
    window.dispatchEvent(new CustomEvent("contact:prefill", { detail: { message } }));
    window.dispatchEvent(new CustomEvent("modal:open", { detail: { id: "contact-popup" } }));
  };

  return (
    <section
      id="free-audit"
      className="container mx-auto px-4 py-16 bg-lightBG dark:bg-darkBG transition-colors"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-lightText dark:text-darkText mb-6">
            Ready to stop being invisible online?
          </h2>

          <p className="text-lg sm:text-xl md:text-2xl text-lightTextMuted dark:text-darkTextMuted font-light">
            No pressure. I take a look at where you stand, show you what is possible, and you decide if it makes sense.
          </p>
        </div>

        <div className="rounded-2xl border border-lightBorder dark:border-darkBorder p-8 sm:p-10 bg-white/60 dark:bg-transparent">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-lightText dark:text-darkText mb-3">
                Here&apos;s what I&apos;ll analyze:
              </h3>
              <div className="text-base sm:text-lg text-lightTextMuted dark:text-darkTextMuted font-light space-y-2">
                <p>• Top issues holding you back from local search rankings</p>
                <p>• Quick wins for Houston local search visibility</p>
                <p>• What is stopping your visitors from calling or booking</p>
                <p>• AI search readiness (showing up when people ask AI assistants for recommendations)</p>
              </div>
            </div>

            <div className="pt-4 border-t border-lightBorder dark:border-darkBorder">
              <h3 className="text-xl sm:text-2xl font-semibold text-lightText dark:text-darkText mb-3">
                This is for you if:
              </h3>
              <div className="text-base sm:text-lg text-lightTextMuted dark:text-darkTextMuted font-light space-y-2">
                <p>• You do not have a website yet and do not know where to start</p>
                <p>• You have a website but customers are not finding you online</p>
                <p>• You want new customers to find you without chasing them down</p>
                <p>• You want to be consistent, not trendy</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col mx-auto mt-10 pt-8 border-t border-lightBorder dark:border-darkBorder">
            <button
              type="button"
              onClick={() =>
                openContactWithPrefill(
                  "I want to see what my website can look like. I need help with getting more..."
                )
              }
              className=" mx-auto  inline-flex items-center justify-center rounded-xl bg-lightButton hover:bg-lightButtonHover dark:bg-darkButton dark:hover:bg-darkButtonHover px-8 py-4 text-lg font-semibold text-lightBG dark:text-darkBG transition-colors"
            >
              See What Your Website Could Look Like
            </button>
            
          </div>
        </div>

      </div>
    </section>
  );
}
