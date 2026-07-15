"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { TriangleAlert } from "lucide-react"

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

type DeleteAccountStep = "warn" | "confirm"

export function DeleteAccountButton() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [step, setStep] = React.useState<DeleteAccountStep>("warn")

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      window.setTimeout(() => setStep("warn"), 200)
    }
  }

  function handleFinalConfirm() {
    setOpen(false)
    router.push("/antre")
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold text-ink-soft"
        >
          Efase kont mwen
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        {step === "warn" ? (
          <>
            <DrawerHeader>
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-wait-bg">
                <TriangleAlert
                  className="size-6 text-wait"
                  aria-hidden="true"
                />
              </div>
              <DrawerTitle>Efase kont ou pou tout tan?</DrawerTitle>
              <DrawerDescription>
                Sa ap efase istorik, pwofil, ak plas ou nan tout sòl aktif —
                aksyon sa a pa ka anile.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button
                onClick={() => setStep("confirm")}
                className="h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold"
              >
                Kontinye
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
        ) : (
          <>
            <DrawerHeader>
              <DrawerTitle>Dènye konfimasyon</DrawerTitle>
              <DrawerDescription>
                Yon fwa ou konfime, kont ou efase pou tout tan. Pa gen tounen
                an aryè.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button
                onClick={handleFinalConfirm}
                className="h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold"
              >
                Wi, efase kont mwen pou tout tan
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
