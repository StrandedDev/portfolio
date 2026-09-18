# Design and Architecture — Developer Portfolio

Status: Draft
Date: 2026-09-18
Related docs: `PRD.md`, `PLANNING.md`

This document defines the architecture, structure, data model, component
contracts, and conventions. It is the source of truth for how the code is
organized. If code and this document disagree, one of them must be updated.

## 1. Design principles

1. **Reader first.** The plain, scannable surface is the default. The editor
   costume never blocks the primary task.
2. **One real interaction.** The command palette is the only "real" feature.
   Resist adding more.
3. **Data over code.** Copy and projects live in data files. Components render
   data; they do not own content.
4. **One responsibility per component.** If a component renders and fetches and
   transforms, split it.
5. **Semantics survive the costume.** The DOM has real landmarks and headings
   even though it looks like an editor.
6. **Dependencies are guilty until proven necessary.** One router, no UI
   framework, no highlighter library.

## 2. Directory structure

```
src/
  main.js                     app entry
  App.vue                     root component
  router/
    index.js                  route map
  data/
    profile.json              profile content
    projects.json             project content
  stores/
    workspace.js              reactive app state
  lib/
    highlight.js              JSON token renderer
    commands.js               command registry
    files.js                  file tree data + route helpers
  composables/
    useCommandPalette.js      open/close + shortcut
    useMediaQuery.js          responsive queries
    useClipboard.js           copy with feedback
  components/
    layout/
      EditorShell.vue
      TitleBar.vue
      ActivityBar.vue
      StatusBar.vue
    sidebar/
      Sidebar.vue
      FileTree.vue
      FileTreeItem.vue
    editor/
      EditorArea.vue
      EditorTabs.vue
      Breadcrumbs.vue
    content/
      AboutView.vue
      AboutReader.vue
      AboutJson.vue
      ProjectsView.vue
      ProjectDetail.vue
      ResumeView.vue
      ContactView.vue
      NotFoundView.vue
    ui/
      CommandPalette.vue
      Drawer.vue
      Toggle.vue
      AppButton.vue
      AppIcon.vue
      CopyButton.vue
  assets/
    styles/
      tokens.css              design tokens
      base.css                reset + base element styles
      editor.css              editor-specific shared styles
    fonts/                    monospace font files
```

## 3. Layering and dependency rules

Layers, from innermost to outermost:

1. **Data** (`src/data`) — plain JSON. No imports from other layers.
2. **Lib** (`src/lib`) — pure functions and constants. May import data and
   types. Must not import components or stores.
3. **Stores and composables** (`src/stores`, `src/composables`) — state and
   reusable reactive logic. May import lib and data. Must not import
   components.
4. **Components** (`src/components`) — presentation and interaction. May
   import all lower layers.

Rules:

- Dependencies point inward only. A lower layer never imports a higher one.
- `lib` functions are pure and unit-testable without Vue.
- Components do not read data files directly except view components; leaf UI
  primitives receive everything through props.

## 4. Data model

### 4.1 `profile.json`

```json
{
  "name": "Full Name",
  "role": "Software Engineer",
  "summary": "One or two sentences describing what you build.",
  "location": "City, Country",
  "facts": [
    { "label": "Focus", "value": "Front-end" },
    { "label": "Experience", "value": "3 years" }
  ],
  "email": "you@example.com",
  "resumePath": "/resume.pdf",
  "links": [
    { "label": "GitHub", "url": "https://github.com/username" },
    { "label": "LinkedIn", "url": "https://linkedin.com/in/username" }
  ]
}
```

### 4.2 `projects.json`

```json
{
  "projects": [
    {
      "id": "project-slug",
      "name": "Project Name",
      "summary": "One-line description.",
      "description": "A short paragraph about the problem and approach.",
      "stack": ["Vue", "Vite", "Node"],
      "role": "What you personally did.",
      "outcome": "Optional measurable result.",
      "links": [
        { "label": "Live", "url": "https://example.com" },
        { "label": "Code", "url": "https://github.com/username/repo" }
      ],
      "featured": true
    }
  ]
}
```

