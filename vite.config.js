import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Use repo-scoped base for GitHub Pages, root for Netlify (or any other host)
const base = process.env.DEPLOY_TARGET === 'ghpages' ? '/Smart-Google-Dorker/' : '/';

export default defineConfig({
  plugins: [react()],
  base,
});
