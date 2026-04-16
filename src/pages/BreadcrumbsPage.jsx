import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccountBalance from '@mui/icons-material/AccountBalance';
import FolderOpen from '@mui/icons-material/FolderOpen';
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined';

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

const Dot = () => (
  <Typography sx={{ mx: 0.5, color: 'text.secondary', fontSize: 'inherit' }}>&middot;</Typography>
);

const BreadcrumbSegment = ({ icon, label, color }) => (
  <Button
    size="small"
    startIcon={icon}
    sx={{
      textTransform: 'none',
      color: color || 'inherit',
      minWidth: 'auto',
      px: 0.5,
      fontWeight: 500,
      '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' },
    }}
  >
    {label}
  </Button>
);

const BreadcrumbsPage = () => (
  <>
    <SiteHeader section="Components" />
    <main>
      <div className="breadcrumb">
        <a href="/ocl-design-system/">Overview</a> · <a href="/ocl-design-system/components/">Components</a> · Breadcrumbs
      </div>
      <h1>Breadcrumbs</h1>
      <p className="page-intro">
        Path-style navigation showing the hierarchy from owner to repo to concept/mapping. Conditionally renders
        segments based on available data, with auto-truncation of long names.
      </p>

      <div className="component-detail">
        <div className="detail-main">

          <Section title="Example">
            <ExampleFrame note="Breadcrumb segments styled like OwnerButton / RepoVersionButton. These are visual approximations using MUI Button.">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Full path with concept */}
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Full path with concept</div>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <BreadcrumbSegment icon={<AccountBalance fontSize="inherit" />} label="OCL" />
                    <Typography sx={{ color: 'text.secondary' }}>&gt;</Typography>
                    <BreadcrumbSegment icon={<FolderOpen fontSize="inherit" />} label="CIEL" />
                    <Dot />
                    <Typography sx={{ fontSize: 'inherit', color: 'text.secondary' }}>Source</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>&gt;</Typography>
                    <BreadcrumbSegment icon={<DescriptionOutlined fontSize="inherit" />} label="Concept 123" />
                  </Box>
                </div>

                {/* Shortened with mapping */}
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Shortened with mapping</div>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <BreadcrumbSegment icon={<FolderOpen fontSize="inherit" />} label="CIEL" />
                    <Dot />
                    <Typography sx={{ fontSize: 'inherit', color: 'text.secondary' }}>Source</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>&gt;</Typography>
                    <BreadcrumbSegment icon={<DescriptionOutlined fontSize="inherit" />} label="Mapping A123" />
                  </Box>
                </div>

                {/* With version */}
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>With version</div>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <BreadcrumbSegment icon={<AccountBalance fontSize="inherit" />} label="IHTSDO" />
                    <Typography sx={{ color: 'text.secondary' }}>&gt;</Typography>
                    <BreadcrumbSegment icon={<FolderOpen fontSize="inherit" />} label="SNOMED-GPS" />
                    <Dot />
                    <Typography sx={{ fontSize: 'inherit', color: 'text.secondary' }}>Source</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>&gt;</Typography>
                    <BreadcrumbSegment label="v2024.03" />
                  </Box>
                </div>
              </div>
            </ExampleFrame>
          </Section>

          <Section title="Props">
            <table className="props-table">
              <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td><code>owner</code></td><td><code>object</code></td><td>&mdash;</td><td>Owner object (user or org). Renders as OwnerButton segment.</td></tr>
                <tr><td><code>ownerType</code></td><td><code>&apos;orgs&apos; | &apos;users&apos;</code></td><td>&mdash;</td><td>Determines the owner icon and URL prefix.</td></tr>
                <tr><td><code>repo</code></td><td><code>object</code></td><td>&mdash;</td><td>Repository object. Renders as RepoVersionButton segment.</td></tr>
                <tr><td><code>repoVersion</code></td><td><code>string</code></td><td>&mdash;</td><td>Version identifier to display after repo name.</td></tr>
                <tr><td><code>repoURL</code></td><td><code>string</code></td><td>&mdash;</td><td>Override URL for the repo segment.</td></tr>
                <tr><td><code>concept</code></td><td><code>object</code></td><td>&mdash;</td><td>Concept object. Renders the final breadcrumb segment.</td></tr>
                <tr><td><code>mapping</code></td><td><code>object</code></td><td>&mdash;</td><td>Mapping object. Renders the final breadcrumb segment (alternative to concept).</td></tr>
                <tr><td><code>noIcons</code></td><td><code>bool</code></td><td><code>false</code></td><td>Hides icons from all segments.</td></tr>
                <tr><td><code>color</code></td><td><code>string</code></td><td><code>&apos;inherit&apos;</code></td><td>Text color applied to all segments.</td></tr>
                <tr><td><code>fontSize</code></td><td><code>string</code></td><td><code>&apos;14px&apos;</code></td><td>Font size for all segments.</td></tr>
                <tr><td><code>size</code></td><td><code>string</code></td><td><code>&apos;small&apos;</code></td><td>MUI Button size for each segment.</td></tr>
                <tr><td><code>ownerURL</code></td><td><code>string</code></td><td>&mdash;</td><td>Override URL for the owner segment.</td></tr>
                <tr><td><code>nested</code></td><td><code>bool</code></td><td><code>false</code></td><td>When true, hides parent segments when a concept or mapping is present (saves horizontal space).</td></tr>
              </tbody>
            </table>
          </Section>

          <Section title="Code">
            <CodeSnippet
              title="Usage examples"
              code={`import Breadcrumbs from '../common/Breadcrumbs';

// Full breadcrumb with concept
<Breadcrumbs owner={owner} ownerType="orgs" repo={repo} concept={concept} />

// Repo-level only
<Breadcrumbs owner={owner} ownerType="orgs" repo={repo} />

// Nested mode (hides parent when concept/mapping present)
<Breadcrumbs owner={owner} ownerType="orgs" repo={repo} concept={concept} nested />

// Custom styling
<Breadcrumbs owner={owner} ownerType="orgs" repo={repo} fontSize="12px" color="secondary.main" />`}
            />
          </Section>

          <Section title="Usage">
            <h4>Do</h4>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              <li>Use in headers for concepts, mappings, and forms to show location context.</li>
              <li>Use <code>nested</code> mode to save horizontal space in compact layouts.</li>
              <li>Retired items render in <code>error</code> color automatically.</li>
            </ul>
            <h4>Don&rsquo;t</h4>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              <li>Don&rsquo;t use Breadcrumbs for page-level navigation &mdash; use the app&rsquo;s URL-based routing.</li>
              <li>Don&rsquo;t manually set <code>color=&quot;error&quot;</code> &mdash; the component handles retired styling automatically.</li>
            </ul>
          </Section>

          <Section title="Where used">
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              <li><strong>ConceptHeader</strong> &mdash; full breadcrumb path to current concept.</li>
              <li><strong>ConceptForm</strong> &mdash; breadcrumb context in create/edit forms.</li>
              <li><strong>MappingHeader</strong> &mdash; full breadcrumb path to current mapping.</li>
              <li><strong>MappingForm</strong> &mdash; breadcrumb context in mapping forms.</li>
              <li><strong>ToConcept / FromConcept</strong> &mdash; inline breadcrumbs for mapping endpoints.</li>
            </ul>
          </Section>

        </div>

        <aside className="detail-sidebar">
          <h3>Status</h3>
          <p><span className="badge stub">Stub</span> &mdash; now documented. Previously undocumented.</p>

          <h3>Source</h3>
          <a className="source-link" href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/common/Breadcrumbs.jsx">src/components/common/Breadcrumbs.jsx</a>

          <h3>Related</h3>
          <ul>
            <li><a href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/common/OwnerButton.jsx">OwnerButton</a></li>
            <li><a href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/common/RepoVersionButton.jsx">RepoVersionButton</a></li>
            <li><a href="/ocl-design-system/components/repo-header.html">RepoHeader</a></li>
          </ul>
        </aside>
      </div>
    </main>

    <SiteFooter text="Component documented 2026-04-16 against oclweb3. Live React + MUI examples." />
  </>
);

export default BreadcrumbsPage;
