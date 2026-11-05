import Link from "next/link";
import { ArrowRight, BookOpenCheck, BrainCircuit, FileCheck2, KeyRound, LockKeyhole, Network, ShieldCheck, Waypoints } from "lucide-react";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { ProductDemo } from "../components/product-demo";
import { ArchitectureFlow, HeroStack } from "../components/visuals";
import { BetaAccessForm } from "../components/beta-access-form";
import { Tilt } from "../components/tilt";

function SectionHead({ num, title, lede }: { num: string; title: React.ReactNode; lede?: string }) {
  return (
    <div className="mb-12 max-w-2xl">
      <span className="eyebrow">{num}</span>
      <h2 className="mt-3 text-4xl leading-tight md:text-5xl">{title}</h2>
      {lede && <p className="mt-4 text-lg text-muted-foreground">{lede}</p>}
    </div>
  );
}

const capabilities = [
  { icon: BookOpenCheck, title: "Answers with evidence", copy: "Search CIMs, LBO models and past IC memos; every answer links to the exact source." },
  { icon: ShieldCheck, title: "MNPI-aware context", copy: "Detect sensitive deal data, strip what is unnecessary and enforce a route before any model sees it." },
  { icon: Waypoints, title: "Governed deal agents", copy: "Turn screening, comps and memo drafting into agents with approvals and audit records." },
  { icon: BrainCircuit, title: "Adaptive model layer", copy: "Route work across local, private and approved frontier models, then learn from partner feedback." },
];

const stats = [["$10–500M", "Target EV range"], ["1,284", "Docs per data room"], ["−62%", "Time to first IC draft"], ["100%", "Answers source-cited"]];

