import React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MoreVert from '@mui/icons-material/MoreVert';
import ContentCopy from '@mui/icons-material/ContentCopy';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';

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

const KebabMenuExample = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Tooltip title="More actions" placement="bottom">
        <IconButton onClick={handleOpen} aria-label="More actions" aria-haspopup="true" aria-expanded={open ? 'true' : undefined}>
          <MoreVert />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MenuItem onClick={handleClose}>
          <ListItemIcon><EditOutlined fontSize="small" /></ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
          <ListItemText>Create similar</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>
          <ListItemIcon sx={{ color: 'error.main' }}><DeleteOutlined fontSize="small" /></ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

const DestructiveOnlyExample = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  return (
    <>
      <Tooltip title="More actions" placement="bottom">
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} aria-label="More actions">
          <MoreVert />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MenuItem onClick={() => setAnchorEl(null)} sx={{ color: 'error.main' }}>
          <ListItemIcon sx={{ color: 'error.main' }}><DeleteOutlined fontSize="small" /></ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

const KebabMenuPage = () => (
  <>
    <SiteHeader section="Components" />
    <main>
      <div className="breadcrumb">
        <a href="/ocl-design-system/">Overview</a> · <a href="/ocl-design-system/components/">Components</a> · KebabMenu
      </div>
      <h1>KebabMenu</h1>
      <p className="page-intro">
        Compact overflow menu triggered by a vertical-ellipsis icon. Use to group secondary and destructive actions
        in dense surfaces — table rows, workspace toolbars, list items — where a labeled trigger would crowd the layout.
        For page headers where the menu is a primary navigational element, use the <a href="/ocl-design-system/components/repo-header.html">Manage menu</a> pattern instead.
      </p>

      <div className="component-detail">
        <div className="detail-main">

          <Section title="Example">
            <ExampleFrame note="Click the kebab to open the menu. Destructive actions are separated by a divider and styled in error.main.">
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16 }}>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Project row</span>
                <KebabMenuExample />
              </div>
            </ExampleFrame>
          </Section>

          <Section title="Anatomy">
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              <li><strong>Trigger</strong> &mdash; <code>&lt;IconButton&gt;</code> wrapping <code>&lt;MoreVert /&gt;</code>, wrapped in a <code>&lt;Tooltip title=&quot;More actions&quot; placement=&quot;bottom&quot;&gt;</code>.</li>
              <li><strong>Menu</strong> &mdash; MUI <code>&lt;Menu&gt;</code> anchored to the trigger with <code>anchorOrigin={'{ vertical: \'bottom\', horizontal: \'right\' }'}</code> and <code>transformOrigin={'{ vertical: \'top\', horizontal: \'right\' }'}</code> so it opens below and right-aligned with the kebab.</li>
              <li><strong>Items</strong> &mdash; <code>&lt;MenuItem&gt;</code> with optional <code>&lt;ListItemIcon&gt;</code> + <code>&lt;ListItemText&gt;</code>. Order: most-frequent at top, destructive at bottom.</li>
              <li><strong>Destructive separation</strong> &mdash; precede destructive items with a <code>&lt;Divider /&gt;</code> and apply <code>sx={'{{ color: \'error.main\' }}'}</code> to both the <code>MenuItem</code> and its <code>ListItemIcon</code>.</li>
            </ul>
          </Section>

          <Section title="Variants">
            <ExampleFrame note="Destructive-only menu: when only one action exists and it is destructive, the divider is unnecessary but the red treatment still applies.">
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16 }}>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Read-only row</span>
                <DestructiveOnlyExample />
              </div>
            </ExampleFrame>
          </Section>

          <Section title="Code">
            <CodeSnippet
              title="Standard kebab with mixed + destructive items"
              code={`import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MoreVert from '@mui/icons-material/MoreVert';
import ContentCopy from '@mui/icons-material/ContentCopy';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';

const RowActions = ({ onCopy, onDelete }) => {
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
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={close}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={() => { onCopy(); close(); }}>
          <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
          <ListItemText>Create similar</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => { onDelete(); close(); }} sx={{ color: 'error.main' }}>
          <ListItemIcon sx={{ color: 'error.main' }}><DeleteOutlined fontSize="small" /></ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};`}
            />
          </Section>

          <Section title="Kebab vs. Manage menu">
            <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
              The design system has two overflow-menu patterns. They serve different contexts and are not interchangeable.
            </p>
            <table className="props-table">
              <thead>
                <tr><th>&nbsp;</th><th>Kebab (this page)</th><th><a href="/ocl-design-system/components/repo-header.html">Manage menu</a></th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Trigger</strong></td>
                  <td><code>&lt;IconButton&gt;&lt;MoreVert /&gt;</code> with tooltip</td>
                  <td><code>&lt;Button variant=&quot;text&quot;&gt;Manage ▾&lt;/Button&gt;</code></td>
                </tr>
                <tr>
                  <td><strong>Visual weight</strong></td>
                  <td>Low — single icon, blends with surrounding controls</td>
                  <td>Medium — labeled, visually anchors the header</td>
                </tr>
                <tr>
                  <td><strong>Use when</strong></td>
                  <td>The menu is a <em>secondary affordance</em> in a dense surface (table row, workspace toolbar, list item) where surrounding controls already convey context</td>
                  <td>The menu is a <em>primary navigational element</em> of a page header (RepoHeader, ProjectHeader) and warrants a labeled trigger</td>
                </tr>
                <tr>
                  <td><strong>Examples</strong></td>
                  <td>MapProjects table row (per-project actions); MapProject toolbar overflow</td>
                  <td>RepoHeader (create concept / mapping / version, delete repo)</td>
                </tr>
                <tr>
                  <td><strong>Destructive actions</strong></td>
                  <td>Separated by <code>&lt;Divider /&gt;</code>, styled <code>color: 'error.main'</code></td>
                  <td>Same separation rule applies inside the menu</td>
                </tr>
              </tbody>
            </table>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 12 }}>
              <strong>Open question:</strong> bulk-action toolbars, modal headers, and sidebar items aren't yet covered by either pattern.
              When you encounter one, document the choice on the page where it lives so the convention can converge.
            </p>
          </Section>

          <Section title="Usage">
            <h4>Do</h4>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              <li>Always wrap the trigger in a <code>Tooltip</code> with <code>placement=&quot;bottom&quot;</code> so it doesn't collide with adjacent controls.</li>
              <li>Place destructive actions at the bottom, separated by a <code>Divider</code>, styled <code>color: 'error.main'</code>.</li>
              <li>Order other items by frequency: most-used at top.</li>
              <li>Right-align the menu to the kebab (<code>horizontal: 'right'</code> on both anchor and transform origins) so it doesn't push off the right edge of dense layouts.</li>
            </ul>
            <h4>Don&rsquo;t</h4>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              <li>Don&rsquo;t use a kebab on a page header where Manage menu applies &mdash; the labeled trigger is part of the header's information design.</li>
              <li>Don&rsquo;t hide the kebab on hover only &mdash; it must be discoverable without hovering.</li>
              <li>Don&rsquo;t put primary actions inside a kebab. If something is the main action, it should be a visible button.</li>
              <li>Don&rsquo;t skip the divider before destructive items &mdash; the visual break prevents accidental clicks.</li>
            </ul>
          </Section>

          <Section title="Where used">
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              <li><strong>MapProjects table</strong> &mdash; per-row actions menu (Create similar, Delete). See <a href="https://github.com/OpenConceptLab/ocl_issues/issues/2486">ocl_issues#2486</a>.</li>
              <li><strong>MapProject workspace toolbar</strong> &mdash; overflow menu for tertiary and collapsed-secondary actions. See <a href="/ocl-design-system/components/workspace-toolbar.html">WorkspaceToolbar</a> and <a href="https://github.com/OpenConceptLab/ocl_issues/issues/2487">ocl_issues#2487</a>.</li>
            </ul>
          </Section>

        </div>

        <aside className="detail-sidebar">
          <h3>Status</h3>
          <p><span className="badge ok">OK</span> &mdash; pattern documented. No extracted reusable component yet; implemented inline at consumers.</p>

          <h3>Source</h3>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Pattern-only. Inline implementations live in <a href="https://github.com/OpenConceptLab/oclmap/blob/main/src/components/map-projects/MapProjects.jsx">oclmap MapProjects.jsx</a> and <a href="https://github.com/OpenConceptLab/oclmap/blob/main/src/components/map-projects/Controls.jsx">Controls.jsx</a>.
          </p>

          <h3>Related</h3>
          <ul>
            <li><a href="/ocl-design-system/components/workspace-toolbar.html">WorkspaceToolbar</a></li>
            <li><a href="/ocl-design-system/components/repo-header.html">RepoHeader (Manage menu)</a></li>
            <li><a href="/ocl-design-system/components/button.html">Button (IconButton)</a></li>
          </ul>

          <h3>Tickets</h3>
          <ul>
            <li><a href="https://github.com/OpenConceptLab/ocl_issues/issues/2488">ocl_issues#2488</a> &mdash; pattern documentation (this page)</li>
            <li><a href="https://github.com/OpenConceptLab/ocl_issues/issues/2486">ocl_issues#2486</a> &mdash; consumer: MapProjects dashboard row actions</li>
            <li><a href="https://github.com/OpenConceptLab/ocl_issues/issues/2487">ocl_issues#2487</a> &mdash; consumer: MapProject workspace toolbar</li>
          </ul>
        </aside>
      </div>
    </main>

    <SiteFooter text="Pattern documented 2026-04-24. Drives ocl_issues#2486 and ocl_issues#2487." />
  </>
);

export default KebabMenuPage;
