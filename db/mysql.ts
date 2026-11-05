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

function env(name: string) {
  return process.env[name]?.trim() || "";
}

export function getMysqlConfig(): MysqlConfig | null {
  const url = env("DATABASE_URL");
  if (url && /^mysql(s)?:\/\//i.test(url)) {
    return { kind: "url", url };
  }

  const host = env("MYSQL_HOST") || env("DB_HOST");
  const user = env("MYSQL_USER") || env("DB_USER");
  const database = env("MYSQL_DATABASE") || env("DB_NAME") || env("MYSQL_DB");
  const password = env("MYSQL_PASSWORD") || env("DB_PASSWORD");
  if (!host || !user || !database) return null;

  return {
    kind: "options",
    options: {
      host,
      port: Number(env("MYSQL_PORT") || env("DB_PORT") || "3306"),
      user,
      password,
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

export function describeMysqlConfig() {
  const config = getMysqlConfig();
  if (!config) {
    return { configured: false as const };
  }
  if (config.kind === "url") {
    try {
      const parsed = new URL(config.url);
      return {
        configured: true as const,
        host: parsed.hostname,
        port: parsed.port || "3306",
        user: decodeURIComponent(parsed.username),
        database: parsed.pathname.replace(/^\//, ""),
      };
    } catch {
      return { configured: true as const, host: "url", port: "", user: "", database: "" };
    }
  }
  return {
    configured: true as const,
    host: String(config.options.host || ""),
    port: String(config.options.port || 3306),
    user: String(config.options.user || ""),
    database: String(config.options.database || ""),
  };
}

function getPool() {
  if (globalThis.__withindeskMysql) return globalThis.__withindeskMysql;
  const config = getMysqlConfig();
  if (!config) {
    throw new Error(
      "MySQL is not configured. In Hostinger set MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD and MYSQL_DATABASE, then restart the Node.js app."
    );
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
      .then(() => undefined)
      .catch((error) => {
        globalThis.__withindeskMysqlReady = undefined;
        throw error;
      });
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

export async function pingMysql() {
  const summary = describeMysqlConfig();
  if (!summary.configured) {
    return { ok: false as const, error: "MySQL environment variables are missing." };
  }
  try {
    await ensureSchema();
    const pool = getPool();
    const [rows] = await pool.query("SELECT COUNT(*) AS total FROM beta_requests");
    const total = Array.isArray(rows) && rows[0] && typeof rows[0] === "object" && "total" in rows[0]
      ? Number((rows[0] as { total: number }).total)
      : 0;
    return { ok: true as const, table: "beta_requests", total };
  } catch (error) {
    const message = error instanceof Error ? error.message : "MySQL connection failed.";
    return { ok: false as const, error: message };
  }
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
