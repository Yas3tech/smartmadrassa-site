/**
 * Contenu éditorial du site vitrine SmartMadrassa.
 * Tout le texte affiché vit ici : modifier ce fichier suffit à faire évoluer le site.
 */

export const SITE = {
  name: 'SmartMadrassa',
  domain: 'smartmadrassa.be',
  url: 'https://smartmadrassa.be',
  appUrl: 'https://app.smartmadrassa.be',
  email: 'contact@smartmadrassa.be',
  editor: 'Yassine E. — créateur et éditeur indépendant',
  country: 'Belgique',
  tagline: 'Toute votre école, dans une seule plateforme.',
};

export const NAV = [
  { label: 'Plateforme', href: '#plateforme' },
  { label: 'Modules', href: '#modules' },
  { label: 'Pour qui', href: '#roles' },
  { label: 'Sécurité', href: '#securite' },
  { label: 'Tarifs', href: '#tarifs' },
  { label: 'FAQ', href: '#faq' },
];

export const HERO = {
  badge: 'Créé en solo, en Belgique',
  titleLines: ['Toute votre école,', 'dans une seule'],
  titleAccent: 'plateforme.',
  subtitle:
    'SmartMadrassa remplace les feuilles d’appel, les groupes WhatsApp et les tableurs de notes par un espace unique — pour la direction, les enseignants, les parents et les élèves. Trilingue FR / NL / AR, accessible depuis n’importe quel téléphone.',
  primaryCta: { label: 'Demander une démo', href: '#contact' },
  secondaryCta: { label: 'Voir la plateforme', href: '#plateforme' },
  proofs: ['Aucune installation', 'Mise en route accompagnée', 'Vos données restent les vôtres'],
};

export const MARQUEE = [
  'Appel & présences',
  'Notes par matière',
  'Bulletins périodiques',
  'Messagerie interne',
  'Annonces ciblées',
  'Devoirs',
  'Emploi du temps',
  'Paiements & reçus',
  'Export Excel',
  'Bulletins PDF',
  'Arabe · RTL',
  'Notifications e-mail',
  'Rôles & permissions',
];

export const STATS = [
  {
    value: 30,
    suffix: ' s',
    label: 'pour faire l’appel d’une classe entière',
    sub: 'depuis un téléphone, en salle',
  },
  {
    value: 5,
    suffix: ' rôles',
    label: 'un seul outil, cinq points de vue',
    sub: 'direction, enseignant, parent, élève, admin',
  },
  {
    value: 3,
    suffix: ' langues',
    label: 'français, néerlandais, arabe',
    sub: 'interface complète, RTL compris',
  },
  {
    value: 100,
    suffix: ' %',
    label: 'des données hébergées en Europe',
    sub: 'conforme au RGPD',
  },
];

export const PROBLEM = {
  eyebrow: 'Le quotidien, avant',
  title: 'Une école tourne rarement sur un seul outil.',
  lead: 'Elle tourne sur un classeur de présences, trois groupes WhatsApp, un tableur de notes que seule une personne sait ouvrir, et beaucoup de mémoire humaine. Ça fonctionne — jusqu’au jour où ça ne fonctionne plus.',
  before: {
    label: 'Sans SmartMadrassa',
    items: [
      'Les absences se perdent entre la feuille papier et le tableur',
      'Les parents découvrent un problème trois mois trop tard',
      'Les bulletins mobilisent une équipe entière pendant deux semaines',
      'Les paiements se suivent de mémoire ou sur un carnet',
      'Un enseignant qui part emporte ses notes avec lui',
      'Impossible de répondre à « combien d’absences ce trimestre ? »',
    ],
  },
  after: {
    label: 'Avec SmartMadrassa',
    items: [
      'L’appel se fait en salle, en trente secondes, depuis un téléphone',
      'Le parent reçoit la note et l’absence le jour même',
      'Le bulletin se compose à partir des notes déjà saisies',
      'Chaque paiement a son statut et son reçu PDF',
      'L’historique appartient à l’école, pas à une personne',
      'Chaque chiffre est disponible en deux clics, exportable en Excel',
    ],
  },
};

/**
 * Manifeste révélé mot à mot au défilement.
 * Le texte est découpé automatiquement : écrivez-le normalement.
 */
