import Link from "next/link";
import { Logo } from "./logo";

const ticks = [
  ["MID-MKT EV/EBITDA", "9.8x", "+0.4"],
  ["PRIVATE CREDIT SPREAD", "S+585", "-12bp"],
  ["DRY POWDER (LMM)", "$412B", "+3.1%"],
  ["ADD-ON SHARE", "71%", "+2.0"],
  ["UNITRANCHE LEVERAGE", "5.2x", "+0.1"],
  ["DEAL CYCLE (DAYS)", "148", "-9"],
  ["SECONDARIES VOL.", "$162B", "+18%"],
] as const;

function Ticker() {
  const row = [...ticks, ...ticks];
  return (
    <div className="overflow-hidden border-y border-border bg-surface/80 font-mono text-[11px]" aria-label="Illustrative mid-market indicators">
      <div className="animate-ticker flex w-max gap-10 py-2">
        {row.map(([k, v, d], i) => (
          <span key={i} className="flex gap-2 whitespace-nowrap">
            <span className="text-muted-foreground">{k}</span>
            <span className="text-foreground">{v}</span>
            <span className={d.startsWith("-") ? "text-loss" : "text-gain"}>{d}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function SiteHeader() {
  const nav = "text-sm text-muted-foreground transition-colors hover:text-foreground";
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="shell flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          <Link href="/product" className={nav}>Platform</Link>
          <Link href="/security" className={nav}>Security</Link>
          <Link href="/demo" className={nav}>Demo</Link>
        </nav>
        <Link href="/access" className="btn-3d !py-2 text-sm">Request access</Link>
      </div>
      <Ticker />
    </header>
  );
}
