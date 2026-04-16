/**
 * OCL Design System — MUI Theme
 *
 * Replicates the theme from oclweb3/src/index.jsx (commit 742259f0).
 * When oclweb3 theme overrides change, update this file to match.
 */

import { createTheme, alpha } from '@mui/material/styles';
import Fade from '@mui/material/Fade';
import { COLORS } from './colors';

const baseTheme = createTheme();

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
