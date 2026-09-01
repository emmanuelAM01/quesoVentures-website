/**
 * Business lookup for the report form.
 *
 * Proxied rather than called from the browser so `GOOGLE_PLACES_API_KEY` never
 * ships to the client. A key restricted only by HTTP referrer is still readable
 * by anyone who opens devtools and reusable by anyone willing to spoof a header.
 *
 * Degrades on purpose: with no key configured this returns `configured: false`
 * and the form falls back to a plain text input. The page must never depend on
 * a third party being reachable to accept a lead.
 */
const ENDPOINT = "https://places.googleapis.com/v1/places:autocomplete";

/**
 * Houston, biasing results toward the service area without excluding others.
 *
 * 50km is the API's hard ceiling on circle.radius; anything larger is rejected
 * outright with INVALID_ARGUMENT rather than clamped. It reaches Katy, The
 * Woodlands and Baytown, which covers the metro.
 */
const BIAS = {
  circle: {
    center: { latitude: 29.7604, longitude: -95.3698 },
    radius: 50000,
  },
};

export interface PlaceSuggestion {
  placeId: string;
  name: string;
  address: string;
}

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q")?.trim() ?? "";
  const key = process.env.GOOGLE_PLACES_API_KEY;

  if (!key) return Response.json({ configured: false, suggestions: [] });
  if (q.length < 3) return Response.json({ configured: true, suggestions: [] });

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask":
          "suggestions.placePrediction.placeId,suggestions.placePrediction.structuredFormat",
      },
      body: JSON.stringify({
        input: q,
        locationBias: BIAS,
        includedPrimaryTypes: ["establishment"],
      }),
      // Google is the slow part of a request the user is typing into.
      signal: AbortSignal.timeout(4000),
    });

    if (!res.ok) {
      // Log the body: a rejected request and a genuine no-match both render as
      // an empty dropdown, and without this they are indistinguishable.
      console.error("Places autocomplete failed", res.status, await res.text());
      return Response.json({ configured: true, suggestions: [] });
    }

    const data = await res.json();
    const suggestions: PlaceSuggestion[] = (data?.suggestions ?? [])
      .map((s: any) => s?.placePrediction)
      .filter(Boolean)
      .map((p: any) => ({
        placeId: String(p.placeId ?? ""),
        name: String(p.structuredFormat?.mainText?.text ?? ""),
        address: String(p.structuredFormat?.secondaryText?.text ?? ""),
      }))
      .filter((p: PlaceSuggestion) => p.placeId && p.name)
      .slice(0, 5);

    return Response.json({ configured: true, suggestions });
  } catch (err) {
    // A lookup that fails is a text input, never a broken form.
    console.error("Places autocomplete error", err);
    return Response.json({ configured: true, suggestions: [] });
  }
}
