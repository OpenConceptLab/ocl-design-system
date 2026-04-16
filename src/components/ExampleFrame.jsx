import React from 'react';

const ExampleFrame = ({ children, note }) => (
  <>
    <div className="example-frame">
      {children}
    </div>
    {note && (
      <p style={{ color: 'var(--text-muted)', fontSize: 12 }}>{note}</p>
    )}
  </>
);

export default ExampleFrame;
