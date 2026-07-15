export type NotificationPreference = {
  id: string
  label: string
  description: string
  enabled: boolean
}

export const mockPreferansNotifikasyon = {
  toggles: [
    {
      id: "rapel",
      label: "Rapèl kotizasyon",
      description: "Resevwa yon rapèl anvan dat limit kotizasyon w.",
      enabled: true,
    },
    {
      id: "anons-benefisye",
      label: "Anons benefisyè",
      description: "Konnen lè yon manm resevwa pot la.",
      enabled: true,
    },
    {
      id: "aktivite-gwoup",
      label: "Aktivite gwoup",
      description: "Nouvo manm, chanjman pozisyon, elatriye.",
      enabled: false,
    },
  ] satisfies NotificationPreference[],
}
