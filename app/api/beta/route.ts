import { getDatabaseStatus, saveBetaRequest } from "../../../db";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

export async function GET() {
  const status = await getDatabaseStatus();
  return Response.json(
    {
      ok: status.ok,
      stored: status.database,
      table: status.table,
      database: status.name,
      total: status.total,
      error: status.error,
    },
    { status: status.ok ? 200 : 503 }
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const email = clean(body.email, 180).toLowerCase();
    const organization = clean(body.organization, 160);
    const role = clean(body.role, 120);
    const useCase = clean(body.useCase, 900);
    const website = clean(body.website, 200);
    const consent = body.consent === true;

    if (website) {
      return Response.json({ ok: true }, { status: 201 });
    }

    if (!EMAIL_PATTERN.test(email)) {
      return Response.json({ error: "Enter a valid work email." }, { status: 400 });
    }

    if (!consent) {
      return Response.json(
        { error: "Please agree to be contacted about the private beta." },
        { status: 400 }
      );
    }

    const result = await saveBetaRequest({ email, organization, role, useCase, consent });
    const status = await getDatabaseStatus();
    if (result.duplicate) {
      return Response.json({ ok: true, duplicate: true, stored: status.database });
    }
    return Response.json({ ok: true, stored: status.database }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    const unavailable =
      message.includes("no such table") ||
      message.includes("D1 binding") ||
      message.includes("SQLITE_") ||
      message.includes("better-sqlite3") ||
      message.includes("MySQL") ||
      message.includes("ECONNREFUSED") ||
      message.includes("ER_ACCESS_DENIED") ||
      message.includes("ER_BAD_DB_ERROR") ||
      message.includes("not configured");
    return Response.json(
      {
        error: unavailable
          ? message.includes("not configured")
            ? "Hostinger MySQL is not connected yet. Set MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD and MYSQL_DATABASE, then restart the app."
            : "Beta access is being configured. Please try again shortly."
          : "We could not save your request. Please try again.",
      },
      { status: 500 }
    );
  }
}
