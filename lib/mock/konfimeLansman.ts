export type DrawnMember = {
  position: number
  name: string
  initials: string
  isCurrentUser?: boolean
}

export const mockKonfimeLansman = {
  groupName: "Sòl Katye Delma 33",
  kotizasyon: 5000,
  potAmount: 50000,
  drawnOrder: [
    { position: 1, name: "Nadège L.", initials: "NL" },
    { position: 2, name: "Fabiola M.", initials: "FM", isCurrentUser: true },
    { position: 3, name: "Roosevelt D.", initials: "RD" },
    { position: 4, name: "Kervens J.", initials: "KJ" },
    { position: 5, name: "Jocelyne B.", initials: "JB" },
    { position: 6, name: "Marie-Kettia P.", initials: "MK" },
    { position: 7, name: "Stanley P.", initials: "SP" },
    { position: 8, name: "Wilner A.", initials: "WA" },
    { position: 9, name: "Guerline T.", initials: "GT" },
    { position: 10, name: "Djeff O.", initials: "DO" },
  ] satisfies DrawnMember[],
}
