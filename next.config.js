// @ts-check

const RESUME_ROLES = "FDE|Founding|GTM|Product";

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
    const resume = {
      // Emmanuel's resumes, at a readable URL for the forms that want a link
      // rather than a file. The PDFs live in public/resumes; keep this list in
      // step with components/AboutResumes.tsx.
      source: `/emmanuelMendietaResume/:role(${RESUME_ROLES})`,
      destination: "/resumes/Emmanuel_Mendieta_Resume_:role.pdf",
    };
    if (!key || !/^[a-zA-Z0-9-]{8,128}$/.test(key)) return [resume];
    return [resume, { source: `/${key}.txt`, destination: "/api/guide/indexnow-key" }];
  },
  async headers() {
    return [
      {
        // Opens in the browser, saves under the full name instead of "FDE",
        // and stays out of search results.
        source: `/emmanuelMendietaResume/:role(${RESUME_ROLES})`,
        headers: [
          {
            key: "Content-Disposition",
            value: 'inline; filename="Emmanuel_Mendieta_Resume_:role.pdf"',
          },
          { key: "X-Robots-Tag", value: "noindex" },
        ],
      },
      {
        source: "/resumes/:file*",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
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
