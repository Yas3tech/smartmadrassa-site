# Site vitrine SmartMadrassa — `smartmadrassa.be`

Site de présentation public, **séparé de l'application** (`app.smartmadrassa.be`, hébergée sur
Firebase). Il se compile en fichiers statiques déposés sur un hébergement mutualisé OVH.

Ce dépôt ne contient que le site vitrine ; le code de l'application vit dans un dépôt distinct.
Site en ligne : **https://smartmadrassa.be**

- **Stack** : Vite 7 + React 19 + TypeScript + Tailwind CSS 3
- **Thèmes** : clair par défaut (soigné et chaleureux), mode sombre disponible via un commutateur mémorisé
- **Animation** : Framer Motion (composants) + GSAP/ScrollTrigger (chorégraphie au scroll natif)
- **Graphisme** : shader WebGL via OGL pour le fond du hero, allégé et chargé à la demande
- **Poids** : ~210 Ko de JS gzippé au premier rendu, polices auto-hébergées, aucun appel à un service tiers
- **Langue** : français (structure prête pour NL / AR, voir plus bas)

---

## 1. Développer en local

```bash
git clone https://github.com/Yas3tech/smartmadrassa-site.git
cd smartmadrassa-site
pnpm install
pnpm dev              # http://localhost:5174
```

Autres commandes :

```bash
pnpm build            # compile vers dist/
pnpm preview          # sert dist/ sur http://localhost:4174
pnpm og               # régénère public/og-image.png (aperçu de partage)
```

---

## 2. Modifier le contenu

**Tout le texte du site vit dans un seul fichier** : [`src/content/site.ts`](src/content/site.ts).

| Constante      | Ce qu'elle pilote                                            |
| -------------- | ------------------------------------------------------------ |
| `SITE`         | Nom, domaine, e-mail, URL de l'application, éditeur           |
| `NAV`          | Entrées du menu (l'ancre doit exister comme `id` de section)  |
| `HERO`         | Titre, accroche, boutons                                      |
| `MARQUEE`      | Bandeau défilant sous le hero                                 |
| `STATS`        | Les quatre chiffres clés                                      |
| `PROBLEM`      | Colonnes « sans / avec »                                      |
| `MANIFESTO`    | Phrase révélée mot à mot au défilement                        |
| `YEAR`         | Traversée horizontale de l'année scolaire (section épinglée)  |
| `MODULES`      | Les cinq modules du scroll collant                            |
| `BENTO`        | Grille des atouts                                             |
| `ROLES`        | Onglets Direction / Enseignant / Parent / Élève               |
| `STEPS`        | Étapes de mise en route                                       |
| `SECURITY`     | Cartes sécurité & RGPD                                        |
| `LANGUAGES`    | Section trilingue                                             |
| `PRICING`      | **Formules et prix** — à valider avant mise en ligne          |
| `FAQ`          | Questions / réponses (génère aussi le balisage SEO `FAQPage`) |
| `CTA`/`CONTACT`| Bloc de conversion et formulaire                              |
| `FOOTER`       | Colonnes du pied de page                                      |
| `TESTIMONIALS` | **Vide par défaut** — la section reste masquée                |

### Points à compléter avant la mise en ligne

1. **Tarifs** (`PRICING`) — 39 € / 79 € / sur mesure sont des valeurs de départ indicatives à confirmer.
2. **Éditeur et mentions** — Le site présente SmartMadrassa comme projet indépendant conçu et développé en solo par Yassine E. en Belgique.
3. **URL de l'application** — `SITE.appUrl` pointe vers `https://app.smartmadrassa.be`.
   Ajustez-la si le sous-domaine diffère.
4. **Témoignages** — n'ajoutez dans `TESTIMONIALS` que des retours réels obtenus par écrit.

---

## 3. Déployer sur OVH

### 3.1 Compiler

```bash
pnpm build
```

Le résultat est dans `dist/`. Il contient déjà `.htaccess`, `robots.txt`, `sitemap.xml`,
`og-image.png` et `api/contact.php` (copiés depuis `public/`).

### 3.2 Déploiement automatique (recommandé)

Le workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) compile et publie le
site à chaque `push` sur `main` : vérification des types → build → contrôle que le build est
complet → envoi **SFTP** → vérification que le site répond en HTTPS.

