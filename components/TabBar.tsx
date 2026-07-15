"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { House, LayoutDashboard, User, Users } from "lucide-react"

import { cn } from "@/lib/utils"

const TABS = [
  { href: "/akey", label: "Akèy", icon: House },
  { href: "/gwoup", label: "Sòl", icon: Users },
  { href: "/dashboard", label: "Jere", icon: LayoutDashboard },
  { href: "/pwofil", label: "Pwofil", icon: User },
] as const

export function TabBar() {
  const pathname = usePathname()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex h-[76px] border-t border-line bg-card">
      {TABS.map((tab) => {
        const active = pathname === tab.href
        const Icon = tab.icon
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-1 text-micro font-semibold",
              active ? "text-primary" : "text-ink-soft"
            )}
            aria-current={active ? "page" : undefined}
          >
            <Icon className="size-5" aria-hidden="true" />
            {tab.label}
          </Link>
        )
      })}
    </nav>
  )
}
