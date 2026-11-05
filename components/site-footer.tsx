import Link from "next/link";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="shell grid gap-10 py-14 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">Private deal intelligence for mid-market investors, lenders and investment banking teams — kept within your firm.</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <p className="eyebrow mb-2">Platform</p>
          <Link href="/product" className="text-muted-foreground hover:text-foreground">Platform</Link>
          <Link href="/demo" className="text-muted-foreground hover:text-foreground">Deal desk demo</Link>
          <Link href="/security" className="text-muted-foreground hover:text-foreground">Security</Link>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <p className="eyebrow mb-2">Company</p>
          <Link href="/access" className="text-muted-foreground hover:text-foreground">Private beta</Link>
          <Link href="/privacy" className="text-muted-foreground hover:text-foreground">Privacy</Link>
          <Link href="/terms" className="text-muted-foreground hover:text-foreground">Terms</Link>
        </div>
      </div>
      <div className="shell flex justify-between border-t border-border py-5 font-mono text-xs text-muted-foreground">
        <span>© 2026 WithinDesk</span>
        <span>Mid-market PE · Private credit · Investment banking</span>
      </div>
    </footer>
  );
}