## 5. File tree and routing

The sidebar tree is derived from a single source in `src/lib/files.js` and maps
one-to-one onto routes.

| File tree entry | Route | Component |
| --- | --- | --- |
| `about.json` | `/about` (default) | `AboutView` |
| `projects/` | `/projects` | `ProjectsView` |
| `projects/:id` | `/projects/:id` | `ProjectDetail` |
| `resume.pdf` | `/resume` | `ResumeView` (also triggers download) |
| `contact.md` | `/contact` | `ContactView` |
| unknown | `/:pathMatch(.*)*` | `NotFoundView` |

Rules:

- `/` redirects to `/about`.
- The tree data is the only place that defines labels, icons, and paths.
- `FileTreeItem` never hardcodes a route; it receives it from the tree data.

## 6. State model

A single reactive store in `src/stores/workspace.js`:

- `activeRoute` — current route path, mirrored from the router.
- `openTabs` — list of visited file ids, in order.
- `heroMode` — `"reader"` or `"json"`; default `"reader"`.
- `sidebarOpen` — boolean, used by the mobile drawer.
- `paletteOpen` — boolean.

Actions: `openFile(id)`, `closeTab(id)`, `setHeroMode(mode)`,
`toggleSidebar()`, `openPalette()`, `closePalette()`.

The store holds UI state only. Content comes from data files; derived views
(for example, project lookup by id) are computed in `lib`, not stored.

## 7. Component contracts

### Layout

- `EditorShell` — no props. Composes the regions and provides layout context.
- `TitleBar` — props: `title: string`. Emits: none.
- `ActivityBar` — props: `active: string`. Emits: `select(sectionId)`.
- `StatusBar` — props: `branch: string`, `resumePath: string`. Emits:
  `open-resume`, `toggle-theme`.

### Sidebar

- `FileTree` — props: `nodes: FileNode[]`, `activeId: string`. Emits:
  `open(id)`.
- `FileTreeItem` — props: `node: FileNode`, `depth: number`,
  `active: boolean`. Emits: `open(id)`. Fully keyboard accessible.

`FileNode` shape:

```ts
{ id: string, label: string, kind: "file" | "folder", icon?: string, route?: string, children?: FileNode[] }
```

### Editor

- `EditorArea` — no props. Renders the active route's view via `RouterView`.
- `EditorTabs` — props: `tabs: FileNode[]`, `activeId: string`. Emits:
  `open(id)`, `close(id)`.
- `Breadcrumbs` — props: `path: string[]`. Emits: none.

### Content

- `AboutView` — no props. Reads the store and profile data.
- `AboutReader` — props: `profile: Profile`. Emits: `open-resume`,
  `open-contact`.
- `AboutJson` — props: `data: object`. Renders tokenized JSON; container is
  `aria-hidden`.
- `ProjectsView` — props: `projects: Project[]`. Emits: `open(id)`.
- `ProjectDetail` — props: `project: Project`. Emits: `open-link(url)`.
- `ResumeView` — props: `resumePath: string`. Emits: `download`.
- `ContactView` — props: `profile: Profile`. Emits: `copy(text)`.
- `NotFoundView` — props: `path: string`. Emits: `go-home`.

### UI primitives

- `CommandPalette` — props: `open: boolean`, `commands: Command[]`. Emits:
  `close`, `run(commandId)`.
- `Command` shape: `{ id: string, label: string, keywords?: string[], run: () => void }`.
- `Drawer` — props: `open: boolean`, `side: "left" | "right"`. Emits:
  `close`. Slot for content.
- `Toggle` — props: `modelValue: boolean`, `labels: [string, string]`. Emits:
  `update:modelValue`.
