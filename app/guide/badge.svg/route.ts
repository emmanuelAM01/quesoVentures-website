/**
 * "Featured in The Queso Guide", for a business to put on its own site. The
 * admin hands out the snippet, which links to their article with ?ref=badge so
 * visits through it are counted.
 *
 * Hand written and self contained: no fonts to fetch, no script, about 1 KB.
 * The text uses system fonts because an SVG in an <img> cannot load webfonts.
 */
const SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="72" viewBox="0 0 240 72" role="img" aria-label="Featured in The Queso Guide">
  <title>Featured in The Queso Guide</title>
  <defs>
    <linearGradient id="b" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#C4161C"/>
      <stop offset="1" stop-color="#FFD100"/>
    </linearGradient>
  </defs>
  <rect width="240" height="72" rx="16" fill="#101216"/>
  <rect x="16" y="58" width="208" height="3" rx="1.5" fill="url(#b)"/>
  <circle cx="30" cy="30" r="10" fill="#FFD100"/>
  <path d="M25 30.5l3.4 3.4 6.6-7" fill="none" stroke="#101216" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="50" y="24" fill="#B7C0C8" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif" font-size="12" font-weight="500">Featured in</text>
  <text x="50" y="43" fill="#FFFFFF" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif" font-size="18" font-weight="700" letter-spacing="-0.3">The Queso Guide</text>
</svg>`;

export const dynamic = "force-static";

export function GET() {
  return new Response(SVG, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
