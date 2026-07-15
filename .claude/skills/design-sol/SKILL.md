---
name: design-sol
description: Utiliser AVANT de créer ou modifier tout composant UI, écran, style, animation ou copie visible de Sòlid. Couvre les tokens, le composant wonn, les bottom sheets de paiement, les règles créole et la checklist de validation d'écran.
---

# Skill — Gardien du design Sòlid

Ce skill est un condensé opérationnel de DESIGN.md. En cas de doute ou de
conflit, DESIGN.md (racine du repo) fait foi — le relire.

## Réflexe n°1 : le test Fabiola

Avant de valider un écran, se demander : Fabiola, 47 ans, commerçante,
Android d'entrée de gamme, 3G instable — comprend-elle cet écran en moins de
3 secondes ? Si non : simplifier, pas décorer.

## Tokens critiques (rappel — v2, système Cash App, DESIGN.md v2)

- Action : `primary` #000000 noir plein (un seul bouton primaire par écran) — la couleur d'action la plus utilisée du produit, jamais secondaire
- Valeur/célébration : `soley` #00C244 vert (pot, bénéficiaire, jamais un bouton — voir §3 de DESIGN.md, le vert n'est jamais une couleur d'action)
- Statuts : `paid` (même vert que soley) / `wait` #E89B2E / `late` #E0533D — langage, pas déco
- Fond : `paper` #F5F5F5 (gris neutre, jamais blanc pur), cartes blanches sans bordure marquée, ombres quasi supprimées (`shadow-card` très léger seulement)
- Typo : Bricolage Grotesque (titres, montants) + Public Sans (reste) + `font-mono` pour le fine print (référence de transaction), 3 tailles max/écran
- Rayons : cartes 22px, boutons en **pilule pleine** (9999px), inputs 14px
- Tactile : tout élément cliquable ≥ 52px de hauteur

## Mapping composants

- **Tout flux d'argent → bottom sheet Vaul.** Jamais de modal centré pour
  payer ou confirmer une transaction.
- **Sonner** pour les confirmations légères. Les paiements réussis ont leur
  écran Resi complet (coche animée + reçu + partage), pas un toast.
- Chips de statut : pastille 9px + fond pâle (`paid-bg`, `wait-bg`, `late-bg`).
- Montants : font display, gras, en `ink` (noir — jamais dans la couleur de
  fond de sa carte), devise « HTG » en petit et `ink-soft`.
- Valeurs techniques (référence MonCash, numéro tronqué) : `font-mono`,
  jamais en display.
- Interrupteurs (`Switch`) : vert (`soley`) quand actif, jamais noir (`primary`).

## Le wonn (composant signature — ne jamais le remplacer)

Cercle de 10 positions membres, départ 12h, sens horaire. Disques 26px
colorés par statut ; bénéficiaire du mois en `soley` (vert) + halo
`0 0 0 4px rgba(0,194,68,.30)` ; centre = montant du pot (display) + nom
du bénéficiaire. Référence d'implémentation : fonction `buildWonn()` dans
maquette/solid_maquette.html (structure uniquement — ses couleurs sont v1 et
obsolètes, suivre DESIGN.md pour la palette) et `components/Wonn.tsx`. Le
remplacer par une liste, un donut chart ou un composant de librairie est une
erreur à corriger. Aucune des références étudiées (y compris Cash App) n'a
d'équivalent — c'est le différenciateur visuel de Sòlid.

## Copie (créole par défaut)

- Boutons = l'action exacte : « Kotize kounye a », « Peye ak MonCash »,
  « Voye rapèl », « Pataje resi a ». Jamais « Soumèt » / « OK ».
- États vides = invitations : « Ou poko nan yon sòl — kreye youn oswa mande
  yon envitasyon. »
- Erreurs = fait + réparation, sans excuse : « Peman an pa pase. Tcheke
  balans MonCash ou, epi eseye ankò. »
- Vocabulaire stable : sòl, kotizasyon, pot, manm, manman sòl, wonn, sik.
- Un émoji max par écran, uniquement en célébration/notification.

## Motion

150-250ms ease-out, micro uniquement. Une seule animation "moment" : la
coche du reçu. `prefers-reduced-motion` respecté. Interdits : parallax,
glow, gradients animés, texte animé lettre par lettre.

## Checklist avant de proposer la PR d'un écran

- [ ] Zéro couleur en dur — tout en tokens
- [ ] Un seul bouton primaire ; hiérarchie lisible en 3 secondes
- [ ] Cibles ≥ 52px ; texte ≥ 0.68rem
- [ ] 3 tailles de texte maximum
- [ ] État vide + état d'erreur implémentés et rédigés en créole
- [ ] Aucun composant décoratif (Aceternity & co)
- [ ] Vérifié en 390px de large (viewport mobile)
- [ ] Correspond à la structure de l'écran dans la maquette
