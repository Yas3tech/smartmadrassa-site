/**
 * Génère public/og-image.png (1200x630) — l'aperçu affiché lors du partage
 * du lien sur WhatsApp, LinkedIn, Facebook, Slack…
 *
 *   pnpm og
 *
 * Le rendu SVG passe par librsvg (embarqué dans sharp) et utilise les polices
 * du système ; « Segoe UI » sur Windows, sinon la police sans-serif par défaut.
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const out = resolve(here, '../public/og-image.png');

const FONT = "Segoe UI, Inter, Helvetica Neue, Arial, sans-serif";

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#070C18"/>
      <stop offset="55%" stop-color="#04070F"/>
      <stop offset="100%" stop-color="#0A1020"/>
    </linearGradient>
    <linearGradient id="mark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FDBA74"/>
      <stop offset="50%" stop-color="#F97316"/>
      <stop offset="100%" stop-color="#EA580C"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#FDBA74"/>
      <stop offset="55%" stop-color="#F97316"/>
      <stop offset="100%" stop-color="#23B37A"/>
    </linearGradient>
    <radialGradient id="glowOrange" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#F97316" stop-opacity="0.42"/>
      <stop offset="100%" stop-color="#F97316" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowJade" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#23B37A" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#23B37A" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0v48" fill="none" stroke="rgba(148,163,184,.07)" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <ellipse cx="180" cy="90" rx="420" ry="330" fill="url(#glowOrange)"/>
  <ellipse cx="1080" cy="560" rx="400" ry="300" fill="url(#glowJade)"/>

  <!-- Marque -->
  <g transform="translate(88 74)">
    <rect width="60" height="60" rx="18" fill="url(#mark)"/>
    <g transform="translate(12 12) scale(1.5)" fill="none" stroke="#fff" stroke-width="1.9"
       stroke-linecap="round" stroke-linejoin="round">
      <path d="M1 2h5a3.2 3.2 0 0 1 3.2 3.2V21a2.4 2.4 0 0 0-2.4-2.4H1z"/>
      <path d="M23 2h-5a3.2 3.2 0 0 0-3.2 3.2V21a2.4 2.4 0 0 1 2.4-2.4H23z"/>
    </g>
    <circle cx="58" cy="58" r="8" fill="#23B37A" stroke="#04070F" stroke-width="3"/>
    <text x="80" y="40" font-family="${FONT}" font-size="27" font-weight="700" fill="#ffffff">
      Smart<tspan fill="#FB923C">Madrassa</tspan>
    </text>
  </g>

  <!-- Titre -->
  <text x="88" y="262" font-family="${FONT}" font-size="70" font-weight="800" fill="#ffffff" letter-spacing="-2.4">
    Toute votre école,
  </text>
  <text x="88" y="348" font-family="${FONT}" font-size="70" font-weight="800" letter-spacing="-2.4">
    <tspan fill="#ffffff">dans une seule&#160;</tspan><tspan fill="url(#accent)">plateforme.</tspan>
  </text>

  <!-- Sous-titre -->
  <text x="88" y="412" font-family="${FONT}" font-size="26" fill="#94A3B8">
    Présences · Notes · Bulletins · Communication · Finances
  </text>

  <!-- Pastilles -->
  <g font-family="${FONT}" font-size="20" font-weight="600">
    <g transform="translate(88 464)">
      <rect width="232" height="50" rx="25" fill="rgba(249,115,22,.12)" stroke="rgba(249,115,22,.35)"/>
      <text x="26" y="32" fill="#FDBA74">Trilingue FR · NL · AR</text>
    </g>
    <g transform="translate(340 464)">
      <rect width="266" height="50" rx="25" fill="rgba(35,179,122,.12)" stroke="rgba(35,179,122,.35)"/>
      <text x="26" y="32" fill="#6EE7B7">Hébergé en Europe · RGPD</text>
    </g>
  </g>

  <!-- Domaine -->
  <text x="88" y="576" font-family="${FONT}" font-size="22" font-weight="600" fill="#64748B">
    smartmadrassa.be
  </text>

  <!-- Liseré bas -->
  <rect x="0" y="626" width="1200" height="4" fill="url(#accent)"/>
</svg>
`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
console.log('og-image.png généré →', out);
