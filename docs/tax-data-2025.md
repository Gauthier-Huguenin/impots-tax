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

Source: economie.gouv.fr, entreprendre.service-public.fr, Loi de finances 2026

| Taux | Condition |
|---|---|
| 25% | Taux normal, toutes entreprises |
| 15% | PME, sur les premiers 42 500 € de bénéfice |

Conditions taux réduit PME:
- CA HT ≤ 10 M€
- Capital entièrement libéré
- Capital détenu ≥ 75% par des personnes physiques

Contribution sociale sur l'IS: 3.3% pour les entreprises dont CA HT > 7.63 M€ et IS > 763 000 €.

Contribution exceptionnelle grandes entreprises:
- 2025: 20.6% entre 1 et 3 Mds€ de CA, 41.2% au-delà.
- 2026: seuil relevé à 1.5 Md€ de CA; 20.6% entre 1.5 et 3 Mds€, 41.2% au-delà. Assiette 2026: moyenne de l'IS dû en 2025 et 2026, avec acompte de 98% au dernier acompte d'IS.

Nota au 24 avril 2026: le seuil du taux réduit PME reste affiché à 42 500 € par Service-Public. La hausse envisagée à 100 000 € n'apparaît pas dans les sources officielles à jour consultées.

---

## 3. Flat Tax / PFU (Prélèvement Forfaitaire Unique)

Source: impots.gouv.fr (revenus mobiliers, plus-values mobilières, actifs numériques), Loi n°2025-1403 (LFSS 2026)

### Ancien taux / produits 2025 prélevés à l'encaissement
| Composante | Taux |
|---|---|
| IR forfaitaire | 12.8% |
| Prélèvements sociaux | 17.2% |
| **Total PFU** | **30%** |

### Taux à jour au 24 avril 2026 — revenus financiers concernés
| Composante | Taux |
|---|---|
| IR forfaitaire | 12.8% |
| Prélèvements sociaux | 18.6% (hausse CSG de 9.2% à 10.6%) |
| **Total PFU** | **31.4%** |

Exception: certains produits restent à 17.2% de prélèvements sociaux (produits d'assurance-vie et contrats de capitalisation avec valeur de rachat, CEL ouverts jusqu'au 31/12/2017, PEL ouverts jusqu'au 31/12/2017 pendant leurs 12 premières années, PEP exonérés). Les contrats rente-survie et épargne handicap sont à 18.6%.

S'applique à: dividendes, intérêts, plus-values mobilières (actions, obligations, fonds), plus-values crypto (dès conversion en euros, seuil d'exonération: 305 €/an de cessions).

Option barème progressif: possible via la case 2OP pour les revenus de capitaux mobiliers et plus-values mobilières, choix global. A compter de 2026, impots.gouv.fr indique que le caractère irrévocable de cette option est supprimé. Avantage si TMI ≤ 11%. Pour les dividendes, abattement de 40% applicable uniquement au barème. Pour les crypto-actifs, l'option barème est en case 3CN et indépendante de 2OP.

---

## 4. TVA

Source: impots.gouv.fr, economie.gouv.fr

| Taux | Application |
|---|---|
| 20% | Taux normal (majorité des biens et services) |
| 10% | Taux intermédiaire (restauration, transport, travaux rénovation, médicaments non remboursables) |
| 5.5% | Taux réduit (alimentation, livres, protections hygiéniques, chaleur renouvelable, équipements handicapés, spectacles vivants). Les abonnements de gaz et d'électricité relèvent du taux normal de 20% depuis le 1er août 2025. |
| 2.1% | Taux particulier (presse, médicaments remboursables, premières représentations de certains spectacles, certains animaux vivants de boucherie) |

La France a inventé la TVA en 1954 (Maurice Lauré). Le taux normal a été de 16.85% à l'origine.

---

## 5. Cotisations sociales (salariés, secteur privé) — 2025

