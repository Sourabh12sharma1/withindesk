import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const betaRequests = sqliteTable(
  "beta_requests",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    email: text("email").notNull(),
    organization: text("organization").notNull().default(""),
    role: text("role").notNull().default(""),
    useCase: text("use_case").notNull().default(""),
    consent: integer("consent", { mode: "boolean" }).notNull().default(true),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [uniqueIndex("beta_requests_email_unique").on(table.email)]
);
