import React, { ErrorInfo } from 'react';
import { createEnvAwareLogger } from '@secberus/utils';

const logger = createEnvAwareLogger();

export type FeatureFlagErrorBoundaryProps = {
  feature: string;
};

export class FeatureFlagErrorBoundary extends React.Component<FeatureFlagErrorBoundaryProps> {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error message to an error reporting service here
    logger.error(`${this.props.feature} feature error`, { error, errorInfo });
  }

  render() {
    return this.props.children;
  }
}
