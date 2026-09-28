// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // The Queso Guide's photos, from the public guide-images bucket.
        // Scoped to that one bucket so next/image cannot be used to proxy
        // anything else a Supabase project happens to serve.
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/guide-images/**",
      },
    ],
  },
  async rewrites() {
    // IndexNow verifies ownership by fetching /{key}.txt. The key lives in an
    // env var rather than a committed file; see app/api/guide/indexnow-key.
    const key = process.env.INDEXNOW_KEY;
    if (!key || !/^[a-zA-Z0-9-]{8,128}$/.test(key)) return [];
    return [{ source: `/${key}.txt`, destination: "/api/guide/indexnow-key" }];
  },
  async redirects() {
    return [
      {
        // Retired 2026-08-31: zero impressions in three months, and to anyone
        // searching it is Humble. Permanent so the little equity it had moves
        // rather than evaporating, and so anyone holding the old link lands
        // somewhere real.
        source: "/web-design-summerwood-tx",
        destination: "/web-design-humble-tx",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
