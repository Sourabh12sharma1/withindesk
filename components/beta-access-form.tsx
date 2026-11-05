"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

export function BetaAccessForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");
    const form = new FormData(event.currentTarget);
    const payload = {
      email: form.get("email"),
      organization: form.get("organization"),
      role: form.get("role"),
      useCase: form.get("useCase"),
      website: form.get("website"),
      consent: form.get("consent") === "on",
    };

    try {
      const response = await fetch("/api/beta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Unable to submit request.");
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to submit request.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-primary/40 bg-primary/10 p-5" role="status">
        <CheckCircle2 size={22} className="text-primary" />
        <div className="mt-3">
          <strong>You are on the private-beta list.</strong>
          <p className="mt-1 text-sm text-muted-foreground">We review every request and contact selected firms directly.</p>
        </div>
      </div>
    );
  }

  const fieldClass = "mt-1.5 w-full rounded-md border border-input bg-background/60 px-3 py-2.5 text-sm shadow-inner outline-none focus:border-primary";

  return (
    <form onSubmit={submit}>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Work email
          <input name="email" type="email" placeholder="you@fund.com" required className={fieldClass} />
        </label>
        {!compact && (
          <label className="block text-sm font-medium">
            Firm
            <input name="organization" type="text" placeholder="Company or fund" className={fieldClass} />
          </label>
        )}
      </div>
      {!compact && (
        <>
          <label className="mt-4 block text-sm font-medium">
            Your role
            <select name="role" defaultValue="" className={fieldClass}>
              <option value="" disabled>Select your role</option>
              <option>Deal team / investment professional</option>
              <option>Private credit / underwriting</option>
              <option>Investment banking / financial services</option>
              <option>Risk / compliance</option>
              <option>Technology / security</option>
              <option>Portfolio operations</option>
              <option>Partner / executive</option>
              <option>Other</option>
            </select>
          </label>
          <label className="mt-4 block text-sm font-medium">
            What would you want WithinDesk to do first?
            <textarea name="useCase" rows={4} placeholder="E.g. search prior LBO models, draft an IC memo, screen a CIM against our mandate." className={fieldClass} />
          </label>
        </>
      )}
      <label className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
        <input name="consent" type="checkbox" required className="mt-0.5 accent-[var(--primary)]" />
        <span>I agree to be contacted about the private beta. See the <Link href="/privacy" className="text-primary underline">privacy notice</Link>.</span>
      </label>
      {status === "error" && <p className="mt-3 text-sm text-loss">{message}</p>}
      <button className="btn-3d mt-5 w-full justify-center" disabled={status === "submitting"} type="submit">
        {status === "submitting" ? (
          <><Loader2 className="animate-spin" size={17} /> Saving request</>
        ) : (
          <>Request private beta <ArrowRight size={17} /></>
        )}
      </button>
    </form>
  );
}
