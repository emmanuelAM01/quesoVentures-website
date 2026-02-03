"use client";

import Image from "next/image";
import Modal from "./Modal";
import Link from "next/link";

export default function AboutModal() {

  return (
    <Modal id="about-popup" title="About">
      <div className="flex flex-col items-center text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-28 w-28 overflow-hidden rounded-full border border-lightBorder dark:border-darkBorder">
              <Image
                src="/about.JPEG"
                alt="Emmanuel"
                fill
                className="object-cover"
                priority={false}
              />
          </div>

          <p className="mt-4 text-md sm:text-base font-light text-lightTextMuted dark:text-darkTextMuted leading-relaxed text-balance">
            <strong>Hey, I'm Emmanuel</strong> <i> - Doing this for nearly a decade.</i>
          </p>
        </div>
        <ul className="list-style-type:disc flex flex-col text-start mt-4 text-sm sm:text-base font-light text-lightTextMuted dark:text-darkTextMuted leading-relaxed max-w-md text-balance">
          <li>I help small and local businesses keep up with technology.</li>
          <li>Always make tech that works, whether its a website, a complex AI automation tool for internal processes, and everything in between.</li>
          <li>Clear and transparent, I make sure you are never confused or feeling overwhelmed at any step of the way.</li>
          That's what keeps me going.
        </ul>
        <Link
          href="https://calendar.app.google/DTrFqJ9XjEuTNmfr6"
          target="_blank"
          className="
            bg-lightButton hover:bg-lightButtonHover dark:bg-darkButton dark:hover:darkButtonHover
            text-lightBG dark:text-darkBG
            px-6 py-3
            rounded-xl
            text-base font-semibold
            transition-colors
            mt-4
          "

        >
          Schedule a Call
        </Link>

      </div>
    </Modal>
  );
}
