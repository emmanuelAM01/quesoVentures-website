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
            Free Website Growth Audit for Houston Businesses
          </h2>

          <p className="text-lg sm:text-xl md:text-2xl text-lightTextMuted dark:text-darkTextMuted font-light">
            Book a call and I'll audit your website and Google presence, then help you fix what's stopping you from getting more customers.
          </p>
        </div>

        <div className="rounded-2xl border border-lightBorder dark:border-darkBorder p-8 sm:p-10 bg-white/60 dark:bg-transparent">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-lightText dark:text-darkText mb-3">
                Here's what I'll analyze:
              </h3>
              <div className="text-base sm:text-lg text-lightTextMuted dark:text-darkTextMuted font-light space-y-2">
                <p>• Top SEO issues holding you back from local search rankings</p>
                <p>• Quick wins for Houston local search visibility</p>
                <p>• Conversion fixes to turn your traffic into actual calls and bookings</p>
                <p>• AI search readiness (Google's GEO and the future of search)</p>
                <p>• A prioritized 30-day plan you can actually execute</p>
              </div>
            </div>

            <div className="pt-4 border-t border-lightBorder dark:border-darkBorder">
              <h3 className="text-xl sm:text-2xl font-semibold text-lightText dark:text-darkText mb-3">
                This is for you if:
              </h3>
              <div className="text-base sm:text-lg text-lightTextMuted dark:text-darkTextMuted font-light space-y-2">
                <p>• You're a service business in Houston (med spas, clinics, law firms, contractors, local brands, cafes, restaurants, and concierge services)</p>
                <p>• Your site gets traffic but not enough leads</p>
                <p>• You're tired of relying on ads to stay visible</p>
                <p>• You know you need to show up in AI search but don't know where to start</p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-lightBorder dark:border-darkBorder">
            <button
              type="button"
              onClick={() =>
                openContactWithPrefill(
                  "I want a free SEO + GEO audit. My business is in Houston. Here is my website URL and what I want more of (calls, bookings, leads):"
                )
              }
              className="w-full inline-flex items-center justify-center rounded-xl bg-lightButton hover:bg-lightButtonHover dark:bg-darkButton dark:hover:bg-darkButtonHover px-8 py-4 text-lg font-semibold text-lightBG dark:text-darkBG transition-colors"
            >
              Request Free Audit
            </button>

            <p className="mt-4 text-center text-sm sm:text-base text-lightTextMuted dark:text-darkTextMuted font-light">
              No pressure. If we're a fit, I'll tell you the next steps. If not, you still get valuable insights.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() =>
              openContactWithPrefill(
                "I have a question about SEO/GEO for my Houston business:"
              )
            }
            className="inline-flex items-center justify-center rounded-xl border border-lightBorder dark:border-darkBorder px-6 py-3 text-base font-semibold text-lightText dark:text-darkText hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            Ask a Question First
          </button>
        </div>
      </div>
    </section>
  );
}