Source: URSSAF barème 2025/2026, CAPEB tableau 2025, Cleiss.fr, CCI

Plafond mensuel SS (PMSS): 4 005 € (2026 — +2% vs 2025 3 925 €) — source: URSSAF
Plafond annuel SS (PASS): 48 060 € (2026) — source: URSSAF
SMIC mensuel brut: 1 823.03 € / 12.02 €/h (depuis 1er janv. 2026, +1.18%) — source: info.gouv.fr

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

Source: Douanes (BOD DetT janvier 2026), prix-carburants.gouv.fr, Roole Data (prix moyens relevés le 24 avril 2026 à 8h00), Connaissance des Énergies

### Accise sur les énergies (ex-TICPE) — 2026
| Carburant | Accise par litre |
|---|---|
| SP95-E10 | 0.670 € |
| SP95-E5 / SP98 | 0.690 € |
| Gazole | 0.608 € |

### Décomposition du prix d'un litre de SP95-E10 (~1.983 €, 24 avril 2026)
| Composante | Montant | % du prix |
|---|---|---|
| Pétrole brut + raffinage | ~0.68 € | ~34% |
| Distribution + marge | ~0.30 € | ~15% |
| Accise (ex-TICPE) | ~0.67 € | ~34% |
| TVA sur produit | ~0.20 € | ~10% |
| TVA sur accise | ~0.13 € | ~7% |
| **Total taxes** | **~1.00 €** | **~50%** |

Point clé: la TVA s'applique SUR l'accise. C'est une taxe sur une taxe.

Composante carbone: gelée à 44.60 €/tonne CO2 depuis 2018 (mouvement gilets jaunes). Devait atteindre 100 €/t en 2030.

---

## 7. Taxes comportementales (tabac, alcool, sucre)

### Tabac — 2025/2026
Source: Douanes, arrêté du 24 décembre 2025, arrêté du 26 janvier 2026, BOFiP

Prix moyen pondéré (PMP) 2025: 12.54 € / paquet de 20 cigarettes.
Au 1er janvier 2026, la Douane illustre encore un bas de marché à 11.50 € et un premium à 13.50 € : l'objectif politique de 13 € n'est pas un plancher universel constaté.

Accise cigarettes 2026:
- Part proportionnelle: 55% du prix de vente
- Part spécifique: 73.30 € pour 1000 unités (1.466 € par paquet de 20)
- Minimum de perception: 381.90 € pour 1000 unités (7.638 € par paquet de 20)

Décomposition d'un paquet à 13 € (référence 2026):
| Composante | Montant | % |
|---|---|---|
| Accise (proportionnelle + spécifique) | ~8.62 € | ~66% |
| TVA (16.67% en dedans) | ~2.17 € | ~17% |
| Remise buraliste | ~1.34 € | ~10% |
| Marge fabricant | ~0.88 € | ~7% |
| **Total taxes** | **~10.78 €** | **~83%** |

Évolution: le prix du paquet est passé de ~1.50 € (1990) à ~13 € (2026), soit environ +766%.

### Alcool — 2025/2026
Source: Douanes (BOD N°7614), Eurotax, Eurofiscalis, Klac, FGVB, Service-Public.fr

La fiscalité sur l'alcool en France repose sur trois couches : l'accise (droits de consommation), la cotisation Sécurité sociale (sur les > 18° vol.), et la TVA à 20%.

#### Accise par catégorie (tarifs 2026)

| Catégorie | Tarif 2026 | Unité |
|---|---|---|
| Spiritueux (> 18° vol.) | 1 932.42 € | par hectolitre d'alcool pur (hlap) |
| Produits intermédiaires (VDN, VDL) | 52.39 € | par hectolitre |
| Autres produits intermédiaires | 209.53 € | par hectolitre |
| Bières > 2.8° vol. | 8.24 € | par hl/degré |
| Bières ≤ 2.8° vol. et petites brasseries | 4.12 € | par hl/degré |
| Vins tranquilles | 4.19 € | par hectolitre |
| Vins mousseux | 10.38 € | par hectolitre |
| Cidres, poirés, hydromels | 1.46 € | par hectolitre |