export const MANIFESTO = {
  eyebrow: 'Mon parti pris',
  text: 'Une école ne tourne pas grâce à un tableau de bord. Elle tourne grâce à des gens qui, entre deux cours, notent une absence, rassurent un parent, retrouvent un bulletin. Ce sont ces minutes-là que j’ai voulu leur rendre.',
  signature: 'Yassine E. — concepteur de SmartMadrassa',
};

/** Traversée horizontale d'une année scolaire (section épinglée). */
export const YEAR = {
  eyebrow: 'Une année, de bout en bout',
  title: 'Septembre à juin, sans rupture',
  lead: 'La plateforme suit le calendrier réel d’une école. Voici ce qu’elle prend en charge, mois après mois.',
  stops: [
    {
      period: 'Août – septembre',
      title: 'La rentrée',
      body: 'Import des élèves et des familles, constitution des classes, envoi des accès aux parents dans leur langue.',
      metric: '1 semaine',
      metricLabel: 'pour être opérationnel',
      icon: 'sprout',
      accent: 'jade',
    },
    {
      period: 'Septembre – décembre',
      title: 'Le rythme de croisière',
      body: 'Appel à chaque cours, notes saisies au fil de l’eau, devoirs publiés, annonces envoyées aux bonnes personnes.',
      metric: '30 s',
      metricLabel: 'par appel de classe',
      icon: 'repeat',
      accent: 'brand',
    },
    {
      period: 'Décembre',
      title: 'Le premier bulletin',
      body: 'Les appréciations arrivent classe par classe, la direction suit l’avancement et publie quand tout est validé.',
      metric: '1 clic',
      metricLabel: 'pour publier une école entière',
      icon: 'file-check',
      accent: 'violet',
    },
    {
      period: 'Janvier – mars',
      title: 'Le suivi qui compte',
      body: 'Repérage des absences répétées, relance des minervals impayés, échanges directs avec les familles concernées.',
      metric: '2 clics',
      metricLabel: 'pour sortir un relevé Excel',
      icon: 'radar',
      accent: 'sky',
    },
    {
      period: 'Avril – juin',
      title: 'La dernière ligne droite',
      body: 'Examens, moyennes annuelles, bulletins de fin d’année téléchargeables par chaque parent en PDF.',
      metric: '0 ressaisie',
      metricLabel: 'entre les notes et le bulletin',
      icon: 'flag',
      accent: 'brand',
    },
    {
      period: 'Juillet',
      title: 'La clôture',
      body: 'L’année est archivée et reste consultable. La suivante se prépare en dupliquant classes, cours et périodes.',
      metric: 'Archivé',
      metricLabel: 'et toujours exportable',
      icon: 'archive',
      accent: 'jade',
    },
  ],
};

export type ModuleAccent = 'brand' | 'jade' | 'violet' | 'sky';

export type AppModule = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  mock: 'attendance' | 'grades' | 'bulletin' | 'comms' | 'finance';
  accent: ModuleAccent;
};

