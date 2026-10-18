"use client";

import { useState } from "react";
import { clientLabel, type Product } from "components/catalog";

/**
 * The price, as a catalogue sticker: one number, tilted a few degrees, that
 * straightens when you look at it.
 *
 * One number on purpose. Two stacked prices make the reader do subtraction to
 * find their own; the Queso client price sits behind the asterisk, there for
 * anyone who wants it and out of the way of everyone else.
 */
export default function PriceTag({
  product,
  tone = "light",
  size = "md",
}: {
  product: Pick<Product, "list" | "client" | "clientNote" | "accent">;
  tone?: "light" | "dark";
  size?: "md" | "lg";
}) {
  const [note, setNote] = useState(false);
  if (product.list == null) return null;
  const client = clientLabel(product);

  const ring =
    tone === "dark"
      ? "bg-white/[0.06] text-white ring-white/20"
      : "bg-panelLight text-lightText ring-lightText/15 dark:bg-white/[0.06] dark:text-darkText dark:ring-white/20";

  return (
    <span className="relative inline-flex items-center">
      <span
        className={`inline-flex -rotate-2 items-baseline gap-1 rounded-full px-4 py-1.5 ring-1 transition-transform duration-500 hover:rotate-0 ${ring} ${
          size === "lg" ? "text-3xl" : "text-xl"
        }`}
        style={{ boxShadow: `0 6px 18px -10px ${product.accent}aa` }}
      >
        <span className="font-light tabular-nums">${product.list}</span>
        <span className={`font-light opacity-60 ${size === "lg" ? "text-base" : "text-sm"}`}>/ month</span>
        {client && (
          <button
            type="button"
            onClick={() => setNote((n) => !n)}
            onBlur={() => setNote(false)}
            onMouseEnter={() => setNote(true)}
            onMouseLeave={() => setNote(false)}
            aria-label={client}
            className="ml-0.5 self-start text-sm opacity-60 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none"
          >
            *
          </button>
        )}
      </span>
      {client && (
        <span
          role="status"
          className={`absolute left-0 top-full z-20 mt-2 whitespace-nowrap rounded-xl px-3 py-2 text-sm shadow-lg transition-all duration-200 ${
            tone === "dark" ? "bg-white text-[#0F1A2A]" : "bg-inkLight text-white dark:bg-white dark:text-[#0F1A2A]"
          } ${note ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"}`}
        >
          {client}
        </span>
      )}
    </span>
  );
}
