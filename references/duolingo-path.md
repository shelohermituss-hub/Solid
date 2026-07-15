# Duolingo — Learning Path & Streaks (structure)

> **Note de source** : Duolingo EST indexé dans Refero (App ID 5) — ce
> document décrit des écrans réels, pas un proxy. Écrans cités :
> - Chemin de progression (home) — `https://refero.design/screens/e3ac954a-8bca-4077-800d-b05302bde64e`
> - Écran de bienvenue (référence structure secondaire) — `https://refero.design/screens/ea53da28-da1c-4b36-a53a-4e34c9c9fe31`
> - Exercice avec feedback de succès + bouton Continue — `https://refero.design/screens/0307c5b0-172f-457f-b1bf-dc897ebf13a6`
> - Exercice avec feedback d'erreur — `https://refero.design/screens/4a48a669-6d21-4484-9e67-c94bafe46f43`
>
> **Jamais copier** les couleurs (vert Duolingo), la mascotte-hibou, la
> typographie ou les sons — seule la structure du chemin et des mécaniques de
> streak/feedback est documentée ici.

## 1. Hiérarchie — écran du chemin de progression (home)

1. **Barre supérieure fixe** : compteurs de streak et de monnaie virtuelle
   (gemmes), toujours visibles, jamais cachés dans un menu.
2. **Chemin vertical serpentant** occupant tout le corps de l'écran — une
   suite de nœuds (leçons) reliés par un tracé, pas une liste plate.
3. **Un nœud "actuel"** visuellement distinct (plus grand, mis en avant) —
   c'est la seule action évidente de l'écran, tout le reste est grisé ou en
   retrait visuel.
4. **Élément de récompense périodique** (coffre) positionné sur le chemin
   lui-même, pas dans un écran séparé.
5. **Barre de navigation basse** avec icônes d'app.

## 2. Hiérarchie — écran d'exercice

1. **Barre de progression** en haut (remplissage horizontal), avec un
   indicateur de "vies" restantes à côté.
2. **Contenu de la question** centré, un seul type d'interaction à la fois
   (choix de mots, association, dictée).
3. **Bouton d'action unique** en bas ("Vérifier" / "Continuer"), désactivé
   tant qu'aucune réponse n'est donnée.
4. **Panneau de feedback** qui glisse depuis le bas après validation — vert
   pour succès, rouge pour erreur — occupant environ un tiers de l'écran,
   sans jamais couvrir la question elle-même.

## 3. Composants et agencement

| Zone | Composant | Agencement |
|---|---|---|
| Barre streak/gemmes | compteurs iconiques | alignés horizontalement en haut, toujours visibles |
| Chemin | nœuds reliés par un tracé | disposition verticale serpentante, un nœud actif mis en avant |
| Récompense | icône de coffre sur le chemin | positionnée à intervalle régulier le long du tracé |
| Exercice | zone de question + options | question en haut, options/tuiles sélectionnables en dessous |
| Feedback | bandeau bas coloré | glisse depuis le bord inférieur, bouton "Continuer" inclus dedans |

## 4. Patterns d'interaction

- **Un seul point d'entrée par écran** : sur le chemin, seul le nœud actif
  est cliquable de façon évidente ; les nœuds futurs sont visuellement
  verrouillés, les nœuds passés sont accessibles mais discrets.
- **Le feedback est immédiat et intégré**, jamais un écran séparé : valider
  une réponse fait apparaître le résultat directement sous la question, avec
  le bouton de progression inclus dans le même bandeau.
- **La progression est toujours visible** : streak et barre de progression
  sont des éléments permanents de l'interface, jamais enfouis dans un profil.
- **La récompense est spatiale, pas seulement numérique** : le coffre ou
  palier apparaît physiquement sur le chemin parcouru, renforçant le sens de
  progression linéaire.
- **Le bouton d'action change de sens selon l'état** : "Vérifier" avant
  réponse, "Continuer" après feedback — jamais deux boutons distincts pour
  ces deux étapes.

## Ce qu'on copie pour Sòlid (Chemen sik)

- Chemin vertical serpentant avec un nœud "position actuelle" mis en avant,
  nœuds passés/futurs distincts visuellement.
- Barre de statut permanente en haut (équivalent streak/gemmes → score de
  fiabilité / prochain versement).
- Récompense positionnée sur le chemin lui-même plutôt que dans un écran à
  part.

**Ce qu'on NE copie PAS** : la mascotte, les couleurs vertes, les sons de
validation, la gamification compétitive (classements, ligues) — hors
périmètre du MVP Sòlid. Le "chemin du sik" adapte la structure Duolingo mais
la logique de bénéficiaires reste une invention propre à Sòlid (voir
references/NOTES.md).
