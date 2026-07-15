import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { RapelMessages } from "@/components/RapelMessages"
import { formatHTG } from "@/lib/format"
import { mockRapel } from "@/lib/mock/rapel"

export default function RapelPage() {
  const { member } = mockRapel

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="flex h-[52px] items-center px-(--spacing-screen-x)">
        <Link
          href="/dashboard"
          aria-label="Tounen"
          className="flex h-[52px] w-[52px] items-center justify-center text-ink"
        >
          <ChevronLeft className="size-6" aria-hidden="true" />
        </Link>
        <h1 className="flex-1 text-center font-display text-body font-bold text-ink">
          Voye rapèl
        </h1>
        <div className="w-[52px]" aria-hidden="true" />
      </div>

      <div className="flex-1 px-(--spacing-screen-x) py-(--spacing-stack)">
        <div className="flex items-center gap-3 rounded-(--radius-card) border border-line bg-card p-(--spacing-stack) shadow-card">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-micro font-bold text-primary-foreground">
            {member.initials}
          </span>
          <div className="flex-1">
            <p className="text-body font-bold text-ink">{member.name}</p>
            <p className="text-micro text-ink-soft">
              {member.groupName} · {formatHTG(member.amount)} HTG · reta{" "}
              {member.lateDays} jou
            </p>
          </div>
          <span
            aria-hidden="true"
            className="size-2.5 shrink-0 rounded-full bg-late"
          />
        </div>

        <div className="mt-(--spacing-stack)">
          <RapelMessages />
        </div>
      </div>
    </div>
  )
}
