# Site vitrine SmartMadrassa — `smartmadrassa.be`

Site de présentation public, **séparé de l'application** (`app.smartmadrassa.be`, hébergée sur
Firebase). Il se compile en fichiers statiques déposés sur un hébergement mutualisé OVH.

Ce dépôt ne contient que le site vitrine. Le code de l'application vit dans un dépôt distinct.

- **Stack** : Vite 7 + React 19 + TypeScript + Tailwind CSS 3
- **Animation** : Framer Motion (composants) + GSAP/ScrollTrigger (chorégraphie au scroll) + Lenis (défilement inertiel)
- **Graphisme** : shader WebGL via OGL pour le fond du hero, chargé à la demande
- **Poids** : ~215 Ko de JS gzippé au premier rendu (+38 Ko différés pour le shader), polices auto-hébergées, aucun appel à un service tiers
- **Langue** : français (structure prête pour NL / AR, voir plus bas)

---

## 1. Développer en local

```bash
cd site
pnpm install --ignore-workspace
pnpm dev              # http://localhost:5174
```

Autres commandes :

```bash
pnpm build            # compile vers dist/
pnpm preview          # sert dist/ sur http://localhost:4174
pnpm og               # régénère public/og-image.png (aperçu de partage)
```

> `--ignore-workspace` évite que pnpm remonte au `package.json` de l'application.
> Un `.npmrc` local le règle déjà par défaut.

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

1. **Tarifs** (`PRICING`) — 39 € / 79 € / sur mesure sont des valeurs de départ à confirmer.
2. **Numéro d'entreprise / TVA** — `« à compléter »` dans le pied de page
   ([`src/components/layout/Footer.tsx`](src/components/layout/Footer.tsx)) et dans les mentions
   légales ([`src/pages/Legal.tsx`](src/pages/Legal.tsx)).
3. **URL de l'application** — `SITE.appUrl` pointe vers `https://app.smartmadrassa.be`.
   Ajustez-la si le sous-domaine diffère.
4. **Témoignages** — n'ajoutez dans `TESTIMONIALS` que des retours réels obtenus par écrit.

---

## 3. Déployer sur OVH

### 3.1 Compiler

```bash
cd site
pnpm build
```

Le résultat est dans `site/dist/`. Il contient déjà `.htaccess`, `robots.txt`, `sitemap.xml`,
`og-image.png` et `api/contact.php` (copiés depuis `public/`).

### 3.2 Déploiement automatique (recommandé)

Le workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) compile et publie le
site à chaque `push` sur `main`. Il vérifie aussi les types et s'assure que `.htaccess`,
`robots.txt`, `sitemap.xml`, `og-image.png` et `api/contact.php` sont bien présents dans `dist/`
avant d'envoyer quoi que ce soit.

**Configuration, une seule fois** — dans le repo GitHub, *Settings → Secrets and variables →
Actions* :

| Nom | Type | Valeur |
| --- | --- | --- |
| `OVH_FTP_HOST` | Secret | `ftp.clusterXXX.hosting.ovh.net` (espace client OVH) |
| `OVH_FTP_USER` | Secret | identifiant FTP de l'hébergement |
| `OVH_FTP_PASSWORD` | Secret | mot de passe FTP |
| `OVH_SERVER_DIR` | Variable *(facultatif)* | `./www/` par défaut — à changer seulement en multisite |

Le transfert se fait en **FTPS** (chiffré), et l'action ne renvoie que les fichiers modifiés :
elle garde un état `.ftp-deploy-state.json` à la racine du serveur.

> Créez de préférence un **utilisateur FTP dédié** dans l'espace client OVH, limité au dossier du
> site. Si le mot de passe fuite un jour, il ne donne accès qu'à cet hébergement.

Déclenchement manuel possible sans commit : onglet *Actions* → *Déploiement OVH* → *Run workflow*.

