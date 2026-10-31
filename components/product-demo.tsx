"use client";

import { useState } from "react";
import { BookOpenCheck, ChevronRight, CircleCheck, FileSpreadsheet, History, LockKeyhole, Search, ShieldCheck } from "lucide-react";

const scenarios = [
  {
    key: "precedent",
    label: "Find a precedent",
    prompt: "Find prior sell-side mandates with a similar revenue profile and summarize the positioning used.",
    answer: "Three relevant precedents were found. Project Alder is the closest match by revenue mix and buyer universe. The winning positioning emphasized recurring service revenue, low customer concentration, and expansion into regulated end-markets.",
    sources: ["Project Alder · CIM v7 · pp. 14–18", "Project North · buyer map · rows 22–61", "2024 mandate review · note 08"],
    route: "Private finance model",
    redaction: "2 client names masked",
  },
  {
    key: "memo",
    label: "Draft an IC memo",
    prompt: "Draft the market and risk sections of an IC memo using the deal-room files and our approved format.",
    answer: "A first draft is ready in the institution template. It separates sourced facts from analyst judgment, flags two missing diligence items, and leaves valuation conclusions for reviewer approval.",
    sources: ["Management presentation · pp. 5–31", "Quality of earnings · tabs 2, 6", "IC template · version 4.2"],
    route: "Hybrid: private + approved API",
    redaction: "PII removed before API call",
  },
  {
    key: "policy",
    label: "Check a policy",
    prompt: "Can this draft be shared with the external adviser, and what must be removed first?",
    answer: "External sharing is allowed after removing employee-level compensation, personal contact details, and the unannounced target name. Legal approval is required because the draft contains forward-looking projections.",
    sources: ["External sharing policy · §4.2", "Deal confidentiality SOP · §7", "Engagement permissions · adviser group"],
    route: "Local policy model",
    redaction: "No external model used",
  },
];

export function ProductDemo() {
  const [activeKey, setActiveKey] = useState("precedent");
  const active = scenarios.find((scenario) => scenario.key === activeKey) ?? scenarios[0];

  return (
    <div className="demo-frame">
      <div className="demo-topbar">
        <div className="demo-wordmark"><span />WithinDesk</div>
        <div className="demo-workspace"><LockKeyhole size={13} /> Meridian Partners · Private workspace</div>
        <div className="demo-user">ST</div>
      </div>
      <div className="demo-body">
        <aside className="demo-sidebar">
          <p className="demo-caption">Workspace</p>
          <button className="active"><Search size={15} /> Ask</button>
          <button><BookOpenCheck size={15} /> Knowledge</button>
          <button><FileSpreadsheet size={15} /> Agents</button>
          <button><History size={15} /> Audit</button>
          <div className="demo-policy-card">
            <ShieldCheck size={17} />
            <div><strong>Policy active</strong><span>External sharing limited</span></div>
          </div>
        </aside>
        <main className="demo-main">
          <div className="demo-intro">
            <span className="eyebrow">Illustrative MVP workspace</span>
            <h2>Ask the institution.</h2>
            <p>Answers come from permissioned sources and show how the request was handled.</p>
          </div>
          <div className="scenario-tabs">
            {scenarios.map((scenario) => (
              <button className={active.key === scenario.key ? "active" : ""} key={scenario.key} onClick={() => setActiveKey(scenario.key)}>
                {scenario.label}
              </button>
            ))}
          </div>
          <div className="prompt-card">
            <div className="prompt-avatar">You</div>
            <p>{active.prompt}</p>
          </div>
          <div className="answer-card">
            <div className="answer-heading"><span className="answer-spark">W</span><strong>WithinDesk</strong><span className="verified"><CircleCheck size={13} /> source-backed</span></div>
            <p className="answer-copy">{active.answer}</p>
            <div className="source-list">
              <span>Sources used</span>
              {active.sources.map((source, index) => (
                <button key={source}><b>{index + 1}</b>{source}<ChevronRight size={13} /></button>
              ))}
            </div>
          </div>
        </main>
        <aside className="trace-panel">
          <p className="demo-caption">Request trace</p>
          <div className="trace-status"><CircleCheck size={15} /> Policy passed</div>
          <dl>
            <div><dt>Identity</dt><dd>Analyst · Deal team</dd></div>
            <div><dt>Retrieval</dt><dd>3 permissioned sources</dd></div>
            <div><dt>Protection</dt><dd>{active.redaction}</dd></div>
            <div><dt>Route</dt><dd>{active.route}</dd></div>
            <div><dt>Record</dt><dd>Audit event WD-1842</dd></div>
          </dl>
          <div className="human-review"><ShieldCheck size={18} /><div><strong>Human review required</strong><span>Before export or external sharing</span></div></div>
        </aside>
      </div>
    </div>
  );
}
