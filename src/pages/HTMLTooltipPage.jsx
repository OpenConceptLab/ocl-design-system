import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';

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

const tooltipSx = {
  maxWidth: 285,
  minWidth: 285,
  backgroundColor: '#fff',
  color: 'secondary.main',
  border: '1px solid',
  borderColor: 'surface.nv80',
  borderRadius: '5px',
  p: '12px',
  fontSize: 12,
  boxShadow: '0 2px 3px 0 rgba(0,0,0,0.3), 0 6px 10px 4px rgba(0,0,0,0.15)',
};

const tooltipContent = (
  <div>
    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>CIEL</div>
    <div style={{ fontSize: 12, color: '#5e5c71', marginBottom: 6 }}>Columbia International eHealth Laboratory</div>
    <div style={{ fontSize: 12, lineHeight: 1.5, marginBottom: 8 }}>
      A comprehensive medical terminology source maintained by Columbia University, widely used for global health data exchange.
    </div>
    <div style={{ fontSize: 11, color: '#5e5c71' }}>50,234 concepts &middot; Updated 3 days ago</div>
  </div>
);

const HTMLTooltipPage = () => (
  <>
    <SiteHeader section="Components" />
    <main>
      <div className="breadcrumb">
        <a href="/ocl-design-system/">Overview</a> · <a href="/ocl-design-system/components/">Components</a> · HTMLTooltip
      </div>
      <h1>HTMLTooltip</h1>
      <p className="page-intro">
        A styled MUI Tooltip that allows arbitrary HTML in the tooltip body. Used as the base for
        richer hover cards like RepoTooltip and ConceptTooltip.
      </p>

      <div className="component-detail">
        <div className="detail-main">

          <Section title="Example">
            <ExampleFrame note="Hover the button to see the tooltip. The static version below is always visible.">
              <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                {/* Live tooltip on hover */}
                <Tooltip
                  title={tooltipContent}
                  arrow={false}
                  componentsProps={{
                    tooltip: { sx: tooltipSx }
                  }}
                >
                  <Button variant="outlined" sx={{ textTransform: 'none' }}>Hover me</Button>
                </Tooltip>
              </div>
            </ExampleFrame>

            <h4 style={{ marginTop: 16 }}>Tooltip body (static)</h4>
            <ExampleFrame>
              <div style={{
                maxWidth: 285,
                minWidth: 285,
                backgroundColor: '#fff',
                color: '#333',
                border: '1px solid #c4c3d0',
                borderRadius: 5,
                padding: 12,
                fontSize: 12,
                boxShadow: '0 2px 3px 0 rgba(0,0,0,0.3), 0 6px 10px 4px rgba(0,0,0,0.15)',
              }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>CIEL</div>
                <div style={{ fontSize: 12, color: '#5e5c71', marginBottom: 6 }}>Columbia International eHealth Laboratory</div>
                <div style={{ fontSize: 12, lineHeight: 1.5, marginBottom: 8 }}>
                  A comprehensive medical terminology source maintained by Columbia University, widely used for global health data exchange.
                </div>
                <div style={{ fontSize: 11, color: '#5e5c71' }}>50,234 concepts &middot; Updated 3 days ago</div>
              </div>
            </ExampleFrame>
          </Section>

          <Section title="Anatomy">
            <ol style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              <li><strong>Container</strong> &mdash; 285px wide, white background, 1px border (<code>surface.nv80</code>), 5px border radius, drop shadow.</li>
              <li><strong>Body</strong> &mdash; arbitrary <code>children</code> rendered inside the tooltip. Styled with 12px font size and 12px padding.</li>
              <li><strong>Arrow</strong> &mdash; disabled by default (<code>arrow=false</code>). HTMLTooltip does not render the MUI arrow pointer.</li>
            </ol>
          </Section>

          <Section title="Theme defaults">
            <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>
              The HTMLTooltip styling can also be applied globally via MUI theme overrides on <code>MuiTooltip</code>.
              The component itself applies these as inline <code>componentsProps</code>.
            </p>
            <CodeSnippet title="Theme config" code={`// MuiTooltip overrides in theme
MuiTooltip: {
  styleOverrides: {
    tooltip: {
      maxWidth: 285,
      minWidth: 285,
      backgroundColor: '#fff',
      color: 'secondary.main',
      border: '1px solid',
      borderColor: 'surface.nv80',
      borderRadius: '5px',
      padding: '12px',
      fontSize: 12,
      boxShadow: '0 2px 3px 0 rgba(0,0,0,0.3), 0 6px 10px 4px rgba(0,0,0,0.15)',
    },
  },
}`} />
          </Section>

          <Section title="Code">
            <CodeSnippet code={`import Tooltip from '@mui/material/Tooltip';

// HTMLTooltip pattern — custom styled tooltip
<Tooltip
  title={<div>Rich HTML content here</div>}
  arrow={false}
  componentsProps={{
    tooltip: {
      sx: {
        maxWidth: 285, minWidth: 285,
        backgroundColor: '#fff', color: 'secondary.main',
        border: '1px solid', borderColor: 'surface.nv80',
        borderRadius: '5px', p: '12px', fontSize: 12,
        boxShadow: '0 2px 3px 0 rgba(0,0,0,0.3), 0 6px 10px 4px rgba(0,0,0,0.15)',
      }
    }
  }}
>
  <span>Trigger element</span>
</Tooltip>`} />
          </Section>

          <Section title="Usage">
            <h4>Do</h4>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              <li>Use HTMLTooltip when hover content needs formatting &mdash; titles, descriptions, metadata.</li>
              <li>Use plain MUI <code>Tooltip</code> for short, single-line text hints.</li>
              <li>Keep tooltip content under 4 lines to avoid overwhelming the user.</li>
              <li>Ensure the trigger element is focusable so keyboard users can access the tooltip.</li>
            </ul>
            <h4>Don't</h4>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              <li>Don't nest tooltips inside other tooltips.</li>
              <li>Don't put interactive elements (buttons, links) inside the tooltip body &mdash; use a Popover instead.</li>
              <li>Don't use HTMLTooltip for simple labels &mdash; it adds unnecessary DOM weight.</li>
            </ul>
          </Section>

          <Section title="Accessibility">
            <div className="todo"><strong>TODO &mdash; needs spec.</strong> Formal accessibility audit pending.</div>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              <li>MUI Tooltip uses <code>role="tooltip"</code> and <code>aria-describedby</code> by default.</li>
              <li>Rich HTML content inside tooltips may not be fully announced by all screen readers.</li>
              <li>Consider providing key information via <code>aria-label</code> on the trigger as a fallback.</li>
            </ul>
          </Section>

        </div>

        <aside className="detail-sidebar">
          <h3>Status</h3>
          <p><span className="badge ok">OK</span> &mdash; Stable component, widely used as the base for entity tooltips.</p>

          <h3>Source</h3>
          <a className="source-link" href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/common/HTMLTooltip.jsx">src/components/common/HTMLTooltip.jsx</a>

          <h3>Related</h3>
          <ul>
            <li><a href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/repos/RepoTooltip.jsx">RepoTooltip</a></li>
            <li><a href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/concepts/ConceptTooltip.jsx">ConceptTooltip</a></li>
            <li><a href="/ocl-design-system/components/repo-chip">RepoChip</a></li>
          </ul>

          <h3>Design</h3>
          <ul>
            <li><a href="/ocl-design-system/designs/Chip and Tooltip.png">Chip and Tooltip.png</a></li>
          </ul>
        </aside>
      </div>
    </main>

    <SiteFooter text="Component documented 2026-04-16 against oclweb3. Live MUI Tooltip examples." />
  </>
);

export default HTMLTooltipPage;
