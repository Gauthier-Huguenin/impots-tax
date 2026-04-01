export type TaxMapCategory = 'rate-record' | 'brutal-hike' | 'quirky-tax' | 'secondary-home' | 'where-it-goes';

export interface TaxMapPoint {
  id: string;
  lat: number;
  lng: number;
  category: TaxMapCategory;
  city: string;
  department: string;
  fr: {
    title: string;
    description: string;
    keyFigure: string;
    source: string;
  };
  en: {
    title: string;
    description: string;
    keyFigure: string;
    source: string;
  };
}

export const TAX_MAP_DATA: TaxMapPoint[] = [
  // ============================================
  // CATÉGORIE : TAUX RECORD (rate-record)
  // ============================================
  {
    id: 'grenoble-taux-record',
    lat: 45.1885,
    lng: 5.7245,
    category: 'rate-record',
    city: 'Grenoble',
    department: 'Isère (38)',
    fr: {
      title: 'Champion de France de la taxe foncière',
      description: 'Grenoble détient le taux de taxe foncière le plus élevé des grandes villes françaises. En ajoutant TEOM, GEMAPI et taxes spéciales, les prélèvements atteignent 76,22% de la valeur locative. Le tout voté pour un "bouclier social et climatique".',
      keyFigure: 'Taux : 65,79% (cumul 76,22%)',
      source: 'UNPI / DGFiP 2024',
    },
    en: {
      title: 'France\'s property tax champion',
      description: 'Grenoble holds the highest property tax rate among major French cities. Adding waste collection, flood prevention and special taxes, total levies reach 76.22% of the cadastral rental value. All voted in the name of a "social and climate shield".',
      keyFigure: 'Rate: 65.79% (total 76.22%)',
      source: 'UNPI / DGFiP 2024',
    },
  },
  {
    id: 'nimes-montant-record',
    lat: 43.8367,
    lng: 4.3601,
    category: 'rate-record',
    city: 'Nîmes',
    department: 'Gard (30)',
    fr: {
      title: 'La facture la plus salée de France',
      description: 'Pour un appartement de 70m², les propriétaires nîmois paient en moyenne 1 805 euros par an de taxe foncière. Record national en montant brut parmi les grandes villes.',
      keyFigure: '1 805 €/an pour 70m²',
      source: 'Meilleurtaux.com 2025',
    },
    en: {
      title: 'France\'s most expensive property tax bill',
      description: 'For a 70m² apartment, Nîmes homeowners pay an average of €1,805 per year in property tax. The highest gross amount among major French cities.',
      keyFigure: '€1,805/year for 70m²',
      source: 'Meilleurtaux.com 2025',
    },
  },
  {
    id: 'montpellier-podium',
    lat: 43.6108,
    lng: 3.8767,
    category: 'rate-record',
    city: 'Montpellier',
    department: 'Hérault (34)',
    fr: {
      title: 'Médaille d\'argent du racket foncier',
      description: 'Montpellier talonne Nîmes avec 1 781 euros de taxe foncière annuelle pour 70m². L\'Occitanie confirme son statut de région la plus taxatrice de France.',
      keyFigure: '1 781 €/an pour 70m²',
      source: 'Meilleurtaux.com 2025',
    },
    en: {
      title: 'Silver medal in property tax extortion',
      description: 'Montpellier is right behind Nîmes at €1,781 per year for 70m². The Occitanie region confirms its status as France\'s most tax-happy area.',
      keyFigure: '€1,781/year for 70m²',
      source: 'Meilleurtaux.com 2025',
    },
  },
  {
    id: 'saint-etienne-mensualites',
    lat: 45.4397,
    lng: 4.3872,
    category: 'rate-record',
    city: 'Saint-Étienne',
    department: 'Loire (42)',
    fr: {
      title: '3 mois de crédit pour payer ses impôts',
      description: 'À Saint-Étienne, la taxe foncière équivaut à 3,1 mensualités de crédit immobilier. Quand l\'impôt local pèse plus que le remboursement de sa propre maison.',
      keyFigure: '3,1 mensualités de crédit',
      source: 'Meilleurtaux.com 2025',
    },
    en: {
      title: '3 months of mortgage payments go to taxes',
      description: 'In Saint-Étienne, property tax equals 3.1 monthly mortgage payments. When local taxes weigh more than paying off your own home.',
      keyFigure: '3.1 mortgage payments',
      source: 'Meilleurtaux.com 2025',
    },
  },
  {
    id: 'angers-top5',
    lat: 47.4784,
    lng: -0.5632,
    category: 'rate-record',
    city: 'Angers',
    department: 'Maine-et-Loire (49)',
    fr: {
      title: 'Le taux qui monte, qui monte',
      description: 'Angers affiche un taux de taxe foncière de 56,42%, bien au-dessus de la moyenne nationale de 40,67%. La facture atteint 1 726 euros par an pour 70m².',
      keyFigure: 'Taux : 56,42% — 1 726 €/an',
      source: 'UNPI / Meilleurtaux 2025',
    },
    en: {
      title: 'The rate that keeps climbing',
      description: 'Angers has a property tax rate of 56.42%, far above the national average of 40.67%. The bill reaches €1,726 per year for 70m².',
      keyFigure: 'Rate: 56.42% — €1,726/yr',
      source: 'UNPI / Meilleurtaux 2025',
    },
  },
  {
    id: 'amiens-discret',
    lat: 49.8941,
    lng: 2.2958,
    category: 'rate-record',
    city: 'Amiens',
    department: 'Somme (80)',
    fr: {
      title: 'La taxe qui ne fait pas de bruit',
      description: 'Amiens se classe parmi les villes aux taux de taxe foncière les plus élevés de France avec 56,05%, mais personne n\'en parle.',
      keyFigure: 'Taux : 56,05%',
      source: 'DGFiP 2024',
    },
    en: {
      title: 'The quiet tax champion',
      description: 'Amiens ranks among France\'s highest property tax rates at 56.05%, but nobody talks about it.',
      keyFigure: 'Rate: 56.05%',
      source: 'DGFiP 2024',
    },
  },
  {
    id: 'nantes-podium',
    lat: 47.2184,
    lng: -1.5536,
    category: 'rate-record',
    city: 'Nantes',
    department: 'Loire-Atlantique (44)',
    fr: {
      title: 'Bronze au classement de la douleur',
      description: 'Nantes complète le podium des villes les plus chères avec 1 780 euros de taxe foncière par an pour 70m². Presque à égalité avec Montpellier.',
      keyFigure: '1 780 €/an pour 70m²',
      source: 'Meilleurtaux.com 2025',
    },
    en: {
      title: 'Bronze medal in the pain ranking',
      description: 'Nantes completes the podium at €1,780 per year for 70m². Almost tied with Montpellier.',
      keyFigure: '€1,780/year for 70m²',
      source: 'Meilleurtaux.com 2025',
    },
  },
  {
    id: 'bordeaux-attractif',
    lat: 44.8378,
    lng: -0.5792,
    category: 'rate-record',
    city: 'Bordeaux',
    department: 'Gironde (33)',
    fr: {
      title: 'Attractive, mais à quel prix',
      description: 'La capitale du vin affiche 1 729 euros de taxe foncière annuelle. L\'attractivité bordelaise a un coût fiscal que les agents immobiliers oublient de mentionner.',
      keyFigure: '1 729 €/an pour 70m²',
      source: 'Meilleurtaux.com 2025',
    },
    en: {
      title: 'Attractive, but at what cost',
      description: 'The wine capital charges €1,729 in annual property tax. Bordeaux\'s appeal has a fiscal cost that real estate agents forget to mention.',
      keyFigure: '€1,729/year for 70m²',
      source: 'Meilleurtaux.com 2025',
    },
  },

  // ============================================
  // CATÉGORIE : HAUSSE BRUTALE (brutal-hike)
  // ============================================
  {
    id: 'gandrange-record',
    lat: 49.2683,
    lng: 6.1253,
    category: 'brutal-hike',
    city: 'Gandrange',
    department: 'Moselle (57)',
    fr: {
      title: 'Le maire a perdu un procès, les habitants paient',
      description: 'Record national 2025 : +136,72% de taxe foncière en un an. La mairie a perdu un contentieux bancaire et doit rembourser 800 000 euros d\'intérêts moratoires. La préfecture a imposé la hausse. Une habitante témoigne : "Je vais devoir faire un crédit conso pour payer mes impôts."',
      keyFigure: '+136,72% en un an',
      source: 'France 3 Grand Est / Le Parisien 2025',
    },
    en: {
      title: 'The mayor lost a lawsuit, residents pay the bill',
      description: 'National record 2025: +136.72% property tax increase in one year. The city lost a banking dispute and owes €800,000 in late interest. The prefecture imposed the hike. One resident said: "I\'ll need a consumer loan just to pay my taxes."',
      keyFigure: '+136.72% in one year',
      source: 'France 3 Grand Est / Le Parisien 2025',
    },
  },
  {
    id: 'le-mans-5ans',
    lat: 48.0061,
    lng: 0.1996,
    category: 'brutal-hike',
    city: 'Le Mans',
    department: 'Sarthe (72)',
    fr: {
      title: 'Les 24 heures de la taxe foncière',
      description: 'En 5 ans, la taxe foncière au Mans a plus que doublé : +154,29%. Le record absolu parmi les 30 plus grandes villes de France sur la période 2020-2025.',
      keyFigure: '+154,29% en 5 ans',
      source: 'ORKA.tax / Ideal-investisseur 2026',
    },
    en: {
      title: 'The 24 Hours of property tax',
      description: 'In 5 years, Le Mans property tax more than doubled: +154.29%. The absolute record among France\'s 30 largest cities from 2020-2025.',
      keyFigure: '+154.29% in 5 years',
      source: 'ORKA.tax / Ideal-investisseur 2026',
    },
  },
  {
    id: 'limoges-double',
    lat: 45.8336,
    lng: 1.2611,
    category: 'brutal-hike',
    city: 'Limoges',
    department: 'Haute-Vienne (87)',
    fr: {
      title: 'La porcelaine coûte cher',
      description: '+117,84% de hausse de taxe foncière en 5 ans. La ville de la porcelaine fine a appliqué une fiscalité pas très fine à ses propriétaires.',
      keyFigure: '+117,84% en 5 ans',
      source: 'ORKA.tax 2026',
    },
    en: {
      title: 'Fine china, fine taxes',
      description: '+117.84% property tax increase in 5 years. The city famous for fine porcelain applied a not-so-fine fiscal policy to its homeowners.',
      keyFigure: '+117.84% in 5 years',
      source: 'ORKA.tax 2026',
    },
  },
  {
    id: 'annecy-double',
    lat: 45.8992,
    lng: 6.1294,
    category: 'brutal-hike',
    city: 'Annecy',
    department: 'Haute-Savoie (74)',
    fr: {
      title: 'Le lac est beau, la taxe est lourde',
      description: '+109,23% en 5 ans. La Venise des Alpes a doublé la taxe foncière de ses propriétaires entre 2020 et 2025.',
      keyFigure: '+109,23% en 5 ans',
      source: 'ORKA.tax 2026',
    },
    en: {
      title: 'The lake is beautiful, the tax is heavy',
      description: '+109.23% in 5 years. The Venice of the Alps doubled its homeowners\' property tax between 2020 and 2025.',
      keyFigure: '+109.23% in 5 years',
      source: 'ORKA.tax 2026',
    },
  },
  {
    id: 'metz-hausse',
    lat: 49.1193,
    lng: 6.1757,
    category: 'brutal-hike',
    city: 'Metz',
    department: 'Moselle (57)',
    fr: {
      title: 'La Moselle, terre de records fiscaux',
      description: '+109,01% en 5 ans. Metz accompagne sa voisine Gandrange dans le palmarès mosellan de la douleur fiscale.',
      keyFigure: '+109,01% en 5 ans',
      source: 'ORKA.tax 2026',
    },
    en: {
      title: 'Moselle, land of fiscal records',
      description: '+109.01% in 5 years. Metz joins its neighbor Gandrange in Moselle\'s hall of fiscal pain.',
      keyFigure: '+109.01% in 5 years',
      source: 'ORKA.tax 2026',
    },
  },
  {
    id: 'paris-hidalgo',
    lat: 48.8566,
    lng: 2.3522,
    category: 'brutal-hike',
    city: 'Paris',
    department: 'Paris (75)',
    fr: {
      title: 'Hidalgo frappe : +52% en 5 ans',
      description: 'Paris affiche la plus forte hausse de taxe foncière parmi les grandes capitales régionales : +51,85% entre 2020 et 2025, principalement due à la hausse massive de 2023. Le taux reste paradoxalement l\'un des plus bas (20,50%), mais les bases sont très élevées.',
      keyFigure: '+51,85% en 5 ans (taux : 20,50%)',
      source: 'ORKA.tax / UNPI 2026',
    },
    en: {
      title: 'Hidalgo strikes: +52% in 5 years',
      description: 'Paris has the sharpest property tax increase among major cities: +51.85% between 2020 and 2025, mainly from the 2023 hike. The rate is paradoxically one of the lowest (20.50%), but the tax base is sky-high.',
      keyFigure: '+51.85% in 5 years (rate: 20.50%)',
      source: 'ORKA.tax / UNPI 2026',
    },
  },
  {
    id: 'nice-hausse-2024',
    lat: 43.7102,
    lng: 7.2620,
    category: 'brutal-hike',
    city: 'Nice',
    department: 'Alpes-Maritimes (06)',
    fr: {
      title: 'La Riviera fiscale',
      description: 'Nice a augmenté son taux communal de 19,2% en 2024, passant de 29,62% à 35,30%. La plus forte hausse parmi les grandes villes cette année-là.',
      keyFigure: '+19,2% de taux en 2024',
      source: 'DGFiP / ToutSurMesFinances 2024',
    },
    en: {
      title: 'The Fiscal Riviera',
      description: 'Nice raised its municipal rate by 19.2% in 2024, from 29.62% to 35.30%. The sharpest increase among major cities that year.',
      keyFigure: '+19.2% rate hike in 2024',
      source: 'DGFiP / ToutSurMesFinances 2024',
    },
  },
  {
    id: 'saint-denis-hausse',
    lat: 48.9362,
    lng: 2.3574,
    category: 'brutal-hike',
    city: 'Saint-Denis',
    department: 'Seine-Saint-Denis (93)',
    fr: {
      title: 'Le 93 n\'est pas épargné',
      description: '+103,34% de hausse en 5 ans. Saint-Denis dépasse le seuil symbolique du doublement de la taxe foncière.',
      keyFigure: '+103,34% en 5 ans',
      source: 'ORKA.tax 2026',
    },
    en: {
      title: 'The 93 is not spared',
      description: '+103.34% increase in 5 years. Saint-Denis crosses the symbolic threshold of doubling its property tax.',
      keyFigure: '+103.34% in 5 years',
      source: 'ORKA.tax 2026',
    },
  },
  {
    id: 'acheres-yvelines',
    lat: 48.9597,
    lng: 2.0686,
    category: 'brutal-hike',
    city: 'Achères',
    department: 'Yvelines (78)',
    fr: {
      title: '"C\'est la survie de la ville"',
      description: '+139% de taxe foncière en 10 ans, dont +50% de taux d\'imposition voté en 2022. Citation du maire : "C\'est la survie de la ville d\'Achères qui est en cause."',
      keyFigure: '+139% en 10 ans',
      source: 'Franceinfo / 78actu 2025',
    },
    en: {
      title: '"The city\'s survival is at stake"',
      description: '+139% property tax in 10 years, including a +50% rate hike voted in 2022. The mayor said: "The survival of Achères is at stake."',
      keyFigure: '+139% in 10 years',
      source: 'Franceinfo / 78actu 2025',
    },
  },
  {
    id: 'pamandzi-mayotte',
    lat: -12.7871,
    lng: 45.2841,
    category: 'brutal-hike',
    city: 'Pamandzi',
    department: 'Mayotte (976)',
    fr: {
      title: 'x8 en dix ans, le record absolu',
      description: 'La taxe foncière a été multipliée par 8 en dix ans. Mayotte, devenu département en 2011, a mis en place sa fiscalité locale à partir de 2014 avec des cadastres incomplets.',
      keyFigure: 'x8 en 10 ans',
      source: 'Franceinfo 2025',
    },
    en: {
      title: 'x8 in ten years, the absolute record',
      description: 'Property tax multiplied by 8 in ten years. Mayotte became a department in 2011 and started implementing local taxation from 2014 with incomplete land registries.',
      keyFigure: 'x8 in 10 years',
      source: 'Franceinfo 2025',
    },
  },
  {
    id: 'poilcourt-sydney',
    lat: 49.3833,
    lng: 4.3167,
    category: 'brutal-hike',
    city: 'Poilcourt-Sydney',
    department: 'Ardennes (08)',
    fr: {
      title: 'Poilcourt-Sydney, loin de l\'Australie',
      description: '+64,7% de hausse de taxe foncière en 2025. Le nom évoque l\'exotisme, la fiscalité rappelle la réalité rurale française.',
      keyFigure: '+64,7% en 2025',
      source: 'DGFiP / Guy Hoquet 2025',
    },
    en: {
      title: 'Poilcourt-Sydney, far from Australia',
      description: '+64.7% property tax hike in 2025. The name evokes exoticism, the taxation reminds you of French rural reality.',
      keyFigure: '+64.7% in 2025',
      source: 'DGFiP / Guy Hoquet 2025',
    },
  },
  {
    id: 'villard-reymond',
    lat: 45.0667,
    lng: 5.9833,
    category: 'brutal-hike',
    city: 'Villard-Reymond',
    department: 'Isère (38)',
    fr: {
      title: 'L\'Isère, terre d\'exception fiscale',
      description: '+35,8% en 2025 dans ce village isérois. L\'Isère cumule Grenoble (taux record) et ses petites communes rurales (hausses brutales).',
      keyFigure: '+35,8% en 2025',
      source: 'DGFiP 2025',
    },
    en: {
      title: 'Isère, land of fiscal exception',
      description: '+35.8% in 2025 in this small Isère village. The department combines Grenoble (record rate) with its rural communes (brutal hikes).',
      keyFigure: '+35.8% in 2025',
      source: 'DGFiP 2025',
    },
  },

  // ============================================
  // CATÉGORIE : TAXES INSOLITES (quirky-tax)
  // ============================================
  {
    id: 'paris-balayage',
    lat: 48.8606,
    lng: 2.3376,
    category: 'quirky-tax',
    city: 'Paris',
    department: 'Paris (75)',
    fr: {
      title: 'Taxe de balayage : payez pour le trottoir',
      description: 'Paris est l\'une des 5 seules communes de France à percevoir une taxe de balayage. Les copropriétaires paient pour le nettoyage des voies publiques devant leur immeuble, que la rue soit propre ou non. L\'État récupère 8% au passage.',
      keyFigure: '5 communes en France',
      source: 'Ville de Paris / CGI',
    },
    en: {
      title: 'Sweeping tax: pay for the sidewalk',
      description: 'Paris is one of only 5 municipalities in France that levies a street sweeping tax. Co-owners pay for cleaning public roads in front of their building, whether the street is clean or not. The state takes an 8% cut.',
      keyFigure: '5 municipalities in France',
      source: 'City of Paris / CGI',
    },
  },
  {
    id: 'france-teom-1970',
    lat: 48.8566,
    lng: 2.2945,
    category: 'quirky-tax',
    city: 'Toute la France',
    department: 'National',
    fr: {
      title: 'Vos poubelles sont évaluées en 1970',
      description: 'La TEOM (taxe ordures ménagères) est calculée sur la valeur locative cadastrale de votre logement, basée sur les loyers de... 1970. Elle est due même si vous ne produisez aucun déchet. Un parking doit la payer. Une entreprise avec son propre service de collecte aussi.',
      keyFigure: 'Base de calcul : 1970',
      source: 'CGI art. 1520 / UFC-Que Choisir',
    },
    en: {
      title: 'Your trash is valued in 1970',
      description: 'The waste collection tax is calculated on your property\'s cadastral rental value, based on... 1970 rents. It\'s due even if you produce zero waste. A parking spot must pay it. A business with its own collection service too.',
      keyFigure: 'Calculation base: 1970',
      source: 'CGI art. 1520 / UFC-Que Choisir',
    },
  },
  {
    id: 'france-jukebox',
    lat: 48.8606,
    lng: 2.3376,
    category: 'quirky-tax',
    city: 'Paris',
    department: 'Paris (75)',
    fr: {
      title: 'Taxe jukebox : merci les artistes de 1910',
      description: 'Créée en 1910 à Paris pour financer les retraites des artistes dramatiques, cette taxe frappe les jukebox, flippers, baby-foot et jeux vidéo. Jusqu\'à 1 000 euros par appareil et par an. Elle rapporte encore 15 millions d\'euros par an à l\'État.',
      keyFigure: '1 000 €/appareil/an — depuis 1910',
      source: 'CNC / SACD',
    },
    en: {
      title: 'Jukebox tax: thank the Parisian actors of 1910',
      description: 'Created in Paris in 1910 to fund retirement for dramatic artists, this tax hits jukeboxes, pinball machines, foosball tables and arcade games. Up to €1,000 per machine per year. It still brings in €15 million annually.',
      keyFigure: '€1,000/machine/year — since 1910',
      source: 'CNC / SACD',
    },
  },
  {
    id: 'france-cinema',
    lat: 43.5528,
    lng: 7.0174,
    category: 'quirky-tax',
    city: 'Cannes',
    department: 'Alpes-Maritimes (06)',
    fr: {
      title: '10,72% : le prix caché du pop-corn',
      description: 'Chaque place de cinéma inclut une taxe de 10,72% reversée au CNC — l\'organisme dont le Festival de Cannes est le symbole mondial. Vous pensez payer 12 euros pour voir un film. Vous payez 12 euros dont 1,29 euro de taxe pour financer le cinéma français que vous n\'irez peut-être pas voir.',
      keyFigure: '10,72% sur chaque billet',
      source: 'CNC / CGI',
    },
    en: {
      title: '10.72%: the hidden price of popcorn',
      description: 'Every movie ticket includes a 10.72% tax paid to the CNC — the body behind the Cannes Film Festival. You think you\'re paying €12 to see a film. You\'re paying €12 including €1.29 in tax to fund French cinema you may never watch.',
      keyFigure: '10.72% on every ticket',
      source: 'CNC / CGI',
    },
  },
  {
    id: 'france-ski',
    lat: 45.0588,
    lng: 6.0679,
    category: 'quirky-tax',
    city: 'Stations de ski',
    department: 'Alpes / Pyrénées',
    fr: {
      title: '5% de votre forfait part à la mairie',
      description: 'La taxe sur les remontées mécaniques prélève jusqu\'à 5% du prix HT de votre forfait de ski. Elle rapporte 150 millions d\'euros par an aux communes de montagne. Les exploitants la trouvent trop élevée. Les skieurs ne savent même pas qu\'elle existe.',
      keyFigure: 'Jusqu\'à 5% du forfait',
      source: 'CGI / communes de montagne',
    },
    en: {
      title: '5% of your ski pass goes to the mayor',
      description: 'The ski lift tax takes up to 5% of the pre-tax price of your ski pass. It generates €150 million per year for mountain municipalities. Operators say it\'s too high. Skiers don\'t even know it exists.',
      keyFigure: 'Up to 5% of ski pass',
      source: 'CGI / mountain municipalities',
    },
  },
  {
    id: 'france-sms-surtaxes',
    lat: 48.8355,
    lng: 2.2417,
    category: 'quirky-tax',
    city: 'Boulogne-Billancourt',
    department: 'Hauts-de-Seine (92)',
    fr: {
      title: 'Votez pour votre candidat, l\'État encaisse',
      description: 'Chaque appel ou SMS surtaxé (télé-réalité, jeux TV) est ponctionné de 9,5% par l\'État. Cette taxe a rapporté 2 millions d\'euros rien qu\'en 2012. Reversée à la CPAM. TF1, dont le siège est à Boulogne-Billancourt, est l\'un des principaux bénéficiaires du système.',
      keyFigure: '9,5% sur les numéros surtaxés',
      source: 'DailyGeekShow / CGI',
    },
    en: {
      title: 'Vote for your contestant, the state cashes in',
      description: 'Every premium-rate call or text (reality TV, game shows) is taxed 9.5% by the state. This tax brought in €2 million in 2012 alone. Goes to the national health insurance fund. TF1, headquartered in Boulogne-Billancourt, is one of the main players in this system.',
      keyFigure: '9.5% on premium-rate numbers',
      source: 'DailyGeekShow / CGI',
    },
  },
  {
    id: 'france-pylones',
    lat: 45.8292,
    lng: 5.3417,
    category: 'quirky-tax',
    city: 'Saint-Vulbas',
    department: 'Ain (01)',
    fr: {
      title: 'Les pylônes aussi paient des impôts',
      description: 'Les pylônes électriques de 200 kilovolts ou plus sont soumis à une taxe spécifique reversée aux communes. EDF paie, et le contribuable rembourse via sa facture. Saint-Vulbas, commune voisine de la centrale du Bugey, est traversée par un nœud majeur de lignes à très haute tension.',
      keyFigure: 'Pylônes ≥ 200 kV',
      source: 'CGI / communes',
    },
    en: {
      title: 'Even power pylons pay taxes',
      description: 'Electrical pylons of 200 kilovolts or more are subject to a specific tax paid to municipalities. EDF pays, and the ratepayer reimburses through their electricity bill. Saint-Vulbas, near the Bugey nuclear plant, sits on a major high-voltage grid hub.',
      keyFigure: 'Pylons ≥ 200 kV',
      source: 'CGI / municipalities',
    },
  },
  {
    id: 'france-elements-confort',
    lat: 45.1885,
    lng: 5.7245,
    category: 'quirky-tax',
    city: 'Grenoble (exemple)',
    department: 'Isère (38)',
    fr: {
      title: 'Vous avez des WC ? Ça va vous coûter cher.',
      description: 'En 2025, Bercy a voulu augmenter la taxe foncière de 7,4 millions de logements en partant du principe que tous les logements ont des WC, un lavabo et le chauffage. Si vous n\'êtes pas d\'accord, c\'est à VOUS de prouver que vous n\'avez pas de toilettes. Projet suspendu après un tollé national. L\'Isère avait servi de département test en 2019 : 80 000 logements revalorisés de 15% en un an.',
      keyFigure: '7,4M de logements visés — +63€ en moyenne',
      source: 'Le Parisien / Ministère des Comptes publics 2025',
    },
    en: {
      title: 'You have a toilet? That\'ll cost you.',
      description: 'In 2025, the Finance Ministry wanted to raise property tax on 7.4 million homes by assuming all homes have a toilet, sink, and heating. If you disagree, YOU must prove you don\'t have a bathroom. Suspended after a national outcry. Isère had been the test case in 2019: 80,000 homes revalued upward by 15% in one year.',
      keyFigure: '7.4M homes targeted — avg +€63',
      source: 'Le Parisien / Finance Ministry 2025',
    },
  },

  // ============================================
  // CATÉGORIE : SURTAXE RÉSIDENCES SECONDAIRES (secondary-home)
  // ============================================
  {
    id: 'paris-surtaxe-60',
    lat: 48.8490,
    lng: 2.3522,
    category: 'secondary-home',
    city: 'Paris',
    department: 'Paris (75)',
    fr: {
      title: 'Votre pied-à-terre parisien : +60%',
      description: 'Paris applique la surtaxe maximale de 60% sur la taxe d\'habitation des résidences secondaires. Cumulée avec les bases élevées, la facture peut atteindre plusieurs milliers d\'euros pour un studio.',
      keyFigure: 'Surtaxe maximale : +60%',
      source: 'Ville de Paris / CGI art. 1407 ter',
    },
    en: {
      title: 'Your Parisian pied-à-terre: +60%',
      description: 'Paris applies the maximum 60% surcharge on second home council tax. Combined with high base values, the bill can reach several thousand euros for a studio apartment.',
      keyFigure: 'Maximum surcharge: +60%',
      source: 'City of Paris / CGI art. 1407 ter',
    },
  },
  {
    id: 'surtaxe-explosion-nationale',
    lat: 46.6034,
    lng: 1.8883,
    category: 'secondary-home',
    city: '657 communes',
    department: 'National',
    fr: {
      title: '657 villes au taux maximum',
      description: 'En 2025, 657 communes appliquent la surtaxe maximale de 60% sur les résidences secondaires. Elles étaient 120 en 2023. Le nombre de communes appliquant une surtaxe est passé de 309 à 1 628 en deux ans.',
      keyFigure: '309 → 1 628 communes en 2 ans',
      source: 'DGFiP / Capital 2025',
    },
    en: {
      title: '657 cities at maximum rate',
      description: 'In 2025, 657 municipalities apply the maximum 60% surcharge on second homes. There were 120 in 2023. The number of cities applying any surcharge jumped from 309 to 1,628 in two years.',
      keyFigure: '309 → 1,628 cities in 2 years',
      source: 'DGFiP / Capital 2025',
    },
  },
  {
    id: 'saint-ouen-surtaxe',
    lat: 48.9119,
    lng: 2.3342,
    category: 'secondary-home',
    city: 'Saint-Ouen',
    department: 'Seine-Saint-Denis (93)',
    fr: {
      title: 'Saint-Ouen : surtaxe maximale dès 2025',
      description: 'Les élus de Saint-Ouen ont instauré la majoration maximale de 60% pour 2025 sur les résidences secondaires. En banlieue parisienne, avoir un deuxième logement est devenu un luxe fiscal.',
      keyFigure: 'Surtaxe +60% instaurée en 2025',
      source: 'LCL / DGFiP 2025',
    },
    en: {
      title: 'Saint-Ouen: maximum surcharge from 2025',
      description: 'Saint-Ouen officials enacted the maximum 60% surcharge for 2025 on second homes. In the Paris suburbs, owning a second property has become a fiscal luxury.',
      keyFigure: '+60% surcharge enacted in 2025',
      source: 'LCL / DGFiP 2025',
    },
  },
  {
    id: 'antibes-hausse-surtaxe',
    lat: 43.5808,
    lng: 7.1239,
    category: 'secondary-home',
    city: 'Antibes',
    department: 'Alpes-Maritimes (06)',
    fr: {
      title: 'La Côte d\'Azur taxe vos vacances',
      description: 'Antibes augmente sa surtaxe résidence secondaire de 10% en 2025. Sur la Côte d\'Azur, le soleil est gratuit, mais le droit de le regarder depuis votre balcon ne l\'est pas.',
      keyFigure: '+10% de surtaxe en 2025',
      source: 'LCL / DGFiP 2025',
    },
    en: {
      title: 'The Riviera taxes your holidays',
      description: 'Antibes raises its second home surcharge by 10% in 2025. On the French Riviera, sunshine is free, but the right to enjoy it from your balcony is not.',
      keyFigure: '+10% surcharge in 2025',
      source: 'LCL / DGFiP 2025',
    },
  },

  // ============================================
  // BONUS : CONTEXTE ÉLECTORAL (quirky-tax)
  // ============================================
  {
    id: 'france-electorale',
    lat: 47.0,
    lng: 3.5,
    category: 'quirky-tax',
    city: 'Toute la France',
    department: 'National',
    fr: {
      title: 'Pourquoi 2025 est calme : les municipales',
      description: 'En 2025, seules 3 villes de +100 000 habitants ont augmenté leur taux, contre 35 en 2023. 86,3% des communes ont gelé leurs taux. La raison ? Les municipales de mars 2026. L\'UNPI observe ce phénomène à chaque cycle électoral. Attendez 2027.',
      keyFigure: '3 hausses en 2025 vs 35 en 2023',
      source: 'UNPI / DGFiP 2025',
    },
    en: {
      title: 'Why 2025 is quiet: municipal elections',
      description: 'In 2025, only 3 cities over 100K raised their rate, versus 35 in 2023. 86.3% of municipalities froze their rates. The reason? March 2026 municipal elections. The UNPI observes this pattern every electoral cycle. Wait for 2027.',
      keyFigure: '3 hikes in 2025 vs 35 in 2023',
      source: 'UNPI / DGFiP 2025',
    },
  },
  {
    id: 'france-erreurs-avis',
    lat: 45.4,
    lng: -0.5,
    category: 'quirky-tax',
    city: 'Toute la France',
    department: 'National',
    fr: {
      title: '1 avis sur 3 serait faux',
      description: 'Selon ORKA.tax, près d\'un tiers des avis de taxe foncière comporteraient des erreurs : surfaces surestimées, équipements disparus encore comptabilisés, état du bien jamais actualisé. Économie moyenne récupérée par ceux qui contestent : 435 €/an. Mais moins de 2% des propriétaires contestent.',
      keyFigure: '~33% d\'erreurs — <2% contestent',
      source: 'ORKA.tax 2026',
    },
    en: {
      title: '1 in 3 tax notices may be wrong',
      description: 'According to ORKA.tax, nearly a third of property tax notices contain errors: overestimated surfaces, phantom equipment still counted, property condition never updated. Average savings for those who contest: €435/year. But fewer than 2% of homeowners bother.',
      keyFigure: '~33% errors — <2% contest',
      source: 'ORKA.tax 2026',
    },
  },

  // ============================================
  // CATÉGORIE : TAXES INSOLITES — NOUVEAUX POINTS
  // ============================================
  {
    id: 'france-taxe-abri-jardin',
    lat: 45.7578,
    lng: 4.8320,
    category: 'quirky-tax',
    city: 'Lyon (exemple)',
    department: 'National',
    fr: {
      title: 'Votre cabanon de jardin est un contribuable',
      description: 'La taxe d\'aménagement frappe tout abri de jardin de plus de 5m² et 1,80m de hauteur. Base forfaitaire : 930€/m² en province, 1 054€/m² en Île-de-France. Un cabanon de 7m² coûte ~488€ de taxe. Les pigeonniers et colombiers, eux, peuvent être exonérés. Bercy utilise désormais l\'intelligence artificielle et les photos aériennes pour repérer les constructions non déclarées.',
      keyFigure: '930 €/m² — IA pour traquer les fraudeurs',
      source: 'economie.gouv.fr / FranceAbris 2025',
    },
    en: {
      title: 'Your garden shed is a taxpayer',
      description: 'The development tax hits any garden shed over 5m² and 1.80m tall. Base rate: €930/m² outside Paris, €1,054/m² in Greater Paris. A 7m² shed costs ~€488 in tax. Pigeon houses can be exempt. The tax office now uses AI and aerial photos to spot undeclared structures.',
      keyFigure: '€930/m² — AI hunting tax dodgers',
      source: 'economie.gouv.fr / FranceAbris 2025',
    },
  },
  {
    id: 'france-piscine-ia',
    lat: 43.2965,
    lng: 5.3698,
    category: 'quirky-tax',
    city: 'Marseille (exemple)',
    department: 'National',
    fr: {
      title: 'L\'IA de Bercy vous observe depuis le ciel',
      description: 'Depuis 2022, le fisc utilise un algorithme d\'intelligence artificielle pour détecter les piscines non déclarées sur les photos aériennes de Google. Résultat : plus de 120 000 piscines repérées la première année, générant environ 40 millions d\'euros de recettes fiscales supplémentaires. Taxe d\'aménagement : 262€/m² de bassin.',
      keyFigure: '120 000 piscines détectées par IA',
      source: 'DGFiP / Le Monde 2023',
    },
    en: {
      title: 'The taxman\'s AI is watching from above',
      description: 'Since 2022, the French tax authority uses AI to detect undeclared swimming pools from aerial photos. Result: over 120,000 pools spotted in year one, generating about €40 million in additional tax revenue. Development tax: €262/m² of pool surface.',
      keyFigure: '120,000 pools detected by AI',
      source: 'DGFiP / Le Monde 2023',
    },
  },
  {
    id: 'taxe-sejour-regionale-paca',
    lat: 43.5528,
    lng: 6.9261,
    category: 'quirky-tax',
    city: 'Fréjus',
    department: 'Var (83)',
    fr: {
      title: 'Nicolas paie +34% pour aller à la plage',
      description: 'Depuis 2023, une taxe additionnelle régionale de 34% s\'ajoute à la taxe de séjour dans les Bouches-du-Rhône, le Var et les Alpes-Maritimes. Étendue en 2024 à la Gironde, l\'Hérault, les Pyrénées-Atlantiques et d\'autres départements du Sud. La collecte totale de taxe de séjour avait déjà doublé entre 2012 et 2019, passant de 238 à 503 millions d\'euros.',
      keyFigure: '+34% sur la taxe de séjour',
      source: 'Loi de finances 2023 / FFCC',
    },
    en: {
      title: 'Nicolas pays +34% to go to the beach',
      description: 'Since 2023, a 34% regional surcharge is added to the tourist tax in southeastern France (Bouches-du-Rhône, Var, Alpes-Maritimes). Extended in 2024 to Gironde, Hérault and others. Total tourist tax collection had already doubled between 2012 and 2019, from €238M to €503M.',
      keyFigure: '+34% on tourist tax',
      source: 'Finance Act 2023 / FFCC',
    },
  },
  {
    id: 'taxe-camping-car-petition',
    lat: 44.1,
    lng: -1.25,
    category: 'quirky-tax',
    city: 'Biscarrosse (exemple)',
    department: 'Landes (40)',
    fr: {
      title: '1 000€/an pour votre camping-car ?',
      description: 'Une pétition déposée à l\'Assemblée nationale demande la création d\'une taxe annuelle de 1 000€ par camping-car, soit "1% du prix du véhicule". L\'auteur accuse les camping-caristes de "ne pas faire vivre les villages" et de "polluer les sites". La pétition a récolté 59 signatures en 5 mois. Les 3 millions de camping-caristes français peuvent dormir tranquilles. Pour l\'instant.',
      keyFigure: '59 signatures sur 100 000 nécessaires',
      source: 'Assemblée nationale, pétition N°3547',
    },
    en: {
      title: '€1,000/year for your campervan?',
      description: 'A petition filed with the French parliament demands a €1,000 annual tax on every campervan, arguing owners "don\'t support local businesses" and "pollute sites." After 5 months, it gathered 59 signatures out of the 100,000 needed. France\'s 3 million campervan owners can sleep easy. For now.',
      keyFigure: '59 signatures out of 100,000 needed',
      source: 'National Assembly, petition #3547',
    },
  },

  // ============================================
  // CATÉGORIE : HAUSSE BRUTALE — NOUVEAUX POINTS
  // ============================================
  {
    id: 'le-pontet-maire-fn',
    lat: 44.0553,
    lng: 4.8594,
    category: 'brutal-hike',
    city: 'Le Pontet',
    department: 'Vaucluse (84)',
    fr: {
      title: 'Il supprime la cantine gratuite et augmente son salaire',
      description: 'En 2014, le maire FN fraîchement élu supprime la gratuité de la cantine pour les familles pauvres (économie : 30 000€/an sur un budget de 50M€). Dans le même temps, il fait voter une hausse de 44% de sa propre indemnité moins d\'un mois après son élection. L\'enveloppe des adjoints augmente aussi de 9%.',
      keyFigure: '-30 000€ cantine / +44% salaire maire',
      source: 'France Bleu / UEJF 2014',
    },
    en: {
      title: 'He cuts free school meals and raises his own pay',
      description: 'In 2014, the newly elected far-right mayor scrapped free school lunches for poor families (saving €30,000/year on a €50M budget). Meanwhile, he voted himself a 44% pay raise less than a month after taking office. Deputy mayors got a 9% bump too.',
      keyFigure: '-€30K meals / +44% mayor salary',
      source: 'France Bleu / UEJF 2014',
    },
  },
  {
    id: 'perpignan-aliot-hausse',
    lat: 42.6887,
    lng: 2.8948,
    category: 'brutal-hike',
    city: 'Perpignan',
    department: 'Pyrénées-Orientales (66)',
    fr: {
      title: 'Le maire s\'augmente de 17%',
      description: 'Louis Aliot fait adopter une hausse de 17% de sa rémunération de maire. Il renonce au cumul avec la présidence d\'agglomération, mais le geste passe mal auprès des contribuables perpignanais.',
      keyFigure: '+17% d\'indemnité',
      source: 'Portail Patrimoine 2025',
    },
    en: {
      title: 'The mayor gives himself a 17% raise',
      description: 'Louis Aliot pushed through a 17% increase in his mayoral compensation. He gave up his additional role leading the metropolitan area, but the move didn\'t sit well with Perpignan taxpayers.',
      keyFigure: '+17% compensation',
      source: 'Portail Patrimoine 2025',
    },
  },

  // ============================================
  // CATÉGORIE : TAXES INSOLITES — DÉPENSES PUBLIQUES
  // ============================================
  {
    id: 'paris-hidalgo-burberry',
    lat: 48.8564,
    lng: 2.3524,
    category: 'quirky-tax',
    city: 'Paris',
    department: 'Paris (75)',
    fr: {
      title: 'Le manteau Burberry à 3 067€ de Nicolas',
      description: 'L\'association Transparence citoyenne révèle 210 000€ de frais de représentation en 4 ans pour la maire de Paris, dont 75 000 à 84 000€ en vêtements de luxe (Dior, Gucci, Burberry). Un manteau à 3 067€ devient le symbole de la polémique. Le tout pendant que la dette municipale frôle les 10 milliards d\'euros. "Je vous mets au défi de vivre avec 4 900€ nets par mois", lance-t-elle au Conseil de Paris.',
      keyFigure: '210 000€ de frais / dette 10 Md€',
      source: 'Transparence citoyenne / Le JDD 2025-2026',
    },
    en: {
      title: 'Nicolas paid for a €3,067 Burberry coat',
      description: 'Anti-corruption group Transparence citoyenne revealed €210,000 in representation expenses over 4 years for the Paris mayor, including €75-84K in luxury clothing (Dior, Gucci, Burberry). A €3,067 coat became the symbol. Meanwhile, municipal debt nears €10 billion. "I dare you to live on €4,900 net per month," she told the Paris council.',
      keyFigure: '€210K expenses / €10B debt',
      source: 'Transparence citoyenne / Le JDD 2025-2026',
    },
  },
  {
    id: 'saint-denis-cantine-huissiers',
    lat: 48.9356,
    lng: 2.3589,
    category: 'quirky-tax',
    city: 'Saint-Denis',
    department: 'Seine-Saint-Denis (93)',
    fr: {
      title: 'Cantine "gratuite" : les huissiers débarquent',
      description: 'Saint-Denis instaure la cantine gratuite, puis met en place un système de réservation obligatoire. Les familles qui oublient de réserver reçoivent des pénalités. Résultat : saisies sur salaires, huissiers, centaines d\'euros de pénalités pour des familles en détresse. Un quart des parents sont pénalisés. Les pénalités sont suspendues... en année électorale.',
      keyFigure: '25% des parents pénalisés',
      source: 'Blog Saint-Denis / Conseil municipal 2025',
    },
    en: {
      title: '"Free" school meals: the bailiffs show up',
      description: 'Saint-Denis made school meals free, then added a mandatory reservation system. Families who forget to book get fined. Result: wage garnishments, bailiffs, hundreds of euros in penalties for struggling families. A quarter of parents were penalized. Penalties were suspended... in election year.',
      keyFigure: '25% of parents penalized',
      source: 'Blog Saint-Denis / City Council 2025',
    },
  },

  // ============================================
  // CATÉGORIE : OÙ VA L'ARGENT (where-it-goes)
  // ============================================
  {
    id: 'besancon-baisse-indemnite',
    lat: 47.2378,
    lng: 6.0241,
    category: 'where-it-goes',
    city: 'Besançon',
    department: 'Doubs (25)',
    fr: {
      title: 'La maire qui baisse son propre salaire',
      description: 'Anne Vignot, maire EELV de Besançon, abaisse volontairement son indemnité de 1 000€ par mois. Un geste rare qui tranche avec les hausses votées ailleurs. Le genre d\'info qu\'on aimerait voir plus souvent sur cette carte.',
      keyFigure: '-1 000€/mois volontaire',
      source: 'Portail Patrimoine 2025',
    },
    en: {
      title: 'The mayor who cut her own pay',
      description: 'Anne Vignot, Green Party mayor of Besançon, voluntarily reduced her compensation by €1,000 per month. A rare gesture that contrasts sharply with the raises voted elsewhere. The kind of news we\'d like to see more often on this map.',
      keyFigure: '-€1,000/month voluntary',
      source: 'Portail Patrimoine 2025',
    },
  },
  {
    id: 'dunkerque-transports-gratuits',
    lat: 51.0343,
    lng: 2.3768,
    category: 'where-it-goes',
    city: 'Dunkerque',
    department: 'Nord (59)',
    fr: {
      title: 'Ici, les bus sont gratuits',
      description: 'Dunkerque a rendu ses transports en commun entièrement gratuits en 2018. La fréquentation a bondi de 85% en semaine et doublé le week-end. Preuve qu\'il est possible de réinvestir l\'argent public autrement. Mais Nicolas continue de payer sa taxe foncière.',
      keyFigure: 'Transports 100% gratuits depuis 2018',
      source: 'Communauté urbaine de Dunkerque',
    },
    en: {
      title: 'Here, buses are free',
      description: 'Dunkerque made all public transit completely free in 2018. Ridership jumped 85% on weekdays and doubled on weekends. Proof that public money can be reinvested differently. But Nicolas still pays his property tax.',
      keyFigure: '100% free transit since 2018',
      source: 'Dunkerque urban community',
    },
  },
];
