import Link from "next/link";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-shell footer-grid">
        <div>
          <Logo />
          <p className="footer-note">Private institutional intelligence, kept within.</p>
        </div>
        <div className="footer-links">
          <div>
            <p className="footer-label">Platform</p>
            <Link href="/product">Product</Link>
            <Link href="/demo">MVP demo</Link>
            <Link href="/security">Security</Link>
          </div>
          <div>
            <p className="footer-label">Company</p>
            <Link href="/access">Private beta</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
      <div className="site-shell footer-bottom">
        <span>© 2026 WithinDesk</span>
        <span>Finance-first · Private beta</span>
      </div>
    </footer>
  );
}
