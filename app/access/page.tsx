import type { Metadata } from "next";
import { CheckCircle2, LockKeyhole } from "lucide-react";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { BetaAccessForm } from "../../components/beta-access-form";

export const metadata: Metadata = {
  title: "Request private beta",
  description: "Apply for whitelist access to the WithinDesk private beta.",
};

export default function AccessPage() {
  return (
    <main>
      <SiteHeader />
      <section className="access-page">
        <div className="site-shell access-grid">
          <div className="access-copy"><span className="eyebrow"><span /> Whitelist access</span><h1>Bring one real workflow.</h1><p>We are onboarding a small number of finance and regulated-industry design partners. Access is reviewed institution by institution.</p><div className="access-points"><span><CheckCircle2 size={17} /> One defined workflow and owner</span><span><CheckCircle2 size={17} /> A permissioned source set</span><span><CheckCircle2 size={17} /> Weekly product feedback</span><span><LockKeyhole size={17} /> Controlled beta environment</span></div></div>
          <div className="access-form-card"><div><span>Private beta application</span><small>Usually takes under two minutes.</small></div><BetaAccessForm /></div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
