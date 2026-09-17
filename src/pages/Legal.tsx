import { t, localizedHref } from '../lib/i18n';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SITE } from '../content/site';
import { Aurora } from '../components/ui/primitives';

const UPDATED = t("16 septembre 2026");

function LegalLayout({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <main className="relative pb-24 pt-32 sm:pt-40">
      <Aurora variant="soft" />
      <div className="container-x relative z-10 max-w-3xl">
        <Link
          to={localizedHref('/')}
          className="inline-flex min-h-[2.5rem] items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-contrast"
        >
          <ArrowLeft className="icon-directional h-4 w-4" />{t("Retour à l’accueil")}</Link>

        <h1 className="mt-8 text-balance font-display text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-pretty leading-relaxed text-slate-400">{intro}</p>
        <p className="mt-3 text-xs text-slate-600">{t("Dernière mise à jour : ")}{UPDATED}</p>

        <div className="mt-12 space-y-10">{children}</div>

        <div className="mt-16 rounded-2xl border border-contrast/[0.07] bg-contrast/[0.015] p-6">
          <p className="text-sm leading-relaxed text-slate-400">{t("Une question sur ce document ? Écrivez-moi à")}{' '}
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
      title={t("Mentions légales")}
      intro={`${t('Informations relatives à l’éditeur et à l’hébergement du site')} ${SITE.domain}.`}
    >
      <Article title={t("1. Éditeur du site")}>
        <p>{t("Le site ")}<strong>{SITE.domain}</strong>{t(" et la plateforme ")}{SITE.name}{t(" sont édités par")}{' '}
          <strong>{t("Yassine E.")}</strong>{t(", créateur et éditeur indépendant établi en Belgique. SmartMadrassa est un projet personnel, conçu et développé en solo.")}</p>
        <ul className="space-y-1">
          <li>{t("Contact : ")}<a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </li>
          <li>{t("Directeur de la publication : Yassine E.")}</li>
        </ul>
      </Article>

      <Article title={t("2. Hébergement")}>
        <p>{t("Le site vitrine est hébergé par ")}<strong>{t("OVH SAS")}</strong>{t(", 2 rue Kellermann, 59100 Roubaix, France, ")}<a href="https://www.ovhcloud.com">ovhcloud.com</a>.
        </p>
        <p>{t("Les données de la plateforme applicative sont hébergées sur une infrastructure cloud sécurisée située dans l’Union européenne.")}</p>
      </Article>

      <Article title={t("3. Propriété intellectuelle")}>
        <p>{t("L’ensemble des éléments du site (textes, interface, code, identité visuelle) est protégé par le droit d’auteur. Toute reproduction ou représentation, totale ou partielle, sans autorisation écrite préalable est interdite.")}</p>
        <p>{t("Les noms d’écoles, données d’élèves et captures d’interface présentés sur ce site sont des exemples fictifs créés à des fins d’illustration.")}</p>
      </Article>

      <Article title={t("4. Responsabilité")}>
        <p>{t("Les informations publiées sur ce site sont fournies à titre indicatif et peuvent évoluer. L’éditeur met tout en œuvre pour en assurer l’exactitude, sans pouvoir garantir l’absence totale d’erreur ou d’omission.")}</p>
      </Article>

      <Article title={t("5. Liens externes")}>
        <p>{t("Ce site peut renvoyer vers des sites tiers. L’éditeur n’exerce aucun contrôle sur leur contenu et décline toute responsabilité à leur égard.")}</p>
      </Article>

      <Article title={t("6. Droit applicable")}>
        <p>{t("Le présent site est soumis au droit belge. Tout litige relève de la compétence exclusive des tribunaux belges.")}</p>
      </Article>
    </LegalLayout>
  );
}

/* ------------------------------------------------------------------ */

