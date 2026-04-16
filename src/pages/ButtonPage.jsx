import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Add from '@mui/icons-material/Add';
import Close from '@mui/icons-material/Close';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import BookmarkBorder from '@mui/icons-material/BookmarkBorder';
import Share from '@mui/icons-material/Share';
import FileDownloadOutlined from '@mui/icons-material/FileDownloadOutlined';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Done from '@mui/icons-material/Done';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import Visibility from '@mui/icons-material/Visibility';
import LinkIcon from '@mui/icons-material/Link';
import LinkOff from '@mui/icons-material/LinkOff';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import ArrowBack from '@mui/icons-material/ArrowBack';

import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import ExampleFrame from '../components/ExampleFrame';
import OclPillButton from '../components/OclPillButton';

const Section = ({ title, children }) => (
  <section>
    <h2>{title}</h2>
    {children}
  </section>
);

const ButtonPage = () => (
  <>
    <SiteHeader section="Components" />
    <main>
      <div className="breadcrumb">
        <a href="/ocl-design-system/">Overview</a> · <a href="/ocl-design-system/components/">Components</a> · Button
      </div>
      <h1>Button</h1>
      <p className="page-intro">
        Buttons let users take actions. OCL uses Material UI's <code>Button</code>, <code>IconButton</code>,
        and <code>ButtonGroup</code> components, plus a custom Pill button that wraps MUI <code>Chip</code>.
        This page defines the harmonized button model &mdash; the canonical set of button types, colors, sizes,
        and usage patterns &mdash; and catalogs additional button variants found across oclweb3 and oclmap.
      </p>

      <div className="component-detail">
        <div className="detail-main">

          {/* ============================================================ */}
          {/* PART 1: HARMONIZED BUTTON MODEL                              */}
          {/* ============================================================ */}

          <Section title="Example">
            <ExampleFrame note="Live React components using the same MUI theme as oclweb3. These are the real components, not approximations.">
              {/* Action buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 16 }}>
                <Button variant="contained" color="primary" startIcon={<Add />}
                  sx={{ borderRadius: '100px', textTransform: 'none' }}>
                  Create repository
                </Button>
                <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>
                  Take a tour
                </Button>
                <Button variant="text" sx={{ textTransform: 'none' }}>Cancel</Button>
                <OclPillButton
                  icon={<Visibility color="primary" sx={{ fontSize: 'large' }} />}
                  label="Following CIEL"
                  onClick={() => {}}
                  sx={{ backgroundColor: 'surface.s90', fontWeight: 'bold' }}
                />
                <OclPillButton
                  icon={<VisibilityOutlined sx={{ fontSize: 'large' }} />}
                  label="Follow CIEL"
                  onClick={() => {}}
                  sx={{ border: '1px solid', borderColor: 'surface.s90', fontWeight: 'bold' }}
                />
              </div>
              {/* Icon buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', marginBottom: 16 }}>
                <Tooltip title="Download"><IconButton><FileDownloadOutlined /></IconButton></Tooltip>
                <Tooltip title="Bookmark"><IconButton><BookmarkBorder /></IconButton></Tooltip>
                <Tooltip title="Share"><IconButton><Share /></IconButton></Tooltip>
                <Tooltip title="Delete"><IconButton color="error"><DeleteOutlined /></IconButton></Tooltip>
              </div>
              {/* Composite buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
                <ButtonGroup size="small" variant="contained" color="primary">
                  <Button sx={{ textTransform: 'none' }} startIcon={<LinkIcon fontSize="inherit" />}>SAME-AS</Button>
                  <Button sx={{ px: 0.5, minWidth: 'auto' }}><ArrowDropDown /></Button>
                </ButtonGroup>
                <ButtonGroup size="small" color="secondary">
                  <Button sx={{ textTransform: 'none', borderRadius: '25px 0 0 25px', backgroundColor: 'surface.s90', fontWeight: 'bold' }}
                    startIcon={<Done fontSize="inherit" />}>All</Button>
                  <Button sx={{ textTransform: 'none' }}>Following</Button>
                  <Button sx={{ textTransform: 'none', borderRadius: '0 25px 25px 0' }}>My Orgs</Button>
                </ButtonGroup>
              </div>
            </ExampleFrame>
          </Section>

          <Section title="Anatomy">
            <div className="anatomy-figure">
              <img src="/ocl-design-system/designs/Dashboard-SignedIn.png" alt="Button anatomy from dashboard design" />
            </div>
            <p className="anatomy-caption">Source: <code>designs/Dashboard-SignedIn.png</code> &mdash; "Create a repository" (contained pill), icon buttons in header</p>
            <ol style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              <li><strong>Label</strong> &mdash; text content, always <code>textTransform: none</code> in OCL (never uppercase).</li>
              <li><strong>Container</strong> &mdash; background and/or border shape. Pill buttons use <code>borderRadius: 100px</code>; standard MUI buttons use <code>4px</code>.</li>
              <li><strong>Start icon</strong> &mdash; optional leading icon via <code>startIcon</code> prop, sized with <code>fontSize: 'inherit'</code>.</li>
              <li><strong>End icon</strong> &mdash; optional trailing icon via <code>endIcon</code> prop. Used for dropdown arrows on split buttons.</li>
              <li><strong>Ripple</strong> &mdash; MUI ripple effect on click (hover to see on the live examples above).</li>
            </ol>
          </Section>

          <Section title="Variants">
            <h4>Contained</h4>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>
              High-emphasis button for the primary action on a page. Filled background, white text.
              Per the Zeplin designs, contained buttons in OCL use a pill shape (<code>borderRadius: 100px</code>).
            </p>
            <ExampleFrame>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
                <Button variant="contained" sx={{ borderRadius: '100px', textTransform: 'none' }}>Primary</Button>
                <Button variant="contained" color="secondary" sx={{ borderRadius: '100px', textTransform: 'none' }}>Secondary</Button>
                <Button variant="contained" color="error" sx={{ borderRadius: '100px', textTransform: 'none' }}>Error</Button>
                <Button variant="contained" sx={{ borderRadius: '100px', textTransform: 'none', backgroundColor: 'surface.n96', color: 'surface.dark' }}>Default</Button>
                <Button variant="contained" disabled sx={{ borderRadius: '100px', textTransform: 'none' }}>Disabled</Button>
              </div>
            </ExampleFrame>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 8 }}>
              <strong>Where used:</strong> Sign In, Register, Create Repository, Create Version, bulk actions (Compare, Clone, Download), Map/Unmap.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
              <strong>When to use:</strong> For the single most important action on a page or section. Limit to one contained button per button row.
            </p>

            <h4>Outlined</h4>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>
              Medium-emphasis button for secondary actions. Transparent background, colored border.
            </p>
            <ExampleFrame>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
                <Button variant="outlined" sx={{ textTransform: 'none' }}>Primary</Button>
                <Button variant="outlined" color="secondary" sx={{ textTransform: 'none' }}>Secondary</Button>
                <Button variant="outlined" color="error" sx={{ textTransform: 'none' }}>Error</Button>
                <Button variant="outlined" disabled sx={{ textTransform: 'none' }}>Disabled</Button>
              </div>
            </ExampleFrame>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 8 }}>
              <strong>Where used:</strong> Filter controls, form fields (~72 instances in oclweb3), toolbar dropdowns, secondary actions in dialogs.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
              <strong>When to use:</strong> For secondary actions alongside a contained primary button. Also for filter/selector controls.
            </p>

            <h4>Text</h4>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>
              Low-emphasis button for tertiary actions. No background or border in default state.
            </p>
            <ExampleFrame>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
                <Button variant="text" sx={{ textTransform: 'none' }}>Cancel</Button>
                <Button variant="text" sx={{ textTransform: 'none' }} startIcon={<ArrowBack fontSize="inherit" />}>Back to Sign in</Button>
                <Button variant="text" color="secondary" sx={{ textTransform: 'none' }}>Forgot password</Button>
                <Button variant="text" color="error" sx={{ textTransform: 'none' }}>Delete</Button>
                <Button variant="text" disabled sx={{ textTransform: 'none' }}>Disabled</Button>
              </div>
            </ExampleFrame>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 8 }}>
              <strong>Where used:</strong> Cancel buttons in dialogs, "Forgot password" on Sign In, "Back to Sign in" on Register, menu triggers.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
              <strong>When to use:</strong> For actions that are available but not primary. Ideal for Cancel, Back, and other dismissive actions.
            </p>

            <h4>Pill (OCL custom)</h4>
            <div className="callout" style={{ marginBottom: 12 }}>
              <strong>OCL-specific pattern.</strong> The Pill Button (<code>src/components/common/Button.jsx</code>)
              wraps MUI <code>Chip</code> rather than MUI <code>Button</code>. It uses Chip's <code>label</code>
              and <code>icon</code> props instead of <code>children</code> and <code>startIcon</code>.
              This is intentional to get the rounded pill shape and the <code>surface.s90</code> color palette.
            </div>
            <ExampleFrame>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
                <OclPillButton
                  icon={<Visibility color="primary" sx={{ fontSize: 'large' }} />}
                  label="Following CIEL"
                  onClick={() => {}}
                  sx={{ backgroundColor: 'surface.s90', fontWeight: 'bold', '.MuiChip-icon': { color: 'primary.main' } }}
                />
                <OclPillButton
                  icon={<VisibilityOutlined sx={{ fontSize: 'large' }} />}
                  label="Follow CIEL"
                  onClick={() => {}}
                  sx={{ border: '1px solid', borderColor: 'surface.s90', fontWeight: 'bold' }}
                />
                <OclPillButton icon={<Add fontSize="inherit" />} label="Add" onClick={() => {}}
                  sx={{ backgroundColor: 'surface.s90' }} />
                <OclPillButton label="Submit" onClick={() => {}}
                  sx={{ backgroundColor: 'surface.s90' }} />
                <OclPillButton label="Disabled" disabled
                  sx={{ backgroundColor: 'surface.s90' }} />
              </div>
            </ExampleFrame>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 8 }}>
              <strong>Where used:</strong> Follow/Unfollow (<code>FollowActionButton.jsx</code>),
              Add (<code>AddButton.jsx</code>), Submit/Create in forms.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
              <strong>When to use:</strong> For entity-specific contextual actions where you want softer visual weight than Contained.
              Active state (filled <code>surface.s90</code>) = "currently applied"; inactive (outlined) = "available to apply".
            </p>

            <h4>Icon Button</h4>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>
              Standalone icon-only button. Circular hover state. Must always have a <code>Tooltip</code> or <code>aria-label</code>.
            </p>
            <ExampleFrame>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                <Tooltip title="Close"><IconButton size="small"><Close fontSize="inherit" /></IconButton></Tooltip>
                <Tooltip title="Bookmark"><IconButton><BookmarkBorder /></IconButton></Tooltip>
                <Tooltip title="Add"><IconButton size="large" color="primary"><Add fontSize="inherit" /></IconButton></Tooltip>
                <Tooltip title="Delete"><IconButton color="error"><DeleteOutlined /></IconButton></Tooltip>
                <IconButton disabled><BookmarkBorder /></IconButton>
              </div>
              <div style={{ marginTop: 8, fontSize: 12, color: 'var(--text-muted)' }}>
                Sizes: small · medium (default) · large
              </div>
            </ExampleFrame>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 8 }}>
              <strong>Where used:</strong> Delete, Close, Follow (icon-only), Download/Bookmark/Share in repo header, User profile.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
              <strong>When to use:</strong> Only when the icon is universally understood or space is limited and a tooltip provides the label.
            </p>

            <h4>Split Button</h4>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>
              A <code>ButtonGroup</code> combining an action button with a dropdown trigger.
            </p>
            <ExampleFrame note="Dropdown menus use MUI Popper + MenuList. Click the dropdown arrows to see them in the real app.">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
                <ButtonGroup size="small" variant="contained" color="primary">
                  <Button sx={{ textTransform: 'none' }} startIcon={<LinkIcon fontSize="inherit" />}>SAME-AS</Button>
                  <Button sx={{ px: 0.5, minWidth: 'auto' }}><ArrowDropDown /></Button>
                </ButtonGroup>
                <ButtonGroup size="small" variant="outlined" color="primary">
                  <Button sx={{ textTransform: 'none' }} startIcon={<AutoAwesome fontSize="inherit" />}>AI Assist</Button>
                  <Button sx={{ px: 0.5, minWidth: 'auto' }}><ArrowDropDown /></Button>
                </ButtonGroup>
                <ButtonGroup size="small" variant="contained" color="error">
                  <Button sx={{ textTransform: 'none' }} startIcon={<LinkOff fontSize="inherit" />}>Unmap</Button>
                  <Button sx={{ px: 0.5, minWidth: 'auto' }}><ArrowDropDown /></Button>
                </ButtonGroup>
              </div>
            </ExampleFrame>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 8 }}>
              <strong>Where used:</strong> Map type selector (<code>MapButton.jsx</code>), AI assistant model selector (<code>AIAssistantButton.jsx</code>).
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
              <strong>When to use:</strong> When an action has a default behavior but the user may choose alternatives.
              Requires <code>aria-haspopup="menu"</code> and <code>aria-expanded</code> on the dropdown trigger.
            </p>

            <h4>Toggle Group</h4>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>
              A <code>ButtonGroup</code> for switching between mutually exclusive options.
            </p>
            <ExampleFrame>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
                <ButtonGroup size="small" color="secondary">
                  <Button sx={{ textTransform: 'none', borderRadius: '25px 0 0 25px', backgroundColor: 'surface.s90', fontWeight: 'bold' }}
                    startIcon={<Done fontSize="inherit" />}>All</Button>
                  <Button sx={{ textTransform: 'none' }}>Following</Button>
                  <Button sx={{ textTransform: 'none', borderRadius: '0 25px 25px 0' }}>My Orgs</Button>
                </ButtonGroup>
                <ButtonGroup size="small" color="secondary">
                  <Button sx={{ textTransform: 'none', borderRadius: '25px 0 0 25px' }}>Statistics</Button>
                  <Button sx={{ textTransform: 'none', backgroundColor: 'primary.90', fontWeight: 'bold' }}
                    startIcon={<Done fontSize="inherit" />}>Metadata</Button>
                  <Button sx={{ textTransform: 'none' }}>Content</Button>
                  <Button sx={{ textTransform: 'none', borderRadius: '0 25px 25px 0' }}>JSON</Button>
                </ButtonGroup>
              </div>
            </ExampleFrame>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 8 }}>
              <strong>Where used:</strong> Dashboard event scope, version comparison metrics, association scope.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
              <strong>When to use:</strong> For switching between views or scopes. Use <code>surface.s90</code> for selected state by default.
            </p>
          </Section>

          <Section title="Sizes">
            <ExampleFrame>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end', marginBottom: 12 }}>
                <div style={{ textAlign: 'center' }}>
                  <Button variant="contained" size="small" sx={{ textTransform: 'none' }}>Small</Button>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>30px</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Button variant="contained" sx={{ textTransform: 'none' }}>Medium</Button>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>36px (default)</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Button variant="contained" size="large" sx={{ textTransform: 'none' }}>Large</Button>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>42px</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <OclPillButton label="Pill" onClick={() => {}} sx={{ backgroundColor: 'surface.s90' }} />
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>40px (fixed)</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end' }}>
                <div style={{ textAlign: 'center' }}>
                  <IconButton size="small"><BookmarkBorder fontSize="inherit" /></IconButton>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>26px</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <IconButton><BookmarkBorder /></IconButton>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>40px (default)</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <IconButton size="large"><BookmarkBorder fontSize="inherit" /></IconButton>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>48px</div>
                </div>
              </div>
            </ExampleFrame>
          </Section>

          <Section title="Props">
            <h4>MUI Button props</h4>
            <table className="props-table">
              <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td><code>variant</code></td><td><code>'contained' | 'outlined' | 'text'</code></td><td><code>'text'</code></td><td>Visual style.</td></tr>
                <tr><td><code>color</code></td><td><code>'primary' | 'secondary' | 'error' | 'default'</code></td><td><code>'primary'</code></td><td>Palette color.</td></tr>
                <tr><td><code>size</code></td><td><code>'small' | 'medium' | 'large'</code></td><td><code>'medium'</code></td><td>Button size.</td></tr>
                <tr><td><code>disabled</code></td><td><code>bool</code></td><td><code>false</code></td><td>Disables interaction.</td></tr>
                <tr><td><code>startIcon</code></td><td><code>node</code></td><td>&mdash;</td><td>Icon before the label.</td></tr>
                <tr><td><code>endIcon</code></td><td><code>node</code></td><td>&mdash;</td><td>Icon after the label.</td></tr>
                <tr><td><code>onClick</code></td><td><code>func</code></td><td>&mdash;</td><td>Click handler.</td></tr>
                <tr><td><code>sx</code></td><td><code>object</code></td><td>&mdash;</td><td>MUI system style overrides.</td></tr>
              </tbody>
            </table>
            <h4 style={{ marginTop: 20 }}>Pill Button (Button.jsx) props</h4>
            <table className="props-table">
              <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td><code>label</code></td><td><code>string | node</code></td><td>&mdash;</td><td>Button text (Chip <code>label</code>).</td></tr>
                <tr><td><code>icon</code></td><td><code>node</code></td><td>&mdash;</td><td>Leading icon (Chip <code>icon</code>).</td></tr>
                <tr><td><code>onClick</code></td><td><code>func</code></td><td>&mdash;</td><td>Click handler.</td></tr>
                <tr><td><code>sx</code></td><td><code>object</code></td><td>&mdash;</td><td>Merged with defaults: height 40px, borderRadius 100px, padding 0 8px.</td></tr>
                <tr><td colSpan={4} style={{ color: 'var(--text-muted)', fontSize: 11 }}>
                  Pill Button passes remaining props to MUI Chip. Does not support <code>variant</code>, <code>startIcon</code>, or <code>endIcon</code>.
                </td></tr>
              </tbody>
            </table>
          </Section>

          <Section title="Usage">
            <div className="todo"><strong>TODO &mdash; needs spec.</strong> Draft guidance below; review with team before finalizing.</div>
            <h4 style={{ marginTop: 12 }}>Do</h4>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              <li>Use one Contained button per button row for the primary action.</li>
              <li>Always set <code>textTransform: 'none'</code> &mdash; OCL never uses uppercase button labels.</li>
              <li>Use the Pill pattern for entity-specific contextual actions (Follow, Add).</li>
              <li>Always wrap Icon Buttons in a <code>Tooltip</code> or provide <code>aria-label</code>.</li>
              <li>Place the primary action on the right in form footers (Cancel left, Submit right).</li>
            </ul>
            <h4>Don't</h4>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              <li>Don't use multiple Contained buttons in the same row.</li>
              <li>Don't use the Pill for page-level primary actions &mdash; use Contained.</li>
              <li>Don't use Icon Buttons without a tooltip.</li>
              <li>Don't apply <code>textTransform: 'uppercase'</code> to any button.</li>
            </ul>
          </Section>

          <Section title="Accessibility">
            <div className="todo"><strong>TODO &mdash; needs spec.</strong> Notes from implementation review; formal audit pending.</div>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 13 }}>
              <li>All MUI Buttons render as native <code>&lt;button&gt;</code> elements &mdash; keyboard-focusable by default.</li>
              <li>The Pill wraps Chip with <code>role="button"</code> and click/keyboard handling.</li>
              <li>Icon Buttons MUST have a Tooltip or <code>aria-label</code>.</li>
              <li>Split Button dropdown triggers need <code>aria-haspopup="menu"</code> and <code>aria-expanded</code>.</li>
              <li>Color contrast: Primary contained (#4836ff on white) passes WCAG AA at 4.56:1.</li>
              <li>Disabled buttons use reduced opacity and are removed from tab order by MUI.</li>
            </ul>
          </Section>

          {/* ============================================================ */}
          {/* PART 2: ADDITIONAL BUTTONS IN THE WILD                       */}
          {/* ============================================================ */}

          <Section title="Additional buttons in the wild">
            <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>
              The harmonized model above covers the canonical button types. The tables below catalog additional
              button variants found across oclweb3, oclmap, and the Zeplin designs.
            </p>

            <h4>oclweb3</h4>
            <table className="wild-table">
              <thead><tr><th>Button</th><th>Where used</th><th>What it does</th><th>Relationship to model</th></tr></thead>
              <tbody>
                <tr>
                  <td>OwnerButton</td>
                  <td>RepoHeader, breadcrumbs</td>
                  <td>MUI Button styled as a plain text link: <code>color: 'inherit'</code>, transparent hover, <code>minWidth: 'auto'</code>. Renders owner name with icon.</td>
                  <td>A <strong>Text Button</strong> "link-style" sub-variant that suppresses all visual affordances.</td>
                </tr>
                <tr>
                  <td>RepoVersionButton</td>
                  <td>RepoHeader, version selectors</td>
                  <td>Same styling as OwnerButton but for repo/version display. Supports vertical layout.</td>
                  <td>Same "link-style" <strong>Text Button</strong> pattern. Vertical layout is unique.</td>
                </tr>
                <tr>
                  <td>Link</td>
                  <td>Throughout</td>
                  <td>MUI Button as <code>&lt;a&gt;</code> via <code>component="a"</code>. <code>variant="text"</code>, <code>fontSize: 22px</code>.</td>
                  <td><strong>Text Button</strong> used as a navigation link.</td>
                </tr>
                <tr>
                  <td>Dropdown trigger</td>
                  <td>Menus throughout</td>
                  <td>Text button with <code>endIcon=&#123;&lt;DownIcon/&gt;&#125;</code>. Opens a Popper/Menu.</td>
                  <td>Standard <strong>Text Button</strong> with dropdown icon.</td>
                </tr>
                <tr>
                  <td>File upload</td>
                  <td>Import forms</td>
                  <td><code>variant="outlined"</code>, <code>size="small"</code> with upload icon.</td>
                  <td>Standard <strong>Outlined Button</strong>.</td>
                </tr>
                <tr>
                  <td>Search filter</td>
                  <td>Search toolbar</td>
                  <td><code>variant="contained"</code>, <code>color="default"</code> (gray) with dropdown arrow.</td>
                  <td><strong>Contained Button</strong> in <code>default</code> color.</td>
                </tr>
              </tbody>
            </table>

            <h4>oclmap</h4>
            <table className="wild-table">
              <thead><tr><th>Button</th><th>Where used</th><th>What it does</th><th>Relationship to model</th></tr></thead>
              <tbody>
                <tr>
                  <td>ScoreBucketButton</td>
                  <td>Mapper scoring toolbar</td>
                  <td><code>ButtonGroup variant="text"</code> with dynamic colored bottom borders and Badge wrappers.</td>
                  <td>Domain-specific <strong>Toggle Group</strong>. Too specialized for harmonized model.</td>
                </tr>
                <tr>
                  <td>AIAssistantButton</td>
                  <td>Mapper concept rows</td>
                  <td><code>ButtonGroup outlined</code> split button with AI icon and model selection dropdown.</td>
                  <td>Standard <strong>Split Button</strong> pattern.</td>
                </tr>
                <tr>
                  <td>DisplayMenu toggle</td>
                  <td>Search results</td>
                  <td><code>ButtonGroup outlined</code> with icon-only card/table view buttons. <code>color="info.dark"</code>.</td>
                  <td>Standard <strong>Toggle Group</strong> with icons. Uses non-standard color.</td>
                </tr>
              </tbody>
            </table>

            <h4>Zeplin designs</h4>
            <table className="wild-table">
              <thead><tr><th>Design</th><th>Screenshot</th><th>What it shows</th><th>Relationship to model</th></tr></thead>
              <tbody>
                <tr>
                  <td>"Take a tour"</td>
                  <td><a href="/ocl-design-system/designs/Dashboard-SignedIn.png">Dashboard-SignedIn.png</a></td>
                  <td>Outlined pill button on purple hero banner (inverted/light-on-dark).</td>
                  <td><strong>Outlined Button</strong> pill shape on dark background. One-off.</td>
                </tr>
                <tr>
                  <td>Toolbar dropdowns</td>
                  <td><a href="/ocl-design-system/designs/Component - Tables - Toolbar.png">Component - Tables - Toolbar.png</a></td>
                  <td>Outlined buttons with "Expansion: Name" labels and dropdown arrows.</td>
                  <td><strong>Outlined Button</strong> with <code>endIcon</code>. Fits harmonized model.</td>
                </tr>
                <tr>
                  <td>Bulk action bar</td>
                  <td><a href="/ocl-design-system/designs/Search _ Concepts _ Bulk.png">Search _ Concepts _ Bulk.png</a></td>
                  <td>Row of contained pills (Compare, Add to repository, Clone, Download) with icons.</td>
                  <td>Standard <strong>Contained Buttons</strong> in pill shape. Fits model.</td>
                </tr>
              </tbody>
            </table>
          </Section>

        </div>

        <aside className="detail-sidebar">
          <h3>Status</h3>
          <p><span className="badge partial">Partial</span> &mdash; MUI buttons ship everywhere; the Pill
            pattern is undocumented. App-specific variants exist outside the harmonized model.</p>

          <h3>Source</h3>
          <a className="source-link" href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/common/Button.jsx">src/components/common/Button.jsx</a>
          <a className="source-link" href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/common/FollowActionButton.jsx">src/components/common/FollowActionButton.jsx</a>
          <a className="source-link" href="https://github.com/OpenConceptLab/oclmap/blob/main/src/components/map-projects/MapButton.jsx">src/components/map-projects/MapButton.jsx</a>
          <a className="source-link" href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/dashboard/EventsButtonGroup.jsx">src/components/dashboard/EventsButtonGroup.jsx</a>

          <h3>Theme</h3>
          <a className="source-link" href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/index.jsx">src/index.jsx (MuiButton overrides)</a>

          <h3>Related</h3>
          <ul>
            <li><a href="/ocl-design-system/components/repo-header.html">RepoHeader</a></li>
            <li><a href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/common/Dialog.jsx">Dialog</a></li>
            <li><a href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/common/AddButton.jsx">AddButton</a></li>
            <li><a href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/common/DeleteIconButton.jsx">DeleteIconButton</a></li>
            <li><a href="https://github.com/OpenConceptLab/oclweb3/blob/main/src/components/common/CloseIconButton.jsx">CloseIconButton</a></li>
          </ul>

          <h3>Design</h3>
          <ul>
            <li><a href="/ocl-design-system/designs/Sign-in.png">Sign-in.png</a></li>
            <li><a href="/ocl-design-system/designs/Register.png">Register.png</a></li>
            <li><a href="/ocl-design-system/designs/Dashboard-SignedIn.png">Dashboard-SignedIn.png</a></li>
            <li><a href="/ocl-design-system/designs/Search _ Concepts _ Bulk.png">Search _ Concepts _ Bulk.png</a></li>
            <li><a href="/ocl-design-system/designs/Component - Repository - Header.png">Component - Repository - Header.png</a></li>
          </ul>
        </aside>
      </div>
    </main>

    <SiteFooter text="Component documented 2026-04-16 against oclweb3 commit 742259f0. Live React + MUI examples." />
  </>
);

export default ButtonPage;