export const MODULES: AppModule[] = [
  {
    id: 'presences',
    eyebrow: 'Module 01',
    title: 'L’appel, réglé en trente secondes',
    description:
      'L’enseignant ouvre son cours du jour, tape sur les élèves absents, valide. La direction voit le résultat immédiatement — par classe, par élève, par période.',
    bullets: [
      'Présent · Absent · Retard · Justifié, en un geste',
      'Vue générale direction, filtrable par classe et par dates',
      'Compteurs automatiques d’absences justifiées et non justifiées',
      'Export Excel prêt pour l’administration ou le subside',
    ],
    mock: 'attendance',
    accent: 'brand',
  },
  {
    id: 'notes',
    eyebrow: 'Module 02',
    title: 'Des notes qui ne vivent plus dans un tableur',
    description:
      'Saisie par élève ou par matière, catégories pondérées définies par la direction, moyennes calculées en direct. Le parent et l’élève voient la note dès qu’elle est publiée.',
    bullets: [
      'Saisie individuelle ou en lot pour toute une classe',
      'Catégories pondérées : interrogation, examen, participation…',
      'Moyennes par matière et par période, calculées automatiquement',
      'Notification e-mail à l’élève et à son parent à la publication',
    ],
    mock: 'grades',
    accent: 'jade',
  },
  {
    id: 'bulletins',
    eyebrow: 'Module 03',
    title: 'Les bulletins, sans les deux semaines de panique',
    description:
      'Les périodes académiques sont configurées une fois. Les enseignants rédigent leurs appréciations, la direction suit l’avancement en direct et publie toute l’école d’un clic.',
    bullets: [
      'Trimestres ou semestres configurables par année scolaire',
      'Tableau de bord d’avancement : appréciations validées par classe',
      'Publication groupée, ou classe par classe',
      'Bulletin PDF téléchargeable par le parent et l’élève',
    ],
    mock: 'bulletin',
    accent: 'violet',
  },
  {
    id: 'communication',
    eyebrow: 'Module 04',
    title: 'Un canal officiel, à la place de six groupes',
    description:
      'Messagerie interne entre les rôles, annonces ciblées vers un public précis, devoirs et emploi du temps au même endroit. Chaque message important déclenche un e-mail.',
    bullets: [
      'Messagerie privée direction ↔ enseignants ↔ parents',
      'Annonces vers tous, les parents, les élèves ou les enseignants',
      'Devoirs avec échéance, visibles côté élève et parent',
      'Notification e-mail automatique à chaque message reçu',
    ],
    mock: 'comms',
    accent: 'sky',
  },
  {
    id: 'finances',
    eyebrow: 'Module 05',
    title: 'Les frais de scolarité, enfin lisibles',
    description:
      'Minerval, cotisations et frais d’activité suivis par élève. Qui a payé, qui doit encore, combien il manque — et un reçu PDF généré pour chaque règlement.',
    bullets: [
      'Statut par élève : payé, partiel, en attente',
      'Indicateurs clés : encaissé, restant dû, taux de recouvrement',
      'Reçu PDF à l’en-tête de l’école, en un clic',
      'Recherche et filtres pour les relances de fin de période',
    ],
    mock: 'finance',
    accent: 'brand',
  },
];

export const BENTO = [
  {
    title: 'Fonctionne sur le téléphone des enseignants',
    body: 'Installable comme une application depuis le navigateur. Pas de store, pas de mise à jour à gérer, une icône sur l’écran d’accueil.',
    icon: 'smartphone',
    span: 'lg:col-span-2',
  },
  {
    title: 'Trois langues, RTL compris',
    body: 'Français, néerlandais et arabe. L’interface bascule entièrement, y compris la mise en page de droite à gauche.',
    icon: 'languages',
    span: '',
  },
  {
    title: 'Rôles et permissions stricts',
    body: 'Un parent ne voit que ses enfants, un enseignant que ses classes. Les règles sont appliquées côté serveur, pas seulement à l’écran.',
    icon: 'lock',
    span: '',
  },
  {
    title: 'Exports Excel et PDF natifs',
    body: 'Relevés d’absences, listes d’élèves, bulletins, reçus de paiement : les documents que l’administration réclame, sans ressaisie.',
    icon: 'file-down',
    span: '',
  },
  {
    title: 'Temps réel, sans rafraîchir',
    body: 'Une note saisie côté enseignant apparaît immédiatement côté direction. Tout le monde travaille sur la même donnée.',
    icon: 'zap',
    span: '',
  },
  {
    title: 'Mise en route accompagnée',
    body: 'Import de vos classes, élèves et enseignants depuis vos fichiers existants, puis une session de prise en main avec votre équipe.',
    icon: 'life-buoy',
    span: 'lg:col-span-2',
  },
];

export type Role = {
  id: string;
  name: string;
  headline: string;
  body: string;
  points: string[];
  icon: string;
};

