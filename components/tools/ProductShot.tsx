"use client";

import { useEffect, useRef, useState } from "react";
import { STUDIO_DEMOS } from "components/StudiosDemos";
import type { Product } from "components/catalog";

/**
 * A tool, shot like catalogue product photography.
 *
 * The demo runs inside a glossy device: a dark screen in a brushed bezel with
 * a sheen across the top, standing on a floor of its own colour with a soft
 * reflection under it. That is the early 2000s catalogue the Tools page is
 * dressed as (chrome, gloss, a product lit on a seamless), kept to the parts
 * that still look expensive and none of the parts that look like a ringtone
 * ad.
 *
 * The demo only runs while the shot is on screen: a catalogue of fifteen
 * looping animations would be fifteen repaints a frame for one thing anybody
 * is looking at.
 */

function useInView<T extends Element>(ref: React.RefObject<T | null>) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return setSeen(true);
    const io = new IntersectionObserver(([entry]) => setSeen(entry.isIntersecting), { rootMargin: "-8% 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return seen;
}

export default function ProductShot({
  product,
  size = "md",
  className = "",
  running = true,
}: {
  product: Pick<Product, "demo" | "accent" | "name">;
  /** "lg" is a cover or a tool page; "md" a catalogue item; "sm" a related item. */
  size?: "sm" | "md" | "lg";
  className?: string;
  /** False holds the demo still even on screen, for shots stacked on top of each other. */
  running?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const live = useInView(ref);
  const Demo = STUDIO_DEMOS[product.demo];
  const width = size === "lg" ? "max-w-md" : size === "sm" ? "max-w-[15rem]" : "max-w-sm";

  return (
    <div ref={ref} className={`relative flex flex-col items-center ${className}`}>
      {/* The floor: the product's own colour, lit from above. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-6 top-1/4 -z-0"
        style={{ background: `radial-gradient(ellipse 55% 45% at 50% 78%, ${product.accent}38, transparent 70%)` }}
      />

      <div className={`group/shot relative z-10 w-full ${width} transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1`}>
        {/* The bezel: brushed, with a lit top edge. */}
        <div
          className="relative rounded-[1.6rem] p-[7px]"
          style={{
            background: "linear-gradient(160deg, #3A404C 0%, #161A21 38%, #0C0E13 62%, #2A2F3A 100%)",
            boxShadow: `0 1px 0 rgba(255,255,255,0.18) inset, 0 40px 80px -36px ${product.accent}99, 0 18px 40px -24px rgba(0,0,0,0.6)`,
          }}
        >
          <div className="relative overflow-hidden rounded-[1.2rem] bg-[#07090D] p-3.5 ring-1 ring-white/[0.06]">
            <Demo on={live && running} />
            {/* The sheen across the glass. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(172deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 26%, transparent 27%, transparent 100%)",
              }}
            />
          </div>
        </div>

        {/* The reflection: the device's colour, mirrored and fading into the floor. */}
        <div
          aria-hidden
          className="pointer-events-none mx-auto mt-2 h-10 w-[88%] rounded-[50%] opacity-70 blur-xl"
          style={{ background: `radial-gradient(ellipse at center, ${product.accent}55, transparent 70%)` }}
        />
      </div>
    </div>
  );
}
