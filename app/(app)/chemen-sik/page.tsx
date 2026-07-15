import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScreenState } from "@/components/ScreenState"
import { cn } from "@/lib/utils"
import { mockChemenSik } from "@/lib/mock/chemenSik"

type ChemenSikPageProps = {
  searchParams: Promise<{ state?: string }>
}

export default async function ChemenSikPage({
  searchParams,
}: ChemenSikPageProps) {
  const { state } = await searchParams
  const { groupName, steps } = mockChemenSik

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="flex h-[52px] items-center px-(--spacing-screen-x)">
        <Button
          render={<Link href="/gwoup" aria-label="Tounen" />}
          variant="ghost"
          className="size-[52px] rounded-full p-0 text-ink"
        >
          <ChevronLeft className="size-6" aria-hidden="true" />
        </Button>
        <h1 className="flex-1 text-center font-display text-body font-bold text-ink">
          Chemen sik la
        </h1>
        <div className="w-[52px]" aria-hidden="true" />
      </div>

      {state === "error" ? (
        <ScreenState
          title="Nou pa ka chaje chemen an"
          description="Tcheke koneksyon ou, epi eseye ankò."
          actionLabel="Eseye ankò"
          actionHref="/chemen-sik"
        />
      ) : state === "empty" ? (
        <ScreenState
          title="Sik la fenk kòmanse"
          description={`${groupName} poko gen istorik — premye kotizasyon an ap louvri chemen an.`}
          actionLabel="Tounen nan gwoup la"
          actionHref="/gwoup"
        />
      ) : (
        <div className="flex-1 px-(--spacing-screen-x)">
          <p className="mb-(--spacing-stack) text-micro text-ink-soft">
            10 mwa, 10 moun, chak moun gen jou pa l. Lòd la fikse depi
            kòmansman — pèsonn pa ka chanje l.
          </p>

          <div className="relative pl-10">
            <div
              aria-hidden="true"
              className="absolute top-3 bottom-3 left-[15px] w-[3px] rounded-full bg-line"
            />
            {steps.map((step) => (
              <div key={step.position} className="relative py-3">
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -left-10 top-3 flex size-8 items-center justify-center rounded-full border-2 text-body font-extrabold",
                    step.state === "done" &&
                      "border-paid bg-paid text-paper",
                    step.state === "now" &&
                      "border-soley bg-soley text-soley-ink ring-4 ring-soley/30",
                    step.state === "upcoming" &&
                      "border-line bg-card text-ink-soft"
                  )}
                >
                  {step.state === "done" ? "✓" : step.position}
                </span>
                <Card
                  className={cn(
                    "rounded-(--radius-input) px-3.5 py-3",
                    step.state === "now" && "border-soley bg-soley-bg",
                    step.isCurrentUser && "border-primary bg-primary-bg"
                  )}
                >
                  <p className="text-body font-bold text-ink">{step.name}</p>
                  <p className="text-micro text-ink-soft">{step.when}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
