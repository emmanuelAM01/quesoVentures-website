"use client";

import { openGetStarted } from "components/GetStarted";
import type { Placement } from "components/analytics";

/**
 * Get it: opens the Get Started panel at this tool (or bundle, "pack:key").
 * Every buy button on the site is this, so there is one way to order.
 * Without a key it opens the menu, which is the home's Get Started.
 */
export default function GetIt({
  orderKey,
  label = "Get it",
  from = "tools",
  tone = "light",
  size = "md",
}: {
  orderKey?: string;
  label?: string;
  from?: Placement;
  tone?: "light" | "dark";
  size?: "md" | "lg";
}) {
  const colors =
    tone === "dark"
      ? "bg-darkButton text-darkBG hover:bg-darkButtonHover"
      : "bg-lightButton text-white hover:bg-lightButtonHover dark:bg-darkButton dark:text-darkBG dark:hover:bg-darkButtonHover";
  return (
    <button
      type="button"
      onClick={() => openGetStarted(orderKey, from)}
      aria-haspopup="dialog"
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-full font-semibold transition-colors ${colors} ${
        size === "lg" ? "px-7 py-3.5 text-base" : "px-5 py-2.5 text-[15px]"
      }`}
    >
      {label}
    </button>
  );
}
