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

1. `src/data` — plain JSON content (`profile.json`, `projects.json`,
   `education.json`). No imports. `projects.dev.json` holds demo-only
   placeholders loaded under `import.meta.env.DEV` only; production renders
   `projects.json` and its honest in-progress state.
2. `src/lib` — pure, Vue-free functions (`files.js`, `commands.js`, `highlight.js`).
3. `src/stores`, `src/composables` — reactive state and reusable logic. May import
   lib/data; never components.
4. `src/components` — presentation. May import all lower layers.

Key modules:

- `src/lib/files.js` — the file tree is the single source of labels, icons,
  routes, and paths. Sidebar, tabs, and breadcrumbs derive from it. Never
  hardcode a route in a component.
- `src/stores/workspace.js` — UI state only (`activeRoute`, `openTabs`,
  `heroMode`, `heroEntered`, `sidebarOpen`, `sidebarCollapsed`, `terminalOpen`,
  `paletteOpen`, `notice`). Content comes from data files; derived values are
  computed in `lib`. The color theme is a root `data-theme` attribute persisted
  to `localStorage`, not store state.
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

- Stay inside the scope boundary in `PRD.md` section 5. Collapsible panels and a
  presentational terminal are allowed. Drag-to-resize splits, editable files,
  extra themes, a blog, auth, and any backend are not.
- The terminal never executes commands; it renders canned output only.
- Mobile uses the bottom activity bar as the single primary navigation; the
  command palette is a secondary entry point. Do not add a competing nav model.
- Preserve accessibility: one `<h1>` per view, semantic landmarks, visible
  focus, `prefers-reduced-motion`, `aria-hidden` JSON hero.
- No horizontal scroll at any width; touch targets >= 44px; test mobile.
- No placeholder content in production; empty sections use honest in-progress
  states.

## Commits

Follow the existing convention: `vX.Y.Z - Stable|Unstable - <description>`.
Only commit when the user asks.
