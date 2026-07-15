# DESIGN.md — Sòlid

> **CE FICHIER EST LA LOI.** Toute décision visuelle du projet dérive d'ici.
> En cas de conflit avec une référence externe (references/*.md), une librairie,
> ou une habitude de génération : DESIGN.md gagne. Toujours.
>
> **v2 — 15 juillet 2026.** Réécriture complète, décidée explicitement par le
> fondateur : adoption du système visuel Cash App (structure ET langage
> visuel — palette, radius, hiérarchie), adapté au contenu et au vocabulaire
> Sòlid. Voir §8.10 pour les limites (marque, logo, wordmark). Les valeurs de
> ce fichier sont échantillonnées au pixel sur des captures réelles Cash App
> (22 écrans d'onboarding + écran Money + clone Figma détaillé), pas estimées.

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
  --color-ink: #000000;          /* texte principal — noir plein */
  --color-ink-soft: #6B6B6B;     /* texte secondaire */
  --color-paper: #F5F5F5;        /* fond d'app — gris neutre (canvas) */
  --color-card: #FFFFFF;         /* surfaces */
  --color-line: #E8E8E8;         /* bordures, séparateurs */
  --color-placeholder: #B2B2B2;  /* placeholder, désactivé */

  --color-primary: #000000;      /* L'ACTION — noir plein */
  --color-primary-deep: #1A1A1A; /* état pressé / variante sombre décorative */
  --color-primary-bg: #F0F0F0;   /* fond pâle — sélection, chip neutre */

  --color-soley: #00C244;        /* vert — CÉLÉBRATION & POT (jamais un bouton) */
  --color-soley-ink: #FFFFFF;    /* texte/icône sur solèy */
  --color-soley-bg: #E7F9ED;     /* fond pâle — info/valeur */

  --color-paid: #00C244;         /* même vert que solèy — argent confirmé */
  --color-wait: #E89B2E;         /* ambre — en attente */
  --color-late: #E0533D;         /* rouge — retard / erreur */

  /* Fonds pâles des statuts (chips, alertes) */
  --color-paid-bg: #E7F9ED;
  --color-wait-bg: #FBEFD9;
  --color-late-bg: #FBE4DF;

  /* Identité avatar — décoratif UNIQUEMENT, jamais de sens de statut ou
     d'action (voir §3). Sert à distinguer visuellement les membres d'une
     liste ; couleur choisie par hash déterministe du nom, pas par l'auteur
     du composant. Inchangés depuis v1 — aucune des références étudiées ne
     les contredit. */
  --color-avatar-1: #4F6B8C; /* bleu ardoise */
  --color-avatar-2: #7A5296; /* prune */
  --color-avatar-3: #A15A38; /* terracotta */
  --color-avatar-4: #347A72; /* sarcelle */
  --color-avatar-5: #96496A; /* mauve */
  --color-avatar-6: #5C6470; /* gris ardoise */

  /* ===== Typographie ===== */
  --font-display: "Bricolage Grotesque", sans-serif;  /* titres, montants */
  --font-body: "Public Sans", sans-serif;             /* tout le reste */
  --font-mono: ui-monospace, "SF Mono", Menlo, Consolas, monospace; /* fine print */

  --text-amount-xl: 3.6rem;   /* montant de paiement (écran Peye) */
  --text-amount: 2.2rem;      /* montant sur carte d'accueil */
  --text-h1: 1.5rem;
  --text-h2: 1.15rem;
  --text-body: 0.95rem;
  --text-small: 0.8rem;
  --text-micro: 0.68rem;      /* labels, eyebrows */

  /* ===== Rayons ===== */
  --radius-card: 22px;        /* était 18px — plus généreux, façon Cash App */
  --radius-btn: 9999px;       /* était 16px — pilule pleine */
  --radius-input: 14px;
  --radius-chip: 99px;

  /* ===== Élévation — quasi supprimée ===== */
  --shadow-card: 0 1px 2px rgba(0,0,0,.04);
  /* shadow-cta et shadow-hero (v1) sont retirés : aucune des références
     réelles étudiées (Cash App, Oportun) n'utilise d'ombre sous un bouton
     ou une carte hero — le contraste vient du blanc sur gris, pas de
     l'élévation. */

  /* ===== Espacement ===== */
  --spacing-screen-x: 22px;   /* marge horizontale de chaque écran */
  --spacing-stack: 12px;      /* entre cartes empilées */

  /* ===== Tactile ===== */
  --size-touch-min: 52px;     /* hauteur minimum de TOUT élément cliquable */
}
```

Chargement des polices (layout racine) : Google Fonts, poids `400;500;600;700`
pour Public Sans et `400;600;700;800` pour Bricolage Grotesque. Aucune autre
police, aucun autre poids. `--font-mono` est une pile système (aucun
téléchargement requis).

---

## 3. Sémantique des couleurs (la partie que les tokens ne disent pas)

- **`primary` (noir) est réservé à L'ACTION principale du flux.** Un seul
  bouton primaire plein par écran maximum. C'est la couleur la plus utilisée
  du produit — sur 22 captures réelles Cash App étudiées, le bouton plein
  est noir dans 15/22, toujours à la même proportion d'écran. Le noir est la
  couleur d'action *soutenue*, pas une couleur secondaire.
- **`soley` (vert) est réservé aux moments de valeur** : le pot, le
  bénéficiaire du mois, la célébration (cycle fini, niveau monté), les icônes
  de confirmation (coche). **`soley` n'est jamais un bouton d'action** — sur
  les 22 captures réelles, le vert n'occupe un écran en entier qu'une seule
  fois (l'écran de démarrage) ; partout ailleurs il est petit et rare. Si un
  écran n'a pas de moment de valeur, il n'a pas de vert.
- **`paid` réutilise la même teinte que `soley`** (délibéré — Cash App ne
  distingue pas "vert de statut" et "vert de célébration", les deux sont
  "argent positif"). `wait` (ambre) et `late` (rouge) restent un langage de
  statut, jamais un choix esthétique.
- Le rouge MonCash (#D6222A) n'apparaît QUE sur le badge/logo MonCash dans le
  bloc de paiement. Notre produit n'est pas rouge.
- Fond d'app : toujours `paper` (gris neutre #F5F5F5), jamais blanc pur. Les
  cartes sont blanches sur ce gris — c'est ce contraste plat qui structure
  les écrans, sans bordure ni ombre marquée.
- **Aucune couleur de marque en grand aplat.** Ni `primary` ni `soley` ne
  remplissent une carte hero ou un fond d'écran complet, à une seule
  exception : un écran d'accroche/premier lancement peut être en `primary`
  plein (comme `antre`), à condition que son bouton soit en carte blanche
  pour garder le contraste — jamais deux aplats de la même couleur qui se
  touchent.
- **`avatar-1` à `avatar-6` sont une identité décorative, jamais un statut.**
  Réservés au fond des avatars à initiales dans les listes de membres, pour
  les distinguer visuellement les uns des autres. La couleur d'un membre est
  dérivée par hash déterministe de son nom (même nom → même couleur à chaque
  rendu), jamais choisie à la main ni liée à un rôle/statut. Texte toujours
  blanc dessus (contraste vérifié ≥ 4.5:1 sur les 6 teintes).

## 4. Typographie — règles d'usage

- `display` (Bricolage Grotesque) : titres H1/H2, montants d'argent, chiffres
  de stats. Conservé de la v1 — son caractère arrondi/chaleureux est déjà
  proche de l'esprit Cash App, pas besoin de le remplacer. Pousser la graisse
  800 plus systématiquement sur les montants pour l'affirmer.
- `body` (Public Sans) : tout le reste, y compris les boutons.
- `mono` (pile système) : **nouveau**. Réservé aux petites lignes techniques —
  référence de transaction, numéro de compte tronqué — jamais pour un titre
  ou un montant. Motif confirmé sur 100% des captures réelles étudiées.
- **Maximum 3 tailles de texte par écran.** Si un écran en demande 4, sa
  hiérarchie est mal pensée — simplifier l'écran, pas ajouter une taille.
- Les montants d'argent sont TOUJOURS en display, gras (700/800), en `ink`
  (noir), avec la devise en plus petit et `ink-soft` : `5 000` grand + `HTG`
  petit. Le montant ne prend plus la couleur de fond de sa carte (v1) — il
  reste noir même sur carte blanche, c'est lui qui doit dominer, pas la carte.
- Letter-spacing négatif léger (-0.02em à -0.04em) sur les grands display
  uniquement.

## 5. Composants — mapping obligatoire

| Besoin | Composant | Règle |
|---|---|---|
| Boutons | shadcn `button` retokenisé | hauteur ≥ 52px, **radius-btn = pilule pleine**, full-width sur mobile ; bouton primaire → noir plein, sans ombre |
| Boutons secondaires | shadcn `button` variant outline | pilule fond gris clair (`primary-bg`) ou contour `line`, jamais une deuxième couleur de marque |
| Cartes | shadcn `card` retokenisé | radius-card 22px, **sans bordure marquée** (`shadow-card` très léger suffit), fond `card` blanc sur `paper` gris |
| Liste à chevron | `Button variant="outline"` full-width, icône + label + chevron | pattern déjà en place (`paramet`) — label + valeur + `ChevronRight`, jamais une liste sans indication de clic |
| Interrupteur | shadcn `switch` retokenisé | piste `line` au repos, **`soley` (vert) quand actif** — jamais `primary` (noir) |
| Paiement / confirmations | **Vaul** (bottom sheet) | tout flux d'argent passe par un drawer bas, jamais un modal centré |
| Toasts | **Sonner** | confirmations légères uniquement ; les confirmations de PAIEMENT ont leur écran Resi complet |
| Statuts membres | chip custom | pastille + fond pâle correspondant (`paid-bg` etc.) |
| Formulaires | shadcn `input`, `select` | labels en `micro` uppercase `ink-soft`, radius-input |
| Onglets | tab bar custom (3-4 items max) | icônes noires si actif, `ink-soft` sinon — jamais plus de 4 onglets |

### Le composant signature : le **wonn**

Le wonn est LE composant identitaire du produit — il n'existe dans aucune
librairie et ne doit jamais être remplacé par une liste ou un donut chart.
Aucune des références étudiées (y compris Cash App) n'a d'équivalent direct —
c'est le différenciateur visuel de Sòlid, à préserver tel quel.

Spec : un cercle SVG de 10 positions (les membres) disposées en anneau,
démarrant à 12h, sens horaire. Chaque position est un disque de 26px coloré
par statut (`paid`/`wait`/`late`), le bénéficiaire du mois en `soley` (vert)
avec un halo (`box-shadow: 0 0 0 4px rgba(0,194,68,.30)`). Au centre : le
montant du pot en display + le nom du bénéficiaire. Numéros de position
(1-10) dans les disques, en blanc sur les disques colorés. Implémentation :
SVG ou divs positionnés par trigonométrie — voir
`maquette/solid_maquette.html`, fonction `buildWonn()`, et `components/Wonn.tsx`
(la migration v1→v2 ne change que les tokens de couleur consommés, jamais la
structure du composant).

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
  0.5s cubic-bezier(.2,1.6,.4,1)) — c'est le moment de confiance. Le fond de
  cette coche est `paid` (donc `soley`/vert désormais) — cohérent avec le
  reste de la palette v2.
- `prefers-reduced-motion` respecté partout.
- INTERDIT : parallax, glow, gradients animés, texte qui s'anime lettre par
  lettre, confettis (sauf éventuellement à la complétion d'un cycle — seul
  moment qui le mériterait, à valider avec le fondateur).

## 8. Les interdits absolus

1. Aucun composant Aceternity ni effet "wow" de 21st dans l'app (réservés au
   site vitrine, hors de ce repo).
2. Aucune couleur hors tokens. Aucun `#hex` en dur dans un composant.
3. Aucune ombre hors du token `shadow-card` (§2) — élévation quasi nulle,
   jamais une ombre `#hex` ou une valeur arbitraire en dur dans un composant.
