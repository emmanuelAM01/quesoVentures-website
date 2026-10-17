import "server-only";

/**
 * The Report Card's numbers, from the portal.
 *
 * The portal owns the clients and their Google data, so it does the
 * arithmetic (packages/metrics/src/report-card-math.ts in the portal repo) and
 * hands back group medians as ratios. Nothing in this payload names a client
 * or carries a raw count.
 *
 * Cached here for an hour, so the page never waits on a cold query while a
 * lead is looking at it. Saving the settings in God Mode drops the cache
 * through app/api/report-card/revalidate, so admin changes show at once.
 */

export const REPORT_CARD_TAG = "report-card";

export type ReportMetric = "website" | "seen" | "reached";

export interface ReportPoint {
  /** The calendar month, 1 (January) to 12 (December), of ReportCard.year. */
  period: number;
  /** The median client against their own starting level, x100. */
  index: number;
  /** Past the last measured month: the trend carried forward. Also a month set by hand. */
  projected: boolean;
  /** Set by hand in God Mode (Your numbers). Drawn as projected. */
  edited?: boolean;
  businesses: number;
}

export interface ReportFigure {
  /** This trade has no figure of its own here; the card shows every client's. */
  fallback?: boolean;
  /** The card's number: the line at its latest month. 2.4 means 2.4x. */
  growth: number;
  /** That month was set by hand in God Mode: the card says Projected. */
  estimated?: boolean;
  /** True when the starting point is the month before Queso. */
  fromBefore: boolean;
  /** Where the line ends at month twelve, or null once real months reach it. */
  projected: number | null;
  horizon: number;
  businesses: number;
  line: ReportPoint[];
}

export interface ReportGroup {
  slug: string;
  name: string;
  businesses: number;
  metrics: Partial<Record<ReportMetric, ReportFigure>>;
  /** No figures of its own yet: shows every client's, and says so. */
  fallback?: boolean;
}

export interface ReportCard {
  asOf: string;
  /** The calendar year the line runs across. */
  year: number;
  periodDays: number;
  groups: ReportGroup[];
  /** Some month on the page was set by hand, so the page says "and projections". */
  edited?: boolean;
}

export async function getReportCard(): Promise<ReportCard | null> {
  const portal = process.env.PORTAL_URL;
  if (!portal) return null;
  try {
    const res = await fetch(`${portal.replace(/\/$/, "")}/api/report-card`, {
      next: { revalidate: 3600, tags: [REPORT_CARD_TAG] },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return null;
    const card = (await res.json()) as ReportCard;
    return Array.isArray(card.groups) ? card : null;
  } catch {
    return null;
  }
}
