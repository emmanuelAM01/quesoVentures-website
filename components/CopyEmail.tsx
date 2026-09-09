"use client";

import { useState } from "react";
import { BUSINESS } from "./businessInfo";
import { copyText } from "./copyText";

/**
 * The address, takeable, rather than a mailto: and a hope.
 *
 * A mailto: assumes a mail client is installed and configured. Plenty of the
 * people who fill in this form run their whole business out of Gmail or
 * Outlook in a browser tab, and for them that link does nothing at all, or
 * worse, opens some default app they have never signed into.
 *
 * So the address is the content and copying is the convenience, never the
 * other way round. select-all means one tap highlights the whole thing, which
 * is the path that still works when the clipboard API is missing or refuses.
 */
export default function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    if (await copyText(BUSINESS.email)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <span className="inline-flex flex-wrap items-center justify-center gap-2">
      <span className="select-all break-all font-semibold text-lightButton dark:text-darkButton">
        {BUSINESS.email}
      </span>
      <button
        type="button"
        onClick={copy}
        className="rounded-lg border border-black/10 dark:border-white/15 px-2.5 py-1 text-sm font-medium text-lightTextMuted dark:text-darkTextMuted hover:border-lightAccent/40 dark:hover:border-darkAccent/40 hover:text-lightText dark:hover:text-darkText transition-colors"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </span>
  );
}