Augmentation annuelle plafonnée à 1.75% (indexation inflation).

#### Cotisation Sécurité sociale (> 18° vol.)
Tarif 2026 : 620.47 €/hlap.
S'ajoute à l'accise pour les spiritueux.

#### Exemple : bouteille de whisky 70cl à 40°
| Composante | Montant |
|---|---|
| Accise | 0.70 × 0.40 × 19.3242 = 5.41 € |
| Cotisation SS | 0.70 × 0.40 × 6.2047 = 1.74 € |
| Sous-total taxes spécifiques | 7.15 € |
| + TVA 20% sur le tout | variable |

Sur une bouteille de whisky à ~25€, les taxes (accise + cotisation SS + TVA) représentent environ 40-45% du prix final.

Note : le vin est très faiblement taxé en France (4.19€/hl soit ~0.03€ par bouteille de 75cl + TVA). À comparer avec le Royaume-Uni où le vin est taxé à ~349€/hl. Le lobby viticole français est historiquement très puissant.

### Taxe soda / Boissons sucrées — 2025/2026
Source: LFSS 2025 (art. 31), Bofip, Service-Public.fr, Boursorama

Réforme majeure au 1er mars 2025 : simplification de 15 paliers à 3 paliers.

#### Barème 2026

| Sucre ajouté par hectolitre | Taxe par hectolitre |
|---|---|
| < 5 kg | 4.07 € |
| 5 à 8 kg | 21.38 € |
| > 8 kg | 35.63 € |

Édulcorants de synthèse (boissons light) : 4.50 €/hl jusqu'à 120 mg/L et 6 €/hl au-delà depuis le 1er janvier 2026.

Si un produit contient à la fois sucres ajoutés et édulcorants, les deux taxes s'appliquent.

#### Impact concret
Un Coca-Cola classique (~100g de sucre/L, soit >8kg/hl) : taxe de 35.63€/hl = 0.356€/litre.
Un thé glacé (~30g/L, soit ~3kg/hl) : taxe de 4.07€/hl = 0.041€/litre.

Prix du Coca-Cola 1.75L : passé de ~2€ à ~2.30€ après la réforme (+10%).
Recettes annuelles de la taxe soda : ~443 M€ (2023).
La TVA s'applique en plus, sur le montant HT incluant la contribution.

Plus de 45 pays dans le monde ont une taxe similaire.

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
Durée maximale: variable, jusqu'à 18 mois (27 mois pour les ≥ 55 ans). Réforme 2024-2025 : durée réduite par rapport aux règles antérieures (était 24/36 mois).
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
Source: Loi de finances 2026, vie-publique.fr

Dépenses publiques / PIB: 56.6% (2026 prévu, -0.2 pts vs 2025). Source: LFI 2026.
Dépenses de l'État: ~501 Mds€ en 2026 (+10.5 Mds€ vs 2025).
Parmi les plus élevées de l'OECD.

### Dette publique
Source: INSEE

Dette publique: ~3 300 Mds€ (estimation fin 2025).
Ratio dette/PIB: ~112%.
Déficit budgétaire 2025: ~5.8% du PIB (estimation). Objectif 2026: retour sous les 5%.

### Autres indicateurs
- SMIC net 2026: ~1 444 €/mois (source: info.gouv.fr, depuis 1er janv. 2026)
- Salaire médian net privé 2024: ~2 190 €/mois (source INSEE)
- Plafond SS mensuel 2026: 4 005 € (source: URSSAF)

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
| 2023 | Suppression totale de la taxe d'habitation sur les résidences principales. Perte: 18.5 Mds€ pour les ménages. |
| 2024 | Loi Le Meur (n°2024-1039): encadrement des meublés de tourisme type Airbnb. |
| 2025 | CSG: toujours à 9.2%. CRDS: toujours à 0.5%. Réintégration des amortissements LMNP dans les plus-values. |
| 2026 | CDHR: minimum 20% d'imposition effective pour les hauts revenus. Hausse CSG à 10.6% sur revenus financiers. Flat Tax passe à 31.4%. |

