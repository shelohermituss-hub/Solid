import Link from "next/link"
import { ChevronLeft, TriangleAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MemberAvatar } from "@/components/MemberAvatar"
import { formatHTG } from "@/lib/format"
import { mockVesmanEchwe } from "@/lib/mock/vesmanEchwe"

export default function VesmanEchwePage() {
  const { groupName, cycle, potAmount, beneficiary, reasonLabel } =
    mockVesmanEchwe

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="flex h-[52px] items-center px-(--spacing-screen-x)">
        <Button
          render={<Link href="/dashboard" aria-label="Tounen" />}
          variant="ghost"
          className="size-[52px] rounded-full p-0 text-ink"
        >
          <ChevronLeft className="size-6" aria-hidden="true" />
        </Button>
        <h1 className="flex-1 text-center font-display text-body font-bold text-ink">
          Vèsman echwe
        </h1>
        <div className="w-[52px]" aria-hidden="true" />
      </div>

      <div className="flex-1 px-(--spacing-screen-x) py-(--spacing-stack)">
        <Card className="flex-row items-center gap-3 p-(--spacing-stack)">
          <MemberAvatar
            name={beneficiary.name}
            initials={beneficiary.initials}
            className="size-11"
          />
          <div className="flex-1">
            <p className="text-body font-bold text-ink">{beneficiary.name}</p>
            <p className="text-micro text-ink-soft">
              {groupName} · mwa {cycle.current}/{cycle.total} · pot{" "}
              {formatHTG(potAmount)} HTG
            </p>
          </div>
        </Card>

        <div className="mt-(--spacing-stack) flex items-start gap-2.5 rounded-(--radius-card) border border-late bg-late-bg p-(--spacing-stack)">
          <TriangleAlert
            className="mt-0.5 size-5 shrink-0 text-late"
            aria-hidden="true"
          />
          <p className="text-body text-ink">
            {reasonLabel}.{" "}
            <span className="font-extrabold">Lajan an rete an sekirite</span>{" "}
            — pa gen anyen ki pèdi, vèsman an ap tann rezolisyon.
          </p>
        </div>

        <p className="mt-(--spacing-stack) text-micro font-bold uppercase tracking-[0.08em] text-ink-soft">
          Pou òganizatris la
        </p>
        <Card className="mt-2 p-(--spacing-stack)">
          <p className="text-body text-ink">
            Mande {beneficiary.name} konfime yon lòt nimewo MonCash anvan nou
            eseye vèse pot la ankò.
          </p>
          <Button
            render={<Link href="/konfime-nimewo-benefisye" />}
            className="mt-(--spacing-stack) h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold"
          >
            Konfime nouvo nimewo a
          </Button>
        </Card>

        <p className="mt-(--spacing-stack) text-micro font-bold uppercase tracking-[0.08em] text-ink-soft">
          Pou benefisyè a
        </p>
        <Card className="mt-2 mb-(--spacing-stack) p-(--spacing-stack)">
          <p className="text-body text-ink">
            Tcheke kont MonCash ou aktif e li ka resevwa lajan. Kontakte
            òganizatris la si pwoblèm nan kontinye.
          </p>
        </Card>
      </div>
    </div>
  )
}
