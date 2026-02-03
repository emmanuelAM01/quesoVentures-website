"use client";

import Image from "next/image";
import Modal from "./Modal";
import Link from "next/link";

export default function AboutModal() {

  return (
<Modal id="about-popup" title="About">
  <div className="flex flex-col items-center text-center px-2 sm:px-4">
    <div className="flex w-full max-w-md flex-col items-center gap-4">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-full border border-lightBorder dark:border-darkBorder">
          <Image
            src="/about.JPEG"
            alt="Emmanuel"
            fill
            className="object-cover"
            priority={false}
          />
        </div>

        <div className="text-left">
          <p className="text-base sm:text-lg font-semibold text-lightText dark:text-darkText leading-tight">
            Hey, I&apos;m Emmanuel
          </p>
          <p className="text-sm sm:text-base italic font-light text-lightTextMuted dark:text-darkTextMuted leading-snug">
            Doing this for nearly a decade.
          </p>
        </div>
      </div>

      <div className="w-full p-4 sm:p-5 text-left">
        <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base font-light text-lightTextMuted dark:text-darkTextMuted leading-relaxed">
          <li>I help small and local businesses keep up with technology.</li>
          <li>
            I build tech that actually works, from websites to internal AI automations, and
            everything in between.
          </li>
          <li>
            Clear and transparent, I make sure you&apos;re never confused or overwhelmed at any step.
          </li>
        </ul>
      </div>

      <Link
        href="https://calendar.app.google/DTrFqJ9XjEuTNmfr6"
        target="_blank"
        className="
          inline-flex w-full sm:w-auto items-center justify-center
          rounded-xl px-6 py-3
          text-base font-semibold
          bg-lightButton hover:bg-lightButtonHover
          dark:bg-darkButton dark:hover:bg-darkButtonHover
          text-lightBG dark:text-darkBG
          transition-colors
          shadow-sm hover:shadow
        "
      >
        Schedule a Call
      </Link>
    </div>
  </div>
</Modal>

  );
}
