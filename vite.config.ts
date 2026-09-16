import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    target: 'es2020',
    minify: 'terser',
    cssCodeSplit: true,
    sourcemap: false,
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('framer-motion') || id.includes('/motion-') || id.includes('motion-dom')) {
            return 'motion';
          }
          if (id.includes('react-router') || id.includes('@remix-run')) return 'router';
          if (id.includes('/gsap/')) return 'gsap';
          // ogl reste hors manualChunks : Rollup le garde dans le chunk asynchrone
          // créé par son import dynamique (fond WebGL du hero).
          if (id.includes('/ogl/')) return;
          if (id.includes('lucide-react')) return 'icons';
          if (id.includes('/react-dom/') || id.includes('/react/') || id.includes('/scheduler/')) {
            return 'react';
          }
          return 'vendor';
        },
      },
    },
  },
  server: {
    port: 5174,
    open: true,
    /**
     * En production, aucun proxy n'est nécessaire : Apache sert le site et
     * /api/contact.php depuis la même origine — c'est ce qui permet une CSP en
     * `connect-src 'self'`, l'absence de CORS et le contrôle d'origine du
     * formulaire.
     *
     * En développement, Vite ne sait pas exécuter PHP : sans ce renvoi, poster
     * le formulaire retomberait sur le HTML de l'application. Lancez le serveur
     * PHP intégré à côté, puis testez l'envoi :
     *
     *   pnpm api        # php -S localhost:8787 -t public
     *   pnpm dev
     */
    proxy: {
      '/api': {
        target: process.env.API_PROXY ?? 'http://localhost:8787',
        // On garde l'en-tête Origin d'origine : contact.php le vérifie.
        changeOrigin: false,
      },
    },
  },
});
