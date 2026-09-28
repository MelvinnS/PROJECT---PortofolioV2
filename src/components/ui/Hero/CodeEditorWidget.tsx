import React from 'react';

interface CodeLine {
  indent?: number;
  tokens: Array<{ kind: 'kw' | 'fn' | 'str' | 'num' | 'op' | 'var' | 'comment' | 'plain'; text: string }>;
}

const CODE_LINES: CodeLine[] = [
  { tokens: [{ kind: 'kw', text: 'const' }, { kind: 'plain', text: ' ' }, { kind: 'var', text: 'developer' }, { kind: 'op', text: ' = {' }] },
  { indent: 1, tokens: [{ kind: 'var', text: 'name' }, { kind: 'op', text: ':' }, { kind: 'str', text: ' "Melvin Andrea"' }, { kind: 'op', text: ',' }] },
  { indent: 1, tokens: [{ kind: 'var', text: 'role' }, { kind: 'op', text: ':' }, { kind: 'str', text: ' "Code + Creative"' }, { kind: 'op', text: ',' }] },
  { indent: 1, tokens: [{ kind: 'var', text: 'stack' }, { kind: 'op', text: ': [' }, { kind: 'str', text: '"React"' }, { kind: 'op', text: ', ' }, { kind: 'str', text: '"Flutter"' }, { kind: 'op', text: ', ' }, { kind: 'str', text: '"TS"' }, { kind: 'op', text: '],' }] },
  { indent: 1, tokens: [{ kind: 'var', text: 'available' }, { kind: 'op', text: ':' }, { kind: 'kw', text: ' true' }] },
  { tokens: [{ kind: 'op', text: '};' }] },
  { tokens: [{ kind: 'kw', text: 'export default' }, { kind: 'plain', text: ' ' }, { kind: 'fn', text: 'developer' }, { kind: 'op', text: ';' }] },
];

export const CodeEditorWidget: React.FC = () => {
  return (
    <div className="code-editor">
      {/* Title bar */}
      <div className="code-editor-bar">
        <span className="code-editor-dot" style={{ background: '#ff5f57' }} />
        <span className="code-editor-dot" style={{ background: '#febc2e' }} />
        <span className="code-editor-dot" style={{ background: '#28c840' }} />
        <span className="code-editor-filename">melvin.config.ts</span>
      </div>
      {/* Code body */}
      <div className="code-editor-body">
        {CODE_LINES.map((line, i) => (
          <div key={i} className="code-line">
            <span className="code-lineno">{i + 1}</span>
            <span className="code-content" style={{ paddingLeft: `${(line.indent ?? 0) * 14}px` }}>
              {line.tokens.map((tok, j) => (
                <span key={j} className={`tok-${tok.kind}`}>{tok.text}</span>
              ))}
            </span>
          </div>
        ))}
        {/* blinking cursor on last line */}
        <div className="code-line">
          <span className="code-lineno">{CODE_LINES.length + 1}</span>
          <span className="code-content">
            <span className="code-caret">█</span>
          </span>
        </div>
      </div>
    </div>
  );
};
