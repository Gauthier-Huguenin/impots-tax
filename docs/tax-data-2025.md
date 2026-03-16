# Tax Data Reference — impots.tax

> Last updated: March 2026
> Data year: 2025-2026 (as noted per section)
> This file is the single source of truth for all fiscal data displayed on the site.
> Every number must have a source. Unverified numbers are marked [TODO: verify].

---

## 1. Impôt sur le revenu (IR) — Barème 2026 (revenus 2025)

Source: Loi de finances 2026, Service-Public.fr, economie.gouv.fr
Indexation: +0.9% (inflation)

| Tranche (par part) | Taux |
|---|---|
| Jusqu'à 11 600 € | 0% |
| 11 601 € — 29 579 € | 11% |
| 29 580 € — 84 577 € | 30% |
| 84 578 € — 181 917 € | 41% |
| Au-delà de 181 917 € | 45% |

Nouveauté 2026: Contribution Différentielle sur les Hauts Revenus (CDHR), garantissant un taux d'imposition minimum de 20% pour les foyers les plus aisés.

Quotient familial: 1 part par adulte, 0.5 part par enfant (1 part à partir du 3e).
Plafond avantage QF: 1 807 € par demi-part (2026).

---

## 2. Impôt sur les sociétés (IS) — 2025/2026

Source: economie.gouv.fr, entreprendre.service-public.fr, compta-online.com

| Taux | Condition |
|---|---|
| 25% | Taux normal, toutes entreprises |
| 15% | PME, sur les premiers 42 500 € de bénéfice |

Conditions taux réduit PME:
- CA HT ≤ 10 M€
- Capital entièrement libéré
- Capital détenu ≥ 75% par des personnes physiques

Contribution sociale sur l'IS: 3.3% pour les entreprises dont CA HT > 7.63 M€ et IS > 763 000 €.

Contribution exceptionnelle 2025-2026 (grandes entreprises): 20.6% entre 1 et 3 Mds€ de CA, 41.2% au-delà. Source: Loi de finances 2025, prorogée en 2026.

Nota: Le PLF 2026 prévoyait de relever le seuil du taux réduit de 42 500 € à 100 000 €, mais ce n'est pas encore promulgué à date. [TODO: vérifier statut final]

---

## 3. Flat Tax / PFU (Prélèvement Forfaitaire Unique)

Source: Ramify.fr, Shine.fr, Service-Public.fr, Loi n°2025-1403 (LFSS 2026)

### Revenus 2025 (déclarés en 2026)
| Composante | Taux |
|---|---|
| IR forfaitaire | 12.8% |
| Prélèvements sociaux | 17.2% |
| **Total PFU** | **30%** |

### Revenus 2026 (déclarés en 2027) — CHANGEMENT
| Composante | Taux |
|---|---|
| IR forfaitaire | 12.8% |
| Prélèvements sociaux | 18.6% (hausse CSG de 9.2% à 10.6%) |
| **Total PFU** | **31.4%** |

Exception: Certains produits restent à 17.2% de prélèvements sociaux (assurance-vie, PEL/CEL, PEP), soit un PFU total de 30%.

S'applique à: dividendes, intérêts, plus-values mobilières (actions, obligations, fonds), plus-values crypto (dès conversion en euros, seuil d'exonération: 305 €/an de cessions).

Option barème progressif: possible chaque année (case 2OP), choix global et irrévocable pour l'année. Avantage si TMI ≤ 11%. Pour les dividendes, abattement de 40% applicable uniquement au barème.

---

## 4. TVA

Source: impots.gouv.fr, economie.gouv.fr

| Taux | Application |
|---|---|
| 20% | Taux normal (majorité des biens et services) |
| 10% | Taux intermédiaire (restauration, transport, travaux rénovation, médicaments non remboursables) |
| 5.5% | Taux réduit (alimentation, livres, énergie, équipements handicapés, spectacles vivants) |
| 2.1% | Taux super-réduit (presse, médicaments remboursables, redevance TV) |

La France a inventé la TVA en 1954 (Maurice Lauré). Le taux normal a été de 16.85% à l'origine.

---

## 5. Cotisations sociales (salariés, secteur privé) — 2025

Source: URSSAF barème 2025, CAPEB tableau 2025, Cleiss.fr, CCI

Plafond mensuel SS (PMSS): 3 925 €
Plafond annuel SS (PASS): 47 100 €
SMIC mensuel brut: 1 801.80 € (11.88 €/h)

### Cotisations principales (salaire ≤ 2.5 SMIC)

| Cotisation | Employeur | Salarié | Total |
|---|---|---|---|
| Maladie, maternité, invalidité, décès | 7.00% | — | 7.00% |
| Vieillesse plafonnée (≤ 1 PMSS) | 8.55% | 6.90% | 15.45% |
| Vieillesse déplafonnée | 2.02% | 0.40% | 2.42% |
| Allocations familiales (≤ 3.5 SMIC) | 3.45% | — | 3.45% |
| Chômage (à partir du 1er mai 2025) | 4.00% | — | 4.00% |
| CSG (sur 98.25% du brut) | — | 9.20% | 9.20% |
| CRDS (sur 98.25% du brut) | — | 0.50% | 0.50% |
| AGIRC-ARRCO Tranche 1 | 4.72% | 3.15% | 7.87% |
| Accident du travail (moyenne) | ~2.00% | — | ~2.00% |
| FNAL (< 50 salariés) | 0.10% | — | 0.10% |
| Contribution autonomie | 0.30% | — | 0.30% |
| **TOTAL estimé** | **~32%** | **~20%** | **~52%** |

