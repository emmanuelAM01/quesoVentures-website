import { NextResponse, type NextRequest } from "next/server";

/**
 * The site's own taps (phone, form opened, form sent), relayed to the portal,
 * where they land in website_events beside every client site's and are read in
 * God Mode → Queso. They used to go to Vercel's custom events, which kept them
 * in Vercel's dashboard and nowhere else.
 *
 * The browser beacons here; this forwards server to server with the shared
 * QUESO_FORMS_SECRET, the same one the contact form uses, so the secret never
 * reaches a visitor. Always answers 204: a dropped tap must never surface on
 * the page.
 */

const HOUSE_SITE = "quesoventures";
const EVENTS = new Set(["call_tap", "cta_click", "contact_submit"]);

export async function POST(request: NextRequest) {
  const done = () => new NextResponse(null, { status: 204 });
  const portal = process.env.PORTAL_URL;
  if (!portal) return done();

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return done();
  }
  if (typeof body.event_type !== "string" || !EVENTS.has(body.event_type)) return done();

  try {
    await fetch(`${portal.replace(/\/$/, "")}/api/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.QUESO_FORMS_SECRET ? { "x-queso-secret": process.env.QUESO_FORMS_SECRET } : {}),
      },
      body: JSON.stringify({
        house_site: HOUSE_SITE,
        event_type: body.event_type,
        location: typeof body.location === "string" ? body.location : null,
        page: typeof body.page === "string" ? body.page : null,
        referrer: typeof body.referrer === "string" ? body.referrer : null,
      }),
      signal: AbortSignal.timeout(5000),
    });
  } catch {
    // The portal being down costs a tap, never the visitor anything.
  }
  return done();
}
