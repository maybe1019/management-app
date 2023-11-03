import React from 'react';
import { dataSourceApi } from '@secberus/services';
import { createEnvAwareLogger } from '@secberus/utils';
import { useNotify } from '../../../../../store';

const logger = createEnvAwareLogger();

export const useGithubInstallation = () => {
  const { notifySuccess } = useNotify();

  const [
    githubInstallation,
    { isLoading, isUninitialized, isError, isSuccess, error },
  ] = dataSourceApi.useGithubInstallationMutation();

  const handleGithubInstallation = React.useCallback(
    (installation_id, state) =>
      githubInstallation({
        githubInstallationRequest: {
          installation_id: parseInt(installation_id),
          state,
        },
      }),
    [githubInstallation]
  );

  React.useEffect(() => {
    if (isSuccess) notifySuccess('Data source created successfully');
  }, [isSuccess, notifySuccess]);

  React.useEffect(() => {
    if (isError) logger.error(error);
  }, [error, isError]);

  return {
    handleGithubInstallation,
    isLoading,
    isUninitialized,
    isError,
  };
};
