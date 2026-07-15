"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"

type PaymentPendingStatusProps = {
  forcedOutcome?: "success" | "error"
}

/**
 * Simule la séquence webhook → vérification API MonCash (skill moncash-flow
 * Règle 0). Remplacer par le vrai flow (webhook + retrieve transaction par
 * référence) avant toute mise en prod — jamais le webhook seul comme source
 * de vérité.
 */
function simulateVerification(
  forcedOutcome?: "success" | "error"
): Promise<"success" | "error"> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(forcedOutcome ?? (Math.random() < 0.85 ? "success" : "error"))
    }, 1400)
  })
}

export function PaymentPendingStatus({
  forcedOutcome,
}: PaymentPendingStatusProps) {
  const router = useRouter()

  React.useEffect(() => {
    let cancelled = false
    simulateVerification(forcedOutcome).then((outcome) => {
      if (cancelled) return
      router.replace(outcome === "success" ? "/resi" : "/peman-echwe")
    })
    return () => {
      cancelled = true
    }
  }, [forcedOutcome, router])

  return (
    <Button
      disabled
      className="h-[52px] w-full gap-2 rounded-(--radius-btn) font-body text-body font-semibold disabled:opacity-100"
    >
      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      N ap verifye peman an…
    </Button>
  )
}