export function Confidentialite() {
  return (
    <LegalLayout
      title={t("Politique de confidentialité")}
      intro={t("Comment les données transmises via ce site vitrine sont traitées, et où trouver les informations relatives à la plateforme applicative.")}
    >
      <Article title={t("1. Responsable du traitement")}>
        <p>{t("Pour les données collectées via ce site vitrine, le responsable du traitement est")}{' '}
          <strong>{t("Yassine E.")}</strong>{t(", éditeur indépendant de ")}{SITE.name}{t(", joignable à l’adresse")}{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
        <p>{t("Pour les données traitées ")}<strong>{t("à l’intérieur de la plateforme")}</strong>{t(" (élèves, parents, notes, présences), l’école cliente est responsable du traitement et ")}{SITE.name}{t(" intervient comme sous-traitant, dans le cadre d’une convention conforme à l’article 28 du RGPD.")}</p>
      </Article>

      <Article title={t("2. Données collectées par ce site")}>
        <ul className="space-y-1">
          <li>
            <strong>{t("Formulaire de contact")}</strong>{t(" : nom, nom de la structure, e-mail, téléphone (facultatif), nombre d’élèves (facultatif), sujet et contenu du message. L’adresse IP et l’heure de l’envoi sont également utilisées pour limiter les abus et jointes au message.")}</li>
          <li>
            <strong>{t("Journaux techniques de l’hébergeur")}</strong>{t(" : adresse IP, date et heure d’accès, pages consultées, conservés par OVH à des fins de sécurité.")}</li>
          <li>
            <strong>{t("Mesure d’audience, uniquement si vous l’acceptez")}</strong>{t(" : pages consultées, provenance, pays, type d’appareil, via Google Analytics. Tant que vous n’avez pas accepté, aucun script de mesure n’est chargé et aucune donnée ne quitte votre navigateur.")}</li>
        </ul>
        <p>{t("Ce site n’utilise ")}<strong>{t("aucun cookie publicitaire et aucun traceur de réseau social")}</strong>{t(". Les polices de caractères sont hébergées directement sur le site : aucune requête n’est adressée à un service tiers lors de votre visite, mesure d’audience mise à part.")}</p>
      </Article>

      <Article title={t("3. Finalités et bases légales")}>
        <ul className="space-y-1">
          <li>{t("Répondre à votre demande de contact ou de démonstration. Base légale : mesures précontractuelles prises à votre demande (art. 6.1.b RGPD).")}</li>
          <li>{t("Assurer la sécurité et le bon fonctionnement du site. Base légale : intérêt légitime (art. 6.1.f RGPD).")}</li>
          <li>{t("Comprendre quelles pages intéressent les visiteurs, afin d’améliorer le site. Base légale : votre consentement (art. 6.1.a RGPD), que vous pouvez retirer à tout moment.")}</li>
        </ul>
      </Article>

      <Article title={t("4. Durée de conservation")}>
        <ul className="space-y-1">
          <li>{t("Demandes de contact sans suite : 12 mois à compter du dernier échange.")}</li>
          <li>{t("Demandes ayant abouti à une relation contractuelle : durée du contrat, puis 10 ans au titre des obligations comptables.")}</li>
          <li>{t("Journaux techniques de l’hébergeur : 12 mois maximum.")}</li>
          <li>{t("Mesure d’audience : 14 mois, durée la plus courte proposée par Google Analytics.")}</li>
        </ul>
      </Article>

      <Article title={t("5. Destinataires")}>
        <p>{t("Les données transmises via le formulaire sont adressées à l’éditeur sur")}{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>{t(". Elles ne sont ni vendues, ni louées, ni transmises à des fins publicitaires. Les seuls tiers susceptibles d’y accéder techniquement sont l’hébergeur du site et le fournisseur de messagerie, tous deux établis dans l’Union européenne.")}</p>
        <p>{t("Si vous avez accepté la mesure d’audience, les données de navigation correspondantes sont traitées par ")}<strong>{t("Google Ireland Limited")}</strong>{t(", agissant comme sous-traitant. Elles ne comportent ni votre nom ni votre adresse e-mail, et votre adresse IP est tronquée avant enregistrement. Les signaux publicitaires et la personnalisation des annonces sont désactivés.")}</p>
      </Article>

      <Article title={t("6. Transferts hors Union européenne")}>
        <p>{t("Le formulaire de contact et l’hébergement du site ne donnent lieu à aucun transfert hors de l’Union européenne.")}</p>
        <p>{t("La mesure d’audience, si vous l’acceptez, peut en revanche donner lieu à un transfert vers les États-Unis. Google LLC est certifié au titre du ")}<strong>{t("cadre de protection des données UE-États-Unis")}</strong>{t(", décision d’adéquation de la Commission européenne du 10 juillet 2023, et des clauses contractuelles types complètent ce cadre. Refuser la mesure d’audience suffit à écarter tout transfert.")}</p>
      </Article>

      <Article title={t("7. Vos droits")}>
        <p>{t("Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité. Pour les exercer, écrivez à")}{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>{t(". Une réponse vous parviendra dans un délai d’un mois.")}</p>
        <p>{t("Vous pouvez également introduire une réclamation auprès de l’")}<strong>{t("Autorité de protection des données")}</strong>{t(" (APD / GBA), Rue de la Presse 35, 1000 Bruxelles,")}{' '}
          <a href="https://www.autoriteprotectiondonnees.be" target="_blank" rel="noreferrer noopener">
            autoriteprotectiondonnees.be
          </a>
          .
        </p>
      </Article>

      <Article title={t("8. Cookies et préférences d’affichage")}>
        <p id="cookies">{t("À votre première visite, une bande vous demande si vous acceptez la mesure d’audience. Tant que vous n’avez pas répondu, et si vous refusez, ")}<strong>{t("aucun cookie n’est déposé")}</strong>{t(" et le script de Google n’est pas chargé. Refuser n’altère en rien le fonctionnement du site.")}</p>
        <p>{t("Si vous acceptez, Google Analytics dépose les cookies _ga et _ga_* pour distinguer les visites. Vous pouvez revenir sur votre choix à tout moment par le lien ")}<strong>{t("« Cookies de mesure d’audience »")}</strong>{t(" en bas de chaque page : refuser efface immédiatement les cookies déjà posés.")}</p>
      </Article>

      <Article title={t("9. Préférence de thème")}>
        <p>{t("Votre choix de thème clair ou sombre est mémorisé dans votre navigateur. Cette préférence n’est pas transmise au serveur et peut être effacée en supprimant les données du site dans votre navigateur.")}</p>
      </Article>

      <Article title={t("10. Sécurité")}>
        <p>{t("Le site est servi exclusivement en HTTPS. Les messages reçus via le formulaire sont transmis par une passerelle de messagerie européenne et conservés sur une boîte protégée par mot de passe fort.")}</p>
      </Article>
    </LegalLayout>
  );
}

/* ------------------------------------------------------------------ */

export function Conditions() {
  return (
    <LegalLayout
      title={t("Conditions d’utilisation du site")}
      intro={t("Règles applicables à la consultation de ce site vitrine. Les conditions d’utilisation de la plateforme elle-même sont présentées lors de la création de votre espace école.")}
    >
      <Article title={t("1. Objet")}>
        <p>{t("Les présentes conditions régissent l’accès et l’utilisation du site ")}{SITE.domain}{t(", qui a pour objet de présenter la plateforme ")}{SITE.name}{t(" et de permettre une prise de contact.")}</p>
      </Article>

      <Article title={t("2. Accès au site")}>
        <p>{t("Le site est accessible gratuitement. L’éditeur se réserve le droit d’en interrompre l’accès pour maintenance ou mise à jour, sans préavis ni indemnité.")}</p>
      </Article>

      <Article title={t("3. Usage du formulaire de contact")}>
        <p>{t("Le formulaire est destiné aux demandes professionnelles relatives à la plateforme. Toute utilisation abusive (prospection non sollicitée, contenu illicite, envoi automatisé) peut entraîner le blocage de l’expéditeur.")}</p>
      </Article>

      <Article title={t("4. Informations commerciales")}>
        <p>{t("Les tarifs, descriptifs et disponibilités présentés sur ce site sont donnés à titre indicatif et ne constituent pas une offre contractuelle. Seul un devis signé engage l’éditeur.")}</p>
      </Article>

      <Article title={t("5. Contrat de service")}>
        <p>{t("L’utilisation de la plateforme ")}{SITE.name}{t(" est régie par des conditions générales distinctes, acceptées lors de l’ouverture de l’espace école, complétées par une convention de sous-traitance des données personnelles.")}</p>
      </Article>

      <Article title={t("6. Droit applicable et juridiction")}>
        <p>{t("Les présentes conditions sont soumises au droit belge. À défaut de résolution amiable, tout litige relève de la compétence exclusive des tribunaux belges.")}</p>
      </Article>
    </LegalLayout>
  );
}

/* ------------------------------------------------------------------ */

export function NotFound() {
  // Titre, description et « noindex » sont posés par applyPageSeo().
  return (
    <main className="relative grid min-h-[70vh] place-items-center pt-32">
      <Aurora variant="soft" />
      <div className="container-x relative z-10 text-center">
        <p className="font-display text-7xl font-extrabold tracking-[-0.05em] text-gradient sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-bold sm:text-3xl">{t("Cette page n’existe pas")}</h1>
        <p className="mx-auto mt-4 max-w-md text-slate-400">{t("Le lien est peut-être obsolète. Revenez à l’accueil pour retrouver la présentation de la plateforme.")}</p>
        <Link
          to={localizedHref('/')}
          className="button-primary mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white"
        >
          <ArrowLeft className="icon-directional h-4 w-4" />{t("Retour à l’accueil")}</Link>
      </div>
    </main>
  );
}
