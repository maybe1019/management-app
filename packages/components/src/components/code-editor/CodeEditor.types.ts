import { EditorProps as MonacoEditorProps } from '@monaco-editor/react';

export type Language = 'SMPL' | 'REGO';

export interface EditorComponentProps
  extends Pick<MonacoEditorProps, 'defaultValue' | 'width' | 'options'> {
  defaultLanguage?: Language;
  theme?: 'sb-dark' | 'sb-light' | 'sb-white';
  enableLanguageSelection?: boolean;
  onChange?: ({ code, language }: { code?: string; language?: string }) => void;
}

export interface EditorProps
  extends Omit<EditorComponentProps, 'defaultLanguage'> {
  language?: Language;
}
