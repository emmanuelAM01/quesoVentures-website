/**
 * Conversion tracking.
 *
 * Pageviews answer "did anyone come" (Vercel Web Analytics, still on in the
 * layout). These answer the question that actually matters here: did they try
 * to reach me, and from where on the page.
 *
 * They go to our own /api/track, which relays them to the portal's
 * website_events, so they sit in God Mode → Queso beside every client site's
 * taps instead of in Vercel's dashboard. Each carries where on the page it
 * happened and which page.
 */

/** Fire and forget. sendBeacon survives the page unloading, which a tap on a phone link usually does. */
function send(event_type: string, location: string) {
  if (typeof window === "undefined") return;
  try {
    const body = JSON.stringify({
      event_type,
      location,
      page: window.location.pathname,
      referrer: document.referrer || null,
    });
    if (navigator.sendBeacon?.("/api/track", new Blob([body], { type: "application/json" }))) return;
    void fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Tracking never breaks the page.
  }
}

/**
 * Where on the page the action happened. Keep this list short and stable.
 *
 * Every button that opens the contact form must pass one of these. Five of them
 * were opening the form without firing anything at all, which made the funnel
 * read as if the estimator, the FAQ deck and the stamp page never converted —
 * they were converting, nothing was counting it.
 */
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
  | "about_modal"
  | "why_local"
  | "why_remote"
  | "industries"
  | "areas"
  | "faq"
  | "price_estimator"
  | "found_flyer"
  | "guide_membership"
  | "get_started"
  | "tools"
  | "tool_page"
  | "home";

/**
 * Someone tapped a phone number.
 *
 * Was described here as the most valuable signal on the site. It is not: as of
 * 2026-08-31 every call the published number has produced has been spam, which
 * is why the header pill now opens the form instead. Keep tracking it, but
 * read `cta_click` and `contact_submit` as the real conversion path.
 */
export function trackCall(from: Placement) {
  send("call_tap", from);
}

/** Someone opened the contact form from a call-to-action button. */
export function trackCtaClick(from: Placement) {
  send("cta_click", from);
}

/** Someone actually submitted the form. */
export function trackContactSubmit(status: "success" | "error") {
  send("contact_submit", status);
}
