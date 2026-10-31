import Link from "next/link";
import { ArrowRight, BookOpenCheck, BrainCircuit, FileCheck2, KeyRound, LockKeyhole, Network, ShieldCheck, Waypoints } from "lucide-react";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { ProductDemo } from "../components/product-demo";
import { ArchitectureFlow } from "../components/architecture-flow";
import { BetaAccessForm } from "../components/beta-access-form";

const capabilities = [
  { icon: BookOpenCheck, title: "Answers with evidence", copy: "Search internal documents and prior work, then return answers linked to the exact source used." },
  { icon: ShieldCheck, title: "Policy-aware context", copy: "Detect sensitive context, remove what is unnecessary, and enforce a route before a model sees the request." },
  { icon: Waypoints, title: "Governed agents", copy: "Turn repeatable workflows into role-specific agents with clear inputs, approvals and audit records." },
  { icon: BrainCircuit, title: "Adaptive model layer", copy: "Route work across local, private and approved frontier models, then learn from institution-approved feedback." },
];

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <section className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="site-shell hero-content">
          <div className="hero-copy">
            <div className="eyebrow"><span /> Finance-first · Private beta</div>
            <h1>Institutional intelligence, kept <em>within.</em></h1>
            <p>WithinDesk is a private AI workspace for regulated teams. Search firm knowledge, work through governed agents, and use the right model without sending every secret to a public system.</p>
            <div className="hero-actions">
              <Link className="button" href="/access">Request private beta <ArrowRight size={17} /></Link>
              <Link className="button button-secondary" href="/demo">Explore the MVP</Link>
            </div>
            <div className="hero-assurance">
              <span><LockKeyhole size={14} /> Permission-aware retrieval</span>
              <span><FileCheck2 size={14} /> Source-backed answers</span>
              <span><KeyRound size={14} /> Whitelist access</span>
            </div>
          </div>
          <div className="hero-principle"><span className="principle-number">01</span><p>AI should enter the institution on the institution&apos;s terms.</p></div>
        </div>
      </section>

      <section className="demo-section">
        <div className="site-shell wide-shell">
          <div className="section-kicker-row"><span>Product preview</span><span>Interactive prototype · Illustrative data</span></div>
          <ProductDemo />
        </div>
      </section>

      <section className="section problem-section">
        <div className="site-shell split-heading">
          <span className="section-number">02 / The constraint</span>
          <div><h2>The work is private.<br />Most AI was not built that way.</h2><p className="section-lede">Banks and critical institutions do not need another general chatbot. They need an intelligence layer that respects data boundaries, permissions and review.</p></div>
        </div>
        <div className="site-shell tension-grid">
          <article><span>01</span><h3>Knowledge is fragmented</h3><p>Deal rooms, shared drives, policies and historical work remain difficult to search as one trusted memory.</p></article>
          <article><span>02</span><h3>Public models see too much</h3><p>Teams either avoid AI or copy sensitive context into tools that were not designed around institutional controls.</p></article>
          <article><span>03</span><h3>Generic output is not firm work</h3><p>A fluent answer still needs the institution&apos;s sources, templates, methods, permissions and accountable reviewer.</p></article>
        </div>
      </section>

      <section className="section architecture-section">
        <div className="site-shell section-heading"><span className="section-number">03 / Request architecture</span><h2>One request. Five controlled decisions.</h2><p>WithinDesk is designed as an intermediary between the user, institutional knowledge and whichever model is approved for the task.</p></div>
        <div className="site-shell wide-shell"><ArchitectureFlow /></div>
        <div className="site-shell boundary-note"><LockKeyhole size={19} /><div><strong>The boundary is the product.</strong><p>Internal source files stay in the institution&apos;s controlled workspace. Only approved excerpts can move to an external model route.</p></div></div>
      </section>

      <section className="section capability-section">
        <div className="site-shell split-heading"><span className="section-number">04 / Product</span><div><h2>A private desk for institutional work.</h2><p className="section-lede">Start with reliable knowledge access. Add agents only where permissions, evidence and review can remain visible.</p></div></div>
        <div className="site-shell capability-grid">
          {capabilities.map((item, index) => { const Icon = item.icon; return <article key={item.title}><div className="capability-top"><span>0{index + 1}</span><Icon size={22} /></div><h3>{item.title}</h3><p>{item.copy}</p></article>; })}
        </div>
        <div className="site-shell center-action"><Link className="text-arrow" href="/product">See the product architecture <ArrowRight size={16} /></Link></div>
      </section>

      <section className="section moat-section">
        <div className="site-shell moat-grid">
          <div className="moat-copy"><span className="section-number light">05 / Compounding advantage</span><h2>Each institution becomes more itself.</h2><p>The defensible layer is not a generic model. It is the private system of approved examples, workflow traces, evaluation results and policies that makes future work more accurate for one institution.</p><Link className="button button-light" href="/product#adaptive-layer">Explore the adaptive layer <ArrowRight size={17} /></Link></div>
          <div className="moat-loop" aria-label="Institution learning loop"><div className="loop-core"><Network size={25} /><strong>Institution model</strong><span>private · evaluated · governed</span></div><div className="loop-node loop-a">Approved work</div><div className="loop-node loop-b">Policy decisions</div><div className="loop-node loop-c">User feedback</div><div className="loop-node loop-d">Task evaluations</div></div>
        </div>
      </section>

      <section className="section security-preview">
        <div className="site-shell security-preview-grid">
          <div className="security-emblem"><ShieldCheck size={46} /><span>Security before autonomy</span></div>
          <div><span className="section-number">06 / Trust</span><h2>Make the controls visible.</h2><p>Every answer should show the identity, sources, protection step, model route and approval requirement behind it.</p><div className="security-bullets"><span>Workspace isolation</span><span>Role-based access</span><span>Redaction policy</span><span>Audit trace</span><span>Human approval</span><span>Deployment choice</span></div><Link className="text-arrow" href="/security">Review the security design <ArrowRight size={16} /></Link></div>
        </div>
      </section>

      <section className="section beta-section">
        <div className="site-shell beta-grid"><div><span className="eyebrow"><span /> Private beta</span><h2>Bring one sensitive workflow.</h2><p>We are starting with finance teams and a limited number of design partners. Tell us where institutional knowledge and AI currently stop meeting.</p></div><BetaAccessForm compact /></div>
      </section>
      <SiteFooter />
    </main>
  );
}
