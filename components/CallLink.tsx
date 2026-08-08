"use client";

import { BUSINESS } from "components/businessInfo";
import { trackCall, type Placement } from "components/analytics";

interface Props {
  /** Where on the page this sits, so the dashboard can rank call sources. */
  from: Placement;
  className?: string;
  children?: React.ReactNode;
  "aria-label"?: string;
}

/**
 * Every phone link on the site goes through here.
 *
 * One component means the number can never drift between pages, and every tap
 * is recorded with the placement that produced it — so after a month you can
 * see whether the header pill, the hero, or the footer is actually earning the
 * calls, and cut the ones that aren't.
 */
export default function CallLink({
  from,
  className,
  children,
  "aria-label": ariaLabel,
}: Props) {
  return (
    <a
      href={BUSINESS.phoneHref}
      onClick={() => trackCall(from)}
      className={className}
      aria-label={ariaLabel}
    >
      {children ?? BUSINESS.phone}
    </a>
  );
}
