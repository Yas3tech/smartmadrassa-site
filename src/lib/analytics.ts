/**
 * Mesure d'audience Google Analytics 4, sous consentement.
 *
 * Règle appliquée : **rien ne part avant que le visiteur ait accepté**. Le
 * script de Google n'est pas seulement mis en veille, il n'est pas chargé du
 * tout tant qu'il n'y a pas de « oui » explicite. Un refus ne dépose aucun
 * cookie et n'émet aucune requête vers un domaine tiers.
 *
 * C'est plus strict que le mode « consentement » de Google, qui charge gtag
 * immédiatement en lui demandant de se retenir. Ici, si le visiteur refuse, son
 * navigateur n'aura jamais contacté googletagmanager.com.
 *
 * L'identifiant vient de VITE_GA_ID, fourni au moment de la compilation. Sans
 * lui, tout ce fichier reste inerte : aucune bannière, aucun cookie, le site se
 * comporte exactement comme avant.
 */

export const GA_ID = (import.meta.env.VITE_GA_ID ?? '').trim();
export const analyticsDisponible = GA_ID.length > 0;

const CLEF = 'smartmadrassa-consentement-mesure';
export type Consentement = 'accepte' | 'refuse' | null;

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

export function lireConsentement(): Consentement {
  try {
    const valeur = localStorage.getItem(CLEF);
    return valeur === 'accepte' || valeur === 'refuse' ? valeur : null;
  } catch {
    // Stockage bloqué : on considère qu'il n'y a pas de consentement.
    return null;
  }
}

function ecrireConsentement(valeur: Exclude<Consentement, null>) {
  try {
    localStorage.setItem(CLEF, valeur);
  } catch {
    /* Le choix vaudra pour cette visite seulement. */
  }
}

let charge = false;

function chargerGa() {
  if (charge || !analyticsDisponible) return;
  charge = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.append(script);

  window.dataLayer = window.dataLayer ?? [];
  const gtag: Gtag = (...args) => {
    window.dataLayer!.push(args);
  };
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_ID, {
    // L'adresse IP est tronquée avant tout enregistrement.
    anonymize_ip: true,
    // Pas de signaux publicitaires : on mesure l'audience, on ne cible personne.
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    // Les pages vues sont émises à la main : l'application est monopage, la
    // navigation ne provoque aucun rechargement que Google pourrait voir.
    send_page_view: false,
  });
  envoyerPageVue(window.location.pathname + window.location.search);
}

export function envoyerPageVue(chemin: string) {
  if (!charge || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: chemin,
    page_location: window.location.href,
    page_title: document.title,
  });
}

/** Applique un choix : charge la mesure, ou l'efface pour de bon. */
export function definirConsentement(valeur: Exclude<Consentement, null>) {
  ecrireConsentement(valeur);
  if (valeur === 'accepte') chargerGa();
  else effacerCookiesGa();
}

/** Au démarrage : on ne relance la mesure que si elle avait été acceptée. */
export function initialiserAnalytics() {
  if (analyticsDisponible && lireConsentement() === 'accepte') chargerGa();
}

/**
 * Retirer son consentement doit être aussi simple que le donner : on supprime
 * les cookies déjà posés plutôt que de les laisser expirer d'eux-mêmes.
 */
function effacerCookiesGa() {
  const domaines = [location.hostname, `.${location.hostname}`];
  const racine = location.hostname.split('.').slice(-2).join('.');
  if (racine !== location.hostname) domaines.push(`.${racine}`);

  for (const cookie of document.cookie.split(';')) {
    const nom = cookie.split('=')[0]?.trim();
    if (!nom || !/^_ga|^_gid$|^_gat/.test(nom)) continue;
    for (const domaine of domaines) {
      document.cookie = `${nom}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domaine}`;
    }
    document.cookie = `${nom}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
}
