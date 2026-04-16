import React from 'react';

const SiteHeader = ({ section }) => (
  <header className="site-header">
    <div className="site-header-inner">
      <a className="site-brand" href="/ocl-design-system/">
        <img className="brand-logo" src="/ocl-design-system/assets/logo/text-stacked/BlueCircle-WhiteText.png" alt="" />
        <span>OCL v3 Design System</span>
        {section && <span className="brand-sub">· {section}</span>}
      </a>
      <nav className="site-nav">
        <a href="/ocl-design-system/">Overview</a>
        <a href="/ocl-design-system/foundations/color.html">Foundations</a>
        <a href="/ocl-design-system/components/" className={section === 'Components' ? 'active' : ''}>Components</a>
        <a href="/ocl-design-system/patterns/">Patterns</a>
        <a href="/ocl-design-system/gallery.html">Gallery</a>
      </nav>
      <div className="site-nav-right">
        <a href="/ocl-design-system/docs/review-2026-04.md">Review</a>
        <a href="https://github.com/OpenConceptLab/ocl-design-system">GitHub</a>
      </div>
    </div>
  </header>
);

export default SiteHeader;
