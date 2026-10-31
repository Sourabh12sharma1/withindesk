import Link from "next/link";
import { Logo } from "./logo";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-shell header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/product">Product</Link>
          <Link href="/security">Security</Link>
          <Link href="/demo">MVP demo</Link>
        </nav>
        <div className="header-actions">
          <Link className="text-link desktop-only" href="/demo">View prototype</Link>
          <Link className="button button-small" href="/access">Request access</Link>
        </div>
      </div>
    </header>
  );
}
