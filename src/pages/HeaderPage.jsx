import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import MenuList from '@mui/material/MenuList';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import PublishIcon from '@mui/icons-material/Publish';
import SchemaOutlinedIcon from '@mui/icons-material/SchemaOutlined';

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

const TEXT = { color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 };

// createItems from oclweb3 src/common/navigation.js, with the labels and icons
// AddMenuList gives each key.
const createItems = hasMapper => [
  { key: 'org', label: 'Organization', icon: <AccountBalanceIcon /> },
  { key: 'repo', label: 'Repository', icon: <FolderOutlinedIcon /> },
  ...(hasMapper ? [{ key: 'map-project', label: 'Mapping project', icon: <SchemaOutlinedIcon /> }] : []),
  { key: 'import', label: 'Bulk Import', icon: <PublishIcon />, divider: true },
];

const ITEM_SX = { padding: '8px 12px' };

// The + menu's paper as AddMenuList styles it. In the apps it is a MUI Menu
// anchored to the + button; here it is static so it stays inside the frame.
const CreateMenu = ({ hasMapper }) => (
  <Paper elevation={8} sx={{ backgroundColor: 'surface.n94', minWidth: 200 }}>
    <MenuList>
      {createItems(hasMapper).flatMap(item => [
        item.divider && <Divider key={`${item.key}-divider`} />,
        <ListItemButton key={item.key} sx={ITEM_SX}>
          <ListItemIcon sx={{ minWidth: 'auto', marginRight: '12px' }}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>,
      ])}
    </MenuList>
  </Paper>
);

