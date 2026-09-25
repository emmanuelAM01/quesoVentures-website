import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { QuesoGuideSchema } from "lib/guide/types";

type GuideDatabase = { queso_guide: QuesoGuideSchema };
export type GuideClient = SupabaseClient<GuideDatabase, "queso_guide", "queso_guide">;

/**
 * Every guide read is tagged `guide`, so the revalidate webhook can drop all
 * of them in one call. A hub, the sitemap and three different article pages
 * all read the same published list; tracking which page cached which query is
 * exactly the bookkeeping a single tag makes unnecessary.
 *
 * A day is the safety net for a webhook that never arrived. Freshness comes
 * from the webhook.
 */
export const GUIDE_TAG = "guide";
const DAY = 86400;

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Whether the guide can reach its database at all. False on a local checkout
 * or preview without the env vars, where every read returns empty rather than
 * failing the build: the rest of the site has no business breaking because the
 * guide cannot connect.
 */
export const guideConfigured = Boolean(url && anonKey);

let publicClient: GuideClient | null = null;
let serviceClient: GuideClient | null = null;

/** Reads what anon can see: published articles, cities, categories, redirects. */
export function guidePublic(): GuideClient | null {
  if (!url || !anonKey) return null;
  publicClient ??= createClient<GuideDatabase, "queso_guide">(url, anonKey, {
    db: { schema: "queso_guide" },
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) =>
        fetch(input, { ...init, next: { revalidate: DAY, tags: [GUIDE_TAG] } }),
    },
  });
  return publicClient;
}

/**
 * The service role. Server only, and only for two jobs: reading a draft in
 * preview, and writing an event. Never cached, because a preview that shows
 * the version from ten minutes ago is not a preview.
 */
export function guideService(): GuideClient | null {
  if (!url || !serviceKey) return null;
  serviceClient ??= createClient<GuideDatabase, "queso_guide">(url, serviceKey, {
    db: { schema: "queso_guide" },
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    },
  });
  return serviceClient;
}

/** Public URL of an object in the guide-images bucket. */
export function guideImageUrl(path: string | null | undefined): string | null {
  if (!path || !url) return null;
  if (/^https?:\/\//.test(path)) return path;
  return `${url}/storage/v1/object/public/guide-images/${path
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;
}
