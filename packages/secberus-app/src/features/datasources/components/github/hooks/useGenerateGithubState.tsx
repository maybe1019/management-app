import React from 'react';
import { secberusApiGW } from '@secberus/services';
import { createEnvAwareLogger } from '@secberus/utils';

const logger = createEnvAwareLogger();

export const useGenerateGithubState = () => {
  const [generateState, { isLoading, isUninitialized, isError, error }] =
    secberusApiGW.useGithubGenerateStateMutation();

  const handleGenerateState = React.useCallback(async () => {
    return await generateState();
  }, [generateState]);

  React.useEffect(() => {
    if (isError) logger.error(error);
  }, [error, isError]);

  return {
    handleGenerateState,
    isLoading,
    isUninitialized,
  };
};
