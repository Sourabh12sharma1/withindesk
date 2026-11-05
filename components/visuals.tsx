"use client";

import { Building2, FileLock2, Route, ScanSearch, Sparkles } from "lucide-react";
import { Tilt } from "./tilt";

const steps = [
  { icon: Building2, title: "Deal-team prompt", copy: "User identity, fund, role and task enter the workspace." },
  { icon: FileLock2, title: "Policy gate", copy: "Classify MNPI and sensitive context; apply firm rules." },
  { icon: ScanSearch, title: "Private retrieval", copy: "Retrieve only permissioned excerpts from data rooms and models." },
  { icon: Route, title: "Model route", copy: "Use a local, private or approved frontier model by policy." },
  { icon: Sparkles, title: "Cited answer", copy: "Return an answer with sources, trace and partner review." },
];

export function ArchitectureFlow() {
  return (
    <div className="grid gap-4 md:grid-cols-5" style={{ perspective: "1200px" }}>
      {steps.map((s, i) => {
        const Icon = s.icon;
        return (
          <Tilt key={s.title} max={12}>
            <div className="card-3d relative h-full p-5" style={{ transform: `translateZ(${i * 6}px)` }}>
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <Icon size={22} className="mt-4 text-primary" />
              <h3 className="mt-3 text-lg">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.copy}</p>
            </div>
          </Tilt>
        );
      })}
    </div>
  );
}

/** Isometric stack of floating 3D slabs: data room → policy → model → IC memo. */
export function HeroStack() {
  const layers = [
    { label: "IC memo · cited", val: "+24% IRR", tone: "bg-primary/25 border-primary/60" },
    { label: "Model route", val: "Private", tone: "bg-accent/20 border-accent/60" },
    { label: "Policy gate", val: "MNPI masked", tone: "bg-secondary border-border" },
    { label: "Data room", val: "1,284 docs", tone: "bg-surface border-border" },
  ];
  return (
    <div className="relative mx-auto h-[420px] w-full max-w-md" style={{ perspective: "1400px" }} aria-hidden>
      <div className="animate-orbit absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-primary/30" />
      <div className="preserve-3d absolute inset-0 flex flex-col items-center justify-center" style={{ transform: "rotateX(55deg) rotateZ(-38deg)" }}>
        {layers.map((l, i) => (
          <div
            key={l.label}
            className={`absolute h-44 w-60 rounded-xl border-2 ${l.tone} p-4 shadow-[var(--shadow-3d)] backdrop-blur-sm`}
            style={{ transform: `translateZ(${(layers.length - i) * 48}px)`, animation: `float-y 6s ease-in-out ${i * 0.4}s infinite` }}
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{l.label}</p>
            <p className="mt-2 font-display text-2xl">{l.val}</p>
            <div className="mt-4 flex items-end gap-1">
              {[40, 65, 50, 80, 70, 95].map((h, j) => <span key={j} className="w-4 rounded-sm bg-primary/60" style={{ height: h * 0.4 }} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
