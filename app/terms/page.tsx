import type { Metadata } from "next";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";

export const metadata: Metadata = { title: "Website terms" };

export default function TermsPage() {
  return (
    <main><SiteHeader /><section className="legal-page"><div className="site-shell legal-shell"><span className="section-number">Effective 31 October 2026</span><h1>Website and prototype terms</h1><p className="legal-lede">The WithinDesk website describes a product in private development. Prototype screens and illustrative workflows are provided for evaluation and discussion.</p><h2>No production service commitment</h2><p>Access to this website or submission of a beta request does not create a customer relationship, service-level agreement or guarantee of product access.</p><h2>Illustrative material</h2><p>Names, documents, transactions, responses and audit events shown in the interactive prototype are fictional. They should not be treated as customer results or production capabilities.</p><h2>Security and compliance</h2><p>Roadmap descriptions are design targets. WithinDesk does not claim a certification or regulatory approval unless it is expressly published as achieved.</p><h2>Acceptable use</h2><p>Do not use the public website to submit confidential files, personal data, credentials or regulated information.</p><h2>Changes</h2><p>We may revise the prototype, beta scope and these terms as the product develops.</p></div></section><SiteFooter /></main>
  );
}
