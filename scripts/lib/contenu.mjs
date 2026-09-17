import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';

/**
 * Charge le contenu éditorial français depuis src/content/site.fr.ts.
 *
 * Le fichier ne contient que des données, mais il est écrit en TypeScript :
 * on le compile avec Vite (avec bundling de ses imports internes) puis on
 * l'importe comme un module ordinaire. Deux scripts s'en servent : le garde-fou
 * des traductions et le rendu statique.
 */
export async function chargerContenuFrancais(root = process.cwd()) {
  const source = path.join(root, 'src/content/site.fr.ts');
  const result = await build({
    configFile: false,
    build: {
      write: false,
      lib: {
        entry: source,
        formats: ['es'],
        fileName: 'bundle',
      },
      rollupOptions: {
        external: ['lucide-react', 'react', 'react-dom'],
      },
    },
    logLevel: 'silent',
  });

  const output = Array.isArray(result) ? result[0].output : result.output;
  const chunk = output.find((o) => o.type === 'chunk' || o.code);
  const code = chunk ? chunk.code : '';

  const compiled = path.join(root, 'node_modules', `.cache-site-fr-${process.pid}.mjs`);
  fs.mkdirSync(path.dirname(compiled), { recursive: true });
  fs.writeFileSync(compiled, code);
  try {
    return await import(`${pathToFileURL(compiled).href}?t=${Date.now()}`);
  } finally {
    fs.rmSync(compiled, { force: true });
  }
}
