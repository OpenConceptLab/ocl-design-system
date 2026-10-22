import React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import FilterListIcon from '@mui/icons-material/FilterList';

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

const COLUMNS = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Display Name' },
  { id: 'conceptClass', label: 'Class' },
  { id: 'datatype', label: 'Datatype' },
];

// Public CIEL concepts
const ROWS = [
  ['115916', 'Massive aspiration syndrome of newborn'],
  ['115915', 'Mastitis, associated with childbirth'],
  ['115914', 'Mastitis-postpartum'],
  ['115912', 'Decreased fetus movements, affecting management of mother'],
  ['115025', 'Occlusal wear of teeth'],
  ['115016', 'Occlusion of artery'],
  ['115015', 'Occult spinal dysraphism sequence'],
  ['115014', 'Tethered cord syndrome'],
].map(([id, name]) => ({ id, name, conceptClass: 'Diagnosis', datatype: 'N/A' }));

// Header cells, as in oclweb3 TableResults.jsx
const HEAD_CELL_SX = {
  lineHeight: '1.2rem',
  padding: '3px 16px',
  fontSize: '12px',
  borderBottom: 1,
  borderBottomColor: 'surface.nv80',
};

const ResultsTableExample = () => {
  const [checked, setChecked] = React.useState(['115914', '115912']);
  const [shown, setShown] = React.useState('115916');
  const [orderBy, setOrderBy] = React.useState('id');
  const [order, setOrder] = React.useState('desc');

  const rows = [...ROWS].sort((a, b) => (order === 'asc' ? 1 : -1) * a[orderBy].localeCompare(b[orderBy]));
  const onSort = id => {
    setOrder(orderBy === id && order === 'asc' ? 'desc' : 'asc');
    setOrderBy(id);
  };
  const toggle = id => setChecked(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  const toggleAll = event => setChecked(event.target.checked ? ROWS.map(row => row.id) : []);

  return (
    <Box sx={{ width: '100%', bgcolor: '#FFF' }}>
      <Toolbar
        sx={[
          { bgcolor: '#FFF', pl: 1, pr: 1, minHeight: '48px !important', borderBottom: 1, borderBottomColor: 'surface.nv80' },
          checked.length > 0 && { bgcolor: theme => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity) },
        ]}
      >
        <IconButton aria-label="Filters"><FilterListIcon sx={{ color: '#000' }} /></IconButton>
        <Typography component="div" sx={{ ml: 1 }}>
          {checked.length > 0 ? `${checked.length} selected` : `${ROWS.length} concepts`}
        </Typography>
      </Toolbar>
      <TableContainer sx={{ maxHeight: 250 }}>
        <Table stickyHeader size="small" sx={{ '.MuiTableCell-head': HEAD_CELL_SX }}>
          <TableHead>
            <TableRow sx={{ bgcolor: 'surface.s90' }}>
              <TableCell padding="checkbox" sx={{ background: 'inherit' }}>
                <Checkbox
                  color="primary"
                  indeterminate={checked.length > 0 && checked.length < ROWS.length}
                  checked={checked.length === ROWS.length}
                  onChange={toggleAll}
                  inputProps={{ 'aria-label': 'Select all concepts' }}
                />
              </TableCell>
              {COLUMNS.map(column => (
                <TableCell key={column.id} sx={{ background: 'inherit' }} sortDirection={orderBy === column.id ? order : false}>
                  <TableSortLabel active={orderBy === column.id} direction={orderBy === column.id ? order : 'asc'} onClick={() => onSort(column.id)}>
                    <b>{column.label}</b>
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => {
              const isShown = shown === row.id;
              return (
                <TableRow
                  key={row.id}
                  hover
                  selected={isShown}
                  onClick={() => setShown(row.id)}
                  sx={[
                    { cursor: 'pointer', backgroundColor: '#FFF', '&.Mui-selected': { backgroundColor: 'primary.90' } },
                    { '&.MuiTableRow-hover:hover': { backgroundColor: isShown ? 'primary.90' : 'primary.95' } },
                  ]}
                >
                  <TableCell padding="checkbox" onClick={event => { event.stopPropagation(); toggle(row.id); }}>
                    <Checkbox color="primary" checked={checked.includes(row.id)} inputProps={{ 'aria-label': `Select ${row.id}` }} />
                  </TableCell>
                  {COLUMNS.map(column => <TableCell key={column.id}>{row[column.id]}</TableCell>)}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const TableResultsPage = () => (
  <>
    <SiteHeader section="Components" />
    <main>
      <div className="breadcrumb">
        <a href="/ocl-design-system/">Overview</a> · <a href="/ocl-design-system/components/">Components</a> · TableResults
      </div>
      <h1>TableResults</h1>
      <p className="page-intro">
        The results table behind TBv3 search and repository listings: concepts, mappings, references, repositories,
        organizations and users. This page sets the table's header row and its row and selection states, which every
        results table shares. Column sets, the card and hierarchy displays and the toolbar's controls are not covered yet.
      </p>

      <div className="component-detail">
        <div className="detail-main">

          <Section title="Example">
            <ExampleFrame note="Tick rows to see the toolbar's selection state; click a row to show it (the detail-panel state); click a column label to sort. The table scrolls under its sticky header.">
              <ResultsTableExample />
            </ExampleFrame>
          </Section>

          <Section title="Header row">
            <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
              The header row is tinted so the columns stand out from the white rows beneath it. Every results table uses this treatment.
            </p>
            <table className="props-table">
              <thead><tr><th>Part</th><th>Value</th><th>How</th></tr></thead>
              <tbody>
                <tr><td><strong>Background</strong></td><td><code>surface.s90</code> (#e3e0f9)</td><td><code>bgcolor: 'surface.s90'</code> on the header <code>TableRow</code>; each header cell sets <code>background: 'inherit'</code>, so the sticky cells stay solid while rows scroll under them.</td></tr>
                <tr><td><strong>Labels</strong></td><td>12px, bold, line height 1.2rem, padding 3px 16px</td><td>Labels wrapped in <code>&lt;b&gt;</code> inside <code>TableSortLabel</code>; size and padding set once on the table through <code>'.MuiTableCell-head'</code>.</td></tr>
                <tr><td><strong>Rule below</strong></td><td>1px <code>surface.nv80</code> (#c8c5d0)</td><td><code>borderBottom: 1, borderBottomColor: 'surface.nv80'</code> on the header cells.</td></tr>
                <tr><td><strong>Rule above</strong></td><td>1px <code>surface.nv80</code></td><td>The results toolbar&rsquo;s bottom border, which sits directly on top of the header.</td></tr>
              </tbody>
            </table>
          </Section>

          <Section title="Row and selection states">
            <table className="props-table">
              <thead><tr><th>State</th><th>Colour</th><th>Notes</th></tr></thead>
              <tbody>
                <tr><td><strong>Row</strong></td><td>white</td><td>Body text 14px regular.</td></tr>
                <tr><td><strong>Hover</strong></td><td><code>primary.95</code> (#f2efff)</td><td></td></tr>
                <tr><td><strong>Shown row</strong></td><td><code>primary.90</code> (#e2dfff)</td><td>The row whose details are open in the side panel.</td></tr>
                <tr><td><strong>Checked rows</strong></td><td>no fill</td><td>The checkbox carries the state.</td></tr>
                <tr><td><strong>Toolbar with checked rows</strong></td><td><code>alpha(primary.main, action.activatedOpacity)</code></td><td>The toolbar reads &ldquo;N selected&rdquo; and shows the bulk actions.</td></tr>
              </tbody>
            </table>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 12 }}>
              <strong>Why the header has rules:</strong> <code>primary.90</code> and <code>surface.s90</code> are almost the same colour,
              and the toolbar&rsquo;s selection tint is close to both. When the shown row is first in the list and rows are checked, all three sit
              next to each other. The <code>surface.nv80</code> rules above and below the header, together with its small bold labels, keep it a
              distinct band. Don&rsquo;t rely on the tint alone to separate the header from a selected row.
            </p>
          </Section>

          <Section title="Code">
            <CodeSnippet
              title="Header row (from oclweb3 src/components/search/TableResults.jsx, simplified)"
              code={`<Table
  stickyHeader
  size="small"
  sx={{'.MuiTableCell-head': {
    lineHeight: '1.2rem', padding: '3px 16px', fontSize: '12px',
    borderBottom: 1, borderBottomColor: 'surface.nv80',
  }}}
>
  <TableHead>
    <TableRow sx={{bgcolor: 'surface.s90'}}>
      <TableCell padding="checkbox" sx={{background: 'inherit'}}>
        <Checkbox color="primary" ... />
      </TableCell>
      {columns.map(column => (
        <TableCell key={column.id} sx={{background: 'inherit'}}>
          <TableSortLabel ...>
            <b>{t(column.labelKey)}</b>
          </TableSortLabel>
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
  ...
</Table>`}
            />
          </Section>

          <Section title="Usage">
            <h4>Do</h4>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              <li>Give every results table this header: <code>surface.s90</code> background, bold 12px labels, <code>surface.nv80</code> rules.</li>
              <li>Use the palette paths (<code>'surface.s90'</code>, <code>'surface.nv80'</code>) or <code>COLORS.surface.*</code>, never hex values.</li>
              <li>Set <code>background: 'inherit'</code> on header cells so the sticky header takes the row&rsquo;s tint.</li>
            </ul>
            <h4>Don&rsquo;t</h4>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              <li>Don&rsquo;t give a header row the same white as the rows under it.</li>
              <li>Don&rsquo;t drop the header rules: without them a shown first row merges with the header.</li>
              <li>Don&rsquo;t apply this header to small tables inside dialogs or detail panels (attributes, versions, associations). They keep their own styles.</li>
            </ul>
          </Section>

          <Section title="Where used">
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              <li><strong>TableResults</strong> &mdash; search and repository listings for every resource type, including the ungrouped references table with its Raw / Translation switch.</li>
              <li><strong>ReferenceSourceGroupedResults</strong> &mdash; a collection&rsquo;s references grouped by source.</li>
              <li>Introduced by <a href="https://github.com/OpenConceptLab/ocl_issues/issues/2948">ocl_issues#2948</a>.</li>
            </ul>
          </Section>

        </div>

        <aside className="detail-sidebar">
          <h3>Status</h3>
          <p><span className="badge partial">Partial</span> &mdash; header row and row states documented. Column sets, card and hierarchy displays, and the toolbar&rsquo;s controls remain.</p>

          <h3>Source</h3>
          <a className="source-link" href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/search/TableResults.jsx">src/components/search/TableResults.jsx</a>
          <a className="source-link" href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/references/ReferenceSourceGroupedResults.jsx">src/components/references/ReferenceSourceGroupedResults.jsx</a>
          <a className="source-link" href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/search/SearchResults.jsx">src/components/search/SearchResults.jsx</a>

          <h3>Related</h3>
          <ul>
            <li><a href="/ocl-design-system/components/common-tabs.html">CommonTabs</a></li>
            <li><a href="/ocl-design-system/components/kebab-menu.html">KebabMenu</a></li>
            <li><a href="/ocl-design-system/foundations/color.html">Color</a></li>
          </ul>
        </aside>
      </div>
    </main>

    <SiteFooter text="Component documented 2026-10-22 against oclweb3. Live React + MUI examples." />
  </>
);

export default TableResultsPage;
