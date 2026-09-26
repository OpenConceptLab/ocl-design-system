import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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

// The strip exactly as the apps render it, except position: static so it can
// sit inside the example frame (the apps fix it to the top of the window).
const Strip = ({ onClose }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'primary.95',
      py: 1,
      pl: { xs: 2, sm: 3 },
      pr: 2,
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
      <CampaignOutlinedIcon color="primary" fontSize="small" />
      <Typography variant="body2" sx={{ fontWeight: 600, color: 'surface.dark' }}>
        Welcome to the public preview of the new OCL TermBrowser v3!
      </Typography>
      <Typography variant="body2" sx={{ color: 'surface.contrastText' }}>
        Your content is already here, and you can switch back to TBv2 any time.{' '}
        <Link href="https://openconceptlab.org/blog" target="_blank" rel="noopener noreferrer" sx={{ fontWeight: 600, '&:hover, &:focus': { color: 'primary.main' } }}>
          Learn more
        </Link>
      </Typography>
    </Box>
    <IconButton size="small" aria-label="Dismiss" onClick={onClose}>
      <CloseIcon fontSize="small" />
    </IconButton>
  </Box>
);

// A miniature app below the strip, to show that the banner sits above the app
// bar and pushes the whole app down rather than appearing inside it.
const MockApp = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <>
      <Box sx={{ border: '1px solid', borderColor: 'surface.n90', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'surface.n96' }}>
        {open && <Strip onClose={() => setOpen(false)} />}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64, pl: { xs: 2, sm: 3 }, pr: 2 }}>
          <img src="/ocl-design-system/assets/favicon.svg" alt="OCL" style={{ height: 28 }} />
          <Box sx={{ flex: '0 1 320px', height: 36, borderRadius: '100px', backgroundColor: '#fff', mx: 2 }} />
          <AccountCircleIcon color="primary" />
        </Box>
        <Box sx={{ mx: 2, mb: 2, height: 120, borderRadius: '10px', backgroundColor: '#fff', border: '0.5px solid', borderColor: 'surface.nv80' }} />
      </Box>
      {!open && (
        <Button size="small" onClick={() => setOpen(true)} sx={{ mt: 1, textTransform: 'none' }}>
          Show the banner again
        </Button>
      )}
    </>
  );
};

