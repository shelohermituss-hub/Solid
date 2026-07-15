# Splitwise — Group Detail & Add Group (structure)

> **Note de source** : Splitwise n'est pas indexé dans Refero (recherche
> ciblée "Splitwise" → zéro résultat). Aucun proxy trouvé ne reproduit
> exactement le pattern Splitwise (groupe persistant + soldes "qui doit à
> qui" mis à jour en continu). Le proxy le plus proche est **PayPal**
> (App ID 213), fonctionnalité **Pools** (cagnottes partagées) :
> - Onboarding Pools — `https://refero.design/screens/7885f096-33f7-43a8-a76e-b3024dd38349`
>   (« pooling money with friends », bouton "Start Pooling")
> - Carte Pools sur l'écran d'accueil — `https://refero.design/screens/bf796101-a446-4992-a07f-22af0afae23d`
> - Entrée "bill-splitting" dans le menu — `https://refero.design/screens/83a750b7-16e3-4d10-8a02-3c7ca253ee06`
>
> **Limite importante** : Pools est une cagnotte collective à un seul montant
> partagé, pas un système de soldes individuels par membre comme Splitwise.
> La structure ci-dessous adapte donc le pattern de la liste de membres à
> partir de la logique de groupe PayPal, mais le composant central de Sòlid
> (le **wonn**, DESIGN.md §5) reste une invention propre — jamais un pattern
> copié de Splitwise ni de PayPal.

## 1. Hiérarchie — détail de groupe

1. Titre du groupe en en-tête, avec accès aux réglages du groupe.
2. **Résumé du groupe** — un bloc unique montrant le montant total ou
   l'objectif de la cagnotte, jamais dispersé en plusieurs chiffres.
3. **Liste des membres** — une ligne par membre, avatar + nom + statut
   (contribué / en attente), triée par ordre stable (pas de tri dynamique
   qui bouge les positions).
4. Bouton d'action principal (contribuer / inviter) en bas ou flottant.

## 2. Hiérarchie — création de groupe

1. Écran d'onboarding dédié avant la création (explique le concept en une
   phrase + une image), pas un formulaire brut en premier écran.
2. Un seul bouton d'entrée dans le flow ("Commencer").
3. Étapes de création strictement séquentielles : nommer le groupe → ajouter
   des membres → confirmer — jamais tout sur un seul écran.

## 3. Composants et agencement

| Zone | Composant | Agencement |
|---|---|---|
| En-tête groupe | titre + icône réglages | titre centré ou aligné à gauche, icône à droite |
| Résumé | carte unique | un seul montant dominant, pas de tableau de chiffres |
| Membres | liste verticale | avatar + nom à gauche, statut/pastille à droite |
| Action | bouton pleine largeur | fixe en bas ou flottant au-dessus du contenu |
| Onboarding | image + texte + CTA | un seul écran, un seul bouton, pas de formulaire |

## 4. Patterns d'interaction

- **Créer un groupe est un parcours dédié**, pas un simple formulaire modal :
  on explique d'abord le "pourquoi", puis on demande les informations.
- **La liste de membres est statique dans son ordre** — pas de tri
  alphabétique ou par montant qui ferait bouger les lignes à chaque
  rafraîchissement (les membres retrouvent toujours leur position).
- **Le statut de chaque membre est visuel avant d'être textuel** : une
  pastille de couleur ou une icône se lit plus vite qu'un mot.
- **L'invitation est une action secondaire**, jamais le bouton principal de
  l'écran de détail (le bouton principal reste l'action financière : payer /
  contribuer).

## Ce qu'on copie pour Sòlid (Detay gwoup)

- Écran de détail avec un résumé unique en haut (au lieu du wonn, propre à
  Sòlid) + liste de membres à statuts, ordre stable.
- Flow de création de groupe séquentiel et progressif (jamais un formulaire
  unique à 6 champs).

**Ce qu'on NE copie PAS** : le concept de cagnotte à montant unique de Pools
(Sòlid a un ordre de versement individuel par membre, pas une cagnotte
commune) ni ses couleurs/typographie — et surtout pas le wonn, qui est une
invention Sòlid documentée dans DESIGN.md §5, à ne jamais remplacer par une
liste ou un donut chart.
