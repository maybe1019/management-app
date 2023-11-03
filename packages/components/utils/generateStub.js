/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const { kebabCase, camelCase, upperFirst } = require('lodash');

const cliArgs = process.argv.slice(2);

if (!!cliArgs[0] === false) {
  process.stderr.write(
    'Missing Component Name. Usage: yarn genstub:component YourComponentInCamelCase'
  );
  process.exit(0);
}

const nameArg = cliArgs[0];
const dirname = kebabCase(nameArg);
const componentName = upperFirst(camelCase(nameArg));
const outputLoc = path.resolve(__dirname, '../src/components/', dirname);

fs.mkdirSync(outputLoc);
fs.writeFileSync(
  path.resolve(outputLoc, `${componentName}.component.tsx`),
  `import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme/defaultTheme';
import { ${componentName}Props } from './${componentName}.types';
import { ${componentName}Container } from './${componentName}.styled';

export const ${componentName}: React.FC<${componentName}Props> = () => {
  return (
    <ThemeProvider theme={theme}>
      <${componentName}Container>
        Hello World!
      </${componentName}Container>
    </ThemeProvider>
  )
};
`
);
process.stdout.write(`\nNew file ${outputLoc}/${componentName}.component.tsx`);
fs.writeFileSync(
  path.resolve(outputLoc, `${componentName}.styled.ts`),
  `import styled from 'styled-components';
import {} from './${componentName}.types';

export const ${componentName}Container = styled.div\`\`;
`
);
process.stdout.write(`\nNew file ${outputLoc}/${componentName}.styled.ts`);
fs.writeFileSync(
  path.resolve(outputLoc, `${componentName}.types.ts`),
  `export interface ${componentName}Props {
  id: string;
}
`
);
process.stdout.write(`\nNew file ${outputLoc}/index.ts`);

fs.writeFileSync(
  path.resolve(outputLoc, `index.ts`),
  `export * from './${componentName}.types';
export * from './${componentName}.component';
`
);
process.stdout.write(`\nNew file ${outputLoc}/${componentName}.types.ts`);

fs.appendFileSync(
  path.resolve(__dirname, '../src/components/index.ts'),
  `export * from './${dirname}';\n`
);
process.stdout.write(
  `\nAdded export to ${path.resolve(__dirname, '../src/components/index.ts')}`
);

process.stdout.write('\nComplete');
