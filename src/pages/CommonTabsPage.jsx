import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import ExampleFrame from '../components/ExampleFrame';
import CodeSnippet from '../components/CodeSnippet';

const Section = ({ id, title, children }) => (
  <section id={id}>
    <h2>{title}</h2>
    {children}
  </section>
);

const TEXT = { color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 };

const TAB_SX = { fontWeight: 'bold', color: 'surface.contrastText', textTransform: 'none' };

const PROFILES = {
  users: { label: 'User profile', owner: 'jdoe', viewers: { owner: 'The user', other: 'Another signed-in user', staff: 'Staff', anonymous: 'Signed out' } },
  orgs: { label: 'Organization profile', owner: 'CIEL', viewers: { owner: 'A member', other: 'A signed-in non-member', staff: 'Staff', anonymous: 'Signed out' } },
};

// canSeeMapProjects from oclweb3 src/common/mapProjects.js, given the viewer
// as one of the example's choices rather than as a user object.
const canSeeMapProjects = viewer => viewer === 'owner' || viewer === 'staff';

const ProfileTabsExample = () => {
  const [ownerType, setOwnerType] = React.useState('users');
  const [viewer, setViewer] = React.useState('owner');
  const [hasMapper, setHasMapper] = React.useState(true);
  const [tab, setTab] = React.useState('map-projects');
  const profile = PROFILES[ownerType];
  const showsTab = hasMapper && canSeeMapProjects(viewer);
  const TABS = [
    { key: 'overview', label: 'Overview' },
    { key: 'repos', label: 'Repositories' },
    ...(showsTab ? [{ key: 'map-projects', label: 'Mapping Projects' }] : []),
  ];
  // A tab this viewer doesn't get shows Overview instead, as in UserHome and OrgHome
  const value = TABS.some(t => t.key === tab) ? tab : 'overview';
  const blocked = ownerType === 'users' && viewer === 'anonymous';

  let reason;
  if (!hasMapper)
    reason = 'No Mapper is configured, so no one gets the tab.';
  else if (viewer === 'staff')
    reason = 'Staff get the tab on every profile.';
  else if (viewer === 'owner')
    reason = ownerType === 'users' ? 'A user gets the tab on their own profile.' : 'Members of an organization get the tab on its profile.';
  else if (viewer === 'other')
    reason = ownerType === 'users' ? 'No one else gets the tab on a user\u2019s profile, except staff.' : 'Non-members don\u2019t get the tab on an organization\u2019s profile.';
  else
    reason = 'Signed-out visitors never get the tab.';

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1.5, mb: 2 }}>
        <ToggleButtonGroup size="small" exclusive value={ownerType} onChange={(e, v) => v && setOwnerType(v)}>
          {Object.entries(PROFILES).map(([key, { label }]) => (
            <ToggleButton key={key} value={key} sx={{ textTransform: 'none' }}>{label}</ToggleButton>
          ))}
        </ToggleButtonGroup>
        <ToggleButtonGroup size="small" exclusive value={viewer} onChange={(e, v) => v && setViewer(v)} sx={{ flexWrap: 'wrap' }}>
          {Object.entries(profile.viewers).map(([key, label]) => (
            <ToggleButton key={key} value={key} sx={{ textTransform: 'none' }}>{label}</ToggleButton>
          ))}
        </ToggleButtonGroup>
        <FormControlLabel control={<Switch checked={hasMapper} onChange={e => setHasMapper(e.target.checked)} />} label="Mapper configured" />
      </Box>
      {blocked ? (
        <Box sx={{ p: 2, color: 'text.secondary', fontSize: 13, border: '1px dashed', borderColor: 'surface.nv80', borderRadius: '8px' }}>
          Signed-out visitors can&rsquo;t open a user&rsquo;s profile at all: TBv3 shows its 401 page.
        </Box>
      ) : (
        <Box sx={{ width: '100%', border: '1px solid', borderColor: 'surface.nv80', borderRadius: '10px', overflow: 'hidden' }}>
          <Tabs
            value={value}
            onChange={(e, v) => setTab(v)}
            indicatorColor="primary"
            variant="fullWidth"
            sx={{ backgroundColor: 'surface.main', borderBottom: '1px solid', borderColor: 'surface.nv80' }}
          >
            {TABS.map(t => <Tab key={t.key} label={t.label} value={t.key} sx={TAB_SX} />)}
          </Tabs>
          <Box sx={{ p: 2, color: 'text.secondary', fontSize: 13 }}>
            <code>/{ownerType}/{profile.owner}/{value === 'overview' ? '' : value}</code> &middot; {reason}
          </Box>
        </Box>
      )}
    </>
  );
};

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

            <Section id="profile-tabs" title="Profile tabs">
              <p style={TEXT}>
                User and organization profiles (<code>UserHome</code>, <code>OrgHome</code>) show <strong>Overview</strong> and{' '}
                <strong>Repositories</strong>, then the tabs <code>useProfileTabs(ownerType, owner)</code> returns for the
                viewer. The first of those is <strong>Mapping Projects</strong> (<code>map_project.mapping_projects</code>).
                A tab&apos;s URL is the profile&apos;s plus its key: <code>/users/jdoe/map-projects</code>,{' '}
                <code>/orgs/CIEL/map-projects</code>. A viewer who opens the URL of a tab they don&apos;t get sees Overview.
              </p>
              <ExampleFrame note="Pick a profile and a viewer to see who gets the Mapping Projects tab. Click a tab to switch.">
                <ProfileTabsExample />
              </ExampleFrame>

              <h4 style={{ marginTop: 24 }}>Who sees the Mapping Projects tab</h4>
              <p style={TEXT}>
                Mapping projects are private: only their owner, members of the organization that owns them, and staff can
                see them. So only those viewers get the tab, and only when a Mapper is configured (<code>hasMapper()</code>).
              </p>
              <table className="props-table">
                <thead><tr><th>Viewer</th><th>User profile</th><th>Organization profile</th></tr></thead>
                <tbody>
                  <tr><td>Signed out</td><td>No (user profiles need sign-in)</td><td>No</td></tr>
                  <tr><td>The user themselves</td><td>Yes</td><td>&mdash;</td></tr>
                  <tr><td>A member of the organization (in the viewer&apos;s <code>subscribed_orgs</code>)</td><td>&mdash;</td><td>Yes</td></tr>
                  <tr><td>Any other signed-in user</td><td>No</td><td>No</td></tr>
                  <tr><td>Staff (<code>is_staff</code>)</td><td>Yes</td><td>Yes</td></tr>
                </tbody>
              </table>

              <h4 style={{ marginTop: 24 }}>What the tab shows</h4>
              <ul style={TEXT}>
                <li>A table of projects (<code>MapProjects</code>): ID, Project Name, Owner, Created By and Updated By, each of the last two with a relative time under it. A project&apos;s name opens it in the Mapper.</li>
                <li>On a user&apos;s profile, the user&apos;s own projects, then their organizations&apos; projects, paged as one list. On an organization&apos;s, the organization&apos;s projects. The tray&apos;s <a href="/ocl-design-system/components/left-menu.html">My Mapping Projects</a> count is the length of the user&apos;s list.</li>
                <li>Above the table, the count (&ldquo;7 mapping projects&rdquo;) and, when the URL has <code>?q=</code>, a chip with the search that clears it.</li>
                <li>Pagination at the bottom: 10, 25, 50 or 100 rows, 25 by default.</li>
                <li>Skeleton rows while loading; &ldquo;No mapping projects yet.&rdquo; when there are none; &ldquo;Could not load mapping projects.&rdquo; with a Try again link when a request fails.</li>
              </ul>

              <h4 style={{ marginTop: 24 }}>Adding a profile tab</h4>
              <ul style={TEXT}>
                <li>Add it through <code>useProfileTabs</code>, not in <code>UserHome</code> or <code>OrgHome</code>. Further tabs come after Mapping Projects. Each one says which profiles it belongs on (<code>ownerTypes</code>) and who sees it (<code>isVisible(&#123;ownerType, owner, currentUser&#125;)</code>), and renders through <code>ProfileTabContent</code>.</li>
                <li>A tab whose content is private shows only to viewers allowed to see that content. Don&apos;t show it with an empty or error state to everyone else.</li>
                <li>Its key is its URL segment. The profile routes in <code>App.jsx</code> accept only the keys in <code>orgTabs</code>, so a new tab&apos;s key goes there as well.</li>
              </ul>

              <CodeSnippet
                title="canSeeMapProjects (oclweb3 src/common/mapProjects.js)"
                code={`// Mapping projects are private: only their owner, members of the owning
// organization and staff can see them, so only they get the profile tab.
export const canSeeMapProjects = (currentUser, ownerType, owner) => {
  if(!currentUser?.username || !owner)
    return false
  if(currentUser.is_staff)
    return true
  if(ownerType === 'users')
    return currentUser.username === owner
  if(ownerType === 'orgs')
    return Boolean(currentUser.subscribed_orgs?.some(org => org?.id === owner))
  return false
}`}
              />
              <CodeSnippet
                title="useProfileTabs and UserHome (oclweb3 src/hooks/useProfileTabs.js, src/components/users/UserHome.jsx)"
                code={`// useProfileTabs
return React.useMemo(() => [
  ...(hasMapper() && canSeeMapProjects(getCurrentUser(), ownerType, owner)
    ? [{key: 'map-projects', label: t('map_project.mapping_projects')}] : []),
  ...pluginTabs.filter(tab => isOwnerTab(tab, ownerType, owner))
], [pluginTabs, ownerType, owner, t])

// UserHome (OrgHome is the same with 'orgs')
const extraTabs = useProfileTabs('users', params?.user)
const TABS = [
  {key: 'overview', label: t('common.overview')},
  {key: 'repos', label: t('repo.repos')},
  ...extraTabs.map(({key, label}) => ({key, label}))
]`}
              />
            </Section>

            <Section title="Where used">
              <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
                <li><strong>RepoHome</strong> &mdash; concepts / mappings / references tabs.</li>
                <li><strong>UserHome</strong> &mdash; user profile tabs: Overview, Repositories, then the <a href="#profile-tabs">profile tabs</a>.</li>
                <li><strong>OrgHome</strong> &mdash; organization profile tabs: Overview, Repositories, then the <a href="#profile-tabs">profile tabs</a>.</li>
              </ul>
            </Section>

          </div>

          <aside className="detail-sidebar">
            <h3>Status</h3>
            <p><span className="badge stub">Stub</span> &mdash; now documented. Previously undocumented.</p>

            <h3>Source</h3>
            <a className="source-link" href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/common/CommonTabs.jsx">src/components/common/CommonTabs.jsx</a>

            <h3>Profile tabs</h3>
            <a className="source-link" href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/hooks/useProfileTabs.js">src/hooks/useProfileTabs.js</a>
            <a className="source-link" href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/common/mapProjects.js">src/common/mapProjects.js</a>
            <a className="source-link" href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/map-projects/MapProjects.jsx">src/components/map-projects/MapProjects.jsx</a>
            <a className="source-link" href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/common/ProfileTabContent.jsx">src/components/common/ProfileTabContent.jsx</a>

            <h3>Related</h3>
            <ul>
              <li><a href="/ocl-design-system/components/left-menu.html">LeftMenu (the tray)</a></li>
              <li><a href="/ocl-design-system/components/header.html">Header and the + menu</a></li>
            </ul>
          </aside>
        </div>
      </main>

      <SiteFooter text="Component documented 2026-04-16 against oclweb3; profile tabs 2026-11-16 against oclweb3 7a0015a. Live React + MUI examples." />
    </>
  );
};

export default CommonTabsPage;
