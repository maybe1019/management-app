module.exports = {
  '**/*.ts?(x)': () =>
    'tsc -p ./tsconfig.json --noEmit --emitDeclarationOnly false',
  '*.{js,jsx,ts,tsx}': 'eslint --fix',
};
