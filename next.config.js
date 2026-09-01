// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
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
