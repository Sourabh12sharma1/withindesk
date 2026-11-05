import mysql from "mysql2/promise";
import type { BetaRequestInput, BetaSaveResult } from "./types";

declare global {
  // eslint-disable-next-line no-var
  var __withindeskMysql: mysql.Pool | undefined;
  // eslint-disable-next-line no-var
  var __withindeskMysqlReady: Promise<void> | undefined;
}

type MysqlConfig =
  | { kind: "url"; url: string }
  | { kind: "options"; options: mysql.PoolOptions };

const CREATE_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS beta_requests (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(180) NOT NULL,
    organization VARCHAR(160) NOT NULL DEFAULT '',
    role VARCHAR(120) NOT NULL DEFAULT '',
    use_case VARCHAR(900) NOT NULL DEFAULT '',
    consent TINYINT(1) NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY beta_requests_email_unique (email)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
`;

export function getMysqlConfig(): MysqlConfig | null {
  const url = process.env.DATABASE_URL?.trim();
  if (url && /^mysql(s)?:\/\//i.test(url)) {
    return { kind: "url", url };
  }

  const host = process.env.MYSQL_HOST?.trim();
  const user = process.env.MYSQL_USER?.trim();
  const database = process.env.MYSQL_DATABASE?.trim();
  if (!host || !user || !database) return null;

  return {
    kind: "options",
    options: {
      host,
      port: Number(process.env.MYSQL_PORT || 3306),
      user,
      password: process.env.MYSQL_PASSWORD ?? "",
      database,
      waitForConnections: true,
      connectionLimit: 5,
      charset: "utf8mb4",
    },
  };
}

export function usesMysql() {
  return getMysqlConfig() !== null;
}

function getPool() {
  if (globalThis.__withindeskMysql) return globalThis.__withindeskMysql;
  const config = getMysqlConfig();
  if (!config) {
    throw new Error("MySQL is not configured. Set MYSQL_HOST, MYSQL_USER, MYSQL_DATABASE, MYSQL_PASSWORD.");
  }
  const pool =
    config.kind === "url"
      ? mysql.createPool(config.url)
      : mysql.createPool(config.options);
  globalThis.__withindeskMysql = pool;
  return pool;
}

async function ensureSchema() {
  if (!globalThis.__withindeskMysqlReady) {
    globalThis.__withindeskMysqlReady = getPool()
      .query(CREATE_TABLE_SQL)
      .then(() => undefined);
  }
  await globalThis.__withindeskMysqlReady;
}

function isDuplicateError(error: unknown) {
  return Boolean(
    error &&
      typeof error === "object" &&
      "code" in error &&
      (error as { code?: string }).code === "ER_DUP_ENTRY"
  );
}

export async function saveMysqlBetaRequest(input: BetaRequestInput): Promise<BetaSaveResult> {
  await ensureSchema();
  const pool = getPool();

  const [rows] = await pool.execute(
    "SELECT id FROM beta_requests WHERE email = ? LIMIT 1",
    [input.email]
  );
  if (Array.isArray(rows) && rows.length > 0) {
    return { ok: true, duplicate: true };
  }

  try {
    await pool.execute(
      `INSERT INTO beta_requests (email, organization, role, use_case, consent)
       VALUES (?, ?, ?, ?, ?)`,
      [input.email, input.organization, input.role, input.useCase, input.consent ? 1 : 0]
    );
  } catch (error) {
    if (isDuplicateError(error)) {
      return { ok: true, duplicate: true };
    }
    throw error;
  }

  return { ok: true };
}
