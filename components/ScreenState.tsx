import Link from "next/link"

type ScreenStateProps = {
  title: string
  description: string
  actionLabel: string
  actionHref: string
}

/**
 * Bloc partagé pour les états vide/erreur (DESIGN.md interdit #8 : chaque
 * écran doit avoir les deux). Pas d'illustration (interdit #9 : SVG léger
 * uniquement dans l'onboarding) — texte + une seule action.
 */
export function ScreenState({
  title,
  description,
  actionLabel,
  actionHref,
}: ScreenStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-(--spacing-stack) px-(--spacing-screen-x) text-center">
      <p className="font-display text-h1 font-bold text-ink">{title}</p>
      <p className="text-body text-ink-soft">{description}</p>
      <Link
        href={actionHref}
        className="flex h-[52px] w-full items-center justify-center rounded-(--radius-btn) bg-primary font-body text-body font-semibold text-primary-foreground active:bg-primary-deep"
      >
        {actionLabel}
      </Link>
    </div>
  )
}
