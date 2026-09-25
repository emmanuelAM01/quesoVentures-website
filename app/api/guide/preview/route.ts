import { draftMode } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { guideService } from "lib/guide/supabase";
import { secretMatches } from "lib/guide/secret";
import { guideArticlePath } from "lib/guide/types";

/**
 * GET /api/guide/preview?secret=&id=   turn draft mode on, go to the article
 * GET /api/guide/preview?exit=1&to=    turn it off, go back to `to`
 *
 * Draft mode is a cookie on this browser only. While it is on, article pages
 * read with the service role and ignore status, and say "Draft preview" across
 * the top so a draft is never mistaken for the live page.
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  if (params.get("exit")) {
    draftMode().disable();
    const to = params.get("to") ?? "/guide";
    // Only ever a path on this site, so the exit link cannot be used as an
    // open redirect.
    const safe = to.startsWith("/") && !to.startsWith("//") ? to : "/guide";
    return NextResponse.redirect(new URL(safe, request.url));
  }

  if (!secretMatches(params.get("secret"), process.env.GUIDE_PREVIEW_SECRET)) {
    return new NextResponse("Invalid preview link.", { status: 401 });
  }

  const db = guideService();
  if (!db) return new NextResponse("The guide is not connected on this deployment.", { status: 503 });

  const { data } = await db
    .from("articles")
    .select("slug, city:cities(slug), category:categories(slug)")
    .eq("id", params.get("id") ?? "")
    .maybeSingle();

  if (!data) return new NextResponse("No article with that id.", { status: 404 });
  if (!data.city || !data.category) {
    return new NextResponse("Pick a city and a category before previewing.", { status: 400 });
  }

  draftMode().enable();
  return NextResponse.redirect(
    new URL(guideArticlePath(data.city.slug, data.category.slug, data.slug), request.url)
  );
}
