"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { formatHTG } from "@/lib/format"

type PaymentState = "confirm" | "processing" | "error"

type PayButtonProps = {
  solName: string
  cycle: { current: number; total: number }
  amount: number
  /**
   * Force un résultat pour la QA/preview (mock uniquement — pas de logique
   * de paiement réelle tant que le skill moncash-flow n'est pas intégré).
   * Ex: /peye?mock=error
   */
  forcedOutcome?: "success" | "error"
}

/**
 * Simule la confirmation MonCash. Remplacer par le flow réel
 * (webhook + vérification API MonCash) en suivant le skill moncash-flow
 * avant tout passage en production — jamais de webhook seul comme source
 * de vérité.
 */
function simulateMonCashPayment(
  forcedOutcome?: "success" | "error"
): Promise<"success" | "error"> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (forcedOutcome) {
        resolve(forcedOutcome)
        return
      }
      resolve(Math.random() < 0.85 ? "success" : "error")
    }, 900)
  })
}

export function PayButton({
  solName,
  cycle,
  amount,
  forcedOutcome,
}: PayButtonProps) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [state, setState] = React.useState<PaymentState>("confirm")

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      window.setTimeout(() => setState("confirm"), 200)
    }
  }

  async function handleConfirm() {
    setState("processing")
    const outcome = await simulateMonCashPayment(forcedOutcome)
    if (outcome === "success") {
      // L'écran Resi complet est le seul endroit pour la coche animée
      // (DESIGN.md §7 : une seule animation "moment" dans toute l'app).
      setOpen(false)
      router.push("/resi")
      return
    }
    setState(outcome)
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <Button className="h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold">
          Peye ak MonCash
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        {state === "confirm" && (
          <>
            <DrawerHeader>
              <DrawerTitle>Konfime peman an</DrawerTitle>
              <DrawerDescription>
                {solName} · mwa {cycle.current}/{cycle.total}
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-(--spacing-screen-x) py-(--spacing-stack)">
              <p className="text-center font-display text-amount font-extrabold text-ink">
                {formatHTG(amount)}
                <span className="ml-1 font-body text-body font-normal text-ink-soft">
                  HTG
                </span>
              </p>
            </div>
            <DrawerFooter>
              <Button
                onClick={handleConfirm}
                className="h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold"
              >
                Konfime peman an
              </Button>
              <DrawerClose asChild>
                <Button
                  variant="ghost"
                  className="h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold text-ink-soft"
                >
                  Anile
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </>
        )}

        {state === "processing" && (
          <div className="flex flex-col items-center gap-(--spacing-stack) px-(--spacing-screen-x) py-10">
            <Loader2
              className="size-8 animate-spin text-primary"
              aria-hidden="true"
            />
            <p className="text-center text-body text-ink-soft">
              N ap konekte ak MonCash…
            </p>
          </div>
        )}

        {state === "error" && (
          <>
            <DrawerHeader>
              <DrawerTitle>Peman an pa pase</DrawerTitle>
              <DrawerDescription>
                Tcheke balans MonCash ou, epi eseye ankò.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button
                onClick={handleConfirm}
                className="h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold"
              >
                Eseye ankò
              </Button>
              <DrawerClose asChild>
                <Button
                  variant="ghost"
                  className="h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold text-ink-soft"
                >
                  Anile
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  )
}
