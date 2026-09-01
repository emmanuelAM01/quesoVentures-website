"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import LavaLamp from "components/LavaLamp";

/**
 * The photograph behind a hero, with the blob field washing over it.
 *
 * Parallax is measured against this section's own position rather than raw
 * scrollY, so it works for a closing block halfway down a page as well as for a
 * hero at the top. Progress runs 0 when the section's top reaches the bottom of
 * the viewport to 1 when its bottom leaves the top; the image is offset either
 * side of centre, and scaled 1.18 so the shift never uncovers an edge.
 *
 * Deliberately small and deliberately conditional: off below 1024px, because a
 * transform running against touch scroll on a phone is the difference between
 * feeling expensive and stuttering, and off under prefers-reduced-motion.
 *
 * The transform is written straight onto the node from a rAF-throttled scroll
 * handler rather than held in state; re-rendering React sixty times a second to
 * move a background is how a nice effect becomes a slow page.
 */
export default function HeroBackdrop({
  src,
  alt,
  scrim = 0.5,
  /**
   * Where to hold the crop. A wide short band throws away most of a 3:2 frame,
   * so a photograph whose subject is not dead centre needs saying which part
   * matters. The Verdun path is in the lower third.
   */
  position = "center",
}: {
  src: string;
  alt: string;
  scrim?: number;
  position?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const box = host.current;
    if (!el || !box) return;

    const allowed =
      window.matchMedia("(min-width: 1024px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!allowed) return;

    /** Total travel, well inside the 18% of headroom the scale buys. */
    const SHIFT = 90;

    let raf = 0;
    const update = () => {
      const r = box.getBoundingClientRect();
      // Off screen entirely: nothing to move.
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const progress =
        (window.innerHeight - r.top) / (window.innerHeight + r.height);
      el.style.transform = `translate3d(0, ${(progress - 0.5) * SHIFT}px, 0)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={host} aria-hidden className="absolute inset-0 overflow-hidden">
      <div ref={ref} className="absolute inset-0 scale-[1.18] will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          priority
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </div>
      <LavaLamp overlay scrim={scrim} />
    </div>
  );
}
