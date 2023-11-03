/* eslint-disable no-useless-escape */
/* eslint-disable prettier/prettier */

const EnvironmentMatches = {
  all: '.*',
  dev: 'dev\.secberus\.io',
  stage: 'stage\.secberus\.io',
  prod: 'app\.secberus\.io',
  amplify: 'pr-\d*.*\.amplifyapp.*',
  localhost: 'localhost',
}

export type SecberusFeatureFlag =
  'data-explorer'
  | 'data-explorer-rev1'
  | 'data-explorer-rev2';

/**
 * List of features and the domains/subdomains the features should be enabled on.
 * Array of strings are a regex pattern enclosed in start/end patterns. i.e.: /^search$/
 *
 * Make sure to match the whole url.
 * Example: for dev.secberus.io: dev\..* should suffice
 */
export const featureFlagConfig: Record<SecberusFeatureFlag, string[]> = {
  'data-explorer': [
    EnvironmentMatches.prod,
    EnvironmentMatches.stage,
    EnvironmentMatches.dev,
    EnvironmentMatches.amplify,
    EnvironmentMatches.localhost
  ],
  'data-explorer-rev1': [
    EnvironmentMatches.prod,
    EnvironmentMatches.stage,
    EnvironmentMatches.dev,
    EnvironmentMatches.amplify,
    EnvironmentMatches.localhost,
  ],
  'data-explorer-rev2': [
    EnvironmentMatches.prod,
    EnvironmentMatches.stage,
    EnvironmentMatches.dev,
    EnvironmentMatches.amplify,
    EnvironmentMatches.localhost,
  ],
};
