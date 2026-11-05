import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hostinger Node hosting looks for a standalone server under dist/standalone.
  output: "standalone",
  // Native / Node-only database drivers used by the Hostinger adapter.
  serverExternalPackages: ["better-sqlite3", "mysql2"],
  // Keep generated build artifacts out of the repo; postbuild copies into dist/.
  poweredByHeader: false,
};

export default nextConfig;
