/**
 * The IndexNow key file.
 *
 * IndexNow proves a site owns its URLs by fetching /{key}.txt and expecting
 * the key back. next.config.js rewrites that path here when INDEXNOW_KEY is
 * set, so the key lives in one env var and there is no file to commit or keep
 * in step. The key is public by design; it only proves ownership.
 */
export function GET() {
  const key = process.env.INDEXNOW_KEY;
  if (!key) return new Response("Not found", { status: 404 });
  return new Response(key, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=86400" },
  });
}
