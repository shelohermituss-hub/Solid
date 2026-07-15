# Sòlid — Règles du projet

Application de tontine (sòl) digitalisée pour Haïti : groupes de 10 membres,
cotisations mensuelles via MonCash, pot versé chaque mois à un membre selon un
ordre immuable. App-first (pas de bot en phase 1), mobile-first, créole par défaut.

## Hiérarchie des sources (ordre absolu)

1. **DESIGN.md** à la racine = LOI visuelle. Tokens, sémantique, interdits.
2. **maquette/solid_maquette.html** = référence structurelle des 14 écrans du MVP.
3. **references/*.md** = inspiration structurelle UNIQUEMENT (patterns, hiérarchie).
   Jamais leurs couleurs, jamais leurs typographies. En cas de conflit, DESIGN.md gagne.

## Avant de coder un écran (obligatoire, à chaque session)

1. Lire DESIGN.md en entier.
2. Ouvrir l'écran correspondant dans maquette/solid_maquette.html.
3. Consulter references/NOTES.md pour la référence associée à cet écran.
4. Si le MCP Refero est disponible et que le pattern est incertain, chercher
   un flow réel AVANT de coder — ne jamais inventer un pattern de paiement.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind v4 (tokens dans app/globals.css, bloc @theme — voir DESIGN.md §2)
- shadcn/ui (retokenisé), Vaul (bottom sheets), Sonner (toasts)
- Supabase (base de données, auth, RLS) via MCP
- Vercel (déploiement, previews par PR) via MCP

## Interdits techniques

- Aucun composant Aceternity / effet décoratif dans l'app.
- Aucune couleur en dur : tout passe par les tokens de DESIGN.md.
- Pas de localStorage/sessionStorage pour des données financières.
- Copie en créole par défaut (DESIGN.md §6). Le français est un réglage.
- Aucune logique de paiement sans consulter le skill moncash-flow.

## Workflow

- **Une tâche = un écran (ou un module) = une pull request.**
- Chaque PR doit passer `npm run build` et `npm run lint` avant d'être proposée.
- Ne jamais modifier CLAUDE.md, DESIGN.md, maquette/ ou references/ sans
  demande explicite du fondateur.
- Mock data d'abord : les 14 écrans tiennent en données factices AVANT
  l'intégration Supabase, qui vient ensuite, qui vient AVANT MonCash.
- Nommage : composants en anglais (PayButton), copie visible en créole
  (« Peye ak MonCash »).

## Définition de "terminé" pour un écran

- Respecte les tokens et règles de DESIGN.md (zéro hex en dur).
- État normal + état vide + état d'erreur implémentés.
- Cibles tactiles ≥ 52px, un seul bouton primaire.
- Copie en créole conforme au vocabulaire stable (DESIGN.md §6).
- Build vert, preview Vercel fonctionnelle sur mobile (390px).
