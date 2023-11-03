const path = require('path');
const fs = require('fs');

function main() {
  console.log('\n#### Rebuilding index.ts exports\n');
  const injectionsPath = path.join(
    __dirname,
    '..',
    'src',
    'store',
    'injections'
  );
  if (!fs.existsSync(injectionsPath)) {
    process.stdout.write(
      '\nInjections does not exist. This has to be manually added.\nExiting'
    );
    process.exit(1);
  }
  const dirValues = fs
    .readdirSync(injectionsPath)
    ?.filter(
      (file) =>
        path.extname(file).toLowerCase() === '.ts' && file !== 'index.ts'
    )
    ?.map((file) => ({
      filename: path.parse(file).name,
    }));
  console.log(
    `\n#### index.ts updating to export ${dirValues.length} api files\n`
  );
  const newIndexContent = dirValues
    ?.map(
      ({ filename }) => `export * as Spec${filename} from './${filename}';\n`
    )
    .join('');
  fs.writeFileSync(`${injectionsPath}/index.ts`, newIndexContent);
  console.log(`\n#### index.ts updated`);
}

main();
