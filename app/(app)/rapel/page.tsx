import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MemberAvatar } from "@/components/MemberAvatar"
import { RapelMessages } from "@/components/RapelMessages"
import { formatHTG } from "@/lib/format"
import { mockRapel } from "@/lib/mock/rapel"

export default function RapelPage() {
  const { member } = mockRapel

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="flex h-[52px] items-center px-(--spacing-screen-x)">
        <Button
          render={<Link href="/dashboard" aria-label="Tounen" />}
          variant="ghost"
          className="size-[52px] rounded-full p-0 text-ink"
        >
          <ChevronLeft className="size-6" aria-hidden="true" />
        </Button>
        <h1 className="flex-1 text-center font-display text-body font-bold text-ink">
          Voye rapèl
        </h1>
        <div className="w-[52px]" aria-hidden="true" />
      </div>

      <div className="flex-1 px-(--spacing-screen-x) py-(--spacing-stack)">
        <Card className="flex-row items-center gap-3 p-(--spacing-stack)">
          <MemberAvatar
            name={member.name}
            initials={member.initials}
            className="size-11"
            fallbackClassName="text-micro"
          />
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
        </Card>

        <div className="mt-(--spacing-stack)">
          <RapelMessages />
        </div>
      </div>
    </div>
  )
}
