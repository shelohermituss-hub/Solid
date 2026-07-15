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

## Tokens critiques (rappel)

- Action : `primary` #2B4BD8 (un seul élément indigo plein par écran)
- Valeur/célébration : `soley` #F5B840 (pot, bénéficiaire, jamais décoratif)
- Statuts : `paid` #1E9E6A / `wait` #E89B2E / `late` #E0533D — langage, pas déco
- Fond : `paper` #FAF8F4, cartes blanches, bordures `line` #E8E3D9, PAS d'ombres
- Typo : Bricolage Grotesque (titres, montants) + Public Sans (reste), 3 tailles max/écran
- Rayons : cartes 18px, boutons 16px, inputs 14px
- Tactile : tout élément cliquable ≥ 52px de hauteur

## Mapping composants

- **Tout flux d'argent → bottom sheet Vaul.** Jamais de modal centré pour
  payer ou confirmer une transaction.
- **Sonner** pour les confirmations légères. Les paiements réussis ont leur
  écran Resi complet (coche animée + reçu + partage), pas un toast.
- Chips de statut : pastille 9px + fond pâle (`paid-bg`, `wait-bg`, `late-bg`).
- Montants : font display, gras, devise « HTG » en petit et `ink-soft`.

## Le wonn (composant signature — ne jamais le remplacer)

Cercle de 10 positions membres, départ 12h, sens horaire. Disques 26px
colorés par statut ; bénéficiaire du mois en `soley` + halo
`0 0 0 4px rgba(245,184,64,.35)` ; centre = montant du pot (display) + nom
du bénéficiaire. Référence d'implémentation : fonction `buildWonn()` dans
maquette/solid_maquette.html. Le remplacer par une liste, un donut chart
ou un composant de librairie est une erreur à corriger.

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
