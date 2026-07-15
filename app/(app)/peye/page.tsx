import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { Badge } from "@/components/ui/badge"
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
        <Link
          href="/akey"
          aria-label="Tounen"
          className="flex h-[52px] w-[52px] items-center justify-center text-ink"
        >
          <ChevronLeft className="size-6" aria-hidden="true" />
        </Link>
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
          <div className="mt-(--spacing-stack) flex items-center gap-3 rounded-(--radius-card) border border-line bg-card p-4">
            <div className="flex size-11 items-center justify-center rounded-(--radius-input) bg-ink text-body font-bold text-paper">
              MC
            </div>
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
          </div>
        ) : (
          <div className="mt-(--spacing-stack) rounded-(--radius-card) border border-line bg-card p-4 text-center">
            <p className="text-body font-semibold text-ink">
              MonCash pa konekte
            </p>
            <p className="mt-1 text-body text-ink-soft">
              Konekte kont MonCash ou anvan ou peye kotizasyon w.
            </p>
          </div>
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
            <button className="flex h-[52px] w-full items-center justify-center rounded-(--radius-btn) bg-primary font-body text-body font-semibold text-primary-foreground active:bg-primary-deep">
              Konekte MonCash
            </button>
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
