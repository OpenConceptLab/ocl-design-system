import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import Timeline from '@mui/icons-material/Timeline';
import SaveOutlined from '@mui/icons-material/SaveOutlined';
import FileDownloadOutlined from '@mui/icons-material/FileDownloadOutlined';
import MoreVert from '@mui/icons-material/MoreVert';
import ContentCopy from '@mui/icons-material/ContentCopy';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';

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

const TierDivider = () => (
  <Box sx={{ width: '1px', height: 24, backgroundColor: 'divider', mx: 0.5 }} />
);

const OverflowMenu = ({ collapsedItems = [] }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const close = () => setAnchorEl(null);
  return (
    <>
      <Tooltip title="More actions" placement="bottom">
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} aria-label="More actions">
          <MoreVert />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={close} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        {collapsedItems.map((item) => (
          <MenuItem key={item.label} onClick={close}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </MenuItem>
        ))}
        {collapsedItems.length > 0 && <Divider />}
        <MenuItem onClick={close}>
          <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
          <ListItemText>Create similar</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={close} sx={{ color: 'error.main' }}>
          <ListItemIcon sx={{ color: 'error.main' }}><DeleteOutlined fontSize="small" /></ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

const Toolbar = ({ visibleSecondary, collapsedSecondary }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, padding: 1, border: '1px solid', borderColor: 'divider', borderRadius: 2, backgroundColor: 'background.paper' }}>
    {visibleSecondary.includes('settings') && (
      <Tooltip title="Settings" placement="bottom"><IconButton><SettingsOutlined /></IconButton></Tooltip>
    )}
    {visibleSecondary.includes('timeline') && (
      <Tooltip title="Timeline" placement="bottom"><IconButton><Timeline /></IconButton></Tooltip>
    )}
    {visibleSecondary.includes('download') && (
      <Tooltip title="Download" placement="bottom"><IconButton><FileDownloadOutlined /></IconButton></Tooltip>
    )}
    {visibleSecondary.length > 0 && <TierDivider />}
    <Tooltip title="Save" placement="bottom"><IconButton color="primary"><SaveOutlined /></IconButton></Tooltip>
    <TierDivider />
    <OverflowMenu collapsedItems={collapsedSecondary} />
  </Box>
);

const allSecondary = ['settings', 'timeline', 'download'];

const collapsedItemMap = {
  settings: { label: 'Settings', icon: <SettingsOutlined fontSize="small" /> },
  timeline: { label: 'Timeline', icon: <Timeline fontSize="small" /> },
  download: { label: 'Download', icon: <FileDownloadOutlined fontSize="small" /> },
};