export default function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden bg-hero">
          <div className="grid-floor pointer-events-none absolute inset-x-0 bottom-0 h-96 opacity-70" aria-hidden />
          <div className="shell relative grid items-center gap-12 py-20 lg:grid-cols-[1.1fr_1fr] lg:py-28">
            <div>
              <span className="eyebrow">● Mid-market PE · Private credit · Investment banking</span>
              <h1 className="mt-5 text-5xl leading-[1.02] md:text-7xl">Deal intelligence, kept <em className="text-gold">within.</em></h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">WithinDesk is a private AI deal desk for mid-market investors, lenders and financial services teams. Search precedent deals, build comps, screen opportunities and draft IC memos — without sending your data room to a public model.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/access" className="btn-3d">Request private beta <ArrowRight size={17} /></Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-5 font-mono text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><LockKeyhole size={13} /> Permission-aware retrieval</span>
                <span className="flex items-center gap-1.5"><FileCheck2 size={13} /> Source-backed answers</span>
                <span className="flex items-center gap-1.5"><KeyRound size={13} /> Whitelist access</span>
              </div>
            </div>
            <HeroStack />
          </div>
          <div className="shell relative grid grid-cols-2 gap-4 pb-16 md:grid-cols-4">
            {stats.map(([v, l]) => (
              <div key={l} className="card-3d p-5"><p className="font-display text-3xl text-accent">{v}</p><p className="mt-1 font-mono text-xs uppercase text-muted-foreground">{l}</p></div>
            ))}
          </div>
        </section>

        <section className="py-20">
          <div className="shell">
            <div className="mb-6 flex justify-between font-mono text-xs text-muted-foreground"><span>Product preview</span><span>Interactive prototype · Illustrative data</span></div>
            <div style={{ perspective: "2000px" }}><div className="transition-transform duration-700 hover:[transform:rotateX(0deg)] md:[transform:rotateX(8deg)]"><ProductDemo /></div></div>
          </div>
        </section>

        <section className="py-20">
          <div className="shell">
            <SectionHead num="02 / The constraint" title={<>Deal work is private.<br />Most AI was not built that way.</>} lede="Mid-market funds, lenders and bankers don't need another chatbot. They need an intelligence layer that respects NDAs, permissions and IC review." />
            <div className="grid gap-5 md:grid-cols-3">
              {[["Knowledge is fragmented", "Data rooms, LBO models, prior IC memos and portfolio KPIs sit in silos that no one can search as one trusted memory."], ["Public models see too much", "Associates either avoid AI or paste MNPI into tools never designed around fund controls."], ["Generic output isn't IC-ready", "A fluent answer still needs your sources, templates, return thresholds and an accountable partner."]].map(([t, c], i) => (
                <Tilt key={t}><article className="card-3d h-full p-7"><span className="font-mono text-xs text-accent">0{i + 1}</span><h3 className="mt-4 text-2xl">{t}</h3><p className="mt-3 text-muted-foreground">{c}</p></article></Tilt>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="shell">
            <SectionHead num="03 / Request architecture" title="One request. Five controlled decisions." lede="WithinDesk sits between your deal team, firm knowledge and whichever model is approved for the task." />
            <ArchitectureFlow />
            <div className="card-3d mt-8 flex gap-4 p-6"><LockKeyhole className="shrink-0 text-primary" /><div><strong>The boundary is the product.</strong><p className="text-muted-foreground">Data-room files stay in your controlled workspace. Only approved excerpts can move to an external model route.</p></div></div>
          </div>
        </section>

        <section className="py-20">
          <div className="shell">
            <SectionHead num="04 / Platform" title="A private desk for deal work." lede="Start with reliable knowledge access. Add agents only where permissions, evidence and review stay visible." />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {capabilities.map((c, i) => { const Icon = c.icon; return (
                <Tilt key={c.title}><article className="card-3d h-full p-6"><div className="flex justify-between"><span className="font-mono text-xs text-accent">0{i + 1}</span><Icon className="text-primary" /></div><h3 className="mt-6 text-xl">{c.title}</h3><p className="mt-2 text-sm text-muted-foreground">{c.copy}</p></article></Tilt>
              ); })}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/product" className="btn-ghost-3d">Platform architecture <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="shell card-3d grid items-center gap-10 p-10 md:grid-cols-2">
            <div>
              <span className="eyebrow">05 / Compounding advantage</span>
              <h2 className="mt-3 text-4xl md:text-5xl">Each fund becomes more itself.</h2>
              <p className="mt-4 text-muted-foreground">The edge isn't a generic model. It's your private system of approved memos, deal traces, return outcomes and policies that makes every future deal sharper.</p>
              <Link href="/product#adaptive-layer" className="btn-3d mt-6">Explore the adaptive layer <ArrowRight size={17} /></Link>
            </div>
            <div className="relative mx-auto grid h-72 w-72 place-items-center" style={{ perspective: "800px" }}>
              <div className="animate-orbit absolute inset-0 rounded-full border-2 border-primary/40 shadow-[var(--shadow-glow)]" />
              <div className="card-3d z-10 p-6 text-center"><Network className="mx-auto text-primary" /><strong className="mt-2 block">Fund model</strong><span className="font-mono text-xs text-muted-foreground">private · evaluated · governed</span></div>
              {["Approved memos", "Policy decisions", "Partner feedback", "Return outcomes"].map((n, i) => (
                <span key={n} className="absolute rounded-full border border-border bg-card px-3 py-1 text-xs shadow-[var(--shadow-3d)]" style={{ transform: `rotate(${i * 90}deg) translateY(-140px) rotate(-${i * 90}deg)` }}>{n}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="shell grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="eyebrow">06 / Private beta</span>
              <h2 className="mt-3 text-4xl md:text-5xl">Bring one live deal workflow.</h2>
              <p className="mt-4 text-muted-foreground">We're onboarding a limited number of lower- and core-mid-market sponsors, lenders and advisors as design partners.</p>
              <Link href="/security" className="mt-6 inline-flex items-center gap-2 text-primary">Review the security design <ArrowRight size={16} /></Link>
            </div>
            <div className="card-3d p-7"><BetaAccessForm compact /></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
