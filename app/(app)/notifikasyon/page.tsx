import Link from "next/link"
import { BadgeCheck, ChevronLeft, CircleCheck, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScreenState } from "@/components/ScreenState"
import { cn } from "@/lib/utils"
import {
  mockNotifikasyon,
  type NotificationAccent,
} from "@/lib/mock/notifikasyon"

type NotifikasyonPageProps = {
  searchParams: Promise<{ state?: string }>
}

const accentBorderClass: Record<NotificationAccent, string> = {
  soley: "border-l-soley",
  paid: "border-l-paid",
  primary: "border-l-primary",
  neutral: "border-l-ink-soft",
}

const accentIcon: Record<NotificationAccent, typeof Clock | null> = {
  soley: Clock,
  paid: CircleCheck,
  primary: null,
  neutral: BadgeCheck,
}

const accentIconClass: Record<NotificationAccent, string> = {
  soley: "text-soley",
  paid: "text-paid",
  primary: "text-primary",
  neutral: "text-ink-soft",
}

export default async function NotifikasyonPage({
  searchParams,
}: NotifikasyonPageProps) {
  const { state } = await searchParams
  const { items } = mockNotifikasyon

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
          Notifikasyon
        </h1>
        <div className="w-[52px]" aria-hidden="true" />
      </div>

      {state === "error" ? (
        <ScreenState
          title="Nou pa ka chaje notifikasyon yo"
          description="Tcheke koneksyon ou, epi eseye ankò."
          actionLabel="Eseye ankò"
          actionHref="/notifikasyon"
        />
      ) : state === "empty" ? (
        <ScreenState
          title="Pa gen notifikasyon"
          description="Nou va avize w le gen yon kotizasyon, yon pot, oswa yon aktivite nan sòl ou yo."
          actionLabel="Tounen akèy"
          actionHref="/akey"
        />
      ) : (
        <div className="flex flex-1 flex-col gap-(--spacing-stack) px-(--spacing-screen-x)">
          {items.map((item) => {
            const Icon = accentIcon[item.accent]
            return (
              <Card
                key={item.id}
                className={cn(
                  "border-l-4 p-(--spacing-stack)",
                  accentBorderClass[item.accent]
                )}
              >
                <div className="flex items-start gap-2">
                  {item.celebration ? (
                    <span aria-hidden="true">🎉</span>
                  ) : Icon ? (
                    <Icon
                      className={cn(
                        "mt-0.5 size-4 shrink-0",
                        accentIconClass[item.accent]
                      )}
                      aria-hidden="true"
                    />
                  ) : null}
                  <p className="text-body font-bold text-ink">{item.title}</p>
                </div>
                <p className="mt-1 text-micro text-ink-soft">
                  {item.description}
                </p>
                <p className="mt-1.5 text-micro text-ink-soft">
                  {item.timestamp}
                </p>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
