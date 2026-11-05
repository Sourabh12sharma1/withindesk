import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

export function SectionHead({ num, title, lede }: { num: string; title: ReactNode; lede?: string }) {
  return (
    <div className="mb-12 max-w-2xl">
      <span className="eyebrow">{num}</span>
      <h2 className="mt-3 text-4xl leading-tight md:text-5xl">{title}</h2>
      {lede && <p className="mt-4 text-lg text-muted-foreground">{lede}</p>}
    </div>
  );
}

export function SubHero({ eyebrow, title, copy, aside }: { eyebrow: string; title: ReactNode; copy: string; aside?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="grid-floor pointer-events-none absolute inset-x-0 bottom-0 h-72 opacity-60" aria-hidden />
      <div className="shell relative grid gap-10 py-20 md:grid-cols-[1.6fr_1fr] md:py-28">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-4 text-5xl leading-[1.05] md:text-6xl">{title}</h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">{copy}</p>
        </div>
        {aside && <div className="card-3d animate-float self-center p-7">{aside}</div>}
      </div>
    </section>
  );
}
