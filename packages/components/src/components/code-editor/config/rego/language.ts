import { TokenProvider } from '../config.types';
//this definition is written in the Monarch implementation

export const regoLanguageDefinition: TokenProvider = {
  keywords: [
    'default',
    'not',
    'package',
    'import',
    'as',
    'with',
    'else',
    'some',
    'false',
    'null',
    'true',
  ],
  operators: ['+', '-', '*', '%', '/', '!=', '&', '|', '>', '<'],
  tokenizer: {
    root: [{ include: 'common' }],
    common: [
      [/"[^"]+"/, 'strings'],
      [/(?=\D|])(\.)(?=\w)/, 'key'],
      [
        /[a-z_$][\w$]*/,
        {
          cases: {
            '@keywords': 'keywords',
            '@default': 'identifier',
          },
        },
      ],
      [
        /[=><!~?:s&|+\-*/^%]+/,
        {
          cases: {
            '@operators': 'operators',
            '@default': 'symbols',
          },
        },
      ],
      [/\d+(_+\d+)*/, 'digits'],
      [/[()[\]{}]/, 'bracket'],
      [/#(.*)/, 'comment'],
    ],
  },
};
