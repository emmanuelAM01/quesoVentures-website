"use client";

import { trackCtaClick, type Placement } from "./analytics";

/**
 * No call sites at the moment — the free-report ask is carried by FreeAudit.
 * Kept wired to the funnel so that if it is dropped back onto a page it counts
 * from the first click rather than going quietly missing the way it did before.
 */
export default function AskDirectlyButton({ from = "hero" }: { from?: Placement }) {
  return (
    <button
      type="button"
      onClick={() => {
        trackCtaClick(from);
        window.dispatchEvent(new CustomEvent("contact:prefill", {
          detail: { message: "I want to see what my website can look like. I need help with getting more..." }
        }));
        window.dispatchEvent(new CustomEvent("modal:open", {
          detail: { id: "contact-popup" }
        }));
      }}
      className="inline-flex items-center justify-center rounded-xl border border-lightBorder dark:border-darkBorder px-6 py-3 text-base font-semibold text-lightText dark:text-darkText hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
    >
      Get My Free Report
    </button>
  );
}
