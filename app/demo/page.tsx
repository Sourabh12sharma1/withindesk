import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Page } from "../../components/chrome";
import { ProductDemo } from "../../components/product-demo";

export const metadata: Metadata = {
  title: "Deal desk demo",
  description: "Explore the WithinDesk interactive deal desk: precedent search, IC memo drafting and policy checks with a full request trace.",
};

export default function DemoPage() {
  return (
    <Page>
      <section className="bg-hero py-20"><div className="shell">
        <span className="eyebrow">Interactive prototype</span>
        <h1 className="mt-4 text-5xl leading-tight md:text-6xl">See the request,<br />the answer and the control path.</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">This prototype uses illustrative fund data. It demonstrates the intended MVP workflow, not a live connection to customer systems or production models.</p>
      </div></section>
      <section className="pb-20"><div className="shell"><ProductDemo /></div></section>
      <section className="pb-24"><div className="shell grid gap-10 md:grid-cols-2">
        <div><span className="eyebrow">What this demonstrates</span><h2 className="mt-3 text-4xl">One complete, governed deal loop.</h2></div>
        <div className="space-y-3">
          {["Permissioned retrieval from the deal library", "Source-cited answers with key deal metrics", "MNPI redaction before any external route", "Partner review before export"].map((t) => <p key={t} className="card-3d flex items-center gap-3 p-4"><CheckCircle2 size={18} className="text-primary" />{t}</p>)}
          <div className="flex flex-wrap gap-3 pt-3"><Link href="/access" className="btn-3d">Request access <ArrowRight size={17} /></Link></div>
        </div>
      </div></section>
    </Page>
  );
}
