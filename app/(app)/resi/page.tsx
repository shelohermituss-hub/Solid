import Link from "next/link"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScreenState } from "@/components/ScreenState"
import { formatHTG } from "@/lib/format"
import { mockResi } from "@/lib/mock/resi"

type ResiPageProps = {
  searchParams: Promise<{ state?: string }>
}

export default async function ResiPage({ searchParams }: ResiPageProps) {
  const { state } = await searchParams
  const { amount, groupLabel, date, reference, beneficiaryMessage } =
    mockResi

  if (state === "error") {
    return (
      <div className="flex min-h-dvh flex-col bg-background">
        <ScreenState
          title="Nou pa ka verifye resi a"
          description="Tcheke koneksyon ou, epi eseye ankò."
          actionLabel="Eseye ankò"
          actionHref="/resi"
        />
      </div>
    )
  }

  if (state === "empty") {
    return (
      <div className="flex min-h-dvh flex-col bg-background">
        <ScreenState
          title="Pa gen resi pou montre"
          description="Ou poko fè yon peman kounye a."
          actionLabel="Tounen akèy"
          actionHref="/akey"
        />
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="bg-paid-bg px-(--spacing-screen-x) pt-16 pb-6 text-center">
        <div className="mx-auto flex size-[110px] items-center justify-center rounded-full bg-paid animate-[pop_0.5s_cubic-bezier(0.2,1.6,0.4,1)] motion-reduce:animate-none">
          <Check className="size-12 text-paper" aria-hidden="true" />
        </div>
        <p className="mt-(--spacing-stack) font-display text-h1 font-extrabold text-ink">
          Kotizasyon w antre !
        </p>
        <p className="mt-1 text-micro text-ink-soft">{beneficiaryMessage}</p>
      </div>

      <div className="flex-1 px-(--spacing-screen-x) py-(--spacing-stack)">
        <Card className="border-dashed p-(--spacing-stack)">
          <div className="flex justify-between border-b border-dashed border-line py-2 text-body">
            <span className="text-ink-soft">Montan</span>
            <span className="font-bold text-ink">{formatHTG(amount)} HTG</span>
          </div>
          <div className="flex justify-between border-b border-dashed border-line py-2 text-body">
            <span className="text-ink-soft">Sòl</span>
            <span className="font-bold text-ink">{groupLabel}</span>
          </div>
          <div className="flex justify-between border-b border-dashed border-line py-2 text-body">
            <span className="text-ink-soft">Dat</span>
            <span className="font-bold text-ink">{date}</span>
          </div>
          <div className="flex justify-between border-b border-dashed border-line py-2 text-body">
            <span className="text-ink-soft">Referans MonCash</span>
            <span className="font-mono text-small font-semibold text-ink">{reference}</span>
          </div>
          <div className="flex justify-between py-2 text-body">
            <span className="text-ink-soft">Estati</span>
            <span className="font-bold text-paid">Konfime ✓</span>
          </div>
        </Card>

        <Button
          type="button"
          className="mt-(--spacing-stack) h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold"
        >
          Pataje resi a
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
