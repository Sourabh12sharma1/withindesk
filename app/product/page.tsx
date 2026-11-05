import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, BrainCircuit, FileSearch, Gauge, Network, Route as RouteIcon, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { Page, SectionHead, SubHero } from "../../components/chrome";
import { ArchitectureFlow } from "../../components/visuals";
import { Tilt } from "../../components/tilt";

export const metadata: Metadata = {
  title: "Platform",
  description: "Deal library, context gateway, governed agents and an adaptive fund layer for mid-market investors, lenders and investment banking teams.",
};

const surfaces = [
  { icon: FileSearch, title: "Deal library", copy: "Ask across CIMs, LBO models, prior IC memos and portfolio data. Every claim links to its source." },
  { icon: ShieldCheck, title: "Context gateway", copy: "Classify the request, retrieve the minimum context and redact MNPI before an external route is considered." },
  { icon: Bot, title: "Governed deal agents", copy: "Encode screening, comps or memo workflows with defined sources, templates, approvals and an owner." },
  { icon: SlidersHorizontal, title: "Control plane", copy: "Set roles, model policies, data boundaries and review rules, then inspect the record of every request." },
];

export default function ProductPage() {
  return (
    <Page>
      <SubHero eyebrow="Platform architecture" title={<>One private deal desk.<br />Four controlled surfaces.</>} copy="WithinDesk brings firm knowledge, model access and repeatable deal workflows into a workspace your deal team and compliance can both trust."
        aside={<><Gauge className="text-accent" /><strong className="mt-3 block text-lg">Start narrow</strong><p className="mt-1 text-sm text-muted-foreground">One fund, one permissioned deal library and one workflow evaluated end to end.</p></>} />

      <section className="py-20"><div className="shell">
        <SectionHead num="01 / Surfaces" title={<>The interface is simple.<br />The controls are not hidden.</>} />
        <div className="grid gap-5 md:grid-cols-2">
          {surfaces.map((s, i) => { const Icon = s.icon; return (
            <Tilt key={s.title}><article className="card-3d flex h-full gap-5 p-7"><span className="font-display text-4xl text-accent">0{i + 1}</span><div><Icon className="text-primary" /><h3 className="mt-3 text-2xl">{s.title}</h3><p className="mt-2 text-muted-foreground">{s.copy}</p></div></article></Tilt>
          ); })}
        </div>
      </div></section>

      <section className="py-20"><div className="shell">
        <SectionHead num="02 / Request flow" title={<>The model is one step,<br />not the whole product.</>} lede="Policy, retrieval, routing, evidence and review surround every model call." />
        <ArchitectureFlow />
      </div></section>

      <section id="adaptive-layer" className="py-20"><div className="shell grid items-center gap-12 md:grid-cols-2">
        <div><span className="eyebrow">03 / Adaptive fund layer</span><h2 className="mt-3 text-4xl md:text-5xl">A private system that learns what "good" means at your fund.</h2><p className="mt-4 text-muted-foreground">Approved memos, corrections, templates and task evaluations build a firm-specific behaviour layer — without turning your deal data into a shared training pool.</p></div>
        <div className="preserve-3d space-y-3" style={{ perspective: "1000px" }}>
          {[["04", "Fund-specific behaviour", "Preferred structure, return hurdles and workflows"], ["03", "Task evaluations", "Accuracy, citation coverage, partner outcome"], ["02", "Approved feedback", "Corrections selected by authorized users"], ["01", "Permissioned knowledge", "Sources stay scoped to the fund"]].map(([n, t, s], i) => (
            <div key={n} className="card-3d flex items-center gap-4 p-5" style={{ transform: `rotateX(18deg) translateZ(${(3 - i) * 10}px)`, marginLeft: i * 14 }}>
              <span className="font-mono text-accent">{n}</span><div><strong>{t}</strong><p className="text-sm text-muted-foreground">{s}</p></div>
            </div>
          ))}
        </div>
      </div></section>

      <section className="py-20"><div className="shell grid items-center gap-12 md:grid-cols-2">
        <div className="card-3d space-y-4 p-7 text-center">
          <div className="rounded-md border border-border p-3"><Network size={18} className="mr-2 inline text-primary" />Deal-team request</div>
          <div className="rounded-md border border-primary/60 bg-primary/10 p-4 shadow-[var(--shadow-glow)]"><RouteIcon className="mx-auto text-primary" /><strong>Policy router</strong><p className="font-mono text-xs text-muted-foreground">risk · cost · quality · residency</p></div>
          <div className="grid grid-cols-3 gap-2 text-xs">{["Local model", "Private deployment", "Approved API"].map((m) => <span key={m} className="rounded-md border border-border p-2">{m}</span>)}</div>
        </div>
        <div><span className="eyebrow">04 / Model strategy</span><h2 className="mt-3 text-4xl">Use the right intelligence path for the work.</h2><p className="mt-4 text-muted-foreground">Routine retrieval stays local. Complex reasoning can use an approved frontier model after context minimization. MNPI-heavy workflows can be locked to private deployments.</p>
          <ul className="mt-6 space-y-2 text-sm">{[[BrainCircuit, "Provider-agnostic model policy"], [ShieldCheck, "External context minimization"], [Gauge, "Cost and quality telemetry"]].map(([I, t]) => { const Icon = I as typeof Gauge; return <li key={t as string} className="flex items-center gap-2"><Icon size={16} className="text-primary" />{t as string}</li>; })}</ul>
        </div>
      </div></section>

      <section className="py-20"><div className="shell">
        <SectionHead num="05 / Private beta scope" title="What we are proving first." />
        <div className="grid gap-5 md:grid-cols-3">
          {[["Private beta", "Knowledge + policy + evidence", ["Invite-only fund workspace", "Data-room ingestion and permissioned search", "Source citations and answer trace", "MNPI redaction preview", "Comps workspace", "Admin policy and audit view"]], ["Next", "Deployment + integrations", ["SSO and automated provisioning", "Datasite, Intralinks, SharePoint connectors", "Customer-managed model credentials", "Single-tenant and VPC options"]], ["Later", "Fund model layer", ["Evaluation-driven routing", "Approved-feedback adaptation", "Portfolio monitoring agents", "Private specialist models"]]].map(([tag, t, items], i) => (
            <Tilt key={tag as string}><article className={`card-3d h-full p-7 ${i === 0 ? "border-primary/60 shadow-[var(--shadow-glow)]" : ""}`}><span className="eyebrow">{tag as string}</span><h3 className="mt-3 text-2xl">{t as string}</h3><ul className="mt-4 space-y-2 text-sm text-muted-foreground">{(items as string[]).map((x) => <li key={x}>— {x}</li>)}</ul></article></Tilt>
          ))}
        </div>
        <Link href="/demo" className="btn-3d mt-10">Open the interactive deal desk <ArrowRight size={17} /></Link>
      </div></section>
    </Page>
  );
}