const MockHeader = () => {
  const [signedIn, setSignedIn] = React.useState(true);
  const [hasMapper, setHasMapper] = React.useState(true);
  const [menuOpen, setMenuOpen] = React.useState(true);
  const showMenu = signedIn && menuOpen;

  return (
    <>
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 1.5 }}>
        <FormControlLabel control={<Switch checked={signedIn} onChange={e => setSignedIn(e.target.checked)} />} label="Signed in" />
        <FormControlLabel control={<Switch checked={hasMapper} onChange={e => setHasMapper(e.target.checked)} />} label="Mapper configured" />
      </Box>
      <Box sx={{ border: '1px solid', borderColor: 'surface.n90', borderRadius: '8px', backgroundColor: 'surface.n96', minHeight: showMenu ? 300 : 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', height: 64, pl: { xs: 2, sm: 3 }, pr: 2, color: 'surface.contrastText' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flex: '1 1 0' }}>
            {signedIn && (
              <IconButton color="inherit" aria-label="open drawer" edge="start" size="large" sx={{ mr: 2 }}>
                <MenuIcon fontSize="inherit" />
              </IconButton>
            )}
            <img src="/ocl-design-system/assets/favicon.svg" alt="OCL" style={{ height: 28 }} />
          </Box>
          <Box sx={{ flex: '0 1 320px', height: 40, borderRadius: '100px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', px: 2, color: 'text.secondary', fontSize: 14 }}>
            Search OCL...
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: '1 1 0', position: 'relative' }}>
            {signedIn && (
              <IconButton sx={{ marginRight: '8px' }} aria-label="Create" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
                <AddIcon />
              </IconButton>
            )}
            <IconButton color="primary" aria-label="Account">
              <AccountCircleIcon />
            </IconButton>
            {showMenu && (
              <Box sx={{ position: 'absolute', top: 44, right: 40, zIndex: 1 }}>
                <CreateMenu hasMapper={hasMapper} />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

const HeaderPage = () => (
  <>
    <SiteHeader section="Components" />
    <main>
      <div className="breadcrumb">
        <a href="/ocl-design-system/">Overview</a> · <a href="/ocl-design-system/components/">Components</a> · Header
      </div>
      <h1>Header</h1>
      <p className="page-intro">
        The app bar across the top of TermBrowser v3 and the OCL Mapper: the button that opens
        the <a href="/ocl-design-system/components/left-menu.html">tray</a>, the logo, search, the + (create) menu and
        the account button. It is fixed to the top of the window, below
        the <a href="/ocl-design-system/components/announcement-banner.html">AnnouncementBanner</a> when one shows.
      </p>

      <div className="component-detail">
        <div className="detail-main">

          <Section title="Example">
            <ExampleFrame note="The app bar with the + menu open. Click + to close or reopen it. In the apps the menu is a MUI Menu anchored to the + button; here it is static so it stays inside the frame. The apps show Font Awesome's diagram-project icon for Mapping project; this page shows MUI's SchemaOutlined in its place.">
              <MockHeader />
            </ExampleFrame>
          </Section>

          <Section title="Anatomy">
            <table className="props-table">
              <thead><tr><th>Part</th><th>What it is</th><th>Shown</th></tr></thead>
              <tbody>
                <tr><td><strong>App bar</strong></td><td>MUI <code>AppBar position=&quot;fixed&quot;</code>, background <code>surface.n96</code>, text <code>surface.contrastText</code>, no shadow. z-index is the drawer&apos;s + 1; <code>top: var(--announcement-height, 0px)</code>.</td><td>Always</td></tr>
                <tr><td><strong>Tray button</strong></td><td><code>IconButton</code> (<code>size=&quot;large&quot;</code>, <code>edge=&quot;start&quot;</code>, <code>aria-label=&quot;open drawer&quot;</code>) with <code>MenuIcon</code>. Opens and closes the <a href="/ocl-design-system/components/left-menu.html">tray</a>.</td><td>Signed in</td></tr>
                <tr><td><strong>Logo</strong></td><td><code>OCLLogo</code>: the OCL mark in <code>primary.main</code>, 84&times;28px, linking to <code>/</code>.</td><td>Always</td></tr>
                <tr><td><strong>Search</strong></td><td><code>SearchInput size=&quot;small&quot;</code>, centered, placeholder <code>search.input_placeholder</code> (&ldquo;Search OCL...&rdquo;).</td><td>Always</td></tr>
                <tr><td><strong>+ button</strong></td><td><code>IconButton</code> with <code>AddIcon</code>, <code>marginRight: 8px</code>. Opens the + menu below.</td><td>Signed in</td></tr>
                <tr><td><strong>Account button</strong></td><td><code>UserProfileButton</code>: a primary <code>IconButton</code> with the user&apos;s icon. Opens <code>UserMenu</code>.</td><td>Always</td></tr>
              </tbody>
            </table>
          </Section>

          <Section title="The + menu">
            <p style={TEXT}>
              One menu for everything a signed-in user can create, in this order. A divider sets Bulk Import apart. The
              Mapping project item opens the Mapper; the rest open TBv3 pages.
            </p>
            <table className="props-table">
              <thead><tr><th>#</th><th>Item</th><th>Icon</th><th>Opens</th><th>Shown</th><th><code>id</code></th></tr></thead>
              <tbody>
                <tr><td>1</td><td>Organization <span style={{ color: 'var(--text-muted)' }}>(<code>org.org</code>)</span></td><td><code>OrgIcon</code> (AccountBalance)</td><td>TBv3 <code>/orgs/new</code></td><td>Always</td><td><code>addOrg</code></td></tr>
                <tr><td>2</td><td>Repository <span style={{ color: 'var(--text-muted)' }}>(<code>repo.repo</code>)</span></td><td><code>RepoIcon</code> (FolderOutlined)</td><td>TBv3 <code>&lt;user.url&gt;repos/new</code></td><td>Always</td><td><code>addRepo</code></td></tr>
                <tr><td>3</td><td>Mapping project <span style={{ color: 'var(--text-muted)' }}>(<code>map_project.mapping_project</code>)</span></td><td>Font Awesome <code>fa-diagram-project</code>, 1.25rem</td><td>Mapper <code>/map-projects/new</code></td><td>When a Mapper is configured</td><td><code>addMapProject</code></td></tr>
                <tr><td>4</td><td>Bulk Import <span style={{ color: 'var(--text-muted)' }}>(<code>import.bulk_import</code>)</span>, after a divider</td><td><code>PublishIcon</code></td><td>TBv3 <code>/imports</code></td><td>Always</td><td><code>bulkImport</code></td></tr>
              </tbody>
            </table>
            <ul style={{ ...TEXT, marginTop: 12 }}>
              <li><strong>Menu</strong> &mdash; MUI <code>Menu</code> (<code>id=&quot;user-add-menu-list&quot;</code>) anchored to the + button; paper <code>surface.n94</code>, <code>minWidth: 200px</code>.</li>
              <li><strong>Items</strong> &mdash; links (<code>ListItemButton</code> with <code>href</code>), <code>padding: 8px 12px</code>, icon then label with a <code>12px</code> gap. Choosing one closes the menu.</li>
              <li><strong>Links into the other app</strong> go through <code>toMapperURL</code> in TBv3 and <code>toV3URL</code> in the Mapper, so the other app knows where the user came from.</li>
            </ul>
          </Section>

          <Section title="One list for both apps">
            <p style={TEXT}>
              TBv3 and the Mapper build the + menu and the tray from the same lists, <code>createItems</code> and <code>trayItems</code>{' '}
              in <code>src/common/navigation.js</code>. Each app has its own copy of the file, and the two are identical. Each item names
              the app its page is in (<code>app: &apos;v3&apos;</code> or <code>&apos;mapper&apos;</code>), so each app knows which links leave it.
              To add, remove or reorder an item, change the list in both apps, not the menu component.
            </p>
            <table className="props-table">
              <thead><tr><th>App</th><th>+ menu</th></tr></thead>
              <tbody>
                <tr><td><strong>TBv3</strong></td><td>All four items; Mapping project only when a Mapper is configured (<code>hasMapper()</code>).</td></tr>
                <tr><td><strong>Mapper, with a TermBrowser configured</strong></td><td>All four items. The TBv3 items open TBv3.</td></tr>
                <tr><td><strong>Mapper, no TermBrowser</strong></td><td>Mapping project only: the Mapper drops every item whose <code>app</code> is <code>&apos;v3&apos;</code>.</td></tr>
              </tbody>
            </table>
          </Section>

          <Section title="Code">
            <CodeSnippet
              title="createItems (oclweb3 and oclmap src/common/navigation.js)"
              code={`export const createItems = (user, hasMapper) => [
  {key: 'org', app: 'v3', path: '/orgs/new'},
  {key: 'repo', app: 'v3', path: \`\${user?.url}repos/new\`},
  ...(hasMapper ? [{key: 'map-project', app: 'mapper', path: '/map-projects/new'}] : []),
  {key: 'import', app: 'v3', path: '/imports', divider: true}
]`}
            />
            <CodeSnippet
              title="AddMenuList (oclweb3 src/components/users/AddMenuList.jsx)"
              code={`<Menu
  id='user-add-menu-list'
  anchorEl={anchorEl}
  open={open}
  onClose={onClose}
  sx={{'.MuiPaper-root': {backgroundColor: 'surface.n94', minWidth: '200px'}}}
>
  {
    createItems(user, hasMapper()).flatMap(item => [
      item.divider && <Divider key={\`\${item.key}-divider\`} />,
      <ListItemButton key={item.key} id={CREATE_ITEM_IDS[item.key]}
        href={item.app === 'mapper' ? toMapperURL(item.path) : item.path}
        sx={ITEM_SX} onClick={onClose}>
        <ListItemIcon sx={{minWidth: 'auto', marginRight: '12px'}}>
          {CREATE_ITEM_ICONS[item.key]}
        </ListItemIcon>
        <ListItemText primary={t(CREATE_ITEM_LABELS[item.key])} />
      </ListItemButton>
    ])
  }
</Menu>`}
            />
            <CodeSnippet
              title="HeaderControls (oclweb3 src/components/app/HeaderControls.jsx)"
              code={`{
  authenticated &&
    <IconButton sx={{marginRight: '8px'}} onClick={onAddMenuOpen}>
      <AddIcon />
    </IconButton>
}
<UserProfileButton onClick={() => setUserMenu(true)} />
<UserMenu isOpen={userMenu} onClose={() => setUserMenu(false)} />
{
  authenticated &&
    <AddMenuList open={addMenu} onClose={onAddMenuClose} anchorEl={addMenuAnchorEl} />
}`}
            />
          </Section>

          <Section title="Usage">
            <h4>Do</h4>
            <ul style={TEXT}>
              <li>Put a new create action in the + menu, through <code>createItems</code>, in both apps.</li>
              <li>Hide an item the user can&apos;t use in this deployment, as Mapping project is hidden without a Mapper. Don&apos;t disable it.</li>
              <li>Give icon-only buttons an accessible name. The Mapper&apos;s + button has <code>aria-label=&quot;create&quot;</code>; TBv3&apos;s has none yet.</li>
            </ul>
            <h4>Don&rsquo;t</h4>
            <ul style={TEXT}>
              <li>Don&rsquo;t add create buttons of their own to the app bar.</li>
              <li>Don&rsquo;t show the + button or the tray button to signed-out visitors.</li>
              <li>Don&rsquo;t reorder the menu in one app only.</li>
            </ul>
          </Section>

          <Section title="Where used">
            <ul style={TEXT}>
              <li><strong>TermBrowser v3</strong> &mdash; <code>Header</code> wraps every page.</li>
              <li><strong>OCL Mapper</strong> &mdash; its own <code>Header</code> and <code>HeaderControls</code>, with the same tray button, logo, + menu and account button. It has no search in the middle of the bar; signed-in users get <code>HeaderSearch</code> beside the + button instead.</li>
            </ul>
          </Section>

        </div>

        <aside className="detail-sidebar">
          <h3>Status</h3>
          <p><span className="badge ok">OK</span> &mdash; documented from oclweb3 and oclmap.</p>

          <h3>Source</h3>
          <a className="source-link" href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/app/Header.jsx">oclweb3 Header.jsx</a>
          <a className="source-link" href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/app/HeaderControls.jsx">oclweb3 HeaderControls.jsx</a>
          <a className="source-link" href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/users/AddMenuList.jsx">oclweb3 AddMenuList.jsx</a>
          <a className="source-link" href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/common/navigation.js">oclweb3 navigation.js</a>
          <a className="source-link" href="https://github.com/OpenConceptLab/oclmap/blob/main/src/components/app/HeaderControls.jsx">oclmap HeaderControls.jsx</a>
          <a className="source-link" href="https://github.com/OpenConceptLab/oclmap/blob/main/src/components/users/AddMenuList.jsx">oclmap AddMenuList.jsx</a>

          <h3>Related</h3>
          <ul>
            <li><a href="/ocl-design-system/components/left-menu.html">LeftMenu (the tray)</a></li>
            <li><a href="/ocl-design-system/components/announcement-banner.html">AnnouncementBanner</a></li>
            <li><a href="/ocl-design-system/components/common-tabs.html#profile-tabs">Profile tabs</a></li>
          </ul>
        </aside>
      </div>
    </main>

    <SiteFooter text="Component documented 2026-11-16 against oclweb3 7a0015a and oclmap 1bab10d. Live React + MUI examples." />
  </>
);

export default HeaderPage;
