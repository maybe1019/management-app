/* eslint-disable @typescript-eslint/no-var-requires */
const { override, addBabelPlugins } = require('customize-cra');
const { ProgressPlugin } = require('webpack');
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

module.exports = {
  webpack: override(
    addBabelPlugins('babel-plugin-istanbul'),
    config => {
      /* point eslint to use .eslintcache/ */
      const p = config.plugins.find(
        p => p.constructor.name === 'ESLintWebpackPlugin'
      );
      if (p) {
        p.options.cacheLocation = '.eslintcache/';
      }
      /* add webpack progress */
      config.plugins.push(new ProgressPlugin());

      return config;
    }
    // XXX obataku: this does not play well with InterpolateHtmlPlugin (and probably others)
    // https://github.com/stephencookdev/speed-measure-webpack-plugin/issues/164
    // ... so let's disable it by default
    // config => new SpeedMeasurePlugin().wrap(config),
  ),
};
