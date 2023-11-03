import React from 'react';
import { integrationsApi, DeleteIntegrationApiArg } from '@secberus/services';
import { createEnvAwareLogger } from '@secberus/utils';
import { useNotify } from '../../../store';

const logger = createEnvAwareLogger();
export const useDeleteIntegration = () => {
  const { notifySuccess } = useNotify();
  const [
    deleteIntegration,
    {
      isLoading: isDeletingIntegration,
      isSuccess: successDeleteIntegration,
      isError: failDeleteIntegration,
      error: errorDeleteIntegration,
    },
  ] = integrationsApi.useDeleteIntegrationMutation();

  React.useEffect(() => {
    successDeleteIntegration &&
      notifySuccess('Integration deleted successfully');
    failDeleteIntegration && logger.error(errorDeleteIntegration);
  }, [
    successDeleteIntegration,
    failDeleteIntegration,
    errorDeleteIntegration,
    notifySuccess,
  ]);

  const handleDeleteIntegration = React.useCallback(
    ({ integrationId }: DeleteIntegrationApiArg) => {
      deleteIntegration({ integrationId });
    },
    [deleteIntegration]
  );

  return {
    handleDeleteIntegration,
    isDeletingIntegration,
    successDeleteIntegration,
  };
};
