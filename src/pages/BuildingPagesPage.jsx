import React from 'react';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import CodeSnippet from '../components/CodeSnippet';

const Section = ({ title, children }) => (
  <section>
    <h2>{title}</h2>
    {children}
  </section>
);

const BuildingPagesPage = () => (
  <>
    <SiteHeader section="Guides" />
    <main className="narrow">
      <div className="breadcrumb">
        <a href="/ocl-design-system/">Overview</a> · Guides · Building Pages
      </div>
      <h1>Building Pages in oclweb3</h1>
      <p className="page-intro">
        A developer guide to building new pages in{' '}
        <a href="https://github.com/OpenConceptLab/oclweb3">oclweb3</a>.
        Covers the standard page scaffold, routing, API patterns, i18n, shared
        utilities, and a worked example. This is the reference that turns the
        design system from a visual catalog into a development toolkit.
      </p>
      <p className="page-intro">
        This guide also applies to{' '}
        <a href="https://github.com/OpenConceptLab/oclmap">oclmap</a>, which
        shares the same theme, components, and patterns.
      </p>

      <Section title="Page scaffold">
        <p style={{ color: 'var(--text-secondary)', marginBottom: 12 }}>
          Every oclweb3 page follows the same pattern: a function component that
          uses React Router hooks for URL state, <code>useTranslation</code> for
          i18n, <code>OperationsContext</code> for global state, and{' '}
          <code>APIService</code> for data fetching.
        </p>
        <CodeSnippet title="Standard page imports" code={`
import React from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Paper from '@mui/material/Paper';

import APIService from '../../services/APIService';
import { isLoggedIn, getCurrentUser } from '../../common/utils';
import { OperationsContext } from '../app/LayoutContext';
`} />
        <CodeSnippet title="Minimal page component" code={`
const MyPage = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const params = useParams()
  const { setAlert } = React.useContext(OperationsContext)

  const [loading, setLoading] = React.useState(true)
  const [data, setData] = React.useState(null)

  const fetchData = () => {
    setLoading(true)
    APIService.new()
      .overrideURL(\`/orgs/\${params.owner}/sources/\${params.repo}/\`)
      .get()
      .then(response => {
        setData(response?.data || {})
        setLoading(false)
      })
  }

  React.useEffect(() => {
    fetchData()
  }, [params.owner, params.repo])

  if (loading) return <div>Loading...</div>

  return (
    <Paper sx={{ p: 2 }}>
      <h1>{data?.name}</h1>
      <p>{data?.description}</p>
    </Paper>
  )
}

export default MyPage;
`} />
      </Section>

      <Section title="Routing">
        <p style={{ color: 'var(--text-secondary)', marginBottom: 12 }}>
          oclweb3 uses React Router v5 with <code>HashRouter</code>. All routes
          are defined in <code>src/components/app/App.jsx</code>. URL parameters
          use named patterns with regex constraints.
        </p>
        <CodeSnippet title="Adding a new route in App.jsx" code={`
// Public route
<Route exact path="/my-page" component={MyPage} />

// Route with URL parameters
<Route exact path="/:ownerType(users|orgs)/:owner/:repoType(sources|collections)/:repo/my-feature"
  component={MyFeaturePage} />

// Authenticated-only route
<AuthenticationRequiredRoute exact path="/my-page"
  component={MyPage} />

// Staff-only route
<StaffUserRoute exact path="/admin/my-page"
  component={AdminPage} />
`} />
        <h4>Route wrapper components</h4>
        <table className="props-table">
          <thead><tr><th>Wrapper</th><th>Access</th><th>Redirects to</th></tr></thead>
          <tbody>
            <tr><td><code>Route</code></td><td>Public &mdash; anyone</td><td>&mdash;</td></tr>
            <tr><td><code>AuthenticationRequiredRoute</code></td><td>Logged-in users only</td><td>Sign in page</td></tr>
            <tr><td><code>SessionUserRoute</code></td><td>Current authenticated user only</td><td>403</td></tr>
            <tr><td><code>StaffUserRoute</code></td><td>Staff/admin users</td><td>403</td></tr>
            <tr><td><code>SelfOrStaffRoute</code></td><td>The user themselves or staff</td><td>403</td></tr>
          </tbody>
        </table>
        <h4>URL parameter patterns</h4>
        <CodeSnippet language="text" title="Common URL shapes" code={`
/                                           → Dashboard
/search                                     → Search
/:ownerType(users|orgs)/:owner              → Org or User profile
/:ownerType/:owner/:repoType/:repo          → Repository home
/:ownerType/:owner/:repoType/:repo/concepts → Concepts tab
/:ownerType/:owner/:repoType/:repo/:repoVersion → Versioned repo
`} />
      </Section>

      <Section title="API patterns">
        <p style={{ color: 'var(--text-secondary)', marginBottom: 12 }}>
          All API calls go through <code>APIService</code> (
          <code>src/services/APIService.js</code>). It's a chainable builder
          that constructs URLs and sends requests via axios.
        </p>
        <CodeSnippet title="Common API patterns" code={`
// GET a resource by URL path
APIService.new()
  .overrideURL('/orgs/OCL/sources/CIEL/')
  .get()
  .then(response => {
    const data = response?.data || {}
  })

// GET with query parameters
APIService.new()
  .overrideURL('/orgs/OCL/sources/CIEL/concepts/')
  .get(null, null, { limit: 25, page: 1, verbose: true })
  .then(response => {
    const concepts = response?.data || []
  })

// POST (create)
APIService.sources('CIEL')
  .concepts()
  .post(newConceptData)
  .then(response => {
    setAlert({ message: 'Concept created', severity: 'success' })
  })

// PUT (update)
APIService.new()
  .overrideURL(concept.url)
  .put(updatedData)

// DELETE
APIService.new()
  .overrideURL(concept.url)
  .delete()

// Appending to URL
APIService.new()
  .overrideURL('/orgs/OCL/sources/CIEL/')
  .appendToUrl('summary/')
  .get(null, null, { verbose: true })
`} />
        <h4>Available resource chains</h4>
        <table className="props-table">
          <thead><tr><th>Chain</th><th>URL produced</th></tr></thead>
          <tbody>
            <tr><td><code>APIService.orgs('OCL')</code></td><td><code>/orgs/OCL/</code></td></tr>
            <tr><td><code>APIService.orgs('OCL').sources('CIEL')</code></td><td><code>/orgs/OCL/sources/CIEL/</code></td></tr>
            <tr><td><code>APIService.sources('CIEL').concepts()</code></td><td><code>/sources/CIEL/concepts/</code></td></tr>
            <tr><td><code>APIService.users('admin').orgs()</code></td><td><code>/users/admin/orgs/</code></td></tr>
            <tr><td><code>APIService.new().overrideURL(url)</code></td><td>Any arbitrary API path</td></tr>
          </tbody>
        </table>
      </Section>

      <Section title="Global context (OperationsContext)">
        <p style={{ color: 'var(--text-secondary)', marginBottom: 12 }}>
          <code>OperationsContext</code> (from{' '}
          <code>src/components/app/LayoutContext.jsx</code>) provides global
          state shared across the app. Access it with{' '}
          <code>React.useContext</code>.
        </p>
        <CodeSnippet title="Using OperationsContext" code={`
import { OperationsContext } from '../app/LayoutContext';

const MyComponent = () => {
  const {
    setAlert,          // Show toast: setAlert({ message: '...', severity: 'success' })
    setContextRepo,    // Set the active repo for the sidebar
    toggles,           // Feature flags from the API
    openOperations,    // Whether the operations panel is open
    setOpenOperations, // Toggle the operations panel
    menuOpen,          // Whether the left nav is open
    setMenuOpen,       // Toggle the left nav
  } = React.useContext(OperationsContext)

  const handleSave = () => {
    // ... save logic ...
    setAlert({ message: t('common.save_success'), severity: 'success' })
  }
}
`} />
      </Section>

      <Section title="Internationalization (i18n)">
        <p style={{ color: 'var(--text-secondary)', marginBottom: 12 }}>
          oclweb3 uses <code>react-i18next</code>. Translation files are in{' '}
          <code>src/i18n/locales/[lang]/translations.json</code>. Supported
          languages: English (en), Spanish (es), Chinese (zh).
        </p>
        <CodeSnippet title="Using translations" code={`
import { useTranslation, Trans } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation()

  return (
    <div>
      {/* Simple key lookup */}
      <h1>{t('concept.concepts')}</h1>
      <p>{t('repo.create_source_subtext')}</p>

      {/* With interpolation */}
      <p>{t('common.count_items', { count: results.length })}</p>

      {/* JSX inside translations — use Trans component */}
      <Trans i18nKey="repo.learn_more">
        Learn more about <a href="/docs">managing repos</a>.
      </Trans>
    </div>
  )
}
`} />
        <h4>Translation key conventions</h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
          Keys follow <code>domain.feature</code> pattern:
          <code> concept.concepts</code>, <code>repo.source</code>,{' '}
          <code>mapping.mappings</code>, <code>common.submit</code>,{' '}
          <code>common.cancel</code>, <code>common.create</code>,{' '}
          <code>common.delete</code>, <code>common.save_success</code>.
        </p>
      </Section>

      <Section title="Common utilities">
        <p style={{ color: 'var(--text-secondary)', marginBottom: 12 }}>
          <code>src/common/utils.js</code> exports 50+ utility functions. These
          are the most frequently used &mdash; check the source before writing
          your own.
        </p>

        <h4>Authentication</h4>
        <table className="props-table">
          <thead><tr><th>Function</th><th>Returns</th><th>Use for</th></tr></thead>
          <tbody>
            <tr><td><code>isLoggedIn()</code></td><td><code>bool</code></td><td>Check if user is authenticated</td></tr>
            <tr><td><code>getCurrentUser()</code></td><td><code>object</code></td><td>Get the current user object (from localStorage)</td></tr>
            <tr><td><code>getCurrentUserOrgs()</code></td><td><code>array</code></td><td>Get the user's organizations</td></tr>
            <tr><td><code>currentUserHasAccess()</code></td><td><code>bool</code></td><td>Check write access to a resource</td></tr>
            <tr><td><code>isAdminUser()</code></td><td><code>bool</code></td><td>Check if user is admin/staff</td></tr>
            <tr><td><code>isSuperuser()</code></td><td><code>bool</code></td><td>Check if user is superuser</td></tr>
          </tbody>
        </table>

        <h4>URL helpers</h4>
        <table className="props-table">
          <thead><tr><th>Function</th><th>Example</th><th>Use for</th></tr></thead>
          <tbody>
            <tr><td><code>toParentURI(url)</code></td><td><code>'/orgs/OCL/sources/CIEL/concepts/123/'</code> &rarr; <code>'/orgs/OCL/sources/CIEL/'</code></td><td>Navigate up one level</td></tr>
            <tr><td><code>toOwnerURI(url)</code></td><td><code>'/orgs/OCL/sources/CIEL/'</code> &rarr; <code>'/orgs/OCL/'</code></td><td>Get the owner URL</td></tr>
            <tr><td><code>dropVersion(url)</code></td><td><code>'/orgs/OCL/sources/CIEL/v2024.03/'</code> &rarr; <code>'/orgs/OCL/sources/CIEL/'</code></td><td>Strip version from URL</td></tr>
            <tr><td><code>toFullURL(relativeUrl)</code></td><td>Prepends the app's base URL</td><td>Build absolute URLs</td></tr>
            <tr><td><code>toFullAPIURL(relativeUrl)</code></td><td>Prepends the API base URL</td><td>Build API URLs</td></tr>
          </tbody>
        </table>

        <h4>Formatting</h4>
        <table className="props-table">
          <thead><tr><th>Function</th><th>Use for</th></tr></thead>
          <tbody>
            <tr><td><code>formatDate(date)</code></td><td>Format a date for display</td></tr>
            <tr><td><code>formatDateTime(date)</code></td><td>Format date + time for display</td></tr>
            <tr><td><code>formatWebsiteLink(url)</code></td><td>Clean up a URL for display (strip protocol)</td></tr>
          </tbody>
        </table>

        <h4>Data</h4>
        <table className="props-table">
          <thead><tr><th>Function</th><th>Use for</th></tr></thead>
          <tbody>
            <tr><td><code>downloadObject(data, filename, type)</code></td><td>Download a JSON/CSV object as a file</td></tr>
            <tr><td><code>downloadFromURL(url)</code></td><td>Download from a URL (triggers browser download)</td></tr>
            <tr><td><code>arrayToCSV(array)</code></td><td>Convert an array of objects to CSV string</td></tr>
          </tbody>
        </table>
      </Section>

      <Section title="Theme and styling">
        <p style={{ color: 'var(--text-secondary)', marginBottom: 12 }}>
          oclweb3 uses MUI v5.18 with a custom Material Design 3 color palette.
          Styles are applied via the <code>sx</code> prop. Always use{' '}
          <code>textTransform: 'none'</code> on buttons &mdash; OCL never uses
          uppercase labels.
        </p>
        <CodeSnippet title="Common styling patterns" code={`
// Using theme palette colors via sx prop
<Paper sx={{ backgroundColor: 'surface.main', p: 2 }}>
  <Button
    variant="contained"
    sx={{ borderRadius: '100px', textTransform: 'none' }}
    startIcon={<Add />}
  >
    Create
  </Button>
</Paper>

// Using color constants directly
import { PRIMARY_COLORS, SURFACE_COLORS } from '../../common/colors';

<div style={{ color: SURFACE_COLORS.contrastText }}>
  Text on surface
</div>

// Common spacing pattern (layout wrapper)
<div className='col-xs-12 padding-0'
  style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
  <div className='col-xs-12 padding-0' style={{ maxWidth: 'calc(1440px - 32px)' }}>
    {/* Page content */}
  </div>
</div>
`} />
        <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
          See the <a href="/ocl-design-system/foundations/color.html">Color foundation</a> page for the full palette,
          and the <a href="/ocl-design-system/components/button.html">Button component</a> page for button styling patterns.
        </p>
      </Section>

      <Section title="Common components">
        <p style={{ color: 'var(--text-secondary)', marginBottom: 12 }}>
          Before building custom UI, check{' '}
          <code>src/components/common/</code> for existing components. These are
          the most frequently used:
        </p>
        <table className="props-table">
          <thead><tr><th>Component</th><th>Import from</th><th>Use for</th></tr></thead>
          <tbody>
            <tr><td><code>Button</code></td><td><code>../common/Button</code></td><td>Pill-shaped action buttons (wraps MUI Chip)</td></tr>
            <tr><td><code>AddButton</code></td><td><code>../common/AddButton</code></td><td>Pill button with + icon</td></tr>
            <tr><td><code>CommonTabs</code></td><td><code>../common/CommonTabs</code></td><td>Tab strip for repo/concept pages</td></tr>
            <tr><td><code>Dialog</code></td><td><code>../common/Dialog</code></td><td>Modal wrapper with header/footer</td></tr>
            <tr><td><code>Alert</code></td><td><code>../common/Alert</code></td><td>Inline status messaging</td></tr>
            <tr><td><code>Breadcrumbs</code></td><td><code>../common/Breadcrumbs</code></td><td>Path navigation</td></tr>
            <tr><td><code>HTMLTooltip</code></td><td><code>../common/HTMLTooltip</code></td><td>Rich tooltips with HTML content</td></tr>
            <tr><td><code>DeleteIconButton</code></td><td><code>../common/DeleteIconButton</code></td><td>Trash icon button for delete actions</td></tr>
            <tr><td><code>CloseIconButton</code></td><td><code>../common/CloseIconButton</code></td><td>X icon button for close/dismiss</td></tr>
            <tr><td><code>FollowActionButton</code></td><td><code>../common/FollowActionButton</code></td><td>Follow/unfollow toggle</td></tr>
            <tr><td><code>RepoChip</code></td><td><code>../repos/RepoChip</code></td><td>Compact repo reference with tooltip</td></tr>
            <tr><td><code>OwnerChip</code></td><td><code>../common/OwnerChip</code></td><td>User/org reference chip</td></tr>
            <tr><td><code>LoaderDialog</code></td><td><code>../common/LoaderDialog</code></td><td>Loading spinner overlay</td></tr>
          </tbody>
        </table>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 8 }}>
          See the <a href="/ocl-design-system/components/">Components catalog</a> for the
          full list with links to source.
        </p>
      </Section>

      <Section title="Worked example: a complete page">
        <p style={{ color: 'var(--text-secondary)', marginBottom: 12 }}>
          This example shows a page that loads a repository and displays its
          details. It uses all the patterns above: routing, API, i18n, context,
          and shared components.
        </p>
        <CodeSnippet title="src/components/repos/RepoDetails.jsx" code={`
import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import BookmarkBorder from '@mui/icons-material/BookmarkBorder';
import Share from '@mui/icons-material/Share';

import APIService from '../../services/APIService';
import { toOwnerURI, currentUserHasAccess } from '../../common/utils';
import { OperationsContext } from '../app/LayoutContext';
import RepoChip from './RepoChip';
import OwnerChip from '../common/OwnerChip';
import CommonTabs from '../common/CommonTabs';

const RepoDetails = () => {
  const { t } = useTranslation()
  const params = useParams()
  const history = useHistory()
  const { setAlert, setContextRepo } = React.useContext(OperationsContext)

  const [loading, setLoading] = React.useState(true)
  const [repo, setRepo] = React.useState(null)
  const [owner, setOwner] = React.useState(null)
  const [tab, setTab] = React.useState('overview')

  const repoURL = \`/\${params.ownerType}/\${params.owner}/\${params.repoType}/\${params.repo}/\`

  const fetchRepo = () => {
    setLoading(true)
    APIService.new().overrideURL(repoURL).get().then(response => {
      const data = response?.data || {}
      setRepo(data)
      setContextRepo(data)
      setLoading(false)
    })
  }

  const fetchOwner = () => {
    APIService.new().overrideURL(toOwnerURI(repoURL)).get().then(response => {
      setOwner(response?.data || {})
    })
  }

  React.useEffect(() => {
    fetchRepo()
    fetchOwner()
  }, [params.owner, params.repo])

  if (loading) return <div>Loading...</div>
  if (!repo) return <div>{t('common.not_found')}</div>

  const hasAccess = currentUserHasAccess()
  const tabs = [
    { key: 'overview', label: t('common.overview') },
    { key: 'concepts', label: t('concept.concepts') },
    { key: 'mappings', label: t('mapping.mappings') },
  ]

  return (
    <div>
      {/* Header */}
      <Paper sx={{ p: 2, borderRadius: '10px 10px 0 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {owner && <OwnerChip owner={owner} />}
            <RepoChip repo={repo} />
          </div>
          <div>
            <Tooltip title={t('common.bookmark')}>
              <IconButton><BookmarkBorder /></IconButton>
            </Tooltip>
            <Tooltip title={t('common.share')}>
              <IconButton><Share /></IconButton>
            </Tooltip>
            {hasAccess && (
              <Button variant="text" sx={{ textTransform: 'none' }}>
                {t('common.manage')}
              </Button>
            )}
          </div>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, marginTop: 8 }}>
          {repo.name || repo.short_code}
        </h1>
      </Paper>

      {/* Tabs */}
      <CommonTabs tabs={tabs} value={tab} onChange={(e, v) => setTab(v)} />

      {/* Tab content */}
      {tab === 'overview' && (
        <Paper sx={{ p: 2, mt: 1 }}>
          <p>{repo.description || t('common.no_description')}</p>
        </Paper>
      )}
    </div>
  )
}

export default RepoDetails;
`} />
        <CodeSnippet title="Register the route in App.jsx" code={`
import RepoDetails from '../repos/RepoDetails';

// In the route list:
<Route exact
  path="/:ownerType(users|orgs)/:owner/:repoType(sources|collections)/:repo/details"
  component={RepoDetails}
/>
`} />
      </Section>

      <Section title="Key files reference">
        <table className="props-table">
          <thead><tr><th>File</th><th>What it provides</th></tr></thead>
          <tbody>
            <tr><td><code>src/components/app/App.jsx</code></td><td>Route definitions &mdash; add new routes here</td></tr>
            <tr><td><code>src/services/APIService.js</code></td><td>API call builder &mdash; all data fetching goes through this</td></tr>
            <tr><td><code>src/common/utils.js</code></td><td>50+ utility functions (auth, URL, formatting, data)</td></tr>
            <tr><td><code>src/common/colors.jsx</code></td><td>Theme color constants (Primary, Secondary, Surface, Error palettes)</td></tr>
            <tr><td><code>src/common/constants.js</code></td><td>App-wide constants (SOURCE_TYPES, DATE_FORMAT, DEFAULT_LIMIT, layout IDs)</td></tr>
            <tr><td><code>src/components/app/LayoutContext.jsx</code></td><td>Global context provider (alerts, toggles, menu state)</td></tr>
            <tr><td><code>src/i18n/config.js</code></td><td>i18n configuration (supported languages, fallback)</td></tr>
            <tr><td><code>src/i18n/locales/en/translations.json</code></td><td>English translation keys</td></tr>
            <tr><td><code>src/index.jsx</code></td><td>App entry point with theme configuration</td></tr>
          </tbody>
        </table>
      </Section>
    </main>

    <SiteFooter text="Guide documented 2026-04-16 against oclweb3 commit 742259f0." />
  </>
);

export default BuildingPagesPage;
