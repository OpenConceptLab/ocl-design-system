# Token sync — options for keeping the design system in lockstep with oclweb3

Today (v1) we hand-copy the palette from `oclweb3/src/common/colors.jsx` into `assets/tokens.css`. That's the simplest thing that could possibly work, and the right call for v1: the palette is small, it changes rarely, and a one-time copy gives us working docs without any build tooling.

This doc records what we'd consider when that decision stops being right.

## Signal that we should revisit

- The palette drifts: someone updates `colors.jsx` and forgets to update `tokens.css`, and we only notice when a screenshot doesn't match.
- We want to document more tokens than color — typography scale, spacing, breakpoints, motion — and manual copying becomes tedious.
- We add a second consumer (e.g. `oclmap`, marketing site) and duplication multiplies.

## Option A — Keep hand-copying (current)

**How:** Update `assets/tokens.css` whenever `colors.jsx` changes in oclweb3. Leave a comment at the top noting the commit SHA of the oclweb3 version the file reflects.

**Pros:**
- Zero tooling. No Node, no package.json, no dependencies.
- The design system repo stays publishable directly by GitHub Pages with no build step.
- Works offline via `file://`.
- If `oclweb3` is inaccessible, the docs still work.

**Cons:**
- Drift is silent. A reviewer of an `oclweb3` PR has to remember to sync.
- Any non-color tokens (spacing, type scale if we ever customize, motion) have to be hand-copied too.
- No provenance beyond the comment — if the oclweb3 palette mutates mid-refactor, reconstructing the diff is manual.

**Best fit:** v1. Today.

## Option B — Tiny Node sync script (`scripts/sync-tokens.mjs`)

**How:** A ~100-line script that:
1. Reads `../oclweb3/src/common/colors.jsx` (or a configurable path).
2. Uses a minimal parser (`acorn` or even a regex for the simple shape of that file) to extract the `const PRIMARY_COLORS = { ... }` objects.
3. Emits `assets/tokens.css` (CSS custom properties) and `docs/styleguide/tokens.json` (machine-readable).
4. Runs manually: `node scripts/sync-tokens.mjs`. A pre-commit hook or a `package.json` script can make it one step.

**Pros:**
- Deterministic: `git diff` after running the script tells you exactly what changed and you review it as part of the PR.
- Easy to extend when we want to sync more than color (read `index.jsx` for typography overrides, spacing, etc.).
- Emits multiple output formats from one source (CSS vars, JSON, JS module) with zero extra effort.
- GitHub Pages still serves the generated files as static assets — no runtime build.

**Cons:**
- Introduces a `package.json` and at least one dependency (or a hand-rolled parser).
- Requires Node on contributor machines.
- Someone still has to run the script. Easy to forget in a docs-only PR.
- Parsing JSX constants is fragile — a refactor to TypeScript enums or a dynamic palette builder would break it.

**Best fit:** The moment we find ourselves hand-copying more than colors, or a second drift incident happens.

## Option C — Git submodule of oclweb3 + direct import

**How:** Add `oclweb3` as a git submodule at `vendor/oclweb3`. The sync script (or even a simple `cat` + `sed` in CI) reads `vendor/oclweb3/src/common/colors.jsx` at site-build time.

**Pros:**
- Version pinning is explicit: a submodule points at a specific commit SHA, so the design system versions in lockstep with a known oclweb3 build.
- No network access needed at build time (submodule is in-tree).
- Lets the design system reference `oclweb3` paths in docs without guessing.

**Cons:**
- Submodules are a well-known footgun. Contributors routinely forget to `--recurse-submodules` on clone.
- Adds ~10-20 MB of oclweb3 clone weight to the design system repo.
- Updating oclweb3 becomes a two-step dance: bump submodule, then regenerate tokens.
- Still need the script in Option B to read the file.

**Best fit:** Probably never. Option B is almost strictly better.

## Option D — Publish oclweb3 tokens as an npm package

**How:** Extract `colors.jsx` (plus any typography overrides) into a small `@ocl/tokens` package. Both `oclweb3` and `ocl-design-system` consume it. Source of truth lives in the package, not in the app.

**Pros:**
- Proper single source of truth. No drift possible.
- Other consumers (`oclmap`, marketing sites, mobile) can adopt the same tokens trivially.
- Works with Style Dictionary or similar industry tooling if we outgrow hand-rolled CSS.

**Cons:**
- Big change. Requires publishing (even to a private registry), versioning, release process.
- The design system repo starts needing npm + a build step. No longer "just static HTML."
- Overkill for a two-consumer system.

**Best fit:** If we ever have 3+ consumers of the palette, or a full brand redesign that requires treating tokens as a versioned product.

## Recommendation

- **Now:** Option A (one-time copy). Shipped in v1.
- **When the first drift bug appears, or when we need to sync non-color tokens:** Option B (tiny Node script).
- **Only if the design system grows beyond two consumers:** Option D (tokens package).
- **Skip Option C.** The tradeoffs don't add up compared to B.

When we move off Option A, delete this doc (or move it to `docs/archive/`) and update the top of `assets/tokens.css` to point at the generator.
