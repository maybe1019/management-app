/* eslint-disable @typescript-eslint/no-var-requires */
process.env.NODE_ENV = 'production';
/* eslint-disable-next-line */
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { createEnvAwareLogger } = require('@secberus/utils');
const webpackConfigProd = require('react-scripts/config/webpack.config')(
  'production'
);

const logger = createEnvAwareLogger({ supressInProduction: false });

webpackConfigProd.plugins.push(new BundleAnalyzerPlugin());

webpack(webpackConfigProd, (err, stats) => {
  if (err || stats.hasErrors()) {
    logger.error(err);
  }
});
