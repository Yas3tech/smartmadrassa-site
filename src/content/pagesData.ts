import type { ContentPageProps } from '../components/layout/ContentPageLayout';

export type ContentPageEntry = ContentPageProps & {
  ogTitle: string;
  description: string;
};

export const CONTENT_PAGES: ContentPageEntry[] = [
  // --- 1. Hub Fonctionnalités
  {
    slug: 'fonctionnalites',
    category: 'Plateforme',
    title: 'Toutes les fonctionnalités de gestion pour votre école',
    ogTitle: 'Fonctionnalités complètes de gestion scolaire | SmartMadrassa',
    description: 'Découvrez l’ensemble des modules de SmartMadrassa : appel en 30 secondes, bulletins scolaires, badges A4 hors-ligne, dossier santé et reçus guichet.',
    lead: 'SmartMadrassa rassemble tous les outils indispensables au bon fonctionnement de votre école du weekend ou institut de langue, dans une interface fluide et sans module superflu.',
    badge: 'Tout inclus',
    icon: 'general',
    metrics: [
      { value: '30 s', label: 'Pour faire l’appel', sub: 'Depuis un smartphone en salle' },
      { value: '8', label: 'Badges par page A4', sub: 'Format carte bancaire ISO 7810' },
      { value: '0 %', label: 'Commission guichet', sub: 'Paiements espèces & reçus A5' },
      { value: '3', label: 'Langues complètes', sub: 'Français, Néerlandais, Arabe RTL' },
    ],
    highlights: [
      {
        title: 'Appel express & présences',
        description: 'Pointage immédiat par classe : présent, absent, retard avec motifs. Les familles sont prévenues et la direction suit tout en direct.',
        badge: 'Quotidien',
        points: ['Pointage au doigt sur smartphone', 'Motifs d’absence & retards', 'Historique trimestriel automatique'],
      },
      {
        title: 'Bulletins & notes par coefficient',
        description: 'Saisie rapide des notes, coefficients personnalisés, neutralisation ABS qui ne fausse pas les moyennes et édition des bulletins en un clic.',
        badge: 'Pédagogie',
        points: ['Neutralisation intelligente des absences', 'Moyennes par matière et générale', 'Export PDF individuel et classe entière'],
      },
      {
        title: 'Badges scolaires A4 hors-ligne',
        description: 'Générez des planches de 8 badges au format carte bancaire avec repères de coupe fins et QR code. Zéro envoi de photos à un serveur tiers.',
        badge: 'Exclusivité',
        points: ['Standard ISO/IEC 7810 ID-1', 'Génération 100% locale dans le navigateur', 'QR Code de pointage haute résolution'],
      },
      {
        title: 'Fiches santé & urgences directes',
        description: 'Cloisonnement strict des données médicales Art. 9 RGPD. Allergies, PAI et bouton d’appel d’urgence en un clic sur le téléphone du responsable.',
        badge: 'Sécurité Art. 9',
        points: ['Silo étanche réservé aux enseignants', 'Protocole PAI consultable en sortie', 'Appel direct sans chercher le numéro'],
      },
      {
        title: 'Cotisations, guichet & reçus A5',
        description: 'Encaissez en espèces ou virement au guichet sans commission intermédiaire. Émission instantanée de reçus officiels A5 Paysage numérotés.',
        badge: 'Finance',
        points: ['Zéro pourcent de frais bancaires', 'Numérotation séquentielle REC-YYYY-XXXX', 'Reçu A5 avec cadre de signature'],
      },
      {
        title: 'Espace parents multi-enfants',
        description: 'Un seul compte pour toute la fratrie. Les responsables légaux consultent les notes, devoirs, présences et reçus dans leur langue.',
        badge: 'Familles',
        points: ['Bascule instantanée entre enfants', 'Trilingue FR / NL / AR avec RTL', 'Zéro publicité ni profilage'],
      },
    ],
    faq: [
      {
        q: 'Tous les modules sont-ils compris dans le tarif ?',
        a: 'Oui. SmartMadrassa ne facture aucun module à la carte. L’appel, les bulletins, les badges A4, les fiches santé et les reçus guichet sont accessibles dès la première formule.',
      },
      {
        q: 'Peut-on désactiver certains modules si on ne les utilise pas ?',
        a: 'Absolument. Si votre établissement ne gère pas encore les encaissements ou les devoirs, ils peuvent être masqués pour garder une interface ultra-épurée.',
      },
    ],
    related: [
      { slug: 'fonctionnalites/presences', title: 'Appel express & présences', category: 'Module', description: 'Faites l’appel en 30 secondes depuis votre téléphone.' },
      { slug: 'fonctionnalites/bulletins-notes', title: 'Bulletins & notes', category: 'Module', description: 'Générez vos bulletins PDF avec coefficients et neutralisation ABS.' },
      { slug: 'fonctionnalites/badges-scolaires', title: 'Badges scolaires A4', category: 'Module', description: 'Planches A4 de 8 badges prêts à massicoter, 100% hors-ligne.' },
    ],
  },

  // --- 2. Présences & Appel
  {
    slug: 'fonctionnalites/presences',
    category: 'Fonctionnalité',
    categoryHref: '/fonctionnalites',
    title: 'Appel express & suivi des présences en 30 secondes',
    ogTitle: 'Appel express & présences en 30 secondes | SmartMadrassa',
    description: 'Faites l’appel en classe depuis un smartphone en 30 secondes chrono. Pointage présent, absent, retard avec motifs et notification immédiate des familles.',
    lead: 'Finies les feuilles volantes et les reports manuels du lundi soir. Vos enseignants pointent leur classe en salle en quelques clics depuis leur téléphone.',
    badge: '30 secondes chrono',
    icon: 'attendance',
    metrics: [
      { value: '30 s', label: 'Par classe entière', sub: 'Chronométré sur smartphone' },
      { value: '3', label: 'Statuts précis', sub: 'Présent, Absent, Retard avec motif' },
      { value: '100 %', label: 'Historique conservé', sub: 'Accessible par la direction et le parent' },
      { value: '0', label: 'Papier gaspillé', sub: 'Fini les cahiers d’appel égarés' },
    ],
    highlights: [
      {
        title: 'Pointage fluide pensé pour le pouce',
        description: 'L’enseignant ouvre sa classe sur smartphone ou tablette : la liste s’affiche avec photos. Un appui passe un élève en retard ou absent, tout le reste reste présent.',
        badge: 'Mobile first',
        points: ['Zéro frappe au clavier nécessaire', 'Modifiable pendant tout le cours', 'Validation sécurisée en fin d’heure'],
      },
      {
        title: 'Motifs et justificatifs intégrés',
        description: 'Précisez la raison de l’absence ou du retard (maladie, transport, motif familial) avec neutralisation automatique sur le décompte trimestriel.',
        badge: 'Précision',
        points: ['Absences excusées et non excusées', 'Commentaires pédagogiques internes', 'Visibilité immédiate pour la direction'],
      },
      {
        title: 'Rapports d’assiduité instantanés',
        description: 'La direction visualise en temps réel le taux de présence par classe, par enseignant et par période scolaire, sans compilation manuelle.',
        badge: 'Direction',
        points: ['Détection précoce du décrochage', 'Statistiques exportables en Excel', 'Synthèse automatique sur le bulletin'],
      },
    ],
    workflow: [
      { step: '1', title: 'Sélectionnez la séance', description: 'L’enseignant ouvre son cours du jour directement sur son téléphone.' },
      { step: '2', title: 'Pointez les exceptions', description: 'Tous les élèves sont pré-cochés présents. Vous ne touchez que les absents ou retards.' },
      { step: '3', title: 'Validez en un clic', description: 'L’appel est enregistré dans le registre officiel de l’école et visible des familles.' },
    ],
    comparison: {
      beforeTitle: 'Avant : la feuille papier',
      beforeItems: [
        'Des listes papier froissées qui circulent dans les couloirs',
        'Des reports de présences oubliés jusqu’à la fin du trimestre',
        'Des parents qui découvrent les absences 3 mois après',
        'Impossible de savoir qui est dans l’école à l’instant T',
      ],
      afterTitle: 'Avec SmartMadrassa',
      afterItems: [
        'Pointage fait en salle en 30 secondes depuis le smartphone',
        'Registre numérique officiel immédiatement mis à jour',
        'Les parents informés le jour même de l’absence',
        'La direction sait exactement combien d’élèves sont présents',
      ],
    },
    faq: [
      {
        q: 'Faut-il installer une application depuis l’App Store ou Google Play ?',
        a: 'Non, SmartMadrassa fonctionne dans le navigateur de n’importe quel téléphone. L’enseignant l’ajoute à son écran d’accueil en 2 gestes : elle s’ouvre comme une application native.',
      },
      {
        q: 'Que se passe-t-il si la connexion Internet est faible dans une salle ?',
        a: 'L’interface est allégée au maximum pour fonctionner même sur une connexion 3G ou 4G modeste sans ralentissement.',
      },
    ],
    related: [
      { slug: 'fonctionnalites/bulletins-notes', title: 'Bulletins & notes', category: 'Module', description: 'Les présences alimentent automatiquement le décompte des bulletins.' },
      { slug: 'fonctionnalites/application-parents', title: 'Espace parents', category: 'Module', description: 'Les familles consultent l’assiduité de leurs enfants en direct.' },
    ],
  },

  // --- 3. Bulletins & Notes
  {
    slug: 'fonctionnalites/bulletins-notes',
    category: 'Fonctionnalité',
    categoryHref: '/fonctionnalites',
    title: 'Bulletins scolaires, notes par coefficient et neutralisation ABS',
    ogTitle: 'Bulletins scolaires & notes par coefficient | SmartMadrassa',
    description: 'Saisie rapide des notes, coefficients personnalisables, gestion des absences non pénalisantes (ABS), moyennes automatiques et exports PDF/Excel en 1 clic.',
    lead: 'Les périodes de bulletins ne doivent plus être un marathon de calculs manuels. SmartMadrassa centralise vos évaluations et génère des bulletins clairs et valorisants.',
    badge: 'Export PDF en 1 clic',
    icon: 'grades',
    metrics: [
      { value: '1 clic', label: 'Génération de la classe', sub: 'Tous les bulletins PDF réunis' },
      { value: 'ABS', label: 'Absence neutralisée', sub: 'Ne fausse pas la moyenne de l’élève' },
      { value: '100 %', label: 'Calcul automatique', sub: 'Moyennes générales et par matière' },
      { value: 'Excel', label: 'Export structuré', sub: 'Pour vos archives pédagogiques' },
    ],
    highlights: [
      {
        title: 'Saisie rapide par grille et coefficient',
        description: 'Chaque matière (arabe, tajweed, mémorisation, culture) possède ses propres coefficients et types d’évaluations (oral, écrit, devoir).',
        badge: 'Souplesse',
        points: ['Coefficients configurables par niveau', 'Notes sur 10, 20 ou appréciations', 'Saisie fluide au clavier sans rechargement'],
      },
      {
        title: 'La neutralisation intelligente des absences (ABS)',
        description: 'Un élève malade lors d’un contrôle ne doit pas être pénalisé avec un 0/20. La mention ABS retire l’épreuve de son calcul sans fausser sa moyenne.',
        badge: 'Équité',
        points: ['Absence justifiée neutralisée', 'Moyenne calculée sur les épreuves passées', 'Indication claire sur le bulletin imprimé'],
      },
      {
        title: 'Bulletins vectoriels prêts pour l’impression',
        description: 'Générez des bulletins soignés au format A4 avec le logo de votre école, les moyennes de classe, les appréciations des professeurs et la signature de direction.',
        badge: 'Rendu officiel',
        points: ['Mise en page impeccable et lisible', 'Appréciations globales et par matière', 'Téléchargement individuel ou classe complète'],
      },
    ],
    comparison: {
      beforeTitle: 'Avant : tableurs et copier-coller',
      beforeItems: [
        'Des fichiers Excel partagés avec formules écrasées par erreur',
        'Des soirées entières passées à calculer les moyennes à la calculatrice',
        'Les absences notées 0 qui font chuter injustement la moyenne de l’élève',
        'Mise en page manuelle des bulletins sous Word pendant deux semaines',
      ],
      afterTitle: 'Avec SmartMadrassa',
      afterItems: [
        'Saisie centralisée en ligne par les enseignants dès la notation',
        'Moyennes pondérées calculées en temps réel sans aucune formule à gérer',
        'Statut ABS préservant l’équité des notes des élèves absents',
        'Génération de tous les bulletins PDF de la classe en un seul clic',
      ],
    },
    faq: [
      {
        q: 'Peut-on adapter le bulletin au découpage de notre année (semestres ou trimestres) ?',
        a: 'Oui. Le découpage de l’année scolaire (trimestres, semestres ou sessions courtes) est totalement personnalisable selon le calendrier de votre établissement.',
      },
      {
        q: 'Les parents peuvent-ils télécharger le bulletin directement sur leur compte ?',
        a: 'Dès que la direction publie officiellement les bulletins, ils apparaissent dans l’espace parent et peuvent être téléchargés en PDF sécurisé.',
      },
    ],
    related: [
      { slug: 'fonctionnalites/presences', title: 'Présences & appel', category: 'Module', description: 'Le récapitulatif des retards et absences figure sur le bulletin.' },
      { slug: 'fonctionnalites/badges-scolaires', title: 'Badges scolaires A4', category: 'Module', description: 'Identifiez vos élèves dès la rentrée.' },
    ],
  },

  // --- 4. Badges Scolaires A4 & QR Code
  {
    slug: 'fonctionnalites/badges-scolaires',
    category: 'Fonctionnalité exclusive',
    categoryHref: '/fonctionnalites',
    title: 'Badges scolaires vectoriels A4 et QR Code 100% hors-ligne',
    ogTitle: 'Badges scolaires A4 & QR Code hors-ligne | SmartMadrassa',
    description: 'Générez des cartes d’élèves conformes au standard bancaire ISO/IEC 7810 ID-1. Planche A4 de 8 badges avec repères de coupe fins et QR code de pointage.',
    lead: 'Une exclusivité SmartMadrassa : créez et imprimez des cartes d’élèves professionnelles sans acheter de logiciel tiers ni envoyer les photos d’enfants à un serveur externe.',
    badge: '100% Hors-ligne & Zéro fuite',
    icon: 'badges',
    metrics: [
      { value: 'ISO 7810', label: 'Standard carte bancaire', sub: 'Format universel 85.60 x 53.98 mm' },
      { value: '8 badges', label: 'Par feuille A4', sub: 'Disposition optimale zéro-gaspillage' },
      { value: '100 %', label: 'Local dans le navigateur', sub: 'Aucune donnée d’enfant envoyée dehors' },
      { value: '1 s', label: 'Pour générer la classe', sub: 'Fichier PDF haute résolution immédiat' },
    ],
    highlights: [
      {
        title: 'Format universel carte bancaire',
        description: 'Les badges adoptent les dimensions standard des cartes scolaires (85.6 x 54 mm). Ils se glissent dans tous les porte-cartes et cordons tour de cou du commerce.',
        badge: 'Standard pro',
        points: ['Repères de coupe fins pour massicot ou cutter', 'Logo et couleurs officielles de votre école', 'Bandeau contrasté pour une lecture rapide'],
      },
      {
        title: 'QR Code haute résolution pour chaque élève',
        description: 'Chaque carte intègre un QR Code scannable contenant l’identifiant sécurisé de l’élève, prêt pour les pointages rapides et les contrôles d’accès aux entrées.',
        badge: 'Technologie utile',
        points: ['Scannable avec n’importe quelle caméra', 'Idéal pour sécuriser les départs d’élèves', 'Zéro information personnelle en clair dans le code'],
      },
      {
        title: 'Respect absolu de la vie privée des mineurs',
        description: 'Le moteur de rendu vectoriel et la génération du QR Code s’exécutent entièrement dans votre navigateur. Aucune photo d’élève ne transite vers un service tiers.',
        badge: 'Confidentialité',
        points: ['Zéro prestataire externe de traitement photo', 'Conformité totale avec la protection de l’enfance', 'Impression sur votre imprimante de bureau'],
      },
    ],
    workflow: [
      { step: '1', title: 'Sélectionnez la classe', description: 'Choisissez une classe ou un élève individuel depuis le tableau de bord.' },
      { step: '2', title: 'Prévisualisez la planche', description: 'L’aperçu montre les 8 cartes par page A4 avec les repères de coupe.' },
      { step: '3', title: 'Imprimez et massicotez', description: 'Téléchargez le PDF vectoriel et lancez l’impression sur papier épais ou cartonné.' },
    ],
    comparison: {
      beforeTitle: 'Avant : les bricolages de rentrée',
      beforeItems: [
        'Des étiquettes manuscrites qui se décollent au bout de deux semaines',
        'Achat d’imprimantes à cartes plastiques hors de prix pour l’association',
        'Envoi risqué de photos d’enfants sur des sites d’impression grand public',
        'Des heures passées à redimensionner des cartes sous un logiciel de dessin',
      ],
      afterTitle: 'Avec SmartMadrassa',
      afterItems: [
        'Cartes élèves élégantes aux normes officielles prêtes en 1 clic',
        'Impression sur n’importe quelle imprimante de bureau ordinaire',
        'Génération 100% sécurisée en local dans votre propre navigateur',
        'Une planche de 8 badges par feuille A4 avec lignes de découpe parfaites',
      ],
    },
    faq: [
      {
        q: 'Quel type de papier conseillez-vous pour l’impression ?',
        a: 'Un papier blanc épais de 160 g à 250 g donne un résultat très professionnel. Vous pouvez ensuite glisser les badges découpés dans des pochettes transparentes avec pince ou cordon tour de cou.',
      },
      {
        q: 'Peut-on imprimer le badge d’un seul élève arrivé en cours d’année ?',
        a: 'Oui, vous pouvez imprimer la carte individuelle d’un nouvel élève en quelques secondes sans avoir à réimprimer toute la classe.',
      },
    ],
    related: [
      { slug: 'fonctionnalites/sante-urgence', title: 'Fiches santé & urgences', category: 'Sécurité', description: 'Le numéro d’urgence parent peut figurer sur la carte.' },
      { slug: 'securite-rgpd', title: 'Sécurité & RGPD', category: 'Conformité', description: 'Découvrez comment vos données d’enfants sont protégées.' },
    ],
  },

  // --- 5. Fiches Santé & Urgences Art. 9
  {
    slug: 'fonctionnalites/sante-urgence',
    category: 'Sécurité & Santé',
    categoryHref: '/fonctionnalites',
    title: 'Fiches santé isolées Art. 9 RGPD et appel d’urgence en 1 clic',
    ogTitle: 'Fiches santé isolées & urgences | SmartMadrassa',
    description: 'Cloisonnement hermétique des données médicales étudiantes (Art. 9 RGPD), gestion des allergies, protocoles PAI et bouton d’appel d’urgence direct sur mobile.',
    lead: 'La sécurité des enfants est votre première responsabilité. SmartMadrassa protège les données médicales sensibles conformément au droit européen et facilite les réactions d’urgence.',
    badge: 'Article 9 RGPD conforme',
    icon: 'health',
    metrics: [
      { value: 'Art. 9', label: 'Données de santé protégées', sub: 'Cloisonnement strict en sous-collection' },
      { value: '1 clic', label: 'Appel direct du parent', sub: 'Bouton tel: utilisable sur smartphone' },
      { value: '0 fuite', label: 'Invisible pour les tiers', sub: 'Accessible uniquement à l’équipe encadrante' },
      { value: 'PAI', label: 'Protocoles allergies', sub: 'Consignes de secours immédiatement sous la main' },
    ],
    highlights: [
      {
        title: 'Isolation stricte des données médicales',
        description: 'Les données de santé des mineurs relèvent de l’Article 9 du RGPD. Elles ne sont jamais mélangées aux données scolaires générales et restent hermétiquement scellées.',
        badge: 'Réglementation',
        points: ['Inaccessible aux autres parents et élèves', 'Lecture réservée à la direction et aux professeurs affectés', 'Conforme aux exigences de l’APD belge et de la CNIL'],
      },
      {
        title: 'Allergies, traitements et PAI toujours accessibles',
        description: 'En cas de crise d’asthme, d’allergie alimentaire ou de malaise en classe ou lors d’une sortie, l’enseignant accède immédiatement aux consignes de premiers secours.',
        badge: 'Réactivité',
        points: ['Fiche de santé claire et sans jargon', 'Mention des trousses de secours et traitements autorisés', 'Consultable en quelques secondes sur le téléphone du professeur'],
      },
      {
        title: 'Bouton d’appel d’urgence direct sans composer',
        description: 'Plus besoin de chercher fébrilement le numéro de téléphone des parents dans un classeur. Un appui sur le bouton vert lance l’appel immédiatement.',
        badge: 'Urgence',
        points: ['Lien direct vers l’application téléphone du mobile', 'Numéros des deux responsables légaux répertoriés', 'Contact de confiance secondaire en cas d’absence'],
      },
    ],
    comparison: {
      beforeTitle: 'Avant : fiches papier et panique',
      beforeItems: [
        'Des fiches médicales papier rangées dans un bureau verrouillé au rez-de-chaussée',
        'L’enseignant au 2e étage qui ne sait pas si un élève est asthmatique',
        'Perte de minutes précieuses à chercher le numéro des parents dans un carnet',
        'Des informations de santé laissées visibles sur une table en salle des profs',
      ],
      afterTitle: 'Avec SmartMadrassa',
      afterItems: [
        'L’enseignant consulte la fiche médicale de son élève directement en classe',
        'Consignes de conduite à tenir et PAI visibles immédiatement',
        'Bouton d’appel direct qui sonne instantanément chez le parent responsable',
        'Protection hermétique des données médicales conforme au droit européen',
      ],
    },
    faq: [
      {
        q: 'Les autres élèves ou parents peuvent-ils voir les allergies d’un enfant ?',
        a: 'Absolument pas. Les données médicales sont scellées dans une sous-collection hermétique. Seuls la direction et les enseignants affectés à la classe ont le droit d’y accéder.',
      },
      {
        q: 'Est-ce conforme à la législation belge sur les données de santé ?',
        a: 'Oui. SmartMadrassa applique rigoureusement la Loi belge du 30 juillet 2018 relative à la protection des personnes physiques à l’égard des traitements de données à caractère personnel.',
      },
    ],
    related: [
      { slug: 'securite-rgpd', title: 'Sécurité & RGPD', category: 'Confiance', description: 'Découvrez notre politique d’hébergement souverain en Europe.' },
      { slug: 'fonctionnalites/application-parents', title: 'Espace parents', category: 'Module', description: 'Les parents vérifient leurs informations de contact d’urgence.' },
    ],
  },

  // --- 6. Cotisations, Guichet & Reçus A5
  {
    slug: 'fonctionnalites/paiements-recus',
    category: 'Finance & Gestion',
    categoryHref: '/fonctionnalites',
    title: 'Gestion des cotisations, encaissement guichet et reçus officiels A5',
    ogTitle: 'Cotisations, guichet & reçus officiels A5 | SmartMadrassa',
    description: 'Suivez les cotisations annuelles, encaissez en espèces ou virement au guichet à 0% de commission bancaire et délivrez des reçus officiels A5 Paysage.',
    lead: 'La plupart des écoles associatives fonctionnent avec des règlements au guichet. SmartMadrassa structure vos encaissements sans prélever un seul centime de commission.',
    badge: '0% de commission bancaire',
    icon: 'finance',
    metrics: [
      { value: '0 %', label: 'Frais sur vos cotisations', sub: 'Chaque euro versé reste à l’école' },
      { value: 'A5', label: 'Reçu officiel paysage', sub: 'Format 210 x 148 mm prêt à imprimer' },
      { value: 'REC-', label: 'Numérotation inaltérable', sub: 'Séquence REC-YYYY-XXXX traçable' },
      { value: '10 s', label: 'Pour encaisser au guichet', sub: 'Saisie ultra-rapide les jours de rentrée' },
    ],
    highlights: [
      {
        title: 'Encaissement rapide au guichet',
        description: 'Les samedis et dimanches de rentrée, des dizaines de parents règlent en espèces ou par virement. Pointez le règlement et générez le reçu en dix secondes.',
        badge: 'Terrain',
        points: ['Gestion des paiements en espèces, virement, chèque', 'Paiements partiels et échelonnements suivis', 'Solde restant automatiquement mis à jour'],
      },
      {
        title: 'Reçu officiel A5 Paysage avec tampon et signature',
        description: 'Remettez un reçu comptable irréprochable avec le logo de votre association, le montant en chiffres et en lettres, le nom du trésorier et l’émargement officiel.',
        badge: 'Comptabilité',
        points: ['Format A5 Paysage élégant (210 x 148 mm)', 'Numéro séquentiel unique inviolable', 'Téléchargeable en PDF ou imprimable sur place'],
      },
      {
        title: 'Zéro commission prélevée sur vos encaissements',
        description: 'Contrairement aux plateformes de paiement en ligne qui prélèvent 1,5 % à 3 % plus des frais fixes sur chaque cotisation, SmartMadrassa ne touche pas à votre argent.',
        badge: 'Économie ASBL',
        points: ['100% des cotisations vont dans la caisse de l’école', 'Aucun intermédiaire financier imposé', 'Journal des encaissements exportable en comptabilité'],
      },
    ],
    workflow: [
      { step: '1', title: 'Le parent se présente', description: 'Recherchez l’élève ou la famille en tapant les premières lettres du nom.' },
      { step: '2', title: 'Saisissez le règlement', description: 'Indiquez le montant (ex: 150 €) et le moyen (espèces, virement). Le solde se met à jour.' },
      { step: '3', title: 'Délivrez le reçu A5', description: 'Le reçu REC-2026-XXXX est généré instantanément en PDF et enregistré.' },
    ],
    comparison: {
      beforeTitle: 'Avant : le carnet à souches papier',
      beforeItems: [
        'Des carnets à souche écrits à la main avec ratures et carbone illisible',
        'Des cotisations en espèces notées sur des bouts de papier volants',
        'Des contestations entre parents et trésorier en cours d’année',
        'Des plateformes en ligne qui ponctionnent des centaines d’euros de frais',
      ],
      afterTitle: 'Avec SmartMadrassa',
      afterItems: [
        'Encaissement propre enregistré dans la base officielle en dix secondes',
        'Reçu A5 officiel imprimé ou envoyé par e-mail avec mention légale',
        'Historique complet des versements consultable par la famille et le trésorier',
        'Zéro centime de commission prélevée sur le budget de votre association',
      ],
    },
    faq: [
      {
        q: 'Le module finance peut-il être désactivé si nous ne gérons pas les paiements ?',
        a: 'Oui. Le module de caisse et de cotisations peut être activé ou désactivé selon les besoins de votre direction.',
      },
      {
        q: 'Peut-on exporter les encaissements pour le bilan annuel de l’association ?',
        a: 'Oui, vous exportez en un clic le tableau complet des encaissements par période avec les totaux par moyen de paiement pour votre comptable ou assemblée générale.',
      },
    ],
    related: [
      { slug: 'solutions/ecoles-associatives', title: 'Écoles associatives', category: 'Solution', description: 'Découvrez comment SmartMadrassa soulage les trésoriers bénévoles.' },
      { slug: 'tarifs', title: 'Tarifs de la plateforme', category: 'Offre', description: 'Consultez nos formules transparentes sans frais cachés.' },
    ],
  },

  // --- 7. Application Parents & Familles
  {
    slug: 'fonctionnalites/application-parents',
    category: 'Familles & Communication',
    categoryHref: '/fonctionnalites',
    title: 'Application parents trilingue et gestion multi-enfants de la fratrie',
    ogTitle: 'Application parents trilingue & multi-enfants | SmartMadrassa',
    description: 'Offrez aux familles un espace mobile clair en français, néerlandais et arabe : notes, présences, devoirs et annonces de l’école pour toute la fratrie.',
    lead: 'Les parents ne veulent pas d’un système complexe par enfant. Avec SmartMadrassa, un seul compte suffit pour suivre l’ensemble de la fratrie en temps réel.',
    badge: 'Fratrie unifiée',
    icon: 'parents',
    metrics: [
      { value: '1 compte', label: 'Pour toute la fratrie', sub: 'Tous les enfants sous le même identifiant' },
      { value: '3 langues', label: 'FR · NL · AR', sub: 'Interface arabe native avec support RTL' },
      { value: '0 pub', label: 'Zéro publicité', sub: 'Respect total de la tranquillité des familles' },
      { value: '24/7', label: 'Accès permanent', sub: 'Bulletins, devoirs et présences en ligne' },
    ],
    highlights: [
      {
        title: 'Bascule instantanée entre enfants',
        description: 'Une mère ayant trois enfants inscrits à des cours différents bascule de l’un à l’autre en un tap, sans jamais avoir à se déconnecter.',
        badge: 'Ergonomie',
        points: ['Vue d’ensemble des activités de chaque enfant', 'Notifications ciblées par classe', 'Zéro jonglage entre plusieurs mots de passe'],
      },
      {
        title: 'Trilingue natif (Français, Néerlandais, Arabe)',
        description: 'Chaque parent choisit la langue dans laquelle il est le plus à l’aise. L’arabe bénéficie d’une vraie typographie soignée et d’une disposition naturelle de droite à gauche.',
        badge: 'Inclusion',
        points: ['Français élégant et soigné', 'Néerlandais adapté pour la Flandre et Bruxelles', 'Arabe avec mise en page RTL fluide'],
      },
      {
        title: 'Devoirs, présences et bulletins dans la poche',
        description: 'Les familles consultent les leçons à réviser, les devoirs de la semaine prochaine et reçoivent les bulletins dès validation par le directeur.',
        badge: 'Transparence',
        points: ['Téléchargement des bulletins PDF officiels', 'Suivi en temps réel des absences et retards', 'Consignes des professeurs claires pour le weekend'],
      },
    ],
    comparison: {
      beforeTitle: 'Avant : le désordre des groupes WhatsApp',
      beforeItems: [
        'Des groupes WhatsApp bruyants où les annonces importantes se noient',
        'Des parents qui demandent le dimanche soir les devoirs pour le samedi',
        'Un identifiant différent par enfant à mémoriser pour la famille',
        'Des bulletins papier égarés dans le fond du cartable',
      ],
      afterTitle: 'Avec SmartMadrassa',
      afterItems: [
        'Un espace calme et officiel sans pollution de messages WhatsApp',
        'Les devoirs et leçons enregistrés par l’enseignant consultables à tout moment',
        'Un seul compte regroupant tous les frères et sœurs inscrits',
        'Les bulletins scolaires officiels sauvegardés et téléchargeables en PDF',
      ],
    },
    faq: [
      {
        q: 'Les parents doivent-ils payer pour accéder à l’application ?',
        a: 'Non, l’accès des familles est totalement gratuit. Il est inclus dans l’abonnement souscrit par l’école.',
      },
      {
        q: 'Comment les parents reçoivent-ils leurs identifiants ?',
        a: 'La direction génère une invitation par e-mail en un clic avec un lien de première connexion sécurisé permettant au parent de définir son mot de passe.',
      },
    ],
    related: [
      { slug: 'fonctionnalites/presences', title: 'Présences & appel', category: 'Module', description: 'Les familles sont informées dès la validation de l’appel.' },
      { slug: 'fonctionnalites/bulletins-notes', title: 'Bulletins & notes', category: 'Module', description: 'Téléchargement direct du bulletin depuis l’espace famille.' },
    ],
  },

  // --- 8. Solutions Hub
  {
    slug: 'solutions',
    category: 'Solutions',
    title: 'Des solutions adaptées à chaque structure d’enseignement',
    ogTitle: 'Solutions de gestion adaptées à votre école | SmartMadrassa',
    description: 'Que vous soyez une école de quartier associative, un institut de langue arabe ou une fédération multi-sites, SmartMadrassa s’adapte à votre modèle.',
    lead: 'Chaque organisation a son rythme et ses contraintes. Découvrez comment SmartMadrassa répond aux défis spécifiques de votre structure.',
    badge: 'Sur mesure pour vous',
    icon: 'general',
    metrics: [
      { value: '1 à 20+', label: 'Classes & antennes', sub: 'De la petite école au grand réseau' },
      { value: '5', label: 'Rôles spécialisés', sub: 'Directeur, Enseignant, Parent, Élève, Admin' },
      { value: '100 %', label: 'Adaptable', sub: 'Trimestres, semestres et horaires libres' },
      { value: '2 à 3 sem.', label: 'Mise en route', sub: 'Reprise de vos données accompagnée' },
    ],
    highlights: [
      {
        title: 'Écoles associatives & madrassas de weekend',
        description: 'Pensé pour les cours du samedi et du dimanche, les bénévoles dévoués et les cotisations encaissées au guichet en espèces.',
        badge: 'Idéal weekend',
        points: ['Prise en main en 15 minutes', 'Zéro jargon informatique complexe', 'Encaissement guichet sans commission'],
      },
      {
        title: 'Instituts de langues & grands réseaux',
        description: 'Pour les structures gérant plusieurs sites, des centaines d’apprenants, des conventions de formation et des exigences de gouvernance strictes.',
        badge: 'Multi-sites',
        points: ['Silos étanches par antenne ou établissement', 'Statistiques consolidées de direction', 'Convention de traitement de données sur mesure'],
      },
    ],
    faq: [
      {
        q: 'Notre école fonctionne uniquement le samedi matin, est-ce adapté ?',
        a: 'Absolument. SmartMadrassa a été spécialement pensé pour le rythme des écoles du weekend. Vos créneaux, vos matières et vos appels s’organisent exactement selon votre calendrier.',
      },
    ],
    related: [
      { slug: 'solutions/ecoles-associatives', title: 'Écoles associatives', category: 'Solution', description: 'Découvrez notre accompagnement pour les structures associatives.' },
      { slug: 'solutions/instituts-reseaux', title: 'Instituts & grands réseaux', category: 'Solution', description: 'Pilotez plusieurs antennes sous une gouvernance unifiée.' },
    ],
  },

  // --- 9. Solutions : Écoles Associatives
  {
    slug: 'solutions/ecoles-associatives',
    category: 'Solution',
    categoryHref: '/solutions',
    title: 'Logiciel de gestion pour écoles associatives et madrassas',
    ogTitle: 'Gestion pour écoles associatives & madrassas | SmartMadrassa',
    description: 'Simplifiez le bénévolat et la gestion des cours du weekend : inscriptions de rentrée, cotisations en espèces, présence rapide et bulletins clairs.',
    lead: 'Diriger une association le weekend tout en ayant une activité professionnelle la semaine est un défi d’organisation. SmartMadrassa vous fait gagner 10 heures précieuses chaque mois.',
    badge: 'Conçu pour le weekend',
    icon: 'general',
    metrics: [
      { value: '10 h', label: 'Gagnées par mois', sub: 'Sur la gestion administrative et les bulletins' },
      { value: '0 €', label: 'Frais de reprise', sub: 'Import de vos fichiers Excel offert' },
      { value: '100 %', label: 'Bénévoles autonomes', sub: 'Interface intuitive sans formation lourde' },
      { value: '30 min', label: 'Pour vous former', sub: 'Échange direct avec Yassine' },
    ],
    highlights: [
      {
        title: 'Soulagez vos bénévoles et votre trésorier',
        description: 'Vos équipes donnent de leur temps par engagement. Ne les épuisez pas avec des tableaux Excel instables et des carnets papier égarés.',
        badge: 'Simplicité',
        points: ['Moins de stress pour les trésoriers', 'Passation de relais facilitée d’une année sur l’autre', 'Archives scolaires protégées et centralisées'],
      },
      {
        title: 'Des bulletins valorisants pour les élèves',
        description: 'Les enfants et leurs familles attendent le bulletin avec fierté. Offrez-leur un document officiel, soigné et motivant.',
        badge: 'Valorisation',
        points: ['Logo et cachet de votre association', 'Appréciations pédagogiques bien mises en valeur', 'Rendu vectoriel clair prêt pour l’impression'],
      },
      {
        title: 'Gestion sereine des cotisations guichet',
        description: 'Encaissez les cotisations en espèces ou virement au guichet et délivrez des reçus A5 immédiats avec numérotation officielle.',
        badge: 'Trésorerie',
        points: ['Zéro centime de commission prélevée', 'Suivi rigoureux des paiements échelonnés', 'Rapports clairs pour l’assemblée générale'],
      },
    ],
    workflow: [
      { step: '1', title: 'Transmettez votre fichier actuel', description: 'Envoyez votre liste Excel ou carnet papier. Yassine prépare l’import complet.' },
      { step: '2', title: 'Validez ensemble en visio', description: 'En 30 minutes, nous vérifions vos classes, vos matières et vos créneaux.' },
      { step: '3', title: 'Démarrez sereinement', description: 'Vos enseignants et familles reçoivent leurs accès et vous commencez immédiatement.' },
    ],
    faq: [
      {
        q: 'Combien de temps faut-il pour démarrer avec notre école ?',
        a: 'Comptez généralement 2 à 3 semaines entre l’envoi de vos fichiers et l’ouverture aux familles. Si vous démarrez en cours d’année, cela peut aller encore plus vite.',
      },
      {
        q: 'Nos professeurs ne sont pas tous à l’aise avec l’informatique, vont-ils y arriver ?',
        a: 'Oui, c’est le premier retour que nous recevons : l’interface mobile est tellement simple qu’aucun cours d’informatique n’est nécessaire. Un clic suffit pour pointer un élève.',
      },
    ],
    related: [
      { slug: 'fonctionnalites/presences', title: 'Présences & appel', category: 'Module', description: 'Pointage rapide sur téléphone le samedi matin.' },
      { slug: 'tarifs', title: 'Nos tarifs', category: 'Offre', description: 'Formules abordables adaptées aux associations.' },
    ],
  },

  // --- 10. Solutions : Grands Instituts & Réseaux
  {
    slug: 'solutions/instituts-reseaux',
    category: 'Solution',
    categoryHref: '/solutions',
    title: 'Gestion scolaire pour grands instituts et réseaux multi-sites',
    ogTitle: 'Gestion pour grands instituts & réseaux | SmartMadrassa',
    description: 'Pilotez plusieurs antennes ou établissements sous une même coupole : droits d’accès cloisonnés par site, consolidation des données et accompagnement dédié.',
    lead: 'Quand votre structure grandit, centraliser l’information devient indispensable. Bénéficiez d’une gouvernance multi-sites unifiée, robuste et souveraine.',
    badge: 'Multi-implantations',
    icon: 'shield',
    metrics: [
      { value: 'Multi-sites', label: 'Antennes étanches', sub: 'Chaque directeur gère son centre' },
      { value: 'Consolidation', label: 'Vue d’ensemble', sub: 'Statistiques globales pour le bureau' },
      { value: 'DPO / RGPD', label: 'Convention sur mesure', sub: 'Traitement des données formalisé' },
      { value: 'Support VIP', label: 'Ligne prioritaire', sub: 'Accompagnement direct par l’éditeur' },
    ],
    highlights: [
      {
        title: 'Cloisonnement strict par établissement',
        description: 'Chaque antenne dispose de ses propres enseignants, classes et élèves. Les directeurs locaux ne voient que leur périmètre, tandis que le siège supervise l’ensemble.',
        badge: 'Gouvernance',
        points: ['Rôles et permissions granulaires', 'Étanchéité des données entre centres', 'Agrégation des effectifs et indicateurs'],
      },
      {
        title: 'Hébergement souverain et sécurité maximale',
        description: 'Vos données restent hébergées sur le territoire de l’Union européenne, dans le respect de la Loi belge du 30 juillet 2018 et des règlements RGPD les plus exigeants.',
        badge: 'Conformité',
        points: ['Zéro sous-traitant hors Union européenne', 'Purge atomique des données sur demande (Art. 17)', 'Chiffrement de bout en bout'],
      },
      {
        title: 'Accompagnement sur mesure et formation des équipes',
        description: 'Mise en place d’un plan d’intégration personnalisé, importation massive des historiques et sessions de formation pour vos responsables de sites.',
        badge: 'Partenariat',
        points: ['Directeur technique dédié (Yassine)', 'Interlocuteur unique sans intermédiaire', 'Possibilité de développements spécifiques'],
      },
    ],
    faq: [
      {
        q: 'Peut-on consolider les statistiques financières de toutes nos antennes ?',
        a: 'Oui, la direction générale dispose d’un tableau de bord de synthèse permettant de visualiser les effectifs globaux et le taux d’encaissement par antenne.',
      },
      {
        q: 'Proposez-vous une convention de sous-traitance des données (DPA) ?',
        a: 'Oui, une convention de traitement des données conforme à l’Article 28 du RGPD est signée entre votre structure et SmartMadrassa.',
      },
    ],
    related: [
      { slug: 'securite-rgpd', title: 'Sécurité & RGPD', category: 'Conformité', description: 'Consultez notre engagement de souveraineté et d’hébergement en Europe.' },
      { slug: 'contact', title: 'Prendre contact', category: 'Échange', description: 'Présentez votre réseau à Yassine pour un devis sur mesure.' },
    ],
  },

  // --- 11. Tarifs
  {
    slug: 'tarifs',
    category: 'Offre',
    title: 'Tarifs transparents, sans frais cachés ni commission',
    ogTitle: 'Tarifs clairs & transparents | SmartMadrassa',
    description: 'Formules claires adaptées à la taille de votre école. Tout inclus : formation, support direct avec Yassine, mises à jour et hébergement européen.',
    lead: 'Pas de facturation opaque par module ni de surcoût imprévu. Choisissez une formule simple avec un accompagnement humain direct.',
    badge: 'Sans engagement',
    icon: 'general',
    metrics: [
      { value: 'Tout inclus', label: 'Tous les modules', sub: 'Appel, bulletins, badges A4, reçu guichet' },
      { value: '0 €', label: 'Frais de mise en service', sub: 'Import de votre fichier offert' },
      { value: '0 %', label: 'Commission guichet', sub: 'Gardez 100% de vos cotisations' },
      { value: 'Direct', label: 'Support avec Yassine', sub: 'Le créateur répond personnellement' },
    ],
    highlights: [
      {
        title: 'Formule Découverte (Petites structures)',
        description: 'Idéale pour les écoles qui démarrent ou les associations comptant jusqu’à 50 élèves. Tous les modules sont actifs sans limitation.',
        badge: 'Démarrage',
        points: ['Jusqu’à 50 élèves inscrits', 'Tous les modules inclus', 'Support par e-mail direct'],
      },
      {
        title: 'Formule École (Structures établies)',
        description: 'La formule la plus populaire pour les écoles associatives de 50 à 300 élèves. Accompagnement complet et reprise de vos données.',
        badge: 'Populaire',
        points: ['Effectifs jusqu’à 300 élèves', 'Import de votre historique Excel offert', 'Support prioritaire par e-mail et visio'],
      },
      {
        title: 'Formule Réseau (Multi-établissements)',
        description: 'Pour les fédérations, réseaux associatifs et grands instituts disposant de plusieurs antennes sous une direction commune.',
        badge: 'Sur mesure',
        points: ['Nombre d’élèves illimité', 'Établissements et antennes multiples', 'Convention DPA personnalisée'],
      },
    ],
    faq: [
      {
        q: 'Peut-on tester la plateforme avant de s’engager ?',
        a: 'Oui, nous vous proposons une démonstration personnalisée de 30 minutes avec vos propres cas d’usage, suivie d’un accès d’essai pour manipuler l’outil en toute liberté.',
      },
      {
        q: 'Y a-t-il des frais d’installation ou de résiliation ?',
        a: 'Aucun. L’installation et l’aide à l’importation de vos données sont offertes. Vous restez totalement libre de résilier à l’échéance annuelle.',
      },
    ],
    related: [
      { slug: 'fonctionnalites', title: 'Toutes les fonctionnalités', category: 'Plateforme', description: 'Découvrez ce qui est inclus dans votre abonnement.' },
      { slug: 'contact', title: 'Demander un devis', category: 'Contact', description: 'Obtenez une réponse personnalisée sous 48 heures.' },
    ],
  },

  // --- 12. Comparatif
  {
    slug: 'comparatif',
    category: 'Comparatif',
    title: 'Comparatif : SmartMadrassa face aux logiciels scolaires traditionnels',
    ogTitle: 'Comparatif logiciels de gestion scolaire | SmartMadrassa',
    description: 'Tableau comparatif détaillé sur 14 critères : badges hors-ligne, données de santé Art. 9, encaissement au guichet, multilinguisme et hébergement souverain.',
    lead: 'Pourquoi les logiciels scolaires généralistes échouent-ils souvent dans les écoles associatives ? Analyse comparative point par point.',
    badge: '14 critères passés au crible',
    icon: 'shield',
    metrics: [
      { value: '14 / 14', label: 'Critères couverts', sub: 'Pensé pour vos réalités de terrain' },
      { value: 'FR · NL · AR', label: 'Trilingue complet', sub: 'Avec vrai arabe RTL' },
      { value: 'Guichet 0%', label: 'Paiements espèces', sub: 'Avec reçu A5 numéroté' },
      { value: 'Art. 9', label: 'Santé hermétique', sub: 'Conforme RGPD européen' },
    ],
    highlights: [
      {
        title: 'Pensé pour les écoles associatives, pas le collège public',
        description: 'Les logiciels classiques imposent une bureaucratie rigide (filières d’État, sigles obscurs). SmartMadrassa adopte une organisation claire par classe ou groupe de niveau adaptée au rythme du weekend.',
        badge: 'Métier',
        points: ['Classes et groupes par niveau', 'Gestion adaptée aux cours du weekend', 'Vocabulaire clair sans sigles administratifs obscurs'],
      },
      {
        title: 'Badges scolaires vectoriels A4 intégrés',
        description: 'La plupart des logiciels scolaires n’offrent aucun outil d’impression de badges ou renvoient vers des prestataires tiers payants.',
        badge: 'Innovation',
        points: ['Planche A4 de 8 badges prête à massicoter', 'Génération 100% locale sans fuite de données', 'Format carte bancaire standard ISO 7810'],
      },
      {
        title: 'Encaissement guichet à 0% de commission',
        description: 'Alors que les solutions du marché imposent Stripe ou HelloAsso avec prélèvement sur chaque versement, nous valorisons l’encaissement direct à 0% de frais.',
        badge: 'Économique',
        points: ['Zéro prélèvement bancaire intermédiaire', 'Reçu officiel A5 Paysage immédiat', 'Gestion des paiements partiels et du cash'],
      },
    ],
    comparison: {
      beforeTitle: 'Logiciel scolaire généraliste',
      beforeItems: [
        'Conçu pour le secondaire public à plein temps (Pronote, etc.)',
        'Aucune gestion des encaissements en espèces au guichet',
        'Pas de génération de badges scolaires A4 en local',
        'Interface souvent en français uniquement, sans arabe ni néerlandais',
      ],
      afterTitle: 'SmartMadrassa',
      afterItems: [
        'Conçu spécifiquement pour les écoles du weekend et instituts de langue',
        'Gestion complète du guichet (espèces/virement) avec reçus A5 officiels',
        'Badges A4 vectoriels avec QR code générés 100% hors-ligne dans le navigateur',
        'Trilingue natif Français, Néerlandais et Arabe avec mise en page RTL',
      ],
    },
    faq: [
      {
        q: 'Pourquoi avoir développé un nouvel outil plutôt que d’utiliser un logiciel existant ?',
        a: 'Parce que les directeurs d’écoles associatives nous ont répété la même chose : les outils existants sont soit trop lourds et inadaptés (Pronote), soit des usines à gaz coûteuses sans prise en charge des réalités du weekend.',
      },
    ],
    related: [
      { slug: 'comparatif/logiciels-generiques', title: 'Alternative aux outils généralistes', category: 'Analyse', description: 'Pourquoi les solutions du secondaire public ne collent pas aux madrassas.' },
      { slug: 'fonctionnalites', title: 'Découvrir nos modules', category: 'Plateforme', description: 'Explorez nos outils spécialisés.' },
    ],
  },

  // --- 13. Comparatif : Logiciels Généralistes (Pronote...)
  {
    slug: 'comparatif/logiciels-generiques',
    category: 'Comparatif',
    categoryHref: '/comparatif',
    title: 'Pourquoi les logiciels du secondaire public ne conviennent pas aux écoles associatives',
    ogTitle: 'Pourquoi les logiciels classiques échouent en école associative | SmartMadrassa',
    description: 'Les outils comme Pronote ont été créés pour des collèges et lycées publics à temps plein. Découvrez pourquoi SmartMadrassa est pensé pour vos réalités.',
    lead: 'Modèle rigide d’une seule classe par élève, absence de gestion des cotisations guichet, pas d’arabe ni de badges A4 : les raisons de choisir un outil dédié.',
    badge: 'Analyse terrain',
    icon: 'shield',
    metrics: [
      { value: '5 bloquages', label: 'Majeurs constatés', sub: 'Sur les logiciels généralistes' },
      { value: '100 %', label: 'Adapté au weekend', sub: 'Gestion souple des plannings' },
      { value: 'Fratrie', label: 'Espace unifié', sub: 'Tous les enfants sur 1 écran' },
      { value: 'Indépendant', label: 'Éditeur dédié', sub: 'Yassine vous accompagne personnellement' },
    ],
    highlights: [
      {
        title: '1. La lourdeur administrative des logiciels d’État',
        description: 'Les outils du secondaire public imposent des nomenclatures nationales complexes, des options et des semestres rigides. En école associative, chaque élève est rattaché simplement à sa classe ou son groupe de niveau, sans complexité inutile.',
        badge: 'Simplicité',
        points: ['Rattachement direct élève-classe', 'Matières et coefficients 100% libres', 'Évaluation chiffrée ou par émojis (maternelle)'],
      },
      {
        title: '2. L’absence totale de gestion financière de guichet',
        description: 'Les collèges publics n’encaissent pas de cotisations associatives au guichet. Leurs logiciels ne prévoient ni reçus officiels A5, ni suivi des espèces, ni paiements échelonnés.',
        badge: 'Comptabilité',
        points: ['Reçus officiels instantanés', 'Suivi des impayés sans tableur à part', 'Zéro commission bancaire'],
      },
      {
        title: '3. Pas de prise en compte de la langue arabe',
        description: 'Les logiciels classiques ne supportent pas l’affichage de droite à gauche (RTL) ni les typographies arabes élégantes, compliquant la communication avec les familles.',
        badge: 'Langues',
        points: ['Typographie Cairo auto-hébergée', 'Sens de lecture respecté', 'Trilingue Français / Néerlandais / Arabe'],
      },
    ],
    faq: [
      {
        q: 'Peut-on facilement importer des données depuis un autre logiciel ?',
        a: 'Oui. Quel que soit votre outil précédent, vous nous fournissez un export (Excel ou CSV) et nous prenons en charge la mise en forme et l’importation de vos données sans interruption.',
      },
    ],
    related: [
      { slug: 'comparatif', title: 'Tableau comparatif complet', category: 'Comparatif', description: 'Tous les critères analysés en détail.' },
      { slug: 'solutions/ecoles-associatives', title: 'Solution école associative', category: 'Solution', description: 'Nos atouts pour les structures du weekend.' },
    ],
  },

  // --- 14. Sécurité & RGPD
  {
    slug: 'securite-rgpd',
    category: 'Sécurité & Souveraineté',
    title: 'Souveraineté des données, Loi belge du 30 juillet 2018 et RGPD',
    ogTitle: 'Sécurité souveraine & conformité RGPD belge | SmartMadrassa',
    description: 'Hébergement exclusif dans l’Union européenne, isolation des données de santé Art. 9, droit à l’effacement Art. 17 et zéro traceur tiers.',
    lead: 'La confiance des familles commence par la sécurité de leurs enfants. SmartMadrassa applique les standards de protection les plus stricts d’Europe.',
    badge: 'Hébergement 100% UE',
    icon: 'shield',
    metrics: [
      { value: 'Union européenne', label: 'Hébergement exclusif', sub: 'Datacenters situés dans l’UE' },
      { value: 'Art. 17', label: 'Droit à l’oubli', sub: 'Purge atomique en un clic' },
      { value: '0 traceur', label: 'Zéro cookie publicitaire', sub: 'Pas de monétisation de vos données' },
      { value: 'APD / GBA', label: 'Conforme droit belge', sub: 'Loi du 30 juillet 2018 appliquée' },
    ],
    highlights: [
      {
        title: 'Données hébergées exclusivement en Europe',
        description: 'Vos données scolaires et familiales sont stockées sur des serveurs sécurisés situés au sein de l’Union européenne, garantissant l’immunité contre les législations extraterritoriales.',
        badge: 'Souveraineté',
        points: ['Aucun transfert de données vers des pays tiers', 'Chiffrement au repos et en transit (TLS 1.3)', 'Sauvegardes automatiques quotidiennes redondées'],
      },
      {
        title: 'Droit à l’effacement en un clic (Art. 17 RGPD)',
        description: 'Lorsqu’une famille ou un membre quitte définitivement l’école, sa demande de suppression est traitée de manière atomique : profil, notes, présences et historique sont détruits sans résidu.',
        badge: 'Droit à l’oubli',
        points: ['Validation motivée par la direction de l’école', 'Purge complète en cascade dans toutes les collections', 'Audit trail sécurisé pour l’administration'],
      },
      {
        title: 'Aucun cookie publicitaire, aucun traceur tiers',
        description: 'SmartMadrassa ne revend aucune donnée et ne dépose aucun traceur commercial. Les données de vos enfants restent la propriété exclusive de votre école.',
        badge: 'Éthique',
        points: ['Zéro profilage comportemental', 'Aucun pixel publicitaire (Facebook, TikTok...)', 'Respect total de la tranquillité des élèves'],
      },
    ],
    faq: [
      {
        q: 'Qui est propriétaire des données de notre école ?',
        a: 'Votre école reste la seule et unique propriétaire de l’ensemble de ses données. Vous pouvez exporter l’intégralité de vos fichiers (élèves, notes, présences) à tout moment en Excel et PDF.',
      },
      {
        q: 'Que se passe-t-il si nous décidons d’arrêter l’abonnement ?',
        a: 'Vous téléchargez l’intégralité de vos archives scolaires et comptables, puis vos données sont supprimées de façon irréversible de nos serveurs selon la procédure Art. 17.',
      },
    ],
    related: [
      { slug: 'fonctionnalites/sante-urgence', title: 'Fiches santé Art. 9', category: 'Sécurité', description: 'Découvrez comment les données médicales sont isolées.' },
      { slug: 'confidentialite', title: 'Politique de confidentialité', category: 'Légal', description: 'Consultez les détails légaux de notre politique RGPD.' },
    ],
  },

  // --- 15. Guides Hub
  {
    slug: 'guides',
    category: 'Ressources',
    title: 'Guides pratiques & conseils pour la gestion d’école associative',
    ogTitle: 'Guides pratiques pour directeurs d’écoles | SmartMadrassa',
    description: 'Retrouvez nos guides méthodologiques pour choisir votre logiciel, organiser votre rentrée scolaire et améliorer l’assiduité des élèves.',
    lead: 'Des conseils concrets issus du terrain pour aider les directeurs, trésoriers et enseignants d’écoles du weekend à gagner en sérénité.',
    badge: 'Conseils terrain',
    icon: 'general',
    metrics: [
      { value: '3', label: 'Guides thématiques', sub: 'Rentrée, choix logiciel et présences' },
      { value: '100 %', label: 'Gratuit & accessible', sub: 'Partage d’expérience pour les associations' },
      { value: 'Concret', label: 'Zéro théorie inutile', sub: 'Conseils immédiatement applicables' },
      { value: 'Belgique', label: 'Contexte ASBL', sub: 'Adapté aux réalités associatives locales' },
    ],
    highlights: [
      {
        title: 'Guide : Choisir son logiciel de gestion',
        description: 'Les 7 questions indispensables à poser avant de choisir une solution pour votre école : budget, RGPD, mobile et facilité d’utilisation.',
        badge: 'Méthodologie',
        points: ['Grille d’évaluation comparative', 'Les pièges des faux tarifs attractifs', 'Vérifier l’ergonomie mobile des profs'],
      },
      {
        title: 'Guide : Réussir sa rentrée scolaire associative',
        description: 'Le calendrier pas à pas de juin à octobre : inscriptions, constitution des classes, encaissement des cotisations et premier jour de classe.',
        badge: 'Organisation',
        points: ['Rétroplanning chronologique', 'Gestion des listes d’attente', 'Communication rassurante avec les parents'],
      },
      {
        title: 'Guide : Gestion des présences et assiduité',
        description: 'Comment réduire le taux d’absentéisme du weekend et instaurer un rituel d’appel rapide, valorisant et responsabilisant pour les familles.',
        badge: 'Pédagogie',
        points: ['Pourquoi les retards s’accumulent le dimanche', 'Le rituel de pointage en 30 secondes', 'Communiquer sans braquer les parents'],
      },
    ],
    faq: [
      {
        q: 'Peut-on partager ces guides avec notre conseil d’administration ?',
        a: 'Oui, ces ressources sont mises à disposition librement pour aider les conseils d’administration associatifs à structurer leur rentrée.',
      },
    ],
    related: [
      { slug: 'guides/choisir-logiciel-ecole', title: 'Choisir son logiciel', category: 'Guide', description: 'Les 7 critères pour faire le bon choix.' },
      { slug: 'guides/reussir-sa-rentree', title: 'Réussir sa rentrée', category: 'Guide', description: 'Le rétroplanning complet de rentrée.' },
      { slug: 'guides/gestion-presences', title: 'Gestion des présences', category: 'Guide', description: 'Méthode pour booster l’assiduité des élèves.' },
    ],
  },

  // --- 16. Guide : Choisir son logiciel
  {
    slug: 'guides/choisir-logiciel-ecole',
    category: 'Guide pratique',
    categoryHref: '/guides',
    title: 'Comment bien choisir un logiciel de gestion pour école associative',
    ogTitle: 'Comment choisir son logiciel de gestion scolaire | SmartMadrassa',
    description: 'Les 7 critères indispensables avant de vous engager : ergonomie mobile, gestion financière, respect du RGPD pour les mineurs et support technique.',
    lead: 'Choisir le bon outil est une décision engageante pour toute votre équipe. Voici les 7 questions indispensables à poser avant de trancher.',
    badge: 'Guide de décision',
    icon: 'general',
    metrics: [
      { value: '7', label: 'Points de contrôle', sub: 'Pour éviter les mauvaises surprises' },
      { value: 'Mobile', label: 'Priorité n°1', sub: 'L’outil doit marcher sur le téléphone des profs' },
      { value: '0 %', label: 'Commission guichet', sub: 'Ne laissez pas une plateforme ponctionner vos dons' },
      { value: 'Support', label: 'L’humain d’abord', sub: 'Pouvoir joindre quelqu’un en cas de pépin' },
    ],
    highlights: [
      {
        title: '1. L’ergonomie sur smartphone pour les enseignants',
        description: 'Si l’enseignant doit allumer un vieil ordinateur portable pour faire l’appel, il continuera sur papier. Le pointage doit se faire au doigt en 30 secondes.',
        badge: 'Critère n°1',
        points: ['Aucune installation obligatoire', 'Clavier virtuel rapide', 'Accessible même avec un réseau faible'],
      },
      {
        title: '2. La clarté du modèle économique',
        description: 'Méfiez-vous des logiciels gratuits qui se rémunèrent en prélevant des commissions sur vos cotisations ou en affichant des publicités aux familles.',
        badge: 'Budget',
        points: ['Tarif forfaitaire ou par élève prévisible', 'Zéro commission cachée sur les cotisations guichet', 'Formation et support inclus'],
      },
      {
        title: '3. La protection des données d’enfants mineurs',
        description: 'Vérifiez où sont situées les données. Pour une école en Europe, les serveurs doivent impérativement résider sur le territoire de l’UE.',
        badge: 'RGPD',
        points: ['Hébergement dans l’Union européenne', 'Isolation des fiches de santé Art. 9', 'Droit à l’effacement effectif'],
      },
    ],
    workflow: [
      { step: '1', title: 'Listez vos 3 priorités', description: 'Généralement : appel rapide, bulletins clairs et suivi des cotisations.' },
      { step: '2', title: 'Demandez une démo réelle', description: 'Faites tester l’outil par un enseignant et votre trésorier en situation.' },
      { step: '3', title: 'Validez la reprise des données', description: 'Assurez-vous que l’éditeur vous aide gratuitement à importer vos listes existantes.' },
    ],
    faq: [
      {
        q: 'Combien coûte un bon logiciel de gestion scolaire associative ?',
        a: 'Le budget annuel moyen varie généralement de 39 € à 79 € par mois selon la taille de votre école, sans commission sur vos cotisations.',
      },
    ],
    related: [
      { slug: 'comparatif', title: 'Comparatif des logiciels', category: 'Comparatif', description: 'Voyez comment SmartMadrassa se positionne.' },
      { slug: 'tarifs', title: 'Nos tarifs transparents', category: 'Offre', description: 'Toutes nos formules détaillées.' },
    ],
  },

  // --- 17. Guide : Réussir sa rentrée
  {
    slug: 'guides/reussir-sa-rentree',
    category: 'Guide pratique',
    categoryHref: '/guides',
    title: 'Le rétroplanning complet pour réussir la rentrée de votre école associative',
    ogTitle: 'Rétroplanning pour réussir sa rentrée scolaire | SmartMadrassa',
    description: 'De la clôture des inscriptions en juin jusqu’aux premiers bulletins en décembre : étapes clés, gestion des listes d’attente et communication familles.',
    lead: 'La rentrée scolaire associative se prépare plusieurs semaines à l’avance pour éviter la cohue des premiers samedis. Suivez notre méthode étape par étape.',
    badge: 'Méthode pas à pas',
    icon: 'general',
    metrics: [
      { value: 'Juin', label: 'Pré-inscriptions', sub: 'Sonder les réinscriptions des anciens' },
      { value: 'Août', label: 'Classes & plannings', sub: 'Équilibrer les niveaux et salles' },
      { value: 'Septembre', label: 'Accueil & cotisations', sub: 'Distribuer les badges et reçus' },
      { value: 'Octobre', label: 'Vitesse de croisière', sub: 'Premiers bilans de présence' },
    ],
    highlights: [
      {
        title: 'Phase 1 : Anticipation en fin d’année (Juin à juillet)',
        description: 'Faites réinscrire les anciens élèves avant les vacances d’été pour connaître précisément le nombre de places restantes pour les nouveaux inscrits.',
        badge: 'Anticipation',
        points: ['Formulaire d’intention de réinscription', 'Recensement des souhaits de fratries', 'Estimation prévisionnelle des classes nécessaires'],
      },
      {
        title: 'Phase 2 : Configuration et badges (Août)',
        description: 'Répartissez les élèves dans les classes, préparez les listes et générez à l’avance les planches de badges scolaires A4 prêts à découper.',
        badge: 'Préparation',
        points: ['Équilibrage des effectifs par salle', 'Impression des badges A4 avec repères', 'Importation des fiches santé et PAI'],
      },
      {
        title: 'Phase 3 : Accueil et encaissement serein (Septembre)',
        description: 'Le jour J, les parents règlent leur cotisation au guichet en 10 secondes et repartent avec leur reçu A5 officiel et le badge de l’enfant.',
        badge: 'Jour J',
        points: ['Accueil chaleureux sans file d’attente interminable', 'Encaissement clair et reçu instantané', 'Premier appel fait en 30 secondes en classe'],
      },
    ],
    faq: [
      {
        q: 'Comment gérer les retardataires qui arrivent en octobre ?',
        a: 'SmartMadrassa permet d’ajouter un nouvel élève en quelques clics en cours d’année, de lui imprimer son badge individuel immédiatement et de recalculer son tarif proratisé.',
      },
    ],
    related: [
      { slug: 'fonctionnalites/badges-scolaires', title: 'Badges scolaires A4', category: 'Module', description: 'Préparez vos cartes élèves pour le premier jour.' },
      { slug: 'fonctionnalites/paiements-recus', title: 'Cotisations guichet', category: 'Module', description: 'Encaissez sans stress les jours de rentrée.' },
    ],
  },

  // --- 18. Guide : Gestion des Présences
  {
    slug: 'guides/gestion-presences',
    category: 'Guide pratique',
    categoryHref: '/guides',
    title: 'Comment réduire l’absentéisme et optimiser le suivi des présences',
    ogTitle: 'Guide : Réduire l’absentéisme en école du weekend | SmartMadrassa',
    description: 'Bonnes pratiques pour responsabiliser les familles, gérer les retards du weekend et instaurer un rituel d’appel rapide et positif.',
    lead: 'Dans les cours du weekend, l’assiduité est le nerf de la guerre. Découvrez comment un suivi régulier et transparent responsabilise les élèves et rassure les parents.',
    badge: 'Assiduité & Rythme',
    icon: 'attendance',
    metrics: [
      { value: '-40 %', label: 'D’absences injustifiées', sub: 'Constaté avec notification le jour même' },
      { value: '30 s', label: 'Rituel d’appel', sub: 'Pour commencer le cours dans le calme' },
      { value: '1 clic', label: 'Information parent', sub: 'Le parent prévenu immédiatement' },
      { value: '100 %', label: 'Assiduité sur bulletin', sub: 'Bilan clair en fin de trimestre' },
    ],
    highlights: [
      {
        title: 'Le rituel d’appel : donner le ton dès la première minute',
        description: 'Faire l’appel ne doit pas être une corvée administrative de fin d’heure. C’est le moment où l’enseignant salue chaque élève et installe le calme.',
        badge: 'Pédagogie',
        points: ['Pointage au début du cours en 30 secondes', 'L’enseignant regarde les élèves, pas une feuille', 'Effet positif immédiat sur l’écoute'],
      },
      {
        title: 'La notification rapide : le secret anti-décrochage',
        description: 'Quand un parent n’est prévenu d’une absence que trois semaines plus tard, il est trop tard pour agir. Le jour même, la réaction est immédiate et bienveillante.',
        badge: 'Réactivité',
        points: ['Alerte le jour même du cours', 'Dialogue constructif avec la famille', 'Évite l’accumulation de retards chroniques'],
      },
      {
        title: 'Distinguer les absences excusées et non justifiées',
        description: 'Les imprévus familiaux et les maladies arrivent. Noter le motif exact permet de valoriser les efforts de l’enfant sans le pénaliser arbitrairement.',
        badge: 'Justesse',
        points: ['Motifs clairs consignés dans le dossier', 'Neutralisation ABS sur les contrôles manqués', 'Synthèse honnête sur le bulletin trimestriel'],
      },
    ],
    faq: [
      {
        q: 'Que faire face à un élève régulièrement en retard de 15 minutes ?',
        a: 'En cochant le statut "Retard" avec le nombre de minutes, le cumul apparaît clairement sur l’espace parent et le bulletin. Cela permet un échange factuel et calme avec les responsables.',
      },
    ],
    related: [
      { slug: 'fonctionnalites/presences', title: 'Module Présences', category: 'Fonctionnalité', description: 'Découvrez notre outil d’appel en 30 secondes.' },
      { slug: 'fonctionnalites/application-parents', title: 'Application parents', category: 'Familles', description: 'Comment les familles suivent l’assiduité.' },
    ],
  },

  // --- 19. Contact & Démo
  {
    slug: 'contact',
    category: 'Contact',
    title: 'Demandez une démonstration personnalisée de SmartMadrassa',
    ogTitle: 'Contact & Démo personnalisée de 30 min | SmartMadrassa',
    description: 'Échangez directement avec Yassine E., créateur de SmartMadrassa. 30 minutes de découverte sur mesure avec vos propres données.',
    lead: 'Découvrez la plateforme en situation réelle, posez toutes vos questions et recevez une proposition claire et adaptée à votre école sous 48 heures.',
    badge: 'Échange direct avec Yassine',
    icon: 'general',
    metrics: [
      { value: '30 min', label: 'En visioconférence', sub: 'Démonstration personnalisée' },
      { value: '48 h', label: 'Pour vous répondre', sub: 'Réponse personnelle garantie' },
      { value: '0 €', label: 'Sans engagement', sub: 'Ni carte bancaire demandée' },
      { value: 'Belgique', label: 'Proximité locale', sub: 'Éditeur basé en Belgique' },
    ],
    highlights: [
      {
        title: 'Un échange humain, pas un discours commercial',
        description: 'Vous échangez directement avec la personne qui conçoit et développe la plateforme. Pas d’intermédiaire ni de télévendeur.',
        badge: 'Proximité',
        points: ['Compréhension immédiate de vos contraintes', 'Conseils pratiques sur l’organisation de vos cours', 'Réponses techniques transparentes'],
      },
      {
        title: 'Démonstration sur vos cas d’usage réels',
        description: 'Vous nous expliquez comment votre école fonctionne (créneaux, cotisations, matières) et nous vous montrons exactement comment la plateforme y répond.',
        badge: 'Concret',
        points: ['Simulation de votre appel de classe', 'Aperçu de vos bulletins avec vos matières', 'Exemple de vos badges A4 prêts à découper'],
      },
      {
        title: 'Reprise de vos données existantes offerte',
        description: 'Vous avez déjà des tableurs Excel ou des carnets papier ? Nous nous chargeons de la mise en forme et de l’importation de vos élèves sans surcoût.',
        badge: 'Tranquillité',
        points: ['Zéro saisie manuelle fastidieuse pour vous', 'Contrôle anti-doublon rigoureux', 'Validation conjointe avant ouverture aux familles'],
      },
    ],
    faq: [
      {
        q: 'Comment se passe la démonstration ?',
        a: 'Nous convenons d’un créneau de 30 minutes en visio (Google Meet ou Zoom). Vous découvrez l’outil sur grand écran et posez toutes vos questions.',
      },
      {
        q: 'Peut-on inviter plusieurs membres de notre conseil d’administration ?',
        a: 'Oui, c’est même vivement recommandé. Le directeur, le trésorier et un enseignant peuvent assister ensemble à l’échange.',
      },
    ],
    related: [
      { slug: 'tarifs', title: 'Consulter nos tarifs', category: 'Offre', description: 'Des prix clairs sans mauvaise surprise.' },
      { slug: 'fonctionnalites', title: 'Panorama des modules', category: 'Plateforme', description: 'Tout ce que SmartMadrassa fait pour vous.' },
    ],
  },
];
