import type { Metadata } from "next";
import { CheckCircle2, LockKeyhole } from "lucide-react";
import { Page } from "../../components/chrome";
import { BetaAccessForm } from "../../components/beta-access-form";

export const metadata: Metadata = {
  title: "Request private beta",
  description: "Apply for whitelist access to the WithinDesk private beta for mid-market investors, lenders and investment banking teams.",
};

export default function AccessPage() {
  return (
    <Page>
      <section className="bg-hero py-20"><div className="shell grid gap-12 md:grid-cols-2">
        <div>
          <span className="eyebrow">Whitelist access</span>
          <h1 className="mt-4 text-5xl md:text-6xl">Bring one real deal workflow.</h1>
          <p className="mt-6 text-lg text-muted-foreground">We're onboarding a small number of mid-market sponsors, private credit lenders, investment banking teams and advisors. Access is reviewed firm by firm.</p>
          <ul className="mt-8 space-y-3">
            {["One defined workflow and owner", "A permissioned source set", "Weekly product feedback"].map((t) => <li key={t} className="flex items-center gap-2"><CheckCircle2 size={17} className="text-primary" />{t}</li>)}
            <li className="flex items-center gap-2"><LockKeyhole size={17} className="text-primary" />Controlled beta environment</li>
          </ul>
        </div>
        <div className="card-3d p-8" style={{ transform: "perspective(1200px) rotateY(-4deg)" }}>
          <p className="font-semibold">Private beta application</p>
          <p className="mb-6 text-sm text-muted-foreground">Usually takes under two minutes.</p>
          <BetaAccessForm />
        </div>
      </div></section>
    </Page>
  );
}
