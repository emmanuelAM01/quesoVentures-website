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
    /*
      The rebrand, 2026-10. The site stopped being a local web design shop
      with a page per suburb and became a software company with a catalogue.
      Every old URL is permanent to its closest new page, so whatever little
      equity it had moves and anyone holding the old link lands somewhere real.

      The suburb pages all go to the website, which is the thing they sold.
      The trade pages go to that trade's own tab on the Report Card, which is
      the honest answer to "do you work with businesses like mine". Tab slugs
      are the portal's (GET /api/report-card); check them there before adding.
    */
    const suburbs = ["houston", "humble", "kingwood", "atascocita", "channelview", "porter", "summerwood"];
    const trades = {
      "seo-for-auto-shops-houston": "mechanics",
      "seo-for-wrap-shops-houston": "wrap-shops-marketing-and-advertising",
      "seo-for-med-spas-houston": "medical",
      "seo-for-contractors-houston": "trades",
      "website-for-food-trucks-houston": "food-trucks",
    };
    return [
      { source: "/studios", destination: "/tools", permanent: true },
      { source: "/studios/qrs", destination: "/tools/queso-revenue-system", permanent: true },
      { source: "/services", destination: "/tools/website", permanent: true },
      ...suburbs.map((s) => ({ source: `/web-design-${s}-tx`, destination: "/tools/website", permanent: true })),
      ...Object.entries(trades).map(([page, tab]) => ({
        source: `/${page}`,
        destination: `/report-card?tab=${tab}`,
        permanent: true,
      })),
    ];
  },
};

module.exports = nextConfig;
