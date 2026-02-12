"use client";

import Image from "next/image";
import Modal from "./Modal";
import Link from "next/link";

export default function AboutModal() {

  return (
<Modal id="about-popup" title="About Queso Ventures">
  <div className="flex flex-col items-center px-2 sm:px-4">
    <div className="flex w-full max-w-md flex-col items-center gap-6">
      <div className="flex items-center gap-4 w-full">
        <div className="relative h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-full border-2 border-lightBorder dark:border-darkBorder">
          <Image
            src="/about.JPEG"
            alt="Emmanuel"
            fill
            className="object-cover"
            priority={false}
          />
        </div>

        <div className="text-left">
          <p className="text-lg sm:text-xl font-semibold text-lightText dark:text-darkText">
            Hey, I'm Emmanuel
          </p>
          <p className="text-sm sm:text-base font-light text-lightTextMuted dark:text-darkTextMuted mt-1">
            7 years in the industry, now I help Houston businesses grow their online presence. 
          </p>
        </div>
      </div>

      <div className="w-full text-left">
        <ul className="space-y-3 text-sm sm:text-base font-light text-lightTextMuted dark:text-darkTextMuted">
          <li className="flex gap-2">
            <span className="text-lightButton dark:text-darkButton mt-1">•</span>
            <span>I help local businesses see real results, I'm not just a tech shop or dev agency</span>
          </li>
          <li className="flex gap-2">
            <span className="text-lightButton dark:text-darkButton mt-1">•</span>
            <span>I find what's broken, fix what's holding you back, and build systems that bring in leads</span>
          </li>
          <li className="flex gap-2">
            <span className="text-lightButton dark:text-darkButton mt-1">•</span>
            <span>Based in Houston - I'll visit your location in person to understand your business</span>
          </li>
          <li className="flex gap-2">
            <span className="text-lightButton dark:text-darkButton mt-1">•</span>
            <span>No corporate upsells or cookie-cutter solutions - just clear, direct help</span>
          </li>
        </ul>
      </div>

      <div className="w-full flex flex-col sm:flex-row gap-3 mt-2">
        <Link
          href="https://calendar.app.google/DTrFqJ9XjEuTNmfr6"
          target="_blank"
          className="
            flex-1 inline-flex items-center justify-center
            rounded-xl px-6 py-3
            text-base font-semibold
            bg-lightButton hover:bg-lightButtonHover
            dark:bg-darkButton dark:hover:bg-darkButtonHover
            text-lightBG dark:text-darkBG
            transition-colors
          "
        >
          Book a Call
        </Link>
        
        <button
          type="button"
          onClick={() => {
            window.dispatchEvent(new CustomEvent("modal:close", { detail: { id: "about-popup" } }));
            window.dispatchEvent(new CustomEvent("contact:prefill", { 
              detail: { message: "I want to learn more about how you can help my Houston business:" } 
            }));
            window.dispatchEvent(new CustomEvent("modal:open", { 
              detail: { id: "contact-popup" } 
            }));
          }}
          className="
            flex-1 inline-flex items-center justify-center
            rounded-xl px-6 py-3
            text-base font-semibold
            border border-lightBorder dark:border-darkBorder
            text-lightText dark:text-darkText
            hover:bg-black/5 dark:hover:bg-white/10
            transition-colors
          "
        >
          Send a Message
        </button>
      </div>
    </div>
  </div>
</Modal>

  );
}