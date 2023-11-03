import React from 'react';
import { integrationsApi, CreateIntegrationApiArg } from '@secberus/services';
import { useNotify } from '../../../store';

export const useCreateIntegration = () => {
  const { notifySuccess } = useNotify();

  const [
    createIntegration,
    {
      isLoading: isCreatingIntegration,
      isSuccess: successCreateIntegration,
      error: failCreateIntegrationError,
    },
  ] = integrationsApi.useCreateIntegrationMutation({});

  const handleCreateIntegration = React.useCallback(
    (data: CreateIntegrationApiArg) => {
      createIntegration(data);
    },
    [createIntegration]
  );

  React.useEffect(() => {
    successCreateIntegration &&
      notifySuccess('Integration created successfully');
  }, [successCreateIntegration, notifySuccess]);

  return {
    handleCreateIntegration,
    isCreatingIntegration,
    successCreateIntegration,
    failCreateIntegrationError,
  };
};