**Configuration, une seule fois** — dans le repo GitHub, *Settings → Secrets and variables →
Actions* :

| Nom | Type | Valeur |
| --- | --- | --- |
| `OVH_FTP_HOST` | Secret | `ftp.cluster121.hosting.ovh.net` |
| `OVH_FTP_USER` | Secret | identifiant FTP de l'hébergement |
| `OVH_FTP_PASSWORD` | Secret | mot de passe FTP |
| `OVH_REMOTE_PATH` | Variable | `/home/<utilisateur>/www` |

Déclenchement manuel sans commit : onglet *Actions* → *Déploiement OVH* → *Run workflow*.

#### Pourquoi SFTP et pas FTPS

Cet hébergement mutualisé OVH a été testé : il **refuse FTPS** (ni `AUTH TLS` sur le port 21, ni
le mode implicite sur 990) et **n'ouvre pas de shell SSH**. Seul SFTP, sur le port 22, répond.

C'est pourquoi l'envoi passe par [`scripts/deploy-sftp.mjs`](scripts/deploy-sftp.mjs) plutôt que
par une action toute faite. Les actions courantes échouent ici pour l'une de ces trois raisons :

- elles reposent sur FTPS, refusé par le serveur ;
- elles suppriment les fichiers distants avec `ssh <commande>` ou synchronisent avec rsync, deux
  choses qui exigent un shell absent de cette offre ;
- elles envoient `dist/*`, un motif qui laisse de côté les fichiers commençant par un point —
  **`.htaccess` ne partirait jamais**, et sans lui le site perd le HTTPS forcé, le routage des
  pages et les en-têtes de sécurité.

Le script fait un **miroir incrémental** : il envoie tout le contenu de `dist/`, puis supprime à
distance ce qui n'existe plus localement (les noms de fichiers compilés changent à chaque build et
satureraient les 100 Mo de l'hébergement). Rien n'est effacé avant l'envoi : pas de fenêtre pendant
laquelle le site serait vide. Il refuse de publier si `index.html`, `.htaccess`, `robots.txt`,
`sitemap.xml` ou `api/contact.php` manquent au build.

Il s'utilise aussi à la main :

```bash
export SFTP_HOST=ftp.cluster121.hosting.ovh.net
export SFTP_USER=votre_identifiant
export SFTP_PASSWORD=votre_mot_de_passe
pnpm deploy:dry     # simulation, n'écrit rien
pnpm deploy         # publication
```

### 3.3 Envoyer à la main (dépannage)

Connexion via FileZilla ou l'Explorateur de fichiers OVH :

| Paramètre    | Valeur                                              |
| ------------ | --------------------------------------------------- |
| Hôte         | `ftp.cluster0XX.hosting.ovh.net` (voir votre espace client) |
| Protocole    | FTP over TLS (FTPS) ou SFTP                          |
| Utilisateur  | identifiant FTP de l'hébergement                     |
| Dossier cible| `/www` (ou `/www/sousdossier` selon le multisite)    |

**Envoyez le contenu de `dist/`, pas le dossier `dist` lui-même.** À la racine de `www/` vous
devez retrouver `index.html`, `.htaccess`, `assets/`, `api/`.

> Pensez à activer l'affichage des fichiers cachés dans votre client FTP, sans quoi `.htaccess`
> ne sera pas transféré — et le site renverra une 404 sur `/confidentialite`.

### 3.4 Variante ligne de commande

```bash
# Installation unique : winget install --id=WinSCP.WinSCP  (ou lftp sous WSL)
lftp -u "IDENTIFIANT,MOTDEPASSE" ftp.clusterXXX.hosting.ovh.net \
  -e "mirror -R --delete --verbose dist /www ; quit"
```

### 3.5 Configuration du domaine

Dans l'espace client OVH → *Hébergements* → *Multisite* :

