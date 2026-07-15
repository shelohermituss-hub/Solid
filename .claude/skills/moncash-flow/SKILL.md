---
name: moncash-flow
description: Utiliser pour TOUT code touchant aux paiements, webhooks MonCash, transactions, versement du pot, machine à états des groupes, ou schéma de base de données financier de Sòlid. Contient les règles d'intégrité non négociables du système.
---

# Skill — Gardien des flux d'argent Sòlid

Une tontine qui perd une gourde perd toute sa raison d'être : la confiance.
Ces règles ne sont JAMAIS optionnelles, même pour un prototype.

## Règle 0 : la source de vérité

Le webhook MonCash n'est JAMAIS la source de vérité seul. Séquence obligatoire
pour toute confirmation de paiement :

1. Webhook reçu → enregistrer l'événement brut (table `webhook_events`)
2. **Vérifier la transaction par un appel direct à l'API MonCash** (retrieve
   transaction par référence)
3. Seulement si la vérification confirme : marquer la cotisation `paid`
4. Émettre le reçu (horodaté, avec référence MonCash)

Un webhook falsifié ou rejoué est l'attaque n°1 contre ce type de système.

## Règle 1 : idempotence partout

- Chaque webhook porte une clé d'idempotence (référence transaction MonCash).
- Le même événement reçu deux fois = UNE seule écriture. Contrainte UNIQUE en
  base sur la référence, et le handler tolère le doublon silencieusement.
- Toute écriture financière est dans une transaction SQL atomique.

## Règle 2 : la machine à états est stricte

États d'un groupe : `forming → active → collecting → pot_ready → pot_sent → next_month | completed`
États d'une cotisation : `due → pending → paid | late | defaulted`

- Aucune transition manuelle, aucune transition sautée.
- **Le versement du pot ne part JAMAIS si l'état « toutes les cotisations du
  mois confirmées » n'est pas atteint** (9 cotisations `paid` avec netting).
- L'ordre des bénéficiaires est immuable après le passage `forming → active`
  (colonne protégée, aucun UPDATE autorisé — RLS + trigger de blocage).

## Règle 3 : le versement du pot = double contrôle

C'est le moment le plus dangereux (45 000 HTG sortent). Verrous obligatoires :

- Vérifier que le bénéficiaire = celui de l'ordre défini au lancement.
- Numéro MonCash du bénéficiaire confirmé (micro-versement test au 1er cycle).
- Tout changement de numéro bénéficiaire : délai de 48h + reconfirmation.
- Journal d'audit signé (table append-only `audit_log`) pour chaque sortie
  de fonds : qui, quoi, quand, référence, état avant/après.

## Règle 4 : anti-fraude par construction

- 1 compte MonCash = 1 identité KYC = 1 membre. Contrainte d'unicité stricte.
- L'organisatrice n'a JAMAIS accès aux fonds : rôle lecture + invitation +
  relance uniquement (RLS Supabase par rôle).
- Nouveaux membres : positions tardives uniquement (épargne d'abord). L'accès
  aux positions 1-3 se débloque par le score de fiabilité.
- Retards : rappels auto J-3 / J-1 / J, escalade organisatrice J+2, gel de
  position J+5 — tout automatique, rien de manuel.

## Règle 5 : traçabilité = défense

- Chaque paiement → reçu horodaté instantané avec référence MonCash.
- Chaque ligne d'historique affiche sa référence — c'est la preuve du membre
  ET la nôtre en cas de litige.
- Les événements webhook bruts sont conservés tels quels (debugging + audit).

## Schéma minimal attendu (Supabase)

`users` (kyc_status, moncash_number UNIQUE, trust_score) ·
`groups` (state, amount, pot_day) ·
`memberships` (group_id, user_id, position — immuable après activation) ·
`contributions` (month, state, moncash_ref UNIQUE, paid_at) ·
`payouts` (month, beneficiary, state, moncash_ref, verified_by_api) ·
`webhook_events` (raw payload, idempotency_key UNIQUE) ·
`audit_log` (append-only)

RLS activé sur TOUTES les tables. Un membre ne voit que ses groupes ;
l'organisatrice voit ses groupes en lecture ; personne ne modifie une
position ni une écriture financière.

## Checklist avant de proposer une PR touchant l'argent

- [ ] Vérification API après webhook (jamais webhook seul)
- [ ] Idempotence testée (rejouer le même webhook = aucune double écriture)
- [ ] Transitions d'état validées par la machine, pas par du code ad hoc
- [ ] Aucun versement possible avec une cotisation manquante (test inclus)
- [ ] audit_log alimenté sur toute sortie de fonds
- [ ] RLS vérifiées pour les 3 rôles (membre, organisatrice, admin)
- [ ] Aucun secret en dur ; variables d'environnement uniquement
