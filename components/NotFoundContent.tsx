"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "components/Header";
import Footer from "components/Footer";
import NicheCtaButton from "components/NicheCtaButton";

const BORING_MS = 2000;

export default function NotFoundContent() {
  const [phase, setPhase] = useState<"boring" | "fun">("boring");

  useEffect(() => {
    const t = setTimeout(() => setPhase("fun"), BORING_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-lightBG dark:bg-darkBG">
      <Header />
      <main className="flex-1 flex items-center">
        <section className="container mx-auto px-4 py-24">
          <div
            className={`max-w-6xl mx-auto text-center transition-all duration-700 ease-out ${
              phase === "fun" ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="relative w-20 h-20 mx-auto mb-8">
              <Image
                src="/logo.png"
                alt="Queso Ventures logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl tracking-tight text-lightText dark:text-darkText mb-6 text-balance">
              You really thought I wasn&apos;t going to have fun on this page?
            </h1>

            <p className="max-w-6xl mx-auto text-lg sm:text-xl font-light text-lightTextMuted dark:text-darkTextMuted mb-1">
              My favorite bands are MGMT, Foster the People, The Strokes, The Voidz (how on earth did i find them?) and
              Communicant.
            </p>

            <p className="mb-10 text-sm sm:text-base italic font-light text-lightTextMuted dark:text-darkTextMuted">
              
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4">
              <NicheCtaButton
                message="I ended up on your 404 page and figured I'd still reach out. Here's my situation:"
                label="See What Your Website Could Look Like"
              />
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-lightBorder dark:border-darkBorder px-6 py-3.5 text-base font-semibold text-lightText dark:text-darkText hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                Ready to leave the party? →
              </Link>
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
