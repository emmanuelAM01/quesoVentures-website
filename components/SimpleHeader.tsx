"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import ThemeSwitch from "./ThemeSwitch";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full",
        "bg-cheese-header-light dark:bg-cheese-header-dark",
        "backdrop-blur-md",
        "transition-all duration-200",
        scrolled
          ? "border-b border-lightBorder/90 dark:border-darkBorder/90 shadow-sm"
          : "border-b border-lightBorder/60 dark:border-darkBorder/60 shadow-none",
      ].join(" ")}
    >
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
      <div className="flex items-center">
        <Link
          href="/"
          className="relative flex items-center gap-2 px-4 py-2 text-lg font-medium text-lightText dark:text-darkText rounded-full transition-colors
            after:content-[''] after:absolute after:left-4 after:right-4 after:bottom-1 after:h-[2px]
            after:origin-left after:scale-x-0 after:transition-transform after:duration-200
            after:bg-lightAccent dark:after:bg-darkAccent
            hover:after:scale-x-100"
        >
          <Image
            src="/logo.png"
            alt="Queso Ventures logo"
            width={25}
            height={25}
            className="object-contain"
            priority={false}
          />
          <span>Queso Ventures</span>
        </Link>
      </div>
          <ThemeSwitch />

      </div>
    </header>
  );
}
