/**
 * OCL Design System — MUI Theme
 *
 * Replicates the theme from oclweb3/src/index.jsx (commit 742259f0).
 * When oclweb3 theme overrides change, update this file to match.
 */

import { createTheme, alpha } from '@mui/material/styles';
import Fade from '@mui/material/Fade';
import { COLORS, WHITE } from './colors';

const baseTheme = createTheme();

// Keyboard focus ring for buttons: white, then primary.30.
const FOCUS_RING = `0 0 0 2px ${WHITE}, 0 0 0 4px ${COLORS.primary['30']}`;

export const oclTheme = createTheme(baseTheme, {
  palette: {
    ...COLORS,
    success: { ...COLORS.primary },
    info: { ...COLORS.secondary },
    surface: { ...COLORS.surface },
    neutral: { ...COLORS.neutral },
    default: {
      main: COLORS.surface.n96,
      dark: COLORS.surface.n96,
      light: COLORS.secondary['40'],
    },
  },
  components: {
    MuiTooltip: {
      defaultProps: {
        arrow: true,
        leaveDelay: 300,
        TransitionComponent: Fade,
        TransitionProps: { timeout: 300 },
      },
    },
    MuiButton: {
      // MUI's focus ripple pulses a circle of the text color at 30% behind the
      // label, dropping it below 4.5:1. Keyboard focus shows this ring instead.
      // The click ripple stays.
      defaultProps: {
        disableFocusRipple: true,
      },
      styleOverrides: {
        root: {
          '&.Mui-focusVisible': {
            boxShadow: FOCUS_RING,
          },
        },
      },
      variants: [
        {
          props: { variant: 'contained', color: COLORS.surface.n96 },
          style: {
            color: baseTheme.palette.getContrastText(COLORS.surface.n96),
          },
        },
        {
          props: { variant: 'outlined', color: COLORS.surface.n96 },
          style: {
            color: baseTheme.palette.text.primary,
            borderColor: 'rgba(0, 0, 0, 0.23)',
            '&.Mui-disabled': {
              border: `1px solid ${baseTheme.palette.action.disabledBackground}`,
            },
            '&:hover': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
              backgroundColor: alpha(
                baseTheme.palette.text.primary,
                baseTheme.palette.action.hoverOpacity,
              ),
            },
          },
        },
        {
          props: { color: COLORS.surface.contrastText, variant: 'text' },
          style: {
            color: baseTheme.palette.text.primary,
            '&:hover': {
              backgroundColor: alpha(
                baseTheme.palette.text.primary,
                baseTheme.palette.action.hoverOpacity,
              ),
            },
          },
        },
      ],
    },
    MuiButtonGroup: {
      // A ButtonGroup hands its own disableFocusRipple (false by default) to
      // its buttons, and that outranks MuiButton's default above.
      defaultProps: {
        disableFocusRipple: true,
      },
      styleOverrides: {
        // A contained group resets its buttons' box-shadow, on hover too, and
        // each button paints over its neighbour's edge. This rule outranks
        // both resets and lifts the focused button, so the whole ring shows.
        grouped: {
          '&.Mui-focusVisible': {
            boxShadow: FOCUS_RING,
            zIndex: 1,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(94, 92, 113, 0.2)',
          },
        },
      },
    },
  },
});