export const ROLES: Role[] = [
  {
    id: 'direction',
    name: 'Direction',
    headline: 'Le pilotage de l’école, sur un seul écran',
    body: 'Vous voyez l’état réel de l’établissement sans demander un rapport à qui que ce soit : présences du jour, avancement des bulletins, encaissements, effectifs par classe.',
    points: [
      'Vue générale des absences, filtrable et exportable',
      'Suivi d’avancement des bulletins par classe',
      'Création des classes, cours et années académiques',
      'Gestion des comptes enseignants, élèves et parents',
      'Publication des bulletins pour toute l’école',
    ],
    icon: 'building',
  },
  {
    id: 'enseignant',
    name: 'Enseignant',
    headline: 'Moins d’administratif, plus de cours',
    body: 'Tout ce que l’on vous demande habituellement en fin de période se fait au fil de l’eau, en quelques secondes, depuis votre téléphone entre deux cours.',
    points: [
      'Appel du cours en cours, en un seul écran',
      'Saisie des notes individuelle ou en lot',
      'Appréciations de bulletin par élève',
      'Devoirs avec date d’échéance',
      'Messagerie directe avec la direction et les parents',
    ],
    icon: 'graduation',
  },
  {
    id: 'parent',
    name: 'Parent',
    headline: 'Savoir, sans avoir à demander',
    body: 'Vous suivez la scolarité de votre enfant en temps réel, dans votre langue. Plus besoin d’attendre la réunion de parents pour découvrir un problème.',
    points: [
      'Notes et moyennes dès leur publication',
      'Absences et retards, avec leur motif',
      'Bulletins téléchargeables en PDF',
      'Devoirs et emploi du temps de la semaine',
      'Contact direct avec l’équipe pédagogique',
    ],
    icon: 'users',
  },
  {
    id: 'eleve',
    name: 'Élève',
    headline: 'Un espace clair, sans distraction',
    body: 'Un espace personnel simple, pensé pour être consulté sur un téléphone : ce qu’il y a à faire, où en sont les résultats, quand a lieu le prochain cours.',
    points: [
      'Résultats par matière et progression',
      'Devoirs à rendre et échéances',
      'Emploi du temps de la semaine',
      'Historique de présences',
      'Annonces de l’école',
    ],
    icon: 'book',
  },
];

export const STEPS = [
  {
    n: '01',
    title: 'Je reprends vos fichiers',
    body: 'Vous me transmettez vos listes existantes — Excel, Word, papier scanné. Classes, élèves, parents et enseignants sont importés puis vérifiés avec vous.',
    duration: 'Jour 1 à 3',
  },
  {
    n: '02',
    title: 'Je configure votre année',
    body: 'Périodes académiques, matières, catégories de notes et pondérations, horaires des cours : la plateforme est réglée sur le fonctionnement réel de votre école.',
    duration: 'Jour 3 à 5',
  },
  {
    n: '03',
    title: 'Je forme votre équipe',
    body: 'Une session courte par profil — direction, enseignants, secrétariat. L’interface est volontairement simple : une heure suffit en général.',
    duration: 'Semaine 2',
  },
  {
    n: '04',
    title: 'Vous ouvrez aux familles',
    body: 'Les comptes parents et élèves sont activés, avec un message d’accueil dans leur langue. Je reste joignable pendant toute la première période.',
    duration: 'Semaine 2 à 3',
  },
];

export const SECURITY = {
  eyebrow: 'Sécurité & conformité',
  title: 'Des données d’enfants. On les traite comme telles.',
  lead: 'Une école manipule des données sensibles : mineurs, résultats scolaires, coordonnées familiales. SmartMadrassa est construit autour de cette contrainte, pas au-dessus.',
  cards: [
    {
      title: 'Hébergement européen',
      body: 'Infrastructure cloud sécurisée, données stockées dans l’Union européenne. Aucun transfert hors UE pour les données scolaires.',
      icon: 'globe',
    },
    {
      title: 'Conforme au RGPD',
      body: 'Registre des traitements, durées de conservation définies, droits d’accès et d’effacement, procédure de notification en cas d’incident.',
      icon: 'shield',
    },
    {
      title: 'Cloisonnement par rôle',
      body: 'Les règles d’accès sont appliquées côté serveur. Un parent ne peut techniquement pas ouvrir le dossier d’un autre élève.',
      icon: 'lock',
    },
    {
      title: 'Connexions chiffrées',
      body: 'HTTPS strict, authentification gérée par Firebase Authentication, protection anti-robot par reCAPTCHA Enterprise.',
      icon: 'key',
    },
    {
      title: 'Traçabilité des actions',
      body: 'Les opérations sensibles — publication de bulletins, modification de notes, suppression de comptes — sont horodatées et attribuées.',
      icon: 'scroll',
    },
    {
      title: 'Vos données vous appartiennent',
      body: 'Export complet à tout moment, en Excel et PDF. Aucune revente, aucun profilage publicitaire, aucune exploitation commerciale.',
      icon: 'database',
    },
  ],
};

