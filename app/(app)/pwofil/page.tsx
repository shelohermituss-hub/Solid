import { ChevronRight, Flame, Medal, Target } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScreenState } from "@/components/ScreenState"
import { mockPwofil } from "@/lib/mock/pwofil"

type PwofilPageProps = {
  searchParams: Promise<{ state?: string }>
}

const RING_RADIUS = 50
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

export default async function PwofilPage({ searchParams }: PwofilPageProps) {
  const { state } = await searchParams
  const { name, trustScore, scoreMax, level, stats, scoreRules, nextLevel } =
    mockPwofil
  const progress = (trustScore / scoreMax) * RING_CIRCUMFERENCE

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="flex h-[52px] items-center px-(--spacing-screen-x)">
        <h1 className="w-full text-center font-display text-body font-bold text-ink">
          Pwofil ou
        </h1>
      </div>

      {state === "error" ? (
        <ScreenState
          title="Nou pa ka chaje pwofil ou"
          description="Tcheke koneksyon ou, epi eseye ankò."
          actionLabel="Eseye ankò"
          actionHref="/pwofil"
        />
      ) : (
        <div className="flex-1 px-(--spacing-screen-x) pb-(--spacing-stack)">
          <div className="flex flex-col items-center pt-2 text-center">
            <svg
              viewBox="0 0 120 120"
              width={120}
              height={120}
              role="img"
              aria-label={`Skò konfyans ${trustScore} sou ${scoreMax}`}
            >
              <circle
                cx={60}
                cy={60}
                r={RING_RADIUS}
                strokeWidth={10}
                fill="none"
                className="stroke-line"
              />
              <circle
                cx={60}
                cy={60}
                r={RING_RADIUS}
                strokeWidth={10}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${progress} ${RING_CIRCUMFERENCE}`}
                transform="rotate(-90 60 60)"
                className="stroke-paid"
              />
              <foreignObject x={10} y={10} width={100} height={100}>
                <div className="flex h-full w-full flex-col items-center justify-center gap-0.5 text-center">
                  <p className="font-display text-h1 font-extrabold text-ink">
                    {trustScore}
                  </p>
                  <p className="text-micro font-bold uppercase tracking-[0.08em] text-ink-soft">
                    Skò konfyans
                  </p>
                </div>
              </foreignObject>
            </svg>

            <p className="mt-3 font-display text-h1 font-extrabold text-ink">
              {name}
            </p>
            <Badge
              variant="outline"
              className="mt-1.5 gap-1 rounded-(--radius-chip) border-transparent bg-paid-bg px-3 text-micro font-semibold text-paid"
            >
              <Medal className="size-3" aria-hidden="true" />
              Nivo : {level}
            </Badge>
          </div>

          <div className="mt-(--spacing-stack) grid grid-cols-3 gap-2">
            <Card className="rounded-(--radius-input) py-3 text-center">
              <p className="font-display text-h1 font-extrabold text-ink">
                {stats.cyclesCompleted}
              </p>
              <p className="text-micro font-semibold uppercase tracking-wide text-ink-soft">
                Sik konplete
              </p>
            </Card>
            <Card className="rounded-(--radius-input) py-3 text-center">
              <p className="font-display text-h1 font-extrabold text-ink">
                {stats.onTimePayments}
              </p>
              <p className="text-micro font-semibold uppercase tracking-wide text-ink-soft">
                Peman alè
              </p>
            </Card>
            <Card className="rounded-(--radius-input) py-3 text-center">
              <div className="flex items-center justify-center gap-1">
                <p className="font-display text-h1 font-extrabold text-soley">
                  {stats.streak}
                </p>
                <Flame className="size-4 text-soley" aria-hidden="true" />
              </div>
              <p className="text-micro font-semibold uppercase tracking-wide text-ink-soft">
                Seri alè
              </p>
            </Card>
          </div>

          <Card className="mt-(--spacing-stack) p-(--spacing-stack)">
            <p className="text-body font-bold text-ink">
              Kijan pou monte skò w
            </p>
            <ul className="mt-2 flex flex-col gap-1 text-body text-ink-soft">
              {scoreRules.map((rule) => (
                <li key={rule.text}>
                  {rule.type === "positive" ? "✓ " : "✗ "}
                  {rule.text}
                </li>
              ))}
            </ul>
          </Card>

          <div className="mt-(--spacing-stack) flex items-start gap-2.5 rounded-(--radius-card) bg-soley-bg p-(--spacing-stack)">
            <Target
              className="mt-0.5 size-5 shrink-0 text-soley-ink"
              aria-hidden="true"
            />
            <div>
              <p className="text-body font-bold text-soley-ink">
                Nan {nextLevel.pointsNeeded} pwen : {nextLevel.name}
              </p>
              <p className="mt-0.5 text-micro text-soley-ink">
                {nextLevel.benefit}
              </p>
            </div>
          </div>

          <Button
            render={<Link href="/istorik" />}
            variant="outline"
            className="mt-(--spacing-stack) h-[52px] w-full gap-1.5 rounded-(--radius-btn) bg-card font-body text-body font-semibold text-ink"
          >
            Istorik tranzaksyon yo
            <ChevronRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      )}
    </div>
  )
}
