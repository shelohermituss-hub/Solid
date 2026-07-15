# NOTES — Références design (structure uniquement, jamais la peau)

> Règle : chaque fichier de ce dossier sert d'inspiration STRUCTURELLE.
> On copie la hiérarchie, les patterns, les flows. JAMAIS les couleurs,
> typographies ou identités visuelles. En cas de conflit : DESIGN.md gagne.

## Rempli via le MCP Refero

Statut réel après recherche dans Refero : **seul Duolingo est indexé tel
quel**. Wave, Cash App, Splitwise, PiggyVest et le dashboard mobile Stripe
sont absents de la base (recherches ciblées confirmées, zéro résultat pour
ces apps précises) — chaque fichier concerné utilise un proxy structurel
réel trouvé dans Refero, explicitement noté en tête de fichier avec les URLs
sources. Aucune couleur/typo de ces proxys n'a été copiée.

| Fichier | App visée | Statut | Source réelle utilisée |
|---|---|---|---|
| [x] wave-home.md | Wave | proxy | PayPal (home, login) — OTP signup non trouvé, à valider manuellement |
| [x] cashapp-payment.md | Cash App | proxy | PayPal (montant) + Omio (confirmation) |
| [x] splitwise-group.md | Splitwise | proxy | PayPal Pools (cagnotte partagée, limite notée) |
| [x] piggyvest-savings.md | PiggyVest | proxy | Wise "Jar" (tirelire nommée) |
| [x] duolingo-path.md | Duolingo | **réel** | Duolingo (App ID 5), écrans authentiques |
| [x] stripe-dashboard.md | Stripe (mobile) | proxy | Linktree Analytics + Revolut (dashboard patrimoine) |

Ce qu'on copie / ne copie pas : détaillé dans chaque fichier individuel.

## Écrans sans référence externe (patterns à nous)

- Le wonn (cercle des 10 membres) — spec dans DESIGN.md §5
- Le chemin du sik avec bénéficiaires — adaptation Duolingo, logique à nous
- La grille de frais par position — s'inspirer de MoneyFellows si trouvable
