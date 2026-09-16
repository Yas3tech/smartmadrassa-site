import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { transformWithEsbuild } from 'vite';

/**
 * Charge le contenu éditorial français depuis src/content/site.fr.ts.
 *
 * Le fichier ne contient que des données, mais il est écrit en TypeScript :
 * on le transpile en mémoire avec esbuild — déjà présent avec Vite — puis on
 * l'importe comme un module ordinaire. Deux scripts s'en servent : le garde-fou
 * des traductions et le rendu statique.
 */
export async function chargerContenuFrancais(root = process.cwd()) {
  const source = path.join(root, 'src/content/site.fr.ts');
  const { code } = await transformWithEsbuild(fs.readFileSync(source, 'utf8'), source, { loader: 'ts' });
  const compiled = path.join(root, 'node_modules', `.cache-site-fr-${process.pid}.mjs`);
  fs.mkdirSync(path.dirname(compiled), { recursive: true });
  fs.writeFileSync(compiled, code);
  try {
    return await import(`${pathToFileURL(compiled).href}?t=${Date.now()}`);
  } finally {
    fs.rmSync(compiled, { force: true });
  }
}
