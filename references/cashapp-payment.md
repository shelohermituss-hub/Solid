# Cash App — Payment & Confirmation (structure + langage visuel)

> **Note de source — corrigée (DESIGN.md v2).** Cash App n'était pas indexé
> dans Refero au moment de la première version de ce document, qui combinait
> alors deux proxys (PayPal, Omio) en excluant délibérément leurs couleurs.
> Depuis, le fondateur a fourni des captures réelles de Cash App (22 écrans
> d'onboarding iOS + écran "Money" + un clone Figma détaillé de l'app) et a
> demandé explicitement l'adoption du langage visuel Cash App pour Sòlid
> (voir DESIGN.md §8.10). Ce document est corrigé en conséquence : il ne
> documente plus seulement une structure neutre, il documente aussi la
> palette et les patterns réels, échantillonnés au pixel sur ces captures.

## 0. Ce que les vraies captures montrent (et corrigent)

L'ancienne version de ce fichier disait « Cash App = vert ». C'est faux une
fois qu'on regarde les vrais écrans, pas la marque en tête :

- **Fond** : gris neutre clair (#F5F5F5), jamais blanc pur, jamais vert.
- **Bouton d'action plein** : **noir** (#000000) dans 15 des 22 captures
  d'onboarding réelles, toujours à la même proportion d'écran (~4.8%). Le
  vert n'occupe un écran en entier qu'une seule fois : l'écran de démarrage
  (splash), à 92% de la surface — un moment rare, pas un état permanent.
- **Vert** : réservé aux moments positifs ponctuels — coche de confirmation,
  icône "Savings", toggle actif d'un réglage. Jamais un bouton principal.
- **Texte technique** (référence de transaction, numéro de compte tronqué) :
  en police **monospace**, contrastant avec les titres en grotesque gras.
- **Cartes** : blanches, sans bordure marquée, radius généreux, quasi aucune
  ombre — le contraste vient du blanc sur gris, pas de l'élévation.

Ces valeurs sont reprises telles quelles dans DESIGN.md §2 (tokens `ink`,
`paper`, `primary`, `soley`, `font-mono`). **Ce fichier ne documente plus une
structure neutre "empruntée à des proxys" — il documente le système réel,
adopté explicitement (DESIGN.md §8.10).**

## 1. Hiérarchie — écran de montant

1. Barre supérieure minimale (retour + éventuel titre de contact).
2. **Montant en très grande taille**, en noir plein (`ink`), centré
   horizontalement, occupant le tiers supérieur de l'écran — c'est la seule
   information dominante. Il ne prend pas la couleur d'une carte : il n'y a
   pas de carte à cet endroit, juste le fond `paper`.
3. Ligne secondaire optionnelle sous le montant (frais, taux de change,
   conversion) en petite taille, **en `font-mono`**, jamais en compétition
   visuelle avec le montant.
4. **Clavier numérique** occupant le tiers inférieur, toujours visible dès
   l'arrivée sur l'écran (pas besoin de taper le champ pour l'ouvrir).
5. **Un seul bouton d'action** — noir plein (`primary`) — juste au-dessus du
   clavier ou en bas de l'écran, désactivé (gris `placeholder`) tant que le
   montant est à zéro.

## 2. Hiérarchie — écran de confirmation

1. Plein écran, fond `paper` (aucune barre de navigation ni contenu concurrent).
2. **Icône de succès centrée** : coche blanche sur disque plein `soley`
   (vert) — seule figure visuelle de l'écran, et seul usage légitime du vert
   comme aplat sur tout l'écran.
3. **Message d'état court**, une phrase, centré sous l'icône, en `ink` noir.
4. Texte d'appui optionnel (une ligne), jamais plus.
5. Le détail du reçu (montant, sòl, date, référence) suit en dessous dans
   une carte ; la **référence MonCash est en `font-mono`**, pas en display.
6. Aucune action requise immédiatement — l'écran peut s'auto-fermer ou
   attendre un tap pour continuer.

## 3. Composants et agencement

| Zone | Composant | Règle d'agencement |
|---|---|---|
| Montant | texte géant centré, `ink` noir | pas de bordure, pas de champ visible — juste le chiffre |
| Conversion/frais | texte petit, `font-mono` | directement sous le montant, alignement centré |
| Clavier | grille 3×4 | pleine largeur, touches carrées, espacement uniforme |
| Bouton d'action | bouton pleine largeur, pilule noire | désactivé/grisé (`placeholder`) tant que montant = 0 |
| Confirmation | icône + texte | tout centré verticalement et horizontalement, fond `paper` |
| Référence de transaction | `font-mono` | dans la carte de reçu, jamais en display |

## 4. Patterns d'interaction

- **Zéro distraction** : l'écran de montant n'affiche rien d'autre que le
  montant, le clavier et le bouton — pas de carte, pas de liste, pas de menu.
- **Le clavier est natif à l'écran**, pas un overlay qu'il faut invoquer :
  dès qu'on arrive sur l'écran de montant, il est déjà là.
- **Le bouton s'active progressivement** : état désactivé par défaut, actif
  dès qu'un montant > 0 est saisi — pas de message d'erreur nécessaire pour
  un montant vide.
- **La confirmation est un écran dédié, pas une modal** : après paiement, on
  quitte l'écran de montant vers un écran de confirmation plein, avec sa
  propre étape dans le flow (jamais un toast qui disparaît seul).
- **Pas de retour arrière possible** depuis l'écran de confirmation vers le
  clavier — c'est un point de non-retour visuel dans le parcours.

## Ce qu'on copie pour Sòlid (Peye / Resi)

- Montant géant noir, clavier immédiatement visible, un seul bouton noir —
  zéro distraction sur l'écran Peye.
- Écran de confirmation (Resi) séparé et dédié, pas une modal éphémère, avec
  coche blanche sur disque vert.
- Bouton primaire désactivé tant que rien n'est saisi, activé sans message
  d'erreur intermédiaire.
- Référence MonCash et toute valeur technique en `font-mono` dans le reçu.

**Ce qu'on adapte, pas qu'on copie à l'identique** : le logo « $ », le
wordmark « Cash App » et sa police propriétaire exacte ne sont jamais
repris (DESIGN.md §8.10) — Sòlid garde son propre nom, son propre logo et
le composant wonn, uniques au produit.
