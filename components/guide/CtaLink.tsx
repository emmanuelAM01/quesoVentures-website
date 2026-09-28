"use client";

import Link from "next/link";
import { trackCtaClick } from "components/analytics";
import { sendGuideEvent } from "components/guide/track";

/** The membership link. Counted in both places: our own events and Vercel's. */
export default function CtaLink({
  articleId,
  href,
  children,
}: {
  articleId: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={() => {
        sendGuideEvent(articleId, "cta_click");
        trackCtaClick("guide_membership");
      }}
      // Always sits on the ink panel, so it is the house yellow in both themes.
      className="font-semibold text-darkAccent underline decoration-2 underline-offset-4 transition-colors hover:text-darkButtonHover"
    >
      {children}
    </Link>
  );
}
