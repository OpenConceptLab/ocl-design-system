import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { oclTheme } from '../theme';
import BuildingPagesPage from './BuildingPagesPage';

createRoot(document.getElementById('building-pages')).render(
  <ThemeProvider theme={oclTheme}>
    <CssBaseline />
    <BuildingPagesPage />
  </ThemeProvider>,
);
