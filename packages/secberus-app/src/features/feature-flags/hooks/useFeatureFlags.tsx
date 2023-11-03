import { featureFlagConfig, SecberusFeatureFlag } from '../config';

export type PartialFeaturesList = Partial<Record<SecberusFeatureFlag, boolean>>;

/**
 * Returns a list of configured feature flags and a boolean that represents if
 * the feature is currently enabled.
 */
export const useFeatureFlags = (): PartialFeaturesList => {
  const hostname = window.location.hostname;
  const features: PartialFeaturesList = {};

  Object.entries(featureFlagConfig).forEach(([name, envs]) => {
    features[name as SecberusFeatureFlag] = false;
    for (let i = 0; i < envs.length; i++) {
      const env = envs[i];
      const regex = new RegExp(`^${env}$`);
      if (regex.test(hostname)) {
        features[name as SecberusFeatureFlag] = true;
        break;
      }
    }
  });

  return features;
};
