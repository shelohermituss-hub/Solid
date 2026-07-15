import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RapoteProblemForm } from "@/components/RapoteProblemForm"

export default function RapotePwoblemPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="flex h-[52px] items-center px-(--spacing-screen-x)">
        <Button
          render={<Link href="/pwofil" aria-label="Tounen" />}
          variant="ghost"
          className="size-[52px] rounded-full p-0 text-ink"
        >
          <ChevronLeft className="size-6" aria-hidden="true" />
        </Button>
        <h1 className="flex-1 text-center font-display text-body font-bold text-ink">
          Rapòte yon pwoblèm
        </h1>
        <div className="w-[52px]" aria-hidden="true" />
      </div>

      <div className="flex-1 px-(--spacing-screen-x) py-(--spacing-stack)">
        <p className="mb-(--spacing-stack) text-body text-ink-soft">
          Di nou sa k pase a. Yon manm nan ekip Sòlid la ap gade rapò w la.
        </p>
        <RapoteProblemForm />
      </div>
    </div>
  )
}
