/**
 * Even rows, so a grid never ends on a lonely card.
 *
 * On a six column grid: three across, a last row of two splits the width in
 * half, and a last one alone takes the whole row. Four is two by two. The
 * class names are written out whole so Tailwind finds them.
 */
export const EVEN_GRID = "grid md:grid-cols-6";

export function evenSpan(i: number, n: number): string {
  if (n === 1) return "md:col-span-6";
  if (n === 2 || n === 4) return "md:col-span-3";
  const tail = n % 3;
  const inTail = i >= n - tail;
  if (inTail && tail === 1) return "md:col-span-6";
  if (inTail && tail === 2) return "md:col-span-3";
  return "md:col-span-2";
}
