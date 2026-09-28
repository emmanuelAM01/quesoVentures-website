"use client";

import NicheCtaButton from "./NicheCtaButton";
import LavaLamp from "./LavaLamp";
import { houseGradient } from "./livery";

/**
 * Where the stamp's QR code lands: one screen over the blob field, set like
 * every hero on the site. The line about the stamp sits small above the title,
 * then the title, the house rule, the promise, and the one way forward.
 */
export default function FoundFlyer() {
  return (
    <section data-dark-section className="relative flex min-h-[100svh] items-end overflow-hidden">
      <LavaLamp scrim={0.45} />
      <div className="relative w-full">
        <div className="container mx-auto px-4 pb-16 pt-40 sm:pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className="mb-6 text-sm text-white/70">You found the stamp</p>
              <h1 className="text-5xl font-light leading-[1.02] tracking-tight text-balance text-white sm:text-6xl lg:text-7xl">
                I only stamp businesses I think I can help.
              </h1>
              <span aria-hidden className="mt-8 block h-1 w-24 rounded-full" style={{ backgroundImage: houseGradient() }} />
              <p className="mt-8 max-w-2xl text-xl font-light leading-relaxed text-white/85 sm:text-2xl">
                More leads from Google and AI search. No ad spend, no pressure.
              </p>
              <div className="mt-10">
                <NicheCtaButton
                  from="found_flyer"
                  variant="arrow"
                  tone="dark"
                  message="Hey! I found your QR code stamp and wanted to reach out."
                  label="Get Your Free Audit"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
