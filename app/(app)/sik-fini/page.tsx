import Link from "next/link"
import { Medal, Trophy } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScreenState } from "@/components/ScreenState"
import { formatHTG } from "@/lib/format"
import { mockSikFini } from "@/lib/mock/sikFini"

type SikFiniPageProps = {
  searchParams: Promise<{ state?: string }>
}

export default async function SikFiniPage({
  searchParams,
}: SikFiniPageProps) {
  const { state } = await searchParams
  const {
    groupName,
    cycleLabel,
    monthsCompleted,
    potAmount,
    totalDistributed,
    lastBeneficiary,
    cyclesCompletedAfter,
    level,
  } = mockSikFini

  if (state === "error") {
    return (
      <div className="flex min-h-dvh flex-col bg-background">
        <ScreenState
          title="Nou pa ka konfime fen sik la"
          description="Tcheke koneksyon ou, epi eseye ankò."
          actionLabel="Eseye ankò"
          actionHref="/sik-fini"
        />
      </div>
    )
  }

  if (state === "empty") {
    return (
      <div className="flex min-h-dvh flex-col bg-background">
        <ScreenState
          title="Poko gen sik konplete"
          description="Le yon sòl fin fè 10 mwa, selebrasyon final la ap parèt isit la."
          actionLabel="Tounen nan pwofil"
          actionHref="/pwofil"
        />
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="bg-soley-bg px-(--spacing-screen-x) pt-16 pb-6 text-center">
        <div className="mx-auto flex size-[110px] items-center justify-center rounded-full bg-soley">
          <Trophy className="size-12 text-soley-ink" aria-hidden="true" />
        </div>
        <p className="mt-(--spacing-stack) font-display text-h1 font-extrabold text-ink">
          Sik la fini ! 🎉
        </p>
        <p className="mt-1 text-micro text-ink-soft">
          {groupName} fin fè {monthsCompleted} mwa — chak manm resevwa pot yo.
        </p>
      </div>

      <div className="flex-1 px-(--spacing-screen-x) py-(--spacing-stack)">
        <Card className="border-dashed p-(--spacing-stack)">
          <div className="flex justify-between border-b border-dashed border-line py-2 text-body">
            <span className="text-ink-soft">Sik la</span>
            <span className="font-bold text-ink">{cycleLabel}</span>
          </div>
          <div className="flex justify-between border-b border-dashed border-line py-2 text-body">
            <span className="text-ink-soft">Pot chak mwa</span>
            <span className="font-bold text-ink">
              {formatHTG(potAmount)} HTG
            </span>
          </div>
          <div className="flex justify-between border-b border-dashed border-line py-2 text-body">
            <span className="text-ink-soft">Total vèse</span>
            <span className="font-bold text-ink">
              {formatHTG(totalDistributed)} HTG
            </span>
          </div>
          <div className="flex justify-between py-2 text-body">
            <span className="text-ink-soft">Dènye benefisyè</span>
            <span className="font-bold text-ink">{lastBeneficiary.name}</span>
          </div>
        </Card>

        <Badge
          variant="outline"
          className="mt-(--spacing-stack) gap-1 rounded-(--radius-chip) border-transparent bg-paid-bg px-3 text-micro font-semibold text-paid"
        >
          <Medal className="size-3" aria-hidden="true" />
          {cyclesCompletedAfter}yèm sik konplete · Nivo {level}
        </Badge>

        <div className="mt-(--spacing-stack) flex flex-col gap-2.5">
          <Button
            render={<Link href="/pwofil" />}
            className="h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold"
          >
            Gade pwofil ou
          </Button>
          <Button
            render={<Link href="/akey" />}
            variant="outline"
            className="h-[52px] w-full rounded-(--radius-btn) bg-card font-body text-body font-semibold text-ink"
          >
            Tounen akèy
          </Button>
        </div>
      </div>
    </div>
  )
}
