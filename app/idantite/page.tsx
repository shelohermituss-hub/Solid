import Link from "next/link"
import { Camera, ChevronLeft, Lock } from "lucide-react"

export default function IdantitePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="flex h-[52px] items-center px-(--spacing-screen-x)">
        <Link
          href="/enskri"
          aria-label="Tounen"
          className="flex h-[52px] w-[52px] items-center justify-center text-ink"
        >
          <ChevronLeft className="size-6" aria-hidden="true" />
        </Link>
        <h1 className="flex-1 text-center font-display text-body font-bold text-ink">
          Idantite ou
        </h1>
        <div className="w-[52px]" aria-hidden="true" />
      </div>

      <div className="flex-1 px-(--spacing-screen-x)">
        <p className="mt-2 mb-(--spacing-stack) text-micro text-ink-soft">
          Yon foto pyès idantite ou (CIN oswa paspò). Ou ka fè sa pita — men w
          ap bezwen l anvan ou resevwa yon pot.
        </p>

        <div className="flex flex-col items-center gap-2 rounded-(--radius-card) border border-dashed border-line bg-card px-4 py-10 text-center shadow-card">
          <Camera className="size-9 text-ink-soft" aria-hidden="true" />
          <p className="text-body font-bold text-ink">Pran foto pyès la</p>
          <p className="text-micro text-ink-soft">
            Kenbe l byen klè, san reflè
          </p>
        </div>

        <div className="mt-(--spacing-stack) flex items-center gap-3 rounded-(--radius-card) border border-transparent bg-primary-bg p-(--spacing-stack)">
          <Lock className="size-5 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-micro text-primary">
            Dokiman ou rete chifre. Se sèlman ekip verifikasyon an ki wè l.
          </p>
        </div>

        <Link
          href="/akey"
          className="mt-(--spacing-stack) flex h-[52px] w-full items-center justify-center rounded-(--radius-btn) bg-primary font-body text-body font-semibold text-primary-foreground shadow-cta active:bg-primary-deep"
        >
          Voye pou verifikasyon
        </Link>
        <Link
          href="/akey"
          className="mt-2.5 flex h-[52px] w-full items-center justify-center rounded-(--radius-btn) border border-line bg-card font-body text-body font-semibold text-ink"
        >
          M ap fè sa pita
        </Link>
      </div>
    </div>
  )
}
