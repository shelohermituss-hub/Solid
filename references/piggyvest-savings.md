# PiggyVest — Savings Plan Card (structure)

> **Note de source** : PiggyVest n'est pas indexé dans Refero (recherche
> ciblée "PiggyVest" → zéro résultat). Le proxy le plus proche trouvé est la
> fonctionnalité **"Jar"** (tirelire) de **Wise** (App ID 39), un concept
> d'épargne nommée par objectif très proche structurellement :
> - Onboarding Jar (illustration + CTA) — `https://refero.design/screens/133cbeb0-0ac5-409d-ac0b-5455e18cdde3`
> - Écran d'aide "How to use your jar" (3 instructions + CTA) — `https://refero.design/screens/315a834e-7e9b-4fa2-ad76-4a96c9c0c33c`
>
> **Jamais copier** les couleurs/typographie Wise ni son illustration de
> tirelire — seul le langage structurel (carte de plan nommé + progression +
> ton positif) est repris.

## 1. Hiérarchie — écran d'introduction au plan d'épargne

1. **Illustration centrée** en haut — un seul visuel, jamais une grille
   d'images.
2. **Titre court** expliquant le bénéfice (pas le mécanisme technique).
3. **Liste de 3 explications courtes**, une icône + une ligne de texte
   chacune — jamais un paragraphe dense.
4. **Un seul bouton d'action** en bas de l'écran ("Ouvrir un plan"), pleine
   largeur.

## 2. Hiérarchie — carte de plan d'épargne (dans une liste)

1. Nom du plan choisi par l'utilisateur en tête de carte.
2. **Montant accumulé** en évidence (taille supérieure au reste de la carte).
3. Indicateur de progression visuel (barre ou anneau) vers l'objectif, si un
   objectif est défini.
4. Action secondaire discrète (ajouter des fonds) intégrée à la carte, pas
   dans un menu séparé.

## 3. Composants et agencement

| Zone | Composant | Agencement |
|---|---|---|
| Intro | illustration + titre + 3 lignes | tout centré, empilé verticalement |
| CTA intro | bouton pleine largeur | fixe en bas de l'écran d'intro |
| Carte de plan | carte avec montant + progression | montant en haut, barre/anneau en dessous |
| Liste de plans | pile de cartes verticales | une carte par plan, espacement égal entre cartes |

## 4. Patterns d'interaction

- **Le ton est celui d'une invitation, pas d'un formulaire** : l'écran
  d'introduction vend le bénéfice avant de demander une action technique.
- **Progression visible en permanence** : chaque carte de plan montre l'état
  d'avancement sans qu'il faille l'ouvrir pour le voir.
- **Nommer son plan est central** : le nom choisi par l'utilisateur (pas un
  libellé générique type "Compte 2") est la première information lue sur
  chaque carte.
- **Ajouter des fonds est une action rapide**, accessible directement depuis
  la carte de la liste, sans navigation profonde.

## Ce qu'on copie pour Sòlid (langage de l'épargne / cartes de sòl)

- Ton positif et centré sur le bénéfice pour toute copie liée au pot ou à
  l'épargne collective (jamais un vocabulaire de compte bancaire froid).
- Carte de plan avec montant dominant + progression visuelle immédiate.
- Action secondaire (contribuer) intégrée à la carte plutôt que dans un menu.

**Ce qu'on NE copie PAS** : les couleurs ou l'illustration de tirelire Wise —
Sòlid utilise le wonn (DESIGN.md §5) comme représentation visuelle de la
progression collective, jamais une barre ou un anneau générique repris tel
quel d'une autre app.
