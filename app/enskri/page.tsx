import Link from "next/link"
import { Suspense } from "react"
import { ChevronLeft } from "lucide-react"

import { EnskriForm } from "@/components/EnskriForm"

export default function EnskriPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="flex h-[52px] items-center px-(--spacing-screen-x)">
        <Link
          href="/antre"
          aria-label="Tounen"
          className="flex h-[52px] w-[52px] items-center justify-center text-ink"
        >
          <ChevronLeft className="size-6" aria-hidden="true" />
        </Link>
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
