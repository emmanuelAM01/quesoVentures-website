import type { GuideReferrerClass } from "lib/guide/types";

// Order matters: gemini.google.com is an assistant, and has to be recognised
// before the generic "google" search rule claims it.
const AI_HOSTS = [
  "chatgpt.com",
  "chat.openai.com",
  "perplexity.ai",
  "gemini.google.com",
  "copilot.microsoft.com",
  "claude.ai",
];
const SEARCH = ["google", "bing", "duckduckgo", "yahoo"];
const SOCIAL_HOSTS = [
  "instagram.com",
  "facebook.com",
  "fb.com",
  "tiktok.com",
  "x.com",
  "twitter.com",
  "t.co",
  "youtube.com",
  "youtu.be",
  "linkedin.com",
  "lnkd.in",
];

function hostMatches(host: string, domain: string) {
  return host === domain || host.endsWith(`.${domain}`);
}

/** Lowercased host without "www.", or null for an empty or unparseable referrer. */
export function referrerHost(referrer: string | null | undefined): string | null {
  if (!referrer) return null;
  try {
    const host = new URL(referrer).hostname.toLowerCase().replace(/^www\./, "");
    return host || null;
  } catch {
    // utm_source values arrive as bare hosts ("chatgpt.com"), not URLs.
    const bare = referrer.trim().toLowerCase().replace(/^www\./, "");
    return /^[a-z0-9.-]+\.[a-z]{2,}$/.test(bare) ? bare : null;
  }
}

export function classifyHost(host: string | null): GuideReferrerClass {
  if (!host) return "direct";
  if (AI_HOSTS.some((d) => hostMatches(host, d))) return "ai";
  // "google.com", "google.co.uk", "search.yahoo.com", "duckduckgo.com"
  const labels = host.split(".");
  if (SEARCH.some((name) => labels.includes(name))) return "search";
  if (SOCIAL_HOSTS.some((d) => hostMatches(host, d))) return "social";
  return "other";
}

const BOT_UA =
  /bot|crawl|spider|slurp|preview|headless|lighthouse|pagespeed|facebookexternalhit|embedly|quora link|whatsapp|curl|wget|python-requests|axios|node-fetch|go-http-client/i;

export function isBot(userAgent: string | null): boolean {
  return !userAgent || BOT_UA.test(userAgent);
}
