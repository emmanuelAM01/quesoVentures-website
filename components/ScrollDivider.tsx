"use client";

import { useEffect, useRef, useState } from "react";

// Full width divider bar that shifts from Queso red to Queso yellow
// and grows as it moves up the screen while you scroll.
export default function ScrollDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const progress = 1 - Math.min(Math.max(rect.top / vh, 0), 1);
      setT(progress);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // #C4161C (196,22,28) -> #FFD100 (255,209,0)
  const mix = (a: number, b: number) => Math.round(a + (b - a) * t);
  const color = `rgb(${mix(196, 255)}, ${mix(22, 209)}, ${mix(28, 0)})`;

  return (
    <div ref={ref} aria-hidden="true" className="w-full overflow-hidden py-2">
      <div
        className="h-[2px] w-full"
        style={{
          background: `linear-gradient(to right, transparent, ${color}, transparent)`,
          transform: `scaleX(${0.35 + 0.65 * t})`,
          opacity: 0.25 + 0.6 * t,
          transition: "transform 0.1s linear, opacity 0.1s linear",
        }}
      />
    </div>
  );
}
