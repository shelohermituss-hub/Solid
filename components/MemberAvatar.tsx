import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

/**
 * Couleur d'avatar dérivée par hash déterministe du nom (DESIGN.md §3 :
 * avatar-1..6 sont une identité décorative, jamais un statut). Même nom =
 * même couleur à chaque rendu, sans état ni prop à faire porter par
 * l'appelant — le hash remplace un choix manuel qui dériverait vite vers
 * un usage inconsistant des tokens de statut (paid/wait/late) à des fins
 * de simple décoration, ce que DESIGN.md interdit explicitement.
 */
const AVATAR_COLOR_CLASSES = [
  "bg-avatar-1",
  "bg-avatar-2",
  "bg-avatar-3",
  "bg-avatar-4",
  "bg-avatar-5",
  "bg-avatar-6",
] as const

function hashMemberColorClass(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i)
    hash |= 0
  }
  const index = Math.abs(hash) % AVATAR_COLOR_CLASSES.length
  return AVATAR_COLOR_CLASSES[index]
}

type MemberAvatarProps = {
  name: string
  initials: string
  className?: string
  fallbackClassName?: string
}

export function MemberAvatar({
  name,
  initials,
  className,
  fallbackClassName,
}: MemberAvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarFallback
        className={cn(
          "font-bold text-primary-foreground",
          hashMemberColorClass(name),
          fallbackClassName
        )}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  )
}
