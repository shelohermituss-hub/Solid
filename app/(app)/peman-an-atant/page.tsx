import { PaymentPendingStatus } from "@/components/PaymentPendingStatus"
import { formatHTG } from "@/lib/format"
import { mockPeymanAnAtant } from "@/lib/mock/peymanAnAtant"

type PeymanAnAtantPageProps = {
  searchParams: Promise<{ mock?: string }>
}

export default async function PeymanAnAtantPage({
  searchParams,
}: PeymanAnAtantPageProps) {
  const params = await searchParams
  const forcedOutcome =
    params.mock === "error" || params.mock === "success"
      ? params.mock
      : undefined
  const { solName, cycle, amount } = mockPeymanAnAtant

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="flex flex-1 flex-col justify-center px-(--spacing-screen-x) text-center">
        <p className="text-micro font-bold uppercase tracking-[0.1em] text-ink-soft">
          {solName} · Mwa {cycle.current}/{cycle.total}
        </p>

        <p className="mt-2 font-display text-amount-xl font-extrabold tracking-[-0.03em] text-ink">
          {formatHTG(amount)}
          <span className="ml-2 font-body text-body font-normal text-ink-soft">
            HTG
          </span>
        </p>

        <p className="mt-3 text-body text-ink-soft">
          N ap verifye peman an ak MonCash. Sa ka pran kèk segond — pa fèmen
          paj la.
        </p>

        <div className="mt-(--spacing-stack)">
          <PaymentPendingStatus forcedOutcome={forcedOutcome} />
        </div>
      </div>
    </div>
  )
}
