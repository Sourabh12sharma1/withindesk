import { describeMysqlConfig, pingMysql, saveMysqlBetaRequest, usesMysql } from "./mysql";
import { getSqliteDb, saveSqliteBetaRequest } from "./sqlite";
import type { BetaRequestInput, BetaSaveResult } from "./types";

export { usesMysql } from "./mysql";
export type { BetaRequestInput, BetaSaveResult } from "./types";

function isProduction() {
  return process.env.NODE_ENV === "production";
}

/** @deprecated Prefer saveBetaRequest. Kept for SQLite/Drizzle callers. */
export function getDb() {
  if (usesMysql()) {
    throw new Error("getDb() is SQLite-only. Hostinger MySQL is active; use saveBetaRequest().");
  }
  return getSqliteDb();
}

export async function saveBetaRequest(input: BetaRequestInput): Promise<BetaSaveResult> {
  if (usesMysql()) {
    return saveMysqlBetaRequest(input);
  }
  if (isProduction()) {
    throw new Error(
      "MySQL is not configured. In Hostinger set MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD and MYSQL_DATABASE, then restart the Node.js app."
    );
  }
  return saveSqliteBetaRequest(input);
}

export function getDatabaseKind() {
  if (usesMysql()) return "mysql";
  if (isProduction()) return "unconfigured";
  return "sqlite";
}

export async function getDatabaseStatus() {
  const kind = getDatabaseKind();
  const mysql = describeMysqlConfig();
  if (kind === "mysql") {
    const ping = await pingMysql();
    return {
      ok: ping.ok,
      database: "mysql" as const,
      table: "beta_requests",
      host: mysql.configured ? mysql.host : "",
      user: mysql.configured ? mysql.user : "",
      name: mysql.configured ? mysql.database : "",
      total: ping.ok ? ping.total : 0,
      error: ping.ok ? undefined : ping.error,
    };
  }
  return {
    ok: kind === "sqlite",
    database: kind,
    table: "beta_requests",
    host: "",
    user: "",
    name: kind === "sqlite" ? "data/withindesk.sqlite" : "",
    total: 0,
    error:
      kind === "unconfigured"
        ? "Set MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD and MYSQL_DATABASE in Hostinger, then restart."
        : undefined,
  };
}
