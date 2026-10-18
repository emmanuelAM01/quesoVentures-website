/**
 * Always the percent increase, never a multiple: 2.2x is +120%. People read
 * "2x" and "+100%" as two different numbers. The portal's admin writes it the
 * same way.
 *
 * Its own file so a server component (the home's proof band) can call it;
 * the Report Card itself is a client component.
 */
export function formatGrowth(g: number): string {
  const pct = Math.round((g - 1) * 100);
  return pct >= 0 ? `+${pct.toLocaleString("en-US")}%` : `${pct.toLocaleString("en-US")}%`;
}
