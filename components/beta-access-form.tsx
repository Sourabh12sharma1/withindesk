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
      <div className="form-success" role="status">
        <CheckCircle2 size={26} />
        <div>
          <strong>You are on the private-beta list.</strong>
          <p>We review every request and will contact selected institutions directly.</p>
        </div>
      </div>
    );
  }

  return (
    <form className={compact ? "beta-form beta-form-compact" : "beta-form"} onSubmit={submit}>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-row">
        <label>
          Work email
          <input name="email" type="email" placeholder="you@institution.com" required />
        </label>
        {!compact && (
          <label>
            Institution
            <input name="organization" type="text" placeholder="Company or institution" />
          </label>
        )}
      </div>
      {!compact && (
        <>
          <label>
            Your role
            <select name="role" defaultValue="">
              <option value="" disabled>Select your role</option>
              <option>Investment / research</option>
              <option>Risk / compliance</option>
              <option>Technology / security</option>
              <option>Operations</option>
              <option>Founder / executive</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            What would you want WithinDesk to do first?
            <textarea name="useCase" rows={4} placeholder="For example: search prior transactions, draft an IC memo, or answer questions across internal policies." />
          </label>
        </>
      )}
      <label className="consent-row">
        <input name="consent" type="checkbox" required />
        <span>I agree to be contacted about the private beta. See the <Link href="/privacy">privacy notice</Link>.</span>
      </label>
      {status === "error" && <p className="form-error">{message}</p>}
      <button className="button form-button" disabled={status === "submitting"} type="submit">
        {status === "submitting" ? (
          <><Loader2 className="spin" size={17} /> Saving request</>
        ) : (
          <>Request private beta <ArrowRight size={17} /></>
        )}
      </button>
    </form>
  );
}
