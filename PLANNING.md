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

### Phase 3.5 — UI audit fixes (blocking Phase 4)

- [x] T-3.5.1 Fix the tab close transition. `.tab-leave-active` keeps the
  closing tab in flow and `overflow-x: auto` clips its `translateY(6px)`, so
  the tab slides over the breadcrumb row and the remaining tabs jump instead
  of moving. Add `position: relative` to `.editor-tabs__track`,
  `position: absolute` to `.tab-leave-active`, and a `.tab-move` transition.
- [x] T-3.5.2 Give `EditorTabs` real tab keyboard support (Left/Right/Home/End
  with a roving `tabindex`, `Delete` to close) and scroll the active tab into
  view when it opens off-screen.
- [x] T-3.5.3 Fix `StatusBar.vue` branch button: it emits `open-resume`, so
  clicking the branch name downloads the resume.
- [x] T-3.5.4 Stop downloading the resume on every route or tab open; make the
  download an explicit action from the Resume view and status bar only.
- [x] T-3.5.5 Fix sidebar truncation: `.tree-item__label` is a flex child
  without `min-width: 0`, so `text-overflow: ellipsis` never triggers and long
  file names overflow the panel.
- [x] T-3.5.6 Remove the duplicate `<h1>` on the About view (hidden heading in
  `AboutView.vue` plus the visible one in `AboutReader.vue`).
- [x] T-3.5.7 Add a skip link to `#main` and give the target
  `scroll-margin-top`.
- [x] T-3.5.8 Keep the focus ring visible on the blue status bar and accent
  buttons; the default `--color-focus` ring disappears against those surfaces.
- [x] T-3.5.9 Add `<meta name="theme-color">` and preload the Fira Code font.
- [x] T-3.5.10 Mark code, file names, and the email with `translate="no"`; add
  `touch-action: manipulation` and an intentional tap highlight.
- [x] T-3.5.11 Apply `text-wrap: balance`/`pretty` to headings, and decide the
  fate of the non-functional File/Edit/View title-bar menus.

Gate 3.5: closing a tab animates without overlap or jump; keyboard-only tab
navigation works; no label overflows or duplicate headings.

### Phase 4 — Command palette

- [x] T-4.1 Define the command registry in `src/lib/commands.js` (id, label,
  keywords, run).
- [x] T-4.2 Build `CommandPalette.vue`: open/close, filter, arrow and Enter
  handling, `Escape` to dismiss.
- [x] T-4.3 Wire `Ctrl+K` / `Cmd+K` globally; restore focus on close.
- [x] T-4.4 Register commands: navigate to each section, open resume, copy
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
- Phase 3.5 depends on Phase 3 (audits the rendered surfaces).
- Phase 4 depends on Phases 1, 3, and 3.5 (needs routes, actions, and a stable
  tab/layout layer).
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