const WorkspaceToolbarPage = () => (
  <>
    <SiteHeader section="Components" />
    <main>
      <div className="breadcrumb">
        <a href="/ocl-design-system/">Overview</a> · <a href="/ocl-design-system/components/">Components</a> · WorkspaceToolbar
      </div>
      <h1>WorkspaceToolbar</h1>
      <p className="page-intro">
        Horizontal icon toolbar for the right edge of a workspace header. Tiers actions by importance
        (primary / secondary / tertiary), collapses secondary actions into an overflow <a href="/ocl-design-system/components/kebab-menu.html">kebab</a>
        as the viewport narrows, and keeps tertiary actions permanently in the kebab. Distinct from
        the <a href="/ocl-design-system/components/repo-header.html">RepoHeader Manage menu</a>, which uses a labeled dropdown on a page header.
      </p>

      <div className="component-detail">
        <div className="detail-main">

          <Section title="Example">
            <ExampleFrame note="Three states showing how secondary actions collapse leftmost-first as the viewport narrows. Save and the overflow kebab remain visible at all widths.">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>Wide &mdash; all secondary actions visible</div>
                  <Toolbar visibleSecondary={allSecondary} collapsedSecondary={[]} />
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>Medium &mdash; Settings collapsed into overflow</div>
                  <Toolbar visibleSecondary={['timeline', 'download']} collapsedSecondary={[collapsedItemMap.settings]} />
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>Narrow &mdash; all secondary actions collapsed</div>
                  <Toolbar visibleSecondary={[]} collapsedSecondary={[collapsedItemMap.settings, collapsedItemMap.timeline, collapsedItemMap.download]} />
                </div>
              </div>
            </ExampleFrame>
          </Section>

          <Section title="Tiering model">
            <table className="props-table">
              <thead>
                <tr><th>Tier</th><th>Behavior</th><th>Example actions</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Primary</strong></td>
                  <td>Always visible. Last to collapse. Anchored to the right of the visible icon cluster.</td>
                  <td>Save</td>
                </tr>
                <tr>
                  <td><strong>Secondary</strong></td>
                  <td>Visible when room allows. Collapse into the overflow menu leftmost-first as the viewport narrows.</td>
                  <td>Settings, Timeline, Download</td>
                </tr>
                <tr>
                  <td><strong>Tertiary</strong></td>
                  <td>Always in the overflow menu regardless of viewport width.</td>
                  <td>Create similar, Delete</td>
                </tr>
              </tbody>
            </table>
          </Section>

          <Section title="Anatomy">
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              <li><strong>Layout</strong> &mdash; <code>[Secondary cluster]</code> <code>|</code> <code>[Primary]</code> <code>|</code> <code>[⋮ Overflow]</code>, left to right. A subtle <code>1px</code> vertical divider between tiers improves scan-ability.</li>
              <li><strong>Secondary order</strong> &mdash; group by lifecycle: configure &rarr; inspect &rarr; export. Leftmost collapses first.</li>
              <li><strong>Tooltips</strong> &mdash; every icon wrapped in <code>&lt;Tooltip placement=&quot;bottom&quot;&gt;</code> so labels render below the toolbar and don&rsquo;t collide with adjacent icons.</li>
              <li><strong>Overflow menu</strong> &mdash; uses the <a href="/ocl-design-system/components/kebab-menu.html">KebabMenu</a> pattern. Collapsed-secondary items appear first (in original left-to-right order), then a divider, then tertiary items, then destructive items separated by another divider.</li>
            </ul>
          </Section>

          <Section title="Responsive collapse">
            <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
              As the container narrows, secondary icons are measured off the left edge of the cluster and folded
              into the overflow menu one at a time until only Primary + Overflow remain. The primary action
              never collapses. Tertiary actions never leave the overflow.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
              Implementations can use <code>ResizeObserver</code> on the toolbar container to measure
              available width, or CSS container queries (<code>@container</code>) if the container is set up for it.
              For a single well-defined breakpoint set, MUI&rsquo;s <code>useMediaQuery</code> is the simplest option.
            </p>
          </Section>

          <Section title="Code">
            <CodeSnippet
              title="Toolbar with responsive collapse (MUI + useMediaQuery)"
              code={`import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import Timeline from '@mui/icons-material/Timeline';
import SaveOutlined from '@mui/icons-material/SaveOutlined';
import FileDownloadOutlined from '@mui/icons-material/FileDownloadOutlined';

import KebabMenu from '../common/KebabMenu';

const WorkspaceToolbar = ({ onSave, onSettings, onTimeline, onDownload, onCreateSimilar, onDelete }) => {
  const wide = useMediaQuery('(min-width: 900px)');
  const medium = useMediaQuery('(min-width: 700px)');

  const secondaryVisible = [
    medium && { key: 'settings', label: 'Settings', icon: <SettingsOutlined />, onClick: onSettings },
    wide   && { key: 'timeline', label: 'Timeline', icon: <Timeline />,          onClick: onTimeline },
    wide   && { key: 'download', label: 'Download', icon: <FileDownloadOutlined />, onClick: onDownload },
  ].filter(Boolean);

  const secondaryCollapsed = [
    !medium && { label: 'Settings', icon: <SettingsOutlined fontSize="small" />, onClick: onSettings },
    !wide   && { label: 'Timeline', icon: <Timeline fontSize="small" />,         onClick: onTimeline },
    !wide   && { label: 'Download', icon: <FileDownloadOutlined fontSize="small" />, onClick: onDownload },
  ].filter(Boolean);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
      {secondaryVisible.map((item) => (
        <Tooltip key={item.key} title={item.label} placement="bottom">
          <IconButton onClick={item.onClick}>{item.icon}</IconButton>
        </Tooltip>
      ))}
      {secondaryVisible.length > 0 && <TierDivider />}
      <Tooltip title="Save" placement="bottom">
        <IconButton color="primary" onClick={onSave}><SaveOutlined /></IconButton>
      </Tooltip>
      <TierDivider />
      <KebabMenu
        items={[
          ...secondaryCollapsed,
          secondaryCollapsed.length > 0 && { type: 'divider' },
          { label: 'Create similar', icon: <ContentCopy fontSize="small" />, onClick: onCreateSimilar },
          { type: 'divider' },
          { label: 'Delete', icon: <DeleteOutlined fontSize="small" />, onClick: onDelete, destructive: true },
        ].filter(Boolean)}
      />
    </Box>
  );
};`}
            />
          </Section>

          <Section title="Usage">
            <h4>Do</h4>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              <li>Use for the right-side action cluster on workspace pages where the user does most of their work.</li>
              <li>Tier actions deliberately: one or two primaries, a small secondary cluster, and the rest in overflow.</li>
              <li>Order secondary icons by lifecycle: configure &rarr; inspect &rarr; export.</li>
              <li>Preserve the primary action at all viewport widths. If you find it collapsing, re-tier.</li>
            </ul>
            <h4>Don&rsquo;t</h4>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              <li>Don&rsquo;t use this on a <em>page header</em> (repo, concept, mapping) &mdash; use the <a href="/ocl-design-system/components/repo-header.html">Manage menu</a> pattern instead.</li>
              <li>Don&rsquo;t scatter primary actions on both sides of the workspace &mdash; the CTA (Save, Auto Match, etc.) should have a single, predictable home.</li>
              <li>Don&rsquo;t collapse <em>primary</em> actions. If the toolbar is so crowded you&rsquo;re tempted, the tiering is wrong.</li>
              <li>Don&rsquo;t skip the tier dividers &mdash; they&rsquo;re what makes the hierarchy legible.</li>
            </ul>
          </Section>

          <Section title="Where used">
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              <li><strong>MapProject workspace (Controls.jsx)</strong> &mdash; the canonical implementation. See <a href="https://github.com/OpenConceptLab/ocl_issues/issues/2487">ocl_issues#2487</a>.</li>
            </ul>
          </Section>

        </div>

        <aside className="detail-sidebar">
          <h3>Status</h3>
          <p><span className="badge ok">OK</span> &mdash; pattern documented. No extracted reusable component yet; implemented inline at consumers.</p>

          <h3>Source</h3>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Pattern-only. Inline implementation lives in <a href="https://github.com/OpenConceptLab/oclmap/blob/main/src/components/map-projects/Controls.jsx">oclmap Controls.jsx</a>.
          </p>

          <h3>Related</h3>
          <ul>
            <li><a href="/ocl-design-system/components/kebab-menu.html">KebabMenu</a></li>
            <li><a href="/ocl-design-system/components/repo-header.html">RepoHeader (Manage menu)</a></li>
            <li><a href="/ocl-design-system/components/button.html">Button (IconButton)</a></li>
          </ul>

          <h3>Tickets</h3>
          <ul>
            <li><a href="https://github.com/OpenConceptLab/ocl_issues/issues/2488">ocl_issues#2488</a> &mdash; pattern documentation (this page)</li>
            <li><a href="https://github.com/OpenConceptLab/ocl_issues/issues/2487">ocl_issues#2487</a> &mdash; consumer: MapProject workspace toolbar</li>
          </ul>
        </aside>
      </div>
    </main>

    <SiteFooter text="Pattern documented 2026-04-24. Drives ocl_issues#2487." />
  </>
);

export default WorkspaceToolbarPage;
