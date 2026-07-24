import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true' && !!repoName;

export default defineConfig({
  // For GitHub Pages project sites, assets must be served from /<repo>/
  // Local dev and other environments keep root-relative paths.
  base: isGitHubPagesBuild ? `/${repoName}/` : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
