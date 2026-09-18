# Planning and Outline — Developer Portfolio

Status: Draft
Date: 2026-09-18
Related docs: `PRD.md`, `DESIGN.md`

This document breaks the product into components, defines the task list, and
gives a strict build order. Tasks are meant to be done top to bottom; each
phase ends at a gate that must pass before the next phase starts.

## 1. Phase 0 — Decisions and setup

Lock these before writing feature code.

- **D-1 Router:** add `vue-router` as the single new runtime dependency for
  deep-linkable files. Alternative: a zero-dependency hash router, at the cost
  of some routing ergonomics. Decision: use `vue-router`.
- **D-2 Syntax highlighting:** do not add a general highlighter. Write a small
  JSON renderer that emits token spans. Decision: custom renderer.
- **D-3 Icons and font:** use Codicons (icon font or SVG set) and one
  monospace font (for example Fira Code). Decision: Codicons plus Fira Code.
- **D-4 Styling:** plain CSS with custom properties and scoped component
  styles. No CSS framework. Decision: plain CSS.
- **D-5 State:** a single lightweight reactive store module plus composables.
  No Pinia. Decision: reactive store module.
- **D-6 Prerender:** add prerendering at build time if cheap; otherwise ensure
  readable hero markup is in `index.html`/server output. Decision: prerender
  hero content if the build plugin stays lightweight, else static fallback.

## 2. Component inventory

Grouped by responsibility. Contracts are defined in `DESIGN.md`.

### Layout shell

- `EditorShell.vue` — top-level grid, composes title bar, activity bar,
  sidebar, editor, status bar.
- `TitleBar.vue` — window controls and document title.
- `ActivityBar.vue` — vertical icon strip; toggles the sidebar.
- `StatusBar.vue` — branch label, resume shortcut, theme toggle.

### Sidebar

- `Sidebar.vue` — container and scroll region.
- `FileTree.vue` — renders the tree from data.
- `FileTreeItem.vue` — one file or folder row; active state; keyboard support.

### Editor

- `EditorArea.vue` — renders the active view.
- `EditorTabs.vue` — open tabs for visited files.
- `Breadcrumbs.vue` — path of the active file.

### Content views

- `AboutView.vue` — orchestrates reader and JSON layers.
- `AboutReader.vue` — plain, scannable intro.
- `AboutJson.vue` — literal JSON rendering using the token renderer.
- `ProjectsView.vue` — project list.
- `ProjectDetail.vue` — one project case study.
- `ResumeView.vue` — resume action and preview fallback.
- `ContactView.vue` — email and links, copy action.
- `NotFoundView.vue` — unknown file or route.

### UI primitives

- `CommandPalette.vue` — overlay, filtering, keyboard navigation.
- `AppButton.vue` — primary and secondary button.
- `AppIcon.vue` — icon wrapper for Codicons.
- `Toggle.vue` — reader/JSON toggle control.
- `CopyButton.vue` — copy-to-clipboard with feedback.
- `Drawer.vue` — mobile sidebar drawer.

## 3. Task list (ordered)

### Phase 1 — Shell and navigation skeleton

- [ ] T-1.1 Install and configure `vue-router`; create the route map from the
  file tree in `DESIGN.md`.
- [ ] T-1.2 Create `src/data/profile.json` and `src/data/projects.json` with
  placeholder content matching the schemas in `DESIGN.md`.
- [ ] T-1.3 Create the design tokens file and base styles (colors, typography,
  spacing, editor metrics).
- [ ] T-1.4 Build `EditorShell.vue` with a CSS grid matching the VS Code
  layout; render empty regions with correct dimensions.
- [ ] T-1.5 Build `TitleBar.vue`, `ActivityBar.vue`, and `StatusBar.vue` as
  static presentational components.
- [ ] T-1.6 Build `FileTree.vue` and `FileTreeItem.vue` from the data model;
  wire selection to router navigation.
- [ ] T-1.7 Build `EditorTabs.vue` and `Breadcrumbs.vue`; reflect the active
  route.
- [ ] T-1.8 Verify keyboard navigation through the tree; active state is
  visible.

Gate 1: navigating between the four entries changes the URL and the active
highlight. No content views yet.

### Phase 2 — Hero with reader/JSON toggle

