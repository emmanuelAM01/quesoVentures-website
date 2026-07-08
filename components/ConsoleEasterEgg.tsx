"use client";

import { useEffect } from "react";

export default function ConsoleEasterEgg() {
  useEffect(() => {
    console.log(
      "%cIt's cold in here.",
      "font-size:20px;font-weight:bold;color:#C4161C;"
    );
    console.log(
      "%cLooking under the hood is exactly what I'd do too. hello@quesoventures.com",
      "font-size:12px;color:#888;"
    );
  }, []);

  return null;
}
