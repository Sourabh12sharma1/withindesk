import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Eye, FileKey2, Fingerprint, KeyRound, LockKeyhole, ScanEye, ShieldCheck } from "lucide-react";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";

export const metadata: Metadata = {
  title: "Security",
  description: "WithinDesk security principles, private-beta control scope and enterprise deployment path.",
};

const principles = [
  { icon: Fingerprint, title: "Identity before intelligence", copy: "Every request starts with a verified user, institution, role and workspace." },
  { icon: FileKey2, title: "Minimum necessary context", copy: "Retrieve only the excerpts needed for the task instead of moving entire files into a model prompt." },
  { icon: ScanEye, title: "Inspect before routing", copy: "Detect and mask sensitive fields before an approved external model can receive context." },
  { icon: Eye, title: "Trace every decision", copy: "Record the sources, policy outcome, route, reviewer and export event behind the work." },
];

const controlRows = [
  ["Access", "Invite-only workspace, OTP and basic roles", "Enterprise SSO, SCIM and conditional access"],
  ["Isolation", "Logical tenant and workspace separation", "Dedicated tenant, customer VPC or on-premise"],
  ["Knowledge", "Uploaded sources with workspace permissions", "Source-permission sync across enterprise connectors"],
  ["Model use", "Allowlisted routes and context redaction", "Customer-managed keys and private model endpoints"],
  ["Audit", "Request, source, route and review events", "SIEM export, retention policy and investigation views"],
  ["Assurance", "Curated evaluation set and human review", "Independent testing and formal compliance program"],
];

export default function SecurityPage() {
  return (
    <main>
      <SiteHeader />
      <section className="subhero security-subhero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="site-shell subhero-inner"><div><span className="eyebrow"><span /> Security design</span><h1>Security before autonomy.</h1><p>WithinDesk is being designed for institutions where an answer is useful only when the data boundary, permission path and reviewer are clear.</p></div><div className="subhero-aside"><ShieldCheck size={29} /><strong>Evidence over badges</strong><p>We publish what is in the MVP, what depends on deployment, and what remains on the enterprise roadmap.</p></div></div>
      </section>

      <section className="section security-principles">
        <div className="site-shell section-heading"><span className="section-number">01 / Principles</span><h2>The system should reveal<br />why access was allowed.</h2></div>
        <div className="site-shell principle-grid">
          {principles.map((principle) => { const Icon = principle.icon; return <article key={principle.title}><Icon size={23} /><h3>{principle.title}</h3><p>{principle.copy}</p></article>; })}
        </div>
      </section>

      <section className="section security-boundary-section">
        <div className="site-shell security-boundary-grid">
          <div><span className="section-number light">02 / Data boundary</span><h2>Private by default.<br />External by policy.</h2><p>The source repository and permission index sit inside the institution boundary. If an approved external model is needed, the gateway prepares a minimum-context request and records what left the boundary.</p></div>
          <div className="boundary-visual">
            <div className="boundary-box private-box"><span>Institution boundary</span><div><LockKeyhole size={18} /> Source files</div><div><KeyRound size={18} /> Permissions</div><div><ShieldCheck size={18} /> Policy engine</div></div>
            <div className="boundary-gate"><ScanEye size={20} /><span>Redact + route</span></div>
            <div className="boundary-box external-box"><span>Approved route</span><div>Sanitized context</div><div>Selected model</div><div>Response only</div></div>
          </div>
        </div>
      </section>

      <section className="section control-plan-section">
        <div className="site-shell section-heading"><span className="section-number">03 / Control plan</span><h2>Private beta target vs. enterprise path.</h2><p>These are design commitments and roadmap targets, not a claim that every control is already certified or generally available.</p></div>
        <div className="site-shell control-table" role="table" aria-label="Security control plan">
          <div className="control-row control-header" role="row"><span>Control</span><span>Private beta target</span><span>Enterprise path</span></div>
          {controlRows.map((row) => <div className="control-row" role="row" key={row[0]}><strong>{row[0]}</strong><span>{row[1]}</span><span>{row[2]}</span></div>)}
        </div>
      </section>

      <section className="section no-theater-section">
        <div className="site-shell no-theater-grid"><div className="no-theater-mark">≠</div><div><span className="section-number">04 / Current status</span><h2>No certification theater.</h2><p>WithinDesk does not currently claim SOC 2, ISO 27001, HIPAA or any equivalent certification. The private beta is focused on proving product controls, documenting the architecture and preparing for independent security review.</p><p className="muted-note">Certification and contractual commitments will be published only after they are formally achieved.</p></div></div>
      </section>

      <section className="section beta-section">
        <div className="site-shell security-cta"><div><h2>Have a security requirement?</h2><p>Join as a design partner and help define the deployment and evidence your institution needs.</p></div><Link className="button" href="/access">Request a security review <ArrowRight size={17} /></Link></div>
      </section>
      <SiteFooter />
    </main>
  );
}
