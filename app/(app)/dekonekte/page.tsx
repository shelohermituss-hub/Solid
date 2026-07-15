import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DeleteAccountButton } from "@/components/DeleteAccountButton"
import { LogoutButton } from "@/components/LogoutButton"

export default function DekonektePage() {
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
          Dekonekte
        </h1>
        <div className="w-[52px]" aria-hidden="true" />
      </div>

      <div className="flex-1 px-(--spacing-screen-x) py-(--spacing-stack)">
        <p className="mb-(--spacing-stack) text-body text-ink-soft">
          Ou ka dekonekte epi konekte ankò nenpòt kilè ak nimewo w.
        </p>
        <LogoutButton />

        <p className="mt-[3.5rem] mb-2 text-micro font-bold uppercase tracking-[0.08em] text-ink-soft">
          Zòn danje
        </p>
        <DeleteAccountButton />
      </div>
    </div>
  )
}
