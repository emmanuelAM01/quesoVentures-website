"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type WebsiteSizeId = "landing" | "standard" | "large";

type FeatureId = "contact" | "booking" | "payments" | "custom";

const WEBSITE_SIZES: Array<{
  id: WebsiteSizeId;
  title: string;
  subtitle: string;
  range: { low: number; high: number };
}> = [
  {
    id: "landing",
    title: "Landing page",
    subtitle: "One strong page that explains what you do and gets people to contact you",
    range: { low: 1000, high: 1500 },
  },
  {
    id: "standard",
    title: "Standard website",
    subtitle: "3 to 5 pages. Home, About, Services, Contact, plus one more if needed",
    range: { low: 1800, high: 3200 },
  },
  {
    id: "large",
    title: "Large website",
    subtitle: "6 to 10 pages for more services, locations, or content",
    range: { low: 3200, high: 6500 },
  },
];

const FEATURES: Array<{
  id: FeatureId;
  title: string;
  subtitle: string;
  add: { low: number; high: number };
}> = [
  {
    id: "contact",
    title: "Contact form",
    subtitle: "Let customers reach you without calling",
    add: { low: 150, high: 300 },
  },
  {
    id: "booking",
    title: "Booking or scheduling",
    subtitle: "Let customers book appointments online",
    add: { low: 300, high: 900 },
  },
  {
    id: "payments",
    title: "Payments or ecommerce",
    subtitle: "Accept payments, sell products, or take deposits",
    add: { low: 600, high: 2200 },
  },
  {
    id: "custom",
    title: "Custom functionality",
    subtitle: "Anything beyond a normal website, like portals or complex tools",
    add: { low: 1200, high: 6000 },
  },
];

function money(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default function PriceEstimator() {
  const [sizeId, setSizeId] = useState<WebsiteSizeId>("landing");
  const [features, setFeatures] = useState<Record<FeatureId, boolean>>({
    contact: false,
    booking: false,
    payments: false,
    custom: false,
  });

  const size = WEBSITE_SIZES.find((s) => s.id === sizeId)!;

  const totals = useMemo(() => {
    let low = size.range.low;
    let high = size.range.high;

    for (const f of FEATURES) {
      if (features[f.id]) {
        low += f.add.low;
        high += f.add.high;
      }
    }

    return { low, high };
  }, [sizeId, features]);

  const selectedFeatures = FEATURES.filter((f) => features[f.id]);

  return (
    <section id="pricing-estimator" className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-lightText dark:text-darkText">
            Quick website estimate
          </h2>
          <Link href="#contact-popup">
            <p className="mt-4 text-lg font-light text-lightTextMuted dark:text-darkTextMuted">
              Contact for more info
            </p>
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-lightBorder dark:border-darkBorder bg-white/70 dark:bg-white/5 backdrop-blur p-6">
            <h3 className="text-xl font-semibold text-lightText dark:text-darkText">
              1.) {''} Pick your website size
            </h3>

            <div className="mt-4 grid grid-cols-1 gap-3">
              {WEBSITE_SIZES.map((opt) => {
                const selected = opt.id === sizeId;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSizeId(opt.id)}
                    className={cx(
                      "text-left rounded-xl border p-4 transition-colors",
                      "bg-white dark:bg-transparent",
                      selected
                        ? "border-lightButton dark:border-darkButton"
                        : "border-lightBorder dark:border-darkBorder hover:border-lightText/20 dark:hover:border-darkText/20"
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-base font-semibold text-lightText dark:text-darkText">
                          {opt.title}
                        </div>
                        <div className="mt-1 text-sm font-light text-lightTextMuted dark:text-darkTextMuted">
                          {opt.subtitle}
                        </div>
                      </div>
                      <div className="shrink-0 text-sm font-semibold text-lightText dark:text-darkText">
                        {money(opt.range.low)} to {money(opt.range.high)}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <h3 className="mt-8 text-xl font-semibold text-lightText dark:text-darkText">
              2.){''} Add optional features
            </h3>

            <div className="mt-4 grid grid-cols-1 gap-3">
              {FEATURES.map((f) => {
                const checked = features[f.id];
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFeatures((prev) => ({ ...prev, [f.id]: !prev[f.id] }))}
                    className={cx(
                      "text-left rounded-xl border p-4 transition-colors",
                      "bg-white dark:bg-transparent",
                      checked
                        ? "border-lightButton dark:border-darkButton"
                        : "border-lightBorder dark:border-darkBorder hover:border-lightText/20 dark:hover:border-darkText/20"
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-base font-semibold text-lightText dark:text-darkText">
                          {f.title}
                        </div>
                        <div className="mt-1 text-sm font-light text-lightTextMuted dark:text-darkTextMuted">
                          {f.subtitle}
                        </div>
                      </div>
                      <div className="shrink-0 text-sm font-semibold text-lightText dark:text-darkText">
                        + {money(f.add.low)} to {money(f.add.high)}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-lightBorder dark:border-darkBorder bg-white/70 dark:bg-white/5 backdrop-blur p-6">
            <h3 className="text-xl font-semibold text-lightText dark:text-darkText">
              Your estimate
            </h3>

            <div className="mt-4 rounded-xl border border-lightBorder dark:border-darkBorder bg-white dark:bg-transparent p-5">
              <div className="text-sm font-medium text-lightTextMuted dark:text-darkTextMuted">
                Most projects like this cost
              </div>

              <div className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-lightText dark:text-darkText">
                {money(totals.low)} to {money(totals.high)}
              </div>

              <div className="mt-3 text-sm font-light text-lightTextMuted dark:text-darkTextMuted">
                Final pricing depends on your content, design style, and timeline.
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <button
  type="button"
  onClick={() => {
    const summary = `Website estimate:
Size: ${size.title}
Extras: ${selectedFeatures.length ? selectedFeatures.map(f => f.title).join(", ") : "None"}
Range: ${money(totals.low)} to ${money(totals.high)}
`;

    window.dispatchEvent(new CustomEvent("contact:prefill", { detail: { message: summary } }));
    window.dispatchEvent(new CustomEvent("modal:open", { detail: { id: "contact-popup" } }));
  }}
                className="inline-flex items-center justify-center rounded-xl bg-lightButton hover:bg-lightButtonHover dark:bg-darkButton dark:hover:darkButtonHover px-6 py-3 text-base font-semibold text-lightBG dark:text-darkBG transition-colors"
              >
                Get a website quote
              </button>
              <p className="text-xs text-center">
                Monthly fees may apply
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
