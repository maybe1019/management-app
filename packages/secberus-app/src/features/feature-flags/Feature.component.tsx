import React from 'react';
import { SecberusFeatureFlag } from './config';
import { FeatureFlagErrorBoundary } from './FeatureFlagErrorBoundary';
import { useFeatureFlags } from './hooks/useFeatureFlags';

export interface FeatureProps {
  name: SecberusFeatureFlag;
  default?: boolean;
  children?: JSX.Element | null;
}

export type FeatureReturnType = JSX.Element | null;

export const Feature = ({
  name,
  children,
  default: isDefault,
}: FeatureProps): FeatureReturnType => {
  const features = useFeatureFlags();
  const enabled = !!features?.[name];

  const Component = (
    <FeatureFlagErrorBoundary feature={name}>
      {children}
    </FeatureFlagErrorBoundary>
  );

  if (enabled && children) {
    if (isDefault) return null;
    return Component;
  } else if (isDefault && children) {
    return Component;
  }
  return null;
};
