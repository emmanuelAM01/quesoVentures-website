"use client";

export default function FoundFlyer() {
  const openContact = () => {
    window.dispatchEvent(
      new CustomEvent("modal:open", { detail: { id: "contact-popup" } })
    );
    window.dispatchEvent(
      new CustomEvent("contact:prefill", {
        detail: {
          title: "Let's Talk",
          message: "Hey! I found your QR code stamp and wanted to reach out.",
        },
      })
    );
  };

  return (
    <section className="flex flex-col items-center justify-center text-center px-4 sm:px-8 min-h-screen">
      <p className="text-2xl font-semibold tracking-widest uppercase text-lightTextMuted dark:text-darkTextMuted mb-6">
        You found the stamp
      </p>

      <h1 className="font-sans text-xl sm:text-2xl md:text-4xl tracking-tight text-lightText dark:text-darkText mb-4 md:whitespace-nowrap">
        I only stamp businesses I think I can help.
      </h1>

      <p className="text-base text-lightTextMuted dark:text-darkTextMuted mb-8 font-light ">
        More leads from Google and AI search. No ad spend, no pressure.
      </p>

      <button
        onClick={openContact}
        className="bg-lightButton hover:bg-lightButtonHover dark:bg-darkButton dark:hover:bg-darkButtonHover text-lightBG dark:text-darkBG px-6 py-3 rounded-xl text-base font-semibold transition-colors"
      >
        Get Your Free Audit
      </button>
    </section>
  );
}