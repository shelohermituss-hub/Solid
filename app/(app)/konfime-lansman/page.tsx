import Link from "next/link"
import { ChevronLeft, TriangleAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ConfirmLaunchButton } from "@/components/ConfirmLaunchButton"
import { MemberAvatar } from "@/components/MemberAvatar"
import { ScreenState } from "@/components/ScreenState"
import { cn } from "@/lib/utils"
import { formatHTG } from "@/lib/format"
import { mockKonfimeLansman } from "@/lib/mock/konfimeLansman"

type KonfimeLansmanPageProps = {
  searchParams: Promise<{ state?: string }>
}

export default async function KonfimeLansmanPage({
  searchParams,
}: KonfimeLansmanPageProps) {
  const { state } = await searchParams
  const { groupName, kotizasyon, potAmount, drawnOrder } = mockKonfimeLansman

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="flex h-[52px] items-center px-(--spacing-screen-x)">
        <Button
          render={<Link href="/gwoup-ap-fome" aria-label="Tounen" />}
          variant="ghost"
          className="size-[52px] rounded-full p-0 text-ink"
        >
          <ChevronLeft className="size-6" aria-hidden="true" />
        </Button>
        <h1 className="flex-1 text-center font-display text-body font-bold text-ink">
          Konfime lansman
        </h1>
        <div className="w-[52px]" aria-hidden="true" />
      </div>

      {state === "error" ? (
        <ScreenState
          title="Nou pa ka chaje lòd pozisyon yo"
          description="Tcheke koneksyon ou, epi eseye ankò."
          actionLabel="Eseye ankò"
          actionHref="/konfime-lansman"
        />
      ) : (
        <div className="flex flex-1 flex-col px-(--spacing-screen-x)">
          <p className="mt-1 text-center text-micro font-bold uppercase tracking-[0.1em] text-ink-soft">
            {groupName}
          </p>
          <p className="mt-2 text-center font-display text-h1 font-extrabold text-ink">
            Tout {drawnOrder.length} manm konfime
          </p>
          <p className="mt-1 text-center text-body text-ink-soft">
            {formatHTG(kotizasyon)} HTG chak mwa · pot {formatHTG(potAmount)}{" "}
            HTG
          </p>

          <div className="mt-(--spacing-stack) flex items-start gap-2.5 rounded-(--radius-card) border border-wait bg-wait-bg p-(--spacing-stack)">
            <TriangleAlert
              className="mt-0.5 size-5 shrink-0 text-wait"
              aria-hidden="true"
            />
            <p className="text-body text-ink">
              Lòd pozisyon ki anba a se lòd final la.{" "}
              <span className="font-extrabold">
                Apre konfimasyon, pèsonn — ni ou, ni manm yo — pa ka chanje l
                ankò.
              </span>
            </p>
          </div>

          <p className="mt-(--spacing-stack) text-micro font-bold uppercase tracking-[0.08em] text-ink-soft">
            Lòd pozisyon yo
          </p>
          <Card className="gap-0 py-0">
            {drawnOrder.map((member, index) => (
              <div
                key={member.position}
                className={cn(
                  "flex items-center gap-3 px-(--spacing-stack) py-3",
                  index < drawnOrder.length - 1 && "border-b border-line"
                )}
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-bg text-micro font-extrabold text-primary">
                  {member.position}
                </span>
                <MemberAvatar
                  name={member.name}
                  initials={member.initials}
                  className="size-9"
                  fallbackClassName="text-micro"
                />
                <p className="flex-1 text-body font-bold text-ink">
                  {member.name}
                  {member.isCurrentUser && (
                    <span className="ml-1.5 text-micro font-semibold text-primary">
                      (ou menm)
                    </span>
                  )}
                </p>
              </div>
            ))}
          </Card>

          <div className="mt-(--spacing-stack) mb-(--spacing-stack)">
            <ConfirmLaunchButton groupName={groupName} />
          </div>
        </div>
      )}
    </div>
  )
}
