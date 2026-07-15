export type NotificationAccent = "soley" | "paid" | "primary" | "neutral"

export type NotificationItem = {
  id: string
  accent: NotificationAccent
  title: string
  celebration?: boolean
  description: string
  timestamp: string
}

export const mockNotifikasyon = {
  items: [
    {
      id: "upcoming",
      accent: "soley",
      title: "Kotizasyon w nan 3 jou",
      description: "Sòl Fanmi an · 5 000 HTG anvan 5 out",
      timestamp: "Jodi a · 08:00",
    },
    {
      id: "confirmed",
      accent: "paid",
      title: "Peman w konfime",
      description: "5 000 HTG · referans MC-88412-7734",
      timestamp: "14 jiyè · 10:42",
    },
    {
      id: "pot",
      accent: "primary",
      title: "Jocelyne resevwa pot jiyè a !",
      celebration: true,
      description: "45 000 HTG voye · sik la kontinye — Stanley se pwochen an",
      timestamp: "12 jiyè · 16:20",
    },
    {
      id: "kyc",
      accent: "neutral",
      title: "Idantite w verifye",
      description: "Ou ka resevwa pot ou san pwoblèm kounye a",
      timestamp: "2 jiyè · 11:05",
    },
  ] satisfies NotificationItem[],
}
