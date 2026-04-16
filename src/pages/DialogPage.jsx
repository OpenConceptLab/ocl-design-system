import React from 'react';
import Button from '@mui/material/Button';
import MuiDialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

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

// OCL Dialog wrapper (mirrors src/components/common/Dialog.jsx)
const Dialog = ({ children, ...rest }) => (
  <MuiDialog
    PaperProps={{ sx: { backgroundColor: 'surface.n92', p: 3, borderRadius: '28px' } }}
    {...rest}
  >
    {children}
  </MuiDialog>
);

const DialogPage = () => {
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [formOpen, setFormOpen] = React.useState(false);

  return (
    <>
      <SiteHeader section="Components" />
      <main>
        <div className="breadcrumb">
          <a href="/ocl-design-system/">Overview</a> · <a href="/ocl-design-system/components/">Components</a> · Dialog
        </div>
        <h1>Dialog</h1>
        <p className="page-intro">
          A thin wrapper around MUI's Dialog component that applies OCL's visual style: rounded
          corners (28px), surface.n92 background, and consistent padding.
        </p>

        <div className="component-detail">
          <div className="detail-main">

            <Section title="Example: Confirmation dialog">
              <ExampleFrame note="Click the button to open a live OCL-styled Dialog.">
                <Button
                  variant="contained"
                  color="error"
                  sx={{ borderRadius: '100px', textTransform: 'none' }}
                  onClick={() => setConfirmOpen(true)}
                >
                  Open Dialog
                </Button>
                <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                  <h3 style={{ margin: '0 0 8px' }}>Delete repository?</h3>
                  <p style={{ margin: '0 0 16px', color: 'var(--text-secondary)', fontSize: 14 }}>
                    This action cannot be undone.
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                    <Button variant="text" sx={{ textTransform: 'none' }} onClick={() => setConfirmOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="contained" color="error" sx={{ textTransform: 'none' }} onClick={() => setConfirmOpen(false)}>
                      Delete
                    </Button>
                  </div>
                </Dialog>
              </ExampleFrame>
            </Section>

            <Section title="Example: Form dialog">
              <ExampleFrame note="A form dialog with text fields inside the OCL Dialog wrapper.">
                <Button
                  variant="outlined"
                  sx={{ textTransform: 'none' }}
                  onClick={() => setFormOpen(true)}
                >
                  Open Form Dialog
                </Button>
                <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="sm" fullWidth>
                  <DialogTitle sx={{ px: 0, pt: 0 }}>Create Version</DialogTitle>
                  <DialogContent sx={{ px: 0 }}>
                    <TextField
                      label="Version ID"
                      fullWidth
                      size="small"
                      sx={{ mb: 2, mt: 1 }}
                      placeholder="e.g. v2024.04"
                    />
                    <TextField
                      label="Description"
                      fullWidth
                      size="small"
                      multiline
                      rows={3}
                      placeholder="What changed in this version?"
                    />
                  </DialogContent>
                  <DialogActions sx={{ px: 0, pb: 0 }}>
                    <Button variant="text" sx={{ textTransform: 'none' }} onClick={() => setFormOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="contained" sx={{ textTransform: 'none', borderRadius: '100px' }} onClick={() => setFormOpen(false)}>
                      Create
                    </Button>
                  </DialogActions>
                </Dialog>
              </ExampleFrame>
            </Section>

            <Section title="Props">
              <table className="props-table">
                <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
                <tbody>
                  <tr><td><code>children</code></td><td><code>React elements</code></td><td>&mdash;</td><td>Dialog content. Can include DialogTitle, DialogContent, DialogActions, or freeform elements.</td></tr>
                  <tr><td><code>open</code></td><td><code>bool</code></td><td><code>false</code></td><td>Controls visibility. Passed through to MUI Dialog.</td></tr>
                  <tr><td><code>onClose</code></td><td><code>func</code></td><td>&mdash;</td><td>Called when the user clicks the overlay or presses ESC.</td></tr>
                  <tr><td><code>maxWidth</code></td><td><code>'xs' | 'sm' | 'md' | 'lg' | 'xl' | false</code></td><td><code>'sm'</code></td><td>Maximum width of the dialog paper.</td></tr>
                  <tr><td><code>fullWidth</code></td><td><code>bool</code></td><td><code>false</code></td><td>Whether the dialog stretches to maxWidth.</td></tr>
                  <tr><td><code>...rest</code></td><td>&mdash;</td><td>&mdash;</td><td>All other props are spread to MUI Dialog.</td></tr>
                </tbody>
              </table>
            </Section>

            <Section title="Code">
              <CodeSnippet title="OCL Dialog wrapper" code={`import MuiDialog from '@mui/material/Dialog';

// OCL Dialog wrapper (from src/components/common/Dialog.jsx)
const Dialog = ({ children, ...rest }) => (
  <MuiDialog PaperProps={{ sx: { backgroundColor: 'surface.n92', p: 3, borderRadius: '28px' } }} {...rest}>
    {children}
  </MuiDialog>
);`} />
              <CodeSnippet title="Usage pattern" code={`// Usage pattern
const [open, setOpen] = React.useState(false);

<Button onClick={() => setOpen(true)}>Delete</Button>
<Dialog open={open} onClose={() => setOpen(false)}>
  <h3>Delete repository?</h3>
  <p>This action cannot be undone.</p>
  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
    <Button variant="text" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
  </div>
</Dialog>`} />
            </Section>

            <Section title="Usage">
              <h4>Do</h4>
              <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
                <li>Use for confirmations (delete, retire, release).</li>
                <li>Use for entity attribute viewing (EntityAttributesDialog).</li>
                <li>Use for short forms (create version, edit description).</li>
                <li>Place Cancel on the left and the primary action on the right in the button row.</li>
              </ul>
              <h4>Don't</h4>
              <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
                <li>Don't use for long content that requires scrolling &mdash; use a full page instead.</li>
                <li>Don't nest dialogs inside other dialogs.</li>
                <li>Don't use for content that the user needs to reference while performing other actions.</li>
              </ul>
            </Section>

            <Section title="Where used">
              <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
                <li><strong>DeleteEntityDialog</strong> &mdash; Confirmation before deleting a repo, concept, or mapping.</li>
                <li><strong>EntityAttributesDialog</strong> &mdash; Viewing all attributes of an entity in a modal.</li>
                <li><strong>RetireConfirmDialog</strong> &mdash; Confirmation before retiring a concept or mapping.</li>
                <li><strong>LoaderDialog</strong> &mdash; Shown during long-running operations (bulk import, version creation).</li>
                <li><strong>SearchHighlightsDialog</strong> &mdash; Displaying search match highlights in a modal.</li>
              </ul>
            </Section>

            <Section title="Accessibility">
              <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
                <li>Dialog traps focus &mdash; Tab cycles through interactive elements inside the dialog only.</li>
                <li>ESC key closes the dialog via <code>onClose</code>.</li>
                <li>Clicking the overlay (backdrop) closes the dialog via <code>onClose</code>.</li>
                <li>MUI Dialog sets <code>role="dialog"</code> and <code>aria-modal="true"</code> automatically.</li>
                <li>Use <code>DialogTitle</code> or <code>aria-labelledby</code> to provide an accessible label.</li>
              </ul>
            </Section>

          </div>

          <aside className="detail-sidebar">
            <h3>Status</h3>
            <p><span className="badge stub">Stub</span> &mdash; Previously undocumented. Now has examples and usage guidance.</p>

            <h3>Source</h3>
            <a className="source-link" href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/common/Dialog.jsx">src/components/common/Dialog.jsx</a>

            <h3>Related</h3>
            <ul>
              <li><a href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/common/DeleteEntityDialog.jsx">DeleteEntityDialog</a></li>
              <li><a href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/common/EntityAttributesDialog.jsx">EntityAttributesDialog</a></li>
              <li><a href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/common/RetireConfirmDialog.jsx">RetireConfirmDialog</a></li>
              <li><a href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/common/LoaderDialog.jsx">LoaderDialog</a></li>
              <li><a href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/search/SearchHighlightsDialog.jsx">SearchHighlightsDialog</a></li>
            </ul>

            <h3>Design</h3>
            <ul>
              <li>MUI Dialog: <a href="https://mui.com/material-ui/react-dialog/">Documentation</a></li>
            </ul>
          </aside>
        </div>
      </main>

      <SiteFooter text="Component documented 2026-04-16 against oclweb3. Live MUI examples." />
    </>
  );
};

export default DialogPage;
