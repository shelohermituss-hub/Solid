import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
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
        <Link
          href="/akey"
          aria-label="Tounen"
          className="flex h-[52px] w-[52px] items-center justify-center text-ink"
        >
          <ChevronLeft className="size-6" aria-hidden="true" />
        </Link>
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

          <Link
            href="/chemen-sik"
            className="mt-(--spacing-stack) flex h-[52px] w-full items-center justify-center gap-2 rounded-(--radius-btn) border border-line bg-card font-body text-body font-semibold text-ink"
          >
            Gade chemen sik la
            <ChevronRight className="size-4" aria-hidden="true" />
          </Link>

          <p className="mt-(--spacing-stack) text-micro font-bold uppercase tracking-[0.08em] text-ink-soft">
            Manm yo — {monthShort}
          </p>
          <div className="rounded-(--radius-card) border border-line bg-card">
            {featuredMembers.map((member, index) => (
              <div
                key={member.position}
                className={cn(
                  "flex items-center justify-between gap-3 px-(--spacing-stack) py-3",
                  index < featuredMembers.length - 1 && "border-b border-line"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-micro font-bold text-primary-foreground">
                    {member.initials}
                  </span>
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
          </div>
          <p className="mt-(--spacing-stack) mb-(--spacing-stack) text-center text-micro text-ink-soft">
            + {otherMembersCount} lòt manm
          </p>
        </div>
      )}
    </div>
  )
}
