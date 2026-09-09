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
 * is recorded with the placement that produced it.
 *
 * IT CURRENTLY HAS NO CALL SITES, AND THAT IS DELIBERATE.
 *
 * The site now asks people to fill in the form first and email second; the
 * phone is a last resort rather than something brandished on every page. The
 * number was removed from the header drawer, the footer, the contact page and
 * the success panel for that reason, not because it stopped working.
 *
 * It is kept rather than deleted because "last" is not "never" — a campaign or
 * a single page may want it back — and because if it does come back it must
 * come back through here, so the number and the tracking stay in one place.
 *
 * The number is still published where it belongs: the Google Business Profile,
 * and the telephone field in this site's LocalBusiness schema, which is what
 * lets Google line the two up as the same business. Neither of those is a
 * phone link a visitor sees.
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
