import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';

// List of themes available
// https://github.com/microsoft/vscode/blob/main/src/vs/editor/common/core/editorColorRegistry.ts
// List of tokens available
// https://github.com/microsoft/vscode/blob/main/src/vs/platform/theme/common/tokenClassificationRegistry.ts#L543
export const darkTheme: monacoEditor.editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'background', background: '111122' },
    { token: 'operators', foreground: '0273E2' },
    { token: 'keywords', foreground: '0273E2' },
    { token: 'symbols', foreground: 'FA5454' },
    { token: 'strings', foreground: 'e9cbf7' },
    { token: 'comment', foreground: '32466A' },
    { token: 'key', foreground: '0273E2', fontStyle: 'bold' },
    { token: 'bracket', foreground: 'AF26D1' },
    { token: 'digits', foreground: 'b8dafc' },
  ],
  colors: {
    'editor.background': '#111122',
    'editor.lineHighlightBackground': '#323246',
    'editorLineNumber.foreground': '#4e4e61',
    'scrollbarSlider.hoverBackground': '#323246',
    'scrollbarSlider.activeBackground': '#323246',
    'scrollbar.shadow': '#323246',
    'scrollbarSlider.background': '#323246',
    'editorOverviewRuler.border': '#111122',
  },
};

export const lightTheme: monacoEditor.editor.IStandaloneThemeData = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'background', background: 'f1f6fa' },
    { token: 'operators', foreground: '0273E2' },
    { token: 'keywords', foreground: '0273E2' },
    { token: 'symbols', foreground: 'FA5454' },
    { token: 'strings', foreground: 'e33b3b' },
    { token: 'comment', foreground: '6A6A88' },
    { token: 'key', foreground: '0273E2', fontStyle: 'bold' },
    { token: 'bracket', foreground: 'AF26D1' },
    { token: 'digits', foreground: '669cd1' },
  ],
  colors: {
    'editor.background': '#f1f6fa',
    'editorLineNumber.foreground': '#669cd1',
    'editorOverviewRuler.border': '#f1f6fa',
  },
};

export const whiteTheme: monacoEditor.editor.IStandaloneThemeData = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'background', background: 'FFFFFF' },
    { token: 'foreground', background: '111122' },
    { token: 'operators', foreground: '0273E2' },
    { token: 'keywords', foreground: '0273E2' },
    { token: 'symbols', foreground: 'FA5454' },
    { token: 'strings', foreground: 'e33b3b' },
    { token: 'comment', foreground: '6A6A88' },
    { token: 'key', foreground: '0273E2', fontStyle: 'bold' },
    { token: 'bracket', foreground: 'AF26D1' },
    { token: 'digits', foreground: '669cd1' },
    { token: 'margin', background: '669cd1' },
    { token: 'string', foreground: '111122' },
    { token: 'label', foreground: '111122' },
    { token: 'keyword', foreground: '0273E2' },
  ],
  colors: {
    'editor.background': '#FFFFFF',
    'editor.foreground': '#111122',
    'editorGutter.background': '#FFFFFF',
    'editorLineNumber.foreground': '#6A6A88',
    'editorActiveLineNumber.foreground': '#111122',
    'editorOverviewRuler.border': '#f1f6fa',
    'editor.lineHighlightBorder': '#f1f6fa',
  },
};
