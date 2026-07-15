import Link from "next/link"
import { Medal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { mockMonteNivo } from "@/lib/mock/monteNivo"

export default function MonteNivoPage() {
  const { newLevel, previousScore, newScore, benefit } = mockMonteNivo

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="bg-soley-bg px-(--spacing-screen-x) pt-16 pb-6 text-center">
        <div className="mx-auto flex size-[110px] items-center justify-center rounded-full bg-soley">
          <Medal className="size-12 text-soley-ink" aria-hidden="true" />
        </div>
        <p className="mt-(--spacing-stack) font-display text-h1 font-extrabold text-ink">
          Ou monte nivo ! 🎉
        </p>
        <p className="mt-1 text-micro text-ink-soft">
          Ou se kounye a {newLevel}
        </p>
      </div>

      <div className="flex-1 px-(--spacing-screen-x) py-(--spacing-stack)">
        <Card className="items-center gap-1 p-(--spacing-stack) text-center">
          <p className="font-display text-h1 font-extrabold text-ink">
            {previousScore} → {newScore}
          </p>
          <p className="text-micro font-semibold uppercase tracking-wide text-ink-soft">
            Skò konfyans
          </p>
        </Card>

        <Badge
          variant="outline"
          className="mt-(--spacing-stack) gap-1 rounded-(--radius-chip) border-transparent bg-paid-bg px-3 text-micro font-semibold text-paid"
        >
          <Medal className="size-3" aria-hidden="true" />
          Nivo : {newLevel}
        </Badge>

        <Card className="mt-(--spacing-stack) p-(--spacing-stack)">
          <p className="text-body text-ink">{benefit}</p>
        </Card>

        <div className="mt-(--spacing-stack) flex flex-col gap-2.5">
          <Button
            render={<Link href="/pwofil" />}
            className="h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold"
          >
            Gade pwofil ou
          </Button>
          <Button
            render={<Link href="/akey" />}
            variant="outline"
            className="h-[52px] w-full rounded-(--radius-btn) bg-card font-body text-body font-semibold text-ink"
          >
            Tounen akèy
          </Button>
        </div>
      </div>
    </div>
  )
}
