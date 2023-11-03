const path = require('path');
const fs = require('fs');
const SUPPORTED_OPENAPI_EXTENSIONS = ['.yaml', '.yml', '.json'];

/**
 * @description Generates a configuration file for rtk query
 */
function getFileContent({ curr, outputName, outputApiName }) {
  const api = outputApiName.split('.ts')[0];
  const exportName = api.split('Generated')[0];
  console.log('API: ', api);
  console.log('EXPORT: ', exportName);
  return `/**
* This is a generated file. Do not modify it.
* If you need to make changes, please see
* scripts/build-configs.script.js
*/
const path = require('path');

console.log('\\x1b[32m\\n\\n#### GENERATING CODE FOR ${curr}\\x1b[0m');

/** @type {import("@rtk-query/codegen-openapi").ConfigFile} */
const config = {
  schemaFile: path.join(
    __dirname,
    '..',
    'specs',
    '${curr}'
  ),
  apiFile: path.join(
    '..',
    '..',
    'src',
    'store',
    '${outputApiName}',
  ),
  apiImport: '${api}',
  outputFile: path.join(
    __dirname,
    '..',
    '..',
    'src',
    'store',
    'injections',
    '${outputName}.generated.ts'
  ),
  exportName: '${exportName}',
  hooks: {
    queries: true,
  },
};

module.exports = config;\n`;
}

/**
 * @description Generates a base injection api. These HAVE to be separate
 * or it will cause uncatchable errors and  general tomfoolery
 * throughout the product
 *
 * basically, if two APIs have an op name, the type of the first injected
 * op name will override every other op name after that, and ts has no
 * idea that this has happened. it's an issue with rtk query.
 */
function generateInjectableApi({ outputName, storePath }) {
  const outputApiName = `${outputName}Generated`;
  const outputApiFile = `${outputApiName}.ts`;
  const outputLocation = path.join(storePath, outputApiFile);
  fs.writeFileSync(
    outputLocation,
    `import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithPlugins } from '../baseQuery/baseQuery';

export const ${outputApiName} = createApi({
  baseQuery: baseQueryWithPlugins,
  endpoints: () => ({}),
  reducerPath: '${outputName}',
  tagTypes: [
    'AccessPolicy',
    'Category',
    'ComplianceFramework',
    'DataSource',
    'DataSourceType',
    'Exception',
    'Explorer',
    'ExplorerTables',
    'ExplorerViews',
    'ExplorerQueries',
    'Integration',
    'Log',
    'Metrics',
    'Organization',
    'Policy',
    'Report',
    'Role',
    'SSO',
    'User',
    'Violation',
    'Workflow',
  ],
});
`
  );
  return outputApiFile;
}

function main() {
  const down = [__dirname, '..'];
  const openApiSpecPath = path.join(...down, 'openapi', 'specs');
  const configPath = path.join(...down, 'openapi', 'configs');
  const srcPath = path.join(...down, 'src');
  const storePath = path.join(srcPath, 'store');
  const injectionPath = path.join(storePath, 'injections');

  // If there's no Open API spec file, execution is pointless here
  if (!fs.existsSync(openApiSpecPath)) {
    process.stdout.write(
      '\n>> Open API spec do not exist. run make to generate these\n'
    );
    process.exit(1);
  }

  // Prep configs and injections if they don't exist
  if (!fs.existsSync(configPath)) {
    process.stdout.write('\n>> Creating /configs\n');
    fs.mkdirSync(configPath);
  }
  if (!fs.existsSync(injectionPath)) {
    process.stdout.write('\n>> Creating src/store/injections\n');
    fs.mkdirSync(injectionPath);
  }

  // Read ./fixtures
  const dirValues = fs.readdirSync(openApiSpecPath);

  // For safety, filter any invalid file extensions
  const targetFiles = dirValues.filter((file) => {
    return SUPPORTED_OPENAPI_EXTENSIONS.includes(
      path.extname(file).toLowerCase()
    );
  });
  for (let i = 0; i <= targetFiles.length - 1; i++) {
    const curr = targetFiles[i];
    const basename = path.parse(curr).name;
    const outputName = basename.replace(/[^a-zA-Z0-9.]/g, '');
    const outputApiName = generateInjectableApi({ outputName, storePath });
    fs.writeFileSync(
      path.join(configPath, `${basename}.config.js`),
      getFileContent({ curr, outputName, outputApiName })
    );
  }
}
main();
