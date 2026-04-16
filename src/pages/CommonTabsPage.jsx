import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

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

const CommonTabsPage = () => {
  const [tab1, setTab1] = React.useState('concepts');
  const [tab2, setTab2] = React.useState('concepts');

  return (
    <>
      <SiteHeader section="Components" />
      <main>
        <div className="breadcrumb">
          <a href="/ocl-design-system/">Overview</a> · <a href="/ocl-design-system/components/">Components</a> · CommonTabs
        </div>
        <h1>CommonTabs</h1>
        <p className="page-intro">
          A wrapper around MUI&rsquo;s Tabs/Tab that applies OCL styling: full-width tabs with <code>surface.main</code> background,
          primary indicator color, and bold <code>contrastText</code> labels. Used for navigation within entity pages.
        </p>

        <div className="component-detail">
          <div className="detail-main">

            <Section title="Example">
              <h4>Repo page tabs (3 tabs)</h4>
              <ExampleFrame note="Full-width tabs as used on RepoHome. Click to switch active tab.">
                <Box sx={{ width: '100%' }}>
                  <Tabs
                    value={tab1}
                    onChange={(e, v) => setTab1(v)}
                    indicatorColor="primary"
                    variant="fullWidth"
                    sx={{
                      backgroundColor: 'surface.main',
                      borderBottom: '1px solid',
                      borderColor: 'surface.nv80',
                    }}
                  >
                    <Tab label="Concepts" value="concepts"
                      sx={{ fontWeight: 'bold', color: 'surface.contrastText', textTransform: 'none' }} />
                    <Tab label="Mappings" value="mappings"
                      sx={{ fontWeight: 'bold', color: 'surface.contrastText', textTransform: 'none' }} />
                    <Tab label="References" value="references"
                      sx={{ fontWeight: 'bold', color: 'surface.contrastText', textTransform: 'none' }} />
                  </Tabs>
                  <Box sx={{ p: 2, color: 'text.secondary', fontSize: 13 }}>
                    Active tab: <strong>{tab1}</strong>
                  </Box>
                </Box>
              </ExampleFrame>

              <h4 style={{ marginTop: 24 }}>Source page tabs (2 tabs)</h4>
              <ExampleFrame note="A simpler two-tab layout for Source pages.">
                <Box sx={{ width: '100%' }}>
                  <Tabs
                    value={tab2}
                    onChange={(e, v) => setTab2(v)}
                    indicatorColor="primary"
                    variant="fullWidth"
                    sx={{
                      backgroundColor: 'surface.main',
                      borderBottom: '1px solid',
                      borderColor: 'surface.nv80',
                    }}
                  >
                    <Tab label="Concepts" value="concepts"
                      sx={{ fontWeight: 'bold', color: 'surface.contrastText', textTransform: 'none' }} />
                    <Tab label="Mappings" value="mappings"
                      sx={{ fontWeight: 'bold', color: 'surface.contrastText', textTransform: 'none' }} />
                  </Tabs>
                  <Box sx={{ p: 2, color: 'text.secondary', fontSize: 13 }}>
                    Active tab: <strong>{tab2}</strong>
                  </Box>
                </Box>
              </ExampleFrame>
            </Section>

            <Section title="Props">
              <table className="props-table">
                <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
                <tbody>
                  <tr><td><code>TABS</code></td><td><code>array of &#123;key, label&#125;</code></td><td>&mdash;</td><td>Array of tab definitions. Each object needs a <code>key</code> (value) and <code>label</code> (display text).</td></tr>
                  <tr><td><code>sx</code></td><td><code>object</code></td><td>&mdash;</td><td>MUI system style overrides merged with defaults.</td></tr>
                  <tr><td><code>value</code></td><td><code>string</code></td><td>&mdash;</td><td>The currently active tab key (controlled).</td></tr>
                  <tr><td><code>onChange</code></td><td><code>func</code></td><td>&mdash;</td><td>Callback fired when a tab is clicked. Signature: <code>(event, newValue) =&gt; void</code>.</td></tr>
                  <tr><td colSpan={4} style={{ color: 'var(--text-muted)', fontSize: 11 }}>
                    All other MUI Tabs props are forwarded via rest spread.
                  </td></tr>
                </tbody>
              </table>
            </Section>

            <Section title="Code">
              <CodeSnippet
                title="The OCL CommonTabs component (from src/components/common/CommonTabs.jsx)"
                code={`import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const CommonTabs = ({ TABS, sx, ...rest }) => (
  <Tabs
    indicatorColor="primary"
    variant="fullWidth"
    sx={{
      backgroundColor: 'surface.main',
      borderBottom: '1px solid',
      borderColor: 'surface.nv80',
      ...sx,
    }}
    {...rest}
  >
    {TABS.map(tab => (
      <Tab key={tab.key} label={tab.label} value={tab.key}
        sx={{ fontWeight: 'bold', color: 'surface.contrastText', textTransform: 'none' }} />
    ))}
  </Tabs>
);`}
              />
              <CodeSnippet
                title="Usage in a page component"
                code={`const TABS = [
  { key: 'concepts', label: t('concept.concepts') },
  { key: 'mappings', label: t('mapping.mappings') },
];
const [tab, setTab] = React.useState('concepts');

<CommonTabs TABS={TABS} value={tab} onChange={(e, v) => setTab(v)} />`}
              />
            </Section>

            <Section title="Where used">
              <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
                <li><strong>RepoHome</strong> &mdash; concepts / mappings / references tabs.</li>
                <li><strong>UserHome</strong> &mdash; user profile section tabs.</li>
                <li><strong>OrgHome</strong> &mdash; organization section tabs.</li>
              </ul>
            </Section>

          </div>

          <aside className="detail-sidebar">
            <h3>Status</h3>
            <p><span className="badge stub">Stub</span> &mdash; now documented. Previously undocumented.</p>

            <h3>Source</h3>
            <a className="source-link" href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/common/CommonTabs.jsx">src/components/common/CommonTabs.jsx</a>
          </aside>
        </div>
      </main>

      <SiteFooter text="Component documented 2026-04-16 against oclweb3. Live React + MUI examples." />
    </>
  );
};

export default CommonTabsPage;