const AnnouncementBannerPage = () => (
  <>
    <SiteHeader section="Components" />
    <main>
      <div className="breadcrumb">
        <a href="/ocl-design-system/">Overview</a> · <a href="/ocl-design-system/components/">Components</a> · AnnouncementBanner
      </div>
      <h1>AnnouncementBanner</h1>
      <p className="page-intro">
        Full-width strip for news about OCL Online as a whole: a launch, a public preview, a maintenance window.
        It sits above the app bar, across the whole window, so it reads as coming from OCL Online rather than from the tool.
        The community site, TermBrowser v3, TermBrowser v2 and the OCL Mapper show the same strip. The community site centers its content in its page container; the apps align it with the app bar.
        For feedback on something the user just did, use <a href="/ocl-design-system/components/alert.html">Alert</a> instead.
      </p>

      <div className="component-detail">
        <div className="detail-main">

          <Section title="Example">
            <ExampleFrame note="The banner above a miniature app. Dismiss it to see the app move up. In the apps the strip is fixed to the top of the window; here it is static so it stays inside the frame.">
              <MockApp />
            </ExampleFrame>
          </Section>

          <Section title="Anatomy">
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              <li><strong>Strip</strong> &mdash; full width, <code>backgroundColor: &apos;primary.95&apos;</code>, <code>py: 1</code>. Left and right padding match the app bar&apos;s <code>Toolbar</code> (<code>pl: {'{ xs: 2, sm: 3 }'}</code>, <code>pr: 2</code>), so the icon lines up with the logo and the close button with the header controls. z-index matches the app bar&apos;s. TBv2&apos;s theme predates the v3 tokens, so its banner uses the same values as hex (<code>#f2efff</code>, <code>#4836ff</code>, <code>#1c1b1f</code>, <code>#47464f</code>), with <code>px: {'{ xs: 2, sm: 3 }'}</code> and its app bar&apos;s z-index (1300).</li>
              <li><strong>Icon</strong> &mdash; <code>&lt;CampaignOutlinedIcon color=&quot;primary&quot; fontSize=&quot;small&quot; /&gt;</code>.</li>
              <li><strong>Title</strong> &mdash; <code>body2</code>, weight 600, <code>surface.dark</code>.</li>
              <li><strong>Message</strong> &mdash; <code>body2</code>, <code>surface.contrastText</code>, one sentence, followed by a <code>Link</code> (weight 600, underlined). An external link opens in a new tab. The apps load Bootstrap, whose <code>a:hover</code>/<code>a:focus</code> colour outranks the Link&apos;s class, so the Link sets <code>&apos;&amp;:hover, &amp;:focus&apos;: {'{ color: \'primary.main\' }'}</code>.</li>
              <li><strong>Close</strong> &mdash; <code>&lt;IconButton size=&quot;small&quot;&gt;</code> with <code>&lt;CloseIcon fontSize=&quot;small&quot; /&gt;</code> and an <code>aria-label</code> from the <code>announcement.dismiss</code> locale key (<code>announcement.dismiss_aria</code> on the community site).</li>
              <li>Icon, title and message sit in one <code>flexWrap: &apos;wrap&apos;</code> row with <code>gap: 1.5</code>, so on narrow screens and in longer translations the strip wraps and grows taller.</li>
            </ul>
          </Section>

          <Section title="Layout: the app sits below the banner">
            <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
              The banner changes height as it wraps, so nothing below it can assume a fixed offset. It publishes its measured
              height as a CSS variable, and everything that is laid out against the top or the height of the window reads it.
            </p>
            <table className="props-table">
              <thead><tr><th>What</th><th>Rule</th></tr></thead>
              <tbody>
                <tr><td><strong>The banner</strong></td><td><code>position: fixed; top: 0</code>. Sets <code>--announcement-height</code> on <code>&lt;html&gt;</code> from its <code>offsetHeight</code> (<code>useLayoutEffect</code> + <code>ResizeObserver</code>) and removes it on dismiss. Carries <code>className=&quot;mui-fixed&quot;</code>, so MUI&apos;s scroll lock pads it like the app bar when a modal opens on a scrolling page.</td></tr>
                <tr><td><strong>App bar</strong></td><td><code>top: var(--announcement-height, 0px)</code></td></tr>
                <tr><td><strong>Spacer under the app bar</strong></td><td><code>margin-top: var(--announcement-height, 0px)</code> on the toolbar-height spacer at the top of <code>&lt;main&gt;</code></td></tr>
                <tr><td><strong>Full-height pages and panels</strong></td><td><code>calc(var(--app-height) - Npx)</code>, never <code>100vh</code>. <code>index.scss</code> defines <code>--app-height: calc(100vh - var(--announcement-height, 0px))</code>. TBv3 and the Mapper don&apos;t scroll the page body, so a <code>100vh</code> height pushes the page bottom off-screen while the banner shows. Dialog contents keep <code>vh</code>, because the banner doesn&apos;t push dialogs down. TBv2&apos;s page scrolls, so it has no <code>--app-height</code>.</td></tr>
                <tr><td><strong>Viewport-relative heights</strong> (<code>80vh</code>) and fixed-height panels that must end at the window bottom</td><td>Subtract the variable: <code>calc(80vh - var(--announcement-height, 0px))</code></td></tr>
                <tr><td><strong>Anything positioned just below the app bar</strong>: docked drawers, drawers whose z-index is below the app bar&apos;s (TBv2&apos;s form drawers, TBv3&apos;s comparison drawer), overlays aligned with the header</td><td>Add the variable to the top: <code>top: calc(64px + var(--announcement-height, 0px))</code>. If the paper keeps MUI&apos;s <code>height: 100%</code>, take the same offset off its height, <code>calc(100% - 64px - var(--announcement-height, 0px))</code>, or use <code>bottom: 0; height: auto</code>. Otherwise its end runs off-screen.</td></tr>
                <tr><td><strong>Layers above the app bar</strong>: Dialog, Menu, Popover, Snackbar, and drawers with a z-index above the app bar&apos;s (TBv3&apos;s and the Mapper&apos;s common Drawer, 1202)</td><td>No change. They cover the banner, as they cover the app bar.</td></tr>
              </tbody>
            </table>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 12 }}>
              The community site doesn&apos;t need the variable: its page scrolls and its header is <code>position: sticky</code>, so the banner sits in normal flow above the header and scrolls away.
            </p>
          </Section>

          <Section title="Behavior">
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              <li><strong>Dismissal is versioned.</strong> Dismissing stores the banner&apos;s <code>ANNOUNCEMENT_ID</code> under the <code>announcementDismissed</code> localStorage key. To show a new announcement to everyone, including people who dismissed the last one, change the copy and bump the ID.</li>
              <li><strong>Copy</strong> lives in the <code>announcement.*</code> locale keys (<code>title</code>, <code>text</code>, <code>link_label</code>, <code>dismiss</code>) in en, es and zh.</li>
              <li><strong>Storage failures are harmless.</strong> If localStorage is unavailable (private mode, blocked cookies), the banner simply reappears.</li>
            </ul>
          </Section>

          <Section title="Code">
            <CodeSnippet
              title="AnnouncementBanner (oclweb3 src/components/app/AnnouncementBanner.jsx)"
              code={`const HEIGHT_VAR = '--announcement-height';

const AnnouncementBanner = () => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(!isDismissed());
  const ref = React.useRef(null);

  // Publish the banner's height (it wraps on narrow screens and in longer
  // translations) and clear it once dismissed.
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el)
      return;
    const root = document.documentElement.style;
    const update = () => root.setProperty(HEIGHT_VAR, \`\${el.offsetHeight}px\`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      observer.disconnect();
      root.removeProperty(HEIGHT_VAR);
    };
  }, [open]);

  const onClose = () => {
    rememberDismissal();
    setOpen(false);
  };

  if (!open)
    return null;

  return (
    <Box
      ref={ref}
      className='mui-fixed'
      sx={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: theme => theme.zIndex.drawer + 1,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        backgroundColor: 'primary.95',
        py: 1, pl: { xs: 2, sm: 3 }, pr: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
        <CampaignOutlinedIcon color='primary' fontSize='small' />
        <Typography variant='body2' sx={{ fontWeight: 600, color: 'surface.dark' }}>
          {t('announcement.title')}
        </Typography>
        <Typography variant='body2' sx={{ color: 'surface.contrastText' }}>
          {t('announcement.text')}{' '}
          <Link href={ANNOUNCEMENT_URL} target='_blank' rel='noopener noreferrer'
            sx={{ fontWeight: 600, '&:hover, &:focus': { color: 'primary.main' } }}>
            {t('announcement.link_label')}
          </Link>
        </Typography>
      </Box>
      <IconButton size='small' aria-label={t('announcement.dismiss')} onClick={onClose}>
        <CloseIcon fontSize='small' />
      </IconButton>
    </Box>
  );
};`}
            />
            <CodeSnippet
              title="Header (oclweb3 src/components/app/Header.jsx)"
              code={`<Box sx={{ display: 'flex' }}>
  <CssBaseline />
  <AnnouncementBanner />
  <AppBar position="fixed" sx={theme => ({
    zIndex: theme.zIndex.drawer + 1,
    top: 'var(--announcement-height, 0px)'
  })}>
    ...
  </AppBar>
  <Box component="main" sx={{ flexGrow: 1 }}>
    <DrawerHeader sx={{ marginTop: 'var(--announcement-height, 0px)' }} />
    {props.children}
  </Box>
</Box>`}
            />
          </Section>

          <Section title="Usage">
            <h4>Do</h4>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              <li>Use it for news that concerns OCL Online as a whole, and show the same announcement in every app.</li>
              <li>Keep it to a bold title, one sentence and one link.</li>
              <li>Size new full-height pages with <code>--app-height</code>, and offset anything new that is fixed below the app bar.</li>
            </ul>
            <h4>Don&rsquo;t</h4>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              <li>Don&rsquo;t render it inside the page content or as an <code>Alert</code>. Under the app bar it reads as the tool&apos;s own notification.</li>
              <li>Don&rsquo;t use it for feedback on a user action or for errors. Use <a href="/ocl-design-system/components/alert.html">Alert</a>.</li>
              <li>Don&rsquo;t show more than one announcement at a time.</li>
            </ul>
          </Section>

          <Section title="Where used">
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              <li><strong>TermBrowser v3, TermBrowser v2, OCL Mapper</strong> &mdash; fixed above the app bar, with the offsets above. See <a href="https://github.com/OpenConceptLab/ocl_issues/issues/2820">ocl_issues#2820</a>.</li>
              <li><strong>Community site</strong> &mdash; in normal flow above the sticky header (<code>src/components/layout/Layout.jsx</code>).</li>
            </ul>
          </Section>

        </div>

        <aside className="detail-sidebar">
          <h3>Status</h3>
          <p><span className="badge ok">OK</span> &mdash; documented from the four implementations.</p>

          <h3>Source</h3>
          <a className="source-link" href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/app/AnnouncementBanner.jsx">oclweb3 AnnouncementBanner.jsx</a>
          <a className="source-link" href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/app/Header.jsx">oclweb3 Header.jsx</a>
          <a className="source-link" href="https://github.com/OpenConceptLab/oclmap/blob/main/src/components/app/AnnouncementBanner.jsx">oclmap AnnouncementBanner.jsx</a>
          <a className="source-link" href="https://github.com/OpenConceptLab/oclweb2/blob/master/src/components/app/AnnouncementBanner.jsx">oclweb2 AnnouncementBanner.jsx</a>

          <h3>Related</h3>
          <ul>
            <li><a href="/ocl-design-system/components/alert.html">Alert</a></li>
            <li><a href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/app/Header.jsx">Header</a></li>
          </ul>
        </aside>
      </div>
    </main>

    <SiteFooter text="Pattern documented 2026-09-26 against oclweb3, oclmap and oclweb2. Drives ocl_issues#2820." />
  </>
);

export default AnnouncementBannerPage;
