import type { WonnMember } from "@/components/Wonn"

export type FeaturedMember = {
  position: number
  name: string
  initials: string
  status: "paid" | "wait" | "late"
  isBeneficiary?: boolean
  isCurrentUser?: boolean
  note?: string
}

export const mockGwoup = {
  name: "Sòl Fanmi an",
  monthLabel: "Pot mwa Jiyè",
  monthShort: "Jiyè",
  potAmount: 45000,
  beneficiary: { name: "Jocelyne B.", position: 4 },
  statusCounts: { paid: 7, wait: 2, late: 1 },
  wonnMembers: [
    { position: 1, status: "late" },
    { position: 2, status: "paid" },
    { position: 3, status: "paid" },
    { position: 4, status: "paid", isBeneficiary: true },
    { position: 5, status: "wait" },
    { position: 6, status: "paid" },
    { position: 7, status: "wait" },
    { position: 8, status: "paid" },
    { position: 9, status: "paid" },
    { position: 10, status: "paid" },
  ] satisfies WonnMember[],
  featuredMembers: [
    {
      position: 4,
      name: "Jocelyne B.",
      initials: "JB",
      status: "paid",
      isBeneficiary: true,
    },
    {
      position: 7,
      name: "Fabiola M.",
      initials: "FM",
      status: "wait",
      isCurrentUser: true,
    },
    {
      position: 1,
      name: "Roosevelt D.",
      initials: "RD",
      status: "late",
      note: "resevwa deja",
    },
    {
      position: 9,
      name: "Marie-Kettia P.",
      initials: "MK",
      status: "paid",
    },
  ] satisfies FeaturedMember[],
  otherMembersCount: 6,
}
