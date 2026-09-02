"use client";

import React from "react";
import { trackCtaClick } from "./analytics";
import LavaLamp from "./LavaLamp";
import HeroBackdrop from "./HeroBackdrop";
import { SITE_COPY, type SiteCopy } from "./siteCopy";

/**
 * The close, on every page.
 *
 * One column, one axis. It used to be a split card: heading and button on the
 * left, a checklist on the right, and four different type sizes down the left
 * edge with the button hanging off none of them. Everything now stacks through
 * the centre, so the eye lands on the headline and falls straight to the
 * button.
 */
export default function FreeAuditSection({
  copy = SITE_COPY.audit,
  image,
}: {
  copy?: SiteCopy["audit"];
  /**
   * Optional photograph behind the close, with the blob field over it.
   *
   * Homepage only, on purpose. Every other page opens on a photograph of its
   * own place or trade, so its close stays the pure blob field; the homepage
   * opens on the blob field, so its close is the photograph. One of each per
   * page, in the opposite order.
   */
  image?: { src: string; alt: string };
}) {
  const open = () => {
    trackCtaClick("free_audit");
    window.dispatchEvent(
      new CustomEvent("contact:prefill", {
        detail: { message: copy.ctaPrefill, title: copy.cta },
      })
    );
    window.dispatchEvent(
      new CustomEvent("modal:open", { detail: { id: "contact-popup" } })
    );
  };

  return (
    <section
      id="free-audit"
      data-dark-section
      className="relative overflow-hidden scroll-mt-16"
    >
      {image ? (
        <HeroBackdrop {...image} scrim={0.58} position="center 72%" />
      ) : (
        <LavaLamp />
      )}

      <div className="relative container mx-auto px-4 py-28 sm:py-36">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#F5F7FA] text-balance">
            {copy.heading}
          </h2>
          <p className="mt-6 text-xl sm:text-2xl font-light leading-relaxed text-white/75">
            {copy.sub}
          </p>

          {/* Its own row. Both were inline, so the full-width button sat on
              the same line as the call link and covered it. */}
          <div className="mt-10">
            <button
              type="button"
              onClick={open}
              className="inline-flex w-full items-center justify-center rounded-xl bg-darkButton px-10 py-4 text-lg font-semibold text-darkBG transition-colors hover:bg-darkButtonHover sm:w-auto"
            >
              {copy.cta}
            </button>
          </div>

          {copy.reassurance && (
            <p className="mt-6 text-base font-light text-white/60">
              {copy.reassurance}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
