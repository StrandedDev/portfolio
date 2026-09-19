# Planning and Outline — Developer Portfolio (v2)

Status: Active
Date: 2026-09-19
Version: 2.0
Related docs: `PRD.md`, `DESIGN.md`, `AGENTS.md`

This document breaks v2 into components, defines the task list, and gives a
strict build order. Tasks are meant to be done top to bottom; each phase ends at
a gate that must pass before the next phase starts.

## 1. v1 status

v1 shipped at `v1.1.6`: the editor shell, routing, the hero reader/JSON toggle,
projects, resume, contact, the command palette, a mobile drawer, and an
accessibility, SEO, and performance pass. It is structurally complete but empty,
low-impact, and loses its editor identity on mobile. Its task list is closed and
has been removed; v2 supersedes it.

## 2. Phase 0 — Decisions for v2

Lock these before writing feature code.

- **D-1 Scope boundary.** Per `PRD.md` section 5: collapsible panels and a
  presentational terminal are in. Drag-to-resize splits, editable files, extra
  themes, a blog, auth, and any backend are out.
- **D-2 Mobile navigation.** The bottom activity bar is the single primary
  navigation and carries Explore, About, Contact, Projects, and Education. The
  command palette is a desktop entry point reached from the activity bar search
  affordance; it is not part of the mobile bar. Decision: bottom-bar primary.
- **D-3 Hero entrance.** Dropped by owner decision. The hero renders the
  readable view directly on load; no JSON entrance animation ships.
- **D-4 Terminal.** Presentational only; canned output; never executes
  commands.
- **D-5 Collapse.** The sidebar collapses and expands; no drag-to-resize.
- **D-6 Content gate.** Publish only projects the candidate can defend unaided.
  Empty sections use honest in-progress states; no placeholder content ships.

## 3. Component inventory (v2 deltas)

New or changed relative to `DESIGN.md` section 7.

- `TerminalPanel.vue` — presentational terminal rendering canned output.
- `EducationView.vue` — education and achievements.
- `ActivityBar.vue` — doubles as the mobile bottom bar.
- `EditorShell.vue` — collapse-aware layout and terminal region.
- `workspace.js` — adds `sidebarCollapsed`, `terminalOpen`.

## 4. Task list (ordered)

### Phase 1 — Docs and scope reconciliation

- [x] T-1.1 Rewrite `PRD.md` for v2, including the section 5 scope boundary.
- [x] T-1.2 Update `DESIGN.md`: principles, structure, data model, component
  contracts, responsive and accessibility strategy.
- [x] T-1.3 Update `AGENTS.md`: data layer, store state, and constraints.
- [x] T-1.4 Remove the completed v1 task lists from `PLANNING.md`.

Gate 1: `PRD.md`, `DESIGN.md`, `PLANNING.md`, and `AGENTS.md` agree on scope,
components, and mobile navigation.

### Phase 2 — Content pipeline

- [x] T-2.1 Replace `profile.json` placeholders with real name, role, summary,
  location, quick facts, email, and links.
- [x] T-2.2 Add `education.json`, the `education.md` file tree entry, the
  `/education` route, and `EducationView`.
- [ ] T-2.3 Add a real, downloadable `resume.pdf`.
- [ ] T-2.4 Publish one to two defensible projects with a short write-up each.
  Demo-only placeholders live in `projects.dev.json` (DEV builds only) and must
  be replaced before the Phase 8 freeze.
- [x] T-2.5 Implement honest in-progress states for sections without content.

Gate 2: no placeholder content remains; every published project is defensible;
the resume downloads.

### Phase 3 — Mobile redesign

- [x] T-3.1 Make the bottom activity bar the single primary navigation with
  Explore, About, Contact, Projects, and Education.
- [x] T-3.2 Add a desktop activity-bar search affordance that opens the command
  palette; keep the palette out of the mobile bar.
- [x] T-3.3 Keep Resume and the contact action in the hero; no separate mobile
  action bar.
- [x] T-3.4 Render reader content in the editor area; keep the bottom activity
  bar as the primary navigation and retire the v1 drawer-as-primary-nav model.
- [x] T-3.5 Verify no horizontal scroll at 320px and 44px touch targets.

Gate 3: mobile keeps the editor identity in an unaided first impression; the
30-second test passes on mobile; no horizontal scroll at 320px.

### Phase 4 — Hero entrance (dropped)

- [x] T-4.1 ~~Implement the profile JSON resolving into the readable hero.~~
- [x] T-4.2 ~~Play once per session via `heroEntered`; disable under
  `prefers-reduced-motion`; verify no layout shift.~~

Gate 4: dropped by owner decision. The hero loads directly into the readable
view; no JSON entrance animation ships.

### Phase 5 — Collapsible panels

- [x] T-5.1 Add `sidebarCollapsed` state and a collapse/expand control.
- [x] T-5.2 Register the `view.toggle-sidebar` palette command.

Gate 5: the sidebar collapses and expands with no drag-to-resize; state is
consistent across reload and routes.

### Phase 5.5 — Shell refinements

