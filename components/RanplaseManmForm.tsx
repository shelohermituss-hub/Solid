"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type RanplaseManmFormProps = {
  memberName: string
  slot: number
}

export function RanplaseManmForm({
  memberName,
  slot,
}: RanplaseManmFormProps) {
  const router = useRouter()
  const [replacement, setReplacement] = React.useState("")

  const canSubmit = replacement.trim().length > 0

  function handleSubmit() {
    if (!canSubmit) return
    toast.success("Manm ranplase", {
      description: `${replacement.trim()} pran plas ${memberName} nan pozisyon ${slot}.`,
    })
    router.push("/gwoup-ap-fome")
  }

  return (
    <div className="flex flex-col gap-(--spacing-stack)">
      <div>
        <label className="block text-micro font-bold uppercase tracking-[0.06em] text-ink-soft">
          Nouvo moun pou envite
        </label>
        <Input
          value={replacement}
          onChange={(e) => setReplacement(e.target.value)}
          placeholder="Nimewo oswa non"
          className="mt-1.5 h-[52px] rounded-(--radius-input) border-line bg-card px-4 text-body"
        />
      </div>

      <Button
        type="button"
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold disabled:opacity-40"
      >
        Ranplase e envite
      </Button>
    </div>
  )
}
