export type IstorikTransaction = {
  title: string
  date: string
  reference: string
  amount: number
  direction: "out" | "in"
  celebration?: boolean
}

export type IstorikGroup = {
  monthLabel: string
  transactions: IstorikTransaction[]
}

export const mockIstorik = {
  groups: [
    {
      monthLabel: "Jiyè 2026",
      transactions: [
        {
          title: "Kotizasyon — Sòl Fanmi an",
          date: "14 jiyè",
          reference: "MC-88412-7734",
          amount: 5000,
          direction: "out",
        },
        {
          title: "Kotizasyon — Sòl Fanmi an",
          date: "4 jen",
          reference: "MC-83107-2210",
          amount: 5000,
          direction: "out",
        },
      ],
    },
    {
      monthLabel: "Fevriye 2026 — dènye sik la",
      transactions: [
        {
          title: "Pot resevwa — Sòl Zanmi Lekòl",
          date: "10 fevriye",
          reference: "MC-79552-0067",
          amount: 40000,
          direction: "in",
          celebration: true,
        },
      ],
    },
  ] as IstorikGroup[],
}
