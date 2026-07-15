# Guide de configuration — Sòlid
## GitHub + Claude Code (web/mobile) + MCP + Skills

> Workflow 100% cloud : le code vit sur GitHub, Claude Code travaille dans des sandboxes Anthropic, chaque tâche produit une pull request, Vercel génère une preview visible sur ton téléphone. Aucune machine locale puissante requise.

---

## Vue d'ensemble du pipeline

```
Toi (mobile/web)
   │  tâche en langage naturel
   ▼
claude.ai/code ──► sandbox cloud (clone du repo GitHub)
   │                 │ lit CLAUDE.md, DESIGN.md, skills, maquette
   │                 │ consulte les MCP (Refero, Supabase)
   │                 ▼
   │              pull request sur GitHub
   ▼
Vercel preview URL ──► tu valides sur ton téléphone ──► merge
```

---

## ÉTAPE 1 — Créer le repo GitHub

1. Sur github.com : **New repository** → `solid` → **Private**
2. Coche "Add a README" (pour que le repo ne soit pas vide)
3. C'est tout. L'initialisation du projet Next.js sera la première tâche de Claude Code (étape 6) — pas besoin de le faire toi-même.

---

## ÉTAPE 2 — Connecter GitHub à Claude Code

1. Va sur **claude.ai/code** (nécessite un plan Pro, Max ou Team — c'est en research preview)
2. Connecte ton compte GitHub quand c'est proposé
3. Autorise l'accès au repo `solid` (tu peux limiter l'autorisation à ce seul repo)
4. Vérifie que le repo apparaît dans la liste des repos disponibles

Note sécurité : tes credentials GitHub ne sont jamais dans le sandbox — toutes les opérations git passent par un proxy sécurisé d'Anthropic, et les push sont limités à la branche de travail de la session.

---

## ÉTAPE 3 — Le commit de gouvernance (AVANT tout code)

**Règle d'or du mode GitHub : chaque session cloud clone le repo. Tout ce qui n'est pas commité n'existe pas pour l'agent.**

