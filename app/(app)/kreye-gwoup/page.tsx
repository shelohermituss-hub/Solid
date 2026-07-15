import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { KreyeGwoupForm } from "@/components/KreyeGwoupForm"

export default function KreyeGwoupPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="flex h-[52px] items-center px-(--spacing-screen-x)">
        <Link
          href="/dashboard"
          aria-label="Tounen"
          className="flex h-[52px] w-[52px] items-center justify-center text-ink"
        >
          <ChevronLeft className="size-6" aria-hidden="true" />
        </Link>
        <h1 className="flex-1 text-center font-display text-body font-bold text-ink">
          Kreye yon sòl
        </h1>
        <div className="w-[52px]" aria-hidden="true" />
      </div>

      <div className="flex-1 px-(--spacing-screen-x) py-(--spacing-stack)">
        <KreyeGwoupForm />
      </div>
    </div>
  )
}