Notes:
- Maladie passe à 13% employeur au-delà de 2.5 SMIC.
- Allocations familiales passent à 5.25% au-delà de 3.5 SMIC.
- Alsace-Moselle: cotisation salariale maladie supplémentaire de 1.30%.
- AGS (garantie des salaires): 0.25% employeur.
- Versement mobilité (transport): variable selon commune, 0 à ~3%.

### Le coût réel de 100 € net (estimation, salaire médian ~2 400 € net)

| Étape | Montant | Description |
|---|---|---|
| Coût total employeur ("super-brut") | ~230 € | Ce que l'entreprise débourse |
| Cotisations employeur | ~54 € | URSSAF, chômage, retraite complémentaire |
| Salaire brut | ~176 € | Affiché sur la fiche de paie |
| Cotisations salariales | ~26 € | CSG, CRDS, retraite, vieillesse |
| Salaire net avant IR | ~150 € | Versé sur le compte (avant prélèvement à la source) |
| Prélèvement à la source (IR) | ~20 € | TMI 30%, taux effectif ~13% |
| Salaire net après IR | ~130 € | Ce qui reste réellement |
| TVA sur dépenses (20% moyen) | ~22 € | Sur ce qui est dépensé |
| **Pouvoir d'achat réel** | **~108 €** | Ce que 230 € achètent réellement |

Source: Estimation basée sur salaire médian net ~2 400 €/mois, TMI 30%. Les proportions varient selon le salaire. Ce calcul est une approximation pédagogique.

---

## 6. Taxes sur le carburant

Source: UFIP Énergies & Mobilités, Fipeco, Connaissance des Énergies, CNEWS (données février-mars 2026)

### Accise sur les énergies (ex-TICPE) — 2026
| Carburant | Accise par litre |
|---|---|
| SP95 / SP95-E10 | 0.67 € |
| Gazole | 0.608 € |

### Décomposition du prix d'un litre de SP95 (~1.71 €, février 2026)
| Composante | Montant | % du prix |
|---|---|---|
| Pétrole brut + raffinage | ~0.48 € | ~28% |
| Distribution + marge | ~0.21 € | ~12% |
| Accise (ex-TICPE) | ~0.67 € | ~39% |
| TVA sur produit | ~0.15 € | ~9% |
| TVA sur accise | ~0.13 € | ~8% |
| **Total taxes** | **~0.95 €** | **~55%** |

Point clé: la TVA s'applique SUR l'accise. C'est une taxe sur une taxe.

Composante carbone: gelée à 44.60 €/tonne CO2 depuis 2018 (mouvement gilets jaunes). Devait atteindre 100 €/t en 2030.

---

## 7. Taxes comportementales (tabac, alcool, sucre)

### Tabac — 2025/2026
Source: Douanes, Revue des Tabacs, Smoking.fr

Prix moyen pondéré (PMP) 2025: 12.54 € / paquet de 20 cigarettes.
Objectif 2026: tous les paquets ≥ 13 €.

Accise cigarettes 2025:
- Part proportionnelle: 55% du prix de vente
- Part spécifique: 68.10 € pour 1000 unités (3.405 € par paquet de 20) [TODO: vérifier mise à jour 2026]
- Minimum de perception: 360.60 € pour 1000 unités

Décomposition d'un paquet à 13 € (estimation 2025-2026):
| Composante | Montant | % |
|---|---|---|
| Accise (proportionnelle + spécifique) | ~8.50 € | ~65% |
| TVA (16.67% en dedans) | ~2.17 € | ~17% |
| Remise buraliste | ~1.34 € | ~10% |
| Marge fabricant | ~0.99 € | ~8% |
| **Total taxes** | **~10.67 €** | **~82%** |

Évolution: le prix du paquet est passé de ~1.50 € (1990) à ~13 € (2025), soit +766% en 35 ans.

