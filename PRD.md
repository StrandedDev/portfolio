# Product Requirements Document — Developer Portfolio (v2)

Status: Active
Date: 2026-09-19
Version: 2.0
Owner: Developer
Related docs: `PLANNING.md`, `DESIGN.md`, `AGENTS.md`
Supersedes: v1 PRD (2026-09-18)

## 1. Overview

A personal developer portfolio presented as a VS Code–style editor. The site
still serves two audiences with opposite needs:

- **Recruiters / hiring managers** — must understand who the developer is and
  reach the resume and contact details in under 30 seconds, on the device they
  happen to be holding.
- **Developers / peers** — should find the experience playful and interactive,
  with a command palette and an editor aesthetic that rewards exploration.

v1 proved the shell. v2 makes it convert. The dual-layer approach is unchanged:
a plain, scannable reader surface is the default, and the editor costume is
layered on top as an optional interaction.

## 2. What v2 changes

v1 was structurally complete but failed on three counts: it was empty, it did
not grab attention, and mobile abandoned the editor identity. v2 addresses each
directly.

- **Purpose.** v2 exists to convert a recruiter into an interview. Every
  tradeoff resolves toward that outcome. Aesthetic serves conversion, never the
  reverse.
- **Positioning.** The candidate is a university student and a **front-end
  developer with AI-accelerated workflows**. Front-end depth is the claim;
  agentic AI is a supporting skill line, not a headline.
- **First impression.** The readable hero is the primary attention lever: name,
  role, summary, and the two calls to action are visible immediately on load,
  with no entrance animation delaying or reflowing them.
- **Mobile identity.** Mobile keeps the metaphor through a bottom activity bar
  as the primary navigation, with the command palette as a secondary entry
  point and plain reader content inside. Mobile is no longer a degraded copy of
  the desktop shell.
- **Content honesty.** Only projects the candidate can defend unaided in an
  interview are published. The site ships early and grows, but empty sections
  use honest in-progress states rather than filler.
- **Scope additions.** Collapsible panels and a presentational terminal view
  move from non-goals into scope. See section 5 for the exact boundary.

## 3. Problem statement

Most developer portfolios are either:

- A generic template that shows no engineering identity, or
- A heavily themed novelty (terminal, IDE clone) that is memorable to
  developers but hostile to a non-technical recruiter scanning on a phone.

The portfolio must signal "this person is a developer" without sacrificing the
recruiter's ability to complete the primary task — and without collapsing into
a generic page the moment the viewport narrows.

## 4. Goals and success criteria

### Primary success criterion

A non-technical person, with no instructions, can find the resume and the
contact method within **30 seconds**, on both desktop and mobile.

This single criterion governs scope. Any feature that threatens it is cut or
deferred.

### Secondary goals

- Mobile preserves the editor identity rather than reading as a generic site.
- Present projects clearly enough that a reviewer can understand scope, stack,
  and outcome, and that the candidate can defend each one in an interview.
- Demonstrate front-end competence through the shell's execution quality.
- Keep content maintainable through local data files.

### Non-goals (explicitly out of scope)

- A real, working shell or command execution. The terminal view is
  presentational only.
- Drag-to-resize splits. Panels may collapse and expand, but not resize freely.
- Editable files, live playgrounds, or embedded runtimes.
- Additional themes beyond the light/dark pair.
- A writing or blog section.
- Authentication, accounts, or any backend.
- A CMS or admin interface.

## 5. Scope boundary

The v1 non-goals list is amended as follows. This table is the contract.

| Capability | v1 | v2 |
| --- | --- | --- |
| Collapsible panels | Out | **In** (collapse/expand only) |
| Terminal view | Out | **In** (presentational only) |
| Drag-to-resize splits | Out | Out |
| Editable files / playground | Out | Out |
| Extra themes | Out | Out |
| Writing / blog | Out | Out |
| Backend / auth / CMS | Out | Out |

