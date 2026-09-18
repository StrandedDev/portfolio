# Product Requirements Document — Developer Portfolio

Status: Draft
Date: 2026-09-18
Owner: Developer
Related docs: `PLANNING.md`, `DESIGN.md`

## 1. Overview

A personal developer portfolio presented as a VS Code–style editor. The site has
two audiences with opposite needs:

- **Recruiters / hiring managers** — must understand who the developer is and
  reach the resume and contact details in under 30 seconds.
- **Developers / peers** — should find the experience playful and interactive,
  with a command palette and an editor aesthetic that rewards exploration.

The design resolves this tension with a **dual-layer** approach: a plain,
scannable "reader" surface is the default, and the editor gimmick is layered on
top as an optional interaction.

## 2. Problem Statement

Most developer portfolios are either:

- A generic template that shows no engineering identity, or
- A heavily themed novelty (terminal, IDE clone) that is memorable to
  developers but hostile to a non-technical recruiter scanning on a phone.

The portfolio must signal "this person is a developer" without sacrificing the
recruiter's ability to complete the primary task.

## 3. Goals and Success Criteria

### Primary success criterion

A non-technical person, with no instructions, can find the resume and the
contact method within **30 seconds**, on both desktop and mobile.

This single criterion governs scope. Any feature that threatens it is cut or
deferred.

### Secondary goals

- Present projects clearly enough that a reviewer can understand scope, stack,
  and outcome for each.
- Demonstrate front-end competence through the shell's execution quality.
- Keep content maintainable through local data files.

### Non-goals (explicitly out of scope)

- Real editor emulation (draggable panels, resizable splits, settings,
  keybindings).
- A working terminal or shell emulator.
- Authentication, accounts, or any backend.
- A CMS or admin interface.
- Live coding, playgrounds, or embedded runtimes.

## 4. Target Users

### Primary: Recruiter / hiring manager

- Non-technical or semi-technical.
- Often on mobile, often time-constrained.
- Wants: name, role, summary, resume, contact, and a fast read on projects.

### Secondary: Developer / peer

- Technical, curious, evaluates craft.
- Wants: interaction, structure, and evidence of engineering taste.

## 5. User Stories

- As a recruiter, I want to see who this person is immediately, so I can decide
  whether to keep reading.
- As a recruiter, I want a resume download and contact details within one click
  of landing, so I can act fast.
- As a recruiter, I want project summaries I can scan, so I can judge fit.
- As a recruiter on mobile, I want the site to work without pinch-zooming or
  horizontal scrolling.
- As a developer, I want to explore the site through an editor-like interface,
  so the experience feels native to me.
- As a developer, I want a command palette to jump around, so navigation feels
  efficient.
- As the developer (owner), I want content in local data files, so updates do
  not require touching components.

## 6. Functional Requirements

### FR-1 Editor shell

- The site renders a VS Code–style layout: title bar, activity bar, sidebar
  file tree, editor area, status bar.
- The shell is presentational ("look-alike"). No panel dragging or resizing.

### FR-2 Sidebar file tree

- The sidebar lists exactly four entries:
  - `about.json`
  - `projects/` (folder)
  - `resume.pdf`
  - `contact.md`
- Selecting an entry opens its content in the editor area.
- The active entry is visually highlighted.

### FR-3 Hero (about)

- Default view is a **plain, scannable intro**: name, role, one-line summary,
  two to three quick facts, a Resume button, and a Contact button.
- A toggle (for example a `{ }` control or an "about.json" tab) switches the
  hero to a literal, syntax-highlighted JSON rendering of the profile.
- The plain view is the default on first load and on mobile.

### FR-4 Projects

- `projects/` opens a list of project case studies.
- Each project shows: name, short description, stack, the developer's role, a
  link, and optionally an outcome or metric.
- Selecting a project opens its detail view.

### FR-5 Resume

- Selecting `resume.pdf` downloads the PDF.
- A visible Resume button is also present in the hero and, where appropriate,
  in the status bar.

### FR-6 Contact

- `contact.md` shows email and relevant links (GitHub, LinkedIn, etc.).
- Email is copyable and presented as a `mailto:` link.

### FR-7 Command palette

- Keyboard shortcut `Ctrl+K` (Windows/Linux) and `Cmd+K` (macOS) opens a
  command palette overlay.
- Commands: navigate to each section, open the resume (triggers download),
  copy email, and toggle the JSON view.
- The palette is keyboard navigable and dismissible with `Escape`.

### FR-8 Deep linking

- Each section and each project is addressable by URL, so a specific project
  can be shared with a reviewer.

### FR-9 Responsive behavior

- Desktop: full three-pane editor layout.
- Mobile: the sidebar collapses into a drawer; the editor area becomes a
  normal scrollable page; no horizontal scrolling.

## 7. Non-Functional Requirements

### Accessibility

- Semantic landmarks and headings exist in the DOM regardless of the editor
  chrome.
- The JSON hero block is decorative and hidden from assistive technology
  (`aria-hidden`); a readable equivalent is always available.
- All interactive controls are keyboard reachable and have accessible names.
- Color contrast meets WCAG AA for text.
- Motion respects `prefers-reduced-motion`.

### Performance

- Initial route ships a small JS bundle; syntax highlighting must not dominate
  bundle size.
- Target: usable first render on a mid-range phone on a slow connection.
- Lazy-load non-critical views and any heavy highlighting code.

### SEO and sharing

- Real title, description, and Open Graph metadata.
- The hero's readable content is present in the initial HTML or prerendered.
- A link preview renders correctly when the URL is pasted into chat or email.

### Compatibility

- Current versions of Chrome, Firefox, Safari, and Edge.
- iOS Safari and Android Chrome.

### Maintainability

- All copy and project data live in local data files, not in components.
- Components are single-responsibility and documented by contract in
  `DESIGN.md`.

## 8. Content Requirements

- `profile.json`: name, role, summary, quick facts, email, social links, resume
  path.
- `projects.json`: ordered list of projects with the fields defined in
  `DESIGN.md`.
- `resume.pdf`: stored as a static asset and downloadable.
- Project imagery or logos if available.

## 9. Metrics

- Primary: the 30-second usability test passes, unaided, on desktop and mobile.
- Secondary: at least one interview or reply attributable to the portfolio
  within an agreed window after it is shared.

## 10. Risks and Mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Editor costume reads as style over substance | Credibility | One genuine interaction (command palette); strong project content |
| JSON hero slows the recruiter | Primary metric fails | Plain view is the default; JSON is opt-in |
| VS Code look appears inauthentic | Credibility | Use real Codicons and a true monospace font; match spacing and colors |
| Syntax highlighting bloats bundle | Performance | Use a minimal highlighter or a small custom JSON renderer |
| Mobile layout degrades | Reach | Drawer pattern; test on real devices |

## 11. Milestones

1. Shell and navigation skeleton.
2. Hero with reader/JSON toggle.
3. Projects, resume, and contact views.
4. Command palette.
5. Responsive and mobile drawer.
6. Accessibility, SEO, and performance pass.
7. Usability test and refinement.

Detailed tasks and ordering live in `PLANNING.md`.
