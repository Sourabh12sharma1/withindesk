import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, BrainCircuit, FileSearch, Gauge, Network, Route, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { ArchitectureFlow } from "../../components/architecture-flow";

export const metadata: Metadata = {
  title: "Product",
  description: "The WithinDesk private AI workspace, policy gateway, governed agents and adaptive institution layer.",
};

const surfaces = [
  { icon: FileSearch, number: "01", title: "Knowledge workspace", copy: "Ask across permissioned documents, prior work and structured data. Every material claim links back to its source." },
  { icon: ShieldCheck, number: "02", title: "Context gateway", copy: "Classify the request, retrieve the minimum necessary context and redact sensitive fields before an external route is considered." },
  { icon: Bot, number: "03", title: "Governed agents", copy: "Encode a workflow with defined sources, tools, templates, approval points and an accountable owner." },
  { icon: SlidersHorizontal, number: "04", title: "Control plane", copy: "Set roles, model policies, data boundaries and review requirements, then inspect the record left by every request." },
];

export default function ProductPage() {
  return (
    <main>
      <SiteHeader />
      <section className="subhero product-subhero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="site-shell subhero-inner">
          <div><span className="eyebrow"><span /> Product architecture</span><h1>One private desk.<br />Four controlled surfaces.</h1><p>WithinDesk brings institutional knowledge, model access and repeatable workflows into a workspace that security and business teams can understand together.</p></div>
          <div className="subhero-aside"><Gauge size={28} /><strong>Start narrow</strong><p>One institution, one permissioned knowledge set and one workflow that can be evaluated end to end.</p></div>
        </div>
      </section>

      <section className="section">
        <div className="site-shell section-heading"><span className="section-number">01 / Product surfaces</span><h2>The interface is simple.<br />The controls are not hidden.</h2></div>
        <div className="site-shell product-surface-list">
          {surfaces.map((surface) => { const Icon = surface.icon; return (
            <article key={surface.title}><div className="surface-number">{surface.number}</div><Icon size={24} /><div><h3>{surface.title}</h3><p>{surface.copy}</p></div><ArrowRight size={18} /></article>
          ); })}
        </div>
      </section>

      <section className="section product-flow-section">
        <div className="site-shell section-heading"><span className="section-number">02 / Request flow</span><h2>The model is one step,<br />not the whole product.</h2><p>Policy, retrieval, routing, evidence and review surround every model call.</p></div>
        <div className="site-shell wide-shell"><ArchitectureFlow /></div>
      </section>

      <section className="section adaptive-section" id="adaptive-layer">
        <div className="site-shell adaptive-grid">
          <div><span className="section-number light">03 / Adaptive institution layer</span><h2>A private system that learns what “good” means here.</h2><p>Approved outputs, corrections, templates and task-level evaluations create a company-specific behavior layer. That layer can improve routing and smaller private models without turning customer data into a shared training pool.</p></div>
          <div className="adaptive-stack">
            <div><span>04</span><strong>Institution-specific behavior</strong><small>Preferred structure, standards and workflows</small></div>
            <div><span>03</span><strong>Task evaluations</strong><small>Accuracy, citation coverage and reviewer outcome</small></div>
            <div><span>02</span><strong>Approved feedback</strong><small>Corrections selected by authorized users</small></div>
            <div><span>01</span><strong>Permissioned knowledge</strong><small>Sources remain scoped to the institution</small></div>
          </div>
        </div>
      </section>

      <section className="section model-section">
        <div className="site-shell model-grid">
          <div className="model-diagram">
            <div className="model-input"><Network size={19} /> Institution request</div>
            <div className="model-router"><Route size={21} /><strong>Policy router</strong><span>risk · cost · quality · residency</span></div>
            <div className="model-options"><span>Local model</span><span>Private deployment</span><span>Approved API</span></div>
          </div>
          <div><span className="section-number">04 / Model strategy</span><h2>Use the right intelligence path for the work.</h2><p>Routine retrieval may stay local. Complex reasoning can use an approved frontier model after context minimization. Sensitive workflows can be restricted to private deployments.</p><ul className="clean-list"><li><BrainCircuit size={17} /> Provider-agnostic model policy</li><li><ShieldCheck size={17} /> External context minimization</li><li><Gauge size={17} /> Cost and quality telemetry</li></ul></div>
        </div>
      </section>

      <section className="section roadmap-section">
        <div className="site-shell section-heading"><span className="section-number">05 / Private beta scope</span><h2>What we are proving first.</h2></div>
        <div className="site-shell roadmap-grid">
          <article className="roadmap-now"><span>Private beta</span><h3>Knowledge + policy + evidence</h3><ul><li>Invite-only organization workspace</li><li>Document ingestion and permissioned search</li><li>Source citations and answer trace</li><li>Sensitive-context redaction preview</li><li>One finance agent workflow</li><li>Admin policy and audit view</li></ul></article>
          <article><span>Next</span><h3>Deployment + integrations</h3><ul><li>SSO and automated provisioning</li><li>Drive, SharePoint and data-room connectors</li><li>Customer-managed model credentials</li><li>Single-tenant and VPC options</li></ul></article>
          <article><span>Later</span><h3>Institution model layer</h3><ul><li>Evaluation-driven model routing</li><li>Approved-feedback adaptation</li><li>Workflow simulation and assurance</li><li>Private specialist model families</li></ul></article>
        </div>
        <div className="site-shell center-action"><Link className="button" href="/demo">Open the interactive MVP <ArrowRight size={17} /></Link></div>
      </section>
      <SiteFooter />
    </main>
  );
}
