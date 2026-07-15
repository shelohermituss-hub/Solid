import Link from "next/link"
import { ShieldCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { formatHTG } from "@/lib/format"
import { mockDashboard } from "@/lib/mock/dashboard"

const alertBorderClass = {
  paid: "border-l-paid",
  wait: "border-l-wait",
  late: "border-l-late",
} as const

const alertChipClass = {
  paid: "bg-paid-bg text-paid",
  wait: "bg-wait-bg text-wait",
  late: "bg-late-bg text-late",
} as const

export default function DashboardPage() {
  const { organizerName, stats, groups } = mockDashboard

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="flex items-center justify-between px-(--spacing-screen-x) pt-(--spacing-stack)">
        <div>
          <p className="text-micro text-ink-soft">Espas òganizatris</p>
          <p className="font-display text-body font-bold text-ink">
            {organizerName}
          </p>
        </div>
        <Badge
          variant="outline"
          className="rounded-(--radius-chip) border-transparent bg-primary-bg px-3 text-micro font-semibold text-primary"
        >
          manman sòl ✦
        </Badge>
      </div>

      <div className="mt-(--spacing-stack) flex flex-col gap-(--spacing-stack) px-(--spacing-screen-x) pb-(--spacing-stack)">
        <div className="grid grid-cols-3 gap-2">
          <Card className="rounded-(--radius-input) py-3 text-center">
            <p className="font-display text-h1 font-extrabold text-ink">
              {stats.activeGroups}
            </p>
            <p className="text-micro font-semibold uppercase tracking-wide text-ink-soft">
              Sòl aktif
            </p>
          </Card>
          <Card className="rounded-(--radius-input) py-3 text-center">
            <p className="font-display text-h1 font-extrabold text-late">
              {stats.lateGroups}
            </p>
            <p className="text-micro font-semibold uppercase tracking-wide text-ink-soft">
              An reta
            </p>
          </Card>
          <Card className="rounded-(--radius-input) py-3 text-center">
            <p className="font-display text-h1 font-extrabold text-soley">
              {stats.potsThisWeek}
            </p>
            <p className="text-micro font-semibold uppercase tracking-wide text-ink-soft">
              Pot semèn sa
            </p>
          </Card>
        </div>

        <p className="text-micro font-bold uppercase tracking-[0.08em] text-ink-soft">
          Sòl ou yo
        </p>

        <div className="flex flex-col gap-(--spacing-stack)">
          {groups.map((group) => (
            <Card
              key={group.id}
              className={cn(
                "border-l-4 p-(--spacing-stack)",
                alertBorderClass[group.alertLevel]
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-body font-bold text-ink">{group.name}</p>
                  <p className="text-micro text-ink-soft">
                    mwa {group.cycle.current}/{group.cycle.total} · pot{" "}
                    {formatHTG(group.potAmount)}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    "shrink-0 rounded-(--radius-chip) border-transparent px-3 text-micro font-semibold",
                    alertChipClass[group.alertLevel]
                  )}
                >
                  {group.alertLabel}
                </Badge>
              </div>
              {group.hasLateMember && (
                <div className="mt-3 flex gap-2">
                  <Button
                    render={<Link href="/gwoup" />}
                    variant="outline"
                    className="h-[52px] flex-1 rounded-(--radius-btn) bg-card font-body text-body font-semibold text-ink"
                  >
                    Gade
                  </Button>
                  <Button
                    render={<Link href="/rapel" />}
                    className="h-[52px] flex-1 rounded-(--radius-btn) bg-late font-body text-body font-semibold text-paper shadow-none hover:bg-late/90"
                  >
                    Voye rapèl
                  </Button>
                </div>
              )}
              {group.needsBeneficiaryConfirmation && (
                <Button
                  render={<Link href="/konfime-nimewo-benefisye" />}
                  className="mt-3 h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold"
                >
                  Konfime nimewo benefisyè a
                </Button>
              )}
              {group.hasPayoutIssue && (
                <Button
                  render={<Link href="/vesman-echwe" />}
                  className="mt-3 h-[52px] w-full rounded-(--radius-btn) bg-late font-body text-body font-semibold text-paper shadow-none hover:bg-late/90"
                >
                  Rezoud vèsman echwe a
                </Button>
              )}
            </Card>
          ))}
        </div>

        <Button
          render={<Link href="/kreye-gwoup" />}
          className="h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold"
        >
          + Kreye yon nouvo sòl
        </Button>

        <div className="flex items-center gap-2.5 rounded-(--radius-card) bg-soley-bg p-(--spacing-stack)">
          <ShieldCheck
            className="size-5 shrink-0 text-soley-ink"
            aria-hidden="true"
          />
          <p className="text-micro text-soley-ink">
            Ou jere gwoup yo — men lajan an pa janm pase nan men w. Chak goud
            ale dirèk nan MonCash.
          </p>
        </div>
      </div>
    </div>
  )
}
