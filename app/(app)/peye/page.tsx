import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PayButton } from "@/components/PayButton"
import { formatHTG } from "@/lib/format"
import { mockKotizasyon } from "@/lib/mock/peye"

type PeyePageProps = {
  searchParams: Promise<{ mock?: string; moncash?: string }>
}

export default async function PeyePage({ searchParams }: PeyePageProps) {
  const params = await searchParams
  const forcedOutcome =
    params.mock === "error" || params.mock === "success"
      ? params.mock
      : undefined
  const moncashConnected =
    params.moncash === "disconnected" ? false : mockKotizasyon.moncash.connected

  const { solName, cycle, amount, dueDate, moncash } = mockKotizasyon

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="flex h-[52px] items-center px-(--spacing-screen-x)">
        <Button
          render={<Link href="/akey" aria-label="Tounen" />}
          variant="ghost"
          className="size-[52px] rounded-full p-0 text-ink"
        >
          <ChevronLeft className="size-6" aria-hidden="true" />
        </Button>
        <h1 className="flex-1 text-center font-display text-body font-bold text-ink">
          Kotize
        </h1>
        <div className="w-[52px]" aria-hidden="true" />
      </div>

      <div className="flex flex-1 flex-col justify-center px-(--spacing-screen-x)">
        <p className="text-center text-micro font-bold uppercase tracking-[0.1em] text-ink-soft">
          {solName} · Mwa {cycle.current}/{cycle.total}
        </p>

        <p className="mt-2 text-center font-display text-amount-xl font-extrabold tracking-[-0.03em] text-ink">
          {formatHTG(amount)}
          <span className="ml-2 font-body text-body font-normal text-ink-soft">
            HTG
          </span>
        </p>

        <p className="mt-1 text-center text-body text-ink-soft">
          anvan {dueDate}
        </p>

        {moncashConnected ? (
          <Card className="mt-(--spacing-stack) flex-row items-center gap-3 p-4">
            <Avatar className="size-11 rounded-(--radius-input)">
              <AvatarFallback className="rounded-(--radius-input) bg-ink text-body font-bold text-paper">
                MC
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-body font-semibold text-ink">MonCash</p>
              <p className="text-micro text-ink-soft">{moncash.phone}</p>
            </div>
            <Badge
              variant="outline"
              className="rounded-(--radius-chip) border-transparent bg-paid-bg px-3 text-micro font-semibold uppercase tracking-wide text-paid"
            >
              konekte
            </Badge>
          </Card>
        ) : (
          <Card className="mt-(--spacing-stack) p-4 text-center">
            <p className="text-body font-semibold text-ink">
              MonCash pa konekte
            </p>
            <p className="mt-1 text-body text-ink-soft">
              Konekte kont MonCash ou anvan ou peye kotizasyon w.
            </p>
          </Card>
        )}

        <div className="mt-[18px]">
          {moncashConnected ? (
            <PayButton
              solName={solName}
              cycle={cycle}
              amount={amount}
              forcedOutcome={forcedOutcome}
            />
          ) : (
            <Button className="h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold">
              Konekte MonCash
            </Button>
          )}
        </div>

        <p className="mt-[14px] text-center text-micro text-ink-soft">
          🔒 W ap konfime peman an nan MonCash, epi w ap tounen isit
          otomatikman.
        </p>
      </div>
    </div>
  )
}
