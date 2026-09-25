import type { GuideEventType } from "lib/guide/types";

/**
 * Fire and forget. sendBeacon survives the page unloading, which is exactly
 * when a CTA click happens, and never holds up navigation. text/plain keeps it
 * a simple request; the route parses the body itself.
 */
export function sendGuideEvent(articleId: string, type: GuideEventType) {
  try {
    const utm = new URLSearchParams(window.location.search).get("utm_source");
    const body = JSON.stringify({
      article_id: articleId,
      type,
      referrer: document.referrer || null,
      utm_source: utm,
    });
    const blob = new Blob([body], { type: "text/plain" });
    if (navigator.sendBeacon?.("/api/guide/event", blob)) return;
    void fetch("/api/guide/event", { method: "POST", body, keepalive: true });
  } catch {
    // Analytics never gets to break the page.
  }
}
