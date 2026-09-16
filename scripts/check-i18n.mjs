/**
 * Vérifie que chaque phrase affichée par le site possède bien sa traduction
 * néerlandaise et arabe.
 *
 *   node scripts/check-i18n.mjs [--list-orphelines] [--purger]
 *
 * Deux sources de texte cohabitent :
 *   - src/content/site.fr.ts : le contenu éditorial, traduit à l'exécution par
 *     translateContent() ;
 *   - les appels t('…') écrits directement dans les composants (libellés
 *     d'interface, textes accessibles).
 *
 * La clef d'un dictionnaire est la phrase française elle-même : dès qu'on
 * retouche une phrase en français, sa traduction doit suivre. Ce script rend
 * l'oubli visible au lieu de laisser le site retomber silencieusement en
 * français. Il sort en code 1 si une traduction manque, pour bloquer le
 * déploiement.
 */

import fs from 'node:fs';
import path from 'node:path';
import { chargerContenuFrancais } from './lib/contenu.mjs';

const root = process.cwd();
const listOrphans = process.argv.includes('--list-orphelines');
const purge = process.argv.includes('--purger');
const dumpIndex = process.argv.indexOf('--dump');
const dumpDir = dumpIndex > -1 ? process.argv[dumpIndex + 1] : null;

/** Clefs qui ne sont pas du texte affiché : identifiants, liens, icônes. */
const STRUCTURAL = new Set([
  'id', 'href', 'url', 'path', 'appUrl', 'domain', 'email', 'icon', 'accent', 'span', 'mock', 'dir', 'code', 'sample',
]);

const norm = (s) => s.replace(/\s+/g, ' ').trim();

const strings = new Set();
function walk(value, key = '') {
  if (typeof value === 'string') {
    if (!STRUCTURAL.has(key)) strings.add(norm(value));
    return;
  }
  if (Array.isArray(value)) return value.forEach((item) => walk(item));
  if (value && typeof value === 'object') Object.entries(value).forEach(([k, v]) => walk(v, k));
}
Object.values(await chargerContenuFrancais(root)).forEach((value) => walk(value));

/** Chaînes passées à t('…') dans les composants. */
function sourceFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(file);
    return /\.tsx?$/.test(file) ? [file] : [];
  });
}

const T_CALL = /\bt\(\s*(['"])((?:[^'"\\]|\\.)*?)\1\s*\)/g;
for (const file of sourceFiles(path.join(root, 'src'))) {
  const source = fs.readFileSync(file, 'utf8');
  for (const match of source.matchAll(T_CALL)) strings.add(norm(match[2]));
}
strings.delete('');

const expected = [...strings].sort();

/**
 * Phrases qui s'écrivent de la même façon en français et dans la langue cible :
 * marque, codes de langue, nombres, symboles, plus la liste déclarée à la main
 * dans identiques.json. Les laisser identiques n'est pas un oubli.
 */
const DECLAREES = JSON.parse(fs.readFileSync(path.join(root, 'src/content/translations/identiques.json'), 'utf8'));
const UNIVERSELLES = new Set([
  'SmartMadrassa', 'Smart', 'Madrassa', 'app.smartmadrassa.be', 'smartmadrassa.be',
  'contact@smartmadrassa.be', 'FR', 'NL', 'AR', 'YE', 'Nederlands', 'Français', 'العربية',
  'Excel', 'PDF', 'WhatsApp', 'Escape', 'RGPD', '%', '©', '—',
  'Rapport 2de trimester gepubliceerd',
]);
const invariable = (phrase, locale) =>
  UNIVERSELLES.has(phrase) ||
  (DECLAREES[locale] ?? []).includes(phrase) ||
  /^[\d\s.,%€+/–-]+$/.test(phrase) ||        // nombres, montants, séparateurs
  /^[A-Z0-9\s.,-]+$/.test(phrase) ||          // sigles et codes
  phrase.startsWith('Yassine E.');

let failed = false;

for (const locale of ['nl', 'ar']) {
  const file = path.join(root, 'src/content/translations', `${locale}.json`);
  const dictionary = JSON.parse(fs.readFileSync(file, 'utf8'));

  const missing = expected.filter((phrase) => !dictionary[phrase]);
  // Une valeur identique au français est une traduction oubliée, pas une traduction.
  const untouched = expected.filter((phrase) => dictionary[phrase] === phrase && !invariable(phrase, locale));
  // L'arabe s'écrit en arabe : une valeur sans un seul caractère arabe n'a pas été traduite.
  const notArabic = locale !== 'ar'
    ? []
    : expected.filter((phrase) => dictionary[phrase] && !/[؀-ۿ]/.test(dictionary[phrase]) && !invariable(phrase, locale));

  const problems = [...new Set([...missing, ...untouched, ...notArabic])];
  const orphans = Object.keys(dictionary).filter((key) => !strings.has(key));

  if (problems.length) {
    failed = true;
    console.error(`\n✖ ${locale.toUpperCase()} — ${problems.length} phrase(s) non traduite(s) sur ${expected.length} :`);
    problems.forEach((phrase) => console.error(`    ${phrase}`));
  } else {
    console.log(`✓ ${locale.toUpperCase()} — ${expected.length} phrases traduites`);
  }

  if (orphans.length) {
    console.log(`  ${orphans.length} clef(s) devenue(s) inutile(s) dans ${locale}.json`);
    if (listOrphans) orphans.forEach((key) => console.log(`    ~ ${key}`));
    if (purge) {
      orphans.forEach((key) => delete dictionary[key]);
      const sorted = Object.fromEntries(
        Object.keys(dictionary).sort((a, b) => a.localeCompare(b, 'fr')).map((key) => [key, dictionary[key]]),
      );
      fs.writeFileSync(file, JSON.stringify(sorted, null, 2) + '\n');
      console.log(`  → retirées de ${locale}.json`);
    }
  }

  if (dumpDir) {
    fs.mkdirSync(dumpDir, { recursive: true });
    fs.writeFileSync(path.join(dumpDir, `a-traduire-${locale}.json`), JSON.stringify(problems, null, 2) + '\n');
    fs.writeFileSync(path.join(dumpDir, `orphelines-${locale}.json`), JSON.stringify(orphans, null, 2) + '\n');
  }
}

if (failed) {
  console.error('\nAjoutez les traductions manquantes dans src/content/translations/.\n');
  process.exit(1);
}
