import Link from "next/link"

import { Button } from "@/components/ui/button"
import { formatHTG } from "@/lib/format"
import { mockAntre } from "@/lib/mock/antre"

export default function AntrePage() {
  const { heroPotAmount } = mockAntre

  return (
    <div className="flex min-h-dvh flex-col justify-end bg-primary px-(--spacing-screen-x) pb-10">
      <div className="mx-auto mt-16 flex size-[230px] items-center justify-center rounded-full border border-white/10 bg-primary-deep">
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="font-display text-h1 font-extrabold tracking-[-0.02em] text-primary-foreground">
            {formatHTG(heroPotAmount)}
          </p>
          <p className="text-micro font-bold uppercase tracking-[0.1em] text-primary-foreground/70">
            HTG · Pot mwa a
          </p>
        </div>
      </div>

      <p className="mt-10 font-display text-h1 font-extrabold leading-tight tracking-[-0.02em] text-primary-foreground">
        Sòl ou,
        <br />
        an sekirite.
      </p>
      <p className="mt-3 text-body text-primary-foreground/80">
        Menm sòl ou konnen an — men chak goud gen resi, chak moun gen plas li,
        e pèsonn pa ka disparèt ak lajan an.
      </p>

      <div className="mt-6 flex gap-2" aria-hidden="true">
        <span className="h-2 w-6 rounded-(--radius-chip) bg-soley" />
        <span className="h-2 w-2 rounded-(--radius-chip) bg-primary-foreground/30" />
        <span className="h-2 w-2 rounded-(--radius-chip) bg-primary-foreground/30" />
      </div>

      <Button
        render={<Link href="/enskri" />}
        variant="ghost"
        className="mt-6 h-[52px] w-full rounded-(--radius-btn) bg-card font-body text-body font-semibold text-ink hover:bg-card/90"
      >
        Kòmanse
      </Button>
      {/* TODO: lier à l'écran de connexion quand il sera codé */}
      <p className="mt-3.5 text-center text-micro text-primary-foreground/70">
        Ou gen yon kont deja ?{" "}
        <span className="font-bold text-primary-foreground">Konekte</span>
      </p>
    </div>
  )
}