Anything not marked "In" is a non-goal. Adding a row requires updating this
document and `DESIGN.md` in the same change.

## 6. Target users

### Primary: Recruiter / hiring manager

- Non-technical or semi-technical.
- Often on mobile, often time-constrained.
- Wants: name, role, summary, resume, contact, and a fast read on projects and
  education.

### Secondary: Developer / peer

- Technical, curious, evaluates craft.
- Wants: interaction, structure, and evidence of engineering taste.

### Tertiary: The candidate as interviewee

- Needs every published claim to be defensible line-by-line.
- Needs the site itself to serve as a flagship project they can explain.

## 7. User stories

- As a recruiter, I want to see who this person is immediately, so I can decide
  whether to keep reading.
- As a recruiter, I want a resume download and contact details within one click
  of landing, so I can act fast.
- As a recruiter on mobile, I want the same speed and the same identity as on
  desktop, without pinch-zooming or horizontal scrolling.
- As a recruiter, I want project and education summaries I can scan, so I can
  judge fit.
- As a developer, I want to explore the site through an editor-like interface,
  so the experience feels native to me.
- As a developer, I want a command palette to jump around, so navigation feels
  efficient.
- As the candidate, I want to publish only what I can defend, so the portfolio
  never becomes a liability in an interview.
- As the candidate, I want to point at this site as a project, so it doubles as
  evidence of front-end skill.
- As the developer (owner), I want content in local data files, so updates do
  not require touching components.

## 8. Functional requirements

### FR-1 Editor shell

- The site renders a VS Code–style layout: activity bar, sidebar file tree,
  editor area, status bar. There is no title bar; the command palette trigger
  lives in the activity bar as a persistent search affordance.
- The shell is presentational ("look-alike").
- The sidebar and supporting panels are collapsible and expandable (see FR-10).
  No drag-to-resize.

### FR-2 Sidebar file tree

- The sidebar lists the sections: `about.json`, `projects/` (folder),
  `resume.pdf`, `contact.md`, and `education.md`.
- Selecting an entry opens its content in the editor area.
- The active entry is visually highlighted.

### FR-3 Hero (about)

- Default view is a **plain, scannable intro**: name, role, one-line summary,
  quick facts, a Resume button, and a Contact button.
- A toggle (for example a `{ }` control or an "about.json" tab) switches the
  hero to a literal, syntax-highlighted JSON rendering of the profile.
- The plain view is the default on first load and on mobile.
- The plain view renders directly on load; no JSON entrance animation ships.

### FR-4 Projects

- `projects/` opens a list of project case studies.
- Each project shows: name, short description, stack, the developer's role, a
  link, and optionally an outcome or metric.
- Selecting a project opens its detail view.
- Only defensible projects are published (see FR-12).

### FR-5 Resume

- Selecting `resume.pdf` opens the resume view and offers a real PDF download.
- A visible Resume button is also present in the hero and where appropriate in
  the status bar.

### FR-6 Contact

- `contact.md` shows email and relevant links (GitHub, LinkedIn, etc.).
- Email is copyable and presented as a `mailto:` link.

### FR-7 Command palette

- Keyboard shortcut `Ctrl+K` (Windows/Linux) and `Cmd+K` (macOS) opens a
  command palette overlay.
- Commands: navigate to each section, open the resume, copy email, toggle the
  color theme, toggle the JSON view, collapse/expand the sidebar, and open the
  terminal view.
- The palette is keyboard navigable and dismissible with `Escape`.
- On mobile, the palette is reachable from a persistent search affordance.

### FR-8 Deep linking

- Each section and each project is addressable by URL, so a specific project
  can be shared with a reviewer.

### FR-9 Responsive behavior

- **Desktop:** full three-pane editor layout.
- **Mobile:** the activity bar becomes a persistent bottom bar and is the
  primary navigation. The command palette is available as a secondary entry
  point. The editor area is a normal scroll region with reader content. The hero
  keeps Resume and a contact call to action one tap away.
