import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";

export const metadata: Metadata = { title: "Privacy notice" };

export default function PrivacyPage() {
  return (
    <main><SiteHeader /><section className="legal-page"><div className="site-shell legal-shell"><span className="section-number">Effective 31 October 2026</span><h1>Private beta privacy notice</h1><p className="legal-lede">This notice covers information submitted through the WithinDesk private-beta form. It does not describe a future production customer agreement.</p><h2>Information we collect</h2><p>We collect the work email, institution, role and use-case information you choose to provide. We do not intentionally collect sensitive customer documents through this website.</p><h2>How we use it</h2><p>We use the information to review private-beta eligibility, contact applicants, plan product discovery and understand institutional requirements.</p><h2>Sharing</h2><p>We do not sell beta-request information. We may use infrastructure providers to host the website and store submissions, subject to their service terms.</p><h2>Retention and requests</h2><p>We retain requests while evaluating the beta and for reasonable follow-up. To request access, correction or deletion, submit a new request through the <Link href="/access">access form</Link> and state the privacy request in the use-case field.</p><h2>Product data</h2><p>Any future use of WithinDesk with institutional data will be governed by separate product terms, security documentation and customer agreements.</p></div></section><SiteFooter /></main>
  );
}
