import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { oclTheme } from '../theme';

export default function createEntry(elementId, PageComponent) {
  createRoot(document.getElementById(elementId)).render(
    <ThemeProvider theme={oclTheme}>
      <CssBaseline />
      <PageComponent />
    </ThemeProvider>,
  );
}
