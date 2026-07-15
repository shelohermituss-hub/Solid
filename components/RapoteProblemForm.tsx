"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const CATEGORIES = [
  "Yon manm an reta",
  "Pwoblèm ak yon peman",
  "Pwoblèm ak yon vèsman",
  "Pwoblèm ak kont mwen",
  "Lòt bagay",
]

export function RapoteProblemForm() {
  const router = useRouter()
  const [category, setCategory] = React.useState(CATEGORIES[0])
  const [description, setDescription] = React.useState("")

  const canSubmit = description.trim().length > 0

  function handleSubmit() {
    if (!canSubmit) return
    toast.success("Rapò a voye", {
      description: "Ekip Sòlid la ap gade sa e reponn ou byen vit.",
    })
    router.push("/pwofil")
  }

  return (
    <div className="flex flex-col gap-(--spacing-stack)">
      <div>
        <label className="block text-micro font-bold uppercase tracking-[0.06em] text-ink-soft">
          Kategori pwoblèm nan
        </label>
        <Select value={category} onValueChange={(v) => v && setCategory(v)}>
          <SelectTrigger className="mt-1.5 h-[52px] w-full rounded-(--radius-input) border-line bg-card px-4 text-body">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-micro font-bold uppercase tracking-[0.06em] text-ink-soft">
          Esplike pwoblèm nan
        </label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ekri sa k pase a, ak dat li si w sonje"
          className="mt-1.5 min-h-32 rounded-(--radius-input) border-line bg-card px-4 py-3 text-body"
        />
      </div>

      <Button
        type="button"
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold disabled:opacity-40"
      >
        Voye rapò a
      </Button>
    </div>
  )
}
