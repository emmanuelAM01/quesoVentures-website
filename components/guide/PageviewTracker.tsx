"use client";

import { useEffect, useRef } from "react";
import { sendGuideEvent } from "components/guide/track";

/**
 * One pageview per load. A visit that arrived through a business's "Featured
 * in The Queso Guide" badge carries ?ref=badge and is also counted as a
 * badge_click, which is how a badge on their site shows up in the metrics.
 */
export default function PageviewTracker({ articleId }: { articleId: string }) {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    sendGuideEvent(articleId, "pageview");
    if (new URLSearchParams(window.location.search).get("ref") === "badge") {
      sendGuideEvent(articleId, "badge_click");
    }
  }, [articleId]);
  return null;
}
