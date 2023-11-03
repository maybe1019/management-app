import React from 'react';
import { dataSourceApi } from '@secberus/services';
import { createEnvAwareLogger } from '@secberus/utils';
import { useNotify } from '../../../store';

export const useCreateDataSource = () => {
  const logger = createEnvAwareLogger();
  const { notifySuccess } = useNotify();

  const [createDataSource, { isSuccess, isError, error }] =
    dataSourceApi.useCreateDatasourceMutation();

  const handleCreation = React.useCallback(
    async (fields, datasource_type_id) => {
      await createDataSource({ datasource: { ...fields, datasource_type_id } });
    },
    [createDataSource]
  );

  React.useEffect(() => {
    if (isSuccess) {
      notifySuccess('Data source successfully created');
    }
  }, [isSuccess, notifySuccess]);

  React.useEffect(() => {
    if (isError) {
      logger.error(error);
    }
  }, [logger, error, isError]);

  return { handleCreation, errorCreating: error, isSuccessCreating: isSuccess };
};
