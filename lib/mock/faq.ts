export type FaqItem = {
  question: string
  answer: string
}

export const mockFaq = {
  items: [
    {
      question: "Kisa ki pase si mwen an reta pou yon kotizasyon?",
      answer:
        "Ou resevwa yon rapèl 3 jou anvan (J-3) epi 1 jou anvan (J-1) dat limit la. Si w poko peye, òganizatris la avize de jou apre (J+2). Si reta a kontinye jiska senk jou apre (J+5), pozisyon ou nan sòl la ka jele, pou pwoteje lòt manm yo.",
    },
    {
      question: "Èske lòd pozisyon yo ka chanje apre sòl la kòmanse?",
      answer:
        "Non. Yon fwa òganizatris la konfime lansman an, lòd pozisyon yo fikse pou tout moun — pèsonn pa ka chanje l, sa gen ladan ni manm yo ni òganizatris la.",
    },
    {
      question: "Èske lajan mwen an sekirite?",
      answer:
        "Wi. Chak peman verifye dirèkteman ak MonCash anvan li konfime — se pa senpleman yon notifikasyon nou resevwa. Chak tranzaksyon gen yon referans MonCash ki rete nan istorik ou kòm prèv.",
    },
    {
      question: "Èske òganizatris la ka pran lajan mwen?",
      answer:
        "Non, jamè. Wòl òganizatris la se envite manm, gade pwogrè, e voye rapèl — li pa gen aksè a lajan an, ki ale dirèk nan MonCash benefisyè a.",
    },
    {
      question: "Kisa ki pase si benefisyè a chanje nimewo MonCash li?",
      answer:
        "Tout chanjman nimewo aplike apre yon delè 48è, pou pwoteje benefisyè a kont erè oswa fwod. Vèsman pa fèt pandan delè sa a.",
    },
    {
      question: "Kijan mwen fè pou m kite yon sòl?",
      answer:
        "Ou ka kite yon gwoup anvan li lanse (anvan lòd pozisyon yo fikse). Yon fwa sòl la aktif, kontakte òganizatris la si w gen yon pwoblèm — ranplasman pase pa li.",
    },
    {
      question: "Kijan skò konfyans mwen an mache?",
      answer:
        "Ou genyen pwen lè w peye anvan dat limit la e lè w konplete yon sik san reta. Ou pèdi pwen lè w gen yon reta plis pase 5 jou. Plis pwen ou genyen, plis nivo ou monte — sa bay aksè a pozisyon bonè yo (1–3) nan nouvo sòl.",
    },
    {
      question: "Kimoun pou m kontakte si gen yon pwoblèm?",
      answer:
        "Sèvi ak \"Rapòte yon pwoblèm\" nan pwofil ou pou voye detay bay ekip Sòlid la — nou reponn byen vit.",
    },
  ] satisfies FaqItem[],
}
