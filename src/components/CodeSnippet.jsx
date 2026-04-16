import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';

const CodeSnippet = ({ code, language = 'jsx', title }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      border: '1px solid var(--border-subtle)',
      borderRadius: 8,
      overflow: 'hidden',
      margin: '8px 0 16px',
      fontSize: 13,
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6px 12px',
        background: 'var(--surface-n94)',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {title || language}
        </span>
        <button
          onClick={handleCopy}
          style={{
            border: 'none',
            background: copied ? 'var(--primary-95)' : 'transparent',
            color: copied ? 'var(--primary-main)' : 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: 11,
            fontWeight: 500,
            padding: '2px 8px',
            borderRadius: 4,
            fontFamily: 'inherit',
          }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <Highlight theme={themes.github} code={code.trim()} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre style={{
            ...style,
            margin: 0,
            padding: '12px 16px',
            overflow: 'auto',
            lineHeight: 1.5,
            fontSize: 12,
            fontFamily: "'Roboto Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
          }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeSnippet;