- [ ] T-2.1 Build `AboutReader.vue` with name, role, summary, quick facts, and
  Resume and Contact actions.
- [ ] T-2.2 Write the JSON token renderer in `src/lib/highlight.js`; it must
  produce safe, escaped, tokenized output.
- [ ] T-2.3 Build `AboutJson.vue` rendering `profile.json` through the token
  renderer.
- [ ] T-2.4 Build `Toggle.vue` and wire reader/JSON state in `AboutView.vue`;
  default to reader.
- [ ] T-2.5 Ensure the plain reader content is present for crawlers and
  assistive technology, and the JSON block is `aria-hidden`.

Gate 2: the 30-second test passes in a rough form on desktop. Toggle works and
persists for the session.

### Phase 3 — Projects, resume, contact

- [ ] T-3.1 Build `ProjectsView.vue` from `projects.json`.
- [ ] T-3.2 Build `ProjectDetail.vue` and wire per-project routes.
- [ ] T-3.3 Build `ResumeView.vue` and implement PDF download.
- [ ] T-3.4 Build `ContactView.vue` with `mailto:` and `CopyButton.vue`.
- [ ] T-3.5 Build `NotFoundView.vue` for unknown routes.
- [ ] T-3.6 Add a real `resume.pdf` to the static assets.

Gate 3: all four sidebar entries and all project links resolve and render.

### Phase 4 — Command palette

- [ ] T-4.1 Define the command registry in `src/lib/commands.js` (id, label,
  keywords, run).
- [ ] T-4.2 Build `CommandPalette.vue`: open/close, filter, arrow and Enter
  handling, `Escape` to dismiss.
- [ ] T-4.3 Wire `Ctrl+K` / `Cmd+K` globally; restore focus on close.
- [ ] T-4.4 Register commands: navigate to each section, open resume, copy
  email, toggle JSON view.

Gate 4: every command works from the palette with keyboard only, and focus
returns correctly.

### Phase 5 — Responsive and mobile drawer

- [ ] T-5.1 Add breakpoints and a mobile layout mode.
- [ ] T-5.2 Build `Drawer.vue`; collapse the sidebar behind the activity bar
  toggle on small screens.
- [ ] T-5.3 Make the editor area a normal scroll region on mobile; remove any
  fixed heights that break scrolling.
- [ ] T-5.4 Make the command palette usable on touch (tap targets, safe-area
  insets).
- [ ] T-5.5 Test on real iOS and Android devices.

Gate 5: no horizontal scroll; the 30-second test passes on mobile.

### Phase 6 — Accessibility, SEO, performance

- [ ] T-6.1 Audit headings, landmarks, labels, and focus order.
- [ ] T-6.2 Add `prefers-reduced-motion` handling.
- [ ] T-6.3 Verify contrast against WCAG AA.
- [ ] T-6.4 Add title, description, canonical, and Open Graph tags; verify link
  previews.
- [ ] T-6.5 Lazy-load non-critical views and the highlighter; measure bundle
  size.
- [ ] T-6.6 Run a Lighthouse pass on desktop and mobile; record scores.

Gate 6: accessibility and performance targets met; no serious Lighthouse
issues.

### Phase 7 — Usability test and refinement

- [ ] T-7.1 Run the 30-second test with a non-technical person, unaided.
- [ ] T-7.2 Record friction points and fix the highest-impact one.
- [ ] T-7.3 Re-run the test to confirm the fix.
- [ ] T-7.4 Freeze content and ship.

Gate 7: the primary success criterion passes on desktop and mobile.

## 4. Dependencies

- Phase 2 depends on Phase 1 (shell, data, tokens).
- Phase 3 depends on Phase 1; it can partly run parallel to Phase 2.
- Phase 4 depends on Phases 1 and 3 (needs routes and actions).
- Phase 5 depends on Phases 1 through 4 (all surfaces must exist first).
- Phase 6 depends on all prior phases.
- Phase 7 is last and blocks release.

## 5. Definition of done

- All functional requirements in `PRD.md` are implemented or explicitly
  deferred.
- The 30-second test passes, unaided, on desktop and mobile.
- Accessibility and SEO checks pass.
- Content is editable through data files only.
- No scope from the non-goals list has crept in.