export const LANGUAGES = {
  eyebrow: 'Trilingue',
  title: 'Chaque famille dans sa langue',
  lead: 'En Belgique, une même école accueille souvent des familles francophones, néerlandophones et arabophones. L’interface s’adapte à chacune — et pas seulement les libellés : toute la mise en page bascule en RTL pour l’arabe.',
  items: [
    { code: 'FR', label: 'Français', sample: 'Bulletin du 2ᵉ trimestre publié', dir: 'ltr' as const },
    { code: 'NL', label: 'Nederlands', sample: 'Rapport 2de trimester gepubliceerd', dir: 'ltr' as const },
    { code: 'AR', label: 'العربية', sample: 'تم نشر بطاقة الفصل الثاني', dir: 'rtl' as const },
  ],
};

export const PRICING = {
  eyebrow: 'Tarifs',
  title: 'Un prix clair, sans surprise en cours d’année',
  lead: 'Facturation mensuelle ou annuelle. Mise en route, import des données et formation inclus dans toutes les formules.',
  note: 'Tarifs indicatifs par établissement, à confirmer ensemble selon vos besoins. Les écoles associatives sans but lucratif bénéficient d’un tarif adapté — parlons-en.',
  plans: [
    {
      id: 'essentiel',
      name: 'Essentiel',
      priceMonthly: 39,
      priceYearly: 31,
      cap: 'Jusqu’à 100 élèves',
      pitch: 'Pour une école associative ou un institut qui démarre sa digitalisation.',
      features: [
        'Présences et appel',
        'Notes et moyennes',
        'Messagerie et annonces',
        'Emploi du temps et devoirs',
        'Exports Excel',
        'Support par e-mail',
      ],
      cta: 'Commencer',
      highlighted: false,
    },
    {
      id: 'ecole',
      name: 'École',
      priceMonthly: 79,
      priceYearly: 63,
      cap: 'Jusqu’à 400 élèves',
      pitch: 'La formule complète, pour une école qui gère des bulletins et des inscriptions.',
      features: [
        'Tout l’Essentiel, plus :',
        'Bulletins périodiques et publication',
        'Appréciations des enseignants',
        'Module finances et reçus PDF',
        'Notifications e-mail personnalisées',
        'Support prioritaire',
      ],
      cta: 'Demander une démo',
      highlighted: true,
    },
    {
      id: 'reseau',
      name: 'Réseau',
      priceMonthly: null,
      priceYearly: null,
      cap: 'Plusieurs implantations',
      pitch: 'Pour une fédération ou un réseau gérant plusieurs écoles sous une même coupole.',
      features: [
        'Tout le plan École, plus :',
        'Établissements multiples',
        'Consolidation des statistiques',
        'Domaine et identité personnalisés',
        'Accompagnement dédié',
        'Convention de traitement sur mesure',
      ],
      cta: 'Me contacter',
      highlighted: false,
    },
  ],
};