### Alcool
[TODO: rechercher les taux d'accise sur les spiritueux, le vin, et la bière]

### Taxe soda / sucre
[TODO: rechercher la "taxe soda" et la contribution sur les boissons sucrées]

---

## 8. Système social français

### RSA (Revenu de Solidarité Active) — 2025
Source: aide-sociale.fr, Service-Public.fr

| Composition du foyer | Montant mensuel (avril 2025) |
|---|---|
| Personne seule | 646.52 € |
| Couple sans enfant | 969.78 € |
| Personne seule + 1 enfant | 969.78 € |
| Couple + 1 enfant | 1 163.73 € |
| Couple + 2 enfants | 1 357.69 € |
| Par enfant supplémentaire | +258.61 € |

Revalorisation 2025: +1.7% au 1er avril.
Estimation 2026: ~660 € personne seule (+0.9%, en attente du décret).
Nombre de foyers bénéficiaires: ~2 millions.
Taux de non-recours estimé: ~30%.

Depuis 2025-2026 (loi plein emploi): inscription automatique France Travail, obligation d'activité 15-20h/semaine, Contrat d'Engagement Unifié (CEU).

### AAH (Allocation Adulte Handicapé) — 2025
Source: monparcourshandicap.gouv.fr, handicap.fr

Montant maximum (taux plein, personne sans revenus): 1 033.32 €/mois (depuis avril 2025).
Revalorisation 2026 prévue: +0.9% → ~1 042.62 €/mois (à partir d'avril 2026).

Conditions: taux d'incapacité ≥ 80%, ou 50-79% avec restriction substantielle d'accès à l'emploi.
Déconjugalisation: effective depuis octobre 2023 (revenus du conjoint non pris en compte).

### Chômage / ARE (Allocation de Retour à l'Emploi)
Source: France Travail

Conditions: avoir travaillé au moins 6 mois (130 jours ou 910 heures) sur les 24 derniers mois (36 mois pour les ≥ 53 ans).
Durée maximale: variable, jusqu'à 24 mois (36 mois pour les ≥ 55 ans). [TODO: vérifier les nouvelles règles post-réforme 2024]
Calcul: environ 57% du salaire journalier de référence (ou 40.4% + 12.95 €/jour, le plus avantageux).
Montant minimum: ~31.59 €/jour (~948 €/mois).
Financement: cotisation employeur (4% du brut depuis mai 2025).

### AME (Aide Médicale d'État)
Source: Sénat (rapport Delahaye), Boursorama, LDH, OID

Créée en 2000. Permet aux étrangers en situation irrégulière d'accéder aux soins.

Conditions:
- Résider en France depuis > 3 mois
- Pas de titre de séjour
- Ressources < 862 €/mois (plafond 2025)

Bénéficiaires: ~466 000 (fin 2023), ~480 000 estimé 2025.
Budget 2024: 1.386 Mds € (dépenses réelles), budget alloué gelé à 1.2 Mds €.
Coût par habitant: ~17.91 €/an.
Part des dépenses de santé totales: ~0.5%.
Prise en charge: 100% tarif SS, sans dépassements.
60.8% hospitalier, 26.5% soins de ville, 12.7% pharmacie.

---

## 9. Indicateurs macro

### Pression fiscale
Source: OECD Revenue Statistics 2024

| Pays | Ratio taxes/PIB |
|---|---|
| France | 46.1% |
| Danemark | 43.4% |
| Belgique | 42.9% |
| Autriche | 42.7% |
| Italie | 42.1% |
| Suède | 41.3% |
| Allemagne | 37.6% |
| Royaume-Uni | 35.3% |
| Moyenne OECD | 33.5% |
| Canada | 33.2% |
| Japon | 33.2% |
| États-Unis | 27.7% |
| Suisse | 27.6% |
| Mexique | 17.7% |

France: #1 OECD, +12.6 points au-dessus de la moyenne.

### Dépenses publiques
Source: INSEE, Eurostat [TODO: vérifier chiffres 2025 actualisés]

Dépenses publiques / PIB: ~56.5% (2024 estimé).
Parmi les plus élevées de l'OECD.

### Dette publique
Source: INSEE [TODO: vérifier dernier chiffre officiel]

Dette publique: ~3 228 Mds € (estimation fin 2024).
Ratio dette/PIB: ~112%.
Déficit budgétaire 2025: ~-5.4% du PIB. [TODO: vérifier chiffre LFI 2026]

### Autres indicateurs
- SMIC net 2025: 1 426.30 €/mois
- Salaire médian net privé 2024: ~2 190 €/mois (source INSEE)
- Plafond SS mensuel 2025: 3 925 €

---

## 10. Historique fiscal (timeline)

| Année | Événement |
|---|---|
| 1914 | Création de l'impôt sur le revenu. Taux max: 2%. Mesure "temporaire" de guerre. |
| 1928 | Création de la TIP (ancêtre de la TICPE). |
| 1945 | Création de la Sécurité sociale. Début des cotisations sociales. |
| 1954 | Invention de la TVA par Maurice Lauré. Taux initial: 16.85%. |
| 1991 | Création de la CSG. Présentée comme "temporaire". Taux initial: 1.1%. |
| 1996 | Création de la CRDS pour rembourser la dette sociale. Toujours active 30 ans plus tard. |
| 2000 | Création de l'AME. |
| 2012 | TMI porté à 45%. Tentative de "supertaxe" à 75% (>1M€), censurée puis abandonnée. |
| 2018 | Création de la Flat Tax (PFU) à 30%. Suppression de l'ISF, remplacé par l'IFI. |
| 2019 | Gel de la taxe carbone à 44.60€/t après le mouvement des Gilets Jaunes. |
| 2025 | CSG: toujours à 9.2%. CRDS: toujours à 0.5%. |
| 2026 | CDHR: minimum 20% d'imposition effective pour les hauts revenus. Hausse CSG à 10.6% sur revenus financiers. Flat Tax passe à 31.4%. |
