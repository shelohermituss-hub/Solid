import Link from "next/link"
import { ChevronLeft, TriangleAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import { KiteGwoupButton } from "@/components/KiteGwoupButton"
import { mockKiteGwoup } from "@/lib/mock/kiteGwoup"

export default function KiteGwoupPage() {
  const { groupName, confirmedCount, totalCount, consequences } =
    mockKiteGwoup

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
          Kite gwoup la
        </h1>
        <div className="w-[52px]" aria-hidden="true" />
      </div>

      <div className="flex flex-1 flex-col px-(--spacing-screen-x) py-(--spacing-stack)">
        <p className="text-center font-display text-h1 font-extrabold text-ink">
          Kite {groupName}?
        </p>
        <p className="mt-1 text-center text-body text-ink-soft">
          Gwoup la {confirmedCount} sou {totalCount} manm konfime kounye a —
          li poko lanse.
        </p>

        <div className="mt-(--spacing-stack) flex items-start gap-2.5 rounded-(--radius-card) border border-wait bg-wait-bg p-(--spacing-stack)">
          <TriangleAlert
            className="mt-0.5 size-5 shrink-0 text-wait"
            aria-hidden="true"
          />
          <ul className="flex flex-col gap-1 text-body text-ink">
            {consequences.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        <div className="mt-(--spacing-stack) mb-(--spacing-stack)">
          <KiteGwoupButton groupName={groupName} />
        </div>
      </div>
    </div>
  )
}
