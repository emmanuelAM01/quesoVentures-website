"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import LavaLamp from "./LavaLamp";
import NicheCtaButton from "./NicheCtaButton";
import { houseGradient } from "./livery";
import { SITE_COPY, type SiteCopy } from "./siteCopy";

/**
 * The close, on every page: the last chapter of the book.
 *
 * Full screen, like the hero it answers, with the words at the foot on the
 * left: the heading, the house rule, the line under it, and the one way
 * forward. It used to be a centred band with a yellow slab of a button; now it
 * speaks the same way the About page does, down to the circled arrow.
 *
 * As it arrives the picture settles from a slight zoom and the words rise in.
 */
export default function FreeAuditSection({
  copy = SITE_COPY.audit,
  image,
}: {
  /** The small line under the button is optional; the site default has none. */
  copy?: SiteCopy["audit"] & { reassurance?: string };
  /**
   * Optional photograph behind the close. Homepage only, on purpose: every
   * other page opens on a photograph of its own place or trade, so its close
   * stays the blob field; the homepage opens on the blob field, so its close
   * is the photograph. One of each per page, in the opposite order.
   */
  image?: { src: string; alt: string };
}) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setSeen(true);
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const rise = (delay: number) => ({
    className: `transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
      seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`,
    style: { transitionDelay: `${delay}ms` },
  });

  return (
    <section
      ref={ref}
      id="free-audit"
      data-dark-section
      className="relative flex min-h-[90svh] scroll-mt-16 items-end overflow-hidden bg-[#0B0D12]"
    >
      {image ? (
        <div
          className={`absolute inset-0 transition-transform duration-[2400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            seen ? "scale-100" : "scale-110"
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center 72%" }}
          />
        </div>
      ) : (
        <LavaLamp scrim={0.45} />
      )}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(8,10,14,0.92) 0%, rgba(8,10,14,0.6) 32%, rgba(8,10,14,0.12) 65%, rgba(8,10,14,0.2) 100%)",
        }}
      />

      <div className="relative w-full">
        <div className="container mx-auto px-4 pb-20 pt-40 sm:pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl" style={{ textShadow: "0 2px 30px rgba(0,0,0,0.45)" }}>
              <h2
                style={rise(150).style}
                className={`${rise(150).className} text-5xl sm:text-6xl xl:text-7xl font-light leading-[1.02] tracking-tight text-balance text-white`}
              >
                {copy.heading}
              </h2>
              <span
                aria-hidden
                className="mt-8 block h-1 rounded-full transition-[width] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                style={{ width: seen ? "6rem" : "0rem", transitionDelay: "450ms", backgroundImage: houseGradient() }}
              />
              <p
                style={rise(400).style}
                className={`${rise(400).className} mt-8 max-w-2xl text-xl sm:text-2xl font-light leading-relaxed text-white/85`}
              >
                {copy.sub}
              </p>
              <div style={rise(600).style} className={`${rise(600).className} mt-10`}>
                <NicheCtaButton
                  from="free_audit"
                  variant="arrow"
                  tone="dark"
                  message={copy.ctaPrefill}
                  label={copy.cta}
                />
              </div>
              {copy.reassurance && (
                <p style={rise(700).style} className={`${rise(700).className} mt-6 text-base font-light text-white/60`}>
                  {copy.reassurance}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
