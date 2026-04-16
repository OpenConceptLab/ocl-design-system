import React from 'react';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import FolderOutlined from '@mui/icons-material/FolderOutlined';

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

const chipBaseSx = {
  borderRadius: '4px',
  minWidth: 95,
  border: '1px solid',
  borderColor: 'surface.nv80',
  fontSize: 14,
  padding: '8px 12px',
  cursor: 'pointer',
  textDecoration: 'none',
  '& .MuiChip-avatar': { width: 24, height: 24, backgroundColor: 'transparent' },
};

const dot = (
  <span style={{ width: 3, height: 3, backgroundColor: '#5e5c71', margin: '0 8px', borderRadius: 100, opacity: 0.8, display: 'inline-block' }} />
);

const RepoChipPage = () => (
  <>
    <SiteHeader section="Components" />
    <main>
      <div className="breadcrumb">
        <a href="/ocl-design-system/">Overview</a> · <a href="/ocl-design-system/components/">Components</a> · RepoChip
      </div>
      <h1>RepoChip</h1>
      <p className="page-intro">
        A compact, clickable reference to a repository (Source or Collection). Renders an icon,
        the repo's short code in bold, an optional version, and the repo type.
      </p>

      <div className="component-detail">
        <div className="detail-main">

          <Section title="Example">
            <ExampleFrame note="Live MUI Chip components styled to match BaseEntityChip from oclweb3.">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
                {/* Default chip */}
                <Chip
                  avatar={<Avatar><FolderOutlined sx={{ color: '#000', fontSize: 18 }} /></Avatar>}
                  label={
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <b>CIEL</b>
                      {dot}
                      <span style={{ color: '#5e5c71' }}>Source</span>
                    </span>
                  }
                  variant="outlined"
                  component="a" href="#"
                  sx={{ ...chipBaseSx, height: 36 }}
                />
                {/* Primary chip with version */}
                <Chip
                  avatar={<Avatar><FolderOutlined sx={{ color: '#000', fontSize: 18 }} /></Avatar>}
                  label={
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <b>CIEL</b>
                      {dot}
                      <span style={{ color: '#5e5c71' }}>v2024.03</span>
                      {dot}
                      <span style={{ color: '#5e5c71' }}>Source Version</span>
                    </span>
                  }
                  variant="outlined"
                  component="a" href="#"
                  sx={{ ...chipBaseSx, height: 36, backgroundColor: 'primary.95' }}
                />
                {/* Small chip */}
                <Chip
                  avatar={<Avatar sx={{ width: '20px !important', height: '20px !important' }}><FolderOutlined sx={{ color: '#000', fontSize: 14 }} /></Avatar>}
                  label={
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <b>ICD-10</b>
                      {dot}
                      <span style={{ color: '#5e5c71' }}>Source</span>
                    </span>
                  }
                  variant="outlined"
                  component="a" href="#"
                  sx={{ ...chipBaseSx, height: 28, fontSize: 12 }}
                />
              </div>
            </ExampleFrame>
          </Section>

          <Section title="Anatomy">
            <div className="anatomy-figure">
              <img src="/ocl-design-system/designs/Chip and Tooltip.png" alt="RepoChip anatomy showing avatar, entity ID, version, divider, entity type, and container" />
            </div>
            <ol style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              <li><strong>Avatar</strong> &mdash; leading icon indicating entity type (folder for Source, list for Collection).</li>
              <li><strong>Entity ID</strong> &mdash; the repo's short code, rendered in bold.</li>
              <li><strong>Version</strong> &mdash; optional version string (e.g. <code>v2024.03</code>).</li>
              <li><strong>Divider</strong> &mdash; small dot separator between label segments.</li>
              <li><strong>Entity type</strong> &mdash; "Source", "Collection", "Source Version", etc.</li>
              <li><strong>Container</strong> &mdash; outlined border with <code>borderRadius: 4px</code>, clickable link.</li>
            </ol>
          </Section>

          <Section title="Variants">
            <h4>Background</h4>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>
              <strong>Secondary (default):</strong> transparent background with outlined border.
              <br />
              <strong>Primary:</strong> <code>primary.95</code> (#e8e5ff) background to highlight the active or contextually relevant repo.
            </p>

            <h4>Size</h4>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>
              <strong>Medium (default):</strong> 36px height, 14px font.
              <br />
              <strong>Small:</strong> 28px height, 12px font. Used in compact layouts and inline references.
            </p>

            <h4>Tooltip options</h4>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>
              By default, hovering shows a rich <code>RepoTooltip</code> with full repo details.
              Use <code>noTooltip</code> to suppress, or <code>basicTooltip</code> for a plain-text tooltip.
            </p>

            <h4>Filled icon</h4>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>
              Set <code>filled</code> to use the solid icon variant (e.g. <code>Folder</code> instead of <code>FolderOutlined</code>).
            </p>
          </Section>

          <Section title="Props">
            <table className="props-table">
              <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td><code>repo</code></td><td><code>object</code></td><td>&mdash;</td><td>Repository object. Must include <code>short_code</code>, <code>type</code>, and optionally <code>version</code>.</td></tr>
                <tr><td><code>noTooltip</code></td><td><code>bool</code></td><td><code>false</code></td><td>Suppress the hover tooltip entirely.</td></tr>
                <tr><td><code>basicTooltip</code></td><td><code>bool</code></td><td><code>false</code></td><td>Show a plain-text tooltip instead of the rich RepoTooltip.</td></tr>
                <tr><td><code>filled</code></td><td><code>bool</code></td><td><code>false</code></td><td>Use filled icon variant instead of outlined.</td></tr>
                <tr><td colSpan={4} style={{ color: 'var(--text-muted)', fontSize: 12, paddingTop: 8, borderTop: '1px solid var(--border-subtle)' }}>
                  <strong>Forwarded from BaseEntityChip:</strong>
                </td></tr>
                <tr><td><code>size</code></td><td><code>'medium' | 'small'</code></td><td><code>'medium'</code></td><td>Chip size. Medium = 36px, Small = 28px.</td></tr>
                <tr><td><code>primary</code></td><td><code>bool</code></td><td><code>false</code></td><td>Use <code>primary.95</code> background.</td></tr>
                <tr><td><code>hideType</code></td><td><code>bool</code></td><td><code>false</code></td><td>Hide the entity type label.</td></tr>
                <tr><td><code>hideRepoVersion</code></td><td><code>bool</code></td><td><code>false</code></td><td>Hide the version segment.</td></tr>
                <tr><td><code>noLink</code></td><td><code>bool</code></td><td><code>false</code></td><td>Render as a non-clickable chip (no anchor).</td></tr>
                <tr><td><code>sx</code></td><td><code>object</code></td><td>&mdash;</td><td>MUI system style overrides merged with defaults.</td></tr>
              </tbody>
            </table>
          </Section>

          <Section title="Code">
            <CodeSnippet code={`import RepoChip from '../repos/RepoChip';

<RepoChip repo={repo} />
<RepoChip repo={repo} primary />
<RepoChip repo={repo} size="small" />
<RepoChip repo={repo} noTooltip filled />`} />
          </Section>

          <Section title="Usage">
            <h4>Do</h4>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              <li>Use RepoChip wherever you reference a repository &mdash; breadcrumbs, search results, association lists, headers.</li>
              <li>Prefer <code>primary</code> for the currently active or contextually relevant repo.</li>
              <li>Use <code>size="small"</code> for inline references within tables or dense layouts.</li>
            </ul>
            <h4>Don't</h4>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              <li>Don't stack more than 3 chips in a single row &mdash; use a list or popover for larger sets.</li>
              <li>Don't use RepoChip for non-repo entities &mdash; use ConceptChip, MappingChip, etc.</li>
              <li>Don't override the icon to something unrelated to the entity type.</li>
            </ul>
          </Section>

          <Section title="Accessibility">
            <div className="todo"><strong>TODO &mdash; needs spec.</strong> Formal accessibility audit pending.</div>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              <li>Chips render as <code>&lt;a&gt;</code> elements &mdash; keyboard-focusable and navigable.</li>
              <li>The tooltip provides additional context on hover/focus.</li>
              <li>Icon-only content is supplemented by the text label, so no <code>aria-label</code> is needed on the icon.</li>
            </ul>
          </Section>

        </div>

        <aside className="detail-sidebar">
          <h3>Status</h3>
          <p><span className="badge partial">Partial</span> &mdash; Component is implemented and widely used.
            Tooltip behavior and filled-icon variant need documentation review.</p>

          <h3>Source</h3>
          <a className="source-link" href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/repos/RepoChip.jsx">src/components/repos/RepoChip.jsx</a>
          <a className="source-link" href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/common/BaseEntityChip.jsx">src/components/common/BaseEntityChip.jsx</a>

          <h3>Related</h3>
          <ul>
            <li><a href="/ocl-design-system/components/html-tooltip">HTMLTooltip</a></li>
            <li><a href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/repos/RepoTooltip.jsx">RepoTooltip</a></li>
            <li><a href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/concepts/ConceptChip.jsx">ConceptChip</a></li>
            <li><a href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/mappings/MappingChip.jsx">MappingChip</a></li>
          </ul>

          <h3>Design</h3>
          <ul>
            <li><a href="/ocl-design-system/designs/Chip and Tooltip.png">Chip and Tooltip.png</a></li>
          </ul>
        </aside>
      </div>
    </main>

    <SiteFooter text="Component documented 2026-04-16 against oclweb3. Live MUI Chip examples styled to match BaseEntityChip." />
  </>
);

export default RepoChipPage;
