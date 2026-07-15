import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * twMerge par défaut ne connaît pas l'échelle de tailles custom de
 * DESIGN.md §2 (--text-micro, --text-body, --text-h1, --text-h2,
 * --text-amount, --text-amount-xl) et les classe dans le même groupe que
 * les utilitaires de couleur `text-{color}` — un `text-body` et un
 * `text-primary-foreground` sur le même élément se faisaient donc évincer
 * l'un l'autre silencieusement. On déclare ici que ce sont des tailles de
 * police, pas des couleurs.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-micro",
        "text-small",
        "text-body",
        "text-h2",
        "text-h1",
        "text-amount",
        "text-amount-xl",
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
