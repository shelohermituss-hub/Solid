import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScreenState } from "@/components/ScreenState"
import { cn } from "@/lib/utils"
import { formatHTG } from "@/lib/format"
import { mockIstorik } from "@/lib/mock/istorik"

type IstorikPageProps = {
  searchParams: Promise<{ state?: string }>
}

export default async function IstorikPage({ searchParams }: IstorikPageProps) {
  const { state } = await searchParams
  const { groups } = mockIstorik

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="flex h-[52px] items-center px-(--spacing-screen-x)">
        <Button
          render={<Link href="/pwofil" aria-label="Tounen" />}
          variant="ghost"
          className="size-[52px] rounded-full p-0 text-ink"
        >
          <ChevronLeft className="size-6" aria-hidden="true" />
        </Button>
        <h1 className="flex-1 text-center font-display text-body font-bold text-ink">
          Istorik
        </h1>
        <div className="w-[52px]" aria-hidden="true" />
      </div>

      {state === "error" ? (
        <ScreenState
          title="Nou pa ka chaje istorik ou"
          description="Tcheke koneksyon ou, epi eseye ankò."
          actionLabel="Eseye ankò"
          actionHref="/istorik"
        />
      ) : state === "empty" ? (
        <ScreenState
          title="Poko gen tranzaksyon"
          description="Premye kotizasyon w ap parèt isit la, ak referans MonCash li."
          actionLabel="Tounen nan pwofil"
          actionHref="/pwofil"
        />
      ) : (
        <div className="flex-1 px-(--spacing-screen-x)">
          {groups.map((group) => (
            <div key={group.monthLabel} className="mb-(--spacing-stack)">
              <p className="mb-2 text-micro font-bold uppercase tracking-[0.08em] text-ink-soft">
                {group.monthLabel}
              </p>
              <Card className="gap-0 px-(--spacing-stack) py-0">
                {group.transactions.map((tx, index) => (
                  <div
                    key={tx.reference}
                    className={cn(
                      "flex items-center justify-between gap-3 py-3",
                      index < group.transactions.length - 1 &&
                        "border-b border-line"
                    )}
                  >
                    <div>
                      <p className="text-body font-bold text-ink">
                        {tx.celebration ? "🎉 " : ""}
                        {tx.title}
                      </p>
                      <p className="text-micro text-ink-soft">
                        {tx.date} · {tx.reference}
                      </p>
                    </div>
                    <p
                      className={cn(
                        "shrink-0 text-body font-bold",
                        tx.direction === "in" ? "text-paid" : "text-late"
                      )}
                    >
                      {tx.direction === "in" ? "+" : "−"}
                      {formatHTG(tx.amount)}
                    </p>
                  </div>
                ))}
              </Card>
            </div>
          ))}

          <p className="text-center text-micro text-ink-soft">
            Chak liy gen referans MonCash li — se prèv ou.
          </p>

          <Button
            render={<Link href="/rapote-pwoblem" />}
            variant="outline"
            className="mt-(--spacing-stack) mb-(--spacing-stack) h-[52px] w-full rounded-(--radius-btn) bg-card font-body text-body font-semibold text-ink"
          >
            Rapòte yon pwoblèm
          </Button>
        </div>
      )}
    </div>
  )
}
