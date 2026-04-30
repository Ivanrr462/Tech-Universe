import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [
    react(),
    // Inyecta el CSS directamente en el JS — no se genera archivo .css separado
    cssInjectedByJsPlugin(),
  ],
  build: {
    lib: {
      entry: 'src/register.tsx',
      name: 'ReactWebComponents',
      formats: ['iife'],
      fileName: () => 'react-components.iife.js',
    },
    // No externalizar React — debe ir incluido en el bundle
    rollupOptions: {
      external: [],
    },
    cssCodeSplit: false,
    outDir: 'dist',
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env': JSON.stringify({}),
  },
});