export const FAQ = [
  {
    q: 'Qui est derrière SmartMadrassa ?',
    a: 'Je m’appelle Yassine E. J’ai conçu et développé SmartMadrassa seul, en Belgique. C’est un projet personnel que je porte en tant qu’éditeur indépendant : vous échangez directement avec la personne qui crée la plateforme.',
  },
  {
    q: 'Faut-il installer quelque chose ?',
    a: 'Non. SmartMadrassa fonctionne dans le navigateur, sur ordinateur comme sur téléphone. Les enseignants peuvent l’ajouter à leur écran d’accueil en deux gestes : elle se comporte alors comme une application native, sans passer par un store.',
  },
  {
    q: 'Nos données restent-elles en Europe ?',
    a: 'Oui. Les données scolaires sont hébergées sur une infrastructure cloud sécurisée située dans l’Union européenne, et les e-mails transactionnels transitent par une passerelle européenne. Le détail figure dans la politique de confidentialité.',
  },
  {
    q: 'Comment récupérez-vous nos données existantes ?',
    a: 'Vous m’envoyez ce que vous avez — un Excel, un export d’un autre logiciel, voire des listes papier scannées. Je me charge de la mise en forme et de l’import, puis nous validons ensemble avant l’ouverture aux familles.',
  },
  {
    q: 'Les parents doivent-ils créer un compte eux-mêmes ?',
    a: 'Non, vous créez les comptes depuis la plateforme et le parent reçoit une invitation par e-mail avec ses accès. Un parent peut suivre plusieurs enfants depuis un seul compte.',
  },
  {
    q: 'Peut-on l’utiliser pour autre chose qu’une madrassa ?',
    a: 'Oui. La plateforme convient aux écoles associatives, instituts de langues, académies et structures de soutien scolaire. Le vocabulaire de l’interface et le découpage des périodes s’adaptent à votre fonctionnement.',
  },
  {
    q: 'Combien de temps prend la mise en route ?',
    a: 'Comptez deux à trois semaines entre la reprise de vos fichiers et l’ouverture des comptes aux familles, formation de l’équipe comprise. Une école qui démarre en cours d’année peut aller plus vite.',
  },
  {
    q: 'Que se passe-t-il si nous arrêtons ?',
    a: 'Vous exportez l’intégralité de vos données en Excel et PDF avant la fermeture du compte, puis je les supprime de la plateforme selon la durée annoncée dans la politique de confidentialité. Rien n’est conservé à des fins commerciales.',
  },
  {
    q: 'Proposez-vous une démonstration ?',
    a: 'Oui : une démonstration en visioconférence de trente minutes avec un jeu de données de test, ou un accès à un environnement d’essai si vous préférez explorer par vous-même.',
  },
];

export const CTA = {
  title: 'Voyons ce que ça donne sur votre école.',
  lead: 'Échangez directement avec Yassine, le créateur de SmartMadrassa. En trente minutes, je vous présente la plateforme à partir du fonctionnement de votre école.',
  bullets: [
    'Démonstration personnalisée',
    'Estimation de la reprise de vos données',
    'Devis clair sous 48 h',
  ],
};

export const CONTACT = {
  eyebrow: 'Parlons-en',
  title: 'Écrivez-moi',
  lead: 'Décrivez votre école en quelques lignes : nombre d’élèves, et ce qui vous pose problème aujourd’hui. Je vous réponds personnellement sous deux jours ouvrables.',
  subjects: [
    'Demande de démonstration',
    'Question sur les tarifs',
    'Reprise de données existantes',
    'Réseau / plusieurs écoles',
    'Autre',
  ],
};

export const FOOTER = {
  blurb:
    'Un projet indépendant, conçu et développé en solo par Yassine E. pour simplifier le quotidien des écoles associatives, instituts de langues et structures de soutien scolaire.',
  columns: [
    {
      title: 'Plateforme',
      links: [
        { label: 'Vue d’ensemble', href: '/#plateforme' },
        { label: 'Modules', href: '/#modules' },
        { label: 'Pour qui', href: '/#roles' },
        { label: 'Sécurité', href: '/#securite' },
        { label: 'Tarifs', href: '/#tarifs' },
      ],
    },
    {
      title: 'Ressources',
      links: [
        { label: 'Questions fréquentes', href: '/#faq' },
        { label: 'Mise en route', href: '/#demarrage' },
        { label: 'Me contacter', href: '/#contact' },
        { label: 'Accéder à mon espace', href: SITE.appUrl, external: true },
      ],
    },
    {
      title: 'Légal',
      links: [
        { label: 'Mentions légales', href: '/mentions-legales' },
        { label: 'Confidentialité (RGPD)', href: '/confidentialite' },
        { label: 'Conditions d’utilisation', href: '/conditions-utilisation' },
      ],
    },
  ],
};

/**
 * Témoignages — volontairement vide.
 * N’ajoutez ici que de VRAIS témoignages obtenus par écrit auprès d’écoles clientes.
 * La section se masque automatiquement tant que ce tableau est vide.
 */
export const TESTIMONIALS: {
  quote: string;
  author: string;
  role: string;
  school: string;
}[] = [];
