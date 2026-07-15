# NOTES — Références design

> Règle générale : chaque fichier de ce dossier sert d'inspiration
> STRUCTURELLE. On copie la hiérarchie, les patterns, les flows. JAMAIS les
> couleurs, typographies ou identités visuelles. En cas de conflit :
> DESIGN.md gagne.
>
> **Exception explicite (DESIGN.md v2, §8.10)** : `cashapp-payment.md` sort
> de cette règle générale depuis que le fondateur a fourni des captures
> réelles de Cash App et demandé explicitement l'adoption de son langage
> visuel (palette, radius, hiérarchie — jamais sa marque). C'est la seule
> exception du dossier ; tous les autres fichiers restent structure-only.

## Rempli via le MCP Refero

Statut réel après recherche dans Refero : **seul Duolingo est indexé tel
quel**. Wave, Splitwise, PiggyVest et le dashboard mobile Stripe sont
absents de la base (recherches ciblées confirmées, zéro résultat pour ces
apps précises) — chaque fichier concerné utilise un proxy structurel réel
trouvé dans Refero, explicitement noté en tête de fichier avec les URLs
sources. Aucune couleur/typo de ces proxys n'a été copiée. Cash App n'était
pas non plus indexé, mais son fichier est désormais basé sur des captures
réelles fournies directement par le fondateur (voir tableau).

| Fichier | App visée | Statut | Source réelle utilisée |
|---|---|---|---|
| [x] wave-home.md | Wave | proxy, structure only | PayPal (home, login) — OTP signup non trouvé, à valider manuellement |
| [x] cashapp-payment.md | Cash App | **réel, palette adoptée** | 22 captures d'onboarding iOS + écran Money + clone Figma, fournis par le fondateur — couleurs et radius échantillonnés au pixel, voir DESIGN.md §2 |
| [x] splitwise-group.md | Splitwise | proxy, structure only | PayPal Pools (cagnotte partagée, limite notée) |
| [x] piggyvest-savings.md | PiggyVest | proxy, structure only | Wise "Jar" (tirelire nommée) |
| [x] duolingo-path.md | Duolingo | réel, structure only | Duolingo (App ID 5), écrans authentiques |
| [x] stripe-dashboard.md | Stripe (mobile) | proxy, structure only | Linktree Analytics + Revolut (dashboard patrimoine) |

Ce qu'on copie / ne copie pas : détaillé dans chaque fichier individuel.

## Écrans sans référence externe (patterns à nous)

- Le wonn (cercle des 10 membres) — spec dans DESIGN.md §5
- Le chemin du sik avec bénéficiaires — adaptation Duolingo, logique à nous
- La grille de frais par position — s'inspirer de MoneyFellows si trouvable
