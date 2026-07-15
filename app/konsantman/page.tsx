import Link from "next/link"
import { ChevronLeft, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function KonsantmanPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="flex h-[52px] items-center px-(--spacing-screen-x)">
        <Button
          render={<Link href="/enskri" aria-label="Tounen" />}
          variant="ghost"
          className="size-[52px] rounded-full p-0 text-ink"
        >
          <ChevronLeft className="size-6" aria-hidden="true" />
        </Button>
        <h1 className="flex-1 text-center font-display text-body font-bold text-ink">
          Kondisyon itilizasyon
        </h1>
        <div className="w-[52px]" aria-hidden="true" />
      </div>

      <div className="flex-1 px-(--spacing-screen-x)">
        <div className="mt-2 flex flex-col items-center gap-2 text-center">
          <FileText className="size-9 text-ink-soft" aria-hidden="true" />
          <p className="text-body text-ink-soft">
            Li kondisyon yo anvan ou kontinye ak verifikasyon idantite w.
          </p>
        </div>

        <Card className="mt-(--spacing-stack) max-h-[420px] overflow-y-auto p-(--spacing-stack)">
          <p className="text-micro font-bold uppercase tracking-[0.06em] text-late">
            [TEXTE LEGAL A VALIDE]
          </p>
          <p className="mt-2 text-body text-ink-soft">
            Sa a se yon plas rezève pou kondisyon itilizasyon ak règ
            konsantman final yo. Kontni jiridik la ap ranplase pa ekip legal
            Sòlid anvan lansman piblik la — pa itilize tèks sa a kòm
            referans, se yon jaden pou desen ekran sèlman.
          </p>
          <p className="mt-3 text-body text-ink-soft">
            [Seksyon — Itilizasyon done pèsonèl ou]
          </p>
          <p className="mt-3 text-body text-ink-soft">
            [Seksyon — Responsablite nan itilizasyon MonCash]
          </p>
          <p className="mt-3 text-body text-ink-soft">
            [Seksyon — Rezolisyon konfli ak sòl yo]
          </p>
        </Card>

        <Button
          render={<Link href="/idantite" />}
          className="mt-(--spacing-stack) mb-(--spacing-stack) h-[52px] w-full rounded-(--radius-btn) font-body text-body font-semibold"
        >
          Mwen aksepte, kontinye
        </Button>
      </div>
    </div>
  )
}
