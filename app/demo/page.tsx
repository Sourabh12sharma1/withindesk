import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { ProductDemo } from "../../components/product-demo";

export const metadata: Metadata = {
  title: "MVP demo",
  description: "Explore the WithinDesk interactive MVP workspace and request trace.",
};

export default function DemoPage() {
  return (
    <main>
      <SiteHeader />
      <section className="demo-page-hero"><div className="site-shell"><span className="eyebrow"><span /> Interactive prototype</span><h1>See the request,<br />the answer and the control path.</h1><p>This prototype uses illustrative institution data. It demonstrates the intended MVP workflow, not a live connection to customer systems or production models.</p></div></section>
      <section className="demo-page-stage"><div className="site-shell wide-shell"><ProductDemo /></div></section>
      <section className="section demo-proof-section"><div className="site-shell demo-proof-grid"><div><span className="section-number">What this demonstrates</span><h2>The investor video should show one complete loop.</h2></div><div className="proof-list"><span><CheckCircle2 size={18} /> A restricted institution workspace</span><span><CheckCircle2 size={18} /> Permissioned retrieval from private sources</span><span><CheckCircle2 size={18} /> Redaction and model-route visibility</span><span><CheckCircle2 size={18} /> Citations, audit event and human approval</span></div></div><div className="site-shell center-action"><Link className="button" href="/access">Request private beta <ArrowRight size={17} /></Link></div></section>
      <SiteFooter />
    </main>
  );
}
