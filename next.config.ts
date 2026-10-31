import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hostinger Node hosting looks for a standalone server under dist/standalone.
  output: "standalone",
  // Native SQLite binding used by the Hostinger/Node database adapter.
  serverExternalPackages: ["better-sqlite3"],
  // Keep generated build artifacts out of the repo; postbuild copies into dist/.
  poweredByHeader: false,
};

export default nextConfig;
