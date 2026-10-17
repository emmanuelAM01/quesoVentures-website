import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { secretMatches } from "lib/guide/secret";
import { REPORT_CARD_TAG } from "lib/reportCard";

/**
 * The admin calls this after saving the Report Card settings, so a change made
 * in God Mode is on the page on its next request instead of within the hour.
 *
 * Same shared secret as the guide's revalidate webhook: one secret for "the
 * admin may tell the website to rebuild", rather than one per page.
 */
export async function POST(request: NextRequest) {
  if (!secretMatches(request.headers.get("x-guide-secret"), process.env.GUIDE_REVALIDATE_SECRET)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  revalidateTag(REPORT_CARD_TAG);
  revalidatePath("/report-card");
  return NextResponse.json({ ok: true });
}
