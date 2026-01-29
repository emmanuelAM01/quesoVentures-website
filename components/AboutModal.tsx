"use client";

import Image from "next/image";
import Modal from "./Modal";

export default function AboutModal() {
  return (
    <Modal id="about-popup" title="About">
      <div className="flex flex-col items-center text-center">
        <div className="relative h-28 w-28 overflow-hidden rounded-full border border-lightBorder dark:border-darkBorder">
          <Image
            src="/about.JPEG"
            alt="Emmanuel"
            fill
            className="object-cover"
            priority={false}
          />
        </div>

        <p className="mt-4 text-sm sm:text-base font-light text-lightTextMuted dark:text-darkTextMuted leading-relaxed max-w-md text-balance">
          I’ve been building websites and software for years, mostly for small businesses and early teams who just want things to work. I’ve handled everything from design to development. Learned the hard way through real projects, mistakes, and late nights. I genuinely enjoy turning ideas into simple, useful products that everyday people can actually use. That’s what keeps me going.
        </p>
      </div>
    </Modal>
  );
}
