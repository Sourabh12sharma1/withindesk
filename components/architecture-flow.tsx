import { Building2, FileLock2, Route, ScanSearch, Sparkles } from "lucide-react";

const steps = [
  { icon: Building2, title: "Institution prompt", copy: "User identity, role and task enter the workspace." },
  { icon: FileLock2, title: "Policy gate", copy: "Classify sensitive context and apply institution rules." },
  { icon: ScanSearch, title: "Private retrieval", copy: "Retrieve only permissioned excerpts from internal sources." },
  { icon: Route, title: "Model route", copy: "Use a local, private or approved frontier model by policy." },
  { icon: Sparkles, title: "Cited answer", copy: "Return an answer with sources, trace and human review." },
];

export function ArchitectureFlow() {
  return (
    <div className="architecture-flow" aria-label="WithinDesk request flow">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <div className="flow-step" key={step.title}>
            <div className="flow-index">0{index + 1}</div>
            <Icon size={20} aria-hidden="true" />
            <h3>{step.title}</h3>
            <p>{step.copy}</p>
          </div>
        );
      })}
    </div>
  );
}
