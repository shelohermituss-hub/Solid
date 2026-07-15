# Stripe (mobile) — Dashboard (structure)

> **Note de source** : le dashboard mobile produit de Stripe n'est pas
> indexé dans Refero — les seuls résultats pour "Stripe" sont des pages
> marketing/documentation du site web (stripe.com), pas l'app produit.
> Le proxy le plus proche trouvé est le dashboard analytics mobile de
> **Linktree** (App ID 24), qui partage le même langage métier
> (revenu / frais / conversion) sur un layout radicalement simplifié :
> - Dashboard Analytics — `https://refero.design/screens/91c9a371-dafb-43ca-8302-2bed2a5c76de`
>
> Référence secondaire pour le pattern « 3 stats + liste » : dashboard
> patrimoine **Revolut** (App ID 74) —
> `https://refero.design/screens/b099d9db-ea7f-4a45-bc87-91ff69456c4c`
>
> **Jamais copier** les couleurs, la typographie ou l'identité Linktree/Revolut.

## 1. Hiérarchie du dashboard

1. **En-tête** avec titre de section + actions secondaires (partager,
   passer à un plan supérieur) — jamais plus de deux actions dans l'en-tête.
2. **Sélecteur de plage de dates** pleine largeur, juste sous l'en-tête —
   un seul contrôle, pas un calendrier ouvert par défaut.
3. **Carte de métriques résumées** — 2 à 3 chiffres clés côte à côte
   (ex. revenu, frais, taux de conversion), jamais plus de 3 sur une même
   ligne.
4. **Graphique combiné** sous les métriques, montrant l'évolution dans le
   temps — un seul graphique par écran, pas plusieurs superposés.
5. **Barre de navigation basse fixe** avec la section Analytics active.

## 2. Composants et agencement

| Zone | Composant | Agencement |
|---|---|---|
| En-tête | titre + 1-2 boutons | titre à gauche, actions à droite, alignés sur une ligne |
| Plage de dates | sélecteur pleine largeur | juste sous l'en-tête, toujours visible |
| Métriques | carte à 2-3 chiffres | chiffres alignés horizontalement, libellé court sous chacun |
| Graphique | carte pleine largeur | sous les métriques, légende minimale intégrée |
| Navigation | tab bar | fixe en bas, section active visuellement distincte |

## 3. Patterns d'interaction

- **Une seule vue temporelle à la fois** : changer la plage de dates
  recharge la carte de métriques et le graphique ensemble, jamais
  indépendamment.
- **Les métriques sont scannables en un coup d'œil** : gros chiffre + petit
  libellé, pas de tableau à lire ligne par ligne.
- **Le graphique est secondaire aux chiffres** : les métriques résumées sont
  toujours au-dessus du graphique, jamais l'inverse (le chiffre prime sur la
  visualisation).
- **Pas d'interaction complexe sur le graphique** au niveau du dashboard
  principal (zoom, tooltip détaillé) — ces détails vivent dans un écran
  poussé séparé si nécessaire.

## Ce qu'on copie pour Sòlid (Dashboard òganizatris)

- 3 stats résumées en haut (ex. cotisations reçues / en attente / retard),
  scannables sans lecture de tableau.
- Une liste simple sous les stats plutôt qu'un graphique complexe — Sòlid
  reste plus simplifié que Linktree/Revolut : pas de graphique du tout au
  MVP, juste stats + liste à alertes couleur (`paid`/`wait`/`late`).
- Sélecteur de période minimal si nécessaire, jamais un calendrier complet
  ouvert par défaut.

**Ce qu'on NE copie PAS** : le graphique combiné (hors périmètre du MVP
Sòlid — DESIGN.md interdit les visualisations décoratives complexes), les
couleurs et typographies Linktree/Revolut, la densité d'actions dans l'en-tête.
