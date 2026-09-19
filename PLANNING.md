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
  navigation; the command palette is a secondary entry point reached from a
  persistent search affordance. Decision: bottom-bar primary.
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

- [x] T-3.1 Make the bottom activity bar the single primary navigation.
- [x] T-3.2 Add a persistent search affordance that opens the command palette.
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

### Phase 6 — Terminal view

- [ ] T-6.1 Build `TerminalPanel` rendering canned output.
- [ ] T-6.2 Add `terminalOpen` state, a trigger, and the
  `view.toggle-terminal` palette command.
- [ ] T-6.3 Confirm it accepts no input and never executes commands.

Gate 6: the terminal renders canned output, is clearly non-interactive, and
cannot run anything.

### Phase 7 — Accessibility, SEO, performance

- [ ] T-7.1 Audit headings, landmarks, labels, and focus order, including the
  mobile bottom nav landmark.
- [ ] T-7.2 Verify contrast against WCAG AA.
- [ ] T-7.3 Verify title, description, canonical, and Open Graph tags and link
  previews.
- [ ] T-7.4 Lazy-load non-critical views and the highlighter; measure bundle
  size.
- [ ] T-7.5 Run a Lighthouse pass on desktop and mobile; record scores.

Gate 7: accessibility and performance targets met; no serious Lighthouse
issues.

### Phase 8 — Usability test and refinement

- [ ] T-8.1 Run the 30-second test with a non-technical person, unaided, on
  desktop and mobile.
- [ ] T-8.2 Confirm mobile preserves the editor identity unaided.
- [ ] T-8.3 Record friction points and fix the highest-impact one.
- [ ] T-8.4 Re-run the test to confirm the fix.
- [ ] T-8.5 Freeze content and ship.

Gate 8: the primary success criterion passes on desktop and mobile.

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
