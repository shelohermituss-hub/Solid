import Link from "next/link"
import { ChevronLeft, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MemberAvatar } from "@/components/MemberAvatar"
import { RanplaseManmForm } from "@/components/RanplaseManmForm"
import { mockRanplaseManm } from "@/lib/mock/ranplaseManm"

export default function RanplaseManmPage() {
  const { groupName, member } = mockRanplaseManm

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="flex h-[52px] items-center px-(--spacing-screen-x)">
        <Button
          render={<Link href="/gwoup-ap-fome" aria-label="Tounen" />}
          variant="ghost"
          className="size-[52px] rounded-full p-0 text-ink"
        >
          <ChevronLeft className="size-6" aria-hidden="true" />
        </Button>
        <h1 className="flex-1 text-center font-display text-body font-bold text-ink">
          Ranplase yon manm
        </h1>
        <div className="w-[52px]" aria-hidden="true" />
      </div>

      <div className="flex flex-1 flex-col px-(--spacing-screen-x) py-(--spacing-stack)">
        <p className="text-center text-micro font-bold uppercase tracking-[0.1em] text-ink-soft">
          {groupName}
        </p>

        <Card className="mt-(--spacing-stack) flex-row items-center gap-3 p-(--spacing-stack)">
          <MemberAvatar
            name={member.name}
            initials={member.initials}
            className="size-11"
          />
          <div className="flex-1">
            <p className="text-body font-bold text-ink">{member.name}</p>
            <p className="text-micro text-ink-soft">
              Pozisyon {member.slot} · {member.reasonLabel}
            </p>
          </div>
        </Card>

        <div className="mt-(--spacing-stack) flex items-start gap-2.5 rounded-(--radius-card) bg-primary-bg p-(--spacing-stack)">
          <Info
            className="mt-0.5 size-5 shrink-0 text-primary"
            aria-hidden="true"
          />
          <p className="text-body text-primary">
            {member.name} ap sòti nan pozisyon {member.slot}. Lòt manm yo ap
            gade pozisyon yo menm jan an — sèl plas sa a chanje moun.
          </p>
        </div>

        <div className="mt-(--spacing-stack)">
          <RanplaseManmForm memberName={member.name} slot={member.slot} />
        </div>
      </div>
    </div>
  )
}
