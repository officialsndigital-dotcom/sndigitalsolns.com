/**
 * Plain JavaScript rather than TypeScript: Hostinger's shared hosting runs an
 * old glibc, so Next cannot load its native SWC binary there and falls back to
 * the WebAssembly build, which cannot compile a TypeScript config file.
 *
 * @type {import("next").NextConfig}
 */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  trailingSlash: true,
  poweredByHeader: false,
  /**
   * The WordPress site this one replaces was built on an off-the-shelf theme and
   * carried its demo pages and demo shop into Google's index. These send the
   * handful of URLs that were actually indexed to their nearest equivalent here,
   * so no one following an old link or search result lands on a 404.
   */
  async redirects() {
    const to = (source, destination) => ({ source, destination, permanent: true });
    return [
      to("/about-us", "/company/about/"),
      to("/our-team", "/company/about/"),
      to("/testimonial", "/case-studies/"),
      to("/faqs-page", "/resources/faqs/"),
      to("/services", "/"),
      to("/home-02", "/"),
      to("/shop", "/"),
      to("/product/:slug", "/"),
      to("/influencer-marketing-trends-2023-what-you-need-know", "/blog/"),
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