- No horizontal scrolling at any width.

### FR-10 Collapsible panels

- The sidebar can be collapsed and expanded on desktop.
- Collapse state is reflected in the layout and in the command palette.
- No drag-to-resize behavior is implemented.

### FR-11 Terminal view

- A presentational terminal view is available as a panel or tab.
- It renders canned output only. It does not execute commands.
- It must be clearly non-interactive, or, if it accepts input, must not imply a
  real shell.

### FR-12 Education and proof

- An `education.md` section presents university, degree, expected graduation,
  and relevant coursework.
- Achievements, certifications, hackathons, or open-source contributions are
  presented where available.
- A GitHub link is present in the hero and contact views.

### FR-13 Content integrity

- No placeholder or invented content ships to production.
- Sections without real content render an honest in-progress state instead of
  filler.

## 9. Content requirements

- `profile.json`: real name, role, summary, location, quick facts, email,
  social links, resume path.
- `projects.json`: ordered list of projects. A project is publishable only if
  the candidate can explain its architecture and key decisions unaided.
- `education.json` (or equivalent): university, degree, expected graduation,
  coursework.
- `resume.pdf`: a real, downloadable resume as a static asset.
- Project imagery or logos if available.

## 10. Non-functional requirements

### Accessibility

- Semantic landmarks and headings exist in the DOM regardless of the editor
  chrome.
- The JSON hero block is decorative and hidden from assistive technology
  (`aria-hidden`); a readable equivalent is always available.
- All interactive controls are keyboard reachable and have accessible names.
- Color contrast meets WCAG AA for text.
- Motion respects `prefers-reduced-motion`; non-essential animation is instant
  in that mode.

### Performance

- Initial route ships a small JS bundle; syntax highlighting must not dominate
  bundle size.
- Target: usable first render on a mid-range phone on a slow connection.
- Lazy-load non-critical views and any heavy highlighting code.
- The hero must not regress Cumulative Layout Shift.

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

## 11. Metrics

- Primary: the 30-second usability test passes, unaided, on desktop and mobile.
- Secondary: mobile preserves the editor identity in an unaided first
  impression.
- Secondary: at least one interview or reply attributable to the portfolio
  within an agreed window after it is shared.

## 12. Risks and mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Site ships empty while content is pending | Primary metric fails | Honest in-progress states; publish only defensible projects; keep the site's own case study as the flagship |
| "Vibecoded" projects collapse under interview probing | Credibility | Ship only what the candidate can defend unaided; one write-up per project |
| Mobile hybrid sprawls into three competing nav models | Usability | Bottom activity bar is the single primary nav; palette is secondary only |
| Collapsible panels and terminal creep toward full editor emulation | Scope and performance | Enforce the scope boundary in section 5; terminal is presentational only |
| Editor costume reads as style over substance | Credibility | One genuine interaction (command palette); strong project and education content |
| VS Code look appears inauthentic | Credibility | Use real Codicons and a true monospace font; match spacing and colors |

## 13. Milestones

1. Reconcile docs (`DESIGN.md`, `PLANNING.md`, `AGENTS.md`) with this scope.
2. Content pipeline: real profile, education, resume, and one to two defensible
   projects.
3. Mobile redesign: bottom activity bar, palette entry point, hero actions,
   reader content.
4. Collapsible panels.
5. Terminal view.
6. Accessibility, SEO, and performance pass.
7. Usability test and refinement.

Detailed tasks and ordering live in `PLANNING.md`.

## 14. Definition of done

- All functional requirements above are implemented or explicitly deferred.
- The 30-second test passes, unaided, on desktop and mobile.
- Mobile retains the editor identity in an unaided first impression.
- Every published project is defensible in an interview.
- Accessibility, SEO, and performance checks pass.
- Content is editable through data files only.
- No capability outside the section 5 boundary has crept in.
