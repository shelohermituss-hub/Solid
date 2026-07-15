import Link from "next/link"
import { ChevronLeft, CircleCheck, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CopyInviteLinkButton } from "@/components/CopyInviteLinkButton"
import { MemberAvatar } from "@/components/MemberAvatar"
import { ScreenState } from "@/components/ScreenState"
import { cn } from "@/lib/utils"
import {
  mockGwoupApFome,
  mockGwoupApFomeFull,
  type FormingMember,
} from "@/lib/mock/gwoupApFome"

type GwoupApFomePageProps = {
  searchParams: Promise<{ state?: string }>
}

export default async function GwoupApFomePage({
  searchParams,
}: GwoupApFomePageProps) {
  const { state } = await searchParams
  const isFull = state === "full"
  const { groupName, totalCount, confirmedCount, inviteLink, members } =
    isFull ? mockGwoupApFomeFull : mockGwoupApFome

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
          Gwoup ap fòme
        </h1>
        <div className="w-[52px]" aria-hidden="true" />
      </div>

      {state === "error" ? (
        <ScreenState
          title="Nou pa ka chaje enfòmasyon gwoup la"
          description="Tcheke koneksyon ou, epi eseye ankò."
          actionLabel="Eseye ankò"
          actionHref="/gwoup-ap-fome"
        />
      ) : state === "empty" ? (
        <ScreenState
          title="Ou fenk kreye gwoup la"
          description="Poko gen manm envite. Pataje lyen envitasyon an pou kòmanse."
          actionLabel="Kreye yon sòl"
          actionHref="/kreye-gwoup"
        />
      ) : (
        <div className="flex flex-1 flex-col px-(--spacing-screen-x)">
          <p className="mt-1 text-center text-micro font-bold uppercase tracking-[0.1em] text-ink-soft">
            {groupName}
          </p>
          <p className="mt-2 text-center font-display text-h1 font-extrabold text-ink">
            {confirmedCount} sou {totalCount} manm konfime
          </p>

          <div
            className="mt-(--spacing-stack) flex justify-center gap-1.5"
            role="img"
            aria-label={`${confirmedCount} sou ${totalCount} manm konfime`}
          >
            {Array.from({ length: totalCount }).map((_, index) => (
              <span
                key={index}
                aria-hidden="true"
                className={cn(
                  "size-2.5 rounded-full",
                  index < confirmedCount ? "bg-ink" : "border border-line"
                )}
              />
            ))}
          </div>

          {isFull ? (
            <Card className="mt-(--spacing-stack) items-center gap-1 p-(--spacing-stack) text-center">
              <p className="text-body font-bold text-ink">
                Tout 10 plas yo ranpli 🎉
              </p>
              <p className="mt-0.5 text-micro text-ink-soft">
                Ou ka konfime lansman an — lòd pozisyon yo ap fikse pou tout
                moun.
              </p>
            </Card>
          ) : (
            <p className="mt-(--spacing-stack) text-center text-body text-ink-soft">
              Pataje lyen envitasyon an pou konplete gwoup la. Sòl la ap
              kòmanse otomatikman le tout {totalCount} plas yo ranpli.
            </p>
          )}

          <div className="mt-(--spacing-stack)">
            {isFull ? (
              <Button
                render={<Link href="/konfime-lansman" />}
                className="h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold"
              >
                Konfime lansman
              </Button>
            ) : (
              <CopyInviteLinkButton inviteLink={inviteLink} />
            )}
          </div>

          <p className="mt-(--spacing-stack) text-micro font-bold uppercase tracking-[0.08em] text-ink-soft">
            Manm yo
          </p>
          <Card className="gap-0 py-0">
            {members.map((member: FormingMember, index) => (
              <div
                key={member.name}
                className={cn(
                  "flex items-center justify-between gap-3 px-(--spacing-stack) py-3",
                  index < members.length - 1 && "border-b border-line"
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
                    </p>
                    <p className="text-micro text-ink-soft">
                      {member.status === "confirmed"
                        ? "Konfime"
                        : member.status === "pending"
                          ? "L ap tann repons"
                          : member.note}
                    </p>
                  </div>
                </div>
                {member.status === "unresponsive" ? (
                  <Button
                    render={<Link href="/ranplase-manm" />}
                    variant="outline"
                    className="h-9 shrink-0 rounded-(--radius-chip) bg-card px-3 text-micro font-semibold text-ink"
                  >
                    Ranplase
                  </Button>
                ) : member.status === "confirmed" ? (
                  <CircleCheck
                    className="size-5 shrink-0 text-ink"
                    aria-hidden="true"
                  />
                ) : (
                  <Clock
                    className="size-5 shrink-0 text-ink-soft"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </Card>

          <Button
            render={<Link href="/kite-gwoup" />}
            variant="ghost"
            className="mt-(--spacing-stack) mb-(--spacing-stack) h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold text-ink-soft"
          >
            Kite gwoup la
          </Button>
        </div>
      )}
    </div>
  )
}
