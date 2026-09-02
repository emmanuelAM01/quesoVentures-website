"use client";

import Image from "next/image";
import Modal from "./Modal";

export default function AboutModal() {

  return (
<Modal id="about-popup" title="About Queso Ventures">
  <div className="flex flex-col items-center px-2 sm:px-4">
    <div className="flex w-full max-w-md flex-col items-center gap-6">
      <div className="flex items-center gap-4 w-full">
        <div className="relative h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-full border-2 border-lightBorder dark:border-darkBorder">
          <Image
            src="/about.JPEG"
            alt="Emmanuel Mendieta, founder of Queso Ventures"
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
            <span>Based in Houston, building for the businesses in my own backyard</span>
          </li>
          <li className="flex gap-2">
            <span className="text-lightButton dark:text-darkButton mt-1">•</span>
            <span>No corporate upsells or cookie-cutter solutions - just clear, direct help</span>
          </li>
        </ul>
      </div>

      {/*
        One button, not two.

        This was a call button and a message button side by side at equal
        weight, which is the same split the navbar and the hero already had
        removed. The number is not gone from the site; it is in the footer under
        Support, where someone who has decided to talk goes looking for it.
      */}
      <div className="w-full mt-2">
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
            w-full inline-flex items-center justify-center
            rounded-xl px-6 py-3
            text-base font-semibold
            bg-lightButton hover:bg-lightButtonHover
            dark:bg-darkButton dark:hover:bg-darkButtonHover
            text-lightBG dark:text-darkBG
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