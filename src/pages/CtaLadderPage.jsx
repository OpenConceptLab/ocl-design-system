import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';

import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import ExampleFrame from '../components/ExampleFrame';
import CodeSnippet from '../components/CodeSnippet';
import { PRIMARY_COLORS, WHITE } from '../colors';

const SITE_SRC = 'https://github.com/OpenConceptLab/ocl-community-site/blob/main/src';

const Section = ({ title, children }) => (
  <section>
    <h2>{title}</h2>
    {children}
  </section>
);

// Copy and icons as the community site ships them (English).
const COLUMNS = {
  signup: { icon: PersonAddAltOutlinedIcon, title: 'Create a free account', text: 'Free for everyone, with a preview of the OCL Mapper.', button: 'Sign up free' },
  openApp: { icon: LoginOutlinedIcon, title: 'Go to OCL Online', text: "You're signed in. Pick up where you left off.", button: 'Go to OCL Online' },
  newsletter: { icon: EmailOutlinedIcon, title: 'OCL in your inbox', text: 'Occasional news from the OCL community. No spam.', button: 'Get the newsletter' },
  call: { icon: GroupsOutlinedIcon, title: 'Join the monthly community call', text: 'Meet the people behind OCL. Everyone is welcome.', button: 'See when we meet' },
  earlyAccess: { icon: RocketLaunchOutlinedIcon, title: 'Request early access', text: "Tell us what you need from a paid plan. You'll be the first to know when plans open.", button: 'Request early access' },
};

// The community site's buttons are pills (its theme: borderRadius 50px,
// padding .5rem 1.25rem); the replica sets that here, since this site's
// theme is the apps'.
const PILL = { borderRadius: '50px', padding: '0.5rem 1.25rem' };

