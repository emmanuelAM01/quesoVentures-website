"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ArrowMark, { arrowTone } from "components/ArrowMark";
import LavaLamp from "components/LavaLamp";
import NicheCtaButton from "components/NicheCtaButton";
import { PAINT } from "components/livery";
import type { Placement } from "components/analytics";

/**
 * Every hero on the site except the homepage's, after the About page.
 *
 * Full screen, the photograph edge to edge with nothing laid over it but a
 * scrim at the foot for the words. The words sit bottom left: the title in a
 * large light weight, the house ramp as a short rule under it, then the
 * subtitle. The rule is the house signature; it separates the title from the
 * subtitle on every hero so the pages read as one book.
 *
 * On load the frame settles from a slight zoom while the words rise in after
 * it. On scroll the photograph drifts at a third of the page's speed and the
 * words fade as they leave. The scroll handler writes straight to the nodes
 * from a rAF; holding it in state would re-render React every frame to move a
 * picture. Reduced motion keeps the still frame and the plain fade.
 *
 * With no photograph the ground is the blob field, which is the house's own
 * moving light rather than a stock image standing in for one.
 */
/** How long each photograph holds before the next fades in. */
const SLIDE_MS = 6000;

export default function PageHero({
  headline,
  sub,
  image,
  slides,
  prefill,
  ctaLabel = "Get My Free Report",
  from = "hero",
  note,
  above,
  aside,
  children,
  stackOnPhone = false,
}: {
  headline: string;
  sub?: string;
  /** Full bleed photograph. Without one the ground is the blob field. */
  image?: { src: string; alt: string; position?: string };
  /**
   * Several photographs instead of one: they crossfade slowly on their own,
   * with dots beside the scroll cue to pick one. Takes precedence over `image`.
   */
  slides?: { src: string; alt: string; position?: string }[];
  /** The contact form's opening line. With it, the hero carries the CTA. */
  prefill?: string;
  ctaLabel?: string;
  from?: Placement;
  /** Small line under the CTA. */
  note?: string;
  /** Above the title: a breadcrumb, say. Kept small and quiet. */
  above?: React.ReactNode;
  /** Beside the words on large screens, bottom right, in place of the scroll cue. */
  aside?: React.ReactNode;
  /** Under the subtitle, for controls that belong to the hero (filters, search). */
  children?: React.ReactNode;
  /**
   * On a phone, the photograph on top and the words under it rather than
   * over it. For a photograph whose subject sits where the words would land
   * on a tall screen (the About page's bikes on the Mugello straight).
   * From lg up the hero is the usual full bleed.
   */
  stackOnPhone?: boolean;
}) {
  const [ready, setReady] = useState(false);
  const photos = slides?.length ? slides : image ? [image] : [];
  const [at, setAt] = useState(0);
  /** Bumped by a click on a dot, so the slideshow waits a full turn after it. */
  const [picked, setPicked] = useState(0);
  const section = useRef<HTMLElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raf0 = requestAnimationFrame(() => setReady(true));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => cancelAnimationFrame(raf0);
    }

    let raf = 0;
    const update = () => {
      const y = window.scrollY;
      const h = window.innerHeight;
      if (y > h) return;
      if (photo.current) photo.current.style.transform = `translate3d(0, ${y * 0.33}px, 0)`;
      if (copy.current) {
        copy.current.style.opacity = String(Math.max(0, 1 - y / (h * 0.6)));
        copy.current.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf0);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // The slideshow: a slow turn, still under reduced motion.
  useEffect(() => {
    if (photos.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setAt((a) => (a + 1) % photos.length), SLIDE_MS);
    return () => clearInterval(t);
  }, [photos.length, picked]);

  const rise = (delay: number) => ({
    className: `transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
      ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`,
    style: { transitionDelay: `${delay}ms` },
  });

  /** The cue goes to whatever follows the hero, wherever that is. */
  const onward = () => {
    const el = section.current;
    if (!el) return;
    window.scrollTo({ top: el.offsetTop + el.offsetHeight - 76, behavior: "smooth" });
  };

  return (
    <section
      ref={section}
      data-dark-section
      className={`relative -mt-[76px] flex min-h-[100svh] overflow-hidden bg-[#0B0D12] ${
        stackOnPhone ? "flex-col lg:flex-row lg:items-end" : "items-end"
      }`}
    >
      {photos.length ? (
        <div
          ref={photo}
          className={`will-change-transform ${
            stackOnPhone ? "relative h-[58svh] min-h-[360px] w-full overflow-hidden lg:absolute lg:inset-0 lg:h-auto" : "absolute inset-0"
          }`}
        >
          <div
            className={`absolute inset-0 transition-transform duration-[2600ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              ready ? "scale-100" : "scale-110"
            }`}
          >
            {photos.map((p, k) => (
              <div
                key={p.src}
                aria-hidden={k !== at}
                className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out motion-reduce:transition-none ${
                  k === at ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  priority={k === 0}
                  sizes="100vw"
                  className="object-cover"
                  style={{ objectPosition: p.position ?? "center" }}
                />
              </div>
            ))}
          </div>
          {stackOnPhone && (
            // Stacked, the photograph only needs to fade into the ground under it.
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-28 lg:hidden"
              style={{ background: "linear-gradient(to bottom, transparent, #0B0D12)" }}
            />
          )}
        </div>
      ) : (
        <LavaLamp scrim={0.45} />
      )}

      {/* The header's scrim at the top, the words' scrim at the foot. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-48"
        style={{ background: "linear-gradient(to bottom, rgba(8,10,14,0.55), transparent)" }}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 ${stackOnPhone ? "hidden lg:block" : ""}`}
        style={{
          background:
            "linear-gradient(to top, rgba(8,10,14,0.94) 0%, rgba(8,10,14,0.62) 30%, rgba(8,10,14,0.12) 62%, transparent 80%)",
        }}
      />


      {/* At least a screen; taller only when the words and controls need it. */}
      <div ref={copy} className="relative w-full will-change-transform">
        <div className={`container mx-auto px-4 pb-14 sm:pb-20 ${stackOnPhone ? "pt-6 lg:pt-40" : "pt-40"}`}>
          <div className="mx-auto flex max-w-6xl items-end justify-between gap-10">
            <div className="max-w-4xl" style={{ textShadow: "0 2px 30px rgba(0,0,0,0.45)" }}>
              {above && (
                <div style={rise(150).style} className={`${rise(150).className} mb-6 text-sm text-white/70`}>
                  {above}
                </div>
              )}
              <h1
                style={rise(250).style}
                className={`${rise(250).className} text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-light leading-[1.02] tracking-tight text-balance text-white`}
              >
                {headline}
              </h1>
              <span
                aria-hidden
                className="mt-8 block h-1 rounded-full transition-[width] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                style={{
                  width: ready ? "6rem" : "0rem",
                  transitionDelay: "650ms",
                  backgroundImage: `linear-gradient(to right, ${PAINT.rossoCorsa.hex}, ${PAINT.gialloOrion.hex}, ${PAINT.gialloModena.hex})`,
                }}
              />
              {sub && (
                <p
                  style={rise(500).style}
                  className={`${rise(500).className} mt-8 max-w-2xl text-xl sm:text-2xl font-light leading-relaxed text-white/85`}
                >
                  {sub}
                </p>
              )}
              {prefill && (
                <div style={rise(700).style} className={`${rise(700).className} mt-10`}>
                  <NicheCtaButton
                    from={from}
                    variant="arrow"
                    tone="dark"
                    message={prefill}
                    label={ctaLabel}
                  />
                </div>
              )}
              {note && (
                <p style={rise(800).style} className={`${rise(800).className} mt-6 text-base font-light text-white/60`}>
                  {note}
                </p>
              )}
              {children && (
                <div style={rise(700).style} className={`${rise(700).className} mt-10`}>
                  {children}
                </div>
              )}
            </div>

            {aside ? (
              <div style={rise(900).style} className={`${rise(900).className} hidden w-[22rem] flex-shrink-0 lg:block`}>
                {aside}
              </div>
            ) : (
              <div style={rise(900).style} className={`${rise(900).className} hidden items-center gap-8 sm:flex`}>
                {photos.length > 1 && (
                  <div className="flex items-center gap-2.5">
                    {photos.map((p, k) => (
                      <button
                        key={p.src}
                        type="button"
                        aria-label={`Photo ${k + 1} of ${photos.length}`}
                        aria-current={k === at}
                        onClick={() => {
                          setAt(k);
                          setPicked((n) => n + 1);
                        }}
                        className="group grid h-6 place-items-center focus:outline-none"
                      >
                        <span
                          className={`block h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(0,0,0,0.45)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            k === at ? "w-6" : "w-1.5 opacity-50 group-hover:w-2.5 group-hover:opacity-90"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                )}
                <button
                  type="button"
                  onClick={onward}
                  aria-label="Scroll to the next section"
                  className={arrowTone("dark")}
                >
                  <ArrowMark tone="dark" direction="down" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
