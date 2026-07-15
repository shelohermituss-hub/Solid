export type Locale = "ht" | "fr"

/**
 * Structure i18n minimale (DESIGN.md §6 : créole par défaut, français une
 * option de réglage). Ne couvre PAS toute la copie de l'app — seulement le
 * chrome persistant (tab bar) et les écrans de Paramèt, pour prouver que le
 * mécanisme s'applique réellement en direct. Étendre le dictionnaire au
 * reste de l'app est un chantier séparé, pas dans le périmètre de ces 6
 * écrans.
 */
export const translations = {
  ht: {
    "tabbar.akey": "Akèy",
    "tabbar.sol": "Sòl",
    "tabbar.jere": "Jere",
    "tabbar.pwofil": "Pwofil",
    "paramet.title": "Paramèt",
    "paramet.chanjeLang": "Chanje lang",
    "paramet.modifyePwofil": "Modifye pwofil",
    "paramet.preferansNotifikasyon": "Preferans notifikasyon",
    "paramet.dekonekte": "Dekonekte",
    "chanjeLang.title": "Chanje lang",
    "chanjeLang.description": "Chwazi lang ou vle wè aplikasyon an. Chanjman an aplike imedyatman.",
    "chanjeLang.kreyol": "Kreyòl ayisyen",
    "chanjeLang.franse": "Français",
    "chanjeLang.applied": "Lang lan chanje",
  },
  fr: {
    "tabbar.akey": "Accueil",
    "tabbar.sol": "Sòl",
    "tabbar.jere": "Gérer",
    "tabbar.pwofil": "Profil",
    "paramet.title": "Paramètres",
    "paramet.chanjeLang": "Changer de langue",
    "paramet.modifyePwofil": "Modifier le profil",
    "paramet.preferansNotifikasyon": "Préférences de notification",
    "paramet.dekonekte": "Se déconnecter",
    "chanjeLang.title": "Changer de langue",
    "chanjeLang.description": "Choisissez la langue d'affichage de l'application. Le changement s'applique immédiatement.",
    "chanjeLang.kreyol": "Créole haïtien",
    "chanjeLang.franse": "Français",
    "chanjeLang.applied": "Langue changée",
  },
} as const satisfies Record<Locale, Record<string, string>>

export type TranslationKey = keyof (typeof translations)["ht"]
