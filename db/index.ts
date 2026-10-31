import { mkdirSync } from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

declare global {
  // eslint-disable-next-line no-var
  var __withindeskSqlite: Database.Database | undefined;
}

function resolveDatabasePath() {
  if (process.env.DATABASE_PATH) return process.env.DATABASE_PATH;
  // Prefer a persistent data directory on VPS / Node hosts.
  return path.join(process.cwd(), "data", "withindesk.sqlite");
}

function openDatabase() {
  if (globalThis.__withindeskSqlite) return globalThis.__withindeskSqlite;

  const databasePath = resolveDatabasePath();
  mkdirSync(/* turbopackIgnore: true */ path.dirname(databasePath), {
    recursive: true,
  });

  const sqlite = new Database(databasePath);
  sqlite.pragma("journal_mode = WAL");
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS beta_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      organization TEXT NOT NULL DEFAULT '',
      role TEXT NOT NULL DEFAULT '',
      use_case TEXT NOT NULL DEFAULT '',
      consent INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE UNIQUE INDEX IF NOT EXISTS beta_requests_email_unique
      ON beta_requests (email);
  `);

  globalThis.__withindeskSqlite = sqlite;
  return sqlite;
}

export function getDb() {
  const sqlite = openDatabase();
  return drizzle(sqlite, { schema });
}
