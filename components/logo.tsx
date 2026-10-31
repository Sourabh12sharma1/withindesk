import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="brand" aria-label="WithinDesk home">
      <span className="brand-mark" aria-hidden="true"><span /></span>
      {!compact && <span>WithinDesk</span>}
    </Link>
  );
}
