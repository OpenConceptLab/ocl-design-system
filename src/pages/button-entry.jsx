import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { oclTheme } from '../theme';
import ButtonPage from './ButtonPage';

createRoot(document.getElementById('button-page')).render(
  <ThemeProvider theme={oclTheme}>
    <CssBaseline />
    <ButtonPage />
  </ThemeProvider>,
);