- [x] T-5.5.1 Remove the title bar; move the command palette trigger into the
  activity bar as a persistent search affordance.
- [x] T-5.5.2 Default the sidebar to collapsed so the hero gets more width.
- [x] T-5.5.3 Word-wrap the `about.json` rendering; no horizontal scroll.
- [x] T-5.5.4 Use a graduation cap icon for education and distinct icons for
  the command palette (search) and the terminal.

Gate 5.5: no title bar remains, the palette opens from the activity bar, the
sidebar starts collapsed, and `about.json` wraps without horizontal scroll.

### Phase 6 — Terminal view

- [x] T-6.1 Build `TerminalPanel` rendering canned output.
- [x] T-6.2 Add `terminalOpen` state, a trigger, and the
  `view.toggle-terminal` palette command.
- [x] T-6.3 Confirm it accepts no input and never executes commands.

Gate 6: the terminal renders canned output, is clearly non-interactive, and
cannot run anything.

### Phase 7 — Accessibility, SEO, performance

- [x] T-7.1 Audit headings, landmarks, labels, and focus order, including the
  mobile bottom nav landmark.
- [x] T-7.2 Verify contrast against WCAG AA.
- [x] T-7.3 Verify title, description, canonical, and Open Graph tags and link
  previews.
- [x] T-7.4 Lazy-load non-critical views and the highlighter; measure bundle
  size.
- [x] T-7.5 Run a Lighthouse pass on desktop and mobile; record scores.

Phase 7 results (production build, `vite preview`, Lighthouse 12.8.2,
headless Chrome):

| Category | Desktop | Mobile |
| --- | --- | --- |
| Performance | 100 | 99 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |

- FCP 0.3s / LCP 0.5s / TBT 0ms / CLS 0 desktop; FCP 1.2s / LCP 2.0s /
  TBT 10ms / CLS 0 mobile.
- Only failing audit is `bf-cache` (reason "Internal error", not actionable).
- Main bundle 52.44 kB gzip; each route is a separate 0.5–1.6 kB gzip chunk;
  the JSON highlighter ships only in the lazy `AboutJson` chunk.
- Fixes applied: real name/role/description/Open Graph tags and no-JS fallback
  in `index.html` (was placeholder "Alex Rivera"); dark status-bar background
  darkened to meet WCAG AA contrast; invalid `aria-label` on the terminal `<pre>`
  given `role="group"`; editor tabs changed from `role="tablist"` (intermediate
  wrapper and close buttons broke required children) to a labelled `role="toolbar"`.
- Reports: `lighthouse_localhost_4173-desktop-20260919.json`,
  `lighthouse_localhost_4173-mobile-20260919.json`.

Gate 7: accessibility and performance targets met; no serious Lighthouse
issues. **Passed.**

### Phase 8 — Usability test and refinement

- [ ] T-8.1 Run the 30-second test with a non-technical person, unaided, on
  desktop and mobile. **Blocked: requires a human participant.**
- [ ] T-8.2 Confirm mobile preserves the editor identity unaided. **Blocked:
  requires a human participant.**
- [ ] T-8.3 Record friction points and fix the highest-impact one. Heuristic
  review done; human-observed friction pending T-8.1.
- [ ] T-8.4 Re-run the test to confirm the fix. **Blocked: depends on T-8.1.**
- [ ] T-8.5 Freeze content and ship. **Blocked: `public/resume.pdf` is still the
  placeholder ("Alex Rivera") and `projects.json` is empty. T-2.3 and T-2.4 must
  close first.**

Heuristic review (no participant yet):

- Desktop and mobile first render show name, role, summary, Resume, and the
  Hire-me `mailto:` action immediately; both calls to action are visible without
  scrolling, so the 30-second path looks intact.
- Mobile keeps the bottom activity bar as the single primary navigation and
  renders reader content in the editor area; the editor identity survives.
- Highest-impact controllable friction is content, not layout: a downloaded
  resume names the wrong person, and Projects shows the honest empty state. Both
  are Phase 2 blockers, not Phase 8 fixes.

Gate 8: the primary success criterion passes on desktop and mobile. **Not yet
passed — pending the human test in T-8.1 and the content freeze in T-8.5.**

## 5. Dependencies

- Phase 2 depends on Phase 1 (docs and scope) and can run parallel to Phases 3
  through 6.
- Phase 3 depends on Phase 1; it needs the reader content from Phase 2 to be
  worth testing, but the layout work can start earlier.
- Phase 4 depends on Phase 2 (real profile data) and Phase 3 (mobile layout).
- Phase 5 depends on Phase 1 and the existing shell.
- Phase 6 depends on Phase 1 and the existing shell.
- Phase 7 depends on Phases 2 through 6.
- Phase 8 is last and blocks release.

## 6. Definition of done

- All functional requirements in `PRD.md` are implemented or explicitly
  deferred.
- The 30-second test passes, unaided, on desktop and mobile.
- Mobile retains the editor identity in an unaided first impression.
- Every published project is defensible in an interview.
- Accessibility, SEO, and performance checks pass.
- Content is editable through data files only.
- No capability outside the `PRD.md` section 5 boundary has crept in.
