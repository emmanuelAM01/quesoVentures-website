import type { MetadataRoute } from "next";

const BASE = "https://www.quesoventures.com";

// Was public/robots.txt. Moved here so the guide's sitemap could be listed
// beside the main one; the two cannot coexist, Next serves one or the other.
const DISALLOW = ["/api/", "/foundCode"];

/**
 * Search and AI crawlers named outright, so allowing them is a decision on the
 * record rather than something inherited from `*`.
 *
 * A crawler that finds a group with its own name ignores the `*` group
 * entirely, so every named group repeats the same disallows. Leaving them off
 * would have opened /api/ to exactly these bots.
 */
const NAMED = [
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: NAMED, allow: ["/", "/guide/"], disallow: DISALLOW },
    ],
    sitemap: [`${BASE}/sitemap.xml`, `${BASE}/guide/sitemap.xml`],
  };
}
