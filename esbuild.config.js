/* eslint-disable */
const esbuild = require('esbuild');
const osPath = require('path');
const { nodeExternalsPlugin } = require('esbuild-node-externals');

// Automatically load and add all declared variables in .env file to process.env
require('dotenv').config({ path: osPath.join(__dirname, '.env') });

const define = {}
for (const k in process.env) {
  define[`process.env.${k}`] = JSON.stringify(process.env[k])
}

const overrideOpts = process.argv.reduce((acc, curr) => {
  const [_, _arg] = curr.split("--");

  if (_) return acc;

  const [arg, val] = _arg.split('=');

  if (val) {
    acc[arg] = val;
  } else {
    acc[arg] = true;
  }
  return acc;
}, {});

const baseOpts = {
  entryPoints: ['./src/index.ts'],
  outdir: 'dist',
  bundle: true,
  plugins: [
    nodeExternalsPlugin(), // Auto-exclude all node_modules from the bundled version
  ],
  format: 'esm',
  target: 'es2016',
  define: {
    'process.env.NODE_ENV': process.env.REACT_APP_DEPLOYED_ENV === 'local' ? '"development"' : '"production"',
    ...define,
  },
}

const devOpts = {
  ...baseOpts,
  minify: false,
  sourcemap: true
}

const stageOpts = {
  ...baseOpts,
  minify: true,
  sourcemap: true
}

const prodOpts = {
  ...baseOpts,
  minify: true
}

let opts = devOpts;
if (process.env.REACT_APP_DEPLOYED_ENV === 'stage') opts = stageOpts;
if (process.env.REACT_APP_DEPLOYED_ENV === 'prod') opts = prodOpts;

esbuild
  .build({...opts, ...overrideOpts})
  .catch(() => process.exit(1));
