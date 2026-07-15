import Link from "next/link"
import { ChevronDown, ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { mockFaq } from "@/lib/mock/faq"

export default function FaqPage() {
  const { items } = mockFaq

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
          Èd ak kesyon frekan
        </h1>
        <div className="w-[52px]" aria-hidden="true" />
      </div>

      <div className="flex-1 px-(--spacing-screen-x) py-(--spacing-stack)">
        <div className="flex flex-col gap-2.5">
          {items.map((item) => (
            <Card key={item.question} className="gap-0 p-0">
              <details className="group/faq">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-(--spacing-stack) text-body font-bold text-ink marker:content-none">
                  {item.question}
                  <ChevronDown
                    className="size-4 shrink-0 text-ink-soft transition-transform group-open/faq:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="px-(--spacing-stack) pb-(--spacing-stack) text-body text-ink-soft">
                  {item.answer}
                </p>
              </details>
            </Card>
          ))}
        </div>

        <Button
          render={<Link href="/rapote-pwoblem" />}
          variant="outline"
          className="mt-(--spacing-stack) mb-(--spacing-stack) h-[52px] w-full rounded-(--radius-btn) bg-card font-body text-body font-semibold text-ink"
        >
          Rapòte yon pwoblèm
        </Button>
      </div>
    </div>
  )
}