- `AppButton` — props: `variant: "primary" | "secondary"`, `href?: string`.
  Emits: `click`.
- `AppIcon` — props: `name: string`, `size?: number`. Emits: none.
- `CopyButton` — props: `text: string`, `label?: string`. Emits: `copied`.

## 8. Design tokens

Defined in `src/assets/styles/tokens.css` as CSS custom properties.

- **Color:** editor background, sidebar background, activity bar background,
  border, foreground, muted foreground, accent, active highlight, and a small
  syntax palette (key, string, number, boolean, punctuation).
- **Typography:** one UI sans stack and one monospace stack. Base size and
  line height tuned for editor density.
- **Spacing:** a 4px-based scale (`--space-1` through `--space-8`).
- **Editor metrics:** title bar height, activity bar width, sidebar width,
  status bar height, tab height.
- **Radii and shadows:** minimal; the editor aesthetic favors flat surfaces.
- **Motion:** short durations with an ease-out curve; disabled under
  `prefers-reduced-motion`.

A single light/dark pair is supported. Tokens are swapped at the root; no
component hardcodes a color.

## 9. Command palette contract

- Registry lives in `src/lib/commands.js`; each command is pure data plus a
  `run` callback that uses the store or router.
- Commands: `go.about`, `go.projects`, `go.resume`, `go.contact`,
  `action.download-resume`, `action.copy-email`, `view.toggle-json`.
- The palette filters by label and keywords, case-insensitively.
- Keyboard: `ArrowUp`/`ArrowDown` to move, `Enter` to run, `Escape` to close.
- Opening the palette traps focus; closing restores focus to the trigger.
- The palette is the single source of the "one real interaction" requirement.

## 10. Responsive strategy

- Desktop (>= 1024px): full grid — activity bar, sidebar, editor, status bar.
- Tablet (768px–1023px): sidebar narrower; tabs and breadcrumbs may collapse.
- Mobile (< 768px): activity bar becomes a top bar; sidebar becomes a
  `Drawer`; editor area scrolls normally; tabs collapse to a single label.

Rules:

- No fixed heights that prevent vertical scrolling on mobile.
- No horizontal scrolling at any width.
- Tap targets at least 44px on touch.

## 11. Accessibility strategy

- One `<h1>` per view; heading order is logical.
- Landmarks: `header`, `nav` for the file tree, `main` for the editor area,
  `contentinfo` for the status bar.
- The file tree uses `role="tree"` with `treeitem` children and roving
  tabindex.
- The command palette uses `role="dialog"` with `aria-modal` and a labelled
  listbox.
- The JSON hero is `aria-hidden`; its readable equivalent is always rendered in
  the DOM.
- Focus is always visible; no outline removal without a replacement.
- Contrast meets WCAG AA in both themes.

## 12. SEO and sharing strategy

- `index.html` sets `lang`, a real `<title>`, meta description, canonical URL,
  and Open Graph plus Twitter card tags.
- The hero's readable content is present in the initial HTML or prerendered at
  build time so crawlers and link previews see it.
- A static fallback inside `#app` mirrors the hero for no-JS and crawler
  scenarios.

## 13. Testing strategy

- **Unit:** pure functions in `lib` (highlight, files, commands) tested
  directly. No Vue needed.
- **Component:** view components rendered with fixture data; assert text and
  actions, not implementation details.
- **Manual:** the 30-second usability test is the acceptance test and is run at
  Phase 7 in `PLANNING.md`.
- **Automated checks:** Lighthouse for performance and accessibility at
  Phase 6.

## 14. Conventions

- Vue single-file components with `<script setup>`.
- File names are PascalCase for components, camelCase for modules, kebab-case
  for CSS files.
- Props are declared with types and defaults; emits are declared explicitly.
- Import alias `@` resolves to `src` (already configured in `vite.config.js`
  and `jsconfig.json`).
- No comments unless they explain a non-obvious decision.
- Commit messages follow the repository's existing convention.
