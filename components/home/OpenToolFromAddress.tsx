"use client";

import { useEffect } from "react";
import { openGetStarted } from "components/GetStarted";
import { productBySlug } from "components/catalog";

/**
 * Opens a tool in the Get Started panel when the address asks for one:
 * /?tool=booking. That is where a tool's old address (/tools/booking)
 * redirects now that most tools have no page, so a link to a tool, old or
 * new, still lands on that tool.
 *
 * Read from the address bar after the page is up rather than through
 * useSearchParams, which would make the whole home page render on demand
 * for the sake of one optional parameter.
 */
export default function OpenToolFromAddress() {
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("tool");
    const product = slug ? productBySlug(slug) : undefined;
    if (!product) return;
    // A beat late: the panel closes itself on every navigation, and that has
    // to happen before this opens it.
    const t = setTimeout(() => openGetStarted(product.key, "tool_page"), 80);
    return () => clearTimeout(t);
  }, []);
  return null;
}
