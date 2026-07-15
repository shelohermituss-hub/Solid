"use client"

import { usePathname } from "next/navigation"

/**
 * Micro-transition de page (DESIGN.md §7 : 150-250ms, ease-out, physique —
 * pas de parallax/glow). Le remount via `key` retrigger l'animation à
 * chaque changement de route.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div
      key={pathname}
      className="flex min-h-full flex-1 flex-col animate-[page-fade-in_200ms_ease-out] motion-reduce:animate-none"
    >
      {children}
    </div>
  )
}
