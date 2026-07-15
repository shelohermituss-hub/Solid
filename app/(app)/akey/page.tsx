import Link from "next/link"
import { Bell } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { ScreenState } from "@/components/ScreenState"
import { formatHTG } from "@/lib/format"
import { mockAkey } from "@/lib/mock/akey"

type AkeyPageProps = {
  searchParams: Promise<{ state?: string }>
}

export default async function AkeyPage({ searchParams }: AkeyPageProps) {
  const { state } = await searchParams
  const { userName, nextKotizasyon, group } = mockAkey

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="flex items-center justify-between px-(--spacing-screen-x) pt-(--spacing-stack)">
        <div>
          <p className="text-micro text-ink-soft">Bonjou 👋</p>
          <p className="font-display text-body font-bold text-ink">
            {userName}
          </p>
        </div>
        <Link
          href="/notifikasyon"
          aria-label="Notifikasyon"
          className="flex size-[52px] items-center justify-center rounded-full text-ink"
        >
          <Bell className="size-6" aria-hidden="true" />
        </Link>
      </div>

      {state === "error" ? (
        <ScreenState
          title="Nou pa ka chaje kont ou"
          description="Tcheke koneksyon ou, epi eseye ankò."
          actionLabel="Eseye ankò"
          actionHref="/akey"
        />
      ) : state === "empty" ? (
        <ScreenState
          title="Ou poko nan yon sòl"
          description="Kreye youn oswa mande yon envitasyon pou kòmanse kotize."
          actionLabel="Kreye yon sòl"
          actionHref="/akey"
        />
      ) : (
        <div className="mt-(--spacing-stack) flex flex-col gap-(--spacing-stack) px-(--spacing-screen-x)">
          <div className="rounded-(--radius-card) bg-primary p-(--spacing-stack)">
            <div className="flex items-center justify-between">
              <Badge
                variant="outline"
                className="rounded-(--radius-chip) border-transparent bg-primary-foreground/15 px-3 text-micro font-semibold uppercase tracking-wide text-primary-foreground"
              >
                {group.name} · Mwa {group.cycle.current}/{group.cycle.total}
              </Badge>
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-paid ring-4 ring-paid/30"
              />
            </div>
            <p className="mt-4 text-micro font-bold uppercase tracking-[0.08em] text-primary-foreground/70">
              Pwochen kotizasyon ou
            </p>
            <p className="mt-1 font-display text-amount font-extrabold tracking-[-0.03em] text-primary-foreground">
              {formatHTG(nextKotizasyon.amount)}
              <span className="ml-2 text-body font-normal text-primary-foreground/70">
                HTG
              </span>
            </p>
            <p className="mt-0.5 text-micro text-primary-foreground/70">
              anvan {nextKotizasyon.dueDate} — nan {nextKotizasyon.daysLeft}{" "}
              jou
            </p>
            <Link
              href="/peye"
              className="mt-4 flex h-[52px] w-full items-center justify-center rounded-(--radius-btn) bg-soley font-body text-body font-semibold text-soley-ink"
            >
              Kotize kounye a
            </Link>
          </div>

          <Link
            href="/gwoup"
            className="block rounded-(--radius-card) border border-line bg-card p-(--spacing-stack)"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body font-bold text-ink">{group.name}</p>
                <p className="text-micro text-ink-soft">
                  {group.memberCount} manm · pot {formatHTG(group.potAmount)}{" "}
                  HTG
                </p>
              </div>
              <span className="text-body text-ink-soft" aria-hidden="true">
                ›
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-micro text-ink-soft">
                Tou pa w :{" "}
                <span className="font-bold text-ink">
                  pozisyon {group.yourPosition} · {group.monthLabel}
                </span>
              </p>
              <Badge
                variant="outline"
                className="rounded-(--radius-chip) border-transparent bg-paid-bg px-3 text-micro font-semibold text-paid"
              >
                {group.paidCount}/{group.totalCount} peye
              </Badge>
            </div>
          </Link>

          <div className="rounded-(--radius-card) border border-dashed border-line bg-card p-(--spacing-stack) text-center">
            <p className="text-body font-bold text-ink">
              Ou vle yon lòt sòl ?
            </p>
            <p className="mt-1 text-micro text-ink-soft">
              Kreye youn oswa mande yon envitasyon
            </p>
            <Link
              href="/kreye-gwoup"
              className="mt-3 flex h-[52px] w-full items-center justify-center rounded-(--radius-btn) border border-line bg-card font-body text-body font-semibold text-ink"
            >
              + Kreye yon sòl
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
