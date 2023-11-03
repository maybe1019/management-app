import React from 'react';
import _ from 'lodash';
import { integrationsApi, UpdateIntegrationApiArg } from '@secberus/services';
import { useNotify } from '../../../store';

export const useUpdateIntegration = () => {
  const { notifySuccess } = useNotify();
  const [
    updateIntegration,
    {
      isLoading: isUpdatingIntegration,
      isSuccess: successUpdateIntegration,
      error: failUpdateIntegrationError,
    },
  ] = integrationsApi.useUpdateIntegrationMutation();

  const handleUpdateIntegration = React.useCallback(
    (data: UpdateIntegrationApiArg) => {
      const _data = _.cloneDeep(data);
      try {
        // @ts-expect-error Guarded with try, need to delete assigned_group for now cc Anwar if u have questions
        delete _data.integrationPut.spec.assigned_group;
      } catch (err) {} // eslint-disable-line

      updateIntegration(_data);
    },
    [updateIntegration]
  );

  React.useEffect(() => {
    successUpdateIntegration && notifySuccess();
  }, [successUpdateIntegration, notifySuccess]);

  return {
    handleUpdateIntegration,
    isUpdatingIntegration,
    successUpdateIntegration,
    failUpdateIntegrationError,
  };
};
