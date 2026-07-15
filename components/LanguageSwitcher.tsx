"use client"

import { Check } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { useLocale } from "@/lib/i18n/LocaleContext"
import type { Locale } from "@/lib/i18n/translations"
import { cn } from "@/lib/utils"

const OPTIONS = [
  { value: "ht", labelKey: "chanjeLang.kreyol" },
  { value: "fr", labelKey: "chanjeLang.franse" },
] as const

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale()

  function handleSelect(value: Locale) {
    setLocale(value)
    toast.success(t("chanjeLang.applied"))
  }

  return (
    <div className="flex flex-col gap-2.5">
      {OPTIONS.map((option) => {
        const selected = option.value === locale
        return (
          <Button
            key={option.value}
            type="button"
            variant="outline"
            onClick={() => handleSelect(option.value)}
            className={cn(
              "h-[52px] w-full justify-between rounded-(--radius-btn) bg-card px-4 font-body text-body font-semibold text-ink",
              selected && "border-primary bg-primary-bg text-primary"
            )}
          >
            {t(option.labelKey)}
            {selected && <Check className="size-4" aria-hidden="true" />}
          </Button>
        )
      })}
    </div>
  )
}
