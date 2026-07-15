import Link from "next/link"
import { CircleX } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScreenState } from "@/components/ScreenState"
import { formatHTG } from "@/lib/format"
import { mockPeymanEchwe } from "@/lib/mock/peymanEchwe"

type PeymanEchwePageProps = {
  searchParams: Promise<{ state?: string }>
}

export default async function PeymanEchwePage({
  searchParams,
}: PeymanEchwePageProps) {
  const { state } = await searchParams
  const { solName, cycle, amount, reasonLabel } = mockPeymanEchwe

  if (state === "error") {
    return (
      <div className="flex min-h-dvh flex-col bg-background">
        <ScreenState
          title="Nou pa ka chaje detay echèk la"
          description="Tcheke koneksyon ou, epi eseye ankò."
          actionLabel="Eseye ankò"
          actionHref="/peman-echwe"
        />
      </div>
    )
  }

  if (state === "empty") {
    return (
      <div className="flex min-h-dvh flex-col bg-background">
        <ScreenState
          title="Pa gen peman ki echwe"
          description="Ou pa gen okenn tantativ peman ki pa pase kounye a."
          actionLabel="Tounen akèy"
          actionHref="/akey"
        />
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="bg-late-bg px-(--spacing-screen-x) pt-16 pb-6 text-center">
        <div className="mx-auto flex size-[110px] items-center justify-center rounded-full bg-late">
          <CircleX className="size-12 text-paper" aria-hidden="true" />
        </div>
        <p className="mt-(--spacing-stack) font-display text-h1 font-extrabold text-ink">
          Peman an pa pase
        </p>
        <p className="mt-1 text-micro text-ink-soft">
          Tcheke balans MonCash ou, epi eseye ankò.
        </p>
      </div>

      <div className="flex-1 px-(--spacing-screen-x) py-(--spacing-stack)">
        <Card className="border-dashed p-(--spacing-stack)">
          <div className="flex justify-between border-b border-dashed border-line py-2 text-body">
            <span className="text-ink-soft">Montan</span>
            <span className="font-bold text-ink">{formatHTG(amount)} HTG</span>
          </div>
          <div className="flex justify-between border-b border-dashed border-line py-2 text-body">
            <span className="text-ink-soft">Sòl</span>
            <span className="font-bold text-ink">
              {solName} — mwa {cycle.current}/{cycle.total}
            </span>
          </div>
          <div className="flex justify-between py-2 text-body">
            <span className="text-ink-soft">Poukisa</span>
            <span className="font-bold text-late">{reasonLabel}</span>
          </div>
        </Card>

        <Button
          render={<Link href="/peye" />}
          className="mt-(--spacing-stack) h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold"
        >
          Eseye ankò
        </Button>
        <Button
          render={<Link href="/akey" />}
          variant="outline"
          className="mt-2.5 h-[52px] w-full rounded-(--radius-btn) bg-card font-body text-body font-semibold text-ink"
        >
          Tounen akèy
        </Button>
      </div>
    </div>
  )
}
