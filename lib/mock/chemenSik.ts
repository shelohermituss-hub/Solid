export type SikStepState = "done" | "now" | "upcoming"

export type SikStep = {
  position: number
  name: string
  state: SikStepState
  when: string
  isCurrentUser?: boolean
}

export const mockChemenSik = {
  groupName: "Sòl Fanmi an",
  steps: [
    {
      position: 1,
      name: "Roosevelt D.",
      state: "done",
      when: "Avril — pot resevwa ✓",
    },
    {
      position: 2,
      name: "Nadège L.",
      state: "done",
      when: "Me — pot resevwa ✓",
    },
    {
      position: 3,
      name: "Kervens J.",
      state: "done",
      when: "Jen — pot resevwa ✓",
    },
    {
      position: 4,
      name: "Jocelyne B. ★",
      state: "now",
      when: "Jiyè — pot ap prepare · 8/9 kotizasyon antre",
    },
    { position: 5, name: "Stanley P.", state: "upcoming", when: "Out" },
    { position: 6, name: "Guerline T.", state: "upcoming", when: "Septanm" },
    {
      position: 7,
      name: "Fabiola M. — ou menm 🎯",
      state: "upcoming",
      when: "Novanm — tou pa w ap rive",
      isCurrentUser: true,
    },
    { position: 8, name: "Jean-Marc A.", state: "upcoming", when: "Desanm" },
  ] satisfies SikStep[],
}
