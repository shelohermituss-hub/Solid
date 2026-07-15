import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MemberAvatar } from "@/components/MemberAvatar"
import { ScreenState } from "@/components/ScreenState"
import { Wonn } from "@/components/Wonn"
import { cn } from "@/lib/utils"
import { mockGwoup } from "@/lib/mock/gwoup"

type GwoupPageProps = {
  searchParams: Promise<{ state?: string }>
}

const statusDotClass = {
  paid: "bg-paid",
  wait: "bg-wait",
  late: "bg-late",
} as const

export default async function GwoupPage({ searchParams }: GwoupPageProps) {
  const { state } = await searchParams
  const {
    name,
    monthLabel,
    monthShort,
    potAmount,
    beneficiary,
    statusCounts,
    wonnMembers,
    featuredMembers,
    otherMembersCount,
  } = mockGwoup

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
          {name}
        </h1>
        <div className="w-[52px]" aria-hidden="true" />
      </div>

      {state === "error" ? (
        <ScreenState
          title="Nou pa ka chaje gwoup la"
          description="Tcheke koneksyon ou, epi eseye ankò."
          actionLabel="Eseye ankò"
          actionHref="/gwoup"
        />
      ) : state === "empty" ? (
        <ScreenState
          title="W ap tann manm yo"
          description="Sòl la poko konplè — n ap prevni w le tout 10 plas yo ranpli."
          actionLabel="Voye envitasyon"
          actionHref="/gwoup"
        />
      ) : (
        <div className="flex flex-1 flex-col px-(--spacing-screen-x)">
          <Wonn
            potAmount={potAmount}
            monthLabel={monthLabel}
            beneficiaryName={beneficiary.name}
            beneficiaryPosition={beneficiary.position}
            members={wonnMembers}
            className="mt-2"
          />

          <div className="mt-(--spacing-stack) flex items-center justify-center gap-2">
            <Badge
              variant="outline"
              className="rounded-(--radius-chip) border-transparent bg-paid-bg px-3 text-micro font-semibold text-paid"
            >
              ● {statusCounts.paid} peye
            </Badge>
            <Badge
              variant="outline"
              className="rounded-(--radius-chip) border-transparent bg-wait-bg px-3 text-micro font-semibold text-wait"
            >
              ● {statusCounts.wait} an atant
            </Badge>
            <Badge
              variant="outline"
              className="rounded-(--radius-chip) border-transparent bg-late-bg px-3 text-micro font-semibold text-late"
            >
              ● {statusCounts.late} an reta
            </Badge>
          </div>

          <Button
            render={<Link href="/chemen-sik" />}
            variant="outline"
            className="mt-(--spacing-stack) h-[52px] w-full gap-2 rounded-(--radius-btn) bg-card font-body text-body font-semibold text-ink"
          >
            Gade chemen sik la
            <ChevronRight className="size-4" aria-hidden="true" />
          </Button>

          <p className="mt-(--spacing-stack) text-micro font-bold uppercase tracking-[0.08em] text-ink-soft">
            Manm yo — {monthShort}
          </p>
          <Card className="gap-0 py-0">
            {featuredMembers.map((member, index) => (
              <div
                key={member.position}
                className={cn(
                  "flex items-center justify-between gap-3 px-(--spacing-stack) py-3",
                  index < featuredMembers.length - 1 && "border-b border-line"
                )}
              >
                <div className="flex items-center gap-3">
                  <MemberAvatar
                    name={member.name}
                    initials={member.initials}
                    className="size-9"
                    fallbackClassName="text-micro"
                  />
                  <div>
                    <p className="text-body font-bold text-ink">
                      {member.name}
                      {member.isBeneficiary && (
                        <span className="ml-1.5 text-micro font-semibold text-soley">
                          ★ benefisyè
                        </span>
                      )}
                      {member.isCurrentUser && (
                        <span className="ml-1.5 text-micro font-semibold text-primary">
                          (ou menm)
                        </span>
                      )}
                    </p>
                    <p className="text-micro text-ink-soft">
                      pozisyon {member.position}
                      {member.note ? ` · ${member.note}` : ""}
                    </p>
                  </div>
                </div>
                <span
                  aria-hidden="true"
                  className={cn(
                    "size-2.5 shrink-0 rounded-full",
                    statusDotClass[member.status]
                  )}
                />
              </div>
            ))}
          </Card>
          <p className="mt-(--spacing-stack) mb-(--spacing-stack) text-center text-micro text-ink-soft">
            + {otherMembersCount} lòt manm
          </p>
        </div>
      )}
    </div>
  )
}
