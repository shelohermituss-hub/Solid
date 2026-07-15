import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MemberAvatar } from "@/components/MemberAvatar"
import { formatHTG } from "@/lib/format"
import { mockEnvitasyonResevwa } from "@/lib/mock/envitasyonResevwa"

export default function EnvitasyonResevwaPage() {
  const { inviterName, groupName, kotizasyon, memberCount, paymentDay, duration } =
    mockEnvitasyonResevwa

  return (
    <div className="flex min-h-dvh flex-col bg-background px-(--spacing-screen-x) py-10">
      <div className="flex flex-col items-center gap-3 text-center">
        <MemberAvatar
          name={inviterName}
          initials={inviterName
            .split(" ")
            .map((part) => part[0])
            .join("")}
          className="size-16"
          fallbackClassName="text-h2"
        />
        <p className="font-display text-h1 font-extrabold tracking-[-0.02em] text-ink">
          {inviterName} envite w
        </p>
        <p className="text-body text-ink-soft">
          Rantre nan <span className="font-bold text-ink">{groupName}</span>
        </p>
      </div>

      <Card className="mt-(--spacing-stack) p-(--spacing-stack)">
        <div className="flex justify-between border-b border-line py-2 text-body">
          <span className="text-ink-soft">Kotizasyon</span>
          <span className="font-bold text-ink">
            {formatHTG(kotizasyon)} HTG / mwa
          </span>
        </div>
        <div className="flex justify-between border-b border-line py-2 text-body">
          <span className="text-ink-soft">Kantite manm</span>
          <span className="font-bold text-ink">{memberCount} moun</span>
        </div>
        <div className="flex justify-between py-2 text-body">
          <span className="text-ink-soft">Jou kotizasyon</span>
          <span className="font-bold text-ink">{paymentDay}</span>
        </div>
      </Card>

      <p className="mt-(--spacing-stack) text-body text-ink-soft">
        Ou angaje pou kotize {formatHTG(kotizasyon)} HTG chak mwa pandan{" "}
        {duration} mwa. Lòd pozisyon yo ap fikse yon fwa tout {memberCount}{" "}
        manm yo antre — apre sa, li p ap ka chanje.
      </p>

      <div className="mt-auto flex flex-col gap-2.5 pt-(--spacing-stack)">
        <Button
          render={<Link href="/enskri" />}
          className="h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold"
        >
          Aksepte envitasyon an
        </Button>
        <Button
          render={<Link href="/antre" />}
          variant="ghost"
          className="h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold text-ink-soft"
        >
          Refize
        </Button>
      </div>
    </div>
  )
}
