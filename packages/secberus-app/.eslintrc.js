module.exports = {
  extends: [
    'react-app', // Create React App base settings
    'eslint:recommended', // recommended ESLint rules
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display Prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
    project: './tsconfig.json',
    noWatch: true,
  },
  globals: {
    document: 'writable',
    window: 'writable',
    navigator: 'writable',
    it: 'writable',
    test: 'writable',
    expect: 'writable',
    IntersectionObserver: 'writable',
    self: 'writable',
    Worker: 'writable',
    Response: 'writable',
    confirm: 'writable',
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-use-before-define': 'off',
    'prettier/prettier':
      process.env.REACT_APP_DEPLOYED_ENV === 'preview' ? 'off' : 'warn',
    'import/no-anonymous-default-export': 'off',
    'import/no-cycle':
      process.env.REACT_APP_DEPLOYED_ENV === 'preview'
        ? 'off'
        : ['warn', { ignoreExternal: true }],
  },
  overrides: [
    {
      files: ['**/*.tsx', '**/*.ts'],
      parser: '@typescript-eslint/parser',
      extends: [
        '../../.eslintrc',
        'react-app',
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended', // recommended rules from @typescript-eslint/eslint-plugin
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with Prettier.
      ],
      parserOptions: {
        project: ['./tsconfig.json'], // Specify project only for TypeScript files
      },
      rules: {
        'react/prop-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
      },
    },
  ],
};