---

## 11. Taxe foncière

Source: DGFiP Statistiques n°34 (mai 2025), impots.gouv.fr, economie.gouv.fr, vie-publique.fr, IFRAP

### Calcul

Taxe foncière = Valeur locative cadastrale × 50% (abattement forfaitaire) × Taux d'imposition (fixé par la commune + intercommunalité + taxes additionnelles).

La valeur locative cadastrale est revalorisée chaque année par un coefficient forfaitaire basé sur l'IPCH (Indice des Prix à la Consommation Harmonisé) de novembre N-1.

### Revalorisation des bases

| Année | Coefficient | Variation |
|---|---|---|
| 2023 | 1.071 | +7.1% |
| 2024 | 1.039 | +3.9% |
| 2025 | 1.017 | +1.7% |
| 2026 | 1.008 | +0.8% (suspendue par le Premier ministre le 26/11/2025) |

Note 2026: L'actualisation nationale des bases locatives cadastrales prévue pour 2026 a été suspendue par le PM Sébastien Lecornu. Seule la revalorisation forfaitaire de +0.8% s'applique, sans la révision structurelle des valeurs locatives.

### Montants

| Indicateur | Valeur (2024) |
|---|---|
| Recettes totales taxe foncière | 55.3 Mds€ |
| Dont TFPB (propriétés bâties) | 53.6 Mds€ |
| Dont TFPNB (propriétés non bâties) | 1.7 Mds€ |
| Nombre de contribuables (TFPB) | 33 millions |
| Montant moyen par contribuable | 1 082 € (2024), contre 1 026 € en 2023 |
| Montant moyen maison | ~1 090 € (2025) |
| Montant moyen appartement | ~865 € (2025) |

Hausse cumulée: +30% en 10 ans (source: IFRAP).

### Taux par grandes villes (2025)

| Ville | Taux communal + intercommunal |
|---|---|
| Paris | 20.5% |
| Lyon | 32.44% |
| Marseille | 47.13% |
| Toulouse | 48.55% |
| Amiens | 56.05% |
| Angers | 56.42% |
| Grenoble | 67.92% |
| Taux moyen national | ~40.67% |

### Contexte: suppression de la taxe d'habitation

La taxe d'habitation sur les résidences principales a été totalement supprimée au 1er janvier 2023, représentant ~18.5 Mds€ de prélèvements en moins pour les ménages. Les communes sont compensées par le transfert de la part départementale de TFPB. Les EPCI et départements reçoivent une fraction de la TVA nationale.

La taxe d'habitation subsiste uniquement pour les résidences secondaires et les logements vacants.

---

## 12. LMNP & Meublés de tourisme (loi Le Meur)

Source: Loi n°2024-1039 du 19 novembre 2024 (loi Le Meur), Loi de finances 2025 & 2026, service-public.fr, jedeclaremonmeuble.com, LMNP.AI

### Le régime LMNP (Location Meublée Non Professionnelle)

Le LMNP permet de louer un bien meublé et de bénéficier d'avantages fiscaux importants: soit un abattement forfaitaire (micro-BIC), soit la déduction des charges réelles + amortissement du bien (régime réel).

### Micro-BIC: nouveaux plafonds depuis le 1er janvier 2025

| Type de location | Plafond CA | Abattement | Avant réforme |
|---|---|---|---|
| Meublé de tourisme **non classé** (Airbnb) | 15 000 € | 30% | 77 700 € / 50% |
| Meublé de tourisme **classé** | 77 700 € | 50% | 77 700 € / 71% |
| Location meublée longue durée | 77 700 € | 50% | Inchangé |

