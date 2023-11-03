import React from 'react';
import { dataSourceApi } from '@secberus/services';
import { createEnvAwareLogger } from '@secberus/utils';
import { useNotify } from '../../../store';

export const useDeleteDataSource = () => {
  const logger = createEnvAwareLogger();
  const { notifySuccess } = useNotify();

  const [deleteDataSource, query] = dataSourceApi.useDeleteDatasourceMutation();

  const handleDelete = React.useCallback(
    async datasourceId => {
      await deleteDataSource({ datasourceId });
    },
    [deleteDataSource]
  );

  React.useEffect(() => {
    if (query.isSuccess) {
      notifySuccess('Data source successfully deleted');
    }
  }, [query.isSuccess, notifySuccess]);

  React.useEffect(() => {
    if (query.isError) {
      logger.error(query.error);
    }
  }, [logger, query.isError, query.error]);

  return { handleDelete, ...query };
};
