"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

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

export function PayButton({
  solName,
  cycle,
  amount,
  forcedOutcome,
}: PayButtonProps) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  function handleConfirm() {
    setOpen(false)
    // La confirmation MonCash elle-même est asynchrone (webhook + vérification
    // API, skill moncash-flow Règle 0) — /peman-an-atant porte cette attente,
    // pas un spinner de drawer, et décide ensuite /resi ou /peman-echwe.
    router.push(
      forcedOutcome ? `/peman-an-atant?mock=${forcedOutcome}` : "/peman-an-atant"
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold">
          Peye ak MonCash
        </Button>
      </DrawerTrigger>
      <DrawerContent>
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
      </DrawerContent>
    </Drawer>
  )
}
