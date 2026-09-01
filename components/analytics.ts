import { track } from "@vercel/analytics";

/**
 * Conversion tracking.
 *
 * Pageviews answer "did anyone come". These answer the question that actually
 * matters here: did they try to reach me, and from where on the page.
 *
 * Pro allows two properties per custom event, so these deliberately carry one.
 * The page itself does not need to be passed — Vercel records `route` and
 * `requestPath` as dimensions automatically, so you can already break any of
 * these down by page in the dashboard.
 */

/** Where on the page the action happened. Keep this list short and stable. */
export type Placement =
  | "header"
  | "header_mobile"
  | "hero"
  | "showcase"
  | "footer"
  | "free_audit"
  | "contact_page"
  | "contact_modal"
  | "about"
  | "why_local"
  | "why_remote"
  | "industries"
  | "areas";

/**
 * Someone tapped a phone number.
 *
 * Was described here as the most valuable signal on the site. It is not: as of
 * 2026-08-31 every call the published number has produced has been spam, which
 * is why the header pill now opens the form instead. Keep tracking it, but
 * read `cta_click` and `contact_submit` as the real conversion path.
 */
export function trackCall(from: Placement) {
  track("call_click", { from });
}

/** Someone opened the contact form from a call-to-action button. */
export function trackCtaClick(from: Placement) {
  track("cta_click", { from });
}

/** Someone actually submitted the form. */
export function trackContactSubmit(status: "success" | "error") {
  track("contact_submit", { status });
}
