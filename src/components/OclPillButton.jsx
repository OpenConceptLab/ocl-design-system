/**
 * OCL Pill Button — replicates src/components/common/Button.jsx from oclweb3.
 * Wraps MUI Chip as a button with pill shape and surface.s90 color palette.
 */

import React from 'react';
import Chip from '@mui/material/Chip';

const OclPillButton = ({ style, sx, ...rest }) => (
  <Chip
    sx={{
      height: '40px',
      borderRadius: '100px',
      padding: '0 8px',
      ...style,
      ...sx,
    }}
    {...rest}
  />
);

export default OclPillButton;
