import Link from "next/link"
import { ChevronLeft, CircleCheck, TriangleAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { formatHTG } from "@/lib/format"
import { mockAvetismanReta } from "@/lib/mock/avetismanReta"

export default function AvetismanRetaPage() {
  const { solName, amount, dueDate, lateDays, freezeDate, steps } =
    mockAvetismanReta

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
          Kotizasyon an reta
        </h1>
        <div className="w-[52px]" aria-hidden="true" />
      </div>

      <div className="flex-1 px-(--spacing-screen-x) py-(--spacing-stack)">
        <Card className="p-(--spacing-stack)">
          <p className="text-body text-ink">
            Ou gen <span className="font-bold">{lateDays} jou reta</span> sou
            kotizasyon {formatHTG(amount)} HTG ou pou {solName} (te dwe peye
            anvan {dueDate}).
          </p>
        </Card>

        <div className="mt-(--spacing-stack) flex items-start gap-2.5 rounded-(--radius-card) border border-late bg-late-bg p-(--spacing-stack)">
          <TriangleAlert
            className="mt-0.5 size-5 shrink-0 text-late"
            aria-hidden="true"
          />
          <p className="text-body text-ink">
            Si w pa peye anvan {freezeDate},{" "}
            <span className="font-extrabold">
              pozisyon ou nan sòl la ka jele
            </span>{" "}
            — se konsa nou pwoteje lòt manm yo, pa yon pinisyon kont ou.
          </p>
        </div>

        <p className="mt-(--spacing-stack) text-micro font-bold uppercase tracking-[0.08em] text-ink-soft">
          Sa ki deja pase, sa k ap vini
        </p>

        <div className="relative pl-10">
          <div
            aria-hidden="true"
            className="absolute top-3 bottom-3 left-[15px] w-[3px] rounded-full bg-line"
          />
          {steps.map((step) => (
            <div key={step.id} className="relative py-3">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -left-10 top-3 flex size-8 items-center justify-center rounded-full border-2",
                  step.state === "done" && "border-ink bg-ink text-paper",
                  step.state === "critical" &&
                    "border-late bg-late-bg text-late"
                )}
              >
                {step.state === "done" ? (
                  <CircleCheck className="size-4" aria-hidden="true" />
                ) : (
                  <TriangleAlert className="size-4" aria-hidden="true" />
                )}
              </span>
              <Card
                className={cn(
                  "rounded-(--radius-input) px-3.5 py-3",
                  step.state === "critical" && "border-late bg-late-bg"
                )}
              >
                <p className="text-body font-bold text-ink">{step.label}</p>
                <p className="text-micro text-ink-soft">{step.when}</p>
              </Card>
            </div>
          ))}
        </div>

        <Button
          render={<Link href="/peye" />}
          className="mt-(--spacing-stack) mb-(--spacing-stack) h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold"
        >
          Peye kounye a
        </Button>
      </div>
    </div>
  )
}
