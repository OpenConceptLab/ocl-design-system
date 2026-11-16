import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import SchemaOutlinedIcon from '@mui/icons-material/SchemaOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

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

// Sample data for the example. Counts are made up.
const ORGS = ['CIEL', 'OCL', 'WHO'];
const FOLLOWING = [
  { name: 'CIEL', icon: <FolderOutlinedIcon /> },
  { name: 'SNOMED-GPS', icon: <FolderOutlinedIcon /> },
  { name: 'Malaria', icon: <DescriptionOutlinedIcon /> },
];

const TRAY_ITEMS = {
  dashboard: { label: 'My Dashboard', Icon: DashboardIcon },
  repos: { label: 'My Repositories', Icon: FolderOutlinedIcon, count: 12 },
  'map-projects': { label: 'My Mapping Projects', Icon: SchemaOutlinedIcon, count: 7 },
};

const ITEM_SX = { minHeight: 56, justifyContent: 'initial', px: 2, borderRadius: '100px' };
const GROUP_ITEM_SX = { minHeight: 56, justifyContent: 'initial', padding: '0px 16px', borderRadius: '100px' };

const GroupRow = ({ label, icon, iconColor, selected, onClick }) => (
  <ListItem disablePadding sx={{ display: 'block' }}>
    <ListItemButton selected={selected} onClick={onClick} sx={GROUP_ITEM_SX}>
      <ListItemIcon sx={{ minWidth: 45, mr: 1.75, justifyContent: 'center', color: iconColor }}>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  </ListItem>
);

const GroupHeading = ({ children }) => (
  <Typography component="div" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>{children}</Typography>
);

// What each setup shows, from LeftMenu.jsx in oclweb3 and oclmap.
const SETUPS = {
  tbv3: { label: 'TBv3 with a Mapper', items: ['dashboard', 'repos', 'map-projects'], groups: true },
  'tbv3-no-mapper': { label: 'TBv3, no Mapper', items: ['dashboard', 'repos'], groups: true },
  'mapper-alone': { label: 'Mapper, no TermBrowser', items: ['map-projects'], groups: false },
};

