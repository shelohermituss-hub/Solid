"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

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

type KiteGwoupButtonProps = {
  groupName: string
}

function simulateLeave(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 700)
  })
}

export function KiteGwoupButton({ groupName }: KiteGwoupButtonProps) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [processing, setProcessing] = React.useState(false)

  function handleOpenChange(next: boolean) {
    if (processing) return
    setOpen(next)
  }

  async function handleConfirm() {
    setProcessing(true)
    await simulateLeave()
    setOpen(false)
    toast.success("Ou kite gwoup la", {
      description: `Ou pa fè pati ${groupName} ankò.`,
    })
    router.push("/akey")
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="h-[52px] w-full rounded-(--radius-btn) bg-card font-body text-body font-semibold text-ink"
        >
          Kite gwoup la
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        {processing ? (
          <div className="flex flex-col items-center gap-(--spacing-stack) px-(--spacing-screen-x) py-10">
            <Loader2
              className="size-8 animate-spin text-primary"
              aria-hidden="true"
            />
            <p className="text-center text-body text-ink-soft">
              N ap kite gwoup la…
            </p>
          </div>
        ) : (
          <>
            <DrawerHeader>
              <DrawerTitle>Kite {groupName}?</DrawerTitle>
              <DrawerDescription>
                Aksyon sa a pa ka anile. Ou ka mande pou antre nan yon lòt sòl
                pita.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button
                onClick={handleConfirm}
                className="h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold"
              >
                Wi, kite gwoup la
              </Button>
              <DrawerClose asChild>
                <Button
                  variant="ghost"
                  className="h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold text-ink-soft"
                >
                  Anile, rete nan gwoup la
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  )
}
