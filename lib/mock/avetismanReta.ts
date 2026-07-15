export type EscalationStepState = "done" | "critical"

export type EscalationStep = {
  id: string
  when: string
  label: string
  state: EscalationStepState
}

export const mockAvetismanReta = {
  solName: "Sòl Fanmi an",
  amount: 5000,
  dueDate: "5 out",
  lateDays: 3,
  freezeDate: "10 out",
  steps: [
    { id: "j-3", when: "J-3", label: "Premye rapèl voye", state: "done" },
    { id: "j-1", when: "J-1", label: "Dezyèm rapèl voye", state: "done" },
    { id: "j", when: "Jou J", label: "Dat limit rive", state: "done" },
    {
      id: "j+2",
      when: "J+2",
      label: "Òganizatris la avize",
      state: "done",
    },
    {
      id: "j+5",
      when: "J+5",
      label: "Pozisyon ou ka jele si w poko peye",
      state: "critical",
    },
  ] satisfies EscalationStep[],
}