4. Pas plus d'un bouton primaire (noir plein) par écran.
5. Pas de texte sous 0.68rem. Pas de cible tactile sous 52px.
6. Pas de localStorage/sessionStorage pour des données financières.
7. Pas de dark mode en phase MVP (une variante = une source de bugs).
8. Chaque écran DOIT avoir son état vide et son état d'erreur designés.
9. Les images/illustrations : uniquement dans l'onboarding, en SVG léger.
10. **On adopte la structure ET le langage visuel de Cash App** (palette,
    radius, hiérarchie, composants — décision explicite du fondateur,
    licence des écrans de référence détenue). **On n'adopte jamais son
    identité de marque** : pas le logo « $ », pas le wordmark « Cash App »,
    pas sa police propriétaire exacte. Le nom du produit, le logo Sòlid et
    le composant wonn restent uniques et ne référencent jamais Cash App
    dans le code, la copie ou les assets livrés.

## 9. Références par écran (structure + langage visuel Cash App)

| Écran | Référence | Ce qu'on reprend |
|---|---|---|
| 1-3 Antre/Enskri | Cash App onboarding | fond blanc, un champ + un bouton noir, immense espace, hiérarchie une-idée-par-écran |
| 4 Akèy | Cash App "Money"/Pools | carte blanche à montant noir géant + deux actions, pot = équivalent structurel direct du Pools |
| 5 Detay gwoup | Cash App liste + Splitwise | liste de membres à statuts + le wonn (à nous) |
| 6 Chemen sik | Duolingo | chemin de progression vertical, position "à toi" surlignée en vert (soley) |
| 7 Peye | Cash App montant | montant géant noir, clavier natif, un bouton noir, zéro distraction |
| 8 Resi | Cash App confirmation | coche blanche sur disque vert + reçu structuré (valeurs techniques en `font-mono`) + partage |
| 9 Dashboard | Cash App Money (grille de cartes) + Stripe mobile | 3 stats + liste à alertes couleur de statut, radicalement simplifié |
| 10-11 Òganizatris | Cash App liste à chevron | création de groupe + invitations |
| 12 Pwofil/Skò | Duolingo | streaks, niveaux, progression vers le prochain palier |
| 13-14 Istorik/Notif | Cash App liste à chevron | listes chronologiques, référence en `font-mono` |
| Paramet | Cash App Security & Privacy | ligne label + icône + chevron, déjà en place |

La maquette de référence structurelle complète : `maquette/solid_maquette.html`
(structure uniquement — les couleurs qu'elle contient sont v1 et obsolètes,
suivre ce fichier DESIGN.md pour la palette).