// The tray's contents as LeftMenu renders them.
const Tray = () => {
  const [setup, setSetup] = React.useState('tbv3');
  const [selected, setSelected] = React.useState('dashboard');
  const { items, groups } = SETUPS[setup];

  return (
    <>
      <ToggleButtonGroup size="small" exclusive value={setup} onChange={(e, v) => v && setSetup(v)} sx={{ mb: 2, flexWrap: 'wrap' }}>
        {Object.entries(SETUPS).map(([key, { label }]) => (
          <ToggleButton key={key} value={key} sx={{ textTransform: 'none' }}>{label}</ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Paper elevation={16} sx={{ width: 360, maxWidth: '100%', borderRadius: '16px', padding: '12px', backgroundColor: 'default.main' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', px: 1, minHeight: 56 }}>
          <GroupHeading>Quick Links</GroupHeading>
        </Box>
        <List sx={{ p: 0 }}>
          {items.map(key => {
            const { label, Icon, count } = TRAY_ITEMS[key];
            const isSelected = selected === key;
            return (
              <ListItem key={key} disablePadding sx={{ display: 'block' }}>
                <ListItemButton selected={isSelected} onClick={() => setSelected(key)} sx={ITEM_SX}>
                  <ListItemIcon sx={{ minWidth: 0, mr: 1.75, justifyContent: 'center' }}>
                    <Icon color={isSelected ? 'primary' : undefined} />
                  </ListItemIcon>
                  <ListItemText primary={label} />
                  {count !== undefined && <span><b>{count.toLocaleString()}</b></span>}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        {groups && (
          <>
            <Divider sx={{ width: '100%', mt: 2 }} />
            <List dense sx={{ maxHeight: 300, overflow: 'auto', p: 0 }}>
              <ListItem
                disablePadding
                sx={{ display: 'block', padding: 1 }}
                secondaryAction={
                  <Button edge="end" aria-label="Create" variant="text" color="primary" sx={{ textTransform: 'none' }}>
                    <b>Create</b>
                  </Button>
                }
              >
                <ListItemText primary={<GroupHeading>My Organizations</GroupHeading>} />
              </ListItem>
              {ORGS.map(org => {
                const isSelected = selected === `org-${org}`;
                return (
                  <GroupRow key={org} label={org} icon={<AccountBalanceIcon />} iconColor={isSelected ? 'primary.main' : undefined}
                    selected={isSelected} onClick={() => setSelected(`org-${org}`)} />
                );
              })}
            </List>
            <Divider sx={{ width: '100%' }} />
            <List dense sx={{ maxHeight: 300, overflow: 'auto', p: 0 }}>
              <ListItem disablePadding sx={{ display: 'block', padding: 1 }} secondaryAction={<span><b>{FOLLOWING.length}</b></span>}>
                <ListItemText primary={<GroupHeading>Following</GroupHeading>} />
              </ListItem>
              {FOLLOWING.map(followed => {
                const isSelected = selected === `following-${followed.name}`;
                return (
                  <GroupRow key={followed.name} label={followed.name} icon={followed.icon} iconColor={isSelected ? 'primary.main' : 'secondary.main'}
                    selected={isSelected} onClick={() => setSelected(`following-${followed.name}`)} />
                );
              })}
            </List>
          </>
        )}
        <Divider sx={{ width: '100%', mt: groups ? 0 : 2 }} />
        <List sx={{ p: 0 }}>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton sx={ITEM_SX}>
              <ListItemIcon sx={{ minWidth: 0, mr: 1.75, justifyContent: 'center' }}>
                <GroupsOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="OCL Community website" />
            </ListItemButton>
          </ListItem>
        </List>
      </Paper>
    </>
  );
};

const LeftMenuPage = () => (
  <>
    <SiteHeader section="Components" />
    <main>
      <div className="breadcrumb">
        <a href="/ocl-design-system/">Overview</a> · <a href="/ocl-design-system/components/">Components</a> · LeftMenu
      </div>
      <h1>LeftMenu (the tray)</h1>
      <p className="page-intro">
        The tray: the drawer that opens from the left when a signed-in user clicks the menu button at the start of
        the <a href="/ocl-design-system/components/header.html">app bar</a>. It holds the user&apos;s quick links with their
        counts, their organizations with an inline Create button, what they follow, and a link to the community site.
        TermBrowser v3 and the OCL Mapper show the same tray, built from the same list.
      </p>

      <div className="component-detail">
        <div className="detail-main">

          <Section title="Example">
            <ExampleFrame note="The tray's contents for each setup. Click an item to select it. In the apps the tray is a modal drawer over the page; here its paper is static. Organizations, follows and counts are sample data. The apps show Font Awesome's diagram-project icon for Mapping Projects; this page shows MUI's SchemaOutlined in its place.">
              <Tray />
            </ExampleFrame>
          </Section>

          <Section title="Anatomy">
            <p style={TEXT}>Four groups, top to bottom, with a divider between each.</p>
            <table className="props-table">
              <thead><tr><th>Group</th><th>Contents</th></tr></thead>
              <tbody>
                <tr><td><strong>Quick Links</strong> <span style={{ color: 'var(--text-muted)' }}>(<code>common.quick_links</code>)</span></td><td>The tray items below, each with its count where it has one.</td></tr>
                <tr><td><strong>My Organizations</strong> <span style={{ color: 'var(--text-muted)' }}>(<code>org.my</code>)</span></td><td>An inline <strong>Create</strong> button on the heading row, then the user&apos;s organizations: those with a logo first, then the rest, each set by id A&ndash;Z. Each shows its logo or <code>AccountBalance</code> and its name, and links to the organization.</td></tr>
                <tr><td><strong>Following</strong> <span style={{ color: 'var(--text-muted)' }}>(<code>common.following</code>)</span></td><td>A count on the heading row, then everything the user follows: an <code>EntityIcon</code> (<code>secondary.main</code>, <code>primary.main</code> when it is the current page) and the name, or the id when there is no name. Each links to the followed object.</td></tr>
                <tr><td><strong>OCL Community website</strong> <span style={{ color: 'var(--text-muted)' }}>(<code>common.community_website</code>)</span></td><td><code>GroupsOutlined</code> icon. Opens the community site in a new tab.</td></tr>
              </tbody>
            </table>
          </Section>

          <Section title="Tray items">
            <p style={TEXT}>
              The Quick Links come from <code>trayItems</code> in <code>src/common/navigation.js</code>, in this order. The
              Mapping Projects item opens the user&apos;s <a href="/ocl-design-system/components/common-tabs.html#profile-tabs">Mapping Projects profile tab</a>.
            </p>
            <table className="props-table">
              <thead><tr><th>#</th><th>Item</th><th>Icon</th><th>Opens</th><th>Count</th><th>Shown</th></tr></thead>
              <tbody>
                <tr><td>1</td><td>My Dashboard <span style={{ color: 'var(--text-muted)' }}>(<code>dashboard.my</code>)</span></td><td><code>Dashboard</code></td><td><code>/</code></td><td>None</td><td>Always</td></tr>
                <tr><td>2</td><td>My Repositories <span style={{ color: 'var(--text-muted)' }}>(<code>user.my_repositories</code>)</span></td><td><code>FolderOutlined</code></td><td><code>&lt;user.url&gt;repos</code></td><td>The user&apos;s sources plus collections, from the cached user (<code>user.sources + user.collections</code>)</td><td>Always</td></tr>
                <tr><td>3</td><td>My Mapping Projects <span style={{ color: 'var(--text-muted)' }}>(<code>user.my_mapping_projects</code>)</span></td><td>Font Awesome <code>fa-diagram-project</code>, 1.25rem</td><td><code>&lt;user.url&gt;map-projects</code></td><td>The user&apos;s own projects plus their organizations&apos; projects</td><td>When a Mapper is configured</td></tr>
              </tbody>
            </table>
            <ul style={{ ...TEXT, marginTop: 12 }}>
              <li><strong>Selected</strong> &mdash; My Dashboard only on <code>/</code>. The other items stay selected on their own path and on every path below it (<code>isTrayItemSelected</code>). A selected item&apos;s icon turns <code>primary</code>.</li>
              <li><strong>Counts</strong> &mdash; bold, at the end of the row, formatted with <code>toLocaleString()</code>. The Mapping Projects count is fetched when the tray opens: two requests with <code>limit=1</code>, to <code>users/&lt;user&gt;/map-projects/</code> and <code>users/&lt;user&gt;/orgs/map-projects/</code>, adding up their <code>num_found</code> headers. It matches the list on the user&apos;s Mapping Projects tab. The first time the tray opens, the row shows no count until both requests return. <code>LeftMenu</code> stays mounted and keeps the count, so later opens show the last count until the new one arrives. A request that fails adds 0.</li>
              <li><strong>Refresh</strong> &mdash; opening the tray refreshes the cached user, so My Organizations and Following show the latest.</li>
            </ul>
          </Section>

          <Section title="My Organizations and the inline Create button">
            <ul style={TEXT}>
              <li>The Create button sits on the heading row as the list item&apos;s <code>secondaryAction</code>: a text <code>Button</code>, <code>color=&quot;primary&quot;</code>, bold label, <code>textTransform: none</code>, <code>aria-label</code> from <code>common.create</code>.</li>
              <li>It opens <code>/orgs/new</code>, the same page as Organization in the <a href="/ocl-design-system/components/header.html">+ menu</a>. It is the tray&apos;s only create action.</li>
              <li>The organization list is dense and scrolls past <code>300px</code>; so does Following.</li>
            </ul>
          </Section>

          <Section title="Following">
            <ul style={TEXT}>
              <li>The count on the heading row is the number of items listed under it.</li>
              <li>A user&apos;s following list keeps follows of objects they can no longer view, with no object. TBv3 drops those (<code>getFollowedObjects</code> in <code>src/common/following.js</code>), so they are neither listed nor counted.</li>
            </ul>
          </Section>

          <Section title="Drawer and items">
            <table className="props-table">
              <thead><tr><th>What</th><th>Rule</th></tr></thead>
              <tbody>
                <tr><td><strong>Drawer</strong></td><td>The common <code>Drawer</code> with <code>anchor=&quot;left&quot;</code>: <code>min-width: 360px</code>, <code>border-radius: 16px</code>, <code>padding: 12px</code>, background <code>default.main</code> (<code>surface.n96</code>). Its z-index, 1202, is above the app bar&apos;s, so the tray covers the bar. Clicking outside it, or any link in it, closes it.</td></tr>
                <tr><td><strong>Heading</strong></td><td>&ldquo;Quick Links&rdquo; in <code>secondary.main</code>, bold, in a toolbar-height row. The group headings use the same style.</td></tr>
                <tr><td><strong>Tray items</strong></td><td><code>ListItemButton</code> with <code>href</code>, <code>minHeight: 56</code>, <code>px: 2</code>, <code>borderRadius: 100px</code>, icon <code>mr: 1.75</code>.</td></tr>
                <tr><td><strong>Organizations, follows</strong></td><td>The same pill rows with <code>padding: 0 16px</code>, a <code>45px</code> icon column and <code>maxWidth: 336px</code>.</td></tr>
              </tbody>
            </table>
          </Section>

          <Section title="In the Mapper">
            <p style={TEXT}>
              The Mapper builds its tray from its copy of the same <code>trayItems</code> list.
            </p>
            <ul style={TEXT}>
              <li><strong>With a TermBrowser configured</strong> &mdash; the same tray as TBv3, Mapping Projects included. Every item, organization and follow opens in TBv3 (<code>toV3URL</code>).</li>
              <li><strong>Without one</strong> &mdash; only My Mapping Projects, opening the Mapper&apos;s own project list, then the community link. No My Organizations, no Following.</li>
              <li>The Mapping Projects count is the same sum as in TBv3.</li>
            </ul>
          </Section>

          <Section title="Code">
            <CodeSnippet
              title="trayItems and isTrayItemSelected (oclweb3 and oclmap src/common/navigation.js)"
              code={`export const trayItems = (user, hasMapper) => [
  {key: 'dashboard', app: 'v3', path: '/', labelKey: 'dashboard.my'},
  {key: 'repos', app: 'v3', path: \`\${user?.url}repos\`, labelKey: 'user.my_repositories'},
  ...(hasMapper ? [{key: 'map-projects', app: 'v3', path: \`\${user?.url}map-projects\`, labelKey: 'user.my_mapping_projects'}] : [])
]

export const isTrayItemSelected = (item, pathname) => {
  if(!pathname)
    return false
  if(item.key === 'dashboard')
    return pathname === item.path
  const base = item.path.replace(/\\/+$/, '')
  return pathname === base || pathname === \`\${base}/\` || pathname.startsWith(\`\${base}/\`)
}`}
            />
            <CodeSnippet
              title="A tray row (oclweb3 src/components/app/LeftMenu.jsx)"
              code={`trayItems(user, hasMapper()).map(item => {
  const selected = isTrayItemSelected(item, location.pathname)
  return (
    <ListItem key={item.key} disablePadding sx={{ display: 'block' }}>
      <ListItemButton onClick={onClose} href={item.path} className='no-anchor-styles' selected={selected}
        sx={{ minHeight: 56, justifyContent: 'initial', px: 2, borderRadius: '100px' }}>
        <ListItemIcon sx={{ minWidth: 0, mr: 1.75, justifyContent: 'center' }}>
          {TRAY_ICONS[item.key](selected)}
        </ListItemIcon>
        <ListItemText primary={t(item.labelKey)} />
        {item.key === 'map-projects' && mapProjectCount !== null &&
          <span><b>{mapProjectCount.toLocaleString()}</b></span>}
      </ListItemButton>
    </ListItem>
  )
})`}
            />
            <CodeSnippet
              title="The Mapping Projects count (oclweb3 src/hooks/useMapProjectCount.js)"
              code={`// LeftMenu: the signed-in user's projects plus their organizations' projects
const mapProjectCount = useMapProjectCount(user?.username, isOpen && hasMapper())

// Each request asks for one project and reads the total from the num_found header
const requests = [requestCount(() => APIService.users(owner).appendToUrl('map-projects/'), \`users/\${owner}\`)]
requests.push(requestCount(() => APIService.users(owner).appendToUrl('orgs/map-projects/'), \`users/\${owner}/orgs\`))
Promise.all(requests).then(responses => setCount(projectCount(...responses)))`}
            />
          </Section>

          <Section title="Usage">
            <h4>Do</h4>
            <ul style={TEXT}>
              <li>Add a quick link through <code>trayItems</code>, in both apps, so the tray stays the same everywhere.</li>
              <li>Show a count only when it matches what the link opens, as Mapping Projects&apos; count matches the tab&apos;s list.</li>
              <li>Hide a count until it has loaded; don&apos;t show 0 in its place.</li>
            </ul>
            <h4>Don&rsquo;t</h4>
            <ul style={TEXT}>
              <li>Don&rsquo;t put create actions in the tray beyond the organization Create button; they belong in the <a href="/ocl-design-system/components/header.html">+ menu</a>.</li>
              <li>Don&rsquo;t show the tray, or its button, to signed-out visitors.</li>
            </ul>
          </Section>

          <Section title="Where used">
            <ul style={TEXT}>
              <li><strong>TermBrowser v3</strong> &mdash; <code>Header</code> renders <code>LeftMenu</code> and toggles it from the menu button.</li>
              <li><strong>OCL Mapper</strong> &mdash; its own <code>LeftMenu</code>, as above.</li>
            </ul>
          </Section>

        </div>

        <aside className="detail-sidebar">
          <h3>Status</h3>
          <p><span className="badge ok">OK</span> &mdash; documented from oclweb3 and oclmap.</p>

          <h3>Source</h3>
          <a className="source-link" href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/app/LeftMenu.jsx">oclweb3 LeftMenu.jsx</a>
          <a className="source-link" href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/common/navigation.js">oclweb3 navigation.js</a>
          <a className="source-link" href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/hooks/useMapProjectCount.js">oclweb3 useMapProjectCount.js</a>
          <a className="source-link" href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/common/following.js">oclweb3 following.js</a>
          <a className="source-link" href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/common/Drawer.jsx">oclweb3 Drawer.jsx</a>
          <a className="source-link" href="https://github.com/OpenConceptLab/oclmap/blob/main/src/components/app/LeftMenu.jsx">oclmap LeftMenu.jsx</a>

          <h3>Related</h3>
          <ul>
            <li><a href="/ocl-design-system/components/header.html">Header and the + menu</a></li>
            <li><a href="/ocl-design-system/components/common-tabs.html#profile-tabs">Profile tabs</a></li>
          </ul>
        </aside>
      </div>
    </main>

    <SiteFooter text="Component documented 2026-11-16 against oclweb3 7a0015a and oclmap 1bab10d. Live React + MUI examples." />
  </>
);

export default LeftMenuPage;
