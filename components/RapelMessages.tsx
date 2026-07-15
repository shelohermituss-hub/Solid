"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { mockRapel } from "@/lib/mock/rapel"

export function RapelMessages() {
  const router = useRouter()
  const { member, templates } = mockRapel
  const [selectedId, setSelectedId] = React.useState(templates[0].id)

  function handleSend() {
    toast.success("Rapèl la voye", {
      description: `SMS + notifikasyon voye bay ${member.name}.`,
    })
    router.push("/dashboard")
  }

  return (
    <div>
      <p className="mb-2 text-micro font-bold uppercase tracking-[0.08em] text-ink-soft">
        Chwazi mesaj la
      </p>

      <div className="flex flex-col gap-(--spacing-stack)">
        {templates.map((template) => {
          const selected = template.id === selectedId
          return (
            <Button
              key={template.id}
              type="button"
              variant="outline"
              onClick={() => setSelectedId(template.id)}
              className={cn(
                "h-auto flex-col items-start gap-0 rounded-(--radius-card) p-(--spacing-stack) text-left whitespace-normal",
                selected
                  ? "border-primary bg-primary-bg"
                  : "bg-card"
              )}
            >
              <p className="text-body leading-relaxed font-normal text-ink">
                {template.message}
              </p>
              <p className="mt-2 text-micro font-normal text-ink-soft">
                {template.tone}
              </p>
            </Button>
          )
        })}
      </div>

      <Button
        type="button"
        onClick={handleSend}
        className="mt-(--spacing-stack) h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold"
      >
        Voye rapèl la (SMS + notifikasyon)
      </Button>
      <p className="mt-3 text-center text-micro text-ink-soft">
        Rapèl otomatik yo deja pati : J-3, J-1, jou J. Sa a se rapèl pèsonèl
        ou.
      </p>
    </div>
  )
}
