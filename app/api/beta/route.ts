import { eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { betaRequests } from "../../../db/schema";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
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

    const db = getDb();
    const existing = await db
      .select({ id: betaRequests.id })
      .from(betaRequests)
      .where(eq(betaRequests.email, email))
      .limit(1);

    if (existing.length) {
      return Response.json({ ok: true, duplicate: true });
    }

    await db.insert(betaRequests).values({ email, organization, role, useCase, consent });
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    const unavailable = message.includes("no such table") || message.includes("D1 binding");
    return Response.json(
      {
        error: unavailable
          ? "Beta access is being configured. Please try again shortly."
          : "We could not save your request. Please try again.",
      },
      { status: 500 }
    );
  }
}
