"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

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
            <button
              key={template.id}
              type="button"
              onClick={() => setSelectedId(template.id)}
              className={cn(
                "rounded-(--radius-card) border p-(--spacing-stack) text-left",
                selected
                  ? "border-primary bg-primary-bg"
                  : "border-line bg-card"
              )}
            >
              <p className="text-body leading-relaxed text-ink">
                {template.message}
              </p>
              <p className="mt-2 text-micro text-ink-soft">{template.tone}</p>
            </button>
          )
        })}
      </div>

      <button
        type="button"
        onClick={handleSend}
        className="mt-(--spacing-stack) flex h-[52px] w-full items-center justify-center rounded-(--radius-btn) bg-primary font-body text-body font-semibold text-primary-foreground active:bg-primary-deep"
      >
        Voye rapèl la (SMS + notifikasyon)
      </button>
      <p className="mt-3 text-center text-micro text-ink-soft">
        Rapèl otomatik yo deja pati : J-3, J-1, jou J. Sa a se rapèl pèsonèl
        ou.
      </p>
    </div>
  )
}
