import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const standaloneSource = path.join(root, ".next", "standalone");
const staticSource = path.join(root, ".next", "static");
const publicSource = path.join(root, "public");
const distStandalone = path.join(root, "dist", "standalone");

function fail(message) {
  console.error(message);
  process.exit(1);
}

if (!existsSync(standaloneSource)) {
  fail(
    "Missing .next/standalone after next build. Ensure next.config.ts sets output: \"standalone\"."
  );
}

rmSync(path.join(root, "dist"), { recursive: true, force: true });
mkdirSync(path.join(root, "dist"), { recursive: true });
cpSync(standaloneSource, distStandalone, { recursive: true });

const standaloneNextDir = path.join(distStandalone, ".next");
mkdirSync(standaloneNextDir, { recursive: true });

if (existsSync(staticSource)) {
  cpSync(staticSource, path.join(standaloneNextDir, "static"), { recursive: true });
}

if (existsSync(publicSource)) {
  cpSync(publicSource, path.join(distStandalone, "public"), { recursive: true });
}

const serverJs = path.join(distStandalone, "server.js");
if (!existsSync(serverJs)) {
  fail("Hostinger check failed: dist/standalone/server.js was not created.");
}

writeFileSync(
  path.join(root, "dist", ".hostinger-build.json"),
  JSON.stringify(
    {
      mode: "next-standalone",
      server: "dist/standalone/server.js",
      createdAt: new Date().toISOString(),
    },
    null,
    2
  )
);

console.log("Generated standalone output in dist/standalone/");
console.log("Start it with: node dist/standalone/server.js");