Structure à committer en premier (tu peux créer ces fichiers directement dans l'interface web de GitHub, ou demander à Claude Code de les créer depuis les contenus fournis) :

```
solid/
├── CLAUDE.md                          ← règles de travail de l'agent
├── DESIGN.md                          ← la loi visuelle (tokens, interdits)
├── references/
│   ├── NOTES.md                       ← quoi copier / quoi ignorer, par référence
│   ├── wave-home.md                   ← export Refero Styles
│   ├── cashapp-payment.md             ← export Refero Styles
│   ├── splitwise-group.md             ← export Refero Styles
│   └── piggyvest-savings.md           ← export Refero Styles
├── maquette/
│   └── solid_maquette.html          ← la maquette des 14 écrans
├── .claude/
│   ├── settings.json
│   └── skills/
│       ├── design-sol/SKILL.md        ← gardien du design
│       └── moncash-flow/SKILL.md      ← gardien des paiements
└── .mcp.json                          ← serveurs MCP du projet
```

### Contenu du CLAUDE.md (squelette)

```markdown
# Sòlid — Règles du projet

## Hiérarchie des sources (ordre absolu)
1. DESIGN.md à la racine = LOI. Tokens, couleurs, typo, interdits.
2. maquette/solid_maquette.html = référence structurelle des 14 écrans.
3. references/*.md = inspiration structurelle UNIQUEMENT.
   Jamais leurs couleurs, jamais leurs typos. En cas de conflit, DESIGN.md gagne.

## Avant de coder un écran
- Lire DESIGN.md (obligatoire, à chaque session)
- Consulter l'écran correspondant dans la maquette
- Vérifier references/NOTES.md pour la référence associée

## Interdits techniques
- Aucun composant Aceternity ou effet décoratif dans l'app
- Pas de localStorage pour les données financières
- Copie en créole par défaut (voir DESIGN.md, section Vwa)

## Stack
Next.js App Router, TypeScript, Tailwind v4, shadcn/ui, Vaul, Sonner, Supabase

## Workflow
- Une tâche = un écran = une pull request
- Toujours vérifier que le build passe avant de proposer la PR
```

### Contenu du .mcp.json

```json
{
  "mcpServers": {
    "refero": {
      "type": "http",
      "url": "https://api.refero.design/mcp",
      "headers": {
        "Authorization": "Bearer ${REFERO_MCP_TOKEN}"
      }
    },
    "supabase": {
      "type": "http",
      "url": "https://mcp.supabase.com/mcp"
    },
    "vercel": {
      "type": "http",
      "url": "https://mcp.vercel.com"
    }
  }
}
```

⚠️ **Le token Refero ne va JAMAIS en dur dans ce fichier.** `${REFERO_MCP_TOKEN}` est résolu
depuis une variable d'environnement définie côté claude.ai/code (Paramètres du repo →
Variables d'environnement), jamais commitée. Si un token a été collé en clair par erreur
dans un terminal ou un message, régénère-le immédiatement depuis ton compte Refero.

Rôles : **Refero** = consulter les vrais écrans/flows avant de coder un pattern · **Supabase** = créer tables, migrations, policies directement · **Vercel** = déploiements et logs. (Higgsfield reste dans claude.ai pour les assets marketing — inutile dans le repo de code.)

### Les deux skills (.claude/skills/)

**design-sol/SKILL.md** — description : "Utiliser avant de créer ou modifier tout composant UI."
Contenu : rappel des tokens critiques, mapping écran → composants (Vaul pour les bottom sheets de paiement, Sonner pour les confirmations, spec du wonn en SVG custom), checklist (cibles tactiles ≥ 52px, créole par défaut, état vide obligatoire pour chaque écran).

**moncash-flow/SKILL.md** — description : "Utiliser pour tout code touchant aux paiements, webhooks ou transactions."
Contenu : idempotence des webhooks (un même webhook reçu deux fois = une seule écriture), vérification par appel API MonCash avant de marquer un paiement confirmé, machine à états stricte, jamais de versement de pot sans toutes les cotisations confirmées, journal d'audit sur chaque sortie de fonds.

Les skills se déclenchent automatiquement quand la tâche correspond à leur description — c'est la garantie que les règles critiques sont relues au bon moment, même en longue session.

---

## ÉTAPE 4 — Configurer l'environnement cloud

Dans claude.ai/code → paramètres de l'environnement du repo :

1. **Script de setup** : `npm install` (s'exécute à l'ouverture de chaque session)
2. **Variables d'environnement** : ajoute `REFERO_MCP_TOKEN` avec ton token Refero
   (jamais dans un fichier commité — voir étape 3, section .mcp.json).
3. **Accès réseau** : le sandbox est restreint par défaut. Autorise :
   - `registry.npmjs.org` (packages)
   - `*.supabase.co` et `mcp.supabase.com` (base de données)
   - `api.refero.design` (MCP références)
   - `mcp.vercel.com` (déploiement)
4. Laisse le reste fermé — c'est ta protection contre les injections de prompt.

---

## ÉTAPE 5 — Connecter Vercel au repo

1. Sur vercel.com : **Import Git Repository** → `solid`
2. Framework preset : Next.js (détecté automatiquement)
3. Résultat : **chaque pull request génère automatiquement une preview URL** — tu valides chaque écran sur ton téléphone AVANT de merger. C'est ta boucle de contrôle qualité visuelle sans machine locale.

---

## ÉTAPE 6 — Première tâche : initialisation

Dans claude.ai/code, sur le repo `solid`, lance :

> "Initialise un projet Next.js avec TypeScript, Tailwind v4 et App Router à la racine du repo. Configure shadcn/ui, installe vaul et sonner. Ajoute les composants shadcn : button, card, input, badge, avatar, tabs, dialog. Ne touche pas aux fichiers CLAUDE.md, DESIGN.md, references/, maquette/ et .claude/. Vérifie que `npm run build` passe, puis propose la PR."

Review la PR → merge. Le socle est en place.

---

## ÉTAPE 7 — Le test de validation (UN écran)

Deuxième tâche :

> "Lis DESIGN.md, consulte l'écran 7 (Peye) dans maquette/solid_maquette.html et la référence references/cashapp-payment.md. Code la page de paiement : montant géant pré-rempli, un seul bouton 'Peye ak MonCash', bottom sheet Vaul pour la confirmation, copie en créole. Propose la PR."

Ouvre la preview Vercel sur ton téléphone et juge :
- ✅ Tokens respectés (indigo #2B4BD8, solèy #F5B840, Bricolage Grotesque + Public Sans) → enchaîne les 13 autres écrans
- ❌ Dérive (couleurs Cash App, effets décoratifs, français au lieu du créole) → **rejette la PR et durcis CLAUDE.md ou le skill design** — ne corrige jamais l'écran à la main, corrige la règle qui a laissé passer l'erreur

---

## ÉTAPE 8 — Le rythme de production

- **Une tâche = un écran = une PR.** Jamais "code toute l'app" — les sessions cloud consomment des tokens rapidement, les tâches ciblées sont plus économiques ET plus contrôlables.
- Ordre de construction recommandé : écrans 4-5-6-7-8 (le cœur membre) → 1-2-3 (l'entrée) → 9-10-11 (l'organisatrice) → 12-13-14 (confiance).
- Le backend vient APRÈS que les 14 écrans tiennent en mock data : tâches Supabase (schéma, machine à états) puis intégration MonCash (avec le skill moncash-flow qui s'active automatiquement).
- Suivi mobile : l'app Claude te permet de surveiller et rediriger les sessions en cours depuis ton téléphone.

---

## Checklist finale avant la première session

- [ ] Repo `solid` créé (privé) sur GitHub
- [ ] GitHub connecté dans claude.ai/code
- [ ] Commit de gouvernance poussé : CLAUDE.md, DESIGN.md, maquette, skills, .mcp.json
- [ ] Exports Refero Styles téléchargés dans references/ + NOTES.md rempli
- [ ] Environnement cloud configuré (setup script + domaines réseau)
- [ ] Vercel connecté au repo (previews automatiques)
- [ ] Tâche d'initialisation mergée
- [ ] Test de validation sur l'écran Peye réussi

---

*Pièces encore à produire : le DESIGN.md complet, les deux SKILL.md détaillés — à générer puis committer à l'étape 3.*
