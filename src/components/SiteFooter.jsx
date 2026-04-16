import React from 'react';

const SiteFooter = ({ text }) => (
  <footer className="site-footer">
    {text || 'OCL v3 Design System · Canonical implementation: oclweb3'}
  </footer>
);

export default SiteFooter;
