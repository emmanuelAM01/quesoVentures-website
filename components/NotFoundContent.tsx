"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "components/Footer";
import NicheCtaButton from "components/NicheCtaButton";
import LavaLamp from "components/LavaLamp";
import ArrowMark, { arrowTone } from "components/ArrowMark";
import { houseGradient } from "components/livery";

const BORING_MS = 2000;

export default function NotFoundContent() {
  const [phase, setPhase] = useState<"boring" | "fun">("boring");

  useEffect(() => {
    const t = setTimeout(() => setPhase("fun"), BORING_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-lightBG dark:bg-darkBG">
      <main>
        <section data-dark-section className="relative -mt-[76px] flex min-h-[100svh] items-end overflow-hidden">
          <LavaLamp scrim={0.45} />
          <div
            className={`relative w-full transition-all duration-700 ease-out ${
              phase === "fun" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="container mx-auto px-4 pb-16 pt-40 sm:pb-24">
              <div className="mx-auto max-w-6xl">
                <div className="max-w-4xl">
                  <div className="relative mb-8 h-14 w-14">
                    <Image src="/logo.png" alt="Queso Ventures logo" fill className="object-contain" priority />
                  </div>
                  <h1 className="text-5xl font-light leading-[1.02] tracking-tight text-balance text-white sm:text-6xl lg:text-7xl">
                    You really thought I wasn&apos;t going to have fun on this page?
                  </h1>
                  <span aria-hidden className="mt-8 block h-1 w-24 rounded-full" style={{ backgroundImage: houseGradient() }} />
                  <p className="mt-8 max-w-2xl text-xl font-light leading-relaxed text-white/85 sm:text-2xl">
                    My favorite bands are MGMT, Foster the People, The Strokes, The Voidz (how on earth did i find them?) and
                    Communicant.
                  </p>
                  <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5">
                    <NicheCtaButton
                      variant="arrow"
                      tone="dark"
                      message="I ended up on your 404 page and figured I'd still reach out."
                      label="Get My Free Report"
                    />
                    <Link href="/" className={arrowTone("dark")}>
                      <ArrowMark tone="dark" label="Ready to leave the party?" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Boring default 404, for exactly as long as it takes to notice */}
      <div
        aria-hidden={phase === "fun"}
        className={`fixed inset-0 z-50 bg-white p-10 transition-all duration-700 ease-in ${
          phase === "fun"
            ? "opacity-0 -translate-y-10 rotate-2 scale-105 pointer-events-none"
            : "opacity-100"
        }`}
        style={{ fontFamily: '"Times New Roman", Times, serif', color: "#000" }}
      >
        <h1 style={{ fontSize: "2em", fontWeight: "bold", margin: "0 0 0.5em" }}>
          Not Found
        </h1>
        <p>The requested URL was not found on this server.</p>
      </div>
    </div>
  );
}
