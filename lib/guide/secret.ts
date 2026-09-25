import "server-only";
import { createHash, timingSafeEqual } from "crypto";

/**
 * Constant-time check of a shared secret. Hashing both sides first makes the
 * lengths equal, which timingSafeEqual requires, without leaking the length
 * of the real secret through an early return.
 *
 * An unset secret never matches anything, so a missing env var locks the route
 * rather than opening it.
 */
export function secretMatches(given: string | null | undefined, expected: string | undefined): boolean {
  if (!expected || !given) return false;
  const a = createHash("sha256").update(given).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}