Au-delà du plafond, basculement automatique au régime réel.

### Réintégration des amortissements (depuis le 1er janvier 2025)

Changement majeur: les amortissements déduits pendant la période de location sont désormais réintégrés dans le calcul de la plus-value à la revente.

Exemple: un investisseur ayant amorti 50 000 € sur 10 ans et revendant avec une plus-value brute de 30 000 € verra sa plus-value imposable passer à 80 000 € (30 000 + 50 000 réintégrés).

Exception: résidences étudiantes, seniors et EHPAD sont exemptées.

### Loi Le Meur — encadrement des meublés de tourisme

Mesures principales (applicables progressivement 2025-2026):
- Réduction de la durée maximale de location de la résidence principale: 90 jours/an (contre 120 auparavant) dans les zones tendues
- Enregistrement obligatoire en mairie avec numéro de déclaration
- DPE (Diagnostic de Performance Énergétique) obligatoire: minimum E en 2025, D en 2034
- Nouveaux pouvoirs des communes: quotas de meublés de tourisme, zones d'interdiction

### Statistiques

| Indicateur | Valeur |
|---|---|
| Annonces Airbnb actives en France | ~1.31 million/mois |
| Communes concernées | 29 000 (81% des communes) |
| Annonces Airbnb à Paris | ~84 000 à 90 000 |
| Revenu moyen annuel d'un hôte | 11 200 € (2025) |
| Tarif moyen par nuitée | 118 € |
| Croissance des annonces 2021-2023 | +30% |

Source: Welkeys, Airbnb data 2024-2025.

---

## 13. Droits de succession et donation

Source: Service-Public.fr, economie.gouv.fr, corrigetonimpot.fr, Neofa, OECD, vie-publique.fr

### Barème en ligne directe (parent → enfant) — 2025/2026

Abattement: 100 000 € par parent par enfant (renouvelable tous les 15 ans).

| Tranche (après abattement) | Taux |
|---|---|
| Jusqu'à 8 072 € | 5% |
| 8 072 € — 12 109 € | 10% |
| 12 109 € — 15 932 € | 15% |
| 15 932 € — 552 324 € | 20% |
| 552 324 € — 902 838 € | 30% |
| 902 838 € — 1 805 677 € | 40% |
| Au-delà de 1 805 677 € | 45% |

Note: le barème est gelé jusqu'en 2028 (loi de finances 2026), ce qui alourdit discrètement la fiscalité par non-indexation sur l'inflation.

### Autres abattements

| Bénéficiaire | Abattement succession | Abattement donation |
|---|---|---|
| Enfant | 100 000 € | 100 000 € |
| Petit-enfant | 1 594 € | 31 865 € |
| Arrière-petit-enfant | 1 594 € | 5 310 € |
| Frère / sœur | 15 932 € | 15 932 € |
| Neveu / nièce | 7 967 € | 7 967 € |
| Tiers / concubin | 1 594 € | 1 594 € |
| Époux / partenaire PACS | Exonéré | 80 724 € |

### Barèmes entre frères/sœurs

| Tranche | Taux |
|---|---|
| Jusqu'à 24 430 € | 35% |
| Au-delà | 45% |

### Entre tiers / non-parents

Taux unique: **60%** (après abattement de 1 594 €). S'applique aussi aux concubins.

### Assurance-vie (hors succession civile)

| Versements | Abattement | Taxation au-delà |
|---|---|---|
| Avant 70 ans | 152 500 € par bénéficiaire | 20% jusqu'à 852 500 €, puis 31.25% |
| Après 70 ans | 30 500 € global (tous bénéficiaires) | Droits de succession classiques (mais intérêts exonérés) |

### Exonération exceptionnelle 2025-2026

