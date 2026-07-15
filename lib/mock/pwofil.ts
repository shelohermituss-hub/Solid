export const mockPwofil = {
  name: "Fabiola Mésidor",
  trustScore: 78,
  scoreMax: 100,
  level: "Manm Solid",
  stats: {
    cyclesCompleted: 2,
    onTimePayments: 14,
    streak: 6,
  },
  scoreRules: [
    { type: "positive", text: "Peye anvan dat limit la (+2 pa mwa)" },
    { type: "positive", text: "Konplete yon sik san reta (+10)" },
    { type: "negative", text: "Yon reta plis pase 5 jou (−8)" },
  ] as const,
  nextLevel: {
    pointsNeeded: 22,
    name: "Nivo Djanm",
    benefit:
      "Nivo Djanm bay aksè a pozisyon bonè yo (1–3) nan nouvo sòl.",
  },
}
