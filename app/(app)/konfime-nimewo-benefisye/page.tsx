import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ConfirmBeneficiaryNumberForm } from "@/components/ConfirmBeneficiaryNumberForm"
import { MemberAvatar } from "@/components/MemberAvatar"
import { formatHTG } from "@/lib/format"
import { mockKonfimeNimewoBenefisye } from "@/lib/mock/konfimeNimewoBenefisye"

export default function KonfimeNimewoBenefisyePage() {
  const { groupName, cycle, potAmount, beneficiary } =
    mockKonfimeNimewoBenefisye

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
          Konfime nimewo benefisyè
        </h1>
        <div className="w-[52px]" aria-hidden="true" />
      </div>

      <div className="flex flex-1 flex-col px-(--spacing-screen-x) py-(--spacing-stack)">
        <p className="text-center text-micro font-bold uppercase tracking-[0.1em] text-ink-soft">
          {groupName} · Mwa {cycle.current}/{cycle.total}
        </p>
        <p className="mt-2 text-center font-display text-amount font-extrabold tracking-[-0.03em] text-ink">
          {formatHTG(potAmount)}
          <span className="ml-2 text-body font-normal text-ink-soft">HTG</span>
        </p>

        <Card className="mt-(--spacing-stack) flex-row items-center gap-3 p-(--spacing-stack)">
          <MemberAvatar
            name={beneficiary.name}
            initials={beneficiary.initials}
            className="size-11"
          />
          <div className="flex-1">
            <p className="text-body font-bold text-ink">{beneficiary.name}</p>
            <p className="text-micro text-ink-soft">
              Premye fwa l ap resevwa pot la
            </p>
          </div>
        </Card>

        <div className="mt-(--spacing-stack)">
          <ConfirmBeneficiaryNumberForm
            beneficiaryName={beneficiary.name}
            originalPhone={beneficiary.phone}
          />
        </div>
      </div>
    </div>
  )
}
