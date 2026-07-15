import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { EditProfileForm } from "@/components/EditProfileForm"
import { mockPwofil } from "@/lib/mock/pwofil"

export default function ModifyePwofilPage() {
  const { name } = mockPwofil
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="flex h-[52px] items-center px-(--spacing-screen-x)">
        <Button
          render={<Link href="/paramet" aria-label="Tounen" />}
          variant="ghost"
          className="size-[52px] rounded-full p-0 text-ink"
        >
          <ChevronLeft className="size-6" aria-hidden="true" />
        </Button>
        <h1 className="flex-1 text-center font-display text-body font-bold text-ink">
          Modifye pwofil
        </h1>
        <div className="w-[52px]" aria-hidden="true" />
      </div>

      <div className="flex-1 px-(--spacing-screen-x) py-(--spacing-stack)">
        <EditProfileForm initialName={name} initials={initials} />
      </div>
    </div>
  )
}
