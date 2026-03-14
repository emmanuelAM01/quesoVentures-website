"use client";

export default function AskDirectlyButton() {
  return (
    <button
      type="button"
      onClick={() => {
        window.dispatchEvent(new CustomEvent("contact:prefill", {
          detail: { message: "I have a question about SEO/GEO for my Houston business:" }
        }));
        window.dispatchEvent(new CustomEvent("modal:open", {
          detail: { id: "contact-popup" }
        }));
      }}
      className="inline-flex items-center justify-center rounded-xl border border-lightBorder dark:border-darkBorder px-6 py-3 text-base font-semibold text-lightText dark:text-darkText hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
    >
      Ask Me Directly
    </button>
  );
}
