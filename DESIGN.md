# DESIGN.md — Sòlid

> **CE FICHIER EST LA LOI.** Toute décision visuelle du projet dérive d'ici.
> En cas de conflit avec une référence externe (references/*.md), une librairie,
> ou une habitude de génération : DESIGN.md gagne. Toujours.

---

## 1. Le produit et son utilisateur (contexte obligatoire)

Sòlid digitalise le **sòl** haïtien : une tontine de 10 personnes, une
cotisation mensuelle, un pot versé chaque mois à un membre différent.

L'utilisatrice de référence s'appelle **Fabiola, 47 ans, commerçante à Port-au-Prince.**
Téléphone Android d'entrée de gamme, connexion 3G instable, littératie numérique
limitée mais utilise MonCash et WhatsApp tous les jours. **Si Fabiola hésite plus
de 3 secondes devant un écran, l'écran a échoué.** Ce critère prime sur toute
considération esthétique.

Conséquences non négociables :
- **Un écran = une action principale.** Jamais deux boutons primaires.
- **Léger** : pas d'animations lourdes, pas de librairies décoratives, images minimales.
- **La couleur est un langage** avant d'être une décoration (voir sémantique §3).

---

## 2. Tokens — Tailwind v4 `@theme`

À placer tel quel dans `app/globals.css`. **Aucune couleur, taille ou rayon
hors de ces tokens n'est autorisé dans le code.**

```css
@import "tailwindcss";

@theme {
  /* ===== Couleurs ===== */
  --color-ink: #23303F;          /* texte principal (adwaz) */
  --color-ink-soft: #5D6B7A;     /* texte secondaire */
  --color-paper: #FAF8F4;        /* fond d'app (papier chaud) */
  --color-card: #FFFFFF;         /* surfaces */
  --color-line: #E8E3D9;         /* bordures, séparateurs */

  --color-primary: #2B4BD8;      /* indigo — L'ACTION */
  --color-primary-deep: #1E36A0; /* état pressé */
  --color-soley: #F5B840;        /* jaune solèy — CÉLÉBRATION & POT */
  --color-soley-ink: #3A2A05;    /* texte sur solèy */

  --color-paid: #1E9E6A;         /* vert — payé / confirmé */
  --color-wait: #E89B2E;         /* ambre — en attente */
  --color-late: #E0533D;         /* rouge — retard / erreur */

  /* Fonds pâles des statuts (chips, alertes) */
  --color-paid-bg: #E3F4EC;
  --color-wait-bg: #FBEFD9;
  --color-late-bg: #FBE4DF;
  --color-primary-bg: #EEF2FE;
  --color-soley-bg: #FEF7E6;

  /* Identité avatar — décoratif UNIQUEMENT, jamais de sens de statut ou
     d'action (voir §3). Sert à distinguer visuellement les membres d'une
     liste ; couleur choisie par hash déterministe du nom, pas par l'auteur
     du composant. */
  --color-avatar-1: #4F6B8C; /* bleu ardoise */
  --color-avatar-2: #7A5296; /* prune */
  --color-avatar-3: #A15A38; /* terracotta */
  --color-avatar-4: #347A72; /* sarcelle */
  --color-avatar-5: #96496A; /* mauve */
  --color-avatar-6: #5C6470; /* gris ardoise */

  /* ===== Typographie ===== */
  --font-display: "Bricolage Grotesque", sans-serif;  /* titres, montants */
  --font-body: "Public Sans", sans-serif;             /* tout le reste */

  --text-amount-xl: 3.6rem;   /* montant de paiement (écran Peye) */
  --text-amount: 2.2rem;      /* montant sur carte d'accueil */
  --text-h1: 1.5rem;
  --text-h2: 1.15rem;
  --text-body: 0.95rem;
  --text-small: 0.8rem;
  --text-micro: 0.68rem;      /* labels, eyebrows */

  /* ===== Rayons ===== */
  --radius-card: 18px;
  --radius-btn: 16px;
  --radius-input: 14px;
  --radius-chip: 99px;

  /* ===== Élévation — remplace la règle "zéro ombre" de la section 8 ===== */
  --shadow-card: 0 1px 2px rgba(35,48,63,.04), 0 8px 20px -10px rgba(35,48,63,.10);
  --shadow-cta: 0 4px 14px -4px rgba(43,75,216,.35);   /* sous le bouton primaire indigo */
  --shadow-hero: 0 12px 32px -12px rgba(43,75,216,.28); /* sous la carte d'accueil bleue */

  /* ===== Espacement ===== */
  --spacing-screen-x: 22px;   /* marge horizontale de chaque écran */
  --spacing-stack: 12px;      /* entre cartes empilées */

  /* ===== Tactile ===== */
  --size-touch-min: 52px;     /* hauteur minimum de TOUT élément cliquable */
}
```

Chargement des polices (layout racine) : Google Fonts, poids `400;500;600;700`
pour Public Sans et `400;600;700;800` pour Bricolage Grotesque. Aucune autre
police, aucun autre poids.

---

## 3. Sémantique des couleurs (la partie que les tokens ne disent pas)

- **`primary` (indigo) est réservé à L'ACTION principale du flux.** Un seul
  élément indigo plein par écran maximum (le bouton principal). Les liens et
  éléments interactifs secondaires utilisent `primary` en texte sur fond
  `primary-bg`.
- **`soley` (jaune) est réservé aux moments de valeur** : le pot, le bénéficiaire
  du mois, la célébration, le CTA de l'onboarding. Jamais pour de la décoration.
  Si un écran n'a pas de "moment de valeur", il n'a pas de jaune.
- **`paid` / `wait` / `late` sont un langage de statut, jamais un choix
  esthétique.** Vert = argent confirmé. Ambre = en attente d'action. Rouge =
  retard ou erreur. Ne jamais utiliser ces couleurs pour autre chose.
- Le rouge MonCash (#D6222A) n'apparaît QUE sur le badge/logo MonCash dans le
  bloc de paiement. Notre produit n'est pas rouge.
- Fond d'app : toujours `paper`, jamais blanc pur. Les cartes sont blanches
  sur paper — c'est ce contraste doux qui structure les écrans.
- **`avatar-1` à `avatar-6` sont une identité décorative, jamais un statut.**
  Réservés au fond des avatars à initiales dans les listes de membres, pour
  les distinguer visuellement les uns des autres. La couleur d'un membre est
  dérivée par hash déterministe de son nom (même nom → même couleur à chaque
  rendu), jamais choisie à la main ni liée à un rôle/statut. Texte toujours
  blanc dessus (contraste vérifié ≥ 4.5:1 sur les 6 teintes).

## 4. Typographie — règles d'usage

- `display` (Bricolage Grotesque) : titres H1/H2, montants d'argent, chiffres
  de stats. C'est la voix "chaleureuse et solide" du produit.
- `body` (Public Sans) : tout le reste, y compris les boutons.
- **Maximum 3 tailles de texte par écran.** Si un écran en demande 4, sa
  hiérarchie est mal pensée — simplifier l'écran, pas ajouter une taille.
- Les montants d'argent sont TOUJOURS en display, gras (700/800), avec la
  devise en plus petit et `ink-soft` : `5 000` grand + `HTG` petit.
- Letter-spacing négatif léger (-0.02em à -0.04em) sur les grands display
  uniquement.

## 5. Composants — mapping obligatoire

| Besoin | Composant | Règle |
|---|---|---|
| Boutons | shadcn `button` retokenisé | hauteur ≥ 52px, radius-btn, full-width sur mobile ; bouton primaire → `shadow-cta` |
| Cartes | shadcn `card` retokenisé | radius-card, bordure `line` 1.5px, `shadow-card` (élévation douce, cf. §2) |
| Paiement / confirmations | **Vaul** (bottom sheet) | tout flux d'argent passe par un drawer bas, jamais un modal centré |
| Toasts | **Sonner** | confirmations légères uniquement ; les confirmations de PAIEMENT ont leur écran Resi complet |
| Statuts membres | chip custom | pastille + fond pâle correspondant (`paid-bg` etc.) |
| Formulaires | shadcn `input`, `select` | labels en `micro` uppercase `ink-soft`, radius-input |
| Onglets | tab bar custom (3-4 items max) | jamais plus de 4 onglets, icônes + label |

### Le composant signature : le **wonn**

Le wonn est LE composant identitaire du produit — il n'existe dans aucune
librairie et ne doit jamais être remplacé par une liste ou un donut chart.

Spec : un cercle SVG de 10 positions (les membres) disposées en anneau,
démarrant à 12h, sens horaire. Chaque position est un disque de 26px coloré
par statut (`paid`/`wait`/`late`), le bénéficiaire du mois en `soley` avec un
halo (`box-shadow: 0 0 0 4px rgba(245,184,64,.35)`). Au centre : le montant
du pot en display + le nom du bénéficiaire. Numéros de position (1-10) dans
les disques. Implémentation : SVG ou divs positionnés par trigonométrie —
voir maquette/solid_maquette.html, fonction `buildWonn()`.

## 6. Vwa — règles de copie (créole)

- **Créole haïtien par défaut, partout.** Le français est une option de
  réglage, jamais l'inverse. Pas de mélange dans un même écran.
- Voix active, verbes simples : « Kotize kounye a », « Voye rapèl », « Pataje resi a ».
- Un bouton dit exactement ce qui arrive : « Peye ak MonCash », jamais « Soumèt ».
- Les états vides sont des invitations à agir, pas des excuses :
  « Ou poko nan yon sòl — kreye youn oswa mande yon envitasyon. »
- Les erreurs disent ce qui s'est passé et comment réparer, sans s'excuser :
  « Peman an pa pase. Tcheke balans MonCash ou, epi eseye ankò. »
- Ton chaleureux mais sobre — de la fierté (« Mèsi Fabiola 🙌 »), jamais
  d'infantilisation. Émojis : maximum un par écran, uniquement aux moments
  de célébration ou dans les notifications.
- Vocabulaire stable dans toute l'app : sòl (jamais « tontine » en créole),
  kotizasyon, pot, manm, manman sòl / òganizatris, wonn, sik.

## 7. Motion

- Micro-transitions uniquement : 150-250ms, ease-out. Physiques, pas décoratives.
- Une seule animation "moment" dans toute l'app : la coche du reçu (pop
  0.5s cubic-bezier(.2,1.6,.4,1)) — c'est le moment de confiance.
- `prefers-reduced-motion` respecté partout.
- INTERDIT : parallax, glow, gradients animés, texte qui s'anime lettre par
  lettre, confettis (sauf éventuellement à la complétion d'un cycle — seul
  moment qui le mériterait, à valider avec le fondateur).

## 8. Les interdits absolus

1. Aucun composant Aceternity ni effet "wow" de 21st dans l'app (réservés au
   site vitrine, hors de ce repo).
2. Aucune couleur hors tokens. Aucun `#hex` en dur dans un composant.
3. Aucune ombre hors des tokens `shadow-card` / `shadow-cta` / `shadow-hero`
   (§2). Ces trois-là remplacent l'ancienne règle "zéro ombre" : élévation
   douce autorisée, jamais une ombre `#hex` ou une valeur arbitraire en dur
   dans un composant.
