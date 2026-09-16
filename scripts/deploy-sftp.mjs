/**
 * Publication du site sur l'hébergement OVH, par SFTP.
 *
 *   node scripts/deploy-sftp.mjs [--dry-run] [--remote /chemin/distant]
 *
 * Pourquoi un script maison plutôt qu'une action toute faite :
 *   - l'hébergement mutualisé OVH refuse FTPS (AUTH TLS et mode implicite),
 *     seul SFTP répond ;
 *   - il n'ouvre pas de shell SSH, donc tout ce qui repose sur `ssh <commande>`
 *     ou sur rsync échoue ;
 *   - les actions courantes envoient `dist/*`, un motif qui laisse de côté les
 *     fichiers commençant par un point — `.htaccess` ne partirait jamais, et
 *     sans lui le site perd HTTPS, le routage des pages et les en-têtes de
 *     sécurité.
 *
 * Fonctionnement : miroir incrémental. On envoie tout le contenu de dist/,
 * puis on supprime à distance ce qui n'existe plus localement (les noms de
 * fichiers compilés changent à chaque build et satureraient les 100 Mo).
 * Aucune fenêtre d'indisponibilité : rien n'est effacé avant l'envoi.
 *
 * Variables d'environnement :
 *   SFTP_HOST, SFTP_USER, SFTP_PASSWORD  (obligatoires)
 *   SFTP_PORT         (défaut 22)
 *   SFTP_REMOTE_PATH  (défaut /home/<SFTP_USER>/www)
 */

import { readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import SftpClient from 'ssh2-sftp-client';

const here = dirname(fileURLToPath(import.meta.url));
const LOCAL_DIR = resolve(here, '../dist');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const remoteOverride = args.includes('--remote') ? args[args.indexOf('--remote') + 1] : null;

const HOST = process.env.SFTP_HOST;
const USER = process.env.SFTP_USER;
const PASSWORD = process.env.SFTP_PASSWORD;
const PORT = Number(process.env.SFTP_PORT || 22);
const REMOTE = remoteOverride || process.env.SFTP_REMOTE_PATH || `/home/${USER}/www`;

/** Fichiers dont l'absence signale un build incomplet : on refuse de publier. */
const REQUIS = ['index.html', '404.html', '.htaccess', 'robots.txt', 'sitemap.xml', 'api/contact.php', 'theme-init.js', 'pages/mentions-legales.html', 'pages/confidentialite.html', 'pages/conditions-utilisation.html'];

function echec(message) {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

if (!HOST || !USER || !PASSWORD) {
  echec('SFTP_HOST, SFTP_USER et SFTP_PASSWORD doivent être définis.');
}

// Sous Git Bash / MSYS, un argument commençant par « / » est réécrit en chemin
// Windows : « /home/x/www » devient « C:/Program Files/Git/home/x/www ». Le
// script partirait alors créer un dossier distant au nom absurde, sans erreur
// claire. Mieux vaut refuser tout de suite.
if (/^[A-Za-z]:[\\/]/.test(REMOTE) || REMOTE.includes('\\')) {
  echec(
    `Le chemin distant a été réécrit en chemin Windows : ${REMOTE}\n` +
      '  Relancez en préfixant la commande par MSYS_NO_PATHCONV=1, ' +
      'ou définissez SFTP_REMOTE_PATH plutôt que de passer --remote.',
  );
}
if (!REMOTE.startsWith('/')) {
  echec(`Le chemin distant doit être absolu (commencer par « / ») : ${REMOTE}`);
}

/** Parcourt un dossier local et renvoie les chemins relatifs de tous les fichiers. */
async function fichiersLocaux(racine, base = racine) {
  const entrees = await readdir(racine, { withFileTypes: true });
  const resultats = [];
  for (const entree of entrees) {
    const chemin = join(racine, entree.name);
    if (entree.isDirectory()) {
      resultats.push(...(await fichiersLocaux(chemin, base)));
    } else if (entree.isFile()) {
      resultats.push(relative(base, chemin).split('\\').join('/'));
    }
  }
  return resultats;
}

/**
 * Parcourt un dossier distant et renvoie fichiers, dossiers et liens
 * symboliques, en chemins relatifs.
 *
 * Les liens sont suivis séparément : un hébergement OVH neuf contient un
 * `www/index.html` qui est un lien symbolique vers une cible inexistante.
 * Écrire par-dessus échoue avec « No such file », car SFTP résout le lien
 * avant d'ouvrir le fichier. Il faut donc le supprimer d'abord.
 */
async function contenuDistant(sftp, racine, prefixe = '') {
  const fichiers = [];
  const dossiers = [];
  const liens = [];
  let entrees;
  try {
    entrees = await sftp.list(racine);
  } catch {
    return { fichiers, dossiers, liens }; // dossier inexistant : premier déploiement
  }
  for (const entree of entrees) {
    const rel = prefixe ? `${prefixe}/${entree.name}` : entree.name;
    if (entree.type === 'd') {
      dossiers.push(rel);
      const sous = await contenuDistant(sftp, `${racine}/${entree.name}`, rel);
      fichiers.push(...sous.fichiers);
      dossiers.push(...sous.dossiers);
      liens.push(...sous.liens);
    } else if (entree.type === 'l') {
      liens.push(rel);
    } else {
      fichiers.push(rel);
    }
  }
  return { fichiers, dossiers, liens };
}

async function main() {
  if (!existsSync(LOCAL_DIR)) {
    echec(`Dossier introuvable : ${LOCAL_DIR}. Lancez "pnpm build" d'abord.`);
  }

  const locaux = await fichiersLocaux(LOCAL_DIR);
  const manquants = REQUIS.filter((f) => !locaux.includes(f));
  if (manquants.length) {
    echec(`Build incomplet, fichiers manquants : ${manquants.join(', ')}`);
  }

  let octets = 0;
  for (const f of locaux) octets += (await stat(join(LOCAL_DIR, f))).size;

  console.log(`Source   : ${LOCAL_DIR}`);
  console.log(`Cible    : ${USER}@${HOST}:${REMOTE}`);
  console.log(`Contenu  : ${locaux.length} fichiers, ${(octets / 1024 / 1024).toFixed(2)} Mo`);
  if (dryRun) console.log('Mode     : simulation (aucune écriture)\n');
  else console.log('');

  const sftp = new SftpClient();
  await sftp.connect({ host: HOST, port: PORT, username: USER, password: PASSWORD, readyTimeout: 30000 });

  try {
    const avant = await contenuDistant(sftp, REMOTE);

    // 0. Retrait des liens symboliques. Un hébergement OVH neuf pose un
    //    www/index.html qui pointe vers une cible inexistante ; tant qu'il est
    //    là, impossible d'écrire le vrai index.html par-dessus.
    for (const rel of avant.liens) {
      console.log(`  lien retiré  ${rel}`);
      if (!dryRun) await sftp.delete(`${REMOTE}/${rel}`, true);
    }

    // 1. Envoi — les dossiers sont créés à la volée, fichiers cachés compris.
    let envoyes = 0;
    const dossiersCrees = new Set();
    for (const rel of locaux) {
      const cibleDossier = `${REMOTE}/${dirname(rel)}`.replace(/\/\.$/, '');
      if (!dossiersCrees.has(cibleDossier)) {
        if (!dryRun && !(await sftp.exists(cibleDossier))) {
          await sftp.mkdir(cibleDossier, true);
        }
        dossiersCrees.add(cibleDossier);
      }
      if (!dryRun) {
        const cible = `${REMOTE}/${rel}`;
        try {
          await sftp.fastPut(join(LOCAL_DIR, rel), cible);
        } catch (err) {
          // Filet de sécurité : si l'entrée distante est dans un état qui
          // empêche l'écriture (lien cassé, fichier verrouillé), on la retire
          // et on retente une fois avant d'abandonner.
          await sftp.delete(cible, true).catch(() => {});
          await sftp.fastPut(join(LOCAL_DIR, rel), cible).catch(() => {
            throw err;
          });
        }
      }
      envoyes++;
      if (envoyes % 10 === 0 || envoyes === locaux.length) {
        console.log(`  envoyés ${envoyes}/${locaux.length}`);
      }
    }

    // 2. Nettoyage des fichiers qui n'existent plus dans le build.
    const obsoletes = avant.fichiers.filter((f) => !locaux.includes(f));
    for (const rel of obsoletes) {
      console.log(`  supprimé  ${rel}`);
      if (!dryRun) await sftp.delete(`${REMOTE}/${rel}`);
    }

    // 3. Dossiers devenus vides, du plus profond au plus superficiel.
    const dossiersLocaux = new Set(locaux.map((f) => dirname(f)).filter((d) => d !== '.'));
    const obsoletesDossiers = avant.dossiers
      .filter((d) => !dossiersLocaux.has(d))
      .sort((a, b) => b.split('/').length - a.split('/').length);
    for (const rel of obsoletesDossiers) {
      if (!dryRun) await sftp.rmdir(`${REMOTE}/${rel}`, true).catch(() => {});
      console.log(`  dossier retiré  ${rel}`);
    }

    console.log(
      `\n✔ ${dryRun ? 'Simulation terminée' : 'Publication terminée'} — ` +
        `${envoyes} envoyés, ${obsoletes.length} supprimés.`,
    );
  } finally {
    await sftp.end();
  }
}

main().catch((err) => echec(err?.message || String(err)));
