import { useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SITE } from '../content/site';
import { Aurora } from '../components/ui/primitives';

const UPDATED = '16 septembre 2026';

function LegalLayout({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${title} — ${SITE.name}`;
    return () => {
      document.title = `${SITE.name} — La plateforme de gestion pour écoles associatives et instituts`;
    };
  }, [title]);

  return (
    <main className="relative pb-24 pt-32 sm:pt-40">
      <Aurora variant="soft" />
      <div className="container-x relative z-10 max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-contrast"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à l’accueil
        </Link>

        <h1 className="mt-8 text-balance font-display text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-pretty leading-relaxed text-slate-400">{intro}</p>
        <p className="mt-3 text-xs text-slate-600">Dernière mise à jour : {UPDATED}</p>

        <div className="mt-12 space-y-10">{children}</div>

        <div className="mt-16 rounded-2xl border border-contrast/[0.07] bg-contrast/[0.015] p-6">
          <p className="text-sm leading-relaxed text-slate-400">
            Une question sur ce document ? Écrivez-moi à{' '}
            <a href={`mailto:${SITE.email}`} className="text-accent underline underline-offset-2">
              {SITE.email}
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}

function Article({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-lg font-semibold text-contrast sm:text-xl">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-400 [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-slate-200">
        {children}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function MentionsLegales() {
  return (
    <LegalLayout
      title="Mentions légales"
      intro={`Informations relatives à l’éditeur et à l’hébergement du site ${SITE.domain}.`}
    >
      <Article title="1. Éditeur du site">
        <p>
          Le site <strong>{SITE.domain}</strong> et la plateforme {SITE.name} sont édités par{' '}
          <strong>Yassine E.</strong>, créateur et éditeur indépendant établi en Belgique.
          SmartMadrassa est un projet personnel, conçu et développé en solo.
        </p>
        <ul className="space-y-1">
          <li>
            Contact : <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </li>
          <li>Directeur de la publication : Yassine E.</li>
        </ul>
      </Article>

      <Article title="2. Hébergement">
        <p>
          Le site vitrine est hébergé par <strong>OVH SAS</strong>, 2 rue Kellermann, 59100 Roubaix,
          France — <a href="https://www.ovhcloud.com">ovhcloud.com</a>.
        </p>
        <p>
          Les données de la plateforme applicative sont hébergées sur une infrastructure cloud
          sécurisée située dans l’Union européenne.
        </p>
      </Article>

      <Article title="3. Propriété intellectuelle">
        <p>
          L’ensemble des éléments du site — textes, interface, code, identité visuelle — est protégé
          par le droit d’auteur. Toute reproduction ou représentation, totale ou partielle, sans
          autorisation écrite préalable est interdite.
        </p>
        <p>
          Les noms d’écoles, données d’élèves et captures d’interface présentés sur ce site sont des
          exemples fictifs créés à des fins d’illustration.
        </p>
      </Article>

      <Article title="4. Responsabilité">
        <p>
          Les informations publiées sur ce site sont fournies à titre indicatif et peuvent évoluer.
          L’éditeur met tout en œuvre pour en assurer l’exactitude, sans pouvoir garantir l’absence
          totale d’erreur ou d’omission.
        </p>
      </Article>

      <Article title="5. Liens externes">
        <p>
          Ce site peut renvoyer vers des sites tiers. L’éditeur n’exerce aucun contrôle sur leur
          contenu et décline toute responsabilité à leur égard.
        </p>
      </Article>

      <Article title="6. Droit applicable">
        <p>
          Le présent site est soumis au droit belge. Tout litige relève de la compétence exclusive
          des tribunaux belges.
        </p>
      </Article>
    </LegalLayout>
  );
}

/* ------------------------------------------------------------------ */

export function Confidentialite() {
  return (
    <LegalLayout
      title="Politique de confidentialité"
      intro="Comment les données transmises via ce site vitrine sont traitées, et où trouver les informations relatives à la plateforme applicative."
    >
      <Article title="1. Responsable du traitement">
        <p>
          Pour les données collectées via ce site vitrine, le responsable du traitement est{' '}
          <strong>Yassine E.</strong>, éditeur indépendant de {SITE.name}, joignable à l’adresse{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
        <p>
          Pour les données traitées <strong>à l’intérieur de la plateforme</strong> (élèves, parents,
          notes, présences), l’école cliente est responsable du traitement et {SITE.name} intervient
          comme sous-traitant, dans le cadre d’une convention conforme à l’article 28 du RGPD.
        </p>
      </Article>

      <Article title="2. Données collectées par ce site">
        <ul className="space-y-1">
          <li>
            <strong>Formulaire de contact</strong> : nom, nom de la structure, e-mail, téléphone
            (facultatif), nombre d’élèves (facultatif), sujet et contenu du message. L’adresse IP et
            l’heure de l’envoi sont également utilisées pour limiter les abus et jointes au message.
          </li>
          <li>
            <strong>Journaux techniques de l’hébergeur</strong> : adresse IP, date et heure d’accès,
            pages consultées, conservés par OVH à des fins de sécurité.
          </li>
        </ul>
        <p>
          Ce site n’utilise <strong>aucun cookie publicitaire, aucun traceur tiers et aucun outil de
          mesure d’audience externe</strong>. Les polices de caractères sont hébergées directement
          sur le site : aucune requête n’est adressée à un service tiers lors de votre visite.
        </p>
      </Article>

      <Article title="3. Finalités et bases légales">
        <ul className="space-y-1">
          <li>
            Répondre à votre demande de contact ou de démonstration — base légale : mesures
            précontractuelles prises à votre demande (art. 6.1.b RGPD).
          </li>
          <li>
            Assurer la sécurité et le bon fonctionnement du site — base légale : intérêt légitime
            (art. 6.1.f RGPD).
          </li>
        </ul>
      </Article>

      <Article title="4. Durée de conservation">
        <ul className="space-y-1">
          <li>Demandes de contact sans suite : 12 mois à compter du dernier échange.</li>
          <li>Demandes ayant abouti à une relation contractuelle : durée du contrat, puis 10 ans au titre des obligations comptables.</li>
          <li>Journaux techniques de l’hébergeur : 12 mois maximum.</li>
        </ul>
      </Article>

      <Article title="5. Destinataires">
        <p>
          Les données transmises via le formulaire sont adressées à l’éditeur sur{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Elles ne
          sont ni vendues, ni louées, ni transmises à des fins publicitaires. Les seuls tiers
          susceptibles d’y accéder techniquement sont l’hébergeur du site et le fournisseur de
          messagerie, tous deux établis dans l’Union européenne.
        </p>
      </Article>

      <Article title="6. Transferts hors Union européenne">
        <p>Aucun transfert de données hors de l’Union européenne n’est réalisé depuis ce site.</p>
      </Article>

      <Article title="7. Vos droits">
        <p>
          Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation,
          d’opposition et de portabilité. Pour les exercer, écrivez à{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Une réponse vous parviendra dans un délai
          d’un mois.
        </p>
        <p>
          Vous pouvez également introduire une réclamation auprès de l’
          <strong>Autorité de protection des données</strong> (APD / GBA), Rue de la Presse 35, 1000
          Bruxelles —{' '}
          <a href="https://www.autoriteprotectiondonnees.be" target="_blank" rel="noreferrer noopener">
            autoriteprotectiondonnees.be
          </a>
          .
        </p>
      </Article>

      <Article title="8. Cookies et préférences d’affichage">
        <p id="cookies">
          Ce site ne dépose <strong>aucun cookie</strong> autre que ceux strictement nécessaires à
          son affichage. Aucune bannière de consentement n’est donc requise. Si des cookies de mesure
          d’audience venaient à être ajoutés, un mécanisme de consentement préalable serait mis en
          place.
        </p>
      </Article>

      <Article title="9. Préférence de thème">
        <p>
          Votre choix de thème clair ou sombre est mémorisé dans votre navigateur. Cette préférence
          n’est pas transmise au serveur et peut être effacée en supprimant les données du site
          dans votre navigateur.
        </p>
      </Article>

      <Article title="10. Sécurité">
        <p>
          Le site est servi exclusivement en HTTPS. Les messages reçus via le formulaire sont
          transmis par une passerelle de messagerie européenne et conservés sur une boîte protégée
          par mot de passe fort.
        </p>
      </Article>
    </LegalLayout>
  );
}

/* ------------------------------------------------------------------ */

export function Conditions() {
  return (
    <LegalLayout
      title="Conditions d’utilisation du site"
      intro="Règles applicables à la consultation de ce site vitrine. Les conditions d’utilisation de la plateforme elle-même sont présentées lors de la création de votre espace école."
    >
      <Article title="1. Objet">
        <p>
          Les présentes conditions régissent l’accès et l’utilisation du site {SITE.domain}, qui a
          pour objet de présenter la plateforme {SITE.name} et de permettre une prise de contact.
        </p>
      </Article>

      <Article title="2. Accès au site">
        <p>
          Le site est accessible gratuitement. L’éditeur se réserve le droit d’en interrompre l’accès
          pour maintenance ou mise à jour, sans préavis ni indemnité.
        </p>
      </Article>

      <Article title="3. Usage du formulaire de contact">
        <p>
          Le formulaire est destiné aux demandes professionnelles relatives à la plateforme. Toute
          utilisation abusive — prospection non sollicitée, contenu illicite, envoi automatisé — peut
          entraîner le blocage de l’expéditeur.
        </p>
      </Article>

      <Article title="4. Informations commerciales">
        <p>
          Les tarifs, descriptifs et disponibilités présentés sur ce site sont donnés à titre
          indicatif et ne constituent pas une offre contractuelle. Seul un devis signé engage
          l’éditeur.
        </p>
      </Article>

      <Article title="5. Contrat de service">
        <p>
          L’utilisation de la plateforme {SITE.name} est régie par des conditions générales
          distinctes, acceptées lors de l’ouverture de l’espace école, complétées par une convention
          de sous-traitance des données personnelles.
        </p>
      </Article>

      <Article title="6. Droit applicable et juridiction">
        <p>
          Les présentes conditions sont soumises au droit belge. À défaut de résolution amiable, tout
          litige relève de la compétence exclusive des tribunaux belges.
        </p>
      </Article>
    </LegalLayout>
  );
}

/* ------------------------------------------------------------------ */

export function NotFound() {
  useEffect(() => {
    document.title = `Page introuvable — ${SITE.name}`;
  }, []);

  return (
    <main className="relative grid min-h-[70vh] place-items-center pt-32">
      <Aurora variant="soft" />
      <div className="container-x relative z-10 text-center">
        <p className="font-display text-7xl font-extrabold tracking-[-0.05em] text-gradient sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-bold sm:text-3xl">Cette page n’existe pas</h1>
        <p className="mx-auto mt-4 max-w-md text-slate-400">
          Le lien est peut-être obsolète. Revenez à l’accueil pour retrouver la présentation de la
          plateforme.
        </p>
        <Link
          to="/"
          className="button-primary mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à l’accueil
        </Link>
      </div>
    </main>
  );
}
