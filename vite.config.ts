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
  server: { port: 5174, open: true },
});
