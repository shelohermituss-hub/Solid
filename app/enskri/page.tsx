import Link from "next/link"
import { Suspense } from "react"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { EnskriForm } from "@/components/EnskriForm"

export default function EnskriPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="flex h-[52px] items-center px-(--spacing-screen-x)">
        <Button
          render={<Link href="/antre" aria-label="Tounen" />}
          variant="ghost"
          className="size-[52px] rounded-full p-0 text-ink"
        >
          <ChevronLeft className="size-6" aria-hidden="true" />
        </Button>
        <h1 className="flex-1 text-center font-display text-body font-bold text-ink">
          Enskri
        </h1>
        <div className="w-[52px]" aria-hidden="true" />
      </div>

      <div className="flex-1 px-(--spacing-screen-x)">
        <p className="mt-3.5 font-display text-h1 font-extrabold tracking-[-0.02em] text-ink">
          Antre nimewo MonCash ou
        </p>
        <p className="mt-2 text-micro text-ink-soft">
          Se nimewo sa a k ap resevwa lajan ou. Nou pap mande okenn lòt bagay
          kounye a.
        </p>

        <Suspense fallback={null}>
          <EnskriForm />
        </Suspense>
      </div>
    </div>
  )
}
