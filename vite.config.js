import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' + HashRouter = works on github.io/<repo>/ AND on a custom domain, with no changes.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: { assetsInlineLimit: 0 },
});
