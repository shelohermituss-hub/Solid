# Cash App — Payment & Confirmation (structure)

> **Note de source** : Cash App n'est pas indexé dans Refero (recherche
> ciblée "Cash App" → zéro résultat pour cette app). Ce document combine deux
> proxys réels trouvés dans Refero :
> - **PayPal** (App ID 213) pour l'écran de montant — flow "Send money to
>   contact", étapes montant/clavier :
>   `https://refero.design/screens/80eb8528-d793-4e53-95d8-28cf84bfbb86` et
>   `https://refero.design/screens/84da9f8e-c81d-4a11-9853-0b9d3d0fb284`
>   (Flow ID 7235, complet : `https://refero.design/flows/7235`)
> - **Omio** (App ID 178) pour l'écran de confirmation plein écran —
>   `https://refero.design/screens/fa1ab4b0-b4b2-41eb-8d8f-4d4134fef02b`
>   (« Payment successful », étape 17 du flow 5185/5188)
>
> Ces deux apps n'ont pas la même identité — c'est volontaire : on documente
> ici deux patterns structurels indépendants (montant / confirmation), pas un
> parcours unique d'une seule marque. **Jamais copier leurs couleurs ou
> typographies.**

## 1. Hiérarchie — écran de montant

1. Barre supérieure minimale (retour + éventuel titre de contact).
2. **Montant en très grande taille**, centré horizontalement, occupant le
   tiers supérieur de l'écran — c'est la seule information dominante.
3. Ligne secondaire optionnelle sous le montant (frais, taux de change,
   conversion) en petite taille, jamais en compétition visuelle avec le
   montant.
4. **Clavier numérique** occupant le tiers inférieur, toujours visible dès
   l'arrivée sur l'écran (pas besoin de taper le champ pour l'ouvrir).
5. **Un seul bouton d'action** juste au-dessus du clavier ou en bas de
   l'écran, désactivé tant que le montant est à zéro.

## 2. Hiérarchie — écran de confirmation

1. Plein écran, fond uni (aucune barre de navigation ni contenu concurrent).
2. **Icône de succès centrée** (coche), seule figure visuelle de l'écran.
3. **Message d'état court**, une phrase, centré sous l'icône.
4. Texte d'appui optionnel (une ligne), jamais plus.
5. Aucune action requise immédiatement — l'écran peut s'auto-fermer ou
   attendre un tap pour continuer.

## 3. Composants et agencement

| Zone | Composant | Règle d'agencement |
|---|---|---|
| Montant | texte géant centré | pas de bordure, pas de champ visible — juste le chiffre |
| Conversion/frais | texte petit | directement sous le montant, alignement centré |
| Clavier | grille 3×4 | pleine largeur, touches carrées, espacement uniforme |
| Bouton d'action | bouton pleine largeur | désactivé/grisé tant que montant = 0 |
| Confirmation | icône + texte | tout centré verticalement et horizontalement, fond plein |

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

- Montant géant, clavier immédiatement visible, un seul bouton — zéro
  distraction sur l'écran Peye.
- Écran de confirmation (Resi) séparé et dédié, pas une modal éphémère.
- Bouton primaire désactivé tant que rien n'est saisi, activé sans message
  d'erreur intermédiaire.

**Ce qu'on NE copie PAS** : les couleurs Cash App (vert) ou Omio, leur
typographie, l'esthétique dark mode d'Omio — Sòlid reste sur `paper` clair
avec ses propres tokens.
