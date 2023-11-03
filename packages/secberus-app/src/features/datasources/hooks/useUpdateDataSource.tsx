import React from 'react';
import { dataSourceApi, Datasource } from '@secberus/services';
import { createEnvAwareLogger } from '@secberus/utils';
import { useNotify } from '../../../store';

export const useUpdateDataSource = () => {
  const logger = createEnvAwareLogger();
  const { notifySuccess } = useNotify();

  const [updateDataSource, { isLoading, isSuccess, isError, error }] =
    dataSourceApi.useUpdateDatasourceMutation();

  const handleUpdate = React.useCallback(
    async (datasourceId: string, datasource: Datasource) => {
      await updateDataSource({ datasourceId, datasource });
    },
    [updateDataSource]
  );

  React.useEffect(() => {
    if (isSuccess) {
      notifySuccess('Data source successfully updated');
    }
  }, [isSuccess, notifySuccess]);

  React.useEffect(() => {
    if (isError) {
      logger.error(error);
    }
  }, [logger, error, isError]);

  return {
    handleUpdate,
    isUpdating: isLoading,
    errorUpdating: error,
    isSuccessUpdating: isSuccess,
  };
};
