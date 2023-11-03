import React from 'react';
import Editor, { Monaco, useMonaco, loader } from '@monaco-editor/react';
import { Flex, Spinner } from '@chakra-ui/react';
import {
  Language,
  EditorComponentProps,
  EditorProps,
} from './CodeEditor.types';
import {
  darkTheme,
  lightTheme,
  regoLanguageDefinition,
  smplLanguageDefinition,
  whiteTheme,
} from './config';
import { EditorDropdown, Container } from './CodeEditor.styled';

const themeConfig = { dark: darkTheme, light: lightTheme, white: whiteTheme };

const langOpts: { id: Language; name: string }[] = [
  { id: 'SMPL', name: 'SMPL' },
  { id: 'REGO', name: 'OPA Rego Language' },
];

const languageTokenProvider: Record<Language, any> = {
  REGO: regoLanguageDefinition,
  SMPL: smplLanguageDefinition,
};

const Component: React.FC<EditorProps> = ({
  width,
  language,
  defaultValue,
  theme,
  onChange,
  options,
}) => {
  const monaco = useMonaco();
  const [value, setValue] = React.useState(defaultValue);

  React.useEffect(() => {
    langOpts.forEach(lang => {
      monaco?.languages.register({ id: lang.id });
      monaco?.languages.setMonarchTokensProvider(
        lang.id,
        languageTokenProvider[lang.id]
      );
    });
  }, [monaco?.languages]);

  React.useEffect(() => {
    monaco?.editor.defineTheme('sb-dark', themeConfig.dark);
    monaco?.editor.defineTheme('sb-light', themeConfig.light);
    monaco?.editor.defineTheme('sb-white', themeConfig.white);
  }, [monaco]);

  React.useEffect(() => {
    onChange?.({ code: value, language });
  }, [language, onChange, value]);

  const onValueChange = (val?: string) => setValue(val);

  if (!monaco) {
    return (
      <Flex alignItems="center" justifyContent="center">
        <Spinner />
      </Flex>
    );
  }

  return (
    <Editor
      width={width}
      theme={theme}
      language={language}
      defaultValue={value}
      options={{
        fontSize: 15,
        minimap: { enabled: false },
        automaticLayout: true,
        ...options,
      }}
      onChange={onValueChange}
    />
  );
};

export const CodeEditor: React.FC<EditorComponentProps> = ({
  width = '100%',
  defaultLanguage = 'REGO',
  defaultValue,
  theme = 'sb-dark',
  enableLanguageSelection,
  onChange,
  options = {},
}) => {
  const [selectedLang, setSelectedLang] = React.useState(
    langOpts.find(opt => opt.id === defaultLanguage) || langOpts[0]
  );

  if (!enableLanguageSelection) {
    return (
      <Component
        width={width}
        language={selectedLang.id}
        defaultValue={defaultValue}
        theme={theme}
        onChange={onChange}
        options={options}
      />
    );
  }
  return (
    <Container>
      <EditorDropdown
        options={langOpts}
        displayKey="name"
        dark
        value={selectedLang}
        onChange={val => setSelectedLang(val)}
      />
      <Component
        width={width}
        language={selectedLang.id}
        defaultValue={defaultValue}
        theme={theme}
        onChange={onChange}
        options={{ padding: { top: 76 }, ...options }}
      />
    </Container>
  );
};

export const useCodeEditorRef = (): {
  monaco: Monaco;
  loader: typeof loader;
} => {
  return { monaco: useMonaco() as Monaco, loader };
};
