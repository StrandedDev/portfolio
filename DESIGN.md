# Design and Architecture — Developer Portfolio

Status: Active
Date: 2026-09-19
Version: 2.0
Related docs: `PRD.md`, `PLANNING.md`, `AGENTS.md`

This document defines the architecture, structure, data model, component
contracts, and conventions. It is the source of truth for how the code is
organized. If code and this document disagree, one of them must be updated.

## 1. Design principles

1. **Reader first.** The plain, scannable surface is the default. The editor
   costume never blocks the primary task.
2. **Convert, don't impress.** Every surface serves the recruiter's 30-second
   task. The command palette is the signature interaction; the terminal
   supports it without competing for attention.
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
    projects.dev.json         demo-only placeholders (DEV builds only)
    education.json            education content
    terminal.json             presentational terminal output
  stores/
    workspace.js              reactive app state
  lib/
    highlight.js              JSON token renderer
    commands.js               command registry
    files.js                  file tree data + route helpers
    icons.js                  inline SVG icon paths (derived from Codicons)
  composables/
    useCommandPalette.js      open/close + shortcut
    useMediaQuery.js          responsive queries
    useClipboard.js           copy with feedback
  components/
    layout/
      EditorShell.vue
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
      TerminalPanel.vue
    content/
      AboutView.vue
      AboutReader.vue
      AboutJson.vue
      ProjectsView.vue
      ProjectDetail.vue
      ResumeView.vue
      ContactView.vue
      EducationView.vue
      NotFoundView.vue
    ui/
      CommandPalette.vue
      Drawer.vue
      Toggle.vue
      AppButton.vue
      AppIcon.vue
      CopyButton.vue
      Toast.vue
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
      "featured": true,
      "image": "/projects/project-slug.png"
    }
  ]
}
```

`projects.dev.json` mirrors this shape and is loaded only when
`import.meta.env.DEV` is true and it is non-empty. It never renders in
production builds; production always uses `projects.json`.

### 4.3 `education.json`

```json
{
  "institution": "University Name",
  "degree": "BSc Computer Science",
  "graduation": "Expected 2027",
  "location": "City, Country",
  "coursework": ["Data Structures", "Web Development"],
  "achievements": [
    { "label": "Hackathon", "value": "2nd place, 2025" }
  ]
}
```

### 4.4 `terminal.json`

```json
{
  "lines": ["$ whoami", "front-end developer", "$ cat note.txt", "Static text; no input is accepted."]
}
```

Rendered verbatim by `TerminalPanel` as canned output. It is never executed.

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
| `education.md` | `/education` | `EducationView` |
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
- `sidebarCollapsed` — boolean, desktop collapse state; default `false`.
- `terminalOpen` — boolean, presentational terminal visibility; default `false`.
- `paletteOpen` — boolean.
- `notice` — transient status message string, empty when none.

Actions: `openFile(id)`, `closeTab(id)`, `setHeroMode(mode)`,
`toggleSidebar()`, `toggleSidebarCollapsed()`,
`toggleTerminal()`, `openPalette()`, `closePalette()`, `showNotice(text)`,
`clearNotice()`.

The store holds UI state only. Content comes from data files; derived views
(for example, project lookup by id) are computed in `lib`, not stored. The
color theme is a root `data-theme` attribute owned by the shell and persisted
to `localStorage`; it is not store state.

## 7. Component contracts

### Layout

- `EditorShell` — no props. Composes the regions and provides layout context.
- `ActivityBar` — props: `active: string`, `sidebarOpen: boolean`,
  `terminalOpen: boolean`. Emits: `select(sectionId)`. Renders as the vertical
  strip on desktop and as the bottom bar on mobile. On desktop it carries the
  command palette trigger and the Explorer toggle, with the terminal toggle at
  the bottom of the strip. On mobile the bottom bar is the single primary
  navigation and shows only Explore, About, Contact, Projects, and Education;
  the palette trigger, Resume, and the terminal are desktop-only.
- `StatusBar` — props: `branch: string`, `file: string`,
  `resumePath: string`. Emits: `open-resume`, `toggle-theme`.

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
- `TerminalPanel` — props: `open: boolean`, `lines: string[]`. Emits: `close`.
  Presentational only; it renders canned output and never executes commands.

### Content

- `AboutView` — no props. Reads the store and profile data.
- `AboutReader` — props: `profile: Profile`. Emits: `open-resume`. The contact
  action is a prefilled `mailto:` link built from the profile.
- `AboutJson` — props: `data: object`. Renders tokenized JSON; container is
  `aria-hidden`.
- `ProjectsView` — props: `projects: Project[]`. Emits: `open(id)`.
- `ProjectDetail` — props: `project: Project`. Emits: `open-link(url)`.
- `ResumeView` — props: `resumePath: string`. Emits: `download`.
- `ContactView` — no props; reads profile data. Emits: none. Email copies to the
  clipboard with a toast; a Ping button opens a prefilled `mailto:`; the
  WhatsApp number stays masked until the row is activated; the WhatsApp, GitHub,
  and Codeforces rows are whole-row links.
- `EducationView` — props: `education: Education`. Emits: none.
- `NotFoundView` — props: `path: string`. Emits: `go-home`.

### UI primitives

- `CommandPalette` — props: `open: boolean`, `commands: Command[]`. Emits:
  `close`, `run(commandId)`.
- `Command` shape: `{ id: string, label: string, keywords?: string[], run: () => void }`.
- `Drawer` — props: `open: boolean`, `side: "left" | "right"`,
  `label?: string`. Emits: `close`. Slot for content.
- `Toggle` — props: `modelValue: boolean`, `labels: [string, string]`. Emits:
  `update:modelValue`.
- `AppButton` — props: `variant: "primary" | "secondary"`, `href?: string`.
  Emits: `click`.
- `AppIcon` — props: `name: string`, `size?: number`. Renders an inline SVG
  from `src/lib/icons.js`; no icon font is loaded. Emits: none.
- `CopyButton` — props: `text: string`, `label?: string`. Emits: `copied`.
- `Toast` — props: `message: string`. Emits: none. Renders a transient
  `role="status"` notice.

## 8. Design tokens

Defined in `src/assets/styles/tokens.css` as CSS custom properties.

- **Color:** editor background, sidebar background, activity bar background,
  border, foreground, muted foreground, accent, active highlight, and a small
  syntax palette (key, string, number, boolean, punctuation).
- **Typography:** one UI sans stack and one monospace stack. Base size and
  line height tuned for editor density.
- **Spacing:** a 4px-based scale (`--space-1` through `--space-8`).
- **Editor metrics:** activity bar width, sidebar width, status bar height,
  tab height, mobile bottom bar height, terminal height.
- **Radii and shadows:** minimal; the editor aesthetic favors flat surfaces.
- **Motion:** short durations with an ease-out curve; disabled under
  `prefers-reduced-motion`.

A single light/dark pair is supported. Tokens are swapped at the root; no
component hardcodes a color.

## 9. Command palette contract

- Registry lives in `src/lib/commands.js`; each command is pure data plus a
  `run` callback that uses the store or router.
- Commands: `go.about`, `go.projects`, `go.education`, `go.resume`,
  `go.contact`, `action.download-resume`, `action.copy-email`,
  `action.toggle-theme`, `view.toggle-json`, `view.toggle-sidebar`,
  `view.toggle-terminal`.
- The palette filters by label and keywords, case-insensitively.
- Keyboard: `ArrowUp`/`ArrowDown` to move, `Enter` to run, `Escape` to close.
- Opening the palette traps focus; closing restores focus to the trigger.
- The palette is the signature interaction and a desktop entry point. The
  activity bar trigger and the palette footer both surface the toggle shortcut
  (`Ctrl+K` / `Cmd+K`). It is not part of the mobile bottom bar.

## 10. Responsive strategy

- Desktop (>= 1024px): full grid — activity bar, sidebar, editor, status bar.
  The sidebar collapses and expands; there is no drag-to-resize.
- Tablet (768px–1023px): sidebar narrower; tabs and breadcrumbs may collapse.
- Mobile (< 768px): the activity bar becomes a **bottom bar** and is the single
  primary navigation, carrying Explore, About, Contact, Projects, and Education.
  The file tree moves behind that bar as a `Drawer`. The editor area scrolls
  normally with reader content; the hero keeps Resume and a contact call to
  action one tap away. The status bar, the command palette trigger, Resume, and
  the terminal are desktop-only.

Rules:

- One primary navigation model on mobile: the bottom activity bar. The palette
  is an accelerator, never a competing nav. The file tree drawer is an
  extension of the bottom bar, not a second navigation model.
- No fixed heights that prevent vertical scrolling on mobile.
- No horizontal scrolling at any width.
- Tap targets at least 44px on touch.

## 11. Accessibility strategy

- One `<h1>` per view; heading order is logical.
- Landmarks: `header`, `nav` for the file tree, `main` for the editor area,
  `contentinfo` for the status bar.
- The mobile bottom bar is a labelled `nav` landmark. The palette trigger is a
  button on desktop, not a nav item, and does not appear in the mobile bar.
- The file tree uses `role="tree"` with `treeitem` children and roving
  tabindex.
- The command palette uses `role="dialog"` with `aria-modal` and a labelled
  listbox.
- The JSON hero is `aria-hidden`; its readable equivalent is always rendered in
  the DOM.
- The terminal is a labelled region rendering static text. It is not a live
  region and accepts no input.
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
  Phase 8 in `PLANNING.md`. Mobile identity is checked in the same pass.
- **Automated checks:** Lighthouse for performance and accessibility at
  Phase 7.
- **Content integrity:** no placeholder text ships; every published project is
  defensible in an interview.

## 14. Conventions

- Vue single-file components with `<script setup>`.
- File names are PascalCase for components, camelCase for modules, kebab-case
  for CSS files.
- Props are declared with types and defaults; emits are declared explicitly.
- Import alias `@` resolves to `src` (already configured in `vite.config.js`
  and `jsconfig.json`).
- No comments unless they explain a non-obvious decision.
- Commit messages follow the repository's existing convention.
