"use client"

import { Copy } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

type CopyInviteLinkButtonProps = {
  inviteLink: string
}

export function CopyInviteLinkButton({
  inviteLink,
}: CopyInviteLinkButtonProps) {
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(`https://${inviteLink}`)
    } catch {
      // Presse-papier indisponible (mock) — le toast reste la confirmation.
    }
    toast.success("Lyen kopye", {
      description: "Pataje l sou WhatsApp oswa SMS pou envite manm yo.",
    })
  }

  return (
    <Button
      type="button"
      onClick={handleCopy}
      className="h-[52px] w-full gap-2 rounded-(--radius-btn) font-body text-body font-semibold"
    >
      <Copy className="size-4" aria-hidden="true" />
      Kopye lyen envitasyon an
    </Button>
  )
}
