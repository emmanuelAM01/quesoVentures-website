import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { GUIDE_TAG } from "lib/guide/supabase";
import { SITE_URL } from "lib/guide/queries";
import { secretMatches } from "lib/guide/secret";

/**
 * The admin calls this after publishing, unpublishing, archiving or moving an
 * article. Body: { paths: string[] }, the article's path plus any old paths it
 * used to live at.
 *
 * Drops every cached guide read (one tag covers them all), rebuilds each path
 * and the hubs above it, and tells IndexNow the URLs changed. The pages are
 * rebuilt on their next request, so this returns in well under a second.
 */

const ARTICLE_PATH = /^\/guide\/[a-z0-9-]+\/[a-z0-9-]+\/[a-z0-9-]+$/;

export async function POST(request: NextRequest) {
  if (!secretMatches(request.headers.get("x-guide-secret"), process.env.GUIDE_REVALIDATE_SECRET)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let paths: string[];
  try {
    const body = (await request.json()) as { paths?: unknown };
    paths = Array.isArray(body.paths)
      ? body.paths.filter((p): p is string => typeof p === "string" && ARTICLE_PATH.test(p))
      : [];
  } catch {
    return NextResponse.json({ ok: false, error: "bad body" }, { status: 400 });
  }

  const all = new Set<string>(["/guide", "/guide/sitemap.xml"]);
  for (const path of paths) {
    const [, , city, category] = path.split("/");
    all.add(path);
    all.add(`/guide/${city}`);
    all.add(`/guide/${city}/${category}`);
  }

  revalidateTag(GUIDE_TAG);
  const list = Array.from(all);
  for (const path of list) revalidatePath(path);

  const indexnow = await pingIndexNow(list.filter((p) => !p.endsWith(".xml")));

  return NextResponse.json({ ok: true, revalidated: list, indexnow });
}

/**
 * IndexNow tells Bing, Yandex, Seznam and Naver (and through Bing, the
 * assistants that search with it) that a URL changed, instead of waiting to be
 * recrawled. Google does not take part. A failure here is reported and never
 * fails the refresh.
 */
async function pingIndexNow(paths: string[]): Promise<"sent" | "skipped" | string> {
  const key = process.env.INDEXNOW_KEY;
  if (!key || !paths.length) return "skipped";
  const origin = new URL(SITE_URL);
  // Local and preview origins are not something a search engine can crawl, and
  // IndexNow would only record them as junk submissions for this key.
  if (origin.protocol !== "https:" || /^(localhost|127\.|0\.0\.0\.0)/.test(origin.hostname)) return "skipped";
  const host = origin.host;
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host,
        key,
        keyLocation: `${SITE_URL}/${key}.txt`,
        urlList: paths.map((p) => `${SITE_URL}${p}`),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    return res.ok ? "sent" : `failed ${res.status}`;
  } catch (e) {
    return `failed ${e instanceof Error ? e.message : "unknown"}`;
  }
}
