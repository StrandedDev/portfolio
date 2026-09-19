# Portfolio

A Vite + Vue 3 developer portfolio designed as a VS Code-style workspace. The app renders content from local JSON data and presents project, resume, education, and contact information in a desktop-first editor UI.

## Stack

- Vue 3
- Vite
- Vue Router
- Plain CSS with design tokens

## Local development

```bash
npm install
npm run dev
```

The dev server runs on port 3000.

## Production build

```bash
npm run build
npm run preview
```

## GitHub Pages deployment

This project is configured to deploy to:

https://strandeddev.github.io/portfolio/

The build uses the repository name as the Vite base path and includes a fallback `404.html` copy so direct route refreshes work on GitHub Pages. The deployment is handled by GitHub Actions from the workflow in `.github/workflows/deploy.yml`.

### Required GitHub setting

In the repository settings, enable Pages and select the GitHub Actions source.

## Notes

- The project uses a history router, which requires static hosting fallbacks for deep links.
- Built assets are generated into `dist/` and are not committed to source control.
