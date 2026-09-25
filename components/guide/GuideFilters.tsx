"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

type Option = { slug: string; label: string };

/**
 * City and industry filters for the guide home.
 *
 * A plain GET form, so the filtered view is a URL (/guide?city=houston&
 * category=food-trucks) that works without JavaScript and can be shared. With
 * JavaScript, changing a select navigates straight away and the button hides.
 */
export default function GuideFilters({
  cities,
  categories,
  city,
  category,
}: {
  cities: Option[];
  categories: Option[];
  city?: string;
  category?: string;
}) {
  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);

  const go = () => {
    if (!form.current) return;
    const data = new FormData(form.current);
    const qs = new URLSearchParams();
    for (const key of ["city", "category"]) {
      const v = data.get(key);
      if (typeof v === "string" && v) qs.set(key, v);
    }
    const s = qs.toString();
    router.push(s ? `/guide?${s}` : "/guide", { scroll: false });
  };

  const select =
    "w-full appearance-none rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-base text-white focus:outline-none focus:ring-2 focus:ring-darkAccent [&>option]:text-[#101216]";

  return (
    <form ref={form} action="/guide" method="get" className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-2">
      <label className="block">
        <span className="mb-2 block text-sm text-white/70">City</span>
        <select name="city" defaultValue={city ?? ""} onChange={go} className={select}>
          <option value="">All cities</option>
          {cities.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="mb-2 block text-sm text-white/70">Industry</span>
        <select name="category" defaultValue={category ?? ""} onChange={go} className={select}>
          <option value="">All industries</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label}
            </option>
          ))}
        </select>
      </label>
      <noscript>
        <button type="submit" className="rounded-2xl bg-darkButton px-5 py-3 font-semibold text-[#101216]">
          Filter
        </button>
      </noscript>
    </form>
  );
}
