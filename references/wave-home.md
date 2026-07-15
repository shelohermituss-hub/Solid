# Wave — Home & Send Money (structure)

> **Note de source** : Wave n'est pas indexé dans la base Refero (recherches ciblées
> "Wave home", "Wave send money" → zéro résultat pour cette app précise).
> Ce document utilise **PayPal** (Refero App ID 213) comme proxy structurel le
> plus proche trouvé pour le pattern « écran d'accueil fintech à carte
> dominante + accès rapide à l'envoi d'argent ». Écrans cités :
> - Home (dashboard) — `https://refero.design/screens/44afa118-9a20-4e2e-8fc5-d3605f5a2b21`
> - Home (variante avec transaction récente) — `https://refero.design/screens/bf796101-a446-4992-a07f-22af0afae23d`
> - Login (référence pour la structure d'authentification) — `https://refero.design/screens/87f66c86-9e38-4156-a374-44f14e81cc3d`
>
> Aucun écran d'inscription « numéro de téléphone + OTP » propre à un vrai flow
> fintech n'a été trouvé dans Refero pour ce proxy — cette partie de la
> référence (§3) est absente de la base et reste à valider manuellement
> (capture d'écran à demander au fondateur si le pattern exact est nécessaire).
> **Jamais copier les couleurs, la typographie ou l'identité PayPal** — cette
> note documente uniquement la structure.

## 1. Hiérarchie de l'écran d'accueil

1. Barre supérieure utilitaire (icônes de recherche / notifications / profil).
2. **Carte de solde dominante** — une seule carte pleine largeur en haut de
   l'écran, montant en évidence, aucune autre carte ne rivalise visuellement.
3. **Rangée d'accès rapides** — 3 à 4 icônes horizontales (ex. renvoyer à un
   contact récent, options de transfert) juste sous la carte de solde.
4. **Carte de transaction récente** — une carte secondaire montrant la
   dernière activité (montant en couleur, avatar du contact).
5. **Barre de navigation basse fixe** — 3 items (Accueil / Envoyer-Demander /
   Portefeuille), icône centrale parfois mise en avant.

Le tout est empilé en une seule colonne verticale, sans grille complexe :
une carte = une idée, jamais deux informations concurrentes au même niveau.

## 2. Composants et agencement

| Zone | Composant | Agencement |
|---|---|---|
| Header | icônes utilitaires | alignées à droite, taille tactile réduite |
| Solde | carte pleine largeur | montant en grand, sous-titre discret |
| Accès rapides | rangée de 3-4 icônes | espacement égal, label court sous chaque icône |
| Transaction récente | carte avec avatar | avatar + nom à gauche, montant coloré à droite |
| Navigation | tab bar 3 items | fixe en bas, icône + label, item actif distinct |

Pas de sidebar, pas d'onglets horizontaux secondaires : la profondeur de
l'app se limite à la tab bar + une pile d'écrans poussés depuis les cartes.

## 3. Patterns d'interaction

- **Une carte = un tap = une action** : taper la carte de solde ouvre le
  détail du compte ; taper un raccourci d'envoi ouvre directement l'écran de
  montant (pas de menu intermédiaire).
- **Renvoi rapide** : les contacts récents apparaissent comme raccourcis
  directs — retaper un montant à quelqu'un déjà payé ne repasse pas par la
  recherche.
- **Transition carte → écran plein** : taper une carte pousse un nouvel écran
  (pas de modal) pour les actions principales ; les modals/bottom sheets sont
  réservés aux confirmations courtes (suppression, choix de méthode).
- **État d'erreur de connexion** : un bandeau d'erreur rouge en haut de
  l'écran de login, non bloquant, avec un lien pour réinitialiser — pattern à
  réutiliser pour toute erreur de formulaire dans Sòlid (bandeau, pas de popup).

## Ce qu'on copie pour Sòlid (Akèy)

- Une carte dominante (le pot / le prochain versement) + un seul bouton
  primaire, jamais deux cartes qui se disputent l'attention.
- Accès rapide horizontal sous la carte principale (ex. voir le wonn,
  historique) plutôt qu'un menu.
- Navigation basse à 3-4 items maximum, jamais de tiroir latéral.

**Ce qu'on NE copie PAS** : les couleurs PayPal (bleu/jaune), sa typographie,
ses icônes de marque, la densité d'options internationales (hors périmètre
du MVP Sòlid).
