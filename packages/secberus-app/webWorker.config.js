/* eslint-disable */
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
// Read directory
// console.log(chalk.red('Warning, existing workers will be deleted'));
const webworkerDir = path.join(__dirname, 'webWorkers');
const webWorkerDirRead = fs.readdirSync(webworkerDir);
const entryPoints = {};
// console.log(chalk.green('Deleting public/workers...'));
webWorkerDirRead.forEach(worker => {
  entryPoints[worker.replace('.js', '')] = path.join(
    __dirname,
    'webWorkers',
    worker
  );
});
// console.log(chalk.green('OK\n'));
rimraf.sync(path.join(__dirname, 'public', 'workers'));
// console.log(
//   chalk.green('Generating new public/workers/ with new worker builds')
// );
fs.mkdirSync(path.join(__dirname, 'public', 'workers'));
module.exports = {
  entry: {
    ...entryPoints,
  },
  output: {
    filename: '[name].js',
    path: `${__dirname}/public/workers`,
  },
};
// console.log(chalk.green('OK\n'));
