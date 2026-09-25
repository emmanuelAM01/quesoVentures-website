import { GUIDE_DAYS, type GuideDay, type GuideHours } from "lib/guide/types";

// Guide dates are shown in Houston time. A visit on the evening of the 30th
// must not read as the 1st of the next month to a server in UTC.
const TZ = "America/Chicago";

/** "September 2026". `visited_on` is a date column, so it is read as a calendar date. */
export function monthYear(date: string | null | undefined): string | null {
  if (!date) return null;
  const d = new Date(date.length === 10 ? `${date}T12:00:00Z` : date);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}

/** "Sep 25, 2026". */
export function shortDate(date: string | null | undefined): string | null {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: TZ,
  });
}

/** "05:00" → "5 a.m.", "12:00" → "noon", "17:30" → "5:30 p.m." */
export function clock(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  if (Number.isNaN(h)) return hhmm;
  if (h === 12 && !m) return "noon";
  if ((h === 0 || h === 24) && !m) return "midnight";
  const suffix = h >= 12 && h < 24 ? "p.m." : "a.m.";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m ? `${hour}:${String(m).padStart(2, "0")} ${suffix}` : `${hour} ${suffix}`;
}

/**
 * "Tuesday to Friday", "Saturday and Sunday", "Monday, Wednesday and Friday".
 * Runs of three or more consecutive days collapse to a range.
 */
export function dayList(days: GuideDay[]): string {
  const idx = Array.from(new Set(days.map((d) => GUIDE_DAYS.indexOf(d))))
    .filter((i) => i >= 0)
    .sort((a, b) => a - b);
  if (idx.length === 7) return "Every day";

  const parts: string[] = [];
  let start = 0;
  for (let i = 1; i <= idx.length; i++) {
    if (i === idx.length || idx[i] !== idx[i - 1] + 1) {
      const run = idx.slice(start, i);
      if (run.length >= 3) parts.push(`${GUIDE_DAYS[run[0]]} to ${GUIDE_DAYS[run[run.length - 1]]}`);
      else parts.push(...run.map((d) => GUIDE_DAYS[d]));
      start = i;
    }
  }
  if (parts.length <= 1) return parts[0] ?? "";
  return `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
}

export function hoursLines(hours: GuideHours[]): { days: string; time: string }[] {
  return hours
    .filter((h) => h.days?.length && h.opens && h.closes)
    .map((h) => ({ days: dayList(h.days), time: `${clock(h.opens)} to ${clock(h.closes)}` }));
}

/** tel: href from whatever was typed. Assumes a US number when there is no country code. */
export function telHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return `tel:${digits}`;
  if (digits.length === 10) return `tel:+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `tel:+${digits}`;
  return `tel:${digits}`;
}

/** "example.com/menu" from "https://www.example.com/menu/". */
export function displayUrl(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
}

export function addressLine(a: {
  street_address: string | null;
  locality: string | null;
  region: string | null;
  postal_code: string | null;
}): string | null {
  const cityState = [a.locality, [a.region, a.postal_code].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join(", ");
  return [a.street_address, cityState].filter(Boolean).join(", ") || null;
}
