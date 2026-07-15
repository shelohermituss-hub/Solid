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

export function LogoutButton() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  function handleConfirm() {
    setOpen(false)
    router.push("/antre")
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="h-[52px] w-full rounded-(--radius-btn) bg-card font-body text-body font-semibold text-ink"
        >
          Dekonekte
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Dekonekte?</DrawerTitle>
          <DrawerDescription>
            Ou ka konekte ankò nenpòt kilè ak nimewo w.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button
            onClick={handleConfirm}
            className="h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold"
          >
            Wi, dekonekte
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