4. Pas plus d'un bouton primaire (indigo plein) par écran.
5. Pas de texte sous 0.68rem. Pas de cible tactile sous 52px.
6. Pas de localStorage/sessionStorage pour des données financières.
7. Pas de dark mode en phase MVP (une variante = une source de bugs).
8. Chaque écran DOIT avoir son état vide et son état d'erreur designés.
9. Les images/illustrations : uniquement dans l'onboarding, en SVG léger.
10. Ne jamais reproduire les couleurs/typos des apps de référence
    (Wave, Cash App, Splitwise…) — leurs structures oui, leur peau jamais.

## 9. Références par écran (structure uniquement)

| Écran | Référence | Ce qu'on copie |
|---|---|---|
| 1-3 Antre | Wave | hiérarchie une-idée-par-slide, inscription = numéro + OTP |
| 4 Akèy | Wave + PiggyVest | une carte dominante + un bouton, langage d'épargne positif |
| 5 Detay gwoup | Splitwise | liste de membres à statuts + le wonn (à nous) |
| 6 Chemen sik | Duolingo | chemin de progression vertical, position "à toi" surlignée |
| 7 Peye | Cash App | montant géant, un bouton, zéro distraction |
| 8 Resi | Cash App | coche animée + reçu structuré + partage |
| 9 Dashboard | Stripe mobile | 3 stats + liste à alertes couleur, radicalement simplifié |
| 10-11 Òganizatris | Splitwise | création de groupe + invitations |
| 12 Pwofil/Skò | Duolingo | streaks, niveaux, progression vers le prochain palier |
| 13-14 Istorik/Notif | Wave | listes chronologiques brutes, une référence par ligne |

La maquette de référence structurelle complète : `maquette/solid_maquette.html`.
