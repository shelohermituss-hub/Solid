"use client"

import * as React from "react"

import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { mockPreferansNotifikasyon } from "@/lib/mock/preferansNotifikasyon"

export function NotificationPreferencesForm() {
  const [toggles, setToggles] = React.useState(
    mockPreferansNotifikasyon.toggles
  )

  function handleToggle(id: string, checked: boolean) {
    setToggles((prev) =>
      prev.map((item) => (item.id === id ? { ...item, enabled: checked } : item))
    )
  }

  return (
    <div className="flex flex-col gap-2.5">
      {toggles.map((item) => (
        <Card
          key={item.id}
          className="flex-row items-center gap-3 p-(--spacing-stack)"
        >
          <div className="flex-1">
            <p className="text-body font-bold text-ink">{item.label}</p>
            <p className="text-micro text-ink-soft">{item.description}</p>
          </div>
          <Switch
            checked={item.enabled}
            onCheckedChange={(checked) => handleToggle(item.id, checked)}
            aria-label={item.label}
          />
        </Card>
      ))}
    </div>
  )
}
