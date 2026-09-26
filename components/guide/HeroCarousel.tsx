"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Slide = { src: string; alt: string };

const INTERVAL_MS = 5000;
const SWIPE_PX = 40;

/**
 * The article header when there is more than one photo.
 *
 * The photos are stacked and crossfade. Laying them side by side in a scroll
 * track was tried first and showed a one pixel sliver of the next photo at
 * most widths, because the browser rounds fractional widths differently for
 * the clip and the track. Stacked photos cannot bleed into each other, and a
 * fade is the calmer motion for a header anyway.
 *
 * Every photo is an <img> in the server HTML, so crawlers and anyone without
 * JavaScript get all of them.
 *
 * It keeps turning while someone looks at it. It used to pause on hover and
 * on focus, and a reader's mouse resting on the header is exactly how people
 * look at a header, so in practice it never moved. Now it only pauses when
 * nobody can see it (scrolled away, background tab), and stops for good once
 * the reader takes over: a swipe, an arrow, a dot, or an arrow key.
 *
 * A crossfade is not motion across the screen, so it runs under reduced
 * motion too; only the transition itself is dropped there.
 */
export default function HeroCarousel({ slides, accent }: { slides: Slide[]; accent: string }) {
  const root = useRef<HTMLElement>(null);
  const startX = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [visible, setVisible] = useState(true);
  const count = slides.length;

  const show = (i: number) => setIndex(((i % count) + count) % count);
  const userGo = (i: number) => {
    setStopped(true);
    show(i);
  };

  useEffect(() => {
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (count < 2 || stopped || !visible) return;
    const t = window.setTimeout(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % count);
    }, INTERVAL_MS);
    return () => window.clearTimeout(t);
  }, [count, stopped, visible, index]);

  const control =
    "absolute top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur transition hover:bg-black/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white";

  return (
    <section
      ref={root}
      aria-roledescription="carousel"
      aria-label="Photos"
      tabIndex={0}
      className="group relative mt-8 aspect-[16/10] touch-pan-y overflow-hidden rounded-3xl bg-bandLight outline-none focus-visible:ring-2 focus-visible:ring-lightAccent dark:bg-bandDark dark:focus-visible:ring-darkAccent"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") userGo(index + 1);
        if (e.key === "ArrowLeft") userGo(index - 1);
      }}
      onPointerDown={(e) => {
        startX.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (startX.current === null) return;
        const dx = e.clientX - startX.current;
        startX.current = null;
        if (Math.abs(dx) >= SWIPE_PX) userGo(index + (dx < 0 ? 1 : -1));
      }}
    >
      {slides.map((s, i) => (
        <figure
          key={s.src}
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${count}`}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out motion-reduce:transition-none ${
            i === index ? "z-10 opacity-100" : "z-0 opacity-0"
          }`}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            // The next photo has to be decoded before it fades in, so the
            // rest load eagerly rather than waiting to become visible.
            loading={i === 0 ? undefined : "eager"}
            sizes="(min-width: 1024px) 720px, 100vw"
            draggable={false}
            className="select-none object-cover"
          />
        </figure>
      ))}

      <button
        type="button"
        aria-label="Previous photo"
        onClick={() => userGo(index - 1)}
        className={`${control} left-3 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Next photo"
        onClick={() => userGo(index + 1)}
        className={`${control} right-3 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <div className="absolute inset-x-0 bottom-4 z-20 flex justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Show photo ${i + 1} of ${count}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => userGo(i)}
            className={`h-2 rounded-full shadow transition-all duration-300 ${
              i === index ? "w-6 bg-white" : "w-2 bg-white/60 hover:bg-white/85"
            }`}
          />
        ))}
      </div>

      <span aria-hidden className="absolute inset-x-0 bottom-0 z-20 h-1.5" style={{ background: accent }} />
    </section>
  );
}
