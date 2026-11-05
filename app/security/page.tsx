import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Eye, FileKey2, Fingerprint, KeyRound, LockKeyhole, ScanEye, ShieldCheck } from "lucide-react";
import { Page, SectionHead, SubHero } from "../../components/chrome";
import { Tilt } from "../../components/tilt";

export const metadata: Metadata = {
  title: "Security",
  description: "WithinDesk security principles, private-beta control scope and enterprise deployment path for investment firms.",
};

const principles = [
  { icon: Fingerprint, title: "Identity before intelligence", copy: "Every request starts with a verified user, fund, role and deal workspace." },
  { icon: FileKey2, title: "Minimum necessary context", copy: "Retrieve only the excerpts needed instead of moving whole data rooms into a prompt." },
  { icon: ScanEye, title: "Inspect before routing", copy: "Detect and mask MNPI and personal data before any approved external model sees context." },
  { icon: Eye, title: "Trace every decision", copy: "Record sources, policy outcome, route, reviewer and export event behind the work." },
];

const rows = [
  ["Access", "Invite-only workspace, OTP and basic roles", "Enterprise SSO, SCIM and conditional access"],
  ["Isolation", "Logical tenant and deal-workspace separation", "Dedicated tenant, customer VPC or on-premise"],
  ["Knowledge", "Uploaded sources with workspace permissions", "Permission sync across data-room connectors"],
  ["Model use", "Allowlisted routes and context redaction", "Customer-managed keys and private endpoints"],
  ["Audit", "Request, source, route and review events", "SIEM export, retention policy, investigations"],
  ["Assurance", "Curated evaluation set and human review", "Independent testing and formal compliance program"],
];

export default function SecurityPage() {
  return (
    <Page>
      <SubHero eyebrow="Security design" title="Security before autonomy." copy="Built for firms where an answer is only useful when the data boundary, permission path and reviewer are clear."
        aside={<><ShieldCheck className="text-accent" /><strong className="mt-3 block text-lg">Evidence over badges</strong><p className="mt-1 text-sm text-muted-foreground">We publish what's in the MVP, what depends on deployment, and what's still roadmap.</p></>} />

      <section className="py-20"><div className="shell">
        <SectionHead num="01 / Principles" title={<>The system should reveal<br />why access was allowed.</>} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p) => { const Icon = p.icon; return <Tilt key={p.title}><article className="card-3d h-full p-6"><Icon className="text-primary" /><h3 className="mt-4 text-xl">{p.title}</h3><p className="mt-2 text-sm text-muted-foreground">{p.copy}</p></article></Tilt>; })}
        </div>
      </div></section>

      <section className="py-20"><div className="shell grid items-center gap-12 md:grid-cols-2">
        <div><span className="eyebrow">02 / Data boundary</span><h2 className="mt-3 text-4xl md:text-5xl">Private by default.<br />External by policy.</h2><p className="mt-4 text-muted-foreground">Data rooms and the permission index sit inside your boundary. If an approved external model is needed, the gateway prepares a minimum-context request and records what left.</p></div>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3" style={{ perspective: "1000px" }}>
          <div className="card-3d space-y-2 p-4 text-sm" style={{ transform: "rotateY(14deg)" }}><p className="eyebrow">Fund boundary</p>{[[LockKeyhole, "Data room"], [KeyRound, "Permissions"], [ShieldCheck, "Policy engine"]].map(([I, t]) => { const Icon = I as typeof KeyRound; return <div key={t as string} className="flex items-center gap-2 rounded border border-border p-2"><Icon size={15} className="text-primary" />{t as string}</div>; })}</div>
          <div className="grid place-items-center rounded-full border border-accent/60 bg-accent/15 p-4 text-center text-xs shadow-[var(--shadow-3d)]"><ScanEye className="text-accent" />Redact<br />+ route</div>
          <div className="card-3d space-y-2 p-4 text-sm" style={{ transform: "rotateY(-14deg)" }}><p className="eyebrow !text-accent">Approved route</p>{["Sanitized context", "Selected model", "Response only"].map((t) => <div key={t} className="rounded border border-border p-2">{t}</div>)}</div>
        </div>
      </div></section>

      <section className="py-20"><div className="shell">
        <SectionHead num="03 / Control plan" title="Private beta target vs. enterprise path." lede="These are design commitments and roadmap targets, not a claim that every control is certified or generally available." />
        <div className="card-3d overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="font-mono text-xs uppercase text-muted-foreground"><tr className="border-b border-border"><th className="p-4">Control</th><th className="p-4">Private beta target</th><th className="p-4">Enterprise path</th></tr></thead>
            <tbody>{rows.map((r) => <tr key={r[0]} className="border-b border-border last:border-0"><td className="p-4 font-semibold">{r[0]}</td><td className="p-4 text-muted-foreground">{r[1]}</td><td className="p-4 text-muted-foreground">{r[2]}</td></tr>)}</tbody>
          </table>
        </div>
      </div></section>

      <section className="py-20"><div className="shell card-3d flex flex-col gap-8 p-10 md:flex-row md:items-center">
        <span className="font-display text-8xl text-accent">≠</span>
        <div><span className="eyebrow">04 / Current status</span><h2 className="mt-3 text-4xl">No certification theater.</h2><p className="mt-4 text-muted-foreground">WithinDesk does not currently claim SOC 2, ISO 27001 or any equivalent certification. The private beta focuses on proving product controls and preparing for independent review. Certifications will be published only once formally achieved.</p></div>
      </div></section>

      <section className="py-20"><div className="shell flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div><h2 className="text-4xl">Have a security requirement?</h2><p className="mt-2 text-muted-foreground">Join as a design partner and help define the evidence your fund needs.</p></div>
        <Link href="/access" className="btn-3d">Request a security review <ArrowRight size={17} /></Link>
      </div></section>
    </Page>
  );
}
