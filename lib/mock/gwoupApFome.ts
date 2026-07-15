export type FormingMemberStatus = "confirmed" | "pending" | "unresponsive"

export type FormingMember = {
  name: string
  initials: string
  status: FormingMemberStatus
  note?: string
}

export const mockGwoupApFome = {
  groupName: "Sòl Katye Delma 33",
  kotizasyon: 5000,
  confirmedCount: 7,
  totalCount: 10,
  inviteLink: "solid.app/j/8h3k29",
  members: [
    { name: "Fabiola M.", initials: "FM", status: "confirmed" },
    { name: "Jocelyne B.", initials: "JB", status: "confirmed" },
    { name: "Roosevelt D.", initials: "RD", status: "confirmed" },
    { name: "Nadège L.", initials: "NL", status: "confirmed" },
    { name: "Kervens J.", initials: "KJ", status: "confirmed" },
    { name: "Stanley P.", initials: "SP", status: "confirmed" },
    { name: "Guerline T.", initials: "GT", status: "confirmed" },
    { name: "Marie-Kettia P.", initials: "MK", status: "pending" },
    { name: "Wilner A.", initials: "WA", status: "pending" },
    {
      name: "Djeff O.",
      initials: "DO",
      status: "unresponsive",
      note: "Pa reponn depi 5 jou",
    },
  ] satisfies FormingMember[],
}

/** Variante démo pour `?state=full` : les 10 plas yo ranpli. */
export const mockGwoupApFomeFull = {
  ...mockGwoupApFome,
  confirmedCount: 10,
  members: mockGwoupApFome.members.map(
    (member): FormingMember => ({
      name: member.name,
      initials: member.initials,
      status: "confirmed",
    })
  ),
}