- `smartmadrassa.be` → dossier racine `www`, **SSL activé**
- `www.smartmadrassa.be` → même dossier (le `.htaccess` redirige vers l'apex)

Le certificat Let's Encrypt d'OVH est gratuit et se renouvelle automatiquement.

---

## 4. Formulaire de contact

Le formulaire envoie un `POST` vers `/api/contact.php`.

Avant la mise en ligne, ouvrez [`public/api/contact.php`](public/api/contact.php) et vérifiez :

```php
const DESTINATAIRE = 'contact@smartmadrassa.be';   // qui reçoit les demandes
const EXPEDITEUR   = 'contact@smartmadrassa.be';   // boîte existante sur OVH
```

L'adresse `EXPEDITEUR` est configurée sur `contact@smartmadrassa.be` (la boîte active sur votre hébergement OVH). Les réponses se font directement à l'adresse du visiteur via l'en-tête `Reply-To`.

Protections déjà en place : pot de miel, limite de 5 envois par heure et par IP, nettoyage des
en-têtes contre l'injection, validation côté serveur.

**Alternative sans PHP** : si vous préférez un service externe (Formspree, Brevo…), remplacez l'URL
dans [`src/components/sections/Contact.tsx`](src/components/sections/Contact.tsx) — mais pensez à
autoriser ce domaine dans la directive `connect-src` du `.htaccess`, sinon la requête sera bloquée
par la CSP.

---

## 5. Sécurité et performance (déjà configurées)

Le fichier [`public/.htaccess`](public/.htaccess) applique :

- redirection HTTP → HTTPS et `www` → apex ;
- réécriture monopage (les routes `/confidentialite`, `/mentions-legales`… fonctionnent en accès direct) ;
- en-têtes `HSTS`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` ;
- une **CSP stricte** : le site ne charge aucune ressource externe (polices comprises) ;
- cache d'un an sur les fichiers versionnés, revalidation systématique du HTML ;
- compression gzip.

Conséquence RGPD utile : **aucune requête vers Google Fonts ou un traceur tiers**, donc aucune
bannière cookies nécessaire. Si vous ajoutez plus tard une mesure d'audience, il faudra ajouter un
consentement préalable et élargir la CSP.

---

## 6. Les trois langues : français, néerlandais, arabe

Le site est servi en FR, NL et AR. La langue se choisit dans l'en-tête, se retient dans
`localStorage` et voyage dans l'URL (`?lang=nl`), ce qui rend chaque version partageable et
indexable.

**Comment ça marche.** Le français est la source : tout le texte éditorial vit dans
`src/content/site.fr.ts`, et les libellés d'interface passent par `t('…')` dans les composants.
`src/lib/i18n.ts` charge le dictionnaire de la langue demandée *avant* de monter React, puis
`translateContent()` traduit l'objet de contenu en une passe. **La clef d'un dictionnaire est la
phrase française elle-même** : il n'y a donc aucun identifiant à inventer, et une phrase sans
traduction retombe visiblement en français plutôt que d'afficher une clef technique.

```
src/content/translations/
├─ nl.json            phrase française → phrase néerlandaise
├─ ar.json            phrase française → phrase arabe
└─ identiques.json    phrases qui s'écrivent pareil dans les deux langues
```

**Modifier un texte.** Changez la phrase dans `site.fr.ts` (ou le `t('…')` du composant), puis
reportez la nouvelle clef dans `nl.json` et `ar.json`. Si la phrase s'écrit de la même façon dans
la langue cible — un nom propre, une marque, une unité — déclarez-la dans `identiques.json`
plutôt que de la recopier telle quelle.

**Le garde-fou.** `pnpm check:i18n` compare les phrases réellement affichées aux deux
dictionnaires et signale trois choses : la traduction absente, la valeur restée identique au
français, et l'arabe écrit sans un seul caractère arabe. Il tourne au début de `pnpm build`, donc
un oubli bloque le déploiement au lieu de partir en production.

```bash
pnpm check:i18n                      # vérifie
node scripts/check-i18n.mjs --purger # retire les clefs devenues inutiles
```

**L'arabe.** `<html dir="rtl">` est posé au démarrage, la typographie bascule sur Cairo
(auto-hébergée) et les flèches marquées `.icon-directional` se retournent pour suivre le sens de
lecture. Deux zones restent volontairement en `ltr` : le rail de l'année scolaire, dont
l'animation dépend d'un sens de translation fixe, et le sélecteur de langue.

---

## 7. Structure du projet

```
site/
├─ public/
│  ├─ .htaccess              Configuration Apache / OVH
│  ├─ api/contact.php        Traitement du formulaire
│  ├─ og-image.png           Aperçu de partage (généré par pnpm og)
│  ├─ robots.txt, sitemap.xml, site.webmanifest
│  └─ favicon / icônes
├─ scripts/
│  ├─ generate-og.mjs        Génération de l'image de partage (sharp)
│  ├─ check-i18n.mjs         Garde-fou des traductions (lancé par pnpm build)
│  └─ deploy-sftp.mjs        Publication SFTP vers OVH
└─ src/
   ├─ content/site.fr.ts     ← TOUT le texte du site, en français
   ├─ content/translations/  dictionnaires néerlandais et arabe
   ├─ lib/i18n.ts            choix de la langue, RTL, traduction du contenu
   ├─ lib/                   hooks (magnétisme, halo, préférences), variantes Framer, pont GSAP
   ├─ components/
   │  ├─ ui/                 primitives (boutons, révélations, aurores, marquee, shader WebGL, bascule de thème)
   │  ├─ mock/               maquettes d'interface reconstituées en HTML/CSS
   │  ├─ layout/             en-tête avec bascule de thème, pied de page, jauge de lecture
   │  └─ sections/           les 15 sections de la page d'accueil
   └─ pages/                 accueil, pages légales, 404
```

### Les maquettes ne sont pas des captures d'écran

Les écrans d'application visibles sur le site sont **reconstruits en HTML/CSS**
([`src/components/mock/`](src/components/mock/)). Avantages : nets à toutes les résolutions,
animables, traduisibles, et **aucune donnée réelle d'élève n'est exposée**. Les noms affichés
(Amina Benali, Youssef Haddad…) sont fictifs.

Pour les remplacer par de vraies captures : placez les images dans `public/screens/` et substituez
les composants `<DashboardScreen />`, `<AttendanceScreen />`… par des `<img>`. Pensez alors à
anonymiser toute donnée personnelle visible.

---

## 8. Les techniques d'animation et de performance

| Technique | Fichier | Ce qu'elle porte |
| --- | --- | --- |
| **Framer Motion** | partout dans `components/` | Apparitions au scroll, transitions d'état (onglets, accordéon, bascule tarifs), dépliage 3D du hero. Idéal quand l'animation suit le cycle de vie d'un composant React. |
| **GSAP + ScrollTrigger** | [`lib/gsap.ts`](src/lib/gsap.ts), [`YearJourney`](src/components/sections/YearJourney.tsx), [`Manifesto`](src/components/sections/Manifesto.tsx) | Chorégraphie au scroll natif : section épinglée avec défilement horizontal sur grand écran, révélation mot à mot en mode « scrub ». Aucun wrapper de scroll artificiel pour garantir une fluidité maximale à 60/120 fps. |
| **OGL (WebGL)** | [`ui/ShaderBackdrop.tsx`](src/components/ui/ShaderBackdrop.tsx) | Le fond du hero en mode sombre : bruit fractal doublement déformé, synthèse additive aux couleurs de la marque. Se suspend hors écran et sur appareils tactiles pour préserver la batterie. |

**Points d'attention si vous modifiez ces sections :**

- Le défilement est **100 % natif** pour éviter les saccades ou les ralentissements constatés avec les bibliothèques d'inertie logicielle.
- Le défilement horizontal épinglé est réservé aux écrans ≥ 1024 px via `gsap.matchMedia()`. En dessous ou sur écran tactile, le rail redevient un simple glissement natif avec accrochage CSS.
- Si vous ajoutez ou retirez des cartes dans `YEAR.stops`, rien à recalculer : la distance de défilement est dérivée de `scrollWidth` et recalculée à chaque redimensionnement (`invalidateOnRefresh`).
- Le shader s'arrête dès qu'il sort de l'écran ou que l'onglet passe en arrière-plan, et ne tourne qu'en mode sombre.

---

## 9. Accessibilité, thèmes et animations

- **Thème clair et sombre** : le site s'affiche par défaut dans un thème clair élégant et chaleureux, avec une bascule immédiate vers un mode sombre soigné. Le choix est mémorisé localement dans le navigateur.
- **Réduction des mouvements** : toutes les animations respectent `prefers-reduced-motion` : le dépliage 3D du hero, les compteurs, le shader WebGL, la révélation mot à mot et le défilement horizontal épinglé se simplifient automatiquement.
- Navigation au clavier complète, gestion de la touche Échap pour le menu mobile, lien d'évitement, contrastes vérifiés.
