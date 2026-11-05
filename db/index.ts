import { usesMysql, saveMysqlBetaRequest } from "./mysql";
import { getSqliteDb, saveSqliteBetaRequest } from "./sqlite";
import type { BetaRequestInput, BetaSaveResult } from "./types";

export { usesMysql } from "./mysql";
export type { BetaRequestInput, BetaSaveResult } from "./types";

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
  return saveSqliteBetaRequest(input);
}

export function getDatabaseKind() {
  return usesMysql() ? "mysql" : "sqlite";
}
