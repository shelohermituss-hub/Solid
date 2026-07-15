"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-transparent bg-line p-0.5 transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 data-[checked]:bg-soley disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-6 rounded-full bg-card shadow-sm transition-transform data-[checked]:translate-x-5"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
