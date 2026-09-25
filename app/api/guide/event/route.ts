import { NextResponse, type NextRequest } from "next/server";
import { guideService } from "lib/guide/supabase";
import { SITE_URL } from "lib/guide/queries";
import { classifyHost, isBot, referrerHost } from "lib/guide/referrer";
import type { GuideEventType } from "lib/guide/types";

/**
 * First-party guide analytics: a pageview, a CTA click, or a visit that came
 * in through a business's "Featured in" badge.
 *
 * Stores the referring host and its class, and nothing about the person. The
 * user agent is read to drop bots and then thrown away; the IP is never read.
 *
 * Always answers 204, including when it ignores the event. The caller is
 * sendBeacon, which cannot read a response anyway, and a tracker that reports
 * why it declined an event only teaches a scraper how to get counted.
 */

const TYPES: GuideEventType[] = ["pageview", "cta_click", "badge_click"];
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SITE_HOST = referrerHost(SITE_URL);

const done = () => new NextResponse(null, { status: 204 });

export async function POST(request: NextRequest) {
  // Only this site's own pages send these. A request from anywhere else is
  // somebody padding the numbers.
  const site = request.headers.get("sec-fetch-site");
  if (site && site !== "same-origin") return done();
  if (isBot(request.headers.get("user-agent"))) return done();

  let body: { article_id?: unknown; type?: unknown; referrer?: unknown; utm_source?: unknown };
  try {
    body = JSON.parse(await request.text());
  } catch {
    return done();
  }

  const articleId = typeof body.article_id === "string" ? body.article_id : "";
  const type = body.type as GuideEventType;
  if (!UUID.test(articleId) || !TYPES.includes(type)) return done();

  // A link out of an assistant very often arrives with no referrer at all, but
  // ChatGPT and Perplexity tag it with utm_source. Use that when the referrer
  // is missing or is just this site.
  let host = referrerHost(typeof body.referrer === "string" ? body.referrer : null);
  if (!host || host === SITE_HOST) {
    const utm = referrerHost(typeof body.utm_source === "string" ? body.utm_source : null);
    if (utm) host = utm;
  }

  const db = guideService();
  if (!db) return done();

  const { error } = await db.from("events").insert({
    article_id: articleId,
    type,
    referrer_host: host,
    referrer_class: classifyHost(host),
  });
  // An unknown article id fails the foreign key. That is the check; there is
  // nothing to tell the caller.
  if (error && error.code !== "23503") console.error("[guide] event insert", error.message);

  return done();
}
