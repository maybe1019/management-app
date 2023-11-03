/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const glob = require('glob');
const fs = require('fse');
const _ = require('lodash');

const SRC_DIR = path.resolve(__dirname, '../tmp/svg');

const dir = './tmp/flattened/v3';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const TARGET_DIR = path.resolve(__dirname, '../tmp/flattened');

const files = glob.sync('**/*.svg', { cwd: SRC_DIR });

files.forEach(file => {
  let fileName = file.split('.');
  fileName[0] = _.upperFirst(_.camelCase(fileName[0]));
  fileName = fileName.join('.');
  fs.rename(`${SRC_DIR}/${file}`, `${TARGET_DIR}/${fileName}`, err => {
    if (err) throw err;
    console.log(`Renamed ${file} to ${fileName}!`);
  });
});