### 3.3 Envoyer par FTP à la main

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
  -e "mirror -R --delete --verbose site/dist /www ; quit"
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
const EXPEDITEUR   = 'noreply@smartmadrassa.be';   // DOIT exister sur le domaine OVH
```

L'adresse `EXPEDITEUR` doit être une **boîte réellement créée dans OVH e-mail**, sinon les messages
partent en spam ou sont rejetés.

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

## 6. Ajouter le néerlandais et l'arabe

La structure est prête : tout le texte est déjà isolé dans `src/content/site.ts`.

1. Dupliquer le fichier en `src/content/site.nl.ts` et `src/content/site.ar.ts` ;
2. Créer un petit contexte de langue qui sélectionne le bon objet ;
3. Pour l'arabe, poser `dir="rtl"` sur `<html>` et utiliser `font-arabic` (Cairo est déjà installé
   et auto-hébergé) ;
4. Ajouter les balises `<link rel="alternate" hreflang="...">` dans `index.html` et les URL
   correspondantes dans `sitemap.xml`.

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
├─ scripts/generate-og.mjs   Génération de l'image de partage (sharp)
└─ src/
   ├─ content/site.ts        ← TOUT le texte du site
   ├─ lib/                   hooks (scroll inertiel, magnétisme, halo), variantes Framer, pont GSAP
   ├─ components/
   │  ├─ ui/                 primitives (boutons, révélations, aurores, marquee, shader WebGL)
   │  ├─ mock/               maquettes d'interface reconstituées en HTML/CSS
   │  ├─ layout/             en-tête, pied de page, jauge de lecture
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

## 8. Les trois techniques d'animation, et quand chacune sert

| Technique | Fichier | Ce qu'elle porte |
| --- | --- | --- |
| **Framer Motion** | partout dans `components/` | Apparitions au scroll, transitions d'état (onglets, accordéon, bascule tarifs), dépliage 3D du hero. Idéal quand l'animation suit le cycle de vie d'un composant React. |
| **GSAP + ScrollTrigger** | [`lib/gsap.ts`](src/lib/gsap.ts), [`YearJourney`](src/components/sections/YearJourney.tsx), [`Manifesto`](src/components/sections/Manifesto.tsx) | Chorégraphie pilotée par la molette : section épinglée avec défilement horizontal, révélation mot à mot en mode « scrub ». Framer Motion ne sait pas épingler une section. |
| **OGL (WebGL)** | [`ui/ShaderBackdrop.tsx`](src/components/ui/ShaderBackdrop.tsx) | Le fond du hero : bruit fractal doublement déformé, synthèse additive aux couleurs de la marque. Un dégradé CSS ne produit pas ce mouvement organique. |

**Points d'attention si vous modifiez ces sections :**

- Lenis et GSAP partagent une seule horloge (`registerLenis` dans `lib/gsap.ts`). Sans cette
  synchronisation, la section épinglée saccade. Ne créez pas de second `requestAnimationFrame`
  pour Lenis.
- Le défilement horizontal épinglé est réservé aux écrans ≥ 1024 px via `gsap.matchMedia()`.
  En dessous, le rail redevient un simple glissement natif avec accrochage.
- Si vous ajoutez ou retirez des cartes dans `YEAR.stops`, rien à recalculer : la distance de
  défilement est dérivée de `scrollWidth` et recalculée à chaque redimensionnement
  (`invalidateOnRefresh`).
- Le shader s'arrête dès qu'il sort de l'écran ou que l'onglet passe en arrière-plan, et il ne se
  charge pas du tout si l'utilisateur a demandé à réduire les animations.

---

## 9. Accessibilité et animations

- Toutes les animations respectent `prefers-reduced-motion` : le défilement inertiel, le dépliage 3D
  du hero, les compteurs, le shader WebGL, la révélation mot à mot et le défilement horizontal
  épinglé se désactivent automatiquement — la page reste entièrement lisible et navigable.
- Le scroll inertiel est également désactivé sur écran tactile, où le défilement natif est meilleur.
- Navigation au clavier complète, lien d'évitement, contrastes vérifiés sur fond sombre.
