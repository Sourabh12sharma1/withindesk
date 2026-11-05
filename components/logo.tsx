import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight" aria-label="WithinDesk home">
      <svg viewBox="0 0 64 64" fill="none" className="h-8 w-8 shrink-0" aria-hidden>
        <rect x="3" y="3" width="58" height="58" rx="17" fill="var(--primary)" />
        <path d="M18 46 27 22" stroke="var(--background)" strokeWidth="6.5" strokeLinecap="round" />
        <path d="M37 46 46 22" stroke="var(--background)" strokeWidth="6.5" strokeLinecap="round" />
      </svg>
      <span className="font-display text-lg">WithinDesk</span>
    </Link>
  );
}
