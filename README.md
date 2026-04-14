# OCL Design System

The living home for OCL Term Browser v3 (TBv3) designs: what we're building toward, where we currently stand, and the decisions behind each.

## Relationship to other repos

- **`oclmap`** - OCL Mapper application. No specific designs in this repo however.
- **`oclweb3`** — the TBv3 implementation. Current-state screenshots in [`tbv3-screenshots/`](tbv3-screenshots/) come from there.
- **`oclweb2`** — legacy TBv2. Some designs explicitly fall back to v2 patterns until v3 replacements land.

## Folder guide

| Folder | What's inside |
|---|---|
| [`designs/`](designs/) | Canonical designs we're building toward. Flat folder, PNG only. Names preserved from Zeplin (spaces and ` _ ` separators kept so cross-references to `ocl-zeplin` still work). |
| [`tbv3-screenshots/`](tbv3-screenshots/) | Current-state TBv3 screenshots for areas where the shipped implementation diverges from the canonical design. |
| [`docs/review-2026-04.md`](docs/review-2026-04.md) | The April 2026 team design review — source of truth for the status classifications below. |
| [`docs/styleguide/`](docs/styleguide/) | Historical `colors.json` / `text-styles.json` from the Zeplin styleguide. Actual source of truth lives in `oclweb3` code (color tokens already implemented as `primary.80` etc.). |

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
