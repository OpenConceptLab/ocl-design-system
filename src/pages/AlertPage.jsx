import React from 'react';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
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

const AlertPage = () => {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  return (
    <>
      <SiteHeader section="Components" />
      <main>
        <div className="breadcrumb">
          <a href="/ocl-design-system/">Overview</a> · <a href="/ocl-design-system/components/">Components</a> · Alert
        </div>
        <h1>Alert</h1>
        <p className="page-intro">
          A global notification component that wraps MUI&rsquo;s Snackbar and Alert. Displays toast-style messages
          for success, error, warning, and info states.
        </p>

        <div className="component-detail">
          <div className="detail-main">

            <Section title="Example">
              <ExampleFrame note="All four severity levels rendered as filled Alerts. In the real app these appear inside a Snackbar toast.">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <MuiAlert elevation={6} variant="filled" severity="success" sx={{ width: '100%' }}>
                    Concept created successfully
                  </MuiAlert>
                  <MuiAlert elevation={6} variant="filled" severity="error" sx={{ width: '100%' }}>
                    Failed to delete repository
                  </MuiAlert>
                  <MuiAlert elevation={6} variant="filled" severity="warning" sx={{ width: '100%' }}>
                    This version has not been released
                  </MuiAlert>
                  <MuiAlert elevation={6} variant="filled" severity="info" sx={{ width: '100%' }}>
                    Import is processing...
                  </MuiAlert>
                </div>
              </ExampleFrame>

              <h4 style={{ marginTop: 24 }}>Snackbar toast behavior</h4>
              <ExampleFrame note="Click the button to trigger a real Snackbar toast. It auto-hides after 3 seconds.">
                <Button
                  variant="contained"
                  sx={{ textTransform: 'none', borderRadius: '100px' }}
                  onClick={() => setSnackbarOpen(true)}
                >
                  Show toast notification
                </Button>
                <Snackbar
                  open={snackbarOpen}
                  autoHideDuration={3000}
                  onClose={() => setSnackbarOpen(false)}
                >
                  <MuiAlert
                    elevation={6}
                    variant="filled"
                    severity="success"
                    onClose={() => setSnackbarOpen(false)}
                    sx={{ width: '100%' }}
                  >
                    Concept created successfully
                  </MuiAlert>
                </Snackbar>
              </ExampleFrame>
            </Section>

            <Section title="Props">
              <table className="props-table">
                <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
                <tbody>
                  <tr><td><code>message</code></td><td><code>string</code></td><td>&mdash;</td><td>The notification text to display. Snackbar opens when truthy.</td></tr>
                  <tr><td><code>duration</code></td><td><code>number</code></td><td><code>6000</code></td><td>Auto-hide duration in milliseconds.</td></tr>
                  <tr><td><code>onClose</code></td><td><code>func</code></td><td>&mdash;</td><td>Callback fired when the alert is dismissed (click X or auto-hide).</td></tr>
                  <tr><td><code>severity</code></td><td><code>&apos;success&apos; | &apos;error&apos; | &apos;warning&apos; | &apos;info&apos;</code></td><td><code>&apos;success&apos;</code></td><td>Controls the icon and color of the alert.</td></tr>
                </tbody>
              </table>
            </Section>

            <Section title="Code">
              <CodeSnippet
                title="The OCL Alert component (from src/components/common/Alert.jsx)"
                code={`import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = ({ message, duration, onClose, severity }) => (
  <Snackbar open={Boolean(message)} autoHideDuration={duration} onClose={onClose}>
    <MuiAlert elevation={6} variant="filled" severity={severity} onClose={onClose} sx={{ width: '100%' }}>
      {message}
    </MuiAlert>
  </Snackbar>
);`}
              />
              <CodeSnippet
                title="Usage via OperationsContext"
                code={`const { setAlert } = React.useContext(OperationsContext);

// After a successful action:
setAlert({ message: t('common.save_success'), severity: 'success' });

// After an error:
setAlert({ message: 'Failed to save', severity: 'error' });`}
              />
            </Section>

            <Section title="Usage">
              <h4>Do</h4>
              <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
                <li>Use <code>setAlert</code> from <code>OperationsContext</code> for global notifications.</li>
                <li><code>success</code> and <code>error</code> are the most common severities.</li>
                <li>Keep messages short and actionable &mdash; describe what happened, not technical details.</li>
              </ul>
              <h4>Don&rsquo;t</h4>
              <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
                <li>Don&rsquo;t use inline <code>Alert</code> components for page-level messaging &mdash; use the global Snackbar pattern.</li>
                <li>Don&rsquo;t use <code>warning</code> or <code>info</code> for user action results &mdash; reserve them for system states.</li>
              </ul>
            </Section>

            <Section title="Where used">
              <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
                <li><strong>App.jsx</strong> &mdash; global alert rendered at the app root via OperationsContext.</li>
                <li><strong>NewImport</strong> &mdash; success/error after import submission.</li>
                <li><strong>ExistingImports</strong> &mdash; status feedback on import actions.</li>
                <li><strong>DeleteEntityDialog</strong> &mdash; confirmation of successful deletion.</li>
              </ul>
            </Section>

          </div>

          <aside className="detail-sidebar">
            <h3>Status</h3>
            <p><span className="badge stub">Stub</span> &mdash; now documented. Previously undocumented.</p>

            <h3>Source</h3>
            <a className="source-link" href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/common/Alert.jsx">src/components/common/Alert.jsx</a>
          </aside>
        </div>
      </main>

      <SiteFooter text="Component documented 2026-04-16 against oclweb3. Live React + MUI examples." />
    </>
  );
};

export default AlertPage;
