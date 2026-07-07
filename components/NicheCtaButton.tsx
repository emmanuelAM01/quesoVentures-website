"use client";

interface Props {
  message: string;
  label: string;
  variant?: "primary" | "secondary";
}

export default function NicheCtaButton({ message, label, variant = "primary" }: Props) {
  const open = () => {
    window.dispatchEvent(new CustomEvent("contact:prefill", { detail: { message } }));
    window.dispatchEvent(new CustomEvent("modal:open", { detail: { id: "contact-popup" } }));
  };

  if (variant === "secondary") {
    return (
      <button
        type="button"
        onClick={open}
        className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-lightBorder dark:border-darkBorder px-5 py-3 sm:px-6 text-base font-semibold text-lightText dark:text-darkText hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      >
        {label}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={open}
      className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-lightButton hover:bg-lightButtonHover dark:bg-darkButton dark:hover:bg-darkButtonHover px-6 py-3.5 text-base sm:px-8 sm:py-4 sm:text-lg font-semibold text-lightBG dark:text-darkBG transition-colors"
    >
      {label}
    </button>
  );
}
