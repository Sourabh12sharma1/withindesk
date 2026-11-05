"use client";

import { useState } from "react";
import { BarChart3, BookOpenCheck, ChevronRight, CircleCheck, FileSpreadsheet, History, LockKeyhole, Search, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const scenarios = [
  {
    key: "precedent", label: "Find a precedent",
    prompt: "Find prior lower-mid-market buyouts in B2B services, $15–40M EBITDA, and summarize entry multiples and the value-creation thesis.",
    answer: "Four relevant precedents found. Project Alder (11.2x entry, $28M EBITDA) is the closest match by revenue mix and buyer universe. Winning theses emphasized recurring service revenue, add-on M&A in fragmented regional markets and margin expansion through procurement.",
    sources: ["Project Alder · IC memo v7 · pp. 14–18", "Project North · LBO model · Returns tab", "2025 fund review · note 08"],
    route: "Private finance model", redaction: "2 portfolio names masked",
    metrics: [["Entry", "11.2x"], ["Gross MOIC", "2.8x"], ["IRR", "24%"]],
  },
  {
    key: "memo", label: "Draft an IC memo",
    prompt: "Draft the market, leverage and risk sections of an IC memo from the data room using our approved format.",
    answer: "A first draft is ready in your IC template. It separates sourced facts from deal-team judgment, models 5.0x unitranche leverage against covenant headroom, flags two missing diligence items and leaves valuation conclusions for partner review.",
    sources: ["Management presentation · pp. 5–31", "Quality of earnings · tabs 2, 6", "IC template · version 4.2"],
    route: "Hybrid: private + approved API", redaction: "PII removed before API call",
    metrics: [["Leverage", "5.0x"], ["FCCR", "1.6x"], ["Headroom", "28%"]],
  },
  {
    key: "policy", label: "Check a policy",
    prompt: "Can this teaser be shared with the co-investor, and what must be removed first?",
    answer: "Sharing is allowed under the NDA after removing employee-level compensation, customer names and the unannounced target name. Compliance approval is required because the draft contains forward-looking projections.",
    sources: ["Co-invest sharing policy · §4.2", "Deal confidentiality SOP · §7", "NDA · co-investor group"],
    route: "Local policy model", redaction: "No external model used",
    metrics: [["NDA", "Active"], ["Redactions", "3"], ["Approver", "CCO"]],
  },
];

export function ProductDemo() {
  const [key, setKey] = useState("precedent");
  const a = scenarios.find((s) => s.key === key) ?? scenarios[0]!;
  return (
    <div className="card-3d overflow-hidden text-sm">
      <div className="flex items-center justify-between border-b border-border bg-background/50 px-5 py-3">
        <div className="flex items-center gap-2 font-semibold"><span className="h-2.5 w-2.5 rounded-full bg-primary shadow-[var(--shadow-glow)]" />WithinDesk</div>
        <div className="hidden items-center gap-1.5 font-mono text-xs text-muted-foreground sm:flex"><LockKeyhole size={12} /> Meridian Capital Partners · Fund III</div>
        <div className="grid h-7 w-7 place-items-center rounded-full bg-accent text-xs font-bold text-accent-foreground">ST</div>
      </div>
      <div className="grid md:grid-cols-[180px_1fr_240px]">
        <aside className="hidden flex-col gap-1 border-r border-border p-4 md:flex">
          <p className="eyebrow mb-2 !text-muted-foreground">Deal desk</p>
          {[[Search, "Ask"], [BookOpenCheck, "Deal library"], [FileSpreadsheet, "Agents"], [BarChart3, "Comps"], [History, "Audit"]].map(([I, l], i) => {
            const Icon = I as typeof Search;
            return <span key={l as string} className={cn("flex items-center gap-2 rounded-md px-2.5 py-2", i === 0 ? "bg-secondary text-foreground" : "text-muted-foreground")}><Icon size={15} />{l as string}</span>;
          })}
          <div className="mt-auto rounded-md border border-primary/30 bg-primary/10 p-3 text-xs"><ShieldCheck size={15} className="mb-1 text-primary" /><strong>Policy active</strong><p className="text-muted-foreground">External sharing limited</p></div>
        </aside>
        <div className="space-y-4 p-5">
          <div className="flex flex-wrap gap-2">
            {scenarios.map((s) => (
              <button key={s.key} onClick={() => setKey(s.key)} className={cn("rounded-full border px-3 py-1.5 text-xs transition", s.key === key ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-button)]" : "border-border text-muted-foreground hover:text-foreground")}>{s.label}</button>
            ))}
          </div>
          <div className="flex gap-3 rounded-lg bg-secondary/60 p-4"><span className="font-mono text-xs text-muted-foreground">YOU</span><p>{a.prompt}</p></div>
          <div className="rounded-lg border border-border bg-background/40 p-4 shadow-inner">
            <div className="mb-2 flex items-center gap-2"><strong>WithinDesk</strong><span className="flex items-center gap-1 text-xs text-gain"><CircleCheck size={12} /> source-backed</span></div>
            <p className="text-muted-foreground">{a.answer}</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {a.metrics.map(([k, v]) => <div key={k} className="rounded-md border border-border bg-card p-2.5 shadow-[var(--shadow-3d)]"><p className="font-mono text-[10px] uppercase text-muted-foreground">{k}</p><p className="font-display text-xl text-accent">{v}</p></div>)}
            </div>
            <div className="mt-4 space-y-1.5">
              <p className="eyebrow !text-muted-foreground">Sources used</p>
              {a.sources.map((s, i) => <div key={s} className="flex items-center gap-2 rounded border border-border px-2.5 py-1.5 text-xs"><b className="text-primary">{i + 1}</b>{s}<ChevronRight size={12} className="ml-auto" /></div>)}
            </div>
          </div>
        </div>
        <aside className="border-t border-border p-5 md:border-t-0 md:border-l">
          <p className="eyebrow !text-muted-foreground">Request trace</p>
          <p className="mt-3 flex items-center gap-1.5 text-gain"><CircleCheck size={14} /> Policy passed</p>
          <dl className="mt-4 space-y-3 text-xs">
            {[["Identity", "Associate · Deal team"], ["Retrieval", "3 permissioned sources"], ["Protection", a.redaction], ["Route", a.route], ["Record", "Audit event WD-1842"]].map(([k, v]) => (
              <div key={k}><dt className="font-mono text-muted-foreground">{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
          <div className="mt-5 rounded-md border border-accent/40 bg-accent/10 p-3 text-xs"><strong>Partner review required</strong><p className="text-muted-foreground">Before export or external sharing</p></div>
        </aside>
      </div>
    </div>
  );
}
