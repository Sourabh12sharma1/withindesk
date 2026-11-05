"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Card that tilts in 3D toward the pointer. */
export function Tilt({ children, className, max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  function move(e: React.PointerEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * max}deg) rotateX(${-y * max}deg) translateZ(0)`;
  }
  function leave() {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateY(0) rotateX(0)";
  }
  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={cn("transition-transform duration-200 ease-out will-change-transform", className)}>
      {children}
    </div>
  );
}
