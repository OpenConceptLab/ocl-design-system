import React from 'react';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import BookmarkBorder from '@mui/icons-material/BookmarkBorder';
import Share from '@mui/icons-material/Share';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';

import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import ExampleFrame from '../components/ExampleFrame';
import CodeSnippet from '../components/CodeSnippet';

const Section = ({ title, children }) => (
  <section>
    <h2>{title}</h2>
    {children}
  </section>
);

const RepoHeaderPage = () => (
  <>
    <SiteHeader section="Components" />
    <main>
      <div className="breadcrumb">
        <a href="/ocl-design-system/">Overview</a> · <a href="/ocl-design-system/components/">Components</a> · RepoHeader
      </div>
      <h1>RepoHeader</h1>
      <p className="page-intro">
        The sticky-at-top block that identifies the repository. Composes OwnerChip, RepoChip,
        RepoVersionChip, a follow button, and a Manage menu.
      </p>

      <div className="component-detail">
        <div className="detail-main">

          <Section title="Example">
            <ExampleFrame note="Live MUI components mimicking the RepoHeader layout. The real component composes several sub-components.">
              <Paper sx={{ p: 2, borderRadius: '10px 10px 0 0', backgroundColor: 'surface.main' }}>
                {/* Row 1: Chips + action buttons */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', marginBottom: 12 }}>
                  <Chip
                    label="IHTSDO"
                    variant="outlined"
                    size="small"
                    sx={{ fontWeight: 500, borderRadius: '16px', borderColor: 'surface.s90' }}
                  />
                  <Chip
                    label="CIEL \u00b7 Source"
                    variant="outlined"
                    size="small"
                    sx={{ fontWeight: 500, borderRadius: '16px', borderColor: 'surface.s90' }}
                  />
                  <Chip
                    label="v2024.03"
                    variant="outlined"
                    size="small"
                    sx={{ fontWeight: 500, borderRadius: '16px', borderColor: 'surface.s90' }}
                  />
                  <div style={{ flex: 1 }} />
                  <Tooltip title="Bookmark"><IconButton size="small"><BookmarkBorder fontSize="small" /></IconButton></Tooltip>
                  <Tooltip title="Share"><IconButton size="small"><Share fontSize="small" /></IconButton></Tooltip>
                  <Button
                    variant="text"
                    size="small"
                    endIcon={<ArrowDropDown />}
                    sx={{ textTransform: 'none', fontWeight: 500 }}
                  >
                    Manage
                  </Button>
                </div>
                {/* Row 2: Title + canonical URL */}
                <div>
                  <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>
                    Columbia International eHealth Laboratory
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                    /orgs/IHTSDO/sources/CIEL/
                  </div>
                </div>
              </Paper>
            </ExampleFrame>
          </Section>

          <Section title="Reference design">
            <div className="anatomy-figure">
              <img src="/ocl-design-system/designs/Component - Repository - Header.png" alt="RepoHeader design reference" />
            </div>
            <p className="anatomy-caption">Source: <code>designs/Component - Repository - Header.png</code></p>
          </Section>

          <Section title="Anatomy">
            <ol style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              <li><strong>Container</strong> &mdash; Paper with top-rounded corners, surface background. Sticks to the top of the page on scroll.</li>
              <li><strong>Chip row</strong> &mdash; OwnerChip, RepoChip, and RepoVersionChip in a horizontal row. Each navigates to its entity.</li>
              <li><strong>Follow button</strong> &mdash; FollowActionButton (Pill style) on the right side of the chip row.</li>
              <li><strong>Manage menu</strong> &mdash; Text button with dropdown arrow. Opens a menu with create/edit/delete actions.</li>
              <li><strong>Title</strong> &mdash; Repository full name, displayed prominently below the chip row.</li>
              <li><strong>Canonical URL</strong> &mdash; The OCL API path for the repository, shown as muted text below the title.</li>
            </ol>
          </Section>

          <Section title="States">
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              <li><strong>Read-only (no manage)</strong> &mdash; Manage button is hidden. Follow button is still visible. Used when the user does not have edit permissions.</li>
              <li><strong>Version switcher active</strong> &mdash; RepoVersionChip shows a dropdown to select a different version. Active version is highlighted.</li>
              <li><strong>Version page</strong> &mdash; Displayed when viewing a specific version. The version chip is visually distinct (filled).</li>
              <li><strong>No canonical URL</strong> &mdash; The canonical URL row is hidden when not available.</li>
            </ul>
          </Section>

          <Section title="Props">
            <table className="props-table">
              <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td><code>repo</code></td><td><code>object</code></td><td>&mdash;</td><td>Repository object with name, full_name, url, canonical_url, etc.</td></tr>
                <tr><td><code>owner</code></td><td><code>object</code></td><td>&mdash;</td><td>Owner object (user or org) with name, url, type.</td></tr>
                <tr><td><code>versions</code></td><td><code>array</code></td><td><code>[]</code></td><td>List of version objects for the version switcher.</td></tr>
                <tr><td><code>isVersion</code></td><td><code>bool</code></td><td><code>false</code></td><td>Whether the current view is a specific version page.</td></tr>
                <tr><td><code>onVersionChange</code></td><td><code>func</code></td><td>&mdash;</td><td>Called when the user selects a different version.</td></tr>
                <tr><td><code>onCreateConceptClick</code></td><td><code>func</code></td><td>&mdash;</td><td>Opens the create concept form from the Manage menu.</td></tr>
                <tr><td><code>onCreateMappingClick</code></td><td><code>func</code></td><td>&mdash;</td><td>Opens the create mapping form from the Manage menu.</td></tr>
                <tr><td><code>onCreateVersionClick</code></td><td><code>func</code></td><td>&mdash;</td><td>Opens the create version form from the Manage menu.</td></tr>
                <tr><td><code>onVersionEditClick</code></td><td><code>func</code></td><td>&mdash;</td><td>Opens the version edit form from the Manage menu.</td></tr>
                <tr><td><code>onReleaseVersionClick</code></td><td><code>func</code></td><td>&mdash;</td><td>Triggers the release version action from the Manage menu.</td></tr>
                <tr><td><code>onDeleteRepoClick</code></td><td><code>func</code></td><td>&mdash;</td><td>Opens the delete repository confirmation dialog.</td></tr>
              </tbody>
            </table>
          </Section>

          <Section title="Code">
            <CodeSnippet title="Usage" code={`import RepoHeader from '../repos/RepoHeader';

<RepoHeader
  repo={repo}
  owner={owner}
  versions={versions}
  isVersion={false}
  onVersionChange={handleVersionChange}
  onCreateConceptClick={() => setConceptForm(true)}
  onCreateMappingClick={() => setMappingForm(true)}
  onCreateVersionClick={() => setVersionForm(true)}
  onDeleteRepoClick={() => setDeleteRepo(true)}
/>`} />
          </Section>

          <Section title="Usage">
            <h4>Do</h4>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              <li>Use on every repository page as the top-level identifier.</li>
              <li>Keep sticky so the user always knows which repo they are in.</li>
              <li>Use the Manage menu as the only place for destructive actions (delete, retire).</li>
            </ul>
            <h4>Don't</h4>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              <li>Don't duplicate the repository name elsewhere on the page.</li>
              <li>Don't place destructive actions outside the Manage menu.</li>
              <li>Don't hide the RepoHeader on scroll &mdash; it should remain sticky.</li>
            </ul>
          </Section>

          <Section title="Accessibility">
            <div className="todo"><strong>TODO &mdash; needs spec.</strong> Accessibility audit pending for RepoHeader and its composed sub-components.</div>
          </Section>

        </div>

        <aside className="detail-sidebar">
          <h3>Status</h3>
          <p><span className="badge ok">OK</span> &mdash; Fully implemented and in use across all repository pages.</p>

          <h3>Source</h3>
          <a className="source-link" href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/repos/RepoHeader.jsx">src/components/repos/RepoHeader.jsx</a>

          <h3>Composed from</h3>
          <ul>
            <li><a href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/repos/RepoChip.jsx">RepoChip</a></li>
            <li><a href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/common/OwnerChip.jsx">OwnerChip</a></li>
            <li><a href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/repos/RepoVersionChip.jsx">RepoVersionChip</a></li>
            <li><a href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/common/FollowActionButton.jsx">FollowActionButton</a></li>
            <li><a href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/repos/RepoManagementList.jsx">RepoManagementList</a></li>
          </ul>

          <h3>Design</h3>
          <ul>
            <li><a href="/ocl-design-system/designs/Component - Repository - Header.png">Component - Repository - Header.png</a></li>
          </ul>
        </aside>
      </div>
    </main>

    <SiteFooter text="Component documented 2026-04-16 against oclweb3. Live MUI examples." />
  </>
);

export default RepoHeaderPage;
