# Lunar Chaperone

Lunar Chaperone is a Vite + React single-page workbook experience.

## Project layout

The app now lives at the repository root so local development and deployment use the same paths:

- `src/` - application code
- `.github/workflows/deploy.yml` - GitHub Pages deployment workflow
- `vite.config.js` - Vite build configuration for static hosting

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Deployment

This repository is configured to deploy the built app to GitHub Pages through GitHub Actions.

1. Enable **GitHub Pages** in the repository settings and choose **GitHub Actions** as the source.
2. Push to `main` or `master`, or run the **Deploy app** workflow manually.
3. GitHub Actions builds the app and publishes the `dist/` output.
