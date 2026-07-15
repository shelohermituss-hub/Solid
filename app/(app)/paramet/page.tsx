"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight, Globe, LogOut, Pencil, Bell } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useLocale } from "@/lib/i18n/LocaleContext"

export default function ParametPage() {
  const { t } = useLocale()

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="flex h-[52px] items-center px-(--spacing-screen-x)">
        <Button
          render={<Link href="/pwofil" aria-label="Tounen" />}
          variant="ghost"
          className="size-[52px] rounded-full p-0 text-ink"
        >
          <ChevronLeft className="size-6" aria-hidden="true" />
        </Button>
        <h1 className="flex-1 text-center font-display text-body font-bold text-ink">
          {t("paramet.title")}
        </h1>
        <div className="w-[52px]" aria-hidden="true" />
      </div>

      <div className="flex flex-1 flex-col gap-2.5 px-(--spacing-screen-x) py-(--spacing-stack)">
        <Button
          render={<Link href="/chanje-lang" />}
          variant="outline"
          className="h-[52px] w-full justify-start gap-2.5 rounded-(--radius-btn) bg-card font-body text-body font-semibold text-ink"
        >
          <Globe className="size-4 text-ink-soft" aria-hidden="true" />
          {t("paramet.chanjeLang")}
          <ChevronRight className="ml-auto size-4 text-ink-soft" aria-hidden="true" />
        </Button>

        <Button
          render={<Link href="/modifye-pwofil" />}
          variant="outline"
          className="h-[52px] w-full justify-start gap-2.5 rounded-(--radius-btn) bg-card font-body text-body font-semibold text-ink"
        >
          <Pencil className="size-4 text-ink-soft" aria-hidden="true" />
          {t("paramet.modifyePwofil")}
          <ChevronRight className="ml-auto size-4 text-ink-soft" aria-hidden="true" />
        </Button>

        <Button
          render={<Link href="/preferans-notifikasyon" />}
          variant="outline"
          className="h-[52px] w-full justify-start gap-2.5 rounded-(--radius-btn) bg-card font-body text-body font-semibold text-ink"
        >
          <Bell className="size-4 text-ink-soft" aria-hidden="true" />
          {t("paramet.preferansNotifikasyon")}
          <ChevronRight className="ml-auto size-4 text-ink-soft" aria-hidden="true" />
        </Button>

        <Button
          render={<Link href="/dekonekte" />}
          variant="outline"
          className="h-[52px] w-full justify-start gap-2.5 rounded-(--radius-btn) bg-card font-body text-body font-semibold text-ink"
        >
          <LogOut className="size-4 text-ink-soft" aria-hidden="true" />
          {t("paramet.dekonekte")}
          <ChevronRight className="ml-auto size-4 text-ink-soft" aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
