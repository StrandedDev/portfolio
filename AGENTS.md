# AGENTS.md

Developer portfolio: a personal site presented as a VS Code–style editor.
Vue 3 + Vite, JavaScript only (no TypeScript). Content lives in JSON data files.

## Commands

- `npm run dev` — Vite dev server on port 3000, host `0.0.0.0`
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the built output

There is no lint, format, or test tooling configured. Do not invent scripts;
if you need a check, ask the user first. Node `^22.18.0 || >=24.12.0`.

## Source of truth

`PRD.md`, `DESIGN.md`, and `PLANNING.md` are the canonical specs. If code and
docs disagree, update one of them in the same change. Read the relevant doc
before making structural changes.

## Architecture

Layers, innermost to outermost. Dependencies point inward only.

1. `src/data` — plain JSON content (`profile.json`, `projects.json`). No imports.
2. `src/lib` — pure, Vue-free functions (`files.js`, `commands.js`, `highlight.js`).
3. `src/stores`, `src/composables` — reactive state and reusable logic. May import
   lib/data; never components.
4. `src/components` — presentation. May import all lower layers.

Key modules:

- `src/lib/files.js` — the file tree is the single source of labels, icons,
  routes, and paths. Sidebar, tabs, and breadcrumbs derive from it. Never
  hardcode a route in a component.
- `src/stores/workspace.js` — UI state only (`activeRoute`, `openTabs`,
  `heroMode`, `sidebarOpen`, `paletteOpen`, `notice`). Content comes from data
  files; derived values are computed in `lib`.
- `src/router/index.js` — routes are lazy-loaded; `afterEach` syncs the store
  and document title.

Import alias `@` resolves to `src` (configured in `vite.config.js` and
`jsconfig.json`).

## Conventions

- Vue SFCs use `<script setup>`; declare props and emits explicitly.
- No semicolons, single quotes, 2-space indent, trailing commas.
- File names: PascalCase components, camelCase modules, kebab-case CSS.
- No comments unless they explain a non-obvious decision.
- All user-facing copy belongs in `src/data/*.json`, not in components.
- Styling is plain CSS with custom properties from
  `src/assets/styles/tokens.css`. No CSS framework, no hardcoded colors.
- Dependencies are guilty until proven necessary: one router, no UI framework,
  no highlighting library (the JSON renderer in `lib/highlight.js` is custom).

## Constraints

- Do not add editor-emulation features beyond the shell (no resizable panels,
  terminals, auth, or backend). See the non-goals in `PRD.md`.
- Preserve accessibility: one `<h1>` per view, semantic landmarks, visible
  focus, `prefers-reduced-motion`, `aria-hidden` JSON hero.
- No horizontal scroll at any width; touch targets >= 44px; test mobile.

## Commits

Follow the existing convention: `vX.Y.Z - Stable|Unstable - <description>`.
Only commit when the user asks.
