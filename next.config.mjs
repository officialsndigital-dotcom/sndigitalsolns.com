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
