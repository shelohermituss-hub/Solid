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

type ConfirmLaunchButtonProps = {
  groupName: string
}

function simulateLaunch(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 900)
  })
}

export function ConfirmLaunchButton({ groupName }: ConfirmLaunchButtonProps) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [processing, setProcessing] = React.useState(false)

  function handleOpenChange(next: boolean) {
    if (processing) return
    setOpen(next)
  }

  async function handleConfirm() {
    setProcessing(true)
    await simulateLaunch()
    setOpen(false)
    router.push("/gwoup")
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <Button className="h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold">
          Konfime lansman an
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
              N ap fikse lòd pozisyon yo…
            </p>
          </div>
        ) : (
          <>
            <DrawerHeader>
              <DrawerTitle>Konfime lansman an?</DrawerTitle>
              <DrawerDescription>
                {groupName} — apre konfimasyon, lòd pozisyon yo pa ka chanje
                ankò, pou pèsonn.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button
                onClick={handleConfirm}
                className="h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold"
              >
                Wi, konfime lansman an
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
