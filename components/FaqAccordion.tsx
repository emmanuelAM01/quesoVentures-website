"use client";
import { useState } from "react";

interface FaqItem {
  q: string;
  a: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-lightBorder dark:divide-darkBorder border border-lightBorder dark:border-darkBorder rounded-2xl overflow-hidden">
      {items.map((item, i) => (
        <div key={i} className="bg-white dark:bg-[#151618]">
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-5 text-left"
          >
            <span className="text-base font-semibold text-lightText dark:text-darkText pr-4">
              {item.q}
            </span>
            <span className="text-lightAccent dark:text-darkAccent shrink-0 text-xl font-light">
              {openIndex === i ? "−" : "+"}
            </span>
          </button>
          {openIndex === i && (
            <div className="px-6 pb-5">
              <p className="text-sm font-light text-lightTextMuted dark:text-darkTextMuted leading-relaxed">
                {item.a}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