// A faithful replica of the site's CtaLadder (MUI 9 there, MUI 5 here).
const Ladder = ({ columns, primary }) => (
  <Box sx={{ backgroundColor: PRIMARY_COLORS['10'], borderRadius: '8px', px: { xs: 3, md: 5 }, py: { xs: 4, md: 6 } }}>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: `repeat(${columns.length}, 1fr)` }, gap: { xs: 4, md: columns.length > 3 ? 4 : 6 } }}>
      {columns.map(id => {
        const { icon: Icon, title, text, button } = COLUMNS[id];
        return (
          <Box key={id} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Icon sx={{ fontSize: 36, color: PRIMARY_COLORS['90'], mb: 1.5 }} />
            <Typography variant="h6" component="h3" sx={{ color: WHITE, mb: 1, lineHeight: 1.3 }}>{title}</Typography>
            <Typography variant="body2" sx={{ color: PRIMARY_COLORS['80'], mb: 2 }}>{text}</Typography>
            <Box sx={{ mt: 'auto' }}>
              {id === primary ? (
                <Button sx={{ ...PILL, backgroundColor: WHITE, color: 'primary.main', textTransform: 'none', fontWeight: 600, px: 3, '&:hover': { backgroundColor: PRIMARY_COLORS['90'] } }}>{button}</Button>
              ) : (
                <Button endIcon={<ArrowForwardIosIcon sx={{ fontSize: '12px !important' }} />} sx={{ ...PILL, color: WHITE, textTransform: 'none', fontWeight: 600, px: 0, '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' } }}>{button}</Button>
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  </Box>
);

const EXAMPLES = [
  { label: 'Default (home, /about-us, most pages), signed out', columns: ['signup', 'newsletter', 'call', 'earlyAccess'], primary: 'signup' },
  { label: '/pricing, signed out', columns: ['signup', 'newsletter', 'call', 'earlyAccess'], primary: 'earlyAccess' },
  { label: 'Signed in, not on a tool page', columns: ['openApp', 'newsletter', 'call', 'earlyAccess'], primary: 'openApp' },
  { label: 'Signed in, on /tools/<tool>', columns: ['newsletter', 'call', 'earlyAccess'], primary: 'earlyAccess' },
];

const CtaLadderPage = () => {
  const [example, setExample] = React.useState(0);
  const current = EXAMPLES[example];
  return (
    <>
      <SiteHeader section="Components" />
      <main>
        <div className="breadcrumb">
          <a href="/ocl-design-system/">Overview</a> · <a href="/ocl-design-system/components/">Components</a> · CtaLadder
        </div>
        <h1>CtaLadder</h1>
        <p className="page-intro">
          The row of next steps above the footer on every page of the community site (openconceptlab.org): sign up,
          get the newsletter, join the monthly community call, request early access. One component, one column order,
          and one filled button, which the page chooses. The apps don&apos;t use it.
        </p>

        <div className="component-detail">
          <div className="detail-main">

            <Section title="Example">
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {EXAMPLES.map((ex, i) => (
                  <Button key={ex.label} size="small" variant={i === example ? 'contained' : 'outlined'} disableElevation onClick={() => setExample(i)} sx={{ textTransform: 'none' }}>
                    {ex.label}
                  </Button>
                ))}
              </Box>
              <ExampleFrame note="A replica in this site's MUI 5. On the site the band runs full width, directly above the footer, which shares its colour.">
                <Ladder columns={current.columns} primary={current.primary} />
              </ExampleFrame>
            </Section>

            <Section title="Anatomy">
              <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
                <li><strong>Band</strong> &mdash; full width, <code>PRIMARY_COLORS[&apos;10&apos;]</code> (<code>#0f0069</code>), <code>Container maxWidth=&quot;lg&quot;</code>, <code>py: {'{ xs: 6, md: 10 }'}</code>. A <code>&lt;section&gt;</code> labelled by a visually hidden <code>h2</code> (<code>cta.heading</code>, &ldquo;Get involved&rdquo;).</li>
                <li><strong>Columns</strong> &mdash; a grid: one column on phones, two from <code>sm</code>, one per action from <code>md</code>. Each has an outlined icon (40px, <code>PRIMARY_COLORS[&apos;90&apos;]</code>), an <code>h5</code> title rendered as <code>h3</code> in white, one <code>body2</code> sentence in <code>PRIMARY_COLORS[&apos;80&apos;]</code>, and a button pinned to the column&apos;s bottom.</li>
                <li><strong>Filled button</strong> &mdash; exactly one: white fill, brand text, like the <code>/pricing</code> hero&apos;s. Not <code>variant=&quot;contained&quot;</code> with <code>disableElevation</code>, which hides the keyboard focus ring.</li>
                <li><strong>The other buttons</strong> &mdash; white text links with an arrow (<code>ArrowForwardIosIcon</code>, 12px), underlined on hover.</li>
              </ul>
            </Section>

            <Section title="Rules">
              <table className="props-table">
                <thead><tr><th>Rule</th><th>Detail</th></tr></thead>
                <tbody>
                  <tr><td><strong>One order</strong></td><td>Sign up · Newsletter · Community call · Early access, on every page. Pages never reorder the columns.</td></tr>
                  <tr><td><strong>The page picks the filled button</strong></td><td><code>/pricing</code>: Early access. <code>/blog</code>, <code>/blog/*</code>, <code>/early-access</code>: Newsletter. Everywhere else: Sign up.</td></tr>
                  <tr><td><strong>Signed-in visitors never see &ldquo;sign up&rdquo;</strong></td><td>The column becomes Go to OCL Online (TermBrowser). On a <code>/tools/&lt;tool&gt;</code> page it is hidden instead, because the page&apos;s Get started block right above already links to the tool; Early access then takes the filled button.</td></tr>
                  <tr><td><strong>No link to the current page</strong></td><td><code>/early-access</code> drops the early-access column.</td></tr>
                  <tr><td><strong>Lead source</strong></td><td>Early access links to <code>/early-access?source=ladder-&lt;page&gt;</code> (<code>ladder-home</code>, <code>ladder-mapper</code>…), which GA reports as <code>lead_source</code>.</td></tr>
                  <tr><td><strong>Sign-in state after mount</strong></td><td>Pages are prerendered, so the ladder renders signed out first and switches after mount. Reading <code>localStorage</code> during render would make React discard the prerender.</td></tr>
                </tbody>
              </table>
            </Section>

            <Section title="Code">
              <CodeSnippet
                title="ladderFor (ocl-community-site src/common/ctaLadder.js)"
                code={`ladderFor({ pathname: '/pricing', signedIn: false })
// → { columns: ['signup', 'newsletter', 'call', 'earlyAccess'],
//     primary: 'earlyAccess', source: 'ladder-pricing' }

ladderFor({ pathname: '/tools/mapper', signedIn: true })
// → { columns: ['newsletter', 'call', 'earlyAccess'],
//     primary: 'earlyAccess', source: 'ladder-mapper' }`}
              />
            </Section>

            <Section title="Don’t">
              <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
                <li>Don&rsquo;t build a page-specific CTA row. Choose the filled column in <code>ctaLadder.js</code> instead.</li>
                <li>Don&rsquo;t add a disabled or &ldquo;coming soon&rdquo; action. Every column goes somewhere real.</li>
                <li>Don&rsquo;t put GitHub, issue or chat links in the ladder. GitHub and Chat are in the footer; &ldquo;Report an issue&rdquo; is in each tool page&apos;s Get started block.</li>
              </ul>
            </Section>

          </div>

          <aside className="detail-sidebar">
            <h3>Status</h3>
            <p><span className="badge ok">OK</span> &mdash; documented from the community site&apos;s implementation.</p>

            <h3>Source</h3>
            <a className="source-link" href={`${SITE_SRC}/components/layout/CtaLadder.jsx`}>ocl-community-site CtaLadder.jsx</a>
            <a className="source-link" href={`${SITE_SRC}/common/ctaLadder.js`}>ocl-community-site ctaLadder.js</a>

            <h3>Related</h3>
            <ul>
              <li><a href="/ocl-design-system/components/announcement-banner.html">AnnouncementBanner</a></li>
              <li><a href="/ocl-design-system/components/button.html">Button</a></li>
            </ul>
          </aside>
        </div>
      </main>

      <SiteFooter text="Component documented 2026-09-27 from ocl-community-site. Drives ocl_online#170." />
    </>
  );
};

export default CtaLadderPage;
