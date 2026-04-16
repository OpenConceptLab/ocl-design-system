# OCL v3 Design System

The design system for the next generation of OCL's web applications: foundations, components, patterns, and the canonical screenshot library behind them. Applies to both [`oclweb3`](https://github.com/OpenConceptLab/oclweb3) (Term Browser v3) and [`oclmap`](https://github.com/OpenConceptLab/oclmap) (OCL Mapper).

**Live site:** [openconceptlab.github.io/ocl-design-system](https://openconceptlab.github.io/ocl-design-system/)

## Relationship to other repos

- **[`oclweb3`](https://github.com/OpenConceptLab/oclweb3)** — the canonical implementation (React 18 + MUI v5.18). Every component page in this site links back to real JSX. When the site and the code disagree, the code wins.
- **[`oclmap`](https://github.com/OpenConceptLab/oclmap)** — OCL Mapper. Inherits the same tokens, components, and patterns documented here.
- **`oclweb2`** — legacy TBv2. Some TBv3 areas still fall back to v2 patterns until v3 replacements land.

## Folder guide

| Folder | What's inside |
|---|---|
| [`index.html`](index.html) | Landing page (static HTML, also a Vite entry). |
| [`public/`](public/) | Static assets served as-is: foundations, patterns, gallery, designs, docs, and static component pages. |
| [`public/foundations/`](public/foundations/) | Color (rendered live), typography (real Roboto specimens), elevation. |
| [`public/components/`](public/components/) | Component catalog index (static HTML). |
| [`components/`](components/) | Vite entry HTML files for React-powered component pages (Button, RepoChip, HTMLTooltip, RepoHeader, Dialog, Alert, CommonTabs, Breadcrumbs). |
| [`guides/`](guides/) | Vite entry HTML files for developer guides (Building Pages). |
| [`src/`](src/) | React source: theme, color tokens, shared layout, and component pages. |
| [`public/patterns/`](public/patterns/) | Screen-level compositions grouped by area. Stubs only in v1. |
| [`public/gallery.html`](public/gallery.html) | Raw screenshot browser — all 120 canonical Zeplin designs + 11 current-state TBv3 screenshots. |
| [`public/assets/`](public/assets/) | Shared `tokens.css`, `site.css`, logos, favicon. |
| [`public/designs/`](public/designs/) | Canonical Zeplin PNGs. |
| [`public/docs/`](public/docs/) | Design review, token sync options, styleguide JSON. |
| [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) | GitHub Actions workflow: build + deploy to GitHub Pages. |

## How the site works

The site uses a **hybrid model**: most pages are static HTML, while component exemplar pages that need live examples use React + MUI (the same stack as oclweb3). Vite handles the build.

- **Static pages** live in `public/` and are served as-is. They use `tokens.css` for colors and `site.css` for layout. These can still be opened via `file://` for quick viewing.
- **React-powered pages** (8 component exemplars + 1 developer guide) are Vite entry points in `components/` and `guides/`. They mount React into a `<div>` and render live MUI components using the same theme as oclweb3.
- **Shared theme** in `src/theme.js` and `src/colors.js` — copied from `oclweb3/src/index.jsx` and `oclweb3/src/common/colors.jsx`. When oclweb3 theme changes, update these files.
- **Roboto** loaded from Google Fonts (same font the app uses).
- **Deployment** via GitHub Actions: push to `main` triggers `npm run build`, and the `dist/` output is deployed to GitHub Pages.

## Development

```bash
npm install          # Install dependencies
npm run dev          # Start Vite dev server with HMR
npm run build        # Build to dist/
npm run preview      # Preview the built site locally
```

### Adding a new React-powered page

1. Create `components/<name>.html` with a `<div id="<name>-page">` and `<script type="module" src="/src/pages/<name>-entry.jsx">`.
2. Create `src/pages/<Name>Page.jsx` with the React component.
3. Create `src/pages/<name>-entry.jsx` to mount it with `ThemeProvider`.
4. Add the entry to `vite.config.js` under `build.rollupOptions.input`.

### Converting a static page to React

1. Move the HTML file from `public/components/` to `components/` (root level).
2. Replace its body with a React mount point + script tag.
3. Create the corresponding JSX files in `src/pages/`.
4. Add to `vite.config.js`.
5. The URL stays the same — no links break.

## Current status

### React-powered pages (live MUI examples + copyable code)

| Page | Type | What it covers |
|------|------|---------------|
| [Button](components/button.html) | Component | 7 button types (Contained, Outlined, Text, Pill, IconButton, Split, Toggle) + "in the wild" catalog |
| [RepoChip](components/repo-chip.html) | Component | BaseEntityChip-based repo reference chip with variants, sizes, tooltip options |
| [HTMLTooltip](components/html-tooltip.html) | Component | Rich HTML tooltip with custom styling, theme defaults |
| [RepoHeader](components/repo-header.html) | Component | Repository page header composing chips, follow button, manage menu |
| [Dialog](components/dialog.html) | Component | OCL-styled modal wrapper (28px radius, surface.n92 background) |
| [Alert](components/alert.html) | Component | Toast notifications via Snackbar + filled Alert, 4 severities |
| [CommonTabs](components/common-tabs.html) | Component | Full-width tab strip for entity page navigation |
| [Breadcrumbs](components/breadcrumbs.html) | Component | Path navigation with owner/repo/concept/mapping segments |
| [Building Pages](guides/building-pages.html) | Guide | Page scaffold, routing, API patterns, i18n, utilities, worked example |

### Static HTML pages (no build step needed)

| Page | What it covers |
|------|---------------|
| [Component index](public/components/index.html) | Catalog of ~21 components with status badges and source links |
| [Color](public/foundations/color.html) | Full palette rendered from CSS tokens |
| [Typography](public/foundations/typography.html) | MUI type scale with Roboto specimens |
| [Elevation](public/foundations/elevation.html) | Material 3 shadow levels |
| [Logo](public/foundations/logo.html) | OCL logo variants and brand assets |
| [Gallery](public/gallery.html) | 131 Zeplin screenshots browsable by section |
| [Patterns](public/patterns/index.html) | Screen-level compositions (stubs) |

### Component coverage

- **8 of 21** components have full exemplar pages with live examples, code snippets, props tables, and usage guidance
- **10 components** remain as stubs (link to oclweb3 source, no detail page)
- **3 components** are gaps (not yet implemented in code)

## What's next

Remaining work to make this a fully enabled development reference:

1. **Fill in the remaining 10 stub component pages.** Each needs the same treatment as the 8 exemplars: live examples, code snippets, props, usage. Highest-value next: TableResults, CardResults, Header, LeftMenu.
2. **Build pattern detail pages**, starting with **References & Expansions** — the biggest gap per the April 2026 review.
3. **Automate token sync** — move from hand-copy to a Node script (see [`docs/token-sync-options.md`](public/docs/token-sync-options.md)) the first time the palette drifts from oclweb3.
4. **Logo clear-space and minimum-size rules.** [`foundations/logo.html`](public/foundations/logo.html) flags this as TODO.
5. **Convert the component index to React** — currently the only component-area page still in static HTML. Low priority since it's just a link grid.
6. **Guidelines section** (voice/tone/content/iconography) once a team member has the content to write.
7. **Expand the component catalog** beyond the ~21 curated entries. There are ~50 more in [`oclweb3/src/components/`](https://github.com/OpenConceptLab/oclweb3/tree/main/src/components) worth documenting.

## Status table

Only items that are **not** cleanly implemented-as-designed appear here. Anything in `designs/` that isn't listed is assumed to be implemented (or at least still canonical with no open questions).

Status values:
- **partial** — some of the design is implemented, more to go
- **divergent** — we shipped something different on purpose; canonical design kept as reference
- **not-started** — design is still the target, no implementation yet
- **kept-as-input** — not the direction we're taking for MVP, but workflow/ideas are useful

### Dashboard

| Design | Status | Notes |
|---|---|---|
| `Dashboard-SignedIn.png` | not-started | Signed-in dashboard not implemented |
| `Dashboard-SignedOut-1.png` | not-started | Signed-out dashboard not implemented |
| `Dashboard _ Feed _ Signed out.png` | partial | Card display in "What's new" has evolved; otherwise a valid direction |
| `Dashboard _ Feed _ Empty state.png` | partial | Middle "no updates to show" is accurate; left drawer is not |

### Repository

| Design | Status | Notes |
|---|---|---|
| `My Repositories  _ Create _ Version.png` | divergent | Followed v2 approach instead; kept for future revisit |
| `Repository _ Card view _ Dialog.png` | kept-as-input | Not the MVP direction, but the workflow is instructive |
| `Repository _ Collection _ References.png` | not-started | Current reference listing still uses v2 style; design decisions pending |
| `Repository _ Source _ Overview.png` | not-started | 2-column key-value-pair display we should adopt (e.g. "view repo attributes" modal) |
| `Repository _ ValueSet.png` | not-started | Same 2-column key-value-pair display |
| `Repository _ ValueSet _ Composition.png` | not-started | Not implemented |
| `Repository _ ValueSet _ Concepts.png` | not-started | Not implemented |
| `Repository _ Source _ Mappings.png` | kept-as-input | Hierarchical mapping display — unclear if we'll go this way |

### Search

| Design | Status | Notes |
|---|---|---|
| `Card view.png` | divergent | General TBv3 card view pattern applies, but concept card specifically was modified during OCL Mapper work (multiple properties etc.) |
| `Search _ Concepts.png` | divergent | Same concept-card divergence |
| `Search _ Concepts _ Bulk.png` | partial | Card view used across TBv3; action button designs not used anywhere yet |
| `Grouped by Type _ Dense.png` | partial | Still accurate, but expand/collapse not yet implemented |
| `Grouped by Source _ Dense.png` | not-started | Did not implement |
| `Hierarchy _ Grouped by Code _ Dense.png` | kept-as-input | Good direction but expand/collapse placement next to name (not code) is not intuitive; not implemented |

### Concept / Mapping

| Design | Status | Notes |
|---|---|---|
| `Concept.png` | partial | Card designs are there; tooltips and chips are not |
| `Chip and Tooltip.png` | partial | Mostly accurate for repo; no tooltip yet for concept, mapping, reference, or expansion |
| `Associations.png` | partial | Current but not hierarchical |

### References / Expansions

| Design | Status | Notes |
|---|---|---|
| `Reference _ details.png` | not-started | Biggest gap area — kept as input |
| `Reference _ expansion.png` | not-started | Not implemented; layout decisions needed |
| `Reference _ expansion _ mappings.png` | not-started | Not implemented; layout decisions needed |

See also the open decisions on **collection versions and expansions** below.

### Components

| Design | Status | Notes |
|---|---|---|
| `Component - Tables - Search - Concept.png` | partial | First search-concept table is done; remaining table designs are not |
| `Component - Tables.png` | not-started | Broader table system not yet built out |
| `Component - Tables - Toolbar.png` | not-started | Toolbar component pending |
| `Elevation.png` | partial | Only the first elevation level is used |

## Known gaps

Areas where the design system itself has nothing (or very little) to offer yet — the canonical design still needs to be created:

- **Browsing hierarchical sources** — happy to run on the v2 model for now.
- **Collections & their references** — **biggest gap**. Functional and visual design decisions still open.
- **Concept selector component** — in the meantime, use the v2 quick-add-mapping approach (which combines multiple components to select a concept).
- **Editing concepts, mappings, references** — original "Edit Concept / Mapping" designs were explicitly rejected; other editing surfaces have gaps too and need a full assessment.
- **Key-value-pair component** — shown in the design system styleguide but not yet in TBv3. Needed for repo attributes modal, source overview, valueset views.
- **Mappings grouped by source / type** (optional) — deferred.

## Open decisions

Collected from the April 2026 review.

### Collection versions and expansions

Two user goals, two user types:

- **Components** — collection version dropdown in the breadcrumb (for "find a version"), plus a version/expansion focus area (for management and "looking for an expansion").
- **Common user** — doesn't care about expansions. As a consumer they use the default expansion; as a manager they auto-expand collection versions and rebuild to pull in newer source versions.
- **Power user** — cares about expansions. As a consumer they watch expansion parameters and resolved source versions; as a manager they author expansions in addition to references.

Feedback on the TBv2 collection versions and expansions page that any redesign must address:

- Too much whitespace
- Primary action / flow not clear
- Working with expansions isn't intuitive

### Other open questions

- **Hierarchical mapping display** — is `Repository _ Source _ Mappings.png`'s hierarchical grouping the right direction? Undecided.
- **Reference listing redesign** — current implementation is v2 style; needs functional and visual decisions before we follow `Repository _ Collection _ References.png`.
- **Key-value-pair display adoption** — which surfaces convert first (repo attributes modal is the obvious starting point).

## How to contribute

- **Adding a new canonical design:** drop the PNG into `designs/`. If it changes the answer on any open decision, update the status table and Open Decisions section in this README.
- **Marking an existing design as divergent:** add a current-state screenshot to `tbv3-screenshots/` and add a row (or update an existing one) in the status table.
- **Recording a decision:** prefer editing this README over adding a new doc. If the write-up gets long, break it out into its own file under `docs/` and link from here.
- **Never edit files in `ocl-zeplin`.** That repo is a frozen reference.

## Provenance

All `designs/` PNGs were copied from [`ocl-zeplin`](../ocl-zeplin/) on 2026-04-14:

- From `OCL 3.0 (active)/screens/_unsectioned/` — 112 PNGs (all except 4 explicitly-rejected "Edit Concept/Mapping" screens).
- From `OCL Design System (active)/screens/_unsectioned/` — 8 component PNGs.
- The following Zeplin folders were excluded entirely because the review marked them stale: `Design system (archived)/`, `OCL Term Browser (archived)/`, `TermBrowser (active)/`.

`tbv3-screenshots/` came from `ocl-zeplin/ocl-current-state-Apr-2026/`.
