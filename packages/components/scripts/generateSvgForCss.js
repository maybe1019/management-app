/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const svgToMiniDataURI = require('mini-svg-data-uri');
const { createEnvAwareLogger } = require('@secberus/utils');
const SVGO = require('svgo');
const fs = require('fse');
const path = require('path');
const glob = require('glob');

const logger = createEnvAwareLogger();

const svgo = new SVGO({
  plugins: [
    {
      removeViewBox: false, // removing viewbox breaks css scaling
    },
  ],
});

const SRC_DIR = path.resolve(__dirname, '../public/images');
const TARGET_DIR = path.resolve(__dirname, '../src/styles/optimized-svg');

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR);
}

const files = glob.sync('**/*.svg', { cwd: SRC_DIR });

files.forEach(file => {
  fs.readFile(path.resolve(SRC_DIR, file), 'utf8', (err, data) => {
    if (err) {
      return logger.log(err);
    }
    const name = file.split(`.`)[0];
    logger.log(`\ninitial ${file}...`, '\n', data);
    logger.log(`\noptimizing ${file}...`);
    svgo.optimize(data, { path: path.resolve(SRC_DIR, file) }).then(result => {
      logger.log('\ndone:', result);
      logger.log(`\nencoding ${file} => ${name}.ts`, '\n\n');
      const code = `
      export const ${name}SvgEncoded = "${svgToMiniDataURI(result.data)}";
      `;
      fs.writeFile(path.resolve(TARGET_DIR, `${name}.ts`), code);
    });
  });
});