Du 15 février 2025 au 31 décembre 2026: exonération pour les dons en numéraire au profit des enfants, petits-enfants ou arrière-petits-enfants, jusqu'à 100 000 € par donateur (plafond 300 000 € par bénéficiaire), à condition d'affecter les sommes à l'acquisition/construction de la résidence principale ou à des travaux de rénovation énergétique.

### Don familial de sommes d'argent (art. 790 G CGI)

Abattement supplémentaire de 31 865 € (cumulable avec l'abattement classique), si le donateur a moins de 80 ans et le donataire est majeur. Applicable aux enfants, petits-enfants, arrière-petits-enfants.

Concrètement: un parent peut transmettre à chaque enfant **131 865 €** tous les 15 ans en franchise totale (100 000 + 31 865).
Pour un couple avec 2 enfants: 131 865 × 2 parents × 2 enfants = **527 460 €** en franchise totale tous les 15 ans.

### Pacte Dutreil — Transmission d'entreprise (art. 787 B CGI)

Exonération de **75%** de la valeur des parts/entreprise transmise. Les droits ne s'appliquent que sur 25% de la valeur.

Conditions: engagement collectif de conservation (2 ans), engagement individuel (4 ans), exercice d'une fonction de direction.

Exemple: entreprise à 1 M€ transmise à un enfant:
- Base taxable: 250 000 € (après 75% d'exonération)
- Abattement: -100 000 €
- Base nette: 150 000 €
- Droits: ~28 194 €
- Si donation avant 70 ans du donateur: réduction 50% → ~14 097 €
- Taux effectif: **~1.4%** de la valeur de l'entreprise

### Comparaison internationale

Source: OECD "Inheritance Taxation in OECD Countries", Tax Foundation

| Pays | Taux marginal max (ligne directe) | Abattement ligne directe |
|---|---|---|
| Japon | 55% | ~22 000 € |
| Corée du Sud | 50% | ~350 000 € |
| **France** | **45%** | **100 000 €** |
| Royaume-Uni | 40% | ~380 000 € (+ 175K résidence) |
| États-Unis | 40% | ~12 500 000 € (!) |
| Allemagne | 30% | 400 000 € |
| Espagne | 34% (variable par région) | 15 957 € |
| Italie | 4-8% | 1 000 000 € |
| Suisse | 0-50% (variable par canton) | Nombreux cantons exonèrent la ligne directe |
| Suède / Norvège / Canada / Australie | **0%** | Aboli |

Point clé: la France a le 3e taux marginal le plus élevé, mais l'abattement est très faible (100 000 €) comparé aux USA (12.5 M€), à l'Allemagne (400 000 €) ou au Royaume-Uni (380 000 €). L'abattement n'est pas indexé depuis 2012 → érosion réelle ~25%.

### Recettes et statistiques

| Indicateur | Valeur | Source |
|---|---|---|
| Recettes DMTG (2023) | ~18.5 Mds€ | DGFiP, PLF 2024 |
| Dont successions | ~16.6 Mds€ | DGFiP |
| Part des recettes fiscales totales | ~1.36% | OECD |
| Rang OECD (recettes/PIB) | ~0.7% du PIB (top 2 avec Belgique) | OECD Revenue Statistics |
| Moyenne OECD | 0.2% du PIB | OECD |
| Nombre de successions traitées/an | ~400 000 | DGFiP |
| Patrimoine transmis par succession/an | ~280-300 Mds€ | France Stratégie |
| Héritage médian reçu | ~70 000 € | INSEE Patrimoine 2021 |
| Héritage moyen reçu | ~230 000 € | INSEE Patrimoine 2021 |
| % de successions effectivement taxées | **~15%** | DGFiP, CPO |
| Âge moyen au moment de l'héritage | ~50 ans | INSEE |
| Part de l'héritage dans le patrimoine des Français | ~60% (tendance croissante) | Piketty/CAE |

Point marquant: seulement ~15% des successions donnent lieu à un paiement effectif de droits. Les 85% restants sont en dessous des seuils ou exonérés (conjoint, assurance-vie, Dutreil). Les droits touchent principalement les patrimoines entre 200K et 2M€, tandis que les très gros patrimoines utilisent les dispositifs d'optimisation.

---

## 14. Péages autoroutiers

Source: ART (Autorité de Régulation des Transports), vie-publique.fr, Sénat (rapport Maurey), L'Argus, Public Sénat, UFC-Que Choisir

### Le système de concessions

9 300 km d'autoroutes à péage, gérés par 7 sociétés concessionnaires historiques (SCA) qui représentent 90% du réseau:

| Concessionnaire | Groupe | Fin de concession |
|---|---|---|
| Sanef | Abertis | 31/12/2031 |
| Escota | Abertis | 29/02/2032 |
| SAPN | Abertis | 31/08/2033 |
| Cofiroute | Vinci | 30/06/2034 |
| APRR | Eiffage (50%) | 30/11/2035 |
| ASF | Vinci | 30/04/2036 |
| Area | Eiffage | 30/09/2036 |

### Revenus et bénéfices (2023)

| Indicateur | Valeur |
|---|---|
| Chiffre d'affaires cumulé (SCA) | 11.9 Mds€ de péages |
| Bénéfices nets cumulés | 4.4 Mds€ (record) |
| Dividendes versés aux actionnaires | 4.1 Mds€ |
| Taux de rentabilité moyen | ~8% |
| Part revenant à l'État (TVA, redevances, taxes) | ~42% des recettes de péage |

Répartition des dividendes: Vinci 56.6%, Eiffage 24.3%, Abertis 15.1% (= 96% du total).

Source: Rapport du Sénat (commission des finances), Public Sénat.

### Tarifs 2026 (au 1er février, classe 1 — véhicule léger)

| Trajet | Péage |
|---|---|
| Paris — Lyon | 41.85 € |
| Paris — Marseille | 68.38 € |
| Paris — Bordeaux | 46.60 € |

Hausse moyenne 2026: +0.86% (après +0.92% en 2025 et +3% en 2024).

Variations par réseau: de +0.62% (Sanef) à +1.90% (Alis, A28).

### Décomposition d'un péage

Sur 1€ de péage, environ:
- ~42% revient à l'État: TVA (20%), redevance domaniale, taxe d'aménagement du territoire
- ~25% entretien et investissements réseau
- ~33% marge nette et frais financiers du concessionnaire

### Contexte politique

Les concessions autoroutières, privatisées en 2006 sous Dominique de Villepin, sont régulièrement critiquées pour leur rentabilité excessive. Le Sénat a appelé le gouvernement à "reprendre la main" sur les contrats. Les premières concessions arrivent à échéance en 2031-2036, mais les péages ne disparaîtront pas: l'État prévoit de maintenir des redevances d'usage pour financer l'entretien.

---

## 15. Péages ferroviaires

Source: SNCF Réseau, ART, Sénat (PLF 2026), economiematin.fr, Moneybounce

### Le système

SNCF Réseau (gestionnaire d'infrastructure) facture des péages (redevances d'utilisation) à tous les opérateurs ferroviaires (SNCF Voyageurs, Trenitalia, etc.) pour circuler sur le réseau.

### Montants

| Indicateur | Valeur |
|---|---|
| Recettes de péages ferroviaires (2024) | >7 Mds€ (+8% vs 2023) |
| Enveloppe contractuelle moyenne (2023-2030) | 2.84 Mds€/an |
| Budget régénération réseau (2025) | 3.3 Mds€ |
| CA groupe SNCF (2024) | 43.0 Mds€ |

### Part du péage dans le prix d'un billet

| Type de train | Part péage réseau |
|---|---|
| TGV | ~40% du prix du billet |
| TER | ~15% du prix du billet |

### Hausse des péages

| Année | Hausse péages SNCF Réseau |
|---|---|
| 2024 | ~4% |
| 2025 | ~4% |
| 2026 | +4.1% |
| 2027-2029 | Hausse plus modérée (validée par l'ART) |

### TVA sur les billets de train

| Type de trajet | Taux TVA |
|---|---|
| Transport intérieur (TGV, TER, Intercités) | 10% |
| Transport international | Exonéré ou taux réduit |

### Hausse du prix des billets

La SNCF a augmenté ses tarifs TGV de +1.5% en moyenne en 2025. Les hausses de péages (+4%/an) combinées à l'inflation sur l'énergie et les salaires se répercutent sur le prix final.

---

## 16. Plus-values sur actions étrangères (hors PEA)

Source: Service-Public.fr, Ramify.fr, Prosper Conseil, abcbourse.com, convention fiscale France-USA

### Le problème: investir dans le S&P 500 depuis la France

Le PEA (Plan d'Épargne en Actions) offre une fiscalité avantageuse mais est limité aux actions de l'EEE (Espace Économique Européen). Les actions américaines (Apple, Google, ETF S&P 500 US-domiciliés comme VOO/SPY) ne sont pas éligibles au PEA.

**Contournement**: les ETF synthétiques (swap-based) domiciliés en Europe et répliquant le S&P 500 SONT éligibles au PEA (ex: Amundi PEA S&P 500, BNP Paribas Easy S&P 500).

### Fiscalité CTO (Compte-Titres Ordinaire) — 2025/2026

| Composante | Taux 2025 | Taux 2026 |
|---|---|---|
| IR forfaitaire (PFU) | 12.8% | 12.8% |
| Prélèvements sociaux | 17.2% | 18.6% (hausse CSG) |
| **Total Flat Tax** | **30%** | **31.4%** |

Option: barème progressif possible (case 2OP), avantageux si TMI ≤ 11%.

### Fiscalité PEA (après 5 ans)

| Composante | Taux |
|---|---|
| IR | 0% (exonéré) |
| Prélèvements sociaux | 17.2% (2025) / 18.6% (2026) |
| **Total** | **17.2%** / **18.6%** |

### Comparaison concrète: 10 000 € investis sur le S&P 500, +8%/an, 10 ans

| Enveloppe | Capital final brut | Plus-value | Impôts | Capital net |
|---|---|---|---|---|
| CTO (flat tax 31.4%) | 21 589 € | 11 589 € | 3 639 € | 17 950 € |
| PEA (ETF synthétique, PS 18.6%) | 21 589 € | 11 589 € | 2 156 € | 19 433 € |
| **Écart** | | | **1 483 €** | **+1 483 € en PEA** |

Sur 10 ans avec 10 000 € de mise, le PEA fait économiser ~1 500 € d'impôts. L'écart se creuse exponentiellement avec le montant et la durée.

### Double imposition: dividendes d'actions américaines

Convention fiscale France-USA (article 10 §2b):
- Les USA retiennent 15% à la source sur les dividendes bruts (avec formulaire W-8BEN)
- La France accorde un crédit d'impôt de 15% du brut pour éviter la double imposition
- Le crédit d'impôt compense la retenue américaine → pas de surcoût si correctement déclaré

Note: dans un PEA, les ETF synthétiques ne distribuent généralement pas de dividendes (capitalisation), évitant entièrement le problème de la retenue à la source.

### Résumé

| Critère | CTO | PEA (ETF synthétique) |
|---|---|---|
| Actions US directes | ✅ Oui | ❌ Non |
| ETF S&P 500 US (VOO, SPY) | ✅ Oui | ❌ Non |
| ETF S&P 500 Europe (Amundi, BNP) | ✅ Oui | ✅ Oui |
| Fiscalité plus-values | 30-31.4% | 17.2-18.6% (après 5 ans) |
| Plafond versements | Illimité | 150 000 € |
| Retrait avant 5 ans | Libre (taxé) | Clôture du plan |
