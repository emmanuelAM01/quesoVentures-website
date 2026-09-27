"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ArrowMark, { arrowTone } from "components/ArrowMark";
import { PAINT } from "components/livery";

/**
 * The About page opens on Mugello, full screen.
 *
 * Emmanuel's favourite photograph, and not decoration: a pit wall with a
 * factory operation behind it is the whole argument of the page. Nothing is
 * laid over it but a scrim at the foot for the words, so the photograph is
 * the hero rather than the backdrop to one.
 *
 * On load the frame settles from a slight zoom while the words rise in after
 * it. On scroll the photograph drifts at a third of the page's speed and the
 * words fade as they leave, so the page lifts off the picture instead of
 * sliding over it. The scroll handler writes straight to the nodes from a rAF;
 * holding it in state would re-render React every frame to move a picture.
 * Reduced motion keeps the still frame and the plain fade.
 */
export default function AboutHero({
  title,
  sub,
  next,
}: {
  title: string;
  sub: string;
  /** The id the scroll cue takes you to. */
  next: string;
}) {
  const [ready, setReady] = useState(false);
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

  const rise = (delay: number) => ({
    className: `transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
      ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`,
    style: { transitionDelay: `${delay}ms` },
  });

  return (
    <section
      data-dark-section
      className="relative -mt-[76px] h-[100svh] min-h-[620px] overflow-hidden bg-[#0B0D12]"
    >
      <div ref={photo} className="absolute inset-0 will-change-transform">
        <div
          className={`absolute inset-0 transition-transform duration-[2600ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            ready ? "scale-100" : "scale-110"
          }`}
        >
          <Image
            src="/hero/aboutMotoGP.JPEG"
            alt="The pit straight at Mugello during a MotoGP session"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "50% 60%" }}
          />
        </div>
      </div>

      {/* The header's scrim at the top, the words' scrim at the foot. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-48"
        style={{ background: "linear-gradient(to bottom, rgba(8,10,14,0.55), transparent)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(8,10,14,0.94) 0%, rgba(8,10,14,0.62) 30%, rgba(8,10,14,0.12) 62%, transparent 80%)",
        }}
      />

      <div ref={copy} className="relative flex h-full items-end will-change-transform">
        <div className="container mx-auto px-4 pb-14 sm:pb-20">
          <div className="mx-auto flex max-w-6xl items-end justify-between gap-10">
            <div className="max-w-4xl" style={{ textShadow: "0 2px 30px rgba(0,0,0,0.45)" }}>
              <h1
                style={rise(250).style}
                className={`${rise(250).className} text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-light leading-[1.02] tracking-tight text-balance text-white`}
              >
                {title}
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
              <p
                style={rise(500).style}
                className={`${rise(500).className} mt-8 max-w-2xl text-xl sm:text-2xl font-light leading-relaxed text-white/85`}
              >
                {sub}
              </p>
            </div>

            <a
              href={`#${next}`}
              aria-label="Scroll to the next section"
              style={rise(900).style}
              className={`${rise(900).className} ${arrowTone("dark")} hidden sm:inline-flex`}
            >
              <ArrowMark tone="dark" direction="down" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
