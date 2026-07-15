export type GroupAlertLevel = "paid" | "wait" | "late"

export type DashboardGroup = {
  id: string
  name: string
  cycle: { current: number; total: number }
  potAmount: number
  alertLevel: GroupAlertLevel
  alertLabel: string
  hasLateMember?: boolean
}

export const mockDashboard = {
  organizerName: "Madan Klotid",
  stats: {
    activeGroups: 3,
    lateGroups: 2,
    potsThisWeek: 1,
  },
  groups: [
    {
      id: "fanmi",
      name: "Sòl Fanmi an",
      cycle: { current: 4, total: 10 },
      potAmount: 45000,
      alertLevel: "late",
      alertLabel: "1 reta",
      hasLateMember: true,
    },
    {
      id: "kwafe",
      name: "Sòl Machann Kwafè",
      cycle: { current: 8, total: 10 },
      potAmount: 90000,
      alertLevel: "wait",
      alertLabel: "pot vandredi",
    },
    {
      id: "legliz",
      name: "Sòl Legliz la",
      cycle: { current: 2, total: 12 },
      potAmount: 30000,
      alertLevel: "paid",
      alertLabel: "tout peye ✓",
    },
  ] satisfies DashboardGroup[],
}